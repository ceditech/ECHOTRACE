# Case 001 mobile-first usability study

2026-10-10 · branch feature/echotrace · research and offline prototypes only.

Recommended direction: retain the complete scene as the default view, give it the available width with interface controls outside it, then consider optional neutral 2× zoom/pan for investigation. Prioritize hit-region correspondence/separation and review character/table proportions before broad artwork work. Small tonal polish may help readability but is not proven and cannot substitute for adequate scene size.

The owner reports five completed first-time trials with generally successful clue recognition. P1 questioned people/table proportions; P5 found the 390 CSS-pixel presentation small and demanding. P5's 390px session was a retest. The 320/390 presentations were desktop simulations, not physical devices. Testing is closed. No trials were conducted here; no reopening is proposed without separate authorization. Repository sheets remain blank, so the owner summary is the evidence source rather than independently audited raw trial records.

Deliverables:

- AUDIT_REPORT.md — geometry, pixel sizes, contrast, proportions, risks and evidence limits.
- COMPARISON_MATRIX.md — three approaches and combination tradeoffs.
- PROTOTYPE_INSTRUCTIONS.md — research viewer and static preview use.
- REVISION_PLAN.md — smallest changes, ownership decisions and acceptance criteria.
- measurements.json — reproducible quantitative detail, including canonical-versus-B differences.
- prototype.html / prototype.css / prototype.js — local comparison viewer, not gameplay implementation.
- previews/ — exact-source fit/camera/zoom diagnostic renders and comparison.png.
- images/ — exact current approved-for-testing composite copies.
- image-manifest.json — source paths and hashes.
- study.py / test-prototype.cjs / protected-before.json / verification.json — generation and integrity checks.

Open prototype.html directly from disk; no development server or installation. This viewer deliberately exposes research snapshot controls and must not be used as a controlled memory trial. Static previews can be enlarged by an image viewer; their file dimensions alone do not certify CSS display width.

From repository root:

```powershell
python artifacts/asset-validation/case-001/mobile-usability-study/study.py
node artifacts/asset-validation/case-001/mobile-usability-study/test-prototype.cjs
```

Existing Python/Pillow and Node are used. No new artwork, production code, canonical data, frozen story, source assets or governance files changed. B remains offline geometry, not adopted geometry. No T17/T18 implementation, commit or push. Prototype browser/device behavior is untested; quantitative checks and static inspection are the executed evidence.
