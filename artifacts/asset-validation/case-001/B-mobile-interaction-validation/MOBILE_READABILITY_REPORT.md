# Candidate size, target coverage and readability

2026-11-09. All source sizes refer to the verified **refined** B candidate. Actual full-fit browser dimensions are measured separately from raw source images and hit areas. No new observation/recognition study or physical-device test occurred.

| Item at1× overview |320 effective CSS px|390 effective CSS px|
|---|---:|---:|
| Full16:9 image |320×180|390×219.375|
| Passport solid bounds |23.67×20.00|28.84×24.38|
| Mat solid bounds |63.00×26.33|76.78×32.09|
| Stand solid body bounds |30.33×28.67|36.97×34.94|
| Numeral union diagnostic box |13.75×9.55|16.76×11.64|
| Wallet solid bounds |33.67×22.67|41.03×27.63|
| Star source diagnostic ROI |10.69×10.52|13.03×12.82|
| Striped-strap source diagnostic ROI |13.60×19.58|16.57×23.86|
| Each clickable rectangle |**57.6×48.6**|**70.2×59.23125**|
| Minimum rectangle edge gap |**9**|**10.96875**|

Solid bounds use source alpha≥128 after native960 rendering, not thresholded screenshots. Mat bounds describe its total leather extent, including the part occluded by the original passport; they are not unoccluded area. Star/strap/numeral boxes are explicit source ROIs including nearby material, not semantic feature segmentation or a legibility/font-size guarantee. Individual stripes are smaller than the full band. Measurements and source ROI coordinates are in measurements.json. Browser source images have native960×540; DPR changes physical rasterization, not CSS clue size.

The optional390px static PNG copy rounds raster height to219 pixels; the live browser fit is390×219.375 CSS px from the native960×540 image. Static raster rounding is not a different live camera transform or physical-device evidence.

## Actual available width and deviations

Full320/390 scene rectangles matched these expected values in the real desktop browser, including all three emulated DPRs. No target overrides were made. At a320 browser viewport, classic scrollbar loss produced **305px effective width**; it was reported as305. Safe-area simulation under a320 frame yielded:

| Effective width |Target width×height|Minimum gap|48px height /8px gap goals|
|---|---:|---:|---|
|288 (16px inset each side)|51.84×43.74|8.1|Height FAIL, gap PASS|
|256 (32px inset each side)|46.08×38.88|7.2|Both FAIL|

These are proposed comfort goals, not a claim of WCAG compliance or native dp/pt equivalence. The tool does not inflate hidden regions to compensate. A height-constrained120px viewport fits a213.33px-wide source panorama and letterboxes horizontally; being uncropped does not make the smaller resulting clues readable. Actual device safe-area/chrome/text scaling still needs measurement.

## Coverage versus recognition

Independent pixel-center checks show all2630 original passport solid pixels inside its remembered target; the removed visual is absent in Changed. Both Changed stand bodies/bases (6673 pixels each) and wallet4553 solid pixels are entirely inside the respective candidate regions. No region overlap/ambiguous routing; the9/10.97px gap is empty. Upper regions include spare surface above the stand, and each target is substantially larger than visible art. This validates spatial correspondence, not perceptual recognition or finger accuracy.

At320 the original navy passport on navy mat remains small. Existing gold edge, silhouette and visible mat border help informed inspection, but title/fine crest reading is not required or assured.12/21 are upright/high contrast yet about9.55px high as a combined numeral-box diagnostic. Wallet movement is stronger than the small star/individual stripes; material glare/marble texture compete. These inherited risks are not proven corrected by passing hit tests or optional investigation zoom. Original has no application zoom; later2× inspection cannot establish original memory fairness.

Current Mara/Owen pixels and transforms remain exactly stable between snapshots. Their small mobile faces, person/table/chair proportions and Owen's central/plant-table association are provisionally retained, not artistically accepted. No wardrobe/pose/scale or new story prop is introduced. Whole-source contact/perspective was assessed in the preceding composition study; this prototype copies its images and does not reclassify a geometric contact proxy as physical proof.

Owner-reported earlier five fresh trials were generally successful, P1 questioned proportions and P5 found the390px retest small/attention-demanding. That retest was familiarized desktop simulation, not fresh mobile evidence. Raw trial sheets are unavailable/blank in the repository. No new human score, recognition rate or accessibility claim is made. Actual-device diagnostics are the next technical gate; new recognition research would need explicit owner reopening.
