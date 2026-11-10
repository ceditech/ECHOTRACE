# Real browser verification

2026-11-09. **PASS:77 named checks** in the complete final run. The focused32-check pass was a debugging subset and is not substituted for the complete result. verify.py requires the complete45-case width×DPR×zoom matrix and rejects a focused-only report.

## Exact environment

- Installed Windows executable: C:/Program Files/Google/Chrome/Application/chrome.exe.
- Product: **Chrome/157.0.8103.38**; protocol1.3; JS15.7.112.23.
- Revision: @a733b5afbb3ba618844ff8876b89ad1a774b2f18.
- UA: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/157.0.0.0 Safari/537.36.

This is real **headless desktop Chromium**, using Node22's existing WebSocket/CDP and file:// local loading. No Playwright/Puppeteer/dependency install. Mobile widths, DPR, reduced-motion media, touch and pen events are emulated inputs, not Android/iOS hardware or OS accessibility evidence. Full raw version/UA/assertion names/dimensions are in browser-results.json. Runtime exceptions and console.error events are collected; both are absent in the final run. browser-console.log retains the spawned browser's stderr separately, including any nonapplication diagnostics.

## What ran

45 combinations: all five required widths × DPR1/2/3 × zoom1/1.5/2. Each checks actual effective width/target metrics and all four target identities after bounded button pan as needed.1× checks the complete16:9 image is contained; all cases check aspect and no horizontal page overflow. Additional tests cover tall letterboxing and short height-constrained containers at three zooms, actual browser resizing/landscape desktop arrangement, simulated safe insets, scrollbar loss, keyboard focus/activation/spatial selection, no Original app zoom/selection, snapshot overview reset, overlays and reduced-motion media.

Actual CDP pointer cases include capture/no pointerdown commit,8px versus9px, unrelated pointer ID, capture release, active-gesture resize/snapshot/zoom/pan, continuous drag pan, gap/letterbox/outside taps, an integral top-edge/one-CSS-pixel-above boundary, five rapid taps, pen, single touch, touchCancel and two-touch cancellation. Exact transformed far-edge cases at all widths/zooms run in core tests; browser event coordinates can have platform rounding, so no hit tolerance was introduced to pretend complete physical edge accuracy.

Measurements at full320/390 matched expected target values, without geometry changes. A320 browser viewport with classic desktop scrollbar allowed **305px** scene width; the test records305 rather than asserting nominal320. Exact scene-width cases provide32px extra browser room, then assert the actual scene rectangle. Simulated16/32px insets yield288/256 effective widths with honest comfort-height failures. See measurements.json and browser-results.json rather than interpreting native image pixels as CSS display size.

Screenshots browser-390-original.png / browser-390-targets.png capture a real390 CSS-pixel scene in a422px browser viewport at DPR2. They are844×2200 viewport rasters, not390px mobile PNGs. Original shows the unchanged refined source with no target overlay; Changed shows separate research target outlines. Their native display may be resized by the chat/image viewer.

## Failures retained, not hidden

1. browser-results-01-capture-failure.json:56 checks passed before a cancelled capture request still allowed a commit. The adapter was strengthened for pending capture cancellation and established capture lifecycle. No region or8px threshold changed.
2. browser-results-02-threshold-failure.json / -03-capture-telemetry.json / -04-mouse-capture-telemetry.json retain the subsequent failure investigation. The initial guard was too broad for capture lifecycle, and telemetry exposed the harness sending `button:none` with a held `buttons:1` during mouse movement. In this Chromium run that lost the pending capture before establishment and produced an apparent threshold failure. The helper now sends a consistent held left-button state. Established capture is tracked separately; normal implicit release does not masquerade as cancelled pending capture. Assertions stayed unchanged.
3. browser-results-focused-pass.json:32 checks passed after fixes. The final full run then repeated all45 matrix cases plus32 other checks:77 PASS, zero errors. Source file formatting happened before that final run.

These findings and fixes are confined to this new folder. Previous prototype/test code, candidate geometry and production sources were not altered. Simulated successful touch/pan cannot establish real finger accuracy, screen-reader behavior, iOS capture semantics, native pinch or installed-PWA readiness. DEVICE_QA_PROCEDURE.md defines those remaining checks.
