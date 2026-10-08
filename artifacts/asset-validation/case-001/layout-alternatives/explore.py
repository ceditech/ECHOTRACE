import copy,json,hashlib
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[4]; out=Path(__file__).resolve().parent
src=root/'public/assets/cases/case-001'; original=json.loads((root/'src/cases/content/case-001/case.json').read_text())
hashes={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in src.iterdir() if p.is_file()}
names=['lounge-background','table','document-mat','owen-backpack','passport','star-wallet','stand-12','stand-21']
base={'asset-'+n:Image.open(src/(n+('.webp' if n=='lounge-background' else '.png'))).convert('RGBA') for n in names}
configs={
 'A':dict(table='existing',stand_y=.335,doc_y=.445,wallet_y=.445,passport_size=(.07,.105),wallet_size=(.10,.12),mat_size=(.20,.28)),
 'B':dict(table='candidate',stand_y=.335,doc_y=.535,wallet_y=.535,passport_size=(.07,.105),wallet_size=(.10,.12),mat_size=(.20,.28)),
 'C':dict(table='existing',stand_y=.43,doc_y=.535,wallet_y=.535,passport_size=(.07,.105),wallet_size=(.10,.12),mat_size=(.20,.28),table_y=.61,table_size=(.42,.40))}
def render(scene,images):
 c=images[scene['background']['id']].resize((960,540),Image.Resampling.LANCZOS)
 for v in scene['visuals']:
  im=images[v['asset']['id']].resize((round(v['size']['width']*960),round(v['size']['height']*540)),Image.Resampling.LANCZOS)
  if v['rotationDegrees']:im=im.rotate(-v['rotationDegrees'],expand=True,resample=Image.Resampling.BICUBIC)
  c.alpha_composite(im,(round(v['position']['x']*960-im.width/2),round(v['position']['y']*540-im.height/2)))
 return c.convert('RGB')
for label,cfg in configs.items():
 target=out/label;target.mkdir(exist_ok=True)
 case=copy.deepcopy(original); edits=[]
 for scene in case['scenes']:
  for v in scene['visuals']:
   prev=copy.deepcopy(v);oid=v['objectId']
   if oid.startswith('object-stand-'):v['position']['y']=cfg['stand_y']
   if oid in ['object-passport','object-document-mat']:v['position']={'x':.22,'y':cfg['doc_y']}
   if oid=='object-star-wallet':v['position']['y']=cfg['wallet_y']
   if oid in ['object-passport','object-star-wallet','object-document-mat']:
    key={'object-passport':'passport_size','object-star-wallet':'wallet_size','object-document-mat':'mat_size'}[oid]
    v['size']=dict(zip(['width','height'],cfg[key]))
   if oid.startswith('object-table-') and 'table_y' in cfg:
    v['position']['y']=cfg['table_y'];v['size']=dict(zip(['width','height'],cfg['table_size']))
   if prev!=v:edits.append({'sceneId':scene['id'],'objectId':oid,'before':prev,'proposed':copy.deepcopy(v)})
 after=case['scenes'][1]; regions=[]
 centers={'object-passport':(.22,cfg['doc_y']),'object-stand-21':(.35,cfg['stand_y']),'object-stand-12':(.75,cfg['stand_y']),'object-star-wallet':(.75,cfg['wallet_y'])}
 for region in after['interactionRegions']:
  prev=copy.deepcopy(region);x,y=centers[region['objectId']]
  stand='stand' in region['objectId']
  w,h=(.16,.14) if stand else (.16,.10)
  offset=.09 if stand else .04
  if label=='B':h=.245;offset=.175 if stand else .1225
  region['geometry']={'kind':'rectangle','origin':{'x':x-w/2,'y':y-offset},'size':{'width':w,'height':h}}
  regions.append({'objectId':region['objectId'],'before':prev,'proposed':copy.deepcopy(region)})
 for i,a in enumerate(after['interactionRegions']):
  ga=a['geometry']; ax=ga['origin']['x'];ay=ga['origin']['y'];aw=ga['size']['width'];ah=ga['size']['height']
  assert 0<=ax<=1-aw and 0<=ay<=1-ah
  for b in after['interactionRegions'][i+1:]:
   gb=b['geometry'];bx=gb['origin']['x'];by=gb['origin']['y'];bw=gb['size']['width'];bh=gb['size']['height']
   assert not(ax<bx+bw and ax+aw>bx and ay<by+bh and ay+ah>by)
 # Proposed move endpoints must follow proposed visuals, without changing change IDs/evidence links.
 change_edits=[]
 for ch in case['changes']:
  if ch['kind']=='object_moved':
   prev=copy.deepcopy(ch);ch['from']['y']=cfg['wallet_y'];ch['to']['y']=cfg['wallet_y']
   change_edits.append({'changeId':ch['id'],'before':prev,'proposed':copy.deepcopy(ch)})
 images=dict(base)
 if cfg['table']=='candidate':images['asset-table']=Image.open(out.parent/'table-proof/table-candidate.png').convert('RGBA')
 before,changed=[render(s,images) for s in case['scenes']]
 before.save(target/'original.png');changed.save(target/'changed.png')
 panel=Image.new('RGB',(1920,540));panel.paste(before);panel.paste(changed,(960,0));panel.save(target/'comparison.png')
 for width in [390,320]:
  for name,im in [('original',before),('changed',changed)]:im.resize((width,round(width*540/960)),Image.Resampling.LANCZOS).save(target/f'{name}-mobile-{width}.png')
 diff={'proposal':label,'status':'PROPOSED_ONLY_NOT_CANONICAL','table_art':cfg['table'],'visualEdits':edits,'interactionRegionEdits':regions,'changeEndpointEdits':change_edits,'checks':{'regions_in_bounds':True,'regions_nonoverlapping':True,'passport_region_retained':True,'stand_discovery':'Both stand IDs remain participants of change-stands-exchanged; evidence mapping unchanged.'}}
 (target/'geometry-diff.json').write_text(json.dumps(diff,indent=2))
 (target/'proposed-scenes.json').write_text(json.dumps(case['scenes'],indent=2))
assert all(hashlib.sha256((src/n).read_bytes()).hexdigest()==h for n,h in hashes.items())
print('Three proposals generated; regions in bounds/nonoverlapping; production source hashes unchanged.')
