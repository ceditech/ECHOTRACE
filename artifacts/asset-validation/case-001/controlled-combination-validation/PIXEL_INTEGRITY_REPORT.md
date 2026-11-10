# Native pixel integrity — Level A

| Endpoint | C1a edit pixels | C2a edit pixels | Overlap | Combined/B0 union | Outside union | Combined/C1a | Combined/C2a |
|---|---|---|---|---|---|---|---|
| original | 2581 | 1774 | 0 | 4355 | 0 | 1774 | 2581 |
| changed | 0 | 1772 | 0 | 1772 | 0 | 1772 | 0 |

All pixel values inside the union come from the exact authorized treatment; no values outside it change. C1a Changed is byte/pixel identical to B0; combined Changed is pixel-identical to C2a Changed. No whole-frame blend, substitute candidate or new treatment. Bounding boxes in measurements.json are extents only: they are not filled permitted regions.

Combined Original/Changed differences:

| Explained region | RGB difference pixels | Native bbox, exclusive far edge |
|---|---|---|
| passport_removal | 2893 | [174, 257, 250, 321] |
| left_numeral_exchange | 1278 | [312, 160, 358, 194] |
| right_numeral_exchange | 1277 | [696, 160, 742, 194] |
| wallet_departure | 4985 | [313, 253, 418, 324] |
| wallet_arrival | 4980 | [668, 253, 773, 324] |

Total **15413** changed RGB pixels in five spatial regions explained by exactly three events. Passport removal creates one region, stand exchange two numeral regions, wallet movement two endpoint regions. Raw pixel/event counts are different concepts. Difference count need not equal B0's15,391. Zero unexplained pixels outside event alpha union or the five reviewed regions; zero difference pixels intersect the character layer.

A–C: exact disjoint union, no extra/missing source edits. D–E: passport size/alpha/placement and C1a identity pixels preserved, absent Changed. F–G: exact C2a numeral assets; source body outside numeral ROI/solid silhouette and scene geometry B0. H: both wallet layers equal B0 at original/changed positions. I–J: exact B0 Mara/Owen/background/furniture sources/order; no authorized-delta intersection with character/wallet alpha; unrelated layers stable. K–L: five explained regions map to the same three canonical IDs/kinds. No new occlusion introduced: all clue alpha, geometry and layer order remain fixed.

Source-level alpha checks and composited RGB checks are separate: opaque native RGB PNG equality alone does not prove an input alpha channel unchanged, so both are checked. Alpha interior/antialias characteristics already present in source artwork are retained, not globally retouched. This is technical combination integrity, not Level C recognition, Level D device QA or legal rights clearance.

[Measurements](measurements.json), [regressions](regression-results.json), [method](COMBINATION_METHOD.md), [native difference mask](comparisons/combined-pair-DIFFERENCE-DIAGNOSTIC.png).
