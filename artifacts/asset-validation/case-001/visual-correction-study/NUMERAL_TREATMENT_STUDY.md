# C2 matched numeral treatments

C2a retains original Arial Bold260px layout, center(384,302),2px dark stroke and glyph size; changes fill from(245,209,120) to(255,232,160). C2b uses the same font at248px with8px tracking, bright fill and same2px stroke. Both strings are centered within existing shared numeral ROI [243,203,518,394] without scaling; each treatment uses identical parameters for12/21. Only numeral-region pixels change; stand body/canvas/source silhouette and prop centers/sizes remain identical. Existing blank stand master is reused; no replacement stand generation.

| ID | 12 actual glyph box at320 | 4-connected mask components320 | 12 contrast proxy320 | 390 | Pair difference pixels |
|---|---|---|---|---|---|
| B0 | 13.03×9.53 | [31, 22] | 8.54 | 7.82 | 15391 |
| C2a | 13.03×9.53 | [31, 22] | 10.23 | 9.40 | 15411 |
| C2b | 12.83×9.13 | [33, 23] | 7.59 | 10.31 | 15265 |

C2a increases the numeral material-luminance proxy while preserving size/shape and two major digit components after downscaling. C2b slightly reduces glyph height (about9.13 versus9.53px at320), changes spacing and has inconsistent downsample contrast: its320 proxy is lower than B0 while390 is higher. This is a sampling/shape tradeoff, not evidence of improved recognition. It is not recommended over the simpler C2a.

Glyph measurements use RGB difference against the exact blank master, then scaled support threshold128; per-number boxes differ from VAR's shared manual13.75×9.55 ROI. Both definitions are disclosed. Continuity here means two major4-connected components at the chosen mask threshold; it does not prove every font stroke is visually readable. Proxy contrast uses glyph support median versus same-location blank over a shared navy underlay; not actual whole-scene or universal accessibility contrast. Raw source partial-alpha effects are retained and disclosed.

The same modified stand12/21 source is used at its two intended positions, with no independent endpoint typography edit. Exact transformed tile identity and shared body outside ROI are checked.12/21 remain upright and distinct in informed static320/390/430 inspection; first-time mobile recognition is NOT VERIFIED. Existing app zoom/large hit areas do not improve Original encoding retroactively.

C2a CONDITIONAL, useful independent option if owner wants a small numeral-color correction. C2b CONDITIONAL but not recommended due to smaller glyphs and unstable proxy benefit. No candidate is labeled a recognition/accessibility PASS. [C2a320](comparisons/C2a-320-PAIR-REVIEW.png), [C2a390](comparisons/C2a-390-PAIR-REVIEW.png), [C2b320](comparisons/C2b-320-PAIR-REVIEW.png), [C2b390](comparisons/C2b-390-PAIR-REVIEW.png).
