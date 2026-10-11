# Controlled observation test package

2026-10-10. Approved character designs and separate-layer direction are authorized **for testing only**. Production adoption, canonical Proposal B geometry adoption and T17/T18 implementation remain unauthorized.

Recommendation: **CONDITIONAL** pending facilitator browser preflight. Deterministic verification passes; actual browser behavior has not been tested. Human tests: **NOT PERFORMED**. Runtime touch tests: **NOT PERFORMED**.

Open index.html directly from disk. No development server, network, application runtime or installation is needed by the viewer. Read TEST_PROTOCOL.md and TEST_SCRIPT.md on the facilitator display only. Click Open participant screen; allow the local popup. Move it to the participant display, choose the assigned width in the console, confirm preload reports ready, and use Start. There are no controls, answers or countdown on the participant screen. End recall hides the changed scene; it also ends automatically after 60 seconds. Reset blanks the screen and cancels pending timers. Reset/replay contaminates first-time evidence: record later sessions as familiarized.

Before recruitment, run a facilitator-only smoke session in the intended browser: ready → original for 25 seconds → blank for 2 seconds → changed for up to 60 seconds → ended. Check early End recall, Reset, popup messaging and actual width. Do not use a study participant for this rehearsal. Record browser preflight outcome in RESULTS_TEMPLATE.md. If the popup cannot receive local-file messages, do not conduct a scored trial in that browser; use another existing browser and document it. Keep the participant screen visible and unchanged throughout; hiding/resizing invalidates an active session.

Widths are 960, 390 and 320 **CSS pixels**, using exact 960×540 source copies scaled by the browser. Full 16:9 composition is retained. Start is refused when the viewport cannot fit the requested width/height. Use a sufficiently large participant window; requested width is not a device certification. Copy the console metrics during recall into the observation sheet. Verify displayed width independently if needed. Record browser zoom, OS scale, device pixel ratio and physical device. Do not enlarge a mobile source and call it a mobile-width test.

Inventory: README.md; TEST_PROTOCOL.md; TEST_SCRIPT.md; OBSERVATIONS.csv; SCORING_RUBRIC.md; RESULTS_TEMPLATE.md; QA_REPORT.md; index.html; viewer.css; viewer.js; images/scene-a.png; images/scene-b.png; image-manifest.json; protected-before.json; verify.py; test-sequence.cjs; verification.json. Image hashes and exact source paths are in image-manifest.json. Neutral copy names do not disclose the answers; no annotation art is included.

From repository root, run:

```powershell
python artifacts/asset-validation/case-001/observation-human-test/verify.py
```

Verification uses existing Python/Pillow and Node; viewer use does not require them. Prior QA folders are read-only. No files outside this package are changed.

Browser navigation, reload, external image viewers, source inspection, developer tools and OS controls cannot be completely prevented. Facilitate the session, keep scoring materials out of view, and mark compromised trials invalid. Browser timer scheduling and display refresh are not laboratory timing guarantees. No touch accuracy or Phaser interaction conclusions follow from this static test.
