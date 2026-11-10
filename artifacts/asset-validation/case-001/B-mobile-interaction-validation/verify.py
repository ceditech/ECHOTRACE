"""MIV-001 read-only source/pixel integrity and isolated test runner."""
from pathlib import Path
import ast,hashlib,json,re,subprocess
from PIL import Image,ImageChops,ImageDraw
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[3];SOURCE=OUT.parent/'composition-correction-study'
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def check(condition,message):
 if not condition:raise AssertionError(message)
baseline=load(OUT/'protected-before.json')
paths={p.replace('\\','/') for p in subprocess.check_output(['rg','--files','--hidden','-g','!.git','-g','!node_modules','-g','!.next'],cwd=ROOT,text=True).splitlines() if 'B-mobile-interaction-validation' not in p}
check(paths==set(baseline),'Unexpected added/removed file outside MIV folder')
check(all(sha(ROOT/p)==h for p,h in baseline.items()),'Protected hash changed')
for row in load(OUT/'source-audit.json')['records']:check(sha(ROOT/row['source'])==row['raw_sha256'],'Verified refined-B source changed')
manifest=load(OUT/'asset-manifest.json')
check(sha(OUT/'candidate.json')==manifest['candidate_raw_sha256']==sha(SOURCE/'B-proposed-case.json'),'Candidate copy differs')
for p,h in manifest['copied_images'].items():check(sha(OUT/p)==h,'Candidate image changed: '+p)
candidate=load(OUT/'candidate.json')['candidate'];canonical=load(ROOT/'src/cases/content/case-001/case.json');check(len(candidate['changes'])==3,'Wrong change count')
projection=json.loads((OUT/'data.js').read_text().removeprefix('globalThis.MIV_DATA = ').removesuffix(';\n'))
check(projection['scenes']==candidate['scenes'] and projection['changes']==candidate['changes'],'Projection not from verified candidate')
source_manifest=load(SOURCE/'source-manifest.json')
for name,h in source_manifest['source_files'].items():check(sha(ROOT/name)==h,'Candidate raster source differs')
bg=Image.open(ROOT/'public/assets/cases/case-001/lounge-background.webp').convert('RGBA').resize((960,540),Image.Resampling.LANCZOS)
chars=Image.open(OUT.parent/'character-placement-proof/static-character-layer.png').convert('RGBA');shared=bg.copy();shared.alpha_composite(chars)
renders=[];coverage=[];all_layers=[]
for endpoint,scene in enumerate(candidate['scenes']):
 image=shared.copy();layers={}
 for v in scene['visuals']:
  name=v['asset']['id'].removeprefix('asset-');path=ROOT/f'public/assets/cases/case-001/{name}.png' if name=='owen-backpack' else OUT.parent/'B-art-refinement'/f'{name}-candidate.png'
  w=round(v['size']['width']*960);h=round(v['size']['height']*540);tile=Image.open(path).convert('RGBA').resize((w,h),Image.Resampling.LANCZOS)
  origin=(round(v['position']['x']*960-w/2),round(v['position']['y']*540-h/2));layer=Image.new('RGBA',(960,540));layer.alpha_composite(tile,origin);image.alpha_composite(layer);layers[v['objectId']]=layer
 stem='original' if endpoint==0 else 'changed';check(image.convert('RGB').tobytes()==Image.open(OUT/'images'/f'{stem}.png').convert('RGB').tobytes(),'Pair does not reconstruct from single B configuration')
 for target in candidate['scenes'][1]['interactionRegions']:
  key=target['objectId']
  if endpoint==0 and key!='object-passport':continue
  if endpoint==1 and key=='object-passport':
   check(key not in layers,'Removed passport still has a Changed visual')
   continue
  check(key in layers,'Missing expected visual for target coverage')
  alpha=layers[key].getchannel('A').point(lambda a:255 if a>=128 else 0);bounds=alpha.getbbox();g=target['geometry'];outside=0;total=0
  for y in range(bounds[1],bounds[3]):
   for x in range(bounds[0],bounds[2]):
    if not alpha.getpixel((x,y)):continue
    total+=1;nx=(x+.5)/960;ny=(y+.5)/540
    outside+=int(not(g['origin']['x']<=nx<g['origin']['x']+g['size']['width'] and g['origin']['y']<=ny<g['origin']['y']+g['size']['height']))
  check(outside==0,'Solid object pixels outside target')
  coverage.append({'endpoint':stem,'objectId':key,'solid_pixel_centers_checked':total,'outside':outside})
 renders.append(image.convert('RGB'));all_layers.append(layers)
