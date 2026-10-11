# MPS-001 specification package

2026-10-10 · feature/echotrace · documentation only · **OWNER REVIEW PENDING**.

MPS-001 recommends complete 960×540 scene fit at effective 320/390/larger CSS widths in either orientation, neutral letterboxing, safe-area-aware surrounding UI, and optional 1×–2× investigation zoom. It retains canonical targets and approved 25-second original / 2-second blank separation, forbids automatic observation-time extension and adds no fourth event. Normative wording describes the proposed contract if accepted; it does not declare implemented features. Production asset/geometry adoption and T17/T18 remain unauthorized.

## Files created

1. MPS_001.md — mobile presentation, phases, layout, accessibility, performance and failures.
2. INTERACTION_CONTRACT.md — transformations, DPR, canonical targets, gestures and evidence integrity.
3. OBSERVATION_FAIRNESS.md — deadlines, interruption/replay/orientation/zoom rules.
4. CHARACTER_STAGING_REVIEW.md — proportions, seating/depth/table associations and correction boundaries.
5. MOBILE_QA_MATRIX.md — planned simulated and actual Android/iOS/PWA checks, all unperformed.
6. OWNER_DECISIONS.md — O01–O12 options, defaults, dependencies and consequences.
7. IMPLEMENTATION_SEQUENCE.md — independently authorized future work/gates and rollback.
8. README.md — package overview and evidence limitations.
9. PROTECTED_INPUTS.json — existing-file SHA-256 baseline for this documentation task.
10. VERIFICATION.json — final document inventory, hashes, consistency and unchanged-source results.

## Evidence and limits

Sources: frozen docs/cases/CASE_001_THE_MISSING_PASSPORT.md; canonical src/cases/content/case-001/case.json; current character-placement report/placement/occlusion/verification; all five requested mobile-usability-study Markdown reports; its measurements/verification; ARCHITECTURE.md and current Phaser shell/host, renderer bridge, scene/session types/state machine and domain selection logic. Relevant AGENTS, GAME_SPEC, testing and implementation-status requirements remain applicable. Technical platform references are linked adjacent to recommendations in the specification; they are guidance, not evidence of our device behavior.

Owner reports five first-time human trials with generally successful clues, P1 proportion concern and P5 small/attention-demanding 390px retest. P5's 390px retest is not new first-time evidence. Desktop simulations are not physical mobile-device trials. Raw repository CSV/templates remain blank, so individual scores/verbatim responses are unavailable; no statistics or raw quotes are invented. Testing is closed. Prior reports that still say human tests/character testing approval were pending are historical and remain untouched; the latest owner-reported trial completion and testing-only design approval take precedence for this package.

Offline B measurements: at 320, passport envelope 22.4×18.9px, numeral union ~9.55px high, star diagnostic ROI ~9.72×9.56px. B targets 51.2×44.1px with 1.35px row gap differ from **canonical** 57.6×54px with 18px gap. Character/table screen-space ratios warrant review but do not supply physical dimensions or an established rescale. Taller center crop loses characters/landmarks; optional zoom enlarges pixels without fixing proportions or proving recognition. The recommendation is full overview and independent geometry/art review, not silent B adoption.

Current code implements an asset-free single-target renderer shell, not authored multiobject scenes, zoom arbitration or a Case 001 timer. Renderer projection/intent validation will need a separately approved extension; domain selection and session ownership remain preserved. Existing milestone state cannot be represented as completed deadline recovery. Device timing, BFCache masking, touch selection, browser/PWA layout, accessibility and performance remain unverified.

## Decisions and status

Owner must select investigation zoom/range (O01), observation app zoom policy (O02), target/gesture strategy (O03), staging (O04), canonical geometry (O05), retouch (O06), asset adoption (O07), physical QA/supported scope (O08), interruptions/recovery (O09), camera/access controls (O10), performance budgets (O11) and independent implementation/version-control permissions (O12).

No blocking source narrative conflict was found. Default cropped observation would conflict with the full-scene rule and is rejected as a recommendation rather than silently adopted. Testing geometry and canonical targets are demonstrably different; this package keeps both distinct. Pixel contrast proxies/native-unit guidance are not accessibility conformance results. Browser controls/OS snapshots cannot be completely prevented.

Verification checks existing-file byte hashes, document inventory/cross-references, required subject coverage, consistent owner IDs/timing/change identities and canonical three-change definitions. It also reads prior shared-character/difference-mask evidence without regenerating or editing outputs. See VERIFICATION.json for precise scope/results; no application tests were executed because this task creates documentation only. No new human, real-device, simulated-browser or runtime touch test was performed.

All new files are within mobile-presentation-spec/. No existing file, production code, artwork, canonical geometry/data, frozen dossier, roadmap/tracker, previous study/QA output or T17/T18 implementation changed. No executable prototype or replacement artwork was created. No commit or push. **STOP: await owner review and explicit next-step authorization.**
