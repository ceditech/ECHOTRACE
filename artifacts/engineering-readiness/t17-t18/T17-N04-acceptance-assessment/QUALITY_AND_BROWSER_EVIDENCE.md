# Quality and browser evidence — Layers B/C/D

N01 commit `081ad0dd8378981f8bf734a75dd8054ffcd62e54` was inspected locally: exactly eight files, five source and three tests. Sources: neutral-scene, briefing, case-experience, phaser-host, phaser-runtime; tests: neutral-observation integration, neutral-phaser-runtime and briefing. [N03 baseline](../T17-N03-presentation-corrections/diagnostics/baseline.json) corroborates later hashes. Original session reported 45 focused/230 full tests and type/lint success, with two historical TRDA JSON formatting failures. No standalone N01 raw execution transcript was located: original numeric results remain reported history, not independently rerun or fully substantiated raw logs. N03 offers stronger later repository evidence.

[Initial N02](../T17-N02-browser-verification/VERIFICATION_REPORT.md) was blocked by execution-context loopback access. [ED01](../T17-N02-environment-diagnostics/README.md) isolated client access failures against a minimal listener, without establishing exact restriction mechanism. These are not application failures; owner Windows Chrome later worked in a different context.

[R01](../T17-N02-R01-owner-browser-verification/BROWSER_TEST_MATRIX.md) remains8PASS,2FAIL(BV03/BV05),1NOT EXECUTED(BV10). Labels were obscured;960×540 canvas extended below viewport. Failure injection unavailable. Keyboard/pointer Start, settled Original, navigation and resizing observed; hidden state/resources/order not observed.

[N03 tests](../T17-N03-presentation-corrections/REGRESSION_TEST_RESULTS.md) and [raw command records](../T17-N03-presentation-corrections/diagnostics/check-results.json): two regressions failed before correction,38 focused passed afterward. Initial full run231pass/one existing quality-scope timeout checking ESLint ignores; unchanged rerun232pass across 22 files. Cause not established; no weakening/timeout change. Main/domain TypeScript, changed-file lint zero warnings, changed-file format, whitespace check and production build passed. Root-wide formatting not rerun. N04 did not execute any of these commands.

[N03 browser matrix](../T17-N03-presentation-corrections/BROWSER_RETEST_MATRIX.md) supplies subsequent BV03/BV05PASS and six viewport results, not replacement R01 history. Existing [ready desktop](../T17-N03-presentation-corrections/screenshots/original-1440x900-ready.jpg), [fresh short-height](../T17-N03-presentation-corrections/screenshots/fresh-start-960x540.jpg), [390](../T17-N03-presentation-corrections/screenshots/original-390x844.jpg), [320](../T17-N03-presentation-corrections/screenshots/original-320x640.jpg) document results; original first desktop capture has loading caption, distinct from settled-ready capture. Archived image inspection is not a fresh browser run.

| Requested viewport | DOM client | Canvas CSS px | Canvas top–bottom | Page height |
| --- | --- | --- | --- | --- |
|1440×900|1440×900|606×340.875|358–698.875|900|
|1280×720|1265×720|606×340.875|350–690.875|826|
|960×540|960×540|590.21875×332|181–513|540|
|430×932|430×932|340×191.25|425–616.25|932|
|390×844|390×844|300×168.75|436–604.75|844|
|320×640|305×640|215×120.9375|464–584.9375|774|

All six show uniform centered FIT, one canvas, no horizontal overflow. Short-height fresh Start has scrollTop0 and Back/heading/status/canvas visible. At320 vertical page scrolling remains; actual scene215 is not viewport320. Fine mobile text remains small. Not all heights/orientations tested.

R01 directly demonstrated Enter/Space, visible focus, heading handoff and Tab bypass of aria-hidden non-tabindexed canvas. Role=status/alert is source-supported; screen-reader announcements, nonvisual clue equivalent, zoom/text-scaling, reduced-motion settings and WCAG compliance were not verified. No physical Android/iOS/installed-PWA acceptance for this runtime; historical research device reports are not transferable. No additional human trials.

Historical N02 integrity exception: FETCH_HEAD changed while its814 protected files and branch/HEAD remained stable. No actor inferred, repair performed or application failure inferred. ED01 later recorded FETCH_HEAD stable within its own mission. These are distinct checkpoints, not retroactive clearance of N02.
