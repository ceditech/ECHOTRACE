"""Offline measurements and camera previews; never modifies source artwork."""
import hashlib,json,math,statistics,subprocess,shutil
from pathlib import Path
from PIL import Image,ImageChops,ImageDraw
OUT=Path(__file__).resolve().parent; ROOT=OUT.parents[3]
CASE=OUT.parent; ART=CASE/'B-art-refinement'; CHAR=CASE/'character-placement-proof'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def paths():
 return {p.replace('\\','/') for p in subprocess.check_output(['rg','--files','--hidden','-g','!.git','-g','!node_modules','-g','!.next'],cwd=ROOT,text=True).splitlines() if 'mobile-usability-study' not in p}
def mask(im):
 r,g,b=im.convert('RGB').split();return ImageChops.lighter(ImageChops.lighter(r,g),b).point(lambda x:255 if x else 0)
baseline=OUT/'protected-before.json'
if not baseline.exists():baseline.write_text(json.dumps({p:sha(ROOT/p) for p in sorted(paths())},indent=2)+'\n')
before=load(baseline)
assert paths()==set(before),'Unexpected added/removed source file'
assert all(sha(ROOT/p)==h for p,h in before.items()),'Protected source changed'
(OUT/'images').mkdir(exist_ok=True); (OUT/'previews').mkdir(exist_ok=True)
original=Image.open(CHAR/'original-with-characters.png').convert('RGB');changed=Image.open(CHAR/'changed-with-characters.png').convert('RGB')
assert original.size==changed.size==(960,540)
manifest=[]
for name,source in [('a','original-with-characters.png'),('b','changed-with-characters.png')]:
 dest=OUT/'images'/f'{name}.png';shutil.copyfile(CHAR/source,dest)
 manifest.append({'copy':dest.relative_to(OUT).as_posix(),'source':(CHAR/source).relative_to(ROOT).as_posix(),'sha256':sha(dest)})
scenes=load(CASE/'layout-alternatives/B/proposed-scenes.json')
canonical=load(ROOT/'src/cases/content/case-001/case.json')
measure={'unit':'CSS px under full-width 16:9 fit; alpha bounds measured on 960 render then scaled analytically','scales':{},'canonical_vs_B':{},'feature_rois':{}}
measure['canonical_region_comparison']={str(w):{'each_target_size':[.18*w,.3*w*9/16],'row_gap':.1*w*9/16,'regions':canonical['scenes'][1]['interactionRegions']} for w in [960,390,320]}
for width in [960,390,320]:
 scale=width/960;rows=[]
 for v in scenes[0]['visuals']:
  path=ART/(v['asset']['id'].removeprefix('asset-')+'-candidate.png')
  if not path.exists():path=ROOT/'public/assets/cases/case-001/owen-backpack.png'
  size=(round(v['size']['width']*960),round(v['size']['height']*540))
  resized=Image.open(path).convert('RGBA').resize(size,Image.Resampling.LANCZOS)
  bbox=resized.getchannel('A').point(lambda a:255 if a>=128 else 0).getbbox()
  rows.append({'objectId':v['objectId'],'envelope':[round(v['size']['width']*width,3),round(v['size']['height']*width*9/16,3)],'solid_alpha_ge128_size':[round((bbox[2]-bbox[0])*scale,3),round((bbox[3]-bbox[1])*scale,3)],'solid_source_render_bbox':bbox})
 regions=[]
 for r in scenes[1]['interactionRegions']:
  g=r['geometry'];x=g['origin']['x']*width;y=g['origin']['y']*width*9/16;w=g['size']['width']*width;h=g['size']['height']*width*9/16
  regions.append({'objectId':r['objectId'],'xyxy':[x,y,x+w,y+h],'size':[w,h]})
 distances=[]
 for i,a in enumerate(regions):
  for b in regions[i+1:]:
   ax,ay,ar,ab=a['xyxy'];bx,by,br,bb=b['xyxy'];dx=max(bx-ar,ax-br,0);dy=max(by-ab,ay-bb,0)
   distances.append({'pair':[a['objectId'],b['objectId']],'edge_distance':round(math.hypot(dx,dy),3),'overlap_area':round(max(0,min(ar,br)-max(ax,bx))*max(0,min(ab,bb)-max(ay,by)),3)})
 chars=load(CHAR/'occlusion-analysis.json')['scenes'][0]['character_visibility']
 charrows={name:{'visible_size':[round((r['effective_alpha_bbox_gt_8'][2]-r['effective_alpha_bbox_gt_8'][0])*scale,3),round((r['effective_alpha_bbox_gt_8'][3]-r['effective_alpha_bbox_gt_8'][1])*scale,3)]} for name,r in chars.items()}
 measure['scales'][str(width)]={'scene_height':width*9/16,'objects':rows,'regions':regions,'region_pair_distances':distances,'characters':charrows}
 for name,im in [('original',original),('changed',changed)]:
  im.resize((width,round(width*9/16)),Image.Resampling.LANCZOS).save(OUT/'previews'/f'fit-{width}-{name}.png')
  if width!=960:
   # Uniform taller camera: 300px-high 16:9 image, central viewport clips horizontally.
   enlarged=im.resize((533,300),Image.Resampling.LANCZOS)
   left=(533-width)//2;enlarged.crop((left,0,left+width,300)).save(OUT/'previews'/f'tall-camera-{width}-{name}.png')
   zoom=im.resize((width*2,round(width*9/16)*2),Image.Resampling.LANCZOS)
   zoom.crop((0,0,width,round(width*9/16))).save(OUT/'previews'/f'zoom2-left-{width}-{name}.png')
   zoom.crop((width,0,width*2,round(width*9/16))).save(OUT/'previews'/f'zoom2-right-{width}-{name}.png')
