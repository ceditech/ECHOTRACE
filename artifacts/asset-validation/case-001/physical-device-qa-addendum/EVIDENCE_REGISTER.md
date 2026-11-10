# PDQA-001 evidence register

2026-11-10. A automated reproducible evidence; B repository report; C owner-supplied video-review observation; D direct owner confirmation; E calculation; U untested/unavailable/inconclusive. A01–A03 are archived outputs inspected, NOT runtime tests rerun in PDQA. A04 is current documentation integrity.

No E01–E03 recording was locally supplied or independently viewed. No video hashes, precise frame timestamps, device logs or touch coordinates are invented. The request-text hash is not a recording hash.

| ID | Claim | Category | Source | Platform/conditions | Actual result | Confidence/limits | Independent reproducibility | Gate |
|---|---|---|---|---|---|---|---|---|
| E01 | Desktop recording summary | C | Owner E01, OWNER_AUTHORIZATION_RECORD.md | Windows Chrome;320/430 settings; reported review | Loaded pair; responsive;1.5× zoom; pan controls | Reported only; small details/staging concern; routing not established | No independent reproduction here | G3/G6/G7 |
| E02 | Initial physical Android summary | C | Owner E02, OWNER_AUTHORIZATION_RECORD.md | SM-S928U Chrome Android; LAN;320/390/430 settings | Pair/zoom/pan/overlays/inset-height exploration; effective390; requested430 ≈411.43 once | Exact build/configuration/cause unknown; no local recording | No independent reproduction here | G2/G4/G6 |
| E03 | Focused Android selection summary | C | Owner E03, OWNER_AUTHORIZATION_RECORD.md | Same phone;reported390;≈3m26s duration not measured here | Four IDs: object-stand-21, object-stand-12, object-star-wallet, object-passport;2× zoom;pan available | Provisionally supported only; not every tap/boundary/gesture/pan limit/accessibility/performance | No independent reproduction here | G2/G4/G5 |
| E04 | Show taps worked | D | Owner quote in OWNER_AUTHORIZATION_RECORD.md | Same Android phone;saved recording | USER-CONFIRMED | Owner attribution; earlier indicator visibility issue was inspection limit; no frame-by-frame claim | Owner confirmation only | G4 |
| A01 | Archived isolated tests | A | S25/S18/S24 | Node isolated prototype; archived output inspected | 21/21 PASS | High for archived result; NOT rerun in PDQA; not physical input | Existing scripts reproducible with separate output authorization | G1/G2/G3 |
| A02 | Archived complete browser run | A | S26/S19/S24 | Windows headless Chrome/157.0.8103.38; simulated DPR/input/media | 77/77 PASS; complete45-case width×DPR×zoom matrix plus32 checks; no errors recorded | High for archived desktop result; NOT rerun; not hardware/iOS | Existing scripts available; not rerun here | G2/G3 |
| A03 | Archived source/pair integrity | A | S24/S27/S29 | Offline refined B reconstruction/projection/pixel records | Three meaningful changes; stable people/background; same closed wallet; historical404 protected unchanged | Candidate-only; current hash check does not rerun pixel reconstruction | Existing scripts/records; current hashes A04 | G1/G2 |
| B01 | Planning/canonical authorization boundary | B | S04–S09/S17 | Read current specs, frozen case, canonical JSON and later authorization | O01–O12 planning baseline; refined B isolated validation only; no adoption/T17/T18 | High source attribution; old recommendation defaults not production permission | Repository review reproducible | G1/G7/G10 |
| B02 | Character staging provisional | B | S13/S11/S31 | Archived2D composition analysis at960 | Visible Mara89×141; Owen88×182;table384×270; plant-table association unresolved | 2D not calibrated3D; no justified arbitrary rescale; subjective acceptance open | Source review reproducible; creative judgment owner | G7 |
| E05 | Visual sizes versus hit areas | E | S20/S28/S15 | 1× fit;alpha≥128 solid bounds; feature diagnostic ROIs | 320 passport23.67×20,numerals13.75×9.55,wallet33.67×22.67;390 passport28.84×24.38,numerals16.76×11.64,wallet41.03×27.63 CSS px | Size is not recognition/font-size/contrast guarantee; ROIs include neighboring material; Original no app zoom | Derived scaling reproducible | G6 |
| E06 | Target/gap and comfort calculations | E | S15/S20/S28/A02 | target .18W × .27×9W/16;gap .05×9W/16 | 320:57.6×48.6/gap9;390:70.2×59.23125/gap10.96875;288:51.84×43.74/gap8.1;256:46.08×38.88/gap7.2 | 48px height/8px gap proposed project comfort goals, not universal accessibility certification; use effective width | Analytical calculation reproducible; desktop fit archived | G2/G6 |
| B03 | Art provenance not production clearance | B | S30/S31/S22/S17 | Testing source/reference documentation | Generation/testing provenance recorded; production rights/acceptance not established | No unlawful-use finding; hashes prove identity, not rights | Source review reproducible; clearance requires owner | G7/G8 |
| U01 | Physical gestures/cancellation incomplete | U | E03 limitations/S21/S22 | Physical Android | Gap/boundary/drag/multi/capture/stale-input/all-pan-limit inconclusive; desktop A01/A02 PASS | No confirmed current runtime defect established | Needs separately authorized focused device evidence | G5 |
| U02 | Physical accessibility/orientation/performance | U | E02/E03 limitations/S21/S22 | Android hardware | No complete physical rotation/text-scale/TalkBack/native-pinch/performance evidence | Desktop keyboard/landscape/reduced-motion not OS accessibility proof | Needs separate authorization | G4/G5/G6 |
| U03 | iOS and installed PWA | U | S21/S22;owner E02 | iOS Safari/installed PWA | NOT TESTED; standalone lacks installable surface | Explicit owner deferral possible; no implied coverage | Requires authorized platform/surface | G9/G10 |
| U04 | Gameplay timing/recovery absent | U | S05/S09/S17/S21/S22 | Future gameplay; canonical25s observation/2s transition | NOT TESTED; diagnostic lacks timers/state/replay/recovery policy | Absent by scope, not diagnostic defect; no deadline/resume acceptance | Needs approved policy and later implementation | G10 |
| A04 | Current documentation integrity | A | protected-before.json/source-manifest.json/verification.json/VERIFICATION_REPORT.md | Current read-only file/Git/reference/numeric checks | Final executed results in verification.json | No runtime/browser/device/human test performed; scope bounded to captured inventory | Hash/reference checks reproducible as described | G1/G2/G10 |

