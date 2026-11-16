# Browser retest matrix

**DIRECTLY OBSERVED through the existing authorized Chrome extension.** The owner server at 127.0.0.1:53949 was reachable. The changed code was reloaded before a fresh Start. The observation ready status appeared. Browser version and DPR were not recorded.

| Requested viewport | DOM client area | Canvas CSS size | Canvas top–bottom | Page scroll height | FIT / no overflow / one canvas |
| --- | --- | --- | --- | --- | --- |
| 1440×900 | 1440×900 | 606×340.875 | 358–698.875 | 900 | PASS |
| 960×540 | 960×540 | 590.21875×332 | 181–513 | 540 | PASS |
| 1280×720 | 1265×720 | 606×340.875 | 350–690.875 | 826 | PASS |
| 430×932 | 430×932 | 340×191.25 | 425–616.25 | 932 | PASS |
| 390×844 | 390×844 | 300×168.75 | 436–604.75 | 844 | PASS |
| 320×640 | 305×640 | 215×120.9375 | 464–584.9375 | 774 | PASS |

## BV-03 · PASS

At desktop sizes the document-mat and window-table labels are visible above the geometry. The mat and passport labels are separated near their respective upper edges. No new desktop label overlap was observed. Object rectangles and development caption remain present. [1440 ready capture](screenshots/original-1440x900-ready.jpg) · [960 capture](screenshots/original-960x540.jpg)

## BV-05 · PASS

The 960×540 resize and a fresh briefing→Start at the same size both produce a canvas from y=181 to y=513. Viewport/client height is 540, scroll height is 540 and scrollTop is zero. Back is y=12–56, heading y=105–137 and status y=145–169. All required content and the full canvas are initially visible. [Fresh Start capture](screenshots/fresh-start-960x540.jpg)

## Preserved normal-height layout and smoke checks

The 1440, 1280, 430, 390 and 320 canvas sizes and positions match the recorded R01 measurements. Every size has one canvas, correct centered 16:9 FIT and no horizontal overflow. Home and fresh briefing each have zero canvases. A fresh Start returns one. Returning from mobile to 1440 restores the normal desktop dimensions.

These are CSS viewport simulations. Fine mobile text remains small. The page at 320 retains its existing vertical scroll height, while the canvas itself remains visible. No minimum-width policy, physical-device acceptance or full BV-01 through BV-11 reacceptance is claimed.

All captures are unaltered browser JPEG bytes. Raster sizes can differ from CSS dimensions and are recorded separately. The first 1440 capture contains the loading caption; a separate settled-ready capture was taken. Callback ordering is supported by the existing automated contract and was not independently instrumented here. [Structured browser observations](diagnostics/browser-observations.json)
