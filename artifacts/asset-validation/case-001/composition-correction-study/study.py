"""Deterministic offline compositing study. Source files are always read-only."""
import copy, hashlib, json, math, statistics, subprocess
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw

OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[3];CASE=OUT.parent
ART=CASE/'B-art-refinement';PROOF=CASE/'character-placement-proof';SIZE=(960,540)
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def load(path):return json.loads(path.read_text(encoding='utf-8-sig'))
def save(name,value):(OUT/name).write_text(json.dumps(value,indent=2)+'\n',encoding='utf-8')
def binary(alpha):return alpha.point(lambda a:255 if a>=128 else 0)
def count(mask):return mask.histogram()[255]
def differences(a,b):
 r,g,blue=ImageChops.difference(a.convert('RGB'),b.convert('RGB')).split()
 return ImageChops.lighter(ImageChops.lighter(r,g),blue).point(lambda v:255 if v else 0)
def protected():
 before=load(OUT/'protected-before.json')
 paths={p.replace('\\','/') for p in subprocess.check_output(['rg','--files','--hidden','-g','!.git','-g','!node_modules','-g','!.next'],cwd=ROOT,text=True).splitlines() if 'composition-correction-study' not in p}
 assert paths==set(before),'Unexpected added/removed existing file'
 assert all(sha(ROOT/p)==h for p,h in before.items()),'Protected file changed'
 return len(before)

protected()
assert subprocess.check_output(['git','branch','--show-current'],cwd=ROOT,text=True).strip()=='feature/echotrace'
source_manifest=load(CASE/'mobile-verification-prototype/asset-manifest.json')
for name,h in source_manifest['source_files'].items():assert sha(ROOT/name)==h,f'Missing/inconsistent source: {name}'
canonical=load(ROOT/'src/cases/content/case-001/case.json')
scenes=canonical['scenes'];priorB=load(CASE/'layout-alternatives/B/proposed-scenes.json')
# Manually traced conservative inner tabletop surface, excluding brass front lip.
# Points are source pixels on the existing 1280x900 table candidate, not 3D geometry.
surface=[(245,100),(1040,100),(1132,123),(1180,165),(1244,449),(1254,520),(1237,568),(1200,606),(1140,636),(1030,659),(251,663),(147,642),(70,605),(32,556),(26,511),(93,250),(131,170),(173,126)]
config={'canvas':SIZE,'surface_source_polygon':surface,'surface_source_dimensions':[1280,900],
 'stand_foot_source_roi':[100,525,668,605],'stand_base_anchor_source':[384,595],
 'surface_method':'Manually traced inner marble plane. Flat solid alpha footprint and stand base ROI are compared with this mask; visual inspection is independent.',
 'contact_proxy_goals':{'flat_inside_fraction':0.98,'stand_foot_inside_fraction':0.95},
 'A1':{'table_offset_y':0,'mat_factor':0.90,'passport_factor':0.85,'wallet_factor':0.85,'flat_alignment':'top within canonical envelope; uniform contain; horizontal center','stands':'shift down to align solid bottom with envelope bottom'},
 'A2':{'table_offset_y':-20,'mat_factor':0.60,'passport_factor':0.48,'wallet_factor':0.48,'flat_alignment':'top within canonical envelope; uniform contain; horizontal center','stands':'shift down to align solid bottom with envelope bottom'},
 'B':{'status':'OFFLINE_PROPOSAL_NOT_CANONICAL','rationale':'Native candidate aspect ratios; smallest bounded reference composition with modest document/wallet size retained and independently separated targets'}}
save('study-config.json',config)
proposal=copy.deepcopy(scenes)
for s in proposal:
 for v in s['visuals']:
  key=v['objectId']
  if key=='object-document-mat':v['position']={'x':.22,'y':.535};v['size']={'width':.2,'height':.28}
  elif key=='object-passport':v['position']={'x':.22,'y':.535};v['size']={'width':.08,'height':.12}
  elif key=='object-star-wallet':v['position']['y']=.535;v['size']={'width':.11,'height':.132}
  elif key in ['object-stand-12','object-stand-21']:v['position']['y']=.335
 for r in s['interactionRegions']:
  key=r['objectId'];x=.13 if key=='object-passport' else .26 if key=='object-stand-21' else .66
  y=.15 if 'stand-' in key else .47
  r['geometry']={'kind':'rectangle','origin':{'x':x,'y':y},'size':{'width':.18,'height':.27}}
