# Mobile visual readability versus interaction size

All sizes are at effective **scene** width, not viewport/hardware width or a source PNG enlarged on screen. The supplied320/390 files are pixel-size offline previews under uniform full fit. No CSS-browser, physical display, human memory/recognition or touch trial was executed in this study.

## Solid visible clue bounds

Alpha≥128 after960 rendering defines these bounds. They are not semantic feature masks or known recognition thresholds. Values are rounded here; measurements.json retains exact numbers.

| Candidate / visual | 320 CSS-pixel scenario | 390 CSS-pixel scenario |
|---|---:|---:|
| Baseline passport |29.33×30.33|35.75×36.97|
| A1 passport |25.33×21.33|30.88×26.00|
| A2 passport |14.33×12.00|17.47×14.63|
| B passport |23.67×20.00|28.84×24.38|
| Baseline mat |63.00×28.00|76.78×34.13|
| A1 mat |57.00×23.33|69.47×28.44|
| A2 mat |37.67×15.67|45.91×19.09|
| B mat |63.00×26.33|76.78×32.09|
| Baseline wallet |36.00×31.33|43.88×38.19|
| A1 wallet |31.00×21.00|37.78×25.59|
| A2 wallet |17.33×12.00|21.13×14.63|
| B wallet |33.67×22.67|41.03×27.63|
| Stand body, all candidates |30.33×28.67|36.97×34.94|
| Stand numeral union, all candidates |~13.75×9.55|~16.76×11.64|

Stand source scale stays the same; A shifts its pixels vertically but cannot add numeral resolution. Baseline passport/wallet are larger but distorted and unsupported. B's near-native aspect is a tradeoff against raw area, not a claim that smaller clues are intrinsically better. Historical B passport solid was ~20.67×17.67 at320; this B is modestly larger while retaining a visible mat border.

The union numeral box is a source-overlay diagnostic, not font size or separate digit height. For the existing wallet star source ROI (201,109)–(444,348), B's analytical size is ~**10.69×10.52 at320**, **13.03×12.82 at390**, before native raster rounding; the box includes some leather and is not segmented star area. Broad striped-strap source ROI (409,83)–(718,528) projects to~13.60×19.58 /16.57×23.86; individual stripe widths are smaller. A2 reduces the same cues substantially. No first-time star/stripe recognition is claimed.

## Object/background separation and mat distinction

Navy passport against navy mat remains a risk; existing gold page edge/silhouette supplies separation. Do not require title/fine crest reading. B keeps all passport solid pixels inside mat solid with a surrounding border; A2 has11 overhanging solid pixels, baseline53 and A1 none. Containment is geometric association evidence, not contrast certification. The smaller A2 mat/document pair loses silhouette and border clarity in informed static inspection.

Gold-on-navy numerals remain comparatively strong but tiny at320. Marble glare/veining, bright brass and Mara's cream clothing compete with prop detail. Wallet star and broad dark/light strap are more robust than microtexture, yet they remain small. No new tonal/edge highlight was applied; no changed-only treatment is permitted. Contrast proxies from the earlier B composition cannot be reused as new calibrated measurements after scale/placement changes. This study's comparison is informed visual judgment of the actual rendered rasters; it does not certify WCAG contrast or screen calibration.

New rendered material sampling is recorded independently in contrast-proxies.json: explicit source-material ROIs are mapped through each experiment into actual960/390/320 pixels, with sample counts and median sRGB luminance ratios. B's selected dark passport-cover versus adjacent-mat patches are approximately1.02:1 at320 and1.01:1 at390; the samples deliberately exclude the helpful gold edge and cannot describe whole-object separation. The selected star/leather patches are~3.84:1/~3.63:1. Selected stripe patch ratios vary~11.63:1/~2.93:1 despite the same source, showing tiny-ROI/resampling instability rather than a recognition improvement. Numeral/face patches likewise mix glyph/antialias pixels at these scales. Mobile patches can collapse to1 pixel. These proxies document the navy-on-navy risk and sampling limits; none is a WCAG test, robust glyph contrast score or basis for a precise ranking. No earlier contrast number was carried over as new evidence.

## Hit sizes, separation and effective width

| Geometry |320 target / minimum edge gap|390 target / minimum edge gap|
|---|---|---|
| Canonical (A)|57.6×54 /18|70.2×65.81 /21.94|
| Historical B|51.2×44.1 /1.35|62.4×53.75 /1.645|
| Proposed B|57.6×48.6 /9|70.2×59.23 /10.97|

Proposed B has no target overlap; all solid changed-scene selectable pixels and the remembered passport are included. Large rectangles contain extra empty table/background area, and upper target centers sit above the visual centers. Actual finger routing/occlusion, keyboard focus behavior and pan/tap arbitration are untested. Clickable target size must never be cited as passport visual size or recognition evidence.

The48×48/8px values are MPS proposed comfort goals, not native-unit conversions or proof of accessibility compliance. At W=288 proposed B is51.84×43.74/gap8.1: height fails. At W=358 it is64.44×54.37/gap10.07: passes analytically. Approximately316.05px full effective width is needed for48px height; gap8px needs284.44px. Do not silently expand targets below the supported effective-width floor. Safe areas, UI padding and height constraints must be measured in a later authorized layout/device surface.

## Associations and remaining acceptance needs

Mara/window and Owen/plant associations remain visible in informed overview inspection, but Owen's central seat and person/table proportions remain unresolved artistic risks. No mobile face naming is assumed. B preserves full16:9 view at initial observation; no zoom, crop, clue annotation or timing change compensates for visibility. Optional investigation zoom can aid later inspection under MPS planning, but cannot prove original-scene fairness.

Owner-reported earlier clue recognition was generally successful; P5's retest effort concern remains relevant. Closed human testing was not reopened. Physical-device/readability and assistive operation remain unperformed; new participant work would require explicit authorization. B is a technically stronger reviewed candidate, not a proven improvement in human performance.
