import json, hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / 'public/assets/cases/case-001'
OUT = Path(__file__).resolve().parent
FILES = ['lounge-background.webp','table.png','document-mat.png','owen-backpack.png','passport.png','star-wallet.png','stand-12.png','stand-21.png']
IDS = ['asset-lounge-background','asset-table','asset-document-mat','asset-owen-backpack','asset-passport','asset-star-wallet','asset-stand-12','asset-stand-21']
images, inventory = {}, []
for aid, name in zip(IDS, FILES):
    path = SOURCE/name
    im = Image.open(path)
    rgba = im.convert('RGBA')
    alpha = rgba.getchannel('A')
    hist = alpha.histogram()
    total = im.width*im.height
    inventory.append(dict(file=name,asset_id=aid,format=im.format,mode=im.mode,dimensions=list(im.size),bytes=path.stat().st_size,alpha_channel='A' in im.getbands(),transparent_percent=round(hist[0]*100/total,4),nonopaque_percent=round(sum(hist[:255])*100/total,4),alpha_bbox=alpha.getbbox(),sha256=hashlib.sha256(path.read_bytes()).hexdigest()))
    images[aid]=rgba
    if name!='lounge-background.webp':
        thumb=rgba.copy(); thumb.thumbnail((380,300),Image.Resampling.LANCZOS)
        panel=Image.new('RGB',(1200,350),'white'); draw=ImageDraw.Draw(panel)
        for i,(label,color) in enumerate([('White',(255,255,255)),('Dark gray',(40,40,40)),('Lounge',(165,153,131))]):
            tile=Image.new('RGBA',(400,320),color+(255,))
            tile.alpha_composite(thumb,((400-thumb.width)//2,(320-thumb.height)//2))
            panel.paste(tile.convert('RGB'),(i*400,30)); draw.text((i*400+12,8),name+' / '+label,fill='black')
        panel.save(OUT/(path.stem+'-transparency.png'))

case=json.loads((ROOT/'src/cases/content/case-001/case.json').read_text(encoding='utf-8'))
placements={}
def compose(scene):
    canvas=images[scene['background']['id']].resize((960,540),Image.Resampling.LANCZOS)
    placements[scene['id']]=[]
    for v in scene['visuals']:
        w=round(v['size']['width']*960); h=round(v['size']['height']*540)
        layer=images[v['asset']['id']].resize((w,h),Image.Resampling.LANCZOS)
        if v['rotationDegrees']: layer=layer.rotate(-v['rotationDegrees'],expand=True,resample=Image.Resampling.BICUBIC)
        x=round(v['position']['x']*960-layer.width/2); y=round(v['position']['y']*540-layer.height/2)
        canvas.alpha_composite(layer,(x,y))
        placements[scene['id']].append(dict(object=v['objectId'],asset=v['asset']['id'],center=[v['position']['x']*960,v['position']['y']*540],size=[w,h],rotation=v['rotationDegrees']))
    return canvas.convert('RGB')
before,after=[compose(s) for s in case['scenes']]
old={v['objectId']:v for v in case['scenes'][0]['visuals']}
new={v['objectId']:v for v in case['scenes'][1]['visuals']}
changed=[key for key in old if old[key]!=new.get(key)]
assert set(changed)=={'object-passport','object-star-wallet','object-stand-12','object-stand-21'}
assert case['scenes'][0]['background']==case['scenes'][1]['background']
assert old['object-stand-12']['position']==new['object-stand-21']['position']
assert old['object-stand-21']['position']==new['object-stand-12']['position']
assert 'object-passport' not in new
before.save(OUT/'original.png'); after.save(OUT/'changed.png')
side=Image.new('RGB',(1920,540)); side.paste(before); side.paste(after,(960,0)); side.save(OUT/'comparison.png')
diff=ImageChops.difference(before,after); diff.save(OUT/'difference.png')
mask=diff.convert('L').point(lambda p:255 if p else 0)
highlight=Image.new('RGB',(960,540),'black'); highlight.paste((255,60,100),(0,0,960,540),mask); highlight.save(OUT/'difference-mask.png')
for width in [390,320]:
    for name,im in [('original',before),('changed',after)]: im.resize((width,round(width*540/960)),Image.Resampling.LANCZOS).save(OUT/f'{name}-mobile-{width}.png')
(OUT/'inventory.json').write_text(json.dumps(inventory,indent=2),encoding='utf-8')
(OUT/'placements.json').write_text(json.dumps(placements,indent=2),encoding='utf-8')
for item in inventory:
    assert hashlib.sha256((SOURCE/item['file']).read_bytes()).hexdigest()==item['sha256']
print(json.dumps(inventory,indent=2))