proposal_case=copy.deepcopy(canonical);proposal_case['scenes']=proposal
movement=next(c for c in proposal_case['changes'] if c['kind']=='object_moved');movement['from']['y']=movement['to']['y']=.535
save('B-proposed-case.json',{'status':'OFFLINE_CANDIDATE_NOT_FOR_LOADING_OR_ADOPTION','candidate':proposal_case})
geometry_edits=[]
for old,new in zip(scenes,proposal):
 for group in ['visuals','interactionRegions']:
  for a,b in zip(old[group],new[group]):
   if a!=b:geometry_edits.append({'sceneId':old['id'],'kind':group,'objectId':a['objectId'],'canonical':a,'proposed':b})
save('B-geometry-diff.json',{'status':'NOT_ADOPTED','edits':geometry_edits,'change_from_to_edit':{'canonical':next(c for c in canonical['changes'] if c['kind']=='object_moved'),'proposed':movement}})
save('A-fixed-envelopes.json',{'status':'OFFLINE_INTERNAL_ALIGNMENT_ONLY','scenes':scenes,'canonical_envelopes_and_regions_unchanged':True,'experiments':{name:config[name] for name in ['A1','A2']}})
background=Image.open(ROOT/'public/assets/cases/case-001/lounge-background.webp').convert('RGBA').resize(SIZE,Image.Resampling.LANCZOS)
characters=Image.open(PROOF/'static-character-layer.png').convert('RGBA');base=background.copy();base.alpha_composite(characters)
source_paths={ROOT/'src/cases/content/case-001/case.json',ROOT/'docs/cases/CASE_001_THE_MISSING_PASSPORT.md',PROOF/'static-character-layer.png',ROOT/'public/assets/cases/case-001/lounge-background.webp'}
baseline_audit={'canonical_visuals':scenes,'canonical_changes':canonical['changes'],'source_assets':{},'table_source_surface':config['surface_source_polygon']}
def asset(v):
 name=v['asset']['id'].removeprefix('asset-');path=ROOT/f'public/assets/cases/case-001/{name}.png' if name=='owen-backpack' else ART/f'{name}-candidate.png'
 source_paths.add(path);im=Image.open(path).convert('RGBA')
 if name not in baseline_audit['source_assets']:
  alpha=im.getchannel('A');bbox=binary(alpha).getbbox();baseline_audit['source_assets'][name]={'file':path.relative_to(ROOT).as_posix(),'dimensions':im.size,'alpha_gt0_bbox':alpha.getbbox(),'alpha_ge128_bbox':bbox,'transparent_padding_to_solid':[bbox[0],bbox[1],im.width-bbox[2],im.height-bbox[3]],'alpha_extrema':alpha.getextrema(),'sha256':sha(path)}
 return im
