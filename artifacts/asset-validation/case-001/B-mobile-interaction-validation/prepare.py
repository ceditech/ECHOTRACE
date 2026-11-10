"""Rebuild only this package's validation copy after verifying frozen inputs."""
from pathlib import Path
import json,hashlib,shutil
from PIL import Image
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[3];SOURCE=OUT.parent/'composition-correction-study'
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
audit=load(OUT/'source-audit.json')
for row in audit['records']:assert sha(ROOT/row['source'])==row['raw_sha256'],'Exact source hash changed: '+row['source']
for p,h in load(SOURCE/'source-manifest.json')['source_files'].items():assert sha(ROOT/p)==h,'Artwork source changed: '+p
candidate=load(SOURCE/'B-proposed-case.json')['candidate'];regions=candidate['scenes'][1]['interactionRegions']
expected=[('object-passport',.13,.47),('object-stand-21',.26,.15),('object-stand-12',.66,.15),('object-star-wallet',.66,.47)]
assert [(r['objectId'],r['geometry']['origin']['x'],r['geometry']['origin']['y']) for r in regions]==expected
assert all(r['geometry']['size']=={'width':.18,'height':.27} for r in regions)
shutil.copyfile(SOURCE/'B-proposed-case.json',OUT/'candidate.json')
for stem in ['original','changed']:
 shutil.copyfile(SOURCE/'B'/f'{stem}-960.png',OUT/'images'/f'{stem}.png')
 for width in [320,390]:Image.open(OUT/'images'/f'{stem}.png').resize((width,round(width*9/16)),Image.Resampling.LANCZOS).save(OUT/'images'/f'{stem}-{width}.png')
shutil.copyfile(SOURCE/'B/difference-mask.png',OUT/'images/difference-mask.png')
metrics=load(SOURCE/'measurements.json')['B']
data={'scenes':candidate['scenes'],'changes':candidate['changes'],'measurements':metrics,'source':'REFINED_APPROACH_B_VALIDATION_ONLY_NOT_CANONICAL'}
(OUT/'data.js').write_text('globalThis.MIV_DATA = '+json.dumps(data,indent=2)+';\n')
measurements={'source_clue_measurements':metrics,'source_feature_method':'Manual diagnostic ROIs in source raster; feature boxes include adjacent material, not recognition evidence','features':{},'widths':{}}
features={'numeral_union':('object-stand-12',[243,203,518,394],[768,648]),'wallet_star':('object-star-wallet',[201,109,444,348],[800,540]),'striped_strap':('object-star-wallet',[409,83,718,528],[800,540])}
for name,(key,roi,size) in features.items():
 v=next(v for v in candidate['scenes'][0]['visuals'] if v['objectId']==key)
 measurements['features'][name]={'source_roi':roi,'source_dimensions':size,'sizes':{str(w):[(roi[2]-roi[0])/size[0]*v['size']['width']*w,(roi[3]-roi[1])/size[1]*v['size']['height']*w*9/16] for w in [320,390]}}
for w in [256,288,320,390,430,768,960]:measurements['widths'][str(w)]={'scene_height':w*9/16,'target_size':[.18*w,.27*w*9/16],'minimum_gap':.05*w*9/16,'comfort_height_met':.27*w*9/16>=48,'comfort_gap_met':.05*w*9/16>=8}
(OUT/'measurements.json').write_text(json.dumps(measurements,indent=2)+'\n')
(OUT/'asset-manifest.json').write_text(json.dumps({'candidate_raw_sha256':sha(OUT/'candidate.json'),'copied_images':{p.relative_to(OUT).as_posix():sha(p) for p in (OUT/'images').glob('*.png')},'geometry_source':(SOURCE/'B-proposed-case.json').relative_to(ROOT).as_posix(),'source_provenance':audit},indent=2)+'\n')
print('PASS: exact refined B copied; no geometry override; candidate-specific size records generated')
