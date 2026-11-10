# Verification, failures and scope record

Started 2026-11-07, final verification 2026-11-08 · feature/echotrace confirmed before work; working tree initially clean. All new deliverables are inside composition-correction-study/.

## Executed commands and actual results

`python artifacts/asset-validation/case-001/composition-correction-study/study.py` — PASS. Reads exact canonical and accepted-for-testing source raster layers; verifies required source hashes first. Reproduces previous canonical baseline pair byte-for-byte; emits baseline, A1, A2 and B original/changed previews at960/390/320 plus comparisons/diagnostics. No image generation service, new dependencies, retouch or invented shadow is used. Existing scripts are not invoked to overwrite earlier outputs.

`python artifacts/asset-validation/case-001/composition-correction-study/verify.py` — PASS. Checks all329 protected hashes and outside-file inventory;49 generated PNG hashes; A exact canonical scenes; B candidate labels/bounds/identity/movement metadata; exactly three required meaningful change kinds/IDs; no added props; shared closed wallet asset/size/rotation; static visual definitions; pixel difference masks and character stability; proposed target bounds/overlap/membership/gaps; object-to-target coverage and contact evidence. Actual proxy values/failures are retained in measurements.json.

A repeat generation was compared against all49 prior PNG hashes: PASS, identical bytes. Both Python files pass AST syntax validation. `npm run test:artifacts` — PASS:48 artifact JSON files parsed at that execution,57 existing evidence hashes verified, existing observation/zoom tests and all7 core test groups passed. This checks compatibility with current CI's dedicated artifact step; it does not automatically register the new Python verifier in CI or constitute application/device tests. `git diff --check` — PASS; Git status shows only the new composition-correction-study folder. No existing config/test/CI file was edited.

Every candidate's before/after differences are confined to passport/stand/wallet source-layer pixels. Tables/mat/backpack layers are byte-identical within each pair; shared background/character layer are unchanged. This does not claim an empty mat has identical visible pixels before passport removal: its occlusion changes as intended. Four changed visual identities represent three events because the two stand numerals exchange as one canonical change.

## Preserved failures and corrective iterations

- Baseline fails all tabletop support proxies and visibly floats/crosses rims; source inconsistency was not “fixed” by substituting historical B.
- A1: flat proxies73.18/94.53/96.83%, stand base0%. A2: mat95.79%, stand91.73%, passport/wallet100%; small passport/wallet and altered foreground occlusion reject A2. These failed artistic/screening criteria remain failed even though the verifier passes evidence integrity.
- First proposed target layout used upper y.16/lower y.475 with height.27, giving8.1px separation at320 but leaving7 solid wallet pixels above the target. The lower origin was moved to.47 and upper to.155 for complete coverage/gap8.1. Final upper y.15 increases the gap to9px while retaining full solid stand coverage. These were isolated proposal changes, not edits to canonical/historical B. No image geometry was moved to conceal target failure. Final diffs/metrics are authoritative for this study.
- An initial verifier incorrectly applied changed-scene stand/wallet targets to Original and reported B correspondence failure. Original has no selectable regions; its stand IDs occupy exchanged locations and its wallet is at the source. The check was corrected to assess investigation targets in Changed and only the remembered passport position in Original. No target was enlarged or criterion weakened to accommodate an actual investigation miss. Final targets include all relevant solid pixels.

## Support and coverage interpretation

Passing B shows all selected flat footprints/base ROIs inside the conservative manually traced marble plane and actual informed inspection without the baseline floating/rim defects. It is not a mathematical proof of3D contact, artistic scale or plausible shadows. Thresholds98%/95% are study screening goals; close A2 edge failures are not a physical impossibility proof. Both B endpoints were checked. Target percentages use solid α≥128 masks; they do not claim every faint shadow/fringe is clickable.

Main reviewed window/plant ROIs remain unchanged in B versus baseline. Character source/pose/wardrobe/scale/transforms are identical; per-pair effective character visibility digests match. No new character ID, sprite implementation, temporal gesture or fourth event exists.

## Unperformed checks and remaining limits

No new human study, actual physical-device QA, browser CSS rendering/tap routing, mobile accessibility/contrast audit or calibrated screen assessment was performed. Prior Chrome technical results belong to the earlier prototype and are not rerun or relabeled as testing this new geometry. Source-size PNGs are analytical uniform-fit scenarios; image-viewer display may resize them.

Original application case schema/semantic/integrity pipeline was **not executed against an adopted case**. The candidate wrapper is not registered/loadable production content. Offline checks cover bounds/IDs/references preserved by deep-copy, exact known change structure and target ambiguity; future adoption still requires original validation and full case/evidence regression. No application build/lint/type/E2E is claimed by these Python checks.

protected-before.json covers all329 existing nonignored repository files at task start, excluding Git/dependency/build internals and this new folder. All hashes remain exact raw bytes, including canonical JSON, frozen dossier, production assets, source code, previous QA folders and governance/tooling. No text normalization or hash regeneration was used to mask modifications. Source/provenance and generated image hashes are separately recorded.

No production changes. No canonical adoption. No T17/T18 implementation. No commit. No push. Owner review is required before any further action.
