"""CCV-001: exact existing C1a+C2a assets, B0 staging. No new design decisions.

Default: generate ONE pair, refusing existing outputs. --verify: reproduce in
memory, verify immutable outputs and refresh only this study's final records.
All writes are contained under OUT. No historical script is executed/imported.
"""
from pathlib import Path
import argparse
import ast
import hashlib
import json
import math
import re
import statistics
import subprocess
import sys
sys.dont_write_bytecode = True
from PIL import Image, ImageChops, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[3]
BASE = OUT.parent
VCS = BASE / 'visual-correction-study'
ART = BASE / 'B-art-refinement'
STUDY = BASE / 'composition-correction-study'
SIZE = (960, 540)
ENDPOINTS = ('original', 'changed')
LABELS = ('Original', 'Changed')
WIDTHS = (320, 390, 430)
FILENAMES = [f'CCV-C1a-C2a-B0-{e}-960.png' for e in LABELS]


def load(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT, text=True).strip()


def save_json(name, value):
    dest = OUT / name
    assert dest.resolve().is_relative_to(OUT.resolve())
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(value, indent=2) + '\n', encoding='utf-8')


def support(alpha, threshold=1):
    return alpha.point(lambda value: 255 if value >= threshold else 0)


def count(mask):
    return sum(mask.histogram()[1:])


def diff(a, b):
    channels = ImageChops.difference(a.convert('RGB'), b.convert('RGB')).split()
    return support(ImageChops.lighter(ImageChops.lighter(channels[0], channels[1]), channels[2]))


def union(masks):
    result = Image.new('L', SIZE)
    for mask in masks:
        result = ImageChops.lighter(result, support(mask))
    return result


def outside(mask, allowed):
    return count(ImageChops.multiply(mask, ImageChops.invert(support(allowed))))


def protected():
    baseline = load(OUT / 'protected-before.json')
    for name, digest in baseline['files'].items():
        assert (ROOT / name).is_file() and sha(ROOT / name) == digest, name
    for name, digest in load(OUT / 'source-manifest.json')['sources'].items():
        assert sha(ROOT / name) == digest, name
    assert git('branch', '--show-current') == baseline['git_state']['branch'] == 'feature/echotrace'
    assert Path(git('rev-parse', '--show-toplevel')).resolve() == ROOT.resolve()
    return len(baseline['files'])


CASE = load(STUDY / 'B-proposed-case.json')['candidate']
CANONICAL = load(ROOT / 'src/cases/content/case-001/case.json')
BG = Image.open(ROOT / 'public/assets/cases/case-001/lounge-background.webp').convert('RGBA').resize(SIZE, Image.Resampling.LANCZOS)
CHARACTERS = Image.open(BASE / 'character-placement-proof/static-character-layer.png').convert('RGBA')
INPUTS = {cid: [Image.open(VCS / 'candidates' / cid / f'{e}-960.png') for e in ENDPOINTS] for cid in ('B0', 'C1a', 'C2a')}
assert all(im.size == SIZE and im.mode == 'RGB' for pair in INPUTS.values() for im in pair)
PASSPORT = Image.open(VCS / 'candidates/C1a/assets/object-passport.png').convert('RGBA')
NUMERALS = {f'object-stand-{n}': Image.open(VCS / 'candidates/C2a/assets' / f'object-stand-{n}.png').convert('RGBA') for n in ('12', '21')}