def visual_layer(v,mode):
 raw=asset(v);w=round(v['size']['width']*960);h=round(v['size']['height']*540)
 origin=(round(v['position']['x']*960-w/2),round(v['position']['y']*540-h/2));key=v['objectId'];offset=[0,0]
 tile=raw.resize((w,h),Image.Resampling.LANCZOS);scale=[w/raw.width,h/raw.height]
 if mode in ['A1','A2']:
  params=config[mode]
  if key.startswith('object-table-'):offset[1]=params['table_offset_y']
  elif key.startswith('object-stand-'):
   offset[1]=h-binary(tile.getchannel('A')).getbbox()[3]
  elif key in ['object-passport','object-document-mat','object-star-wallet']:
   factor=params['passport_factor'] if key=='object-passport' else params['mat_factor'] if key=='object-document-mat' else params['wallet_factor']
   uniform=min(w/raw.width,h/raw.height)*factor;tw=max(1,round(raw.width*uniform));th=max(1,round(raw.height*uniform));tile=raw.resize((tw,th),Image.Resampling.LANCZOS);offset=[round((w-tw)/2),0];scale=[tw/raw.width,th/raw.height]
 frame=Image.new('RGBA',(w,h));frame.alpha_composite(tile,tuple(offset));layer=Image.new('RGBA',SIZE);layer.alpha_composite(frame,origin)
 plane=Image.new('L',(w,h))
 if key.startswith('object-table-'):
  ImageDraw.Draw(plane).polygon([(round(x*scale[0]+offset[0]),round(y*scale[1]+offset[1])) for x,y in surface],fill=255)
 footprint=binary(frame.getchannel('A'))
 if key.startswith('object-stand-'):
  foot=Image.new('L',(w,h));a,b,c,d=config['stand_foot_source_roi'];ImageDraw.Draw(foot).rectangle((round(a*scale[0]+offset[0]),round(b*scale[1]+offset[1]),round(c*scale[0]+offset[0]),round(d*scale[1]+offset[1])),fill=255);footprint=ImageChops.multiply(footprint,foot)
 full_foot=Image.new('L',SIZE);full_foot.paste(footprint,origin)
 full_plane=Image.new('L',SIZE);full_plane.paste(plane,origin)
 bbox=binary(frame.getchannel('A')).getbbox()
 row={'objectId':key,'canonical_or_proposed_visual':v,'envelope_pixels':[origin[0],origin[1],origin[0]+w,origin[1]+h],'internal_offset_pixels':offset,'image_scale_xy':scale,'aspect_scale_ratio':scale[0]/scale[1], 'solid_bbox':[bbox[0]+origin[0],bbox[1]+origin[1],bbox[2]+origin[0],bbox[3]+origin[1]],'sizes':{str(width):{'envelope':[v['size']['width']*width,v['size']['height']*width*9/16],'solid':[(bbox[2]-bbox[0])*width/960,(bbox[3]-bbox[1])*width/960]} for width in [960,390,320]}}
 if key.startswith('object-stand-'):
  row['base_contact_point']=[origin[0]+384*scale[0]+offset[0],origin[1]+595*scale[1]+offset[1]]
 return layer,full_plane,full_foot,row