for v in scenes[0]['visuals']:
 c=next(x for x in canonical['scenes'][0]['visuals'] if x['objectId']==v['objectId'])
 if c!=v:measure['canonical_vs_B'][v['objectId']]={'canonical':c,'offline_B':v}
# Diagnostic ROI sizes only; manual feature boxes are not semantic segmentation.
rois={'stand_numeral_union':{'asset':'stand-12','box':[243,203,518,394],'asset_size':[768,648],'envelope':[.12,.18]},'wallet_star':{'asset':'star-wallet','box':[201,109,444,348],'asset_size':[800,540],'envelope':[.1,.12]},'wallet_strap_band':{'asset':'star-wallet','box':[409,83,718,528],'asset_size':[800,540],'envelope':[.1,.12]}}
for name,r in rois.items():
 r['method']='Manually identified axis-aligned diagnostic feature ROI; includes nearby material'
 r['sizes']={str(w):[round((r['box'][2]-r['box'][0])/r['asset_size'][0]*r['envelope'][0]*w,2),round((r['box'][3]-r['box'][1])/r['asset_size'][1]*r['envelope'][1]*w*9/16,2)] for w in [960,390,320]}
measure['feature_rois']=rois
def luminance(rgb):
 values=[v/255 for v in rgb];linear=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in values]
 return .2126*linear[0]+.7152*linear[1]+.0722*linear[2]
samples={}
for label,box in {'passport_cover':[196,280,203,285],'adjacent_mat':[183,279,190,284],'stand_face':[319,186,326,193],'stand_gold_numeral':[324,166,328,171]}.items():
 samples[label]={'box':box,'median_relative_luminance':statistics.median(luminance(p) for p in original.crop(box).getdata())}
measure['contrast_samples']={'method':'Manual small rendered ROI median luminance; proxy, not whole-object contrast or WCAG certification','samples':samples,'passport_mat_ratio':(max(samples['passport_cover']['median_relative_luminance'],samples['adjacent_mat']['median_relative_luminance'])+.05)/(min(samples['passport_cover']['median_relative_luminance'],samples['adjacent_mat']['median_relative_luminance'])+.05)}
# Diagnostics are intentionally labeled and excluded from the interactive prototype.
panel=Image.new('RGB',(960,720),'#eeeeee');draw=ImageDraw.Draw(panel)
for row,width in enumerate([390,320]):
 for col,name in enumerate(['fit','tall-camera']):
  p=Image.open(OUT/'previews'/f'{name}-{width}-original.png');panel.paste(p,(col*480,row*350+35));draw.text((col*480,row*350+10),f'{name} {width}px (study diagnostic)',fill='black')
panel.save(OUT/'previews/comparison.png')
approved=Image.open(CHAR/'difference-mask-with-characters.png').convert('L')
assert mask(ImageChops.difference(original,changed)).tobytes()==approved.tobytes()
static=Image.open(CHAR/'static-character-layer.png').getchannel('A')
assert not ImageChops.multiply(approved,static).getbbox()
for path in (OUT/'previews').glob('*-original.png'):
 other=path.with_name(path.name.replace('-original','-changed'))
 if other.exists():
  assert Image.open(path).size==Image.open(other).size
result={'protected_file_count':len(before),'protected_files_unchanged':all(sha(ROOT/p)==h for p,h in before.items()),'source_copies_exact':all(sha(OUT/r['copy'])==sha(ROOT/r['source']) for r in manifest),'approved_difference_mask_matches':True,'character_pixels_identical':True,'prototype_transforms_shared_between_snapshots':True,'human_tests_this_study':'NOT PERFORMED','physical_device_tests':'NOT PERFORMED','browser_prototype_test':'NOT PERFORMED','new_artwork_generated':False,'canonical_geometry_adopted':False}
for command in [['node',str(OUT/'test-prototype.cjs')],['node','--check',str(OUT/'prototype.js')]]:
 check=subprocess.run(command,capture_output=True,text=True);assert check.returncode==0,check.stderr
result['node_dimension_tests']='PASS';result['javascript_syntax']='PASS'
for filename in ['README.md','AUDIT_REPORT.md','COMPARISON_MATRIX.md','PROTOTYPE_INSTRUCTIONS.md','REVISION_PLAN.md','prototype.html','prototype.css','prototype.js','images/a.png','images/b.png']:
 assert (OUT/filename).is_file(),f'Missing deliverable: {filename}'
result['deliverable_inventory']='PASS'
for name,data in [('measurements.json',measure),('image-manifest.json',manifest),('verification.json',result)]: (OUT/name).write_text(json.dumps(data,indent=2)+'\n')
print(json.dumps(result,indent=2));print(json.dumps({'feature_sizes':rois,'contrast':measure['contrast_samples']},indent=2))
