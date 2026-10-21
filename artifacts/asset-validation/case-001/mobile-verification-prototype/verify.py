"""Package tests and protected-input verification, writing records only here."""
from pathlib import Path
import json,hashlib,subprocess,re
from PIL import Image,ImageChops
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[3]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
baseline=load(OUT/'protected-before.json')
inventory={p.replace('\\','/') for p in subprocess.check_output(['rg','--files','--hidden','-g','!.git','-g','!node_modules','-g','!.next'],cwd=ROOT,text=True).splitlines() if 'mobile-verification-prototype' not in p}
assert inventory==set(baseline),'Unexpected source added or removed'
changed=[p for p,h in baseline.items() if sha(ROOT/p)!=h];assert not changed,changed
manifest=load(OUT/'asset-manifest.json')
for p,h in manifest['source_files'].items():assert sha(ROOT/p)==h,p
for p,h in manifest['outputs'].items():assert sha(OUT/p)==h,p
case=load(ROOT/'src/cases/content/case-001/case.json');data=load(OUT/'measurements.json')
assert data['scenes']==case['scenes'] and data['changes']==case['changes']
js=(OUT/'data.js').read_text();assert json.loads(js.removeprefix('globalThis.PROTOTYPE_DATA = ').removesuffix(';\n'))==data
assert len(case['changes'])==3 and {c['kind'] for c in case['changes']}=={'object_removed','object_exchanged','object_moved'}
a=Image.open(OUT/'images/original.png').convert('RGB');b=Image.open(OUT/'images/changed.png').convert('RGB');assert a.size==b.size==(960,540)
r,g,blue=ImageChops.difference(a,b).split();mask=ImageChops.lighter(ImageChops.lighter(r,g),blue).point(lambda p:255 if p else 0)
assert mask.tobytes()==Image.open(OUT/'images/difference-mask.png').convert('L').tobytes()
characters=Image.open(OUT.parent/'character-placement-proof/static-character-layer.png').getchannel('A')
assert not ImageChops.multiply(mask,characters).getbbox()
html=(OUT/'index.html').read_text(encoding='utf-8')
for ref in re.findall(r'(?:src|href)="([^"]+)"',html):assert (OUT/ref).is_file(),ref
for name in ['core.js','viewer.js','data.js']:
 source=(OUT/name).read_text(encoding='utf-8').replace('http://www.w3.org/2000/svg','SVG_NAMESPACE')
 assert not re.search(r'https?://|\bfetch\(|\bimport\s|require\(', source),'Unexpected viewer dependency'
 syntax=subprocess.run(['node','--check',str(OUT/name)],capture_output=True,text=True);assert syntax.returncode==0,syntax.stderr
test=subprocess.run(['node','--test',str(OUT/'test-core.cjs')],capture_output=True,text=True)
(OUT/'core-test-results.txt').write_text(test.stdout+test.stderr);assert test.returncode==0,test.stdout+test.stderr
browser=load(OUT/'browser-results.json');assert browser['status']=='PASS',browser
for required in ['README.md','OWNER_APPROVAL_RECORD.md','TEST_REPORT.md','MOBILE_READABILITY_REPORT.md','OPEN_ISSUES.md','index.html','style.css','core.js','viewer.js','data.js','prepare.py','test-core.cjs','test-browser.cjs']:
 assert (OUT/required).is_file(),f'Missing required deliverable: {required}'
subprocess.run(['git','diff','--check'],cwd=ROOT,check=True)
result={'status':'PASS','protected_file_count':len(baseline),'protected_files_changed':changed,'existing_inventory_unchanged':True,'canonical_geometry_exact':True,'candidate_source_hashes_match':True,'scene_dimensions':[960,540],'exactly_three_meaningful_changes':True,'character_pixels_unchanged':True,'core_tests_passed':7,'javascript_syntax':'PASS','local_references_dependencies':'PASS','browser':browser['browser'],'browser_checks_passed':len(browser['checks']),'browser_kind':'Real installed Chrome, headless desktop CDP with CSS viewport/DPR/media emulation','physical_device_validation':'NOT PERFORMED','human_trials_this_task':'NOT PERFORMED','production_readiness':False,'actual_device_diagnostic_QA':'READY WITH KNOWN ARTWORK MISMATCH; not visual/adoption acceptance'}
(OUT/'verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
files=sorted(p for p in OUT.rglob('*') if p.is_file() and 'browser-profile' not in p.relative_to(OUT).parts and p.name!='FILE_INVENTORY.json')
inventory_record={'files':[{'path':p.relative_to(OUT).as_posix(),'sha256':sha(p)} for p in files]+[{'path':'FILE_INVENTORY.json','sha256':None,'note':'Self hash omitted'}],'file_count_including_inventory':len(files)+1,'transient_browser_profile_included':False}
(OUT/'FILE_INVENTORY.json').write_text(json.dumps(inventory_record,indent=2)+'\n')