all_metrics={};rendered={};layers_by_variant={}
for mode,chosen in [('baseline',scenes),('A1',scenes),('A2',scenes),('B',proposal)]:
 (OUT/mode).mkdir(exist_ok=True);pairs=[];mode_metrics=[];all_layers=[]
 for endpoint,s in enumerate(chosen):
  layers={};planes={};feet={};rows=[];image=base.copy()
  for v in s['visuals']:
   layer,plane,foot,row=visual_layer(v,mode);key=v['objectId'];layers[key]=layer;feet[key]=foot;rows.append(row)
   if key.startswith('object-table-'):planes[key]=plane
   image.alpha_composite(layer)
  contacts=[]
  for row in rows:
   key=row['objectId']
   if key not in ['object-document-mat','object-passport','object-star-wallet','object-stand-12','object-stand-21']:continue
   # Table association follows physical x endpoint, never stand display number.
   table='object-table-window' if row['canonical_or_proposed_visual']['position']['x']<.5 else 'object-table-plant'
   foot=feet[key];outside=ImageChops.multiply(foot,ImageChops.invert(planes[table]));fraction=1-count(outside)/max(1,count(foot))
   point=row.get('base_contact_point');point_inside=None if point is None else bool(planes[table].getpixel((round(point[0]),round(point[1]))))
   surface_profile=None
   if point is not None:
    px=round(point[0]);column=planes[table].crop((px,0,px+1,540)).getbbox()
    surface_profile={'x':px,'rear_inner_edge_y':None if column is None else column[1],'front_inner_edge_y':None if column is None else column[3]-1,'anchor_minus_rear_y':None if column is None else point[1]-column[1]}
   contacts.append({'objectId':key,'physical_table':table,'method':'stand lower-base ROI' if 'stand-' in key else 'flat solid alpha footprint','footprint_pixels':count(foot),'outside_surface_pixels':count(outside),'inside_surface_fraction':fraction,'base_anchor_inside_surface':point_inside,'surface_profile_at_anchor':surface_profile,'proxy_pass':fraction>=(.95 if 'stand-' in key else .98)})
  regions=chosen[1]['interactionRegions'];correspondence=[]
  for target in regions:
   key=target['objectId'];g=target['geometry'];region=Image.new('L',SIZE);ImageDraw.Draw(region).rectangle((round(g['origin']['x']*960),round(g['origin']['y']*540),round((g['origin']['x']+g['size']['width'])*960)-1,round((g['origin']['y']+g['size']['height'])*540)-1),fill=255)
   # Original has no hit regions: only its passport is compared to the later
   # remembered-location target. Moved wallet/exchanged stand targets apply after.
   if endpoint==0 and key!='object-passport':continue
   if key in layers:
    solid=binary(layers[key].getchannel('A'));outside=ImageChops.multiply(solid,ImageChops.invert(region));correspondence.append({'objectId':key,'solid_pixels':count(solid),'solid_pixels_outside_target':count(outside)})
  chars_visible=characters.getchannel('A').copy()
  for v in s['visuals']:chars_visible=ImageChops.multiply(chars_visible,ImageChops.invert(layers[v['objectId']].getchannel('A')))
  stem='original' if endpoint==0 else 'changed';image.convert('RGB').save(OUT/mode/f'{stem}-960.png');pairs.append(image.convert('RGB'))
  for width in [390,320]:image.convert('RGB').resize((width,round(width*9/16)),Image.Resampling.LANCZOS).save(OUT/mode/f'{stem}-{width}.png')
  diag=image.convert('RGB');draw=ImageDraw.Draw(diag)
  for plane in planes.values():
   # Polygon line only; true previews above remain unannotated.
   for v in s['visuals']:
    if v['objectId'].startswith('object-table-'):
     row=next(r for r in rows if r['objectId']==v['objectId']);ox,oy=row['envelope_pixels'][:2];sx,sy=row['image_scale_xy'];dx,dy=row['internal_offset_pixels'];draw.line([(ox+x*sx+dx,oy+y*sy+dy) for x,y in surface]+[(ox+surface[0][0]*sx+dx,oy+surface[0][1]*sy+dy)],fill='cyan',width=1)
  for row in rows:
   if 'base_contact_point' in row:
    x,y=row['base_contact_point'];draw.ellipse((x-3,y-3,x+3,y+3),fill='magenta')
  diag.save(OUT/mode/f'{stem}-support-diagnostic.png')
  passport_mat=None
  if 'object-passport' in layers:
   passport_solid=binary(layers['object-passport'].getchannel('A'));mat_solid=binary(layers['object-document-mat'].getchannel('A'));passport_mat={'passport_solid_pixels':count(passport_solid),'outside_mat_solid_pixels':count(ImageChops.multiply(passport_solid,ImageChops.invert(mat_solid)))}
  mode_metrics.append({'scene':s['id'],'visuals':rows,'contacts':contacts,'target_correspondence':correspondence,'passport_mat_correspondence':passport_mat,'effective_character_alpha_bbox':chars_visible.point(lambda a:255 if a>8 else 0).getbbox(),'character_visibility_digest':hashlib.sha256(chars_visible.tobytes()).hexdigest()});all_layers.append(layers)
 diff=differences(*pairs);allowed=Image.new('L',SIZE)
 for layers in all_layers:
  for key in ['object-passport','object-star-wallet','object-stand-12','object-stand-21']:
   if key in layers:allowed=ImageChops.lighter(allowed,layers[key].getchannel('A').point(lambda a:255 if a else 0))
 assert not ImageChops.multiply(diff,ImageChops.invert(allowed)).getbbox(),'Fourth endpoint difference'
 assert not ImageChops.multiply(diff,characters.getchannel('A')).getbbox(),'Character change'
 assert mode_metrics[0]['character_visibility_digest']==mode_metrics[1]['character_visibility_digest']
 for key in ['object-table-window','object-table-plant','object-document-mat','object-owen-backpack']:
  assert all_layers[0][key].tobytes()==all_layers[1][key].tobytes(),'Stable object changed'
 diff.save(OUT/mode/'difference-mask.png')
 for width in [960,390,320]:
  a=Image.open(OUT/mode/f'original-{width}.png');b=Image.open(OUT/mode/f'changed-{width}.png');panel=Image.new('RGB',(width*2,a.height));panel.paste(a);panel.paste(b,(width,0));panel.save(OUT/mode/f'comparison-{width}.png')
 all_metrics[mode]=mode_metrics;rendered[mode]=pairs;layers_by_variant[mode]=all_layers
