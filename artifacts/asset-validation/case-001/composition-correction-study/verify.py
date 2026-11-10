"""Read-only verification of study evidence; writes only verification.json here."""
from pathlib import Path
import ast,hashlib,json,subprocess
from PIL import Image,ImageChops
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[3]
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def check(condition,message):
 if not condition:raise AssertionError(message)
before=load(OUT/'protected-before.json')
paths={p.replace('\\','/') for p in subprocess.check_output(['rg','--files','--hidden','-g','!.git','-g','!node_modules','-g','!.next'],cwd=ROOT,text=True).splitlines() if 'composition-correction-study' not in p}
check(paths==set(before),'Outside study file inventory changed')
check(all(sha(ROOT/p)==h for p,h in before.items()),'Protected source hash changed')
for p,h in load(OUT/'source-manifest.json')['source_files'].items():check(sha(ROOT/p)==h,'Source mismatch: '+p)
for p,h in load(OUT/'source-manifest.json')['reviewed_reference_files'].items():check(sha(ROOT/p)==h,'Reference mismatch: '+p)
generated=load(OUT/'generated-hashes.json')
for p,h in generated.items():check(sha(OUT/p)==h,'Generated image mismatch: '+p)
canonical=load(ROOT/'src/cases/content/case-001/case.json');A=load(OUT/'A-fixed-envelopes.json');B=load(OUT/'B-proposed-case.json')['candidate']
check(A['scenes']==canonical['scenes'],'A altered canonical envelopes/regions')
for candidate in [canonical,B]:
 changes=candidate['changes'];check(len(changes)==3,'Wrong change count')
 check([(c['id'],c['kind']) for c in changes]==[('change-passport-removed','object_removed'),('change-stands-exchanged','object_exchanged'),('change-wallet-moved','object_moved')],'Mystery identity changed')
 check(all(c['significance']=='meaningful' and c['isRequired'] for c in changes),'Mystery flags changed')
 first,last=[{v['objectId']:v for v in s['visuals']} for s in candidate['scenes']]
 check(set(first)-set(last)=={'object-passport'} and not set(last)-set(first),'Added/removed prop')
 for key in ['object-table-window','object-table-plant','object-document-mat','object-owen-backpack']:check(first[key]==last[key],'Stable definition changed: '+key)
 for key in ['object-star-wallet','object-stand-12','object-stand-21']:
  for field in ['asset','size','rotationDegrees']:check(first[key][field]==last[key][field],'Asset/state changed: '+key)
 check(first['object-stand-12']['position']==last['object-stand-21']['position'] and first['object-stand-21']['position']==last['object-stand-12']['position'],'Exchange incorrect')
 move=next(c for c in changes if c['kind']=='object_moved');check(move['from']==first['object-star-wallet']['position'] and move['to']==last['object-star-wallet']['position'],'Movement endpoint metadata mismatch')
 for s in candidate['scenes']:
  for v in s['visuals']:
   p,z=v['position'],v['size'];check(0<=p['x']-z['width']/2<p['x']+z['width']/2<=1 and 0<=p['y']-z['height']/2<p['y']+z['height']/2<=1,'Visual out of bounds')
  for r in s['interactionRegions']:
   g=r['geometry'];check(g['kind']=='rectangle','Unexpected region kind');p,z=g['origin'],g['size'];check(0<=p['x']<p['x']+z['width']<=1 and 0<=p['y']<p['y']+z['height']<=1,'Target out of bounds')
targets=load(OUT/'target-measurements.json')
for row in targets['proposed_B']:
 check(all(p['overlap_area']==0 for p in row['pairs']),'B target overlap')
 check(row['comfort_size_pass'] and row['comfort_gap_pass'],'B comfort-goal conflict at stated full widths')
 # Independent normalized half-open point lookup: centers unique, gaps empty.
 regions=B['scenes'][1]['interactionRegions']
 def hits(x,y):return [r['objectId'] for r in regions if r['geometry']['origin']['x']<=x<r['geometry']['origin']['x']+r['geometry']['size']['width'] and r['geometry']['origin']['y']<=y<r['geometry']['origin']['y']+r['geometry']['size']['height']]
 for r in regions:
  g=r['geometry'];check(hits(g['origin']['x']+g['size']['width']/2,g['origin']['y']+g['size']['height']/2)==[r['objectId']],'Ambiguous target center')
 check(hits(.75,.445)==[],'Gap routes to a target')