def render(assets):
    pair, scene_layers, transforms = [], [], []
    for scene in CASE['scenes']:
        image = BG.copy()
        image.alpha_composite(CHARACTERS)
        layers, tx = {}, {}
        for visual in scene['visuals']:
            name = visual['asset']['id'].removeprefix('asset-')
            path = ROOT / 'public/assets/cases/case-001/owen-backpack.png' if name == 'owen-backpack' else ART / f'{name}-candidate.png'
            raw = assets.get(visual['objectId'])
            if raw is None:
                raw = Image.open(path).convert('RGBA')
            width = round(visual['size']['width'] * 960)
            height = round(visual['size']['height'] * 540)
            origin = (round(visual['position']['x'] * 960 - width / 2), round(visual['position']['y'] * 540 - height / 2))
            assert visual['rotationDegrees'] == 0
            assert origin[0]>=0 and origin[1]>=0 and origin[0]+width<=960 and origin[1]+height<=540
            tile = raw.resize((width, height), Image.Resampling.LANCZOS)
            layer = Image.new('RGBA', SIZE)
            layer.alpha_composite(tile, origin)
            image.alpha_composite(layer)
            layers[visual['objectId']] = layer
            tx[visual['objectId']] = {'origin': origin, 'tile': [width, height], 'source_dimensions': list(raw.size)}
        pair.append(image.convert('RGB'))
        scene_layers.append(layers)
        transforms.append(tx)
    return pair, scene_layers, transforms


def luminance(rgb):
    channels = [v / 255 for v in rgb[:3]]
    channels = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in channels]
    return sum(a * b for a, b in zip(channels, (.2126, .7152, .0722)))


def ratio(a, b):
    return (max(a, b) + .05) / (min(a, b) + .05)


def sample(image, box):
    patch = image.crop(box)
    return {'box': box, 'samples': patch.width * patch.height, 'median_luminance': statistics.median(luminance(x) for x in patch.getdata())}


def mapped_box(tx, box, width):
    ox, oy = tx['origin']; tw, th = tx['tile']; sw, sh = tx['source_dimensions']
    return tuple(round((o + value * scale) * width / 960) for o, value, scale in ((ox, box[0], tw / sw), (oy, box[1], th / sh), (ox, box[2], tw / sw), (oy, box[3], th / sh)))


def components(mask):
    pixels = {(x, y) for y in range(mask.height) for x in range(mask.width) if mask.getpixel((x, y))}
    sizes = []
    while pixels:
        pending = [pixels.pop()]; total = 0
        while pending:
            x, y = pending.pop(); total += 1
            for point in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
                if point in pixels:
                    pixels.remove(point); pending.append(point)
        sizes.append(total)
    return sorted(sizes, reverse=True)


def quantitative(cid, pair, layers, tx):
    rows = []
    overrides = NUMERALS if cid in ('C2a', 'Combined') else {}
    passport_mask = support(layers[0]['object-passport'].getchannel('A'), 128)
    pb = passport_mask.getbbox()
    inner = ImageChops.subtract(passport_mask, passport_mask.filter(ImageFilter.MinFilter(5)))
    outer = ImageChops.multiply(ImageChops.subtract(passport_mask.filter(ImageFilter.MaxFilter(5)), passport_mask), support(layers[0]['object-document-mat'].getchannel('A'), 128))
    bands = []
    for mask in (inner, outer):
        values = [luminance(rgb) for rgb, value in zip(pair[0].getdata(), mask.getdata()) if value]
        bands.append({'samples': len(values), 'median_luminance': statistics.median(values)})
    for width in (960,) + WIDTHS:
        image = pair[0] if width == 960 else pair[0].resize((width, round(width * 9 / 16)), Image.Resampling.LANCZOS)
        passport = sample(image, mapped_box(tx[0]['object-passport'], (380,365,440,405), width))
        mat = sample(image, mapped_box(tx[0]['object-document-mat'], (650,260,710,310), width))
        glyphs = []
        master = Image.open(ART / 'stand-master-candidate.png').convert('RGBA')
        for number in ('12', '21'):
            key = f'object-stand-{number}'
            raw = overrides.get(key)
            if raw is None:
                raw = Image.open(ART / f'stand-{number}-candidate.png').convert('RGBA')
            source_mask = diff(raw, master); box = source_mask.getbbox()
            tw, th = tx[0][key]['tile']
            dimensions = (max(1, round(tw * width / 960)), max(1, round(th * width / 960)))
            mask = source_mask.resize(dimensions, Image.Resampling.LANCZOS).point(lambda x: 255 if x >= 128 else 0)
            # Match the VCS diagnostic neutral-underlay policy, not a WCAG metric.
            visible_images = []
            for source in (raw, master):
                neutral = Image.new('RGBA', source.size, (18,31,48,255)); neutral.alpha_composite(source)
                visible_images.append(neutral.convert('RGB').resize(dimensions, Image.Resampling.LANCZOS))
            medians = [statistics.median(luminance(rgb) for rgb, value in zip(im.getdata(), mask.getdata()) if value) for im in visible_images]
            glyphs.append({'number': number, 'source_bbox': box, 'CSS_bbox': [(box[2]-box[0])*tw/raw.width*width/960,(box[3]-box[1])*th/raw.height*width/960], 'threshold128_components': components(mask), 'contrast_proxy': ratio(*medians), 'samples': count(mask), 'contrast_method': 'glyph support versus same-location blank over shared navy underlay; diagnostic only'})
        rows.append({'width': width, 'ideal_CSS_scene': [width,width*9/16], 'raster_scene': list(image.size), 'passport_solid_CSS': [(pb[2]-pb[0])*width/960,(pb[3]-pb[1])*width/960], 'cover_sample': passport, 'mat_sample': mat, 'cover_mat_proxy': ratio(passport['median_luminance'],mat['median_luminance']), 'glyphs': glyphs})
    return {'id': cid, 'rows': rows, 'native_passport_boundary_bands': bands, 'native_boundary_proxy': ratio(bands[0]['median_luminance'],bands[1]['median_luminance'])}


