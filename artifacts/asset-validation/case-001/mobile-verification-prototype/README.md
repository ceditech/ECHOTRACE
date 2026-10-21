# EchoTrace isolated mobile verification prototype

2026-10-21 · feature/echotrace · pre-T17 technical validation only.

Open **index.html** directly from disk. No server, app imports, install or network dependency is required. Both candidate images preload. Select 320, 390, 430, 768 or 960 CSS-pixel frame width; actual available width is reported and can be smaller because of browser viewport, safe areas or the simulated inset. Original inspection has no object selection or app zoom. Changed/investigation inspection enables canonical hit diagnostics and optional 1×/2× zoom. These are manual inspection modes, not game phases.

Use Overview, external pan buttons or drag an enlarged scene. Arrow keys move a neutral spatial cursor; Enter/Space reports a canonical hit; Shift+arrows pans; Escape cancels. Controls are keyboard accessible with visible focus, minimum 48px buttons and no scene animations. Custom pinch is deliberately absent; multi-pointer activity cancels selection and browser pinch remains available through touch-action policy, unverified on physical devices. Research SVG overlays show authored target rectangles and visual envelopes separately from immutable image pixels. They are hints for technical inspection and **must not be used for human observation testing or production play**.

Full-scene 16:9 fit is the initial/default view; only deliberate investigation zoom clips the current viewport, and pan/Overview recover context. Taller viewport introduces neutral letterboxing rather than stretching/cropping. Body safe-area environment padding protects layout; the optional inset selector simulates additional space and is explicitly labeled. Browser zoom is not disabled. Snapshot switching resets camera and cancels in-flight input; resizing preserves source center where bounds allow and cancels taps. No scoring, evidence collection, story text, game-state/timer/transition implementation or application bridge integration exists.

## Canonical geometry and candidate art

prepare.py reads canonical case.json visual definitions and interaction rectangles and composites the current testing source assets at those exact normalized visual envelopes, with nearest-pixel raster rounding. It does **not** load Proposal B geometry or reuse B's flattened scene. Shared background and the current stable Mara/Owen layer are identical at both endpoints. Asset normalization to canonical envelopes can differ in aspect/size from B; no source file is altered. The whole 16:9 scene is uniformly fitted, never distorted.

**Important finding:** canonical coordinates paired with these candidates place stands visibly above tabletops and mat/passport/wallet at or over front rims. We retain this mismatch for diagnosis, not as acceptable production staging. Candidate art/canonical pairing is unsuitable for rendered adoption until independently reviewed. Target geometry still maps correctly; better target spacing does not establish physical support or visual fairness.

## Commands

From the repository root, using existing Python/Pillow and Node:

```powershell
python artifacts/asset-validation/case-001/mobile-verification-prototype/prepare.py
node --test artifacts/asset-validation/case-001/mobile-verification-prototype/test-core.cjs
node artifacts/asset-validation/case-001/mobile-verification-prototype/test-browser.cjs
python artifacts/asset-validation/case-001/mobile-verification-prototype/verify.py
```

prepare.py and verification scripts write only here. Never replace protected-before.json to hide a source mismatch. test-browser.cjs uses installed Chrome (Edge fallback), Node's built-in CDP/WebSocket and an isolated browser profile; no dependency downloads. It produces real headless desktop-browser results with CSS width/DPR/media emulation, not Android/iOS validation. Browser profile is disposable test data; the final delivery removes that transient directory after closing the spawned browser. A rerun creates it again.

For owner-run device diagnostics, copy the complete folder to a device with local-file support or serve this folder over a trusted local network using an existing static server. Do not expose the repository root or confuse a desktop localhost address with a phone address. No server was started, package installed, PWA/service worker added, or physical device contacted in this assignment. Native file handling/installed-PWA execution on mobile remains unverified.

## Results and readiness

Seven automated core test groups and **25 real Chrome browser checks pass**. Latest Chrome product/version, exact assertions, initial failures and fixes are recorded in TEST_REPORT.md and browser JSON. Current protected baseline contains **294 existing nonignored files**, unchanged byte-for-byte. Canonical definitions are copied exactly, candidate source/output hashes match, only the three authored change layers differ and character pixels remain identical. No new human testing took place.

**Ready for actual-device diagnostic QA, with known artwork mismatch. Not ready for production adoption or visual acceptance.** Physical touch/pinch/browser chrome/safe-area behavior, screen readers, text scaling, device performance and PWA lifecycle still require evidence. Human testing remains closed; device technical QA must not silently reopen it.

## Exact deliverables

Documentation: README.md, OWNER_APPROVAL_RECORD.md, TEST_REPORT.md, MOBILE_READABILITY_REPORT.md, OPEN_ISSUES.md.

Prototype: index.html, style.css, core.js, viewer.js, data.js.

Scripts: prepare.py, verify.py, test-core.cjs, test-browser.cjs.

Records: protected-before.json, asset-manifest.json, measurements.json, verification.json, core-test-results.txt, browser-results.json, browser-results-initial.json, browser-results-layout-failure.json, browser-console.log, FILE_INVENTORY.json.

Images: images/original.png, images/changed.png, images/original-320.png, images/original-390.png, images/changed-320.png, images/changed-390.png, images/difference-mask.png, browser-390-original.png, browser-390-targets.png. Screenshots are whole-browser viewport captures at DPR 2; they are not 390px source-image files.

All changes remain in mobile-verification-prototype/. No prior artifact, application, production asset, canonical case, frozen dossier, roadmap/tracker, T17/T18, commit or push was changed or implemented. Stop at this isolated prototype.
