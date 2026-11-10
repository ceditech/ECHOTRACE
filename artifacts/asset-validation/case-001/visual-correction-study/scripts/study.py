"""VCS-001 deterministic offline study. Writes only beneath this study folder.

Run without options for B0 and six independent candidates. --combined creates
only the named provisional combination after independent checks/review.
Never runs or imports historical generators. Never refreshes protected baselines.
"""
from pathlib import Path
import argparse
import hashlib
import json
import math
import shutil
import statistics
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[3]
BASE = OUT.parent
ART = BASE / 'B-art-refinement'
PROOF = BASE / 'character-placement-proof'
STUDY = BASE / 'composition-correction-study'
SIZE = (960, 540)
WIDTHS = (320, 390, 430)
NUMERAL_ROI = (243, 203, 518, 394)


def load(p):
    return json.loads(p.read_text(encoding='utf-8-sig'))


def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def write_json(name, value):
    dest = OUT / name
    assert dest.resolve().is_relative_to(OUT.resolve())
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(value, indent=2) + '\n', encoding='utf-8')


def protected():
    before = load(OUT / 'protected-before.json')['files']
    assert all((ROOT / p).is_file() and sha(ROOT / p) == h for p, h in before.items())
    for p, h in load(OUT / 'source-manifest.json')['sources'].items():
        assert sha(ROOT / p) == h, p
    return len(before)


def support(alpha, threshold=1):
    return alpha.point(lambda x: 255 if x >= threshold else 0)


def count(mask):
    return sum(mask.histogram()[1:])


def difference(a, b):
    channels = ImageChops.difference(a.convert('RGB'), b.convert('RGB')).split()
    return support(ImageChops.lighter(ImageChops.lighter(channels[0], channels[1]), channels[2]))


def union(masks):
    result = Image.new('L', SIZE)
    for mask in masks:
        result = ImageChops.lighter(result, support(mask))
    return result


def outside_count(diff, allowed):
    return count(ImageChops.multiply(diff, ImageChops.invert(support(allowed))))


def luminance(rgb):
    channels = [v / 255 for v in rgb[:3]]
    channels = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in channels]
    return sum(a * b for a, b in zip(channels, (.2126, .7152, .0722)))


def contrast(a, b):
    return (max(a, b) + .05) / (min(a, b) + .05)


def char_layers():
    """Reconstruct separable existing cutouts from recorded, unchanged transforms."""
    placements = load(PROOF / 'placement-zones.json')['placements']
    layers = {}
    for name in ('Mara', 'Owen'):
        p = placements[name]
        raw = Image.open(PROOF / p['file']).convert('RGBA')
        tile = raw.crop(tuple(p['crop_source_px']))
        tile.thumbnail(tuple(p['fit_envelope']), Image.Resampling.LANCZOS)
        assert list(tile.size) == p['resized_size']
        layer = Image.new('RGBA', SIZE)
        layer.alpha_composite(tile, tuple(p['art_top_left']))
        if name == 'Mara':
            mask = Image.new('L', SIZE)
            ImageDraw.Draw(mask).polygon(p['existing_chair_occluder_polygon'], fill=255)
            layer.putalpha(ImageChops.multiply(layer.getchannel('A'), ImageChops.invert(mask)))
        layers[name] = layer
    combined = Image.new('RGBA', SIZE)
    for layer in layers.values():
        combined.alpha_composite(layer)
    assert combined.tobytes() == Image.open(PROOF / 'static-character-layer.png').convert('RGBA').tobytes()
    return layers


CASE = load(STUDY / 'B-proposed-case.json')['candidate']
CANONICAL = load(ROOT / 'src/cases/content/case-001/case.json')
BACKGROUND = Image.open(ROOT / 'public/assets/cases/case-001/lounge-background.webp').convert('RGBA').resize(SIZE, Image.Resampling.LANCZOS)
CHARACTERS = char_layers()
CONTROL = [Image.open(STUDY / 'B' / f'{name}-960.png').convert('RGB') for name in ('original', 'changed')]