def compute():
    protected()
    vm=load(VCS/'candidate-manifest.json')
    assert sha(STUDY/'B-proposed-case.json')==vm['geometry_sha256']
    for rec in vm['candidates']:
        if rec['id'] in ('B0','C1a','C2a'):
            for item in rec['outputs']:assert sha(VCS/item['path'])==item['sha256']
    for source,endpoint in zip(vm['control_sources'],ENDPOINTS):
        assert sha(ROOT/source['path'])==source['sha256']==sha(VCS/'candidates/B0'/f'{endpoint}-960.png')
    # Recompose all existing research inputs exactly before making a combination.
    renders = {}
    for cid, assets in (('B0',{}),('C1a',{'object-passport':PASSPORT}),('C2a',NUMERALS)):
        renders[cid] = render(assets)
        assert all(a.tobytes() == b.tobytes() for a,b in zip(renders[cid][0],INPUTS[cid])), f'STOP source compositor mismatch {cid}'
    combined, layers, transforms = render({'object-passport':PASSPORT, **NUMERALS})
    rows, masks = [], []
    for index, endpoint in enumerate(ENDPOINTS):
        b0, c1, c2, result = INPUTS['B0'][index], INPUTS['C1a'][index], INPUTS['C2a'][index], combined[index]
        m1, m2 = diff(b0,c1), diff(b0,c2)
        overlap = count(ImageChops.multiply(m1,m2))
        assert overlap == 0, 'STOP: independent edit masks overlap'
        allowed = union((m1,m2)); delta_result = b0.copy()
        delta_result.paste(c1,(0,0),m1); delta_result.paste(c2,(0,0),m2)
        assert result.tobytes() == delta_result.tobytes(), 'STOP: source composition differs from exact pixel union'
        assert diff(result,b0).tobytes() == allowed.tobytes()
        passport_allowed = support(renders['B0'][1][index]['object-passport'].getchannel('A')) if index==0 else Image.new('L',SIZE)
        # Exact source-region bounds are checked below. C2a is reproduced
        # pixel-for-pixel through its unchanged compositor, including LANCZOS
        # support. An approximate projected ROI is not an authoritative mask.
        assert outside(m1,passport_allowed)==0
        assert outside(diff(b0,result),allowed)==0
        assert diff(c1,result).tobytes()==m2.tobytes() and diff(c2,result).tobytes()==m1.tobytes()
        wallet = support(layers[index]['object-star-wallet'].getchannel('A'))
        assert count(ImageChops.multiply(allowed,wallet))==0
        assert count(ImageChops.multiply(allowed,support(CHARACTERS.getchannel('A'))))==0
        rows.append({'endpoint':endpoint,'C1a_mask_pixels':count(m1),'C2a_mask_pixels':count(m2),'overlap_pixels':overlap,'combined_union_pixels':count(allowed),'outside_union_pixels':0,'C1a_mask_bbox':m1.getbbox(),'C2a_mask_bbox':m2.getbbox(),'B0_to_combined_pixels':count(diff(b0,result)),'C1a_to_combined_pixels':count(diff(c1,result)),'C2a_to_combined_pixels':count(diff(c2,result)),'pixel_delta_equals_source_recomposition':True,'C1a_changed_pixel_identical_B0':None if index==0 else c1.tobytes()==b0.tobytes(),'C1a_changed_byte_identical_B0':None if index==0 else sha(VCS/'candidates/C1a/changed-960.png')==sha(VCS/'candidates/B0/changed-960.png')})
        masks.append((m1,m2,allowed))
    assert count(masks[1][0])==0
    old_passport=Image.open(ART/'passport-candidate.png').convert('RGBA')
    assert PASSPORT.size==old_passport.size and PASSPORT.getchannel('A').tobytes()==old_passport.getchannel('A').tobytes()
    # Exact C2a asset reproduction plus equal body outside native numeral ROI.
    for key,raw in NUMERALS.items():
        original=Image.open(ART/(key.removeprefix('object-')+'-candidate.png')).convert('RGBA')
        region=Image.new('L',raw.size);ImageDraw.Draw(region).rectangle((243,203,517,393),fill=255)
        assert outside(diff(raw,original),region)==0
        assert support(raw.getchannel('A'),128).tobytes()==support(original.getchannel('A'),128).tobytes()
    pair_difference=diff(*combined)
    event_allowed=union(layer.getchannel('A') for ll in layers for key,layer in ll.items() if key in ('object-passport','object-star-wallet','object-stand-12','object-stand-21'))
    assert outside(pair_difference,event_allowed)==0
    regions={'passport_removal':[160,240,270,335],'left_numeral_exchange':[290,130,382,225],'right_numeral_exchange':[674,130,766,225],'wallet_departure':[310,245,425,330],'wallet_arrival':[665,245,780,330]}
    unexplained=pair_difference.copy(); event_rows=[]
    for name,box in regions.items():
        cropped=pair_difference.crop(box); bounds=cropped.getbbox()
        event_rows.append({'event_region':name,'ROI':box,'changed_pixels':count(cropped),'difference_bbox':None if not bounds else [box[0]+bounds[0],box[1]+bounds[1],box[0]+bounds[2],box[1]+bounds[3]]})
        ImageDraw.Draw(unexplained).rectangle((box[0],box[1],box[2]-1,box[3]-1),fill=0)
    assert count(unexplained)==0 and all(x['changed_pixels']>0 for x in event_rows)
    assert [(x['id'],x['kind']) for x in CASE['changes']]==[(x['id'],x['kind']) for x in CANONICAL['changes']] and len(CASE['changes'])==3
    for i,expected in enumerate(({'object-stand-12':.35,'object-stand-21':.75},{'object-stand-21':.35,'object-stand-12':.75})):
        assert {v['objectId']:v['position']['x'] for v in CASE['scenes'][i]['visuals'] if 'stand-' in v['objectId']}==expected
    assert 'object-passport' not in layers[1]
    for si,expected_x in enumerate((.38,.75)):
        wallet=next(v for v in CASE['scenes'][si]['visuals'] if v['objectId']=='object-star-wallet')
        assert wallet['position']['x']==expected_x
    assert count(ImageChops.multiply(pair_difference,support(CHARACTERS.getchannel('A'))))==0
    assert layers[0]['object-star-wallet'].tobytes()==renders['B0'][1][0]['object-star-wallet'].tobytes()
    assert layers[1]['object-star-wallet'].tobytes()==renders['B0'][1][1]['object-star-wallet'].tobytes()
    for key in ('object-table-window','object-table-plant','object-document-mat','object-owen-backpack'):
        assert layers[0][key].tobytes()==layers[1][key].tobytes()
    quantitative_rows=[quantitative(cid,*renders[cid]) for cid in ('B0','C1a','C2a')]+[quantitative('Combined',combined,layers,transforms)]
    q={x['id']:x for x in quantitative_rows}
    for index in range(4):
        assert q['Combined']['rows'][index]['cover_mat_proxy']==q['C1a']['rows'][index]['cover_mat_proxy']
        assert q['Combined']['rows'][index]['glyphs']==q['C2a']['rows'][index]['glyphs']
    assert q['Combined']['native_boundary_proxy']==q['C1a']['native_boundary_proxy']
    measurements={'combination_method':'Exact existing modified assets through unchanged refined B source compositor; independent disjoint native RGB pixel-union equality crosscheck','source_compatibility':'All three input pairs reproduce exactly from same B0 geometry/source chain','modification_masks':rows,'pair_changed_pixels':count(pair_difference),'event_regions':event_rows,'unexplained_difference_pixels':0,'outside_event_alpha_pixels':0,'character_difference_pixels':count(ImageChops.multiply(pair_difference,support(CHARACTERS.getchannel('A')))),'quantitative':quantitative_rows,'limitations':'Level A calculations, not Level C human recognition or Level D device validation; material/glyph samples are diagnostic proxies','Pillow_version':Image.__version__}
    return combined,masks,pair_difference,measurements