# Reproduction of previous canonical baseline is a source-consistency prerequisite.
for index,name in enumerate(['original','changed']):assert rendered['baseline'][index].tobytes()==Image.open(CASE/f'mobile-verification-prototype/images/{name}.png').convert('RGB').tobytes(),'Canonical baseline reproduction mismatch'

def target_metrics(chosen):
 rows=[];regions=chosen[1]['interactionRegions']
 for width in [320,390,960]:
  rects=[]
  for r in regions:
   g=r['geometry'];x=g['origin']['x']*width;y=g['origin']['y']*width*9/16;w=g['size']['width']*width;h=g['size']['height']*width*9/16
   rects.append({'objectId':r['objectId'],'xyxy':[x,y,x+w,y+h],'size':[w,h]})
  distances=[]
  for i,a in enumerate(rects):
   for b in rects[i+1:]:
    ax,ay,ar,ab=a['xyxy'];bx,by,br,bb=b['xyxy'];dx=max(bx-ar,ax-br,0);dy=max(by-ab,ay-bb,0);overlap=max(0,min(ar,br)-max(ax,bx))*max(0,min(ab,bb)-max(ay,by))
    distances.append({'objects':[a['objectId'],b['objectId']],'gap':math.hypot(dx,dy),'overlap_area':overlap})
  rows.append({'width':width,'rectangles':rects,'pairs':distances,'minimum_gap':min(p['gap'] for p in distances),'comfort_size_pass':all(min(r['size'])>=48 for r in rects),'comfort_gap_pass':min(p['gap'] for p in distances)>=8})
 return rows
save('target-measurements.json',{'canonical_A':target_metrics(scenes),'historical_B':target_metrics(priorB),'proposed_B':target_metrics(proposal)})
character_landmarks={}
for mode,pairs in rendered.items():
 delta=differences(pairs[0],rendered['baseline'][0]);landmarks={}
 for label,box in {'main_window':[0,0,280,220],'main_plant':[820,30,960,340]}.items():landmarks[label]={'reviewed_roi':box,'changed_from_baseline_pixels':count(delta.crop(box))}
 regions={}
 for name,box in {'Mara':[5,292,133,522],'Owen':[470,116,570,321]}.items():
  visible=characters.getchannel('A').copy()
  for layer in layers_by_variant[mode][0].values():visible=ImageChops.multiply(visible,ImageChops.invert(layer.getchannel('A')))
  crop=visible.crop(tuple(box)).point(lambda a:255 if a>8 else 0);bbox=crop.getbbox()
  regions[name]={'envelope_unchanged':box,'visible_pixels_alpha_gt8':count(crop),'effective_visible_bbox':None if bbox is None else [bbox[0]+box[0],bbox[1]+box[1],bbox[2]+box[0],bbox[3]+box[1]]}
 character_landmarks[mode]={'landmarks':landmarks,'characters':regions,'treatment':'Exact same source static layer and transformations; only existing foreground prop occlusion varies by experiment; no character pose/scale change'}
save('character-landmark-analysis.json',character_landmarks)
# Sample actual rendered pixels at mapped source-material ROIs. Tiny mobile ROIs
# intentionally report sample counts; these proxies are not conformance metrics.
material_rois={'passport_cover':('object-passport',[380,365,440,405]),'adjacent_mat':('object-document-mat',[650,260,710,310]),'stand_gold':('object-stand-12',[280,260,330,350]),'stand_face':('object-stand-12',[180,250,220,320]),'wallet_star':('object-star-wallet',[300,195,330,225]),'wallet_leather':('object-star-wallet',[155,185,185,215]),'strap_light':('object-star-wallet',[575,130,595,180]),'strap_dark':('object-star-wallet',[525,130,540,180])}
def luminance(rgb):
 channels=[v/255 for v in rgb];linear=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in channels];return .2126*linear[0]+.7152*linear[1]+.0722*linear[2]