def asset(v):
    name = v['asset']['id'].removeprefix('asset-')
    path = ROOT / 'public/assets/cases/case-001/owen-backpack.png' if name == 'owen-backpack' else ART / f'{name}-candidate.png'
    return Image.open(path).convert('RGBA'), path


def tonal_passport(strength):
    raw = Image.open(ART / 'passport-candidate.png').convert('RGBA')
    # Select blue cover material smoothly; keep gold/cream marks and alpha intact.
    increments = (10, 14, 18) if strength == 'a' else (18, 24, 30)
    pixels = []
    for red, green, blue, alpha in raw.getdata():
        weight = min(1., max(0., (blue - red) / 25)) * min(1., max(0., (150 - max(red, green, blue)) / 70))
        pixels.append((min(255, round(red + increments[0] * weight)), min(255, round(green + increments[1] * weight)), min(255, round(blue + increments[2] * weight)), alpha))
    result = raw.copy()
    result.putdata(pixels)
    assert result.getchannel('A').tobytes() == raw.getchannel('A').tobytes()
    return result, {'cover_mask': 'clamp((B-R)/25)*clamp((150-maxRGB)/70)', 'RGB_increments_times_mask': increments, 'alpha': 'unchanged', 'mat': 'unchanged'}


def number_assets(kind):
    master = Image.open(ART / 'stand-master-candidate.png').convert('RGBA')
    font_size, tracking = (260, 0) if kind == 'a' else (248, 8)
    font = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', font_size)
    result = {}
    for number in ('12', '21'):
        image = master.copy()
        if kind == 'a':
            ImageDraw.Draw(image).text((384, 302), number, font=font, anchor='mm', fill=(255, 232, 160, 255), stroke_width=2, stroke_fill=(72, 47, 12, 255))
        else:
            # Same font/size/tracking for both strings; tight glyph render centered
            # within the existing shared numeral-bearing ROI, without scaling.
            tile = Image.new('RGBA', (700, 400))
            draw = ImageDraw.Draw(tile)
            x = 10
            for char in number:
                draw.text((x, 10), char, font=font, anchor='lt', fill=(255, 232, 160, 255), stroke_width=2, stroke_fill=(72, 47, 12, 255))
                x += draw.textlength(char, font=font) + tracking
            glyph = tile.crop(tile.getchannel('A').getbbox())
            assert glyph.width <= NUMERAL_ROI[2] - NUMERAL_ROI[0] and glyph.height <= NUMERAL_ROI[3] - NUMERAL_ROI[1], glyph.size
            image.alpha_composite(glyph, (NUMERAL_ROI[0] + (275 - glyph.width) // 2, NUMERAL_ROI[1] + (191 - glyph.height) // 2))
        old = Image.open(ART / f'stand-{number}-candidate.png').convert('RGBA')
        mask = Image.new('L', old.size)
        ImageDraw.Draw(mask).rectangle((243, 203, 517, 393), fill=255)
        assert outside_count(difference(old, image), mask) == 0
        assert support(old.getchannel('A'), 128).tobytes() == support(image.getchannel('A'), 128).tobytes()
        result[f'object-stand-{number}'] = image
    return result, {'font': 'C:/Windows/Fonts/arialbd.ttf', 'font_size': font_size, 'tracking': tracking, 'fill': [255, 232, 160, 255], 'stroke_width': 2, 'stroke_fill': [72, 47, 12, 255], 'ROI': NUMERAL_ROI, 'body': 'unchanged blank master, shared variants'}


def translated_owen(dx, dy):
    layer = CHARACTERS['Owen']
    bb = layer.getchannel('A').getbbox()
    assert bb[0] + dx >= 0 and bb[1] + dy >= 0 and bb[2] + dx <= 960 and bb[3] + dy <= 540
    result = Image.new('RGBA', SIZE)
    result.alpha_composite(layer, (dx, dy))
    assert result.crop((bb[0] + dx, bb[1] + dy, bb[2] + dx, bb[3] + dy)).tobytes() == layer.crop(bb).tobytes()
    return result


def render(overrides=None, displacement=(0, 0)):
    overrides = overrides or {}
    pair, all_layers, transforms, visibility = [], [], [], []
    owen = translated_owen(*displacement)
    for scene in CASE['scenes']:
        image = BACKGROUND.copy()
        image.alpha_composite(CHARACTERS['Mara'])
        image.alpha_composite(owen)
        layers, tx = {}, {}
        for v in scene['visuals']:
            raw, path = asset(v)
            raw = overrides.get(v['objectId'], raw)
            width, height = round(v['size']['width'] * 960), round(v['size']['height'] * 540)
            origin = (round(v['position']['x'] * 960 - width / 2), round(v['position']['y'] * 540 - height / 2))
            tile = raw.resize((width, height), Image.Resampling.LANCZOS)
            layer = Image.new('RGBA', SIZE)
            layer.alpha_composite(tile, origin)
            image.alpha_composite(layer)
            layers[v['objectId']] = layer
            tx[v['objectId']] = {'origin': origin, 'tile': [width, height], 'source_dimensions': list(raw.size), 'source': path.relative_to(ROOT).as_posix()}
        visible = owen.getchannel('A')
        for layer in layers.values():
            visible = ImageChops.multiply(visible, ImageChops.invert(layer.getchannel('A')))
        pair.append(image.convert('RGB'))
        all_layers.append(layers)
        transforms.append(tx)
        visibility.append(visible)
    return pair, all_layers, transforms, visibility


BASE_PAIR, BASE_LAYERS, BASE_TX, BASE_VIS = render()
assert all(a.tobytes() == b.tobytes() for a, b in zip(BASE_PAIR, CONTROL)), 'Control source reconstruction is not exact'


def mapped_box(tx, source_roi, width=960):
    ox, oy = tx['origin']
    tw, th = tx['tile']
    sw, sh = tx['source_dimensions']
    return tuple(round((o + value * scale) * width / 960) for o, value, scale in ((ox, source_roi[0], tw / sw), (oy, source_roi[1], th / sh), (ox, source_roi[2], tw / sw), (oy, source_roi[3], th / sh)))


def median_luminance(image, box):
    crop = image.crop(box)
    return {'samples': crop.width * crop.height, 'median': statistics.median(luminance(x) for x in crop.getdata()), 'box': box}


def component_sizes(mask):
    pixels = set((x, y) for y in range(mask.height) for x in range(mask.width) if mask.getpixel((x, y)))
    sizes = []
    while pixels:
        stack = [pixels.pop()]
        n = 0
        while stack:
            x, y = stack.pop()
            n += 1
            for adjacent in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
                if adjacent in pixels:
                    pixels.remove(adjacent)
                    stack.append(adjacent)
        sizes.append(n)
    return sorted(sizes, reverse=True)


def candidate_metrics(cid, pair, layers, tx, vis, overrides, displacement):
    event_mask = union([layer.getchannel('A') for ll in layers for key, layer in ll.items() if key in ('object-passport', 'object-star-wallet', 'object-stand-12', 'object-stand-21')])
    pair_diff = difference(*pair)
    regions = {'passport': [160,240,270,335], 'left_numeral': [290,130,382,225], 'right_numeral': [674,130,766,225], 'wallet_departure': [310,245,425,330], 'wallet_arrival': [665,245,780,330]}
    outside = pair_diff.copy()
    event_rows = []
    for name, box in regions.items():
        cropped = pair_diff.crop(box)
        event_rows.append({'event_region': name, 'ROI': box, 'changed_pixels': count(cropped), 'local_bbox': cropped.getbbox()})
        ImageDraw.Draw(outside).rectangle((box[0],box[1],box[2]-1,box[3]-1), fill=0)
    allowed_delta = []
    for si in range(2):
        allowed = union([layers[si][key].getchannel('A') for key in overrides if key in layers[si]])
        if displacement != (0, 0):
            allowed = union([allowed, CHARACTERS['Owen'].getchannel('A'), translated_owen(*displacement).getchannel('A')])
        changed = difference(pair[si], CONTROL[si])
        allowed_delta.append({'endpoint': ('original','changed')[si], 'changed_pixels_vs_B0': count(changed), 'bbox': changed.getbbox(), 'outside_allowed_variable_pixels': outside_count(changed, allowed)})
    owen = translated_owen(*displacement)
    target_intrusion = []
    for t in CASE['scenes'][1]['interactionRegions']:
        g = t['geometry'];x,y = g['origin'].values();w,h=g['size'].values()
        box=(math.floor(x*960), math.floor(y*540), math.ceil((x+w)*960), math.ceil((y+h)*540))
        target_intrusion.append({'objectId':t['objectId'], 'Owen_alpha_gt0_inside_conservative_target':count(support(owen.getchannel('A')).crop(box))})
    clue_delta = []
    if displacement != (0, 0):
        for si in range(2):
            d=difference(pair[si], CONTROL[si])
            for key in ('object-passport','object-document-mat','object-star-wallet','object-stand-12','object-stand-21'):
                if key in layers[si]:clue_delta.append({'endpoint':si,'objectId':key,'changed_pixels_on_clue_alpha':count(ImageChops.multiply(d,support(layers[si][key].getchannel('A'))))})
    width_rows=[]
    for width in (960,)+WIDTHS:
        image=pair[0] if width==960 else pair[0].resize((width,round(width*9/16)),Image.Resampling.LANCZOS)
        passport_sample=median_luminance(image,mapped_box(tx[0]['object-passport'],(380,365,440,405),width))
        mat_sample=median_luminance(image,mapped_box(tx[0]['object-document-mat'],(650,260,710,310),width))
        ratio=contrast(passport_sample['median'],mat_sample['median'])
        glyphs=[]
        for number in ('12','21'):
            raw=overrides.get(f'object-stand-{number}',Image.open(ART/f'stand-{number}-candidate.png').convert('RGBA'))
            master=Image.open(ART/'stand-master-candidate.png').convert('RGBA')
            mask=difference(raw,master)
            bbox=mask.getbbox();tr=tx[0][f'object-stand-{number}']
            # Native stand tile, then uniform display scale. Thresholded glyph
            # mask is a continuity proxy, not a legibility/recognition test.
            tw,th=tr['tile'];w=max(1,round(tw*width/960));h=max(1,round(th*width/960))
            scaled=mask.resize((w,h),Image.Resampling.LANCZOS).point(lambda x:255 if x>=128 else 0)
            sizes=component_sizes(scaled)
            glyphs.append({'number':number,'source_bbox':bbox,'CSS_bbox_dimensions':[(bbox[2]-bbox[0])*tw/raw.width*width/960,(bbox[3]-bbox[1])*th/raw.height*width/960],'thresholded_component_sizes':sizes,'thresholded_pixels':count(scaled),'mask_threshold':128})
        width_rows.append({'width':width,'CSS_scene':[width,width*9/16],'raster_scene':list(image.size),'passport_sample':passport_sample,'mat_sample':mat_sample,'material_patch_contrast_proxy':ratio,'glyphs':glyphs})
    # Passport silhouette size preserved in every tonal candidate.
    pb=support(layers[0]['object-passport'].getchannel('A'),128).getbbox()
    ob=support(vis[0],9).getbbox();baseob=support(BASE_VIS[0],9).getbbox()
    unchanged_layers=all(layers[si][k].tobytes()==BASE_LAYERS[si][k].tobytes() for si in range(2) for k in layers[si] if k not in overrides)
    regression={
        'R1': len(CASE['changes'])==3 and [(x['id'],x['kind']) for x in CASE['changes']]==[(x['id'],x['kind']) for x in CANONICAL['changes']],
        'R2': outside_count(pair_diff,event_mask)==0 and count(outside)==0,
        'R3': unchanged_layers and all(x['outside_allowed_variable_pixels']==0 for x in allowed_delta),
        'R4': all(not difference(pair[si],CONTROL[si]).crop((0,292,134,540)).getbbox() for si in range(2)),
        'R5': vis[0].tobytes()==vis[1].tobytes(),
        'R6': 'object-passport' in layers[0] and 'object-passport' not in layers[1] and event_rows[0]['changed_pixels']>0,
        'R7': all(event_rows[i]['changed_pixels']>0 for i in (1,2)) and {v['objectId']:v['position']['x'] for v in CASE['scenes'][1]['visuals'] if 'stand-' in v['objectId']}=={'object-stand-21':.35,'object-stand-12':.75},
        'R8': all(event_rows[i]['changed_pixels']>0 for i in (3,4)) and layers[0]['object-star-wallet'].getchannel('A').getbbox()[0]<480 and layers[1]['object-star-wallet'].getchannel('A').getbbox()[0]>480,
        'R9': all(x['Owen_alpha_gt0_inside_conservative_target']==0 for x in target_intrusion) and all(x['changed_pixels_on_clue_alpha']==0 for x in clue_delta),
        'R10': sha(STUDY/'B-proposed-case.json')==load(OUT/'source-manifest.json')['sources'][(STUDY/'B-proposed-case.json').relative_to(ROOT).as_posix()],
        'R11': all(im.size==SIZE for im in pair) and displacement[1]==0,
        'R12': 'MANUAL_REVIEW_REQUIRED; no new source props/expressions/gestures; do not infer from metrics'}
    return {'id':cid,'regression':regression,'structural_status':'PASS' if all(v is True for k,v in regression.items() if k!='R12') else 'REJECT','B0_deltas':allowed_delta,'pair_changed_pixels':count(pair_diff),'event_regions':event_rows,'unexplained_pair_pixels':count(outside),'outside_event_alpha_pixels':outside_count(pair_diff,event_mask),'passport_solid_native_bbox':pb,'widths':width_rows,'Owen':{'translation_native':displacement,'effective_visible_bbox':ob,'B0_effective_bbox':baseob,'visible_alpha_gt8_pixels':count(support(vis[0],9)),'B0_visible_alpha_gt8_pixels':count(support(BASE_VIS[0],9)),'target_intrusion':target_intrusion,'clue_delta':clue_delta,'scale':'unchanged existing cutout','plant_table_envelope':[528,162,912,432],'visible_width_to_table_width':(ob[2]-ob[0])/384,'full_source_alpha_pixels':count(support(owen.getchannel('A')))}}


def make_candidate(cid, parts):
    folder=OUT/'candidates'/cid
    assert not folder.exists(), f'Preserve existing candidate: {cid}'
    overrides={};params={};displacement=(0,0)
    if 'passport' in parts:
        im,params['passport']=tonal_passport(parts['passport']);overrides['object-passport']=im
    if 'numerals' in parts:
        imgs,params['numerals']=number_assets(parts['numerals']);overrides.update(imgs)
    if 'Owen' in parts:displacement=tuple(parts['Owen']);params['Owen']={'translation_native':displacement,'source':'existing Owen cutout at original scale','Mara':'unchanged'}
    pair,layers,tx,vis=render(overrides,displacement)
    metrics=candidate_metrics(cid,pair,layers,tx,vis,overrides,displacement)
    folder.mkdir(parents=True);(folder/'assets').mkdir()
    for key,image in overrides.items():image.save(folder/'assets'/f'{key}.png')
    if displacement!=(0,0):translated_owen(*displacement).save(folder/'assets/Owen-translated-existing-layer.png')
    files=[]
    for endpoint,image in zip(('original','changed'),pair):
        dest=folder/f'{endpoint}-960.png'
        if cid=='B0':shutil.copyfile(STUDY/'B'/f'{endpoint}-960.png',dest)
        else:image.save(dest)
        files.append({'path':dest.relative_to(OUT).as_posix(),'sha256':sha(dest),'dimensions':list(image.size),'control_copy_exact':cid=='B0'})
        for width in WIDTHS:
            dest=OUT/'previews'/cid/f'{endpoint}-{width}.png';dest.parent.mkdir(parents=True,exist_ok=True);image.resize((width,round(width*9/16)),Image.Resampling.LANCZOS).save(dest)
            files.append({'path':dest.relative_to(OUT).as_posix(),'sha256':sha(dest),'dimensions':[width,round(width*9/16)],'CSS_scene':[width,width*9/16],'method':'full-frame LANCZOS; nearest integer raster height; no crop/sharpen/retouch'})
    difference(*pair).save(folder/'pair-difference-DIAGNOSTIC.png')
    for si,endpoint in enumerate(('original','changed')):difference(pair[si],CONTROL[si]).save(folder/f'{endpoint}-versus-B0-DIAGNOSTIC.png')
    return metrics,{'id':cid,'parts':parts,'transformation_parameters':params,'outputs':files,'structural_status':metrics['structural_status'],'manual_status':'PENDING_REVIEW','source_chain':'source-manifest.json; exact immutable CASE and source assets; derived files only under this study'}


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--combined',action='store_true');parser.add_argument('--recheck',action='store_true');args=parser.parse_args()
    protected()
    if args.recheck:
        measurements=load(OUT/'measurements.json');manifest=load(OUT/'candidate-manifest.json')
        for index,record in enumerate(manifest['candidates']):
            parts=record['parts'];overrides={};displacement=tuple(parts.get('Owen',(0,0)))
            if 'passport' in parts:overrides['object-passport']=tonal_passport(parts['passport'])[0]
            if 'numerals' in parts:overrides.update(number_assets(parts['numerals'])[0])
            pair,layers,tx,vis=render(overrides,displacement)
            for endpoint,image in zip(('original','changed'),pair):assert image.tobytes()==Image.open(OUT/'candidates'/record['id']/f'{endpoint}-960.png').convert('RGB').tobytes()
            metrics=candidate_metrics(record['id'],pair,layers,tx,vis,overrides,displacement)
            previous=measurements['candidates'][index]
            if 'manual_review' in previous:
                metrics['manual_review']=previous['manual_review'];metrics['regression']['R12']=previous['regression']['R12']
                for key in ('source_alpha_bbox','target_bbox_distances'):
                    if key in previous['Owen']:metrics['Owen'][key]=previous['Owen'][key]
            measurements['candidates'][index]=metrics;record['structural_status']=metrics['structural_status']
            print(record['id'],metrics['structural_status'],flush=True)
        measurements['verifier_correction']='R7 now compares stand-ID/position mapping independent of scene-array order; initial results archived in records/. No candidate images changed.'
        write_json('measurements.json',measurements);write_json('candidate-manifest.json',manifest);assert protected();return
    if args.combined:
        measurements=load(OUT/'measurements.json');manifest=load(OUT/'candidate-manifest.json')
        for cid in ('C1a','C2a','C3a'):
            record=next(x for x in manifest['candidates'] if x['id']==cid)
            assert record['structural_status']=='PASS' and record['manual_status']=='CONDITIONAL_RETAIN_FOR_COMBINATION'
        specs=[('C123-provisional',{'passport':'a','numerals':'a','Owen':[24,0]})]
    else:
        assert not (OUT/'candidate-manifest.json').exists()
        measurements={'method':'Fresh deterministic source-pixel transforms and in-memory exact B0 reconstruction; manual/physical recognition not inferred','Pillow_version':Image.__version__,'candidates':[]}
        manifest={'control_sources':[{'path':(STUDY/'B'/f'{e}-960.png').relative_to(ROOT).as_posix(),'sha256':sha(STUDY/'B'/f'{e}-960.png')} for e in ('original','changed')],'candidate_geometry_source':(STUDY/'B-proposed-case.json').relative_to(ROOT).as_posix(),'geometry_sha256':sha(STUDY/'B-proposed-case.json'),'candidates':[]}
        specs=[('B0',{}),('C1a',{'passport':'a'}),('C1b',{'passport':'b'}),('C2a',{'numerals':'a'}),('C2b',{'numerals':'b'}),('C3a',{'Owen':[24,0]}),('C3b',{'Owen':[48,0]})]
    for cid,parts in specs:
        metrics,record=make_candidate(cid,parts);measurements['candidates'].append(metrics);manifest['candidates'].append(record)
        # Persist each candidate immediately, including rejected evidence.
        write_json('measurements.json',measurements);write_json('candidate-manifest.json',manifest)
        print(cid,metrics['structural_status'],metrics['pair_changed_pixels'],flush=True)
    assert protected()


if __name__=='__main__':main()
