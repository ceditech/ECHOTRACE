# Mobile fit and minimum-width assessment

V9 CONDITIONAL. Native scene960×540, aspect16:9; full-frame FIT without crop or stretch is the planning/diagnostic contract. These are actual effective scene widths in the calculations, not requested viewport widths.

| Effective W | Exact CSS scene | Hit target | Minimum gap | 48px/8px proposed project goals |
|---|---|---|---|---|
| 256 | 256×144 | 46.08×38.88 | 7.2 | both below goals |
| 288 | 288×162 | 51.84×43.74 | 8.1 | height below goal |
| 320 | 320×180 | 57.6×48.6 | 9 | meets numeric goals only |
| 390 | 390×219.375 | 70.2×59.2313 | 10.9688 | meets numeric goals only |
| 430 | 430×241.875 | 77.4×65.3063 | 12.0938 | meets numeric goals only |
| 960 | 960×540 | 172.8×145.8 | 27 | meets numeric goals only |

Targets are .18W by .27×9W/16; gap .05×9W/16. Thus target height reaches48 at W≈316.05 and gap reaches8 at W≈284.44.320 is a defensible provisional engineering floor for these two numeric comfort goals only; it is not a validated visual-recognition minimum.390/430 provide more samples but do not resolve Original clue identification by themselves. Do not certify320 as accessible or force landscape/crop to hide the problem.

All six new previews are full-frame LANCZOS reductions, without retouch/sharpen/crop.320 raster320×180 is exact16:9;390 raster390×219 and430 raster430×242 use integer pixel heights nearest to ideal219.375/241.875. That static raster rounding is disclosed, not a new camera rule or exact CSS aspect test. Live presentation should use native960×540 at exact uniform CSS fit. No mobile browser was run here; the app image viewer may scale media and is not a CSS/physical-screen calibration tool.

Original has no investigation-only application zoom; readability assessment uses full overview. Existing Changed optional1×/1.5×/2× zoom and bounded pan can aid inspection, but cannot retroactively improve Original memory encoding. No camera/framing/target change is proposed as adopted. Investigation interaction success does not validate Original fairness.

Insets, browser chrome, control layout, text scaling or constrained height may reduce actual effective width below requested320/390/430. PDQA reports requested430≈411.43 once on Android, configuration/cause unknown; do not infer a notch/height cause. Historical desktop scrollbar case measured305, and simulated insets produced288/256. At288/256 the documented comfort limitations persist; a larger invisible hit area is not proposed to conceal them.

Owner must define supported effective-width policy: provisional target-based floor320, honest reporting/fallback below it, and separate acceptance of unresolved Original readability even above it. A neutral preparation/reorientation suggestion could be evaluated later but is not a new approved gameplay policy. No accessibility certification, forced browser zoom policy, observation-time extension or hidden clue omission follows. iOS, installed PWA, screen-reader/text-scale and device performance remain unverified here. AGQA's later six owner-reported Android PASS do not settle visual acceptance; independent video corroboration remains pending and no repository report was found.

See [readability](VISUAL_READABILITY_REPORT.md), [measurements](measurements.json), [sources](SOURCE_AND_SCOPE_REGISTER.md).
