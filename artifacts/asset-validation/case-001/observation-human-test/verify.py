"""Read-only verification; writes results only inside this package."""
import hashlib, json, re, subprocess
from pathlib import Path
from PIL import Image, ImageChops

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[3]
SOURCE = OUT.parent / 'character-placement-proof'
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def load(path): return json.loads(path.read_text(encoding='utf-8-sig'))
def require(condition, message):
    if not condition: raise AssertionError(message)

baseline = load(OUT/'protected-before.json')
changed = [p for p,h in baseline.items() if not (ROOT/p).is_file() or sha(ROOT/p)!=h]
require(not changed, f'Protected files changed: {changed}')
current_paths=subprocess.check_output(['rg','--files','--hidden','-g','!.git','-g','!node_modules','-g','!.next'],cwd=ROOT,text=True).splitlines()
outside={p.replace('\\','/') for p in current_paths if 'observation-human-test' not in p}
require(outside==set(baseline), 'Unexpected added/removed file outside isolated package')
manifest = load(OUT/'image-manifest.json')
images=[]
for entry in manifest['images']:
    copied=OUT/entry['copy']; source=ROOT/entry['source']
    require(sha(copied)==sha(source)==entry['sha256'], 'Image identity mismatch')
    image=Image.open(copied).convert('RGB')
    require(image.size==(960,540), 'Unexpected dimensions')
    images.append(image)
diff=ImageChops.difference(*images)
mask=ImageChops.lighter(*diff.split()[:2]); mask=ImageChops.lighter(mask,diff.split()[2]).point(lambda p:255 if p else 0)
approved_mask=Image.open(SOURCE/'difference-mask-with-characters.png').convert('L')
require(mask.tobytes()==approved_mask.tobytes(), 'Endpoint difference mask mismatch')
prior=load(SOURCE/'occlusion-analysis.json')
for key in ['before_after_difference_masks_identical','character_visibility_identical','character_artwork_and_placement_identical']:
    require(prior[key] is True, f'Prior evidence failed: {key}')
require(prior['new_before_after_difference_pixels']==0, 'Additional differences in source proof')
placement=load(SOURCE/'placement-zones.json')
for entry in placement['placements'].values(): require(sha(SOURCE/entry['file'])==entry['raw_sha256'],'Character provenance mismatch')
# Pixels under the stable character layer cannot introduce an endpoint change.
alpha=Image.open(SOURCE/'static-character-layer.png').getchannel('A')
require(not ImageChops.multiply(mask,alpha).getbbox(), 'Change intersects static character artwork')
html=(OUT/'index.html').read_text(encoding='utf-8'); js=(OUT/'viewer.js').read_text(encoding='utf-8'); css=(OUT/'viewer.css').read_text(encoding='utf-8')
for ref in re.findall(r'(?:src|href)="([^"]+)"',html): require((OUT/ref).is_file(),f'Missing reference: {ref}')
for ref in re.findall(r"(?:original|changed)\.src = '([^']+)'",js): require((OUT/ref).is_file(),f'Missing image: {ref}')
require('observation: 25000, blank: 2000, recall: 60000' in js,'Timing constants mismatch')
require(not re.search(r'https?://|\bfetch\s*\(|\bimport\s|require\s*\(',js+html+css),'External/runtime dependency found')
require('aspect-ratio:16/9' in css and 'object-fit:contain' in css,'Composition CSS mismatch')
inventory=['README.md','TEST_PROTOCOL.md','TEST_SCRIPT.md','OBSERVATIONS.csv','SCORING_RUBRIC.md','RESULTS_TEMPLATE.md','QA_REPORT.md']
for filename in inventory: require((OUT/filename).is_file(),f'Missing deliverable: {filename}')
require(len((OUT/'OBSERVATIONS.csv').read_text().splitlines())==1,'Observation sheet must remain blank before testing')
test=subprocess.run(['node',str(OUT/'test-sequence.cjs')],capture_output=True,text=True)
require(test.returncode==0,test.stdout+test.stderr)
result={'status':'PASS','protected_file_count':len(baseline),'protected_files_changed':changed,
 'exact_latest_composites':True,'dimensions':[960,540],'approved_endpoint_difference_mask_matches':True,
 'character_pixels_identical':True,'references_timing_dependencies':'PASS',
 'node_sequence_tests':test.stdout.strip(),'automated_browser_test':'NOT PERFORMED: Playwright unavailable',
 'human_tests':'NOT PERFORMED','real_device_tests':'NOT PERFORMED','runtime_touch_tests':'NOT PERFORMED'}
(OUT/'verification.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
