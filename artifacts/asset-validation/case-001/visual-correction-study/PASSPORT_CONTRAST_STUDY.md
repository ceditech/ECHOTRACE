# C1 passport-only contrast

C1a applies navy-cover RGB increments(10,14,18); C1b(18,24,30), multiplied by a smooth material selector clamp((B−R)/25)×clamp((150−maxRGB)/70). Alpha, canvas, gold identity details, placement and dimensions are retained. Mat, wallet, stands, characters and background are untouched. No outline/glow/ring or added hint. Exact parameters/source/output hashes in candidate-manifest.json.

| ID | Cover/mat320 proxy | 390 | 430 | 960 | Native2px edge-band ratio | Original RGB pixels vs B0 | Changed RGB pixels vs B0 |
|---|---|---|---|---|---|---|---|
| B0 | 1.018 | 1.013 | 1.015 | 1.026 | 1.152 | 0 | 0 |
| C1a | 1.131 | 1.142 | 1.132 | 1.126 | 1.349 | 2581 | 0 |
| C1b | 1.282 | 1.282 | 1.283 | 1.275 | 1.536 | 2637 | 0 |

Both candidates leave Changed pixel-identical to B0, naturally empty with no passport silhouette painted into the mat. Original changes stay inside passport alpha/envelope. Passport solid bounds and all target geometry are identical to B0. No new clipping/occlusion.

Material proxy: median relative luminance from a mapped cover source ROI [380,365,440,405] against mat [650,260,710,310]. At mobile these patches are tiny; sample counts/exact rectangles recorded. Native edge proxy compares2px morphology bands, outer constrained to the mat; it includes the existing gold perimeter. Neither is whole-object/semantic contrast, a WCAG threshold or empirical recognition evidence. Increased ratio can improve sampled separation without proving passport identity.

Static native/mobile review: C1a is subtle, maintains dark navy material and existing texture. C1b shows stronger but still natural cover separation; no halo/glow is introduced. Both retain a small booklet whose gold details remain tiny at320/390. Image-viewer familiarity/scale is not a human trial. Choose C1a as the smallest measured change for owner review; C1b is a reserve alternative if owner finds C1a too subtle. Neither is a proven solution to Original fairness.

Both overall CONDITIONAL; structural regressions PASS. No retouch outside the passport, no mat adjustment and no regeneration. [C1a320](comparisons/C1a-320-PAIR-REVIEW.png), [C1a390](comparisons/C1a-390-PAIR-REVIEW.png), [C1b320](comparisons/C1b-320-PAIR-REVIEW.png), [C1b390](comparisons/C1b-390-PAIR-REVIEW.png).
