# Case 001 offline composition correction study

Started 2026-11-07; final verification 2026-11-08 · feature/echotrace · controlled pre-T17 investigation.

**APPROACH B RECOMMENDED for owner design review.** This is a newly bounded geometry/target proposal, not adoption of historical Proposal B. No production change or canonical approval follows.

Fixed-envelope A1 keeps more useful clue size but leaves unsupported stands and rim-crossing flat props. A2 moves only internal table pixels and shrinks the document/wallet treatments: it improves some contact but reduces the passport to ~14.33×12px at 320, retains support-proxy failures and alters foreground occlusion. Both A experiments are rejected. This is not an exhaustive proof that every conceivable canonical-preserving repaint would fail; such repainting was not undertaken.

The new B keeps existing table/chair/character treatment, restores native-like prop aspect ratios and supports the props on the visible table surface in the inspected composites. It increases the original B passport and wallet sizes, and replaces B's crowded hit rectangles. New targets are **57.6×48.6px with 9px minimum separation at 320**, **70.2×59.23px with 10.97px at 390**. All solid selectable object pixels are covered in the investigation scene, with the remembered passport location checked against Original. Historical B's ~1.35px/1.65px gaps are not carried forward.

At 320, B's visible solid passport is **23.67×20px**, wallet **33.67×22.67px**, and stand numeral union remains ~9.55px high. These measurements and model inspection are not human recognition success. Character proportions/table association, marble glare/viewpoint and mobile accessibility remain owner/validation risks.

## Read and inspect

- BASELINE_AUDIT.md — canonical envelopes/regions, alpha/padding, support method and evidence hierarchy.
- APPROACH_A_REPORT.md / APPROACH_B_REPORT.md — exact experiment policies, rejected failures and proposal diffs.
- CHARACTER_STAGING_REPORT.md — stable identities, screen-space scale, seating and associations.
- MOBILE_READABILITY_COMPARISON.md — visual sizes versus targets, contrast/feature risks and effective-width limits.
- DECISION_MATRIX.md — mandatory integrity gate, weighted rubric and uncertainty.
- RECOMMENDED_CORRECTION_PLAN.md / OWNER_DECISIONS.md — next bounded decisions, no implementation permission.
- VERIFICATION_REPORT.md — executed commands, passing checks, failures and unperformed validation.

Primary unannotated evidence: A1/comparison-960.png, A2/comparison-960.png and B/comparison-960.png, plus corresponding 390/320 pairs. baseline/ reproduces the preceding canonical verification render byte-for-byte. comparison-all.png is a captioned diagnostic sheet. Cyan tabletop outlines/magenta contact points occur only in *support-diagnostic.png, never in actual previews.

![Baseline, A1, A2 and new B](C:/Users/CedricYovodevi/sources/repo/Games/ECHOTRACE/artifacts/asset-validation/case-001/composition-correction-study/comparison-all.png)

![New B original and changed at 320](C:/Users/CedricYovodevi/sources/repo/Games/ECHOTRACE/artifacts/asset-validation/case-001/composition-correction-study/B/comparison-320.png)

PNG widths are exact rasters for uniform-fit scenarios. Their display in chat/image viewers may be enlarged. No browser CSS width, physical device or human trial was tested in this study.

## Reproduction and status

```powershell
python artifacts/asset-validation/case-001/composition-correction-study/study.py
python artifacts/asset-validation/case-001/composition-correction-study/verify.py
```

Uses existing Python/Pillow only, writes exclusively here. Do not rerun earlier generation scripts or replace protected-before.json. New scripts first check all 329 existing-file hashes and outside-file inventory. Forty-nine preview/diagnostic PNG hashes are recorded. Candidate JSONs are isolated and explicitly marked NOT ADOPTED; they are not application case sources.

This package's generated JSON format is Python stdlib indent2 with UTF-8 text and a final newline; PNGs use deterministic Pillow serialization without timestamps. Hashes are recorded after that serialization. Both Python sources pass AST syntax checks; no source formatter or linter is claimed. Do not reformat already hashed historical files to match another package's convention.

Source/provenance and exact parameters are in source-manifest.json, study-config.json, A-fixed-envelopes.json, B-proposed-case.json and B-geometry-diff.json. Numerical results are in baseline-measurements.json, measurements.json, target-measurements.json, contrast-proxies.json and character-landmark-analysis.json. generated-hashes.json / protected-before.json / verification.json record integrity. FILE_INVENTORY.json lists the final exact files and sizes.

No sources were generated, repainted, tonally retouched or given invented shadows. Both character poses/scale/wardrobe and shared source layer are unchanged. No production artwork, existing artifact, canonical JSON, frozen dossier, app code, governance/tracker, T17/T18, commit or push changed. Human testing is closed; no new human/device test occurred. Stop for owner review.