contrast={}
for mode,rows in all_metrics.items():
 contrast[mode]={}
 for width in [960,390,320]:
  image=Image.open(OUT/mode/f'original-{width}.png').convert('RGB');samples={}
  for name,(key,box) in material_rois.items():
   row=next(r for r in rows[0]['visuals'] if r['objectId']==key);sx,sy=row['image_scale_xy'];dx,dy=row['internal_offset_pixels'];ox,oy=row['envelope_pixels'][:2];factor=width/960
   x0=round((ox+dx+box[0]*sx)*factor);y0=round((oy+dy+box[1]*sy)*factor);x1=max(x0+1,round((ox+dx+box[2]*sx)*factor));y1=max(y0+1,round((oy+dy+box[3]*sy)*factor))
   pixels=list(image.crop((x0,y0,x1,y1)).getdata());samples[name]={'mapped_pixel_roi':[x0,y0,x1,y1],'sample_count':len(pixels),'median_luminance':statistics.median(luminance(p) for p in pixels)}
  ratios={}
  for label,a,b in [('passport_mat','passport_cover','adjacent_mat'),('numeral_face','stand_gold','stand_face'),('star_leather','wallet_star','wallet_leather'),('stripe_light_dark','strap_light','strap_dark')]:
   values=[samples[a]['median_luminance'],samples[b]['median_luminance']];ratios[label]=(max(values)+.05)/(min(values)+.05)
  contrast[mode][str(width)]={'samples':samples,'ratios':ratios}
save('contrast-proxies.json',{'method':'Hand-selected source material ROI mapped into each rendered original; median sRGB relative luminance ratios. Mobile sample patches can be 1 pixel and are unstable proxies, not whole-object/edge contrast or WCAG compliance.','source_rois':material_rois,'measurements':contrast})
# Side-by-side originals for visible comparison; these captions are diagnostic only.
sheet=Image.new('RGB',(1920,1140),'#eee8dd');d=ImageDraw.Draw(sheet)
for index,mode in enumerate(['baseline','A1','A2','B']):
 x=(index%2)*960;y=(index//2)*570;sheet.paste(rendered[mode][0],(x,y+25));d.text((x+8,y+7),mode+' — offline study, not adopted',fill='black')
sheet.save(OUT/'comparison-all.png')
baseline_audit['canonical_baseline_rows']=all_metrics['baseline'];save('baseline-measurements.json',baseline_audit)
save('measurements.json',all_metrics)
references=['AGENTS.md','ARCHITECTURE.md','GAME_SPEC.md','TESTING_STRATEGY.md','artifacts/asset-validation/case-001/B-art-refinement/REPORT.md','artifacts/asset-validation/case-001/character-placement-proof/REPORT.md','artifacts/asset-validation/case-001/mobile-usability-study/README.md','artifacts/asset-validation/case-001/mobile-usability-study/AUDIT_REPORT.md','artifacts/asset-validation/case-001/mobile-usability-study/REVISION_PLAN.md','artifacts/asset-validation/case-001/mobile-presentation-spec/MPS_001.md','artifacts/asset-validation/case-001/mobile-presentation-spec/INTERACTION_CONTRACT.md','artifacts/asset-validation/case-001/mobile-verification-prototype/OWNER_APPROVAL_RECORD.md','artifacts/asset-validation/case-001/mobile-verification-prototype/TEST_REPORT.md','artifacts/asset-validation/case-001/mobile-verification-prototype/OPEN_ISSUES.md','artifacts/asset-validation/case-001/mobile-verification-prototype/MOBILE_READABILITY_REPORT.md']
save('source-manifest.json',{'source_files':{p.relative_to(ROOT).as_posix():sha(p) for p in sorted(source_paths)},'reviewed_reference_files':{p:sha(ROOT/p) for p in references},'method':'Existing raster layers; deterministic resizing/internal alignment only. No regeneration, retouch, new shadows, props or identity changes. Same source bytes across endpoints.'})
save('generated-hashes.json',{p.relative_to(OUT).as_posix():sha(p) for p in sorted(OUT.rglob('*.png'))})
print(json.dumps({mode:[{'objectId':r['objectId'],'inside':round(r['inside_surface_fraction'],4),'pass':r['proxy_pass']} for r in rows[0]['contacts']] for mode,rows in all_metrics.items()},indent=2))
print('Protected files unchanged:',protected())
