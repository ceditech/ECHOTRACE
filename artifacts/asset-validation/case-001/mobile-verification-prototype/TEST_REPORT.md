# Technical verification report

Executed 2026-10-21 on feature/echotrace. Scope: standalone technical prototype; no gameplay implementation.

## Automated checks executed

Node native test runner: **7/7 groups pass**, no skipped groups. test-core.cjs covers:

1. Fit and source/CSS inverse round-trips at 320/390/430/768/960, normal/tall/height-constrained viewports, zoom 1/1.5/2 and clamped pan.
2. All four canonical region centers at each width/zoom return the exact ObjectId.
3. Inclusive origin/exclusive far edges, adjacent row gap, outside/letterbox rejection.
4. Ambiguous overlapping ObjectIds reject independently of ordering.
5. Zoom bounds, pan clamps, invalid dimensions and source-center preservation on resize.
6. ≤8px versus >8px tap threshold, stale epoch, cancellation, different target and duplicate completion.
7. Exactly three required meaningful canonical events, stable visual definitions, preserved shared asset/size/rotation, exchanged stand positions and wallet source/destination.

The 8px threshold and half-open convention are prototype parameters. Normalized coordinates/region edges are rounded to 12 decimal places solely to stabilize floating-point round trips; no perceptible hit slop is applied. Original has no target selection. Four hit rectangles do not constitute four authored changes: either stand belongs to the same one exchange. There is no correctness, scoring or evidence processing in the prototype.

Python prepare.py checks no endpoint difference outside the rendered passport/wallet/stand layer union and zero difference beneath the shared character alpha. verify.py independently checks source/output hashes, exact canonical scene/change copies in data.js/measurements.json, actual pair dimensions/difference mask/character pixels, local file references, script syntax and no runtime imports/network dependencies. The SVG namespace URL is a namespace identifier, not a fetched dependency. Protected-file inventory and all **294** baseline SHA-256 values match. git diff --check passes. Application lint/type/domain/build/E2E were not run because no application file changed; the isolated tests are the applicable executed checks.

## Real browser execution

**PASS: 25 checks** in installed Windows **Chrome/155.0.8059.82**, headless mode, via Node WebSocket/Chrome DevTools Protocol. No Playwright/Puppeteer/dependency install. The real browser opened file://index.html and decoded both native 960×540 images. Exact product/UA and assertion names are in browser-results.json; no runtime exception was recorded.

Browser checks include all five exact effective scene widths with complete 16:9 fit/no horizontal page overflow; narrower available-width reporting; actual mouse pointer hit mapping at DPR 2; remembered passport; letterbox mapping; simulated 16px side insets giving 288px rather than claiming 320px; 2×/pan/Overview; pointer movement and resize cancellation; Original noninteraction; snapshot overview reset; independent SVG overlays; emulated reduced-motion CSS; focused external button/keyboard action; spatial cursor/Enter returning the same canonical stand; and screenshot capture.

Requested scene width is distinct from browser width. Desktop classic scrollbars consume layout width, so the exact-width cases use a browser viewport with 32px extra room; assertions read the actual scene rectangle. A separate narrow-browser case verifies honest reduced-width reporting. Screenshots record 390 CSS-pixel scenes in a 422px emulated browser viewport at DPR 2. They are real rendered desktop-browser evidence, not hardware mobile screenshots.

Initial run failed an incorrect test assumption equating browser width to scene width under desktop scrollbar consumption (browser-results-initial.json). The next run revealed genuine research-control horizontal overflow at narrow width; control labels/selects were made to wrap within the prototype (browser-results-layout-failure.json). The final browser rerun passed all checks. A verifier initially mistook the SVG namespace for a remote dependency; the check now explicitly excludes that literal namespace. No application or canonical data was touched to address these findings.

## Untested and limitations

No actual Android/iOS device, touchscreen, native pinch, screen reader, installed PWA, OS lock/suspend, browser BFCache/reload recovery, production input bridge, wall-clock observation timing or device performance test was performed. CDP mouse dispatch and media/DPR emulation are not tap-accuracy or OS-accessibility evidence. Simulated safe padding does not prove notch/home-indicator behavior. Reduced-motion media was emulated and there is no scene animation; this is not a full accessibility audit. Pinch is not a custom implemented feature; extra pointers cancel selection. Timers/transition phases are out of scope, not missing passed features.

Candidate rendering exposes support/perspective defects under canonical visual geometry. See MOBILE_READABILITY_REPORT.md and OPEN_ISSUES.md. Exact target membership tests validate coordinate logic, not target-to-table plausibility or clue recognition. No new participant results or percentage success rate is reported.

Status: **technical prototype ready for actual-device diagnostic QA with known art blockers; production visual acceptance NOT READY**. No T17/T18 implementation, production adoption, commit or push.
