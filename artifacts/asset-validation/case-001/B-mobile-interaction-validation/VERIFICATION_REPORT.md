# MIV-001 verification and integrity record

2026-11-09 · feature/echotrace · initial working tree clean.

**PASS — READY FOR ACTUAL-DEVICE DIAGNOSTIC QA.** This is a research interaction result, not production artwork/character acceptance, accessibility compliance, canonical adoption or T17 authorization.

## Executed checks

1. Before output generation, verified nine refined-study inputs against recorded inventory hashes:9 EXACT raw matches. Verified the study's source-art hashes and expected four rectangles; no historical geometry substitution. Captured404 existing-file hashes before creating this package. source-audit.json is the exact source record.
2. `python artifacts/asset-validation/case-001/B-mobile-interaction-validation/prepare.py` — PASS: byte-exact candidate/native PNG copies, single-source projection and candidate-specific size measurements. No source rendering/generation script in an old folder was run or rewritten.
3. `node --test artifacts/asset-validation/case-001/B-mobile-interaction-validation/test-core.cjs artifacts/asset-validation/case-001/B-mobile-interaction-validation/test-candidate.cjs` —21/21 PASS. Source truth/three events, exact target geometry, nonoverlap, transforms, half-open membership, zoom/pan/resize and pointer/cancellation invariants.
4. `node artifacts/asset-validation/case-001/B-mobile-interaction-validation/test-browser.cjs` — complete77/77 PASS in installed Windows headless Chrome/157.0.8103.38. All45 required width×DPR×zoom combinations plus32 additional browser checks. Full versions, dimensions, runtime/console error capture and screenshots preserved. Focused runs and failed capture/harness investigations are separate records, not substitutes for this complete run.
5. `python artifacts/asset-validation/case-001/B-mobile-interaction-validation/verify.py` — PASS:404 protected raw hashes/outside inventory unchanged; exact candidate/copies/projection; native pair independently reconstructs pixel-for-pixel from the candidate and original verified raster assets; stable environment layers/characters; only three-event layer differences; exact remembered-passport and Changed target coverage; JS syntax/local dependencies/Python AST; reruns21 unit groups and requires complete passing browser matrix.

verification.json / unit-results.json / unit-test-results.txt / browser-results.json / asset-manifest.json record precise outcomes. FILE_INVENTORY.json lists final files/bytes/hashes; its self hash is omitted. Image processing only resizes candidate copies for static320/390 diagnostic files; native originals remain exact study copies. PNG display in chat does not certify CSS size.

`npm run test:artifacts` — PASS after the new package was present:63 artifact JSON records parsed,57 existing evidence hashes verified, previous observation/zoom suites and7 previous core groups passed. This was a read-only compatibility/regression check; it neither overwrote old results nor silently added MIV to production CI. `git diff --check` — PASS. Status shows only the new B-mobile-interaction-validation/ folder.

## Explicit failures and corrections

Browser capture cancellation initially failed, then focused telemetry revealed a held-button mismatch in the CDP moved-mouse helper and an overly broad capture-ownership check. New code now tracks established capture, rejects cancelled pending capture and allows normal valid release; CDP movement uses consistent left-button/buttons state. No target or8px threshold was changed and no assertion was relaxed. Full failed/focused JSON records are retained; see BROWSER_VERIFICATION_REPORT.md.

The first pixel verifier required a visual for every Changed target and therefore failed on the deliberately removed passport. It was corrected to **assert Changed passport absence**, retain the remembered target and check Original passport pixel coverage. This is the approved missing-object mechanic, not a visual defect or an enlarged region. No candidate source/region was changed to make it pass.

Narrow effective widths remain intentional failed comfort criteria:288px target height43.74<48;256 height38.88<48 and gap7.2<8. A passing hit test is not a waiver. All actual candidate regions are nonoverlapping; no genuine ambiguous-source condition or fourth visual change occurred. No protected source needed modification, so no stop condition was bypassed.

## Integrity scope and unperformed work

Protected baseline covers404 existing nonignored repository files, excluding Git internals/dependencies/build output and this new directory. Every captured raw hash remains identical; no text-EOL substitution or baseline refresh was used to hide edits. Canonical JSON, frozen dossier, production assets, MPS/previous prototypes/study, application/tests, roadmap/tracker/governance all remain unchanged. The new candidate carries exactly the existing three IDs/events and all nonvisual scoring/evidence/deduction data unchanged.

No actual Android/iOS device, physical finger/pen/mouse, screen reader, installed PWA, new human observation/recognition, device performance or production application test was performed. Desktop CDP touch/media/DPR simulation is clearly labeled. No game timer/2s transition, replay, hints, scoring/evidence, production bridge or source asset adoption exists. Original-scene readability and staging remain provisional. Installed PWA requires future infrastructure/authorization; standalone HTML does not qualify.

NO canonical modifications. NO production artwork adoption. NO application implementation. NO T17/T18. NO commit. NO push. Stop for owner review.
