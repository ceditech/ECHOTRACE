# Observation package QA

2026-10-10. Recommendation: **CONDITIONAL** — package verification passes; facilitator browser preflight is required before scored sessions.

## Scope and sources

Inspected AGENTS.md, ROADMAP.md, TRACKER.md, relevant GAME_SPEC.md and TESTING_STRATEGY.md requirements, frozen Case 001 dossier and canonical JSON, B refinement/final artwork QA, current character-placement report, placement transforms, alpha/occlusion checks and verification data. Current explicit owner authorization approves the Mara/Owen design and separate-layer direction for testing only, superseding the previous report's pending testing-design approval. Canonical adoption and implementation remain unauthorized.

Only observation-human-test/ is created. Exact copies of current original-with-characters.png and changed-with-characters.png are used; superseded art and diagnostic annotations are excluded. Source paths and SHA-256 values are recorded in image-manifest.json. No new artwork or asset retouch occurred.

## Package and operation

Inventory and execution command are in README.md. The participant popup contains only the full scene or a neutral blank. The facilitator console has Start, Reset and End recall, width selection and phase/device metrics; it contains no scene previews. Instructions, expected answers and scoring remain in separate facilitator documents. No participant countdown, difference labels, highlights, arrows, zoom or transitions are supplied. No participant controls allow returning to the original. A facilitator reset is possible and must be treated as familiarized evidence.

Both images decode before ready. Start is restricted to ready state and an adequate viewport. The timed sequence is 25,000ms original → 2,000ms blank → changed for at most 60,000ms → blank ended state. End recall can stop earlier. Original src is removed from the participant image element outside observation; the original remains preloaded in memory and on disk, which is not a security barrier. Hiding/resizing the active participant screen invalidates it. Browser scheduling can delay rendering; measure/document irregularities during browser preflight and actual sessions.

## Executed verification

The package verifier and Node sequence tests passed. It checks exact source/copy hashes, equal 960×540 dimensions, local HTML/image references, timing constants, no external/runtime dependencies, full-composition CSS, required inventory and a header-only blank CSV. It independently compares the copied pair's difference mask with current approved proof evidence and checks unchanged pixels beneath the static character layer plus raw character hashes.

The source proof records exactly the authored passport removal, stand exchange and wallet movement; its difference mask is identical to the preceding refinement and adds zero endpoint differences. Two stand numeral changes constitute one exchange. Verification preserves that evidence rather than claiming pixels alone infer narrative meaning or human recognition.

All **232** protected files retain their captured hashes, including production/canonical/frozen/governance files and earlier QA folders. The verifier also checks for added/removed nonignored files outside this package. Hash coverage uses rg's repository file inventory, excluding Git internals, ignored dependencies/build outputs and this package. git diff --check passed; Git status shows only this new package. No commit or push.

Node virtual-clock tests exercise real sequence logic at the 24,999/25,000ms, blank and recall boundaries, duplicate Start prevention, no Start from ended state, reset cancellation, manual end and invalidation. These are deterministic logic tests, **not automated browser tests**. Playwright is unavailable in the existing Node/Python environment; no dependency was installed. Browser DOM rendering, file-popup messaging, CSS widths, image decode and wall-clock timing remain unverified until the documented facilitator smoke session.

## Data and limitations

OBSERVATIONS.csv is header-only: no participant findings. P1 desktop, P2 320px and P3 390px initial assignments are documented, with randomized session order where practical. Only the first trial per participant is fresh evidence. Additional sizes and prompted answers are separately labeled. Scoring distinguishes each event from object/feature recognition and retains verbatim responses, latency, uncertainty, false positives and character-association/distraction observations. RESULTS_TEMPLATE.md remains blank.

Desktop/390/320 are requested CSS scene widths from the same native source, not labels attached to enlarged mobile PNGs. Record actual viewport, displayed scene bounds, zoom/OS scaling/DPR, device and cropping. No Phaser surface or taps are provided. Browser back/reload, developer tools, external image viewers and OS access cannot be completely prevented. Facilitation must flag compromised trials. Browser file-origin/popup restrictions vary; do not proceed if preload or control messages fail.

Human tests: **NOT PERFORMED**.
Automated browser tests: **NOT PERFORMED**.
Real-device tests: **NOT PERFORMED**.
Runtime touch tests: **NOT PERFORMED**.

No React/Phaser or other application files changed; application build/lint/domain tests were not run for this standalone package. The isolated deterministic checks are the applicable executed checks. This is not T17/T18 implementation, a new gameplay mechanic, production adoption or geometry approval. Complete facilitator browser preflight, then recruit the three first-time viewers; owner reviews actual findings before any further adoption authorization.

T17 OBSERVATION TEST PACKAGE COMPLETE — HUMAN TESTING PENDING — PRODUCTION ADOPTION NOT AUTHORIZED — T17 IMPLEMENTATION NOT AUTHORIZED
