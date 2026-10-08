import json,hashlib,copy
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageChops
root=Path(__file__).resolve().parents[4];out=Path(__file__).resolve().parent
src=root/'public/assets/cases/case-001'
protected=[p for p in src.iterdir() if p.is_file()]+[root/'src/cases/content/case-001/case.json',root/'docs/cases/CASE_001_THE_MISSING_PASSPORT.md',root/'artifacts/asset-validation/case-001/layout-alternatives/B/proposed-scenes.json']
hashes={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in protected}
paths=json.loads((out/'generation-paths.json').read_text())
sizes={'table':(1280,900),'document-mat':(800,630),'passport':(640,540),'star-wallet':(800,540),'stand-master':(768,648)}
for name,path in paths.items():
 with Image.open(path) as im:
  im.convert('RGBA').resize(sizes[name],Image.Resampling.LANCZOS).save(out/f'{name}-candidate.png')
master=Image.open(out/'stand-master-candidate.png').convert('RGBA')
font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',260)
numeral_mask=Image.new('L',master.size)
for numeral in ['12','21']:
 im=master.copy();draw=ImageDraw.Draw(im)
 draw.text((384,302),numeral,font=font,anchor='mm',fill=(245,209,120,255),stroke_width=2,stroke_fill=(72,47,12,255))
 md=ImageDraw.Draw(numeral_mask);md.text((384,302),numeral,font=font,anchor='mm',fill=255,stroke_width=2)
 im.save(out/f'stand-{numeral}-candidate.png')
stand_diff=ImageChops.difference(Image.open(out/'stand-12-candidate.png'),Image.open(out/'stand-21-candidate.png'))
stand_diff.save(out/'stand-numeral-difference.png')
outside=ImageChops.multiply(stand_diff.convert('RGB').convert('L'),ImageChops.invert(numeral_mask.point(lambda p:255 if p else 0)))
assert outside.getbbox() is None
scenes=json.loads((root/'artifacts/asset-validation/case-001/layout-alternatives/B/proposed-scenes.json').read_text())
assets={'asset-lounge-background':Image.open(src/'lounge-background.webp').convert('RGBA'),'asset-owen-backpack':Image.open(src/'owen-backpack.png').convert('RGBA')}
for name in ['table','document-mat','passport','star-wallet','stand-12','stand-21']:assets['asset-'+name]=Image.open(out/f'{name}-candidate.png').convert('RGBA')
def render(scene):
 c=assets[scene['background']['id']].resize((960,540),Image.Resampling.LANCZOS)
 for v in scene['visuals']:
  im=assets[v['asset']['id']].resize((round(v['size']['width']*960),round(v['size']['height']*540)),Image.Resampling.LANCZOS)
  if v['rotationDegrees']:im=im.rotate(-v['rotationDegrees'],expand=True,resample=Image.Resampling.BICUBIC)
  c.alpha_composite(im,(round(v['position']['x']*960-im.width/2),round(v['position']['y']*540-im.height/2)))
 return c.convert('RGB')
before,after=[render(s) for s in scenes]
before.save(out/'original-refined.png');after.save(out/'changed-refined.png')
placement=before.copy();pd=ImageDraw.Draw(placement)
for label,box in [('Mara proposed seated zone',(12,375,105,515)),('Owen proposed seated zone',(810,265,856,375))]:
 pd.rectangle(box,outline=(80,240,230),width=2);pd.text((box[0],box[1]-15),label,fill=(80,240,230))
placement.save(out/'character-placement-zones.png')
panel=Image.new('RGB',(1920,540));panel.paste(before);panel.paste(after,(960,0));panel.save(out/'comparison-refined.png')
mask=ImageChops.difference(before,after).convert('L').point(lambda p:255 if p else 0);mask.save(out/'difference-mask.png')
for width in [390,320]:
 for name,im in [('original',before),('changed',after)]:im.resize((width,round(width*540/960)),Image.Resampling.LANCZOS).save(out/f'{name}-mobile-{width}.png')
inventory=[]
for name in ['table','document-mat','passport','star-wallet','stand-12','stand-21']:
 path=out/f'{name}-candidate.png';im=Image.open(path);a=im.getchannel('A');h=a.histogram()
 inventory.append({'file':path.name,'format':im.format,'mode':im.mode,'dimensions':im.size,'bytes':path.stat().st_size,'transparent_percent':100*h[0]/(im.width*im.height),'partial_alpha_percent':100*sum(h[1:255])/(im.width*im.height),'alpha_bbox':a.getbbox()})
 thumbnail=im.copy();thumbnail.thumbnail((360,280),Image.Resampling.LANCZOS)
 sheet=Image.new('RGB',(1140,310),'white')
 for i,color in enumerate([(255,255,255),(40,40,40),(165,153,131)]):
  tile=Image.new('RGBA',(380,310),color+(255,));tile.alpha_composite(thumbnail,((380-thumbnail.width)//2,(310-thumbnail.height)//2));sheet.paste(tile.convert('RGB'),(i*380,0))
 sheet.save(out/f'{name}-isolation.png')
regions=scenes[1]['interactionRegions']; valid=True
for i,r in enumerate(regions):
 g=r['geometry'];x=g['origin']['x'];y=g['origin']['y'];w=g['size']['width'];h=g['size']['height'];assert 0<=x<=1-w and 0<=y<=1-h
 for rr in regions[i+1:]:
  gg=rr['geometry'];xx=gg['origin']['x'];yy=gg['origin']['y'];ww=gg['size']['width'];hh=gg['size']['height'];assert not(x<xx+ww and x+w>xx and y<yy+hh and y+h>yy)
old={v['objectId']:v for v in scenes[0]['visuals']};new={v['objectId']:v for v in scenes[1]['visuals']}
assert {k for k in old if old[k]!=new.get(k)}=={'object-passport','object-star-wallet','object-stand-12','object-stand-21'}
assert all(hashlib.sha256((root/p).read_bytes()).hexdigest()==h for p,h in hashes.items())
(out/'verification.json').write_text(json.dumps({'inventory':inventory,'stand_non_numeral_pixels_identical':True,'regions_in_bounds_nonoverlapping':True,'protected_hashes':hashes,'protected_inputs_unchanged':True,'canonical_visual_changes_only':True,'geometry_source':'layout-alternatives/B/proposed-scenes.json','touch_region_at_full_320':[51.2,44.1]},indent=2))
print(json.dumps(inventory))
