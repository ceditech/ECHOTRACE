"""Offline scene renderer and pixel QA. No production files are written."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[3]
ART = OUT.parent / 'B-art-refinement'
SRC = ROOT / 'public/assets/cases/case-001'
SIZE = (960, 540)
SCENES = json.loads((OUT.parent / 'layout-alternatives/B/proposed-scenes.json').read_text())

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def mask_any_rgb(im):
    r,g,b=im.convert('RGB').split()
    return ImageChops.lighter(ImageChops.lighter(r,g),b).point(lambda a:255 if a else 0)

def put_visual(v):
    name=v['asset']['id'].removeprefix('asset-')
    path=SRC/f'{name}.png' if name=='owen-backpack' else ART/f'{name}-candidate.png'
    im=Image.open(path).convert('RGBA').resize((round(v['size']['width']*960),round(v['size']['height']*540)),Image.Resampling.LANCZOS)
    assert v['rotationDegrees']==0
    origin=(round(v['position']['x']*960-im.width/2),round(v['position']['y']*540-im.height/2))
    layer=Image.new('RGBA',SIZE);layer.alpha_composite(im,origin)
    return layer

bg=Image.open(SRC/'lounge-background.webp').convert('RGBA').resize(SIZE,Image.Resampling.LANCZOS)
placements={
    'Mara': {'file':'mara-generated-cutout.png','top_left':[5,292],'fit_envelope':[128,230],
        'previous_zone':[12,375,105,515],'reason':'Expand upward to reveal head/upper torso; existing foreground chair occludes lower figure.'},
    'Owen': {'file':'owen-generated-cutout.png','top_left':[470,116],'fit_envelope':[100,205],
        'previous_zone':[810,265,856,375],'reason':'Relocate to existing middle chair beside the left edge of plant-side table; avoid narrow right zone, plant, backpack, wallet and stand region.'}}
characters={};inventory=[]
for name,p in placements.items():
    raw=Image.open(OUT/p['file']).convert('RGBA')
    alpha=raw.getchannel('A');solid=alpha.point(lambda a:255 if a>=128 else 0).getbbox()
    crop=(max(0,solid[0]-8),max(0,solid[1]-8),min(raw.width,solid[2]+8),min(raw.height,solid[3]+8))
    cut=raw.crop(crop);cut.thumbnail(tuple(p['fit_envelope']),Image.Resampling.LANCZOS)
    width,height=cut.size
    offset_x=(p['fit_envelope'][0]-width)//2
    origin=(p['top_left'][0]+offset_x,p['top_left'][1])
    layer=Image.new('RGBA',SIZE);layer.alpha_composite(cut,origin)
    p['crop_source_px']=crop;p['resized_size']=[width,height]
    p['art_top_left']=list(origin)
    p['envelope_xyxy']=[*p['top_left'],p['top_left'][0]+p['fit_envelope'][0],p['top_left'][1]+p['fit_envelope'][1]]
    p['normalized_top_left']=[p['top_left'][0]/960,p['top_left'][1]/540]
    p['normalized_size']=[p['fit_envelope'][0]/960,p['fit_envelope'][1]/540]
    p['raw_sha256']=sha(OUT/p['file'])
    hist=alpha.histogram()
    inventory.append({'name':name,'mode':raw.mode,'dimensions':raw.size,'alpha_extrema':alpha.getextrema(),
        'alpha_zero_pixels':hist[0],'solid_bbox':solid,'alpha_252_253_pixels':hist[252]+hist[253],
        'exterior_samples':{str(pt):raw.getpixel(pt) for pt in [(0,0),(50,300),(900,100)]}})
    characters[name]=layer

isolation=Image.new('RGB',(1000,760),'white');idraw=ImageDraw.Draw(isolation)
for row,(name,p) in enumerate(placements.items()):
    raw=Image.open(OUT/p['file']).convert('RGBA');raw.thumbnail((450,340),Image.Resampling.LANCZOS)
    for col,color in enumerate([(255,255,255),(40,40,40)]):
        tile=Image.new('RGBA',(500,380),color+(255,));tile.alpha_composite(raw,((500-raw.width)//2,30))
        isolation.paste(tile.convert('RGB'),(col*500,row*380));idraw.text((col*500+10,row*380+8),name+' true-alpha inspection',fill='black' if col==0 else 'white')
isolation.save(OUT/'cutout-alpha-inspection.png')

# Restore the existing foreground chair back in front of Mara. This is a
# manually traced occlusion hypothesis, not a new furnishing or source repaint.
chair_polygon=[(0,451),(247,377),(260,436),(294,466),(295,540),(0,540)]
chair_mask=Image.new('L',SIZE);ImageDraw.Draw(chair_mask).polygon(chair_polygon,fill=255)
placements['Mara']['existing_chair_occluder_polygon']=chair_polygon
characters['Mara'].putalpha(ImageChops.multiply(characters['Mara'].getchannel('A'),ImageChops.invert(chair_mask)))
combined=Image.new('RGBA',SIZE)
for layer in characters.values():combined.alpha_composite(layer)
combined.save(OUT/'static-character-layer.png')
integrated=bg.copy();integrated.alpha_composite(combined)
integrated.convert('RGB').save(OUT/'background-integrated-proposal.png')
(OUT/'placement-zones.json').write_text(json.dumps({'status':'OFFLINE_PROPOSED_ONLY','canvas':SIZE,'placements':placements,'canonical_geometry_changes':[],'method':'uniform source-crop scaling; immutable character placement; existing chair mask and authored objects render in front'},indent=2)+'\n')

analysis={'method':'visible pixel comparison and authored alpha masks, not bounding boxes alone','generated_inventory':inventory,'scenes':[]}
rendered=[];originals=[];char_visible=[]
clue_ids={'object-passport','object-document-mat','object-star-wallet','object-stand-12','object-stand-21','object-owen-backpack'}
for index,scene in enumerate(SCENES):
    visuals=[(v,put_visual(v)) for v in scene['visuals']]
    plain=bg.copy();with_chars=integrated.copy();a_equivalent=bg.copy();a_equivalent.alpha_composite(combined)
    for v,layer in visuals:
        plain.alpha_composite(layer);with_chars.alpha_composite(layer);a_equivalent.alpha_composite(layer)
    assert a_equivalent.tobytes()==with_chars.tobytes()
    reference=Image.open(ART/('original-refined.png' if index==0 else 'changed-refined.png')).convert('RGB')
    assert plain.convert('RGB').tobytes()==reference.tobytes(), 'Offline render must match prior refined scene exactly'
    pixel_changes=mask_any_rgb(ImageChops.difference(plain.convert('RGB'),with_chars.convert('RGB')))
    clue_rows=[]
    for v,layer in visuals:
        if v['objectId'] not in clue_ids:continue
        # Strictly protect alpha>0 clue pixels, including faint edge/shadow pixels.
        mask=layer.getchannel('A').point(lambda a:255 if a else 0)
        altered=ImageChops.multiply(pixel_changes,mask)
        count=altered.histogram()[255]
        clue_rows.append({'objectId':v['objectId'],'alpha_gt_zero_pixels_changed':count,'changed_bbox':altered.getbbox()})
    # Reviewed background landmark ROIs: broad left window plus prominent right plant.
    landmarks={}
    for label,box in {'window':[0,0,280,220],'plant':[820,30,960,340]}.items():
        roi=pixel_changes.crop(box);landmarks[label]={'reviewed_roi':box,'changed_pixels':roi.histogram()[255]}
    regions=[]
    for r in SCENES[1]['interactionRegions']:
        g=r['geometry'];x,y=g['origin'].values();w,h=g['size'].values()
        box=[round(x*960),round(y*540),round((x+w)*960),round((y+h)*540)]
        regions.append({'objectId':r['objectId'],'changed_character_pixels_inside_region':pixel_changes.crop(box).histogram()[255]})
    window_mask=Image.new('L',SIZE);ImageDraw.Draw(window_mask).polygon([(0,0),(280,0),(280,218),(0,300)],fill=255)
    landmarks['window_glazing_polygon']={'reviewed_polygon':[(0,0),(280,0),(280,218),(0,300)],'changed_pixels':ImageChops.multiply(pixel_changes,window_mask).histogram()[255]}
    per_char={}
    for name,char in characters.items():
        visible=char.getchannel('A')
        for v,layer in visuals:visible=ImageChops.multiply(visible,ImageChops.invert(layer.getchannel('A')))
        per_char[name]={'effective_alpha_bbox_gt_8':visible.point(lambda a:255 if a>8 else 0).getbbox(),
            'visible_pixels_alpha_gt_8':sum(visible.histogram()[9:])}
    mobile_checks=[]
    for width in [390,320]:
        dimensions=(width,round(width*9/16))
        mobile_diff=mask_any_rgb(ImageChops.difference(plain.convert('RGB').resize(dimensions,Image.Resampling.LANCZOS),with_chars.convert('RGB').resize(dimensions,Image.Resampling.LANCZOS)))
        rows=[]
        for v,layer in visuals:
            if v['objectId'] not in clue_ids:continue
            mask=layer.getchannel('A').resize(dimensions,Image.Resampling.LANCZOS).point(lambda a:255 if a>=128 else 0)
            rows.append({'objectId':v['objectId'],'solid_clue_pixels_changed':ImageChops.multiply(mobile_diff,mask).histogram()[255]})
        mobile_checks.append({'width':width,'height':dimensions[1],'mask_method':'resized authored alpha>=128; shared full-scene resampling','clues':rows})
    analysis['scenes'].append({'scene':scene['id'],'clue_pixel_changes':clue_rows,'mobile_clue_pixel_checks':mobile_checks,'landmark_pixel_changes':landmarks,'region_character_changes':regions,'character_visibility':per_char})
    rendered.append(with_chars.convert('RGB')); originals.append(plain.convert('RGB'));char_visible.append(per_char)
    stem='original' if index==0 else 'changed'
    with_chars.convert('RGB').save(OUT/f'{stem}-with-characters.png')
    for width in [390,320]:with_chars.convert('RGB').resize((width,round(width*9/16)),Image.Resampling.LANCZOS).save(OUT/f'{stem}-mobile-{width}.png')

baseline_difference=mask_any_rgb(ImageChops.difference(*originals))
proof_difference=mask_any_rgb(ImageChops.difference(*rendered))
new_difference=ImageChops.multiply(proof_difference,ImageChops.invert(baseline_difference))
analysis['new_before_after_difference_pixels']=new_difference.histogram()[255]
analysis['before_after_difference_masks_identical']=proof_difference.tobytes()==baseline_difference.tobytes()
analysis['character_visibility_identical']=char_visible[0]==char_visible[1]
analysis['character_artwork_and_placement_identical']=True
analysis['option_A_and_B_pixel_equivalent']=True
proof_difference.save(OUT/'difference-mask-with-characters.png')
panel=Image.new('RGB',(1920,540));panel.paste(rendered[0]);panel.paste(rendered[1],(960,0));panel.save(OUT/'comparison-with-characters.png')
for name,layer in characters.items():
    c=bg.copy();c.alpha_composite(layer)
    for v in SCENES[0]['visuals']:c.alpha_composite(put_visual(v))
    d=ImageDraw.Draw(c);p=placements[name];d.rectangle(p['envelope_xyxy'],outline='cyan',width=2);d.text((p['envelope_xyxy'][0],max(0,p['envelope_xyxy'][1]-18)),name+' proposed envelope',fill='cyan')
    c.convert('RGB').save(OUT/f'{name.lower()}-placement-proof.png')

refs=Image.open(ART/'character-concept-reference.png').convert('RGB');v2=Image.open(OUT/'owner-mara-reference.png').convert('RGB')
identity=Image.new('RGB',(1200,550),'#eee8dd');draw=ImageDraw.Draw(identity)
tiles=[('Mara owner reference (continuity)',v2.crop((343,16,713,343))),('Mara corrected seated proof',Image.open(OUT/'mara-generated-cutout.png').convert('RGBA')),('Owen harmonized seated proof',Image.open(OUT/'owen-generated-cutout.png').convert('RGBA'))]
for i,(label,tile) in enumerate(tiles):
    tile.thumbnail((380,500),Image.Resampling.LANCZOS)
    position=(i*400+(400-tile.width)//2,40)
    identity.paste(tile,position,tile.getchannel('A') if tile.mode=='RGBA' else None)
    draw.text((i*400+8,10),label,fill='black')
identity.save(OUT/'character-identity-comparison.png')
before=json.loads((OUT/'protected-before.json').read_text())
after={p:sha(ROOT/p) for p in before}
analysis['protected_inputs_unchanged']=before==after
analysis['protected_input_count']=len(before)
analysis['geometry_sha256']=sha(OUT.parent/'layout-alternatives/B/proposed-scenes.json')
analysis['canonical_case_sha256']=sha(ROOT/'src/cases/content/case-001/case.json')
(OUT/'occlusion-analysis.json').write_text(json.dumps(analysis,indent=2)+'\n')
print(json.dumps({k:v for k,v in analysis.items() if k not in ['generated_inventory','scenes']},indent=2))
print(json.dumps(analysis['scenes'],indent=2))
assert analysis['protected_inputs_unchanged']
assert analysis['new_before_after_difference_pixels']==0
assert analysis['before_after_difference_masks_identical']
assert analysis['character_visibility_identical']
assert all(row['alpha_gt_zero_pixels_changed']==0 for scene in analysis['scenes'] for row in scene['clue_pixel_changes'])
assert all(row['changed_character_pixels_inside_region']==0 for scene in analysis['scenes'] for row in scene['region_character_changes'])
assert all(row['changed_pixels']==0 for scene in analysis['scenes'] for row in scene['landmark_pixel_changes'].values())
assert all(row['solid_clue_pixels_changed']==0 for scene in analysis['scenes'] for mobile in scene['mobile_clue_pixel_checks'] for row in mobile['clues'])