for key in ['object-table-window','object-table-plant','object-document-mat','object-owen-backpack']:check(all_layers[0][key].tobytes()==all_layers[1][key].tobytes(),'Stable environment layer differs')
r,g,b=ImageChops.difference(*renders).split();diff=ImageChops.lighter(ImageChops.lighter(r,g),b).point(lambda p:255 if p else 0)
check(diff.tobytes()==Image.open(OUT/'images/difference-mask.png').convert('L').tobytes(),'Approved difference mask differs')
check(not ImageChops.multiply(diff,chars.getchannel('A')).getbbox(),'Character pixels differ')
allowed=Image.new('L',(960,540))
for layers in all_layers:
 for key in ['object-passport','object-star-wallet','object-stand-12','object-stand-21']:
  if key in layers:allowed=ImageChops.lighter(allowed,layers[key].getchannel('A').point(lambda p:255 if p else 0))
check(not ImageChops.multiply(diff,ImageChops.invert(allowed)).getbbox(),'Fourth visual difference')
for name in ['prepare.py','verify.py']:ast.parse((OUT/name).read_text(encoding='utf-8'))
for name in ['core.js','viewer.js','data.js']:
 source=(OUT/name).read_text(encoding='utf-8').replace('http://www.w3.org/2000/svg','SVG_NAMESPACE')
 check(not re.search(r'https?://|\bimport\s|\bfetch\(',source),'Unexpected runtime dependency')
 syntax=subprocess.run(['node','--check',str(OUT/name)],capture_output=True,text=True);check(syntax.returncode==0,syntax.stderr)
html=(OUT/'index.html').read_text(encoding='utf-8')
for ref in re.findall(r'(?:src|href)="([^"]+)"',html):check((OUT/ref).is_file(),'Missing local reference '+ref)
suite=subprocess.run(['node','--test',str(OUT/'test-core.cjs'),str(OUT/'test-candidate.cjs')],capture_output=True,text=True)
(OUT/'unit-test-results.txt').write_text(suite.stdout+suite.stderr);check(suite.returncode==0,suite.stdout+suite.stderr)
counts={name:int(re.search(r'# '+name+r' (\d+)',suite.stdout).group(1)) for name in ['tests','pass','fail']}
(OUT/'unit-results.json').write_text(json.dumps({'status':'PASS',**counts},indent=2)+'\n')
browser=load(OUT/'browser-results.json');check(browser['status']=='PASS' and not browser['focusedDiagnostic'],'Latest browser run was not a complete passing run')
matrix={(r['frameWidth'],r['dpr'],r['zoom']) for r in browser['dimensions'] if 'dpr' in r}
check(matrix=={(w,d,z) for w in [320,390,430,768,960] for d in [1,2,3] for z in [1,1.5,2]},'Incomplete browser width/DPR/zoom matrix')
for name in ['README.md','OWNER_AUTHORIZATION_RECORD.md','CANDIDATE_GEOMETRY_AUDIT.md','INTERACTION_TEST_REPORT.md','BROWSER_VERIFICATION_REPORT.md','MOBILE_READABILITY_REPORT.md','DEVICE_QA_PROCEDURE.md','OPEN_ISSUES.md','VERIFICATION_REPORT.md']:
 check((OUT/name).is_file(),'Missing required report '+name)
result={'status':'PASS','recommendation':'PASS — READY FOR ACTUAL-DEVICE DIAGNOSTIC QA','protected_files':len(baseline),'all_protected_raw_hashes_unchanged':True,'outside_inventory_unchanged':True,'candidate_copy_exact':True,'canonical_case_unchanged':True,'full_pair_reconstructed_from_single_B_configuration':True,'meaningful_changes':3,'character_pixels_identical':True,'stable_environment_layers_identical':True,'closed_wallet_shared_asset':True,'target_pixel_coverage':coverage,'unit_tests':counts,'real_browser_checks':len(browser['checks']),'browser':browser['browser'],'environment':'Windows real headless desktop Chromium with CDP simulated DPR/touch/media/viewport','physical_device_QA':'NOT PERFORMED','human_recognition_testing':'NOT PERFORMED','production_adoption':False,'T17_T18_implementation':False,'commit_push':False}
(OUT/'verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
files=sorted(p for p in OUT.rglob('*') if p.is_file() and 'browser-profile' not in p.relative_to(OUT).parts and p.name!='FILE_INVENTORY.json')
(OUT/'FILE_INVENTORY.json').write_text(json.dumps({'file_count_including_inventory':len(files)+1,'files':[{'path':p.relative_to(OUT).as_posix(),'bytes':p.stat().st_size,'sha256':sha(p)} for p in files]+[{'path':'FILE_INVENTORY.json','sha256':None,'note':'Self hash omitted'}],'transient_browser_profile_excluded':True},indent=2)+'\n')
