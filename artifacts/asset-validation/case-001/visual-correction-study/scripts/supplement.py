"""Read study images; write only supplemental metrics and labeled comparisons."""
from pathlib import Path
import json
import statistics
from PIL import Image, ImageChops, ImageDraw, ImageFilter
import sys
sys.dont_write_bytecode = True
import study

OUT = Path(__file__).resolve().parents[1]
manifest = study.load(OUT / 'candidate-manifest.json')
supplement = {'limitations': 'Material/glyph/edge luminance proxies and component masks are not human legibility, font-size, accessibility or recognition tests.', 'candidates': []}

for record in manifest['candidates']:
    cid = record['id']
    original = Image.open(OUT / 'candidates' / cid / 'original-960.png').convert('RGB')
    solid = study.support(study.BASE_LAYERS[0]['object-passport'].getchannel('A'), 128)
    inner = ImageChops.subtract(solid, solid.filter(ImageFilter.MinFilter(5)))
    outer = ImageChops.subtract(solid.filter(ImageFilter.MaxFilter(5)), solid)
    mat = study.support(study.BASE_LAYERS[0]['object-document-mat'].getchannel('A'), 128)
    outer = ImageChops.multiply(outer, mat)
    def masked_luminance(image, mask):
        values = [study.luminance(rgb) for rgb, alpha in zip(image.getdata(), mask.getdata()) if alpha]
        return {'samples': len(values), 'median': statistics.median(values)}
    inside = masked_luminance(original, inner)
    outside = masked_luminance(original, outer)
    glyphs = []
    for number in ('12', '21'):
        asset = OUT / 'candidates' / cid / 'assets' / f'object-stand-{number}.png'
        if not asset.is_file():
            asset = study.ART / f'stand-{number}-candidate.png'
        raw = Image.open(asset).convert('RGBA')
        master = Image.open(study.ART / 'stand-master-candidate.png').convert('RGBA')
        source_mask = study.difference(raw, master)
        for width in (960, 320, 390, 430):
            dimensions = (max(1, round(115 * width / 960)), max(1, round(97 * width / 960)))
            # Shared neutral navy underlay prevents treating translucent source
            # RGB as opaque rendered color; both variants use identical policy.
            def flat(image):
                result = Image.new('RGBA', image.size, (18, 31, 48, 255))
                result.alpha_composite(image)
                return result.convert('RGB').resize(dimensions, Image.Resampling.LANCZOS)
            visible, blank = flat(raw), flat(master)
            mask = source_mask.resize(dimensions, Image.Resampling.LANCZOS).point(lambda x: 255 if x >= 128 else 0)
            a, b = masked_luminance(visible, mask), masked_luminance(blank, mask)
            glyphs.append({'number': number, 'width': width, 'mask_samples': a['samples'], 'glyph_luminance': a['median'], 'same_location_blank_luminance': b['median'], 'contrast_proxy': study.contrast(a['median'], b['median']), 'method': 'Uniformly resized source tile over shared navy underlay; median glyph support versus same-location blank master; not whole-scene conformance contrast'})
    supplement['candidates'].append({'id': cid, 'passport_native_two_pixel_boundary_band': {'inside': inside, 'outside_on_mat': outside, 'median_luminance_ratio': study.contrast(inside['median'], outside['median']), 'method': '2px inner/outer morphology bands on source-native passport solid mask; outer constrained to mat; includes gold edge, not only cover'}, 'glyph_contrast': glyphs})
    for width in (320,390,430):
        a = Image.open(OUT/'previews'/cid/f'original-{width}.png')
        b = Image.open(OUT/'previews'/cid/f'changed-{width}.png')
        panel = Image.new('RGB',(width*2,a.height+24),'#f0ede6')
        ImageDraw.Draw(panel).text((6,6),f'{cid} ORIGINAL | CHANGED - {width}px raster review, no enlargement',fill='black')
        panel.paste(a,(0,24));panel.paste(b,(width,24))
        dest=OUT/'comparisons'/f'{cid}-{width}-PAIR-REVIEW.png';dest.parent.mkdir(exist_ok=True)
        panel.save(dest)
study.write_json('supplemental-measurements.json',supplement)
assert study.protected()
print('Supplemental metrics and labeled pair panels complete')
