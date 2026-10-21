"""Render candidate artwork using exact canonical visual envelopes, not B geometry."""
from pathlib import Path
import json,hashlib
from PIL import Image,ImageChops
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[3];CASE=OUT.parent
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
case=load(ROOT/'src/cases/content/case-001/case.json')
(OUT/'images').mkdir(exist_ok=True)
art=CASE/'B-art-refinement';proof=CASE/'character-placement-proof';src=ROOT/'public/assets/cases/case-001'
background=Image.open(src/'lounge-background.webp').convert('RGBA').resize((960,540),Image.Resampling.LANCZOS)
characters=Image.open(proof/'static-character-layer.png').convert('RGBA')
base=background.copy();base.alpha_composite(characters)
manifest={};measurements={};renders=[];layer_sets=[]
for i,scene in enumerate(case['scenes']):
 image=base.copy();measurements[scene['id']]=[];layers={}
 for v in scene['visuals']:
  name=v['asset']['id'].removeprefix('asset-');path=src/f'{name}.png' if name=='owen-backpack' else art/f'{name}-candidate.png'
  manifest[path.relative_to(ROOT).as_posix()]=sha(path)
  w=round(v['size']['width']*960);h=round(v['size']['height']*540)
  # Exact authored envelopes. Candidate raster normalization may change aspect relative to B;
  # no scene deformation or source file retouch is performed.
  tile=Image.open(path).convert('RGBA').resize((w,h),Image.Resampling.LANCZOS)
  origin=(round(v['position']['x']*960-w/2),round(v['position']['y']*540-h/2))
  assert v['rotationDegrees']==0
  layer=Image.new('RGBA',(960,540));layer.alpha_composite(tile,origin);layers[v['objectId']]=layer
  image.alpha_composite(layer)
  solid=tile.getchannel('A').point(lambda a:255 if a>=128 else 0).getbbox()
  row={'objectId':v['objectId'],'envelope_source':[w,h],'origin_source':origin,'solid_source_bounds':[origin[0]+solid[0],origin[1]+solid[1],origin[0]+solid[2],origin[1]+solid[3]],'canonical_size':v['size'],'sizes':{str(width):{'envelope':[v['size']['width']*width,v['size']['height']*width*9/16],'solid':[(solid[2]-solid[0])*width/960,(solid[3]-solid[1])*width/960]} for width in [320,390,430,768,960]}}
  measurements[scene['id']].append(row)
 name='original' if i==0 else 'changed';image.convert('RGB').save(OUT/'images'/f'{name}.png');renders.append(image.convert('RGB'));layer_sets.append(layers)
 for width in [320,390]:image.convert('RGB').resize((width,round(width*9/16)),Image.Resampling.LANCZOS).save(OUT/'images'/f'{name}-{width}.png')
for path in [src/'lounge-background.webp',proof/'static-character-layer.png',ROOT/'src/cases/content/case-001/case.json']:
 manifest[path.relative_to(ROOT).as_posix()]=sha(path)
diff=ImageChops.difference(*renders);r,g,b=diff.split();mask=ImageChops.lighter(ImageChops.lighter(r,g),b).point(lambda p:255 if p else 0)
allowed=Image.new('L',(960,540))
for layers in layer_sets:
 for key in ['object-passport','object-star-wallet','object-stand-12','object-stand-21']:
  if key in layers:allowed=ImageChops.lighter(allowed,layers[key].getchannel('A').point(lambda a:255 if a else 0))
assert not ImageChops.multiply(mask,ImageChops.invert(allowed)).getbbox(),'Additional changed area'
assert not ImageChops.multiply(mask,characters.getchannel('A')).getbbox(),'Character endpoint change'
mask.save(OUT/'images'/'difference-mask.png')
# Number overlay union is source evidence; source-wallet feature boxes are diagnostic only.
features={'numeral_union':{'asset':'stand-12','source_roi':[243,203,518,394],'source_size':[768,648]},'wallet_star':{'asset':'star-wallet','source_roi':[201,109,444,348],'source_size':[800,540]}}
for f in features.values():
 visual=next(v for v in case['scenes'][0]['visuals'] if v['asset']['id']=='asset-'+f['asset'])
 f['sizes']={str(w):[(f['source_roi'][2]-f['source_roi'][0])/f['source_size'][0]*visual['size']['width']*w,(f['source_roi'][3]-f['source_roi'][1])/f['source_size'][1]*visual['size']['height']*w*9/16] for w in [320,390]}
data={'scenes':case['scenes'],'changes':case['changes'],'measurements':measurements,'features':features,'source_geometry':'canonical case.json; candidate assets; no B coordinate adoption'}
(OUT/'data.js').write_text('globalThis.PROTOTYPE_DATA = '+json.dumps(data,indent=2)+';\n')
(OUT/'measurements.json').write_text(json.dumps(data,indent=2)+'\n')
record={'source_files':manifest,'outputs':{p.relative_to(OUT).as_posix():sha(p) for p in (OUT/'images').glob('*.png')},'candidate_render_method':'Exact canonical envelopes; same static character layer and shared asset bytes at both endpoints','additional_endpoint_pixels_outside_changed_object_layers':0,'character_pixels_changed':0}
(OUT/'asset-manifest.json').write_text(json.dumps(record,indent=2)+'\n')
print('PASS: canonical candidate renders, exact three change layers, stable character pixels')
