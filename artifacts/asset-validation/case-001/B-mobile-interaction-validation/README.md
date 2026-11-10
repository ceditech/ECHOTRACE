# MIV-001 — refined Approach B mobile interaction validation

2026-11-09 · feature/echotrace · isolated pre-T17 research.

**PASS — READY FOR ACTUAL-DEVICE DIAGNOSTIC QA.**21 isolated test groups and77 real desktop Chrome checks pass.404 existing protected files remain unchanged. This means readiness for technical device inspection, not physical-device validation, accepted artwork/staging, accessibility compliance or production implementation.

## Run the standalone prototype

Open **index.html** directly from disk. Both candidate images preload. No development server, application import, dependency installation, score/evidence/session engine or production data registration. Controls remain outside the16:9 scene and honor body safe-area insets. Select320/390/430/768/960 frame width, then read **actual effective fit width**, which may be smaller from available space/insets/height/scrollbars.

Original inspection has no selectable targets or app zoom. Changed/investigation inspection enables exact refined-candidate hit diagnostics,1×/1.5×/2× zoom, bounded drag/button pan and Overview. Snapshot switching returns to Overview and cancels pending pointer input. Arrows move a neutral spatial cursor; Enter/Space inspects a hit; Shift+arrows pans; Escape cancels. External controls have visible focus and button alternatives to dragging. Reduced-motion mode has no scene animation. Custom pinch camera is not implemented; multi-pointer activity cancels taps and native browser pinch is not disabled.

Cyan target and magenta visual-envelope overlays are optional, explicitly research-only SVG layers, never painted into source artwork. Target outlines display only in Changed. The page is a scrollable inspection tool, **not a participant-facing observation test or game**. No25s observation,2s transition, replay, hints or anti-cheat claim. Do not interpret its object-ID feedback as correctness, scoring or collected evidence.

## Exact source and findings

Uses byte-exact isolated copies of composition-correction-study/B-proposed-case.json and that study's **new B** original/changed PNGs. It does not substitute layout-alternatives/B or the earlier canonical-render prototype. Source hashes/geometry were verified before generation. Candidate remains provisionally accepted for this validation only; characters remain provisionally retained. No source retouch, image generation, geometry override or production adoption.

At320 effective width, targets57.6×48.6px/gap9px; at390,70.2×59.23125/gap10.96875. Passport solid23.67×20 /28.84×24.38px is much smaller than its target; numerals~9.55/11.64px high.288 and256 effective widths fail48px comfort height;256 also fails8px gap. The browser measured a scrollbar-constrained320 viewport as305px and reports it honestly. See MOBILE_READABILITY_REPORT.md for feature/target separation and remaining visual risks.

Real Windows headless **Chrome/157.0.8103.38**, not Android/iOS hardware, tested all five widths × DPR1/2/3 × zoom1/1.5/2, plus pointer/keyboard/cancellation/media/resize checks. Core uses no hit tolerance or nearest-object guess.404 raw protected hashes, exact three events, stable people/background, shared closed wallet and unchanged nonvisual truth pass independent checks. No physical-device or new human study occurred.

## Reproduce

From repository root with existing Python/Pillow and Node:

```powershell
python artifacts/asset-validation/case-001/B-mobile-interaction-validation/prepare.py
node --test artifacts/asset-validation/case-001/B-mobile-interaction-validation/test-core.cjs artifacts/asset-validation/case-001/B-mobile-interaction-validation/test-candidate.cjs
node artifacts/asset-validation/case-001/B-mobile-interaction-validation/test-browser.cjs
python artifacts/asset-validation/case-001/B-mobile-interaction-validation/verify.py
npm run test:artifacts
```

The existing artifact command is read-only; it does not automatically run new Python checks. Browser tests use existing Chrome, Edge fallback, native Node CDP/WebSocket and an isolated browser-profile/ directory created here. That transient profile is excluded from evidence inventory and removed after closing the spawned browser for final delivery; reruns recreate it. Do not overwrite protected-before.json or old QA records to accommodate a source mismatch. A failed source/geometry validation must stop the candidate exercise.

New handwritten JS/CJS/HTML/CSS was formatted only inside this folder with existing Prettier using `--ignore-path .gitignore`, before the final complete browser run/hashing. Generated data.js/JSON use Python indent2 plus final newline; Python sources pass AST checks. No production ESLint/build/typecheck claim is made from standalone tests, and no old file was reformatted.

## Deliverables

Nine reports: README.md, OWNER_AUTHORIZATION_RECORD.md, CANDIDATE_GEOMETRY_AUDIT.md, INTERACTION_TEST_REPORT.md, BROWSER_VERIFICATION_REPORT.md, MOBILE_READABILITY_REPORT.md, DEVICE_QA_PROCEDURE.md, OPEN_ISSUES.md, VERIFICATION_REPORT.md.

Prototype: index.html, style.css, core.js, viewer.js, data.js, candidate.json, images/original.png and changed.png,320/390 copies, difference-mask.png. Two actual browser screenshots capture Original and research target overlays.

Scripts/records: prepare.py, verify.py, test-core.cjs, test-candidate.cjs, test-browser.cjs; protected-before.json, source-audit.json, asset-manifest.json, measurements.json, verification.json, unit-results.json, unit-test-results.txt, browser-results.json, browser-console.log and preserved failed/focused browser JSONs. **FILE_INVENTORY.json is the exact final file/size/hash list**, not an inferred count from this summary.

Remaining owner gates: actual-device technical results, original readability, character/table association/proportions, art/provenance and any future canonical/production adoption. DEVICE_QA_PROCEDURE.md separates Android Chrome/iOS Safari from an installed PWA surface, which is not supplied here. Human testing stays closed. No canonical changes, production artwork adoption, application implementation, T17/T18, commit or push. Stop for owner review.
