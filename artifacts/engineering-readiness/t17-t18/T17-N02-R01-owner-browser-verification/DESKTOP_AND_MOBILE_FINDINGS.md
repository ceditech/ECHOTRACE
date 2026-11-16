# Desktop and mobile findings

**DIRECTLY OBSERVED.** All six samples contain one canvas, with exact 16:9 proportions, uniform FIT and centering within about one CSS pixel of its host. None has horizontal page overflow. Scrollbars reduce available width at 1280, 960 and 320. Measured widths are distinct from the requested viewport.

| Requested viewport | DOM client area | Canvas CSS size | Canvas x,y | Page scroll height |
| --- | --- | --- | --- | --- |
| 1440×900 | 1440×900 | 606×340.875 | 417, 358 | 900 |
| 1280×720 | 1265×720 | 606×340.875 | 329.5, 350 | 826 |
| 960×540 | 945×540 | 576×324 | 184.5, 305 | 718 |
| 430×932 | 430×932 | 340×191.25 | 45, 425 | 932 |
| 390×844 | 390×844 | 300×168.75 | 45, 436 | 844 |
| 320×640 | 305×640 | 215×120.9375 | 45, 464 | 774 |

**BV-05 FAIL.** At 960×540, the measured canvas spans y=305 through y=629. The initial visible viewport ends at 540. About 89 CSS pixels of scene extend below it. The canvas fits its host, but the complete scene requires scrolling. The full-page screenshot spans 718 raster rows and documents the full content, without establishing visibility within the 540px viewport. [960 full-page evidence](screenshots/original-desktop-960-fullpage.jpg)

**BV-03 label finding.** The window-table text is partly hidden and the document-mat label is obscured by later shapes. Passport, wallet, stands, plant table and backpack labels remain visible at desktop. The source draws each shape and its label together in authored order, making this overlap consistent with later objects covering prior labels. [Desktop Original](screenshots/original-desktop-1440.jpg)

**BV-06 PASS with recorded limitations.** Mobile samples preserve a complete fitted scene within the visible area and permit a fresh Start at 320. The canvas is only 340, 300 and 215 CSS px wide at the three mobile requests. Fine text is extremely small. Header/status text reflows and the page scrolls at 320. No mobile readability threshold, final artwork recognition finding, physical-device acceptance, touch emulation or RFS-001 conclusion follows. [390 evidence](screenshots/original-mobile-390.jpg) · [320 viewport evidence](screenshots/original-mobile-320-viewport.jpg)

**Capture limitation.** Screenshots are unmodified JPEG bytes returned by the browser interface. Their raster dimensions, full-page flags and hashes are recorded. Some dimensions differ from requested CSS viewport dimensions. DOM measurements establish the recorded layout. Full-page capture may include content beyond the initial viewport.

The earlier owner statement mentioned a brown backpack. This mission observed a neutral gray geometric representation labeled Owen backpack and made no production-artwork identification.
