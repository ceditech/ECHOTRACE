# Defect resolution

| Defect | Before R01 | T17-N03 result | Evidence |
| --- | --- | --- | --- |
| R01-02 / BV-03 | Later object rectangles obscured mat and window-table labels. Centered mat/passport labels also share an anchor. | RESOLVED for the bounded neutral scene. Geometry precedes a foreground label pass, with separate upper-edge anchors. Both known labels are readable at desktop sizes. | Desktop screenshots and rendering-order regression. |
| R01-01 / BV-05 | At 960×540 the canvas extended from y=305 to 629, below the initial viewport. | RESOLVED. Canvas now spans y=181–513 with a 540px page and scrollTop zero, including on a fresh Start. | DOM measurements and fresh-start-960x540.jpg. |

The compact layout is scoped to desktop-width observation at heights up to 600px. It preserves required controls and semantic status and does not conceal content to satisfy the check. Scene geometry and FIT remain unchanged.

Remaining limitations include tiny mobile diagnostic labels, the prior unresolved console-listener origin, untested failure injection and physical-device behavior. This mission does not resolve those issues or authorize timers, production artwork, broader gameplay, RFS-001 or governance changes.