metrics=load(OUT/'measurements.json');characters=Image.open(OUT.parent/'character-placement-proof/static-character-layer.png').getchannel('A')
contrast=load(OUT/'contrast-proxies.json')
for mode in ['baseline','A1','A2','B']:
 for width in ['960','390','320']:
  patches=contrast['measurements'][mode][width]
  check(all(s['sample_count']>0 and 0<=s['median_luminance']<=1 for s in patches['samples'].values()),'Invalid contrast sample')
  check(all(1<=value<=21 for value in patches['ratios'].values()),'Invalid contrast proxy')
for mode,rows in metrics.items():
 check(rows[0]['character_visibility_digest']==rows[1]['character_visibility_digest'],'Character effective visibility changed')
 for width in [960,390,320]:check(Image.open(OUT/mode/f'original-{width}.png').size==Image.open(OUT/mode/f'changed-{width}.png').size==(width,round(width*9/16)),'Preview dimensions mismatch')
 a=Image.open(OUT/mode/'original-960.png').convert('RGB');b=Image.open(OUT/mode/'changed-960.png').convert('RGB');r,g,blue=ImageChops.difference(a,b).split();diff=ImageChops.lighter(ImageChops.lighter(r,g),blue).point(lambda v:255 if v else 0)
 check(diff.tobytes()==Image.open(OUT/mode/'difference-mask.png').convert('L').tobytes(),'Difference mask mismatch')
 check(not ImageChops.multiply(diff,characters).getbbox(),'Character pixels changed')
for row in metrics['B']:
 check(all(c['proxy_pass'] for c in row['contacts']),'B contact proxy fails')
 check(all(r['solid_pixels_outside_target']==0 for r in row['target_correspondence']),'B target correspondence fails')
check(metrics['B'][0]['passport_mat_correspondence']['outside_mat_solid_pixels']==0,'B passport overhangs mat')
required=['README.md','BASELINE_AUDIT.md','APPROACH_A_REPORT.md','APPROACH_B_REPORT.md','CHARACTER_STAGING_REPORT.md','MOBILE_READABILITY_COMPARISON.md','DECISION_MATRIX.md','RECOMMENDED_CORRECTION_PLAN.md','OWNER_DECISIONS.md','VERIFICATION_REPORT.md']
for name in required:check((OUT/name).is_file(),'Missing deliverable: '+name)
for name in ['study.py','verify.py']:ast.parse((OUT/name).read_text(encoding='utf-8'),filename=name)
# Explicitly retain known failed experiments: no weakened checks to make A pass.
check(any(not r['proxy_pass'] for r in metrics['A1'][0]['contacts']),'A1 rejection evidence missing')
check(any(not r['proxy_pass'] for r in metrics['A2'][0]['contacts']),'A2 rejection evidence missing')
result={'status':'PASS','protected_files':len(before),'protected_hashes_unchanged':True,'outside_file_inventory_unchanged':True,'generated_png_hashes_verified':len(generated),'A_exact_canonical_geometry':True,'B_clearly_labeled_proposal_only':True,'meaningful_changes':3,'identical_character_pixels':True,'stable_environment_definitions_and_rendered_layers':'PASS (generation assertions and source hashes)','closed_wallet':'Same closed source raster, asset identity/size/rotation at both endpoints','no_added_story_props':True,'B_targets_overlap':False,'B_targets_solid_correspondence':'PASS','B_contact_proxy':'PASS both endpoints; does not establish artistic/physical truth','A1_A2_rejections_retained':True,'human_testing':'NOT PERFORMED','physical_device_testing':'NOT PERFORMED','browser_testing_this_study':'NOT PERFORMED','production_case_validation':'NOT RUN: offline bounds/identity checks only; future adoption requires original validation pipeline','production_changes':False,'canonical_adoption':False,'T17_T18':False,'commit_push':False}
(OUT/'verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
files=sorted(p for p in OUT.rglob('*') if p.is_file() and p.name!='FILE_INVENTORY.json')
inventory={'file_count_including_inventory':len(files)+1,'files':[{'path':p.relative_to(OUT).as_posix(),'bytes':p.stat().st_size,'sha256':sha(p)} for p in files]+[{'path':'FILE_INVENTORY.json','sha256':None,'note':'Self hash omitted'}]}
(OUT/'FILE_INVENTORY.json').write_text(json.dumps(inventory,indent=2)+'\n')
