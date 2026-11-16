# Defects and limitations

| ID | Finding | Effect on this gate | Evidence |
| --- | --- | --- | --- |
| R01-01 | At 960×540 the scene bottom reaches y=629, about 89 CSS px below the visible area. | BV-05 FAIL. Complete initial scene visibility requires scrolling. | DOM bounds and 960 full-page capture. |
| R01-02 | Document-mat label and part of window-table label are covered by later neutral shapes. | BV-03 label-visibility FAIL. Core neutral scene still renders. | Desktop Original and runtime draw order. |
| R01-03 | Effective scene widths are 340/300/215 CSS px at mobile requests. Fine development labels are tiny. | Readability limitation documented under BV-06. No final width policy established. | Mobile measurements and screenshots. |
| CONSOLE-01 | Missing favicon returns 404. | Cosmetic development finding. No observed handoff effect. | Direct favicon tab and source inspection. |
| CONSOLE-02 | Asynchronous listener message lacks an originating stack. | Unresolved browser diagnostic. No renderer attribution. | Captured normal-session logs. |

First-frame callback order, internal phase timing, stale-event rejection, hidden progress writes and internal listener disposal are NOT OBSERVABLE here. Failure/retry and clean-profile comparison remain unexecuted. Earlier mocked-test results are supporting context only.

Recommended next owner action is review of R01-01/R01-02 and, if desired, a separate bounded source-correction authorization for neutral label layering and short-viewport layout. Then rerun the failed browser checks. Owner-assisted clean-profile and safe request-blocking evidence can close the remaining diagnostic gaps. No repair was performed and full T17 remains incomplete.
