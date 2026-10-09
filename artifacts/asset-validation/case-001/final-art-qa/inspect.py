"""Read-only source inspection; writes diagnostics only beside this script."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[4]
OUT = Path(__file__).resolve().parent
ART = OUT.parent / 'B-art-refinement'
NAMES = ['table', 'document-mat', 'passport', 'star-wallet', 'stand-12', 'stand-21']

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def snapshot():
    result = {}
    for folder in ['src', 'public', 'docs', 'tests', 'artifacts/asset-validation/case-001']:
        for path in (ROOT / folder).rglob('*'):
            if path.is_file() and not path.is_relative_to(OUT):
                result[str(path.relative_to(ROOT))] = digest(path)
    for path in ROOT.iterdir():
        if path.is_file():
            result[str(path.relative_to(ROOT))] = digest(path)
    return result

baseline = snapshot()
result = {'method': 'Static Pillow pixel/geometry inspection; no device or participant test', 'assets': []}
for name in NAMES:
    im = Image.open(ART / f'{name}-candidate.png').convert('RGBA')
    alpha = im.getchannel('A')
    hist = alpha.histogram()
    interior = alpha.point(lambda value: 255 if value >= 128 else 0).filter(ImageFilter.MinFilter(15))
    interior_values = [a for a, m in zip(alpha.getdata(), interior.getdata()) if m]
    ih = [0] * 256
    for value in interior_values:
        ih[value] += 1
    result['assets'].append({'name': name, 'dimensions': im.size, 'sha256': digest(ART / f'{name}-candidate.png'),
        'alpha_histogram': hist, 'interior_method': 'alpha>=128 mask eroded 7 source pixels; heuristic, not semantic segmentation',
        'interior_pixels': len(interior_values), 'interior_min_alpha': min(interior_values),
        'interior_below_240': sum(ih[:240]), 'interior_alpha_252_253': ih[252] + ih[253],
        'alpha_bbox': alpha.getbbox(), 'solid_alpha_bbox': alpha.point(lambda a: 255 if a >= 128 else 0).getbbox()})
    # Native-size inspection panels: no replacement asset or retouched source.
    sheet = Image.new('RGB', (im.width * 3, im.height + 24), 'white')
    draw = ImageDraw.Draw(sheet)
    for index, color in enumerate([(255,255,255), (40,40,40), (165,153,131)]):
        tile = Image.new('RGBA', im.size, color + (255,))
        tile.alpha_composite(im)
        sheet.paste(tile.convert('RGB'), (index * im.width,24))
        draw.text((index * im.width+8,5), f'{name}: {color}; native pixels', fill='black')
    sheet.save(OUT / f'{name}-native-backgrounds.png')
    # Crop around a diagnostic boundary at 1:1, then tile over three backgrounds.
    boxes = {'table':(400,60,720,160), 'document-mat':(50,130,370,230), 'passport':(350,10,630,150),
             'star-wallet':(360,440,760,540), 'stand-12':(100,10,660,110), 'stand-21':(100,10,660,110)}
    box = boxes[name]
    crop = im.crop(box)
    panel = Image.new('RGB', (crop.width*3,crop.height+24),'white')
    pd = ImageDraw.Draw(panel)
    for i, color in enumerate([(255,255,255),(40,40,40),(165,153,131)]):
        tile=Image.new('RGBA',crop.size,color+(255,)); tile.alpha_composite(crop)
        panel.paste(tile.convert('RGB'),(i*crop.width,24));pd.text((i*crop.width+4,4),f'{name} crop {box}',fill='black')
    panel.save(OUT / f'{name}-edge-crop.png')

master=Image.open(ART/'stand-master-candidate.png').convert('RGBA')
s12=Image.open(ART/'stand-12-candidate.png').convert('RGBA')
s21=Image.open(ART/'stand-21-candidate.png').convert('RGBA')
mask=ImageChops.lighter(ImageChops.difference(s12,master).convert('RGB').convert('L'),ImageChops.difference(s21,master).convert('RGB').convert('L')).point(lambda p:255 if p else 0)
outside=ImageChops.multiply(ImageChops.difference(s12,s21).convert('RGB').convert('L'),ImageChops.invert(mask))
alpha_diff=ImageChops.difference(s12.getchannel('A'),s21.getchannel('A'))
result['stand_checks']={'full_alpha_equal':s12.getchannel('A').tobytes()==s21.getchannel('A').tobytes(),
    'solid_silhouette_equal':s12.getchannel('A').point(lambda a:255 if a>=128 else 0).tobytes()==s21.getchannel('A').point(lambda a:255 if a>=128 else 0).tobytes(),
    'alpha_equal_outside_master_overlay_union':ImageChops.multiply(alpha_diff,ImageChops.invert(mask)).getbbox() is None,
    'body_equal_outside_master_overlay_union':outside.getbbox() is None,'numeral_union_bbox':mask.getbbox()}

scenes=json.loads((OUT.parent/'layout-alternatives/B/proposed-scenes.json').read_text())
before={v['objectId']:v for v in scenes[0]['visuals']};after={v['objectId']:v for v in scenes[1]['visuals']}
result['changed_visual_ids']=[k for k in before if before[k]!=after.get(k)]
result['background_stable']=scenes[0]['background']==scenes[1]['background']
regions=scenes[1]['interactionRegions']
result['regions']=[]
for r in regions:
    g=r['geometry'];x,y=g['origin'].values();w,h=g['size'].values()
    result['regions'].append({'objectId':r['objectId'],'bounds_normalized':[x,y,x+w,y+h],
        'in_bounds':0<=x<=1-w and 0<=y<=1-h,
        'css_sizes_by_scene_width':{str(width):[round(w*width,3),round(h*width*9/16,3)] for width in [320,390,288,358]},
        'visible_visual_envelope':after.get(r['objectId'])})
overlaps=[]
for i,r in enumerate(result['regions']):
    x,y,xx,yy=r['bounds_normalized']
    for rr in result['regions'][i+1:]:
        a,b,aa,bb=rr['bounds_normalized']
        if x<aa and xx>a and y<bb and yy>b: overlaps.append([r['objectId'],rr['objectId']])
result['region_overlaps']=overlaps
result['mobile_visual_envelopes']={str(width):{v['objectId']:[round(v['size']['width']*width,3),round(v['size']['height']*width*9/16,3)] for v in scenes[0]['visuals']} for width in [320,390]}
for width in [320,390]:
    im=Image.open(ART/f'changed-mobile-{width}.png').convert('RGB')
    draw=ImageDraw.Draw(im)
    for i,r in enumerate(result['regions']):
        x,y,xx,yy=r['bounds_normalized'];draw.rectangle((round(x*im.width),round(y*im.height),round(xx*im.width),round(yy*im.height)),outline=['cyan','magenta','magenta','lime'][i],width=1)
    im.save(OUT/f'changed-region-overlay-{width}.png')
previous=json.loads((ART/'verification.json').read_text())
result['previous_protected_hashes_match_now']={p:digest(ROOT/p)==h for p,h in previous['protected_hashes'].items()}
result['protected_hashes_before']=baseline
current=snapshot()
result['protected_hashes_after']=current
result['protected_inputs_unchanged']=baseline==current
assert result['protected_inputs_unchanged']
(OUT/'verification.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k not in ['assets','protected_hashes_before','protected_hashes_after','mobile_visual_envelopes','regions']},indent=2))
print(json.dumps([{k:v for k,v in a.items() if k!='alpha_histogram'} for a in result['assets']],indent=2))