def regression_rows():
    specs=[('R01','Exactly three meaningful changes','canonical/candidate event IDs/kinds + five explained RGB regions'),('R02','No unexplained fourth region','zero pixels outside event-alpha union and five ROIs'),('R03','Passport disappearance','C1a asset exact; passport absent Changed; Changed C1a mask empty'),('R04','Stand exchange','12/21 identity-position maps checked both endpoints'),('R05','Wallet movement','same closed-wallet layers equal B0 per endpoint; original left, Changed right'),('R06','Mara unchanged','exact B0 static layer + zero authorized-delta intersection with character alpha'),('R07','Owen unchanged at B0','exact static layer/order; no translated/redrawn/scaled C3 input'),('R08','Background/furniture unchanged','source reconstruction exact; deltas only passport/numeral masks; stable prop layers'),('R09','Interaction geometry unchanged','candidate source raw hash equals VCS source manifest; no target edits'),('R10','No new clue occlusion','source alpha/order/centers identical; combined exactly preserves C1a/C2a pixels, wallet unchanged'),('R11','Full16:9 scene','native960Ãƒâ€”540 RGB; full-frame previews; ideal CSS versus rounded raster documented'),('R12','No added narrative hints','requires static review; sources contain only already-reviewed local tonal/numeral edits'),('R13','Exact C1a treatment','existing asset/source composition + exact delta reproduction; passport size/alpha unchanged'),('R14','Exact C2a treatment','both exact existing stand assets + glyph/contrast/continuity equality'),('R15','No unapproved pixels','edit masks disjoint; exact union equality; zero outside union')]
    return [{'id':id,'criterion':name,'status':'NOT VERIFIED' if id=='R12' else 'PASS','level':'B' if id=='R12' else 'A','evidence':method,'method':'Static informed image review' if id=='R12' else 'Fresh deterministic assertions in scripts/reproduce-combination.py','limitations':'Not a recognition/device/rights determination'} for id,name,method in specs]


