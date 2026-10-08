import json, hashlib
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[4]
out=Path(__file__).resolve().parent
source=root/'public/assets/cases/case-001'
hashes={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in source.iterdir() if p.is_file()}
with Image.open(out/'table-candidate.png') as loaded:
    original_size=loaded.size
    candidate=loaded.copy()
# Export normalization only: the single generated candidate is fitted to the mandated 64:45 envelope.
candidate=candidate.resize((1280,900),Image.Resampling.LANCZOS)
candidate.save(out/'table-candidate.png')
names=['lounge-background','table','document-mat','owen-backpack','passport','star-wallet','stand-12','stand-21']
images={'asset-'+n:Image.open(source/(n+('.webp' if n=='lounge-background' else '.png'))).convert('RGBA') for n in names}
images['asset-table']=candidate.convert('RGBA')
case=json.loads((root/'src/cases/content/case-001/case.json').read_text())
def render(scene):
    canvas=images[scene['background']['id']].resize((960,540),Image.Resampling.LANCZOS)
    for v in scene['visuals']:
        im=images[v['asset']['id']].resize((round(v['size']['width']*960),round(v['size']['height']*540)),Image.Resampling.LANCZOS)
        if v['rotationDegrees']: im=im.rotate(-v['rotationDegrees'],expand=True,resample=Image.Resampling.BICUBIC)
        canvas.alpha_composite(im,(round(v['position']['x']*960-im.width/2),round(v['position']['y']*540-im.height/2)))
    return canvas.convert('RGB')
before,after=[render(s) for s in case['scenes']]
before.save(out/'original-table-proof.png'); after.save(out/'changed-table-proof.png')
comparison=Image.new('RGB',(1920,540)); comparison.paste(before); comparison.paste(after,(960,0)); comparison.save(out/'comparison-table-proof.png')
for width in [390,320]: before.resize((width,round(width*540/960)),Image.Resampling.LANCZOS).save(out/f'original-mobile-{width}.png')
a=candidate.convert('RGBA').getchannel('A'); h=a.histogram()
info={'format':Image.open(out/'table-candidate.png').format,'mode':candidate.mode,'generated_dimensions':original_size,'export_dimensions':candidate.size,'transparent_percent':h[0]*100/(1280*900),'alpha_extrema':a.getextrema(),'alpha_bbox':a.getbbox(),'source_hashes_unchanged':all(hashlib.sha256((source/n).read_bytes()).hexdigest()==s for n,s in hashes.items()),'generation_count':1,'export_note':'Single generation normalized to exact 64:45 ratio; no object or coordinate offsets.'}
(out/'verification.json').write_text(json.dumps(info,indent=2))
print(json.dumps(info))