Exact repository-relative source paths (raw hashes in [source-manifest.json](source-manifest.json)):

| ID | Path | Link |
|---|---|---|
| S01 | `AGENTS.md` | [open](../../../../AGENTS.md) |
| S02 | `GAME_SPEC.md` | [open](../../../../GAME_SPEC.md) |
| S03 | `ARCHITECTURE.md` | [open](../../../../ARCHITECTURE.md) |
| S04 | `docs/cases/CASE_001_THE_MISSING_PASSPORT.md` | [open](../../../../docs/cases/CASE_001_THE_MISSING_PASSPORT.md) |
| S05 | `src/cases/content/case-001/case.json` | [open](../../../../src/cases/content/case-001/case.json) |
| S06 | `artifacts/asset-validation/case-001/mobile-presentation-spec/MPS_001.md` | [open](../mobile-presentation-spec/MPS_001.md) |
| S07 | `artifacts/asset-validation/case-001/mobile-presentation-spec/OWNER_DECISIONS.md` | [open](../mobile-presentation-spec/OWNER_DECISIONS.md) |
| S08 | `artifacts/asset-validation/case-001/mobile-presentation-spec/INTERACTION_CONTRACT.md` | [open](../mobile-presentation-spec/INTERACTION_CONTRACT.md) |
| S09 | `artifacts/asset-validation/case-001/mobile-presentation-spec/OBSERVATION_FAIRNESS.md` | [open](../mobile-presentation-spec/OBSERVATION_FAIRNESS.md) |
| S10 | `artifacts/asset-validation/case-001/composition-correction-study/README.md` | [open](../composition-correction-study/README.md) |
| S11 | `artifacts/asset-validation/case-001/composition-correction-study/APPROACH_B_REPORT.md` | [open](../composition-correction-study/APPROACH_B_REPORT.md) |
| S12 | `artifacts/asset-validation/case-001/composition-correction-study/B-geometry-diff.json` | [open](../composition-correction-study/B-geometry-diff.json) |
| S13 | `artifacts/asset-validation/case-001/composition-correction-study/CHARACTER_STAGING_REPORT.md` | [open](../composition-correction-study/CHARACTER_STAGING_REPORT.md) |
| S14 | `artifacts/asset-validation/case-001/composition-correction-study/VERIFICATION_REPORT.md` | [open](../composition-correction-study/VERIFICATION_REPORT.md) |
| S15 | `artifacts/asset-validation/case-001/composition-correction-study/B-proposed-case.json` | [open](../composition-correction-study/B-proposed-case.json) |
| S16 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/README.md` | [open](../B-mobile-interaction-validation/README.md) |
| S17 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/OWNER_AUTHORIZATION_RECORD.md` | [open](../B-mobile-interaction-validation/OWNER_AUTHORIZATION_RECORD.md) |
| S18 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/INTERACTION_TEST_REPORT.md` | [open](../B-mobile-interaction-validation/INTERACTION_TEST_REPORT.md) |
| S19 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/BROWSER_VERIFICATION_REPORT.md` | [open](../B-mobile-interaction-validation/BROWSER_VERIFICATION_REPORT.md) |
| S20 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/MOBILE_READABILITY_REPORT.md` | [open](../B-mobile-interaction-validation/MOBILE_READABILITY_REPORT.md) |
| S21 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/DEVICE_QA_PROCEDURE.md` | [open](../B-mobile-interaction-validation/DEVICE_QA_PROCEDURE.md) |
| S22 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/OPEN_ISSUES.md` | [open](../B-mobile-interaction-validation/OPEN_ISSUES.md) |
| S23 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/VERIFICATION_REPORT.md` | [open](../B-mobile-interaction-validation/VERIFICATION_REPORT.md) |
| S24 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/verification.json` | [open](../B-mobile-interaction-validation/verification.json) |
| S25 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/unit-results.json` | [open](../B-mobile-interaction-validation/unit-results.json) |
| S26 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/browser-results.json` | [open](../B-mobile-interaction-validation/browser-results.json) |
| S27 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/source-audit.json` | [open](../B-mobile-interaction-validation/source-audit.json) |
| S28 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/measurements.json` | [open](../B-mobile-interaction-validation/measurements.json) |
| S29 | `artifacts/asset-validation/case-001/B-mobile-interaction-validation/FILE_INVENTORY.json` | [open](../B-mobile-interaction-validation/FILE_INVENTORY.json) |
| S30 | `artifacts/asset-validation/case-001/B-art-refinement/REPORT.md` | [open](../B-art-refinement/REPORT.md) |
| S31 | `artifacts/asset-validation/case-001/character-placement-proof/REPORT.md` | [open](../character-placement-proof/REPORT.md) |

Owner statements resolve to [OWNER_AUTHORIZATION_RECORD.md](OWNER_AUTHORIZATION_RECORD.md) and the attached request identified in source-manifest.json. No C/D claim is promoted to independently automated evidence.