def generate():
    assert not (OUT/'candidate').exists(), 'STOP: preserve existing candidate; use --verify'
    combined,masks,pair_difference,measurements=compute()
    (OUT/'candidate').mkdir();(OUT/'comparisons').mkdir();outputs=[]
    for i,image in enumerate(combined):
        dest=OUT/'candidate'/FILENAMES[i];image.save(dest)
        outputs.append({'path':dest.relative_to(OUT).as_posix(),'sha256':sha(dest),'dimensions':list(image.size),'mode':image.mode})
        for name,mask in zip(('C1a','C2a','union'),masks[i]):mask.save(OUT/'comparisons'/f'{ENDPOINTS[i]}-{name}-MASK-DIAGNOSTIC.png')
    pair_difference.save(OUT/'comparisons/combined-pair-DIFFERENCE-DIAGNOSTIC.png')
    previews=[]
    for label,pair in (('B0',INPUTS['B0']),('Combined',combined)):
        for endpoint,image in zip(ENDPOINTS,pair):
            for width in WIDTHS:
                dest=OUT/'previews'/label/f'{endpoint}-{width}.png';dest.parent.mkdir(parents=True,exist_ok=True)
                preview=image.resize((width,round(width*9/16)),Image.Resampling.LANCZOS);preview.save(dest)
                previews.append({'path':dest.relative_to(OUT).as_posix(),'sha256':sha(dest),'raster_dimensions':list(preview.size),'ideal_CSS_dimensions':[width,width*9/16],'method':'Single full-frame LANCZOS reduction from native; nearest integer raster height; no crop/sharpen/enhancement'})
    for endpoint in ENDPOINTS:
        for width in WIDTHS:
            a=Image.open(OUT/'previews/B0'/f'{endpoint}-{width}.png');b=Image.open(OUT/'previews/Combined'/f'{endpoint}-{width}.png')
            panel=Image.new('RGB',(width*2,a.height+24),'#f0ede6');ImageDraw.Draw(panel).text((6,6),f'{endpoint.upper()}: B0 LEFT | COMBINED RIGHT - {width}px raster review',fill='black');panel.paste(a,(0,24));panel.paste(b,(width,24));panel.save(OUT/'comparisons'/f'{endpoint}-{width}-B0-vs-Combined.png')
    measurements['candidate_outputs']=outputs;measurements['previews']=previews
    save_json('measurements.json',measurements);save_json('regression-results.json',{'candidate_integrity':'PASS deterministic checks; R12 awaiting static review','visual_acceptance':'NOT VERIFIED pending review','regressions':regression_rows(),'human_recognition':'NOT VERIFIED; no new study','physical_device':'NOT VERIFIED; no new testing'})
    assert protected();print(json.dumps({'generated_pairs':1,'masks':measurements['modification_masks'],'pair_changed_pixels':measurements['pair_changed_pixels'],'outputs':outputs},indent=2))


