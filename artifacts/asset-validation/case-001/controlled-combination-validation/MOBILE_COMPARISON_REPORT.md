# Mobile comparison — Levels A/B, not C/D

| Input/candidate | Effective width | Passport solid CSS px | Cover/mat proxy | 12 glyph proxy | 21 glyph proxy | 12 component sizes | 21 component sizes |
|---|---|---|---|---|---|---|---|
| B0 | 320 | 23.67×20.00 | 1.018 | 8.54 | 8.75 | [31, 22] | [33, 22] |
| B0 | 390 | 28.84×24.38 | 1.013 | 7.82 | 6.53 | [58, 31] | [60, 38] |
| B0 | 430 | 31.80×26.88 | 1.015 | 9.95 | 9.09 | [64, 38] | [65, 46] |
| C1a | 320 | 23.67×20.00 | 1.131 | 8.54 | 8.75 | [31, 22] | [33, 22] |
| C1a | 390 | 28.84×24.38 | 1.142 | 7.82 | 6.53 | [58, 31] | [60, 38] |
| C1a | 430 | 31.80×26.88 | 1.132 | 9.95 | 9.09 | [64, 38] | [65, 46] |
| C2a | 320 | 23.67×20.00 | 1.018 | 10.23 | 10.50 | [31, 22] | [33, 22] |
| C2a | 390 | 28.84×24.38 | 1.013 | 9.40 | 7.75 | [58, 31] | [60, 38] |
| C2a | 430 | 31.80×26.88 | 1.015 | 11.99 | 10.87 | [64, 38] | [65, 46] |
| Combined | 320 | 23.67×20.00 | 1.131 | 10.23 | 10.50 | [31, 22] | [33, 22] |
| Combined | 390 | 28.84×24.38 | 1.142 | 9.40 | 7.75 | [58, 31] | [60, 38] |
| Combined | 430 | 31.80×26.88 | 1.132 | 11.99 | 10.87 | [64, 38] | [65, 46] |

Combined exactly preserves C1a cover/mat values at every width and C2a numeral measurements for BOTH12/21. Native2px boundary-band proxy: B0/C2a1.152, C1a/combined1.349. The boundary band includes gold edges; the material patches sample cover/mat and may contain only a few mobile pixels. These are relative-luminance diagnostics, not whole-object contrast, WCAG ratios, legal/accessibility certification or recognition scores.

Passport dimensions are unchanged:23.67×20px at320,28.84×24.38px at390. Actual per-number difference-mask glyph boxes also stay unchanged:12≈13.03×9.53 and21≈12.28×9.53 at320;12≈15.88×11.62 and21≈14.96×11.62 at390. These exact glyph masks are a different definition from VAR's shared enclosing numeral ROI13.75×9.55 /16.76×11.64, not evidence of shrinkage. Both definitions are retained in their respective records. Four-connected threshold128 component sizes show two main digit supports; this does not prove every stroke is readable.

Glyph contrast proxy: source tile over the same neutral navy underlay, compare median glyph-support luminance to the same-location blank master, uniformly downscaled. It is not actual whole-scene contrast or guaranteed legibility. Exact masks/ROIs/sample counts and methods appear in measurements.json. No metric was silently substituted for a human result.

Visual Level B: at320, the cover remains a small dark booklet but separation is modestly stronger; numerals are brighter with the same upright shapes. At390 the same improvement is slightly easier to inspect, while tiny fine crest/text and first-time memory fairness remain unresolved.430 adds samples without proving a recognition threshold. Changed mat remains naturally empty; B0 character/table association and proportion limitations are inherited unchanged. No new clipping, halo, clue occlusion or narrative hint was evident in native and all six mobile panels.

Twelve normal previews: B0/Combined × Original/Changed ×320/390/430. Each is a single unretouched full-frame LANCZOS reduction from native960×540, no crop/sharpen/artificial enhancement. Raster dimensions320×180,390×219,430×242; ideal CSS16:9 dimensions320×180,390×219.375,430×241.875. Integer raster rounding is disclosed separately, not a new camera transform or exact CSS/browser fit measurement. Six captioned side-by-side panels use these scene pixels without enlargement; viewer scale/physical display is not calibrated.

Original has no investigation app zoom in this assessment. Later Changed zoom, larger targets or exact routing cannot establish Original recognition. Target geometry stays57.6×48.6/gap9 at320 and70.2×59.23125/gap10.96875 at390; inherited narrower-width comfort limitations remain. Proposed48px/8px goals are not certification. No gameplay observation timer, new human trial, physical device or browser test was performed.

[320 Original](comparisons/original-320-B0-vs-Combined.png), [320 Changed](comparisons/changed-320-B0-vs-Combined.png), [390 Original](comparisons/original-390-B0-vs-Combined.png), [390 Changed](comparisons/changed-390-B0-vs-Combined.png), [430 Original](comparisons/original-430-B0-vs-Combined.png), [430 Changed](comparisons/changed-430-B0-vs-Combined.png).