def verify():
    pair,masks,pair_difference,fresh=compute();recorded=load(OUT/'measurements.json');results=load(OUT/'regression-results.json')
    for key in ('modification_masks','pair_changed_pixels','event_regions','unexplained_difference_pixels','outside_event_alpha_pixels','character_difference_pixels','quantitative'):
        assert json.dumps(fresh[key],sort_keys=True)==json.dumps(recorded[key],sort_keys=True),key
    for i,image in enumerate(pair):
        dest=OUT/'candidate'/FILENAMES[i];assert image.tobytes()==Image.open(dest).tobytes()
        assert sha(dest)==recorded['candidate_outputs'][i]['sha256']
    for item in recorded['previews']:
        path=OUT/item['path'];assert sha(path)==item['sha256'];assert list(Image.open(path).size)==item['raster_dimensions']
        label=path.parent.name;index=0 if path.stem.startswith('original') else 1;width=int(path.stem.split('-')[-1]);native=INPUTS['B0'][index] if label=='B0' else pair[index]
        assert Image.open(path).tobytes()==native.resize((width,round(width*9/16)),Image.Resampling.LANCZOS).tobytes()
    assert [x['id'] for x in results['regressions']]==[f'R{i:02}' for i in range(1,16)]
    assert len(results['regressions'])==15 and all(x['status']=='PASS' for x in results['regressions'])
    matrix=(OUT/'THREE_CHANGE_REGRESSION_REPORT.md').read_text(encoding='utf-8')
    for row in results['regressions']:
        assert f"| {row['id']} | {row['criterion']} | {row['status']} | {row['level']} |" in matrix
    assert results['visual_acceptance']=='CONDITIONAL' and results['candidate_integrity']=='PASS'
    assert results['static_review_completed'] is True
    baseline=load(OUT/'protected-before.json');state=baseline['git_state'];assert git('rev-parse','HEAD')==state['head'];assert hashlib.sha256(git('for-each-ref').encode()).hexdigest()==state['refs_digest']
    for name,digest in state['metadata'].items():
        p=Path(git('rev-parse','--git-path',name));p=p if p.is_absolute() else ROOT/p;assert sha(p)==digest
    prefix=OUT.relative_to(ROOT).as_posix()+'/'
    assert {p for p in git('ls-files','--cached','--others','--exclude-standard').splitlines() if not p.startswith(prefix)}==set(baseline['files'])
    links=0
    for p in OUT.glob('*.md'):
        for target in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf-8')):
            if '://' in target:continue
            dest=(p.parent/target.split('#')[0]).resolve();assert dest.is_file() or dest in (OUT/'verification.json',OUT/'FILE_INVENTORY.json'),(p,target);links+=1
    for p in OUT.rglob('*.json'):load(p)
    for p in (OUT/'scripts').glob('*.py'):ast.parse(p.read_text(encoding='utf-8'))
    assert len(list((OUT/'candidate').glob('*.png')))==2 and len(list(OUT.glob('*.md')))==11
    subprocess.run(['git','diff','--check'],cwd=ROOT,check=True)
    save_json('verification.json',{'integrity_status':'PASS','candidate_integrity':'PASS','visual_acceptance':'CONDITIONAL','new_combined_pairs':1,'protected_files':len(baseline['files']),'protected_raw_hashes_unchanged':True,'outside_inventory_unchanged':True,'captured_git_state_unchanged':True,'sources_unchanged':True,'source_count':len(load(OUT/'source-manifest.json')['sources']),'modification_mask_overlap_pixels':[0,0],'unapproved_pixels':0,'unexplained_pair_pixels':0,'source_recomposition_equals_exact_pixel_union':True,'candidate_reproduced_in_memory':True,'preview_pixels_hashes_dimensions':'PASS','R01_R15':'PASS; R12 Level B static review, others Level A deterministic','local_markdown_links_checked':links,'JSON_Python_AST_and_git_diff_check':'PASS','human_recognition':'NOT VERIFIED; no new study','physical_device':'NOT VERIFIED; no new test','rights_clearance':'NOT VERIFIED','production_adoption':False,'canonical_changes':False,'T17_T18':False,'commit_push':False})
    entries=[{'path':p.relative_to(OUT).as_posix(),'bytes':p.stat().st_size,'sha256':sha(p)} for p in sorted(OUT.rglob('*')) if p.is_file() and p.name!='FILE_INVENTORY.json'];entries.append({'path':'FILE_INVENTORY.json','sha256':None,'note':'Recursive self hash/size omitted.'});save_json('FILE_INVENTORY.json',{'file_count_including_inventory':len(entries),'files':entries});assert protected()
    print(json.dumps({'candidate_integrity':'PASS','visual_acceptance':'CONDITIONAL','files':len(entries),'protected':len(baseline['files']),'links':links,'output_hashes':recorded['candidate_outputs']},indent=2))


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--verify',action='store_true');args=parser.parse_args()
    verify() if args.verify else generate()
