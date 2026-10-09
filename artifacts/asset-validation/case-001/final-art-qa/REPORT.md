# T17 Proposal B — Final artwork QA gate

Date: 2026-10-09. Mode: read-only source inspection with isolated diagnostic outputs.

**Final recommendation: CONDITIONAL PASS for the existing offline artwork. Production adoption remains on hold and T17 implementation is not authorized.** No confirmed BLOCKING raster defect was found. Minor alpha, edge, glare and viewpoint issues do not justify regeneration. Human recognition, responsive touch behavior and character treatment remain adoption prerequisites, not completed tests.

## Scope and evidence

Inspected root AGENTS.md; relevant ROADMAP.md, TRACKER.md, GAME_SPEC.md and ARCHITECTURE.md sections; frozen `docs/cases/CASE_001_THE_MISSING_PASSPORT.md`; canonical case.json; B-art-refinement REPORT.md, verification.json and refine.py; all six refined candidate PNGs at native resolution; original/changed 960×540 desktop previews; all four original/changed 320/390 previews; Proposal B geometry-diff.json and proposed-scenes.json; Mara/Owen concept sheet, Mara v2 reference and placement-zone mockup.

The owner has accepted B's overall visual direction. This inspection does not reopen that decision. B geometry is an offline proposal and differs from production case.json; those differences were inspected, not adopted. Canonical narrative, three changes and stable identities govern the assessment.

Plan executed: inspect source artwork and scenes, measure alpha and existing geometry, review character continuity, propose minimal corrections, prepare human-test protocol, verify protected-source hashes and write this report. No source retouch, replacement generation, character insertion or application implementation occurred.

Evidence is **static model image inspection plus deterministic pixel/geometry analysis**. Images supplied at native resolution can still be scaled by the chat display; the separate edge crops preserve 1:1 source pixels. No physical display calibration, human recognition study, real-device trial, browser responsiveness, pointer/touch event routing or accessibility test was performed. Numerical CSS sizes assume a uniformly fitted 16:9 scene occupying the stated width; raster rounding and actual layout require later checks.

PASS = no material issue found in this inspection. MINOR = localized cosmetic defect or bounded recognition risk requiring review. BLOCKING = prevents final adoption pending correction, evidence or owner decision. PASS does not certify untested behavior.

## Asset-by-asset QA matrix

| Asset | Interior alpha | Edges / halos / clipping | Perspective and support | Clue/detail assessment | Overall |
|---|---|---|---|---|---|
| table-candidate.png, 1280×900 | MINOR: predominantly 252–253 rather than 255 | MINOR: thin hard bright rim; very tight side clearance; low-alpha exterior residue. No conspicuous opaque matte halo | MINOR: broad, steep tabletop view versus background furniture; low pedestal support is visible; strong marble/brass highlights compete with small props | MINOR: glare and busy veining increase visual competition, but do not wash out the current clues | MINOR |
| document-mat-candidate.png, 800×630 | MINOR: nearly opaque leather, not a large see-through hole | MINOR: crisp gold seam and bright upper-left lip; soft low-alpha bounds extend beyond solid body. No clear solid-body clipping | MINOR: flatter/shallow trapezoid than table; border/shadow suggests contact, without a floating gap | PASS for stable empty place; MINOR for navy passport against navy mat at mobile size | MINOR |
| passport-candidate.png, 640×540 | MINOR: near-opaque cover/pages | PASS: rounded closed-book boundary, padding retained; thin gold edge is consistent with cover, not a broad halo | MINOR: diagonal cover viewpoint is not fully harmonized with mat; page edge supports closed booklet reading; shadow is subtle | PASS at desktop; MINOR/high mobile recognition risk: booklet remains visible, title/fine emblem cannot be relied on; gold pages distinguish it from mat | MINOR |
| star-wallet-candidate.png, 800×540 | MINOR: near-opaque leather/strap | MINOR: sharp glossy seam; faint alpha tail reaches bottom canvas, while solid shape stops at y=533 of 540. No proven clipped solid wallet | MINOR: very prominent face and diagonal perspective; lower edge rests inside tabletop; subtle contact shading, no obvious unsupported gap | PASS at source/desktop: large star unobscured, broad navy/ivory strap, closed consistent silhouette. MINOR at mobile: star is small and stripes reduce to a tiny alternating band | MINOR |
| stand-12-candidate.png, 768×648 | MINOR: body near opaque; numeral overlay fully opaque | MINOR: very crisp numeral against textured face; faint exterior specks/tail, no visible clipped solid base | PASS: base overlaps rear tabletop surface and matches 21; contact shadow could be stronger but no floating gap | PASS: upright high-contrast 12; silhouette/body matches 21 outside numeral area | MINOR |
| stand-21-candidate.png, 768×648 | MINOR: same body alpha as 12 outside overlays | MINOR: same edge observations as 12 | PASS: identical base/perspective/support treatment | PASS: upright high-contrast 21; same silhouette/body | MINOR |

### Alpha and stand findings

High partial-alpha percentages in the prior report do **not** mean these objects are heavily translucent. Most interior alpha is 252–253/255 (approximately 98.8–99.2% opacity). The diagnostic interior is the alpha≥128 mask eroded seven source pixels, a heuristic rather than semantic object segmentation. Its minimum alpha is table 251, mat 250, passport 251, wallet 251 and both stands 252. No pixel inside those eroded interiors is below 240. This supports MINOR classification; it does not prove every pixel in a concavity is correct.

Native white/dark/warm background panels and edge crops show tight bright outlines and low-alpha exterior residue, without a conspicuous wide white/black halo. Alpha>0 bounds reaching a canvas edge are not proof that a solid object was cut off: wallet solid bounds are `(24,12,782,533)`, stands `(80,34,688,605)`, table `(1,87,1279,873)`. Table side padding is genuinely tight. Keep this distinction when deciding whether to retouch.

Independent stand comparison passes: thresholded solid silhouettes match; RGB body and alpha outside the union of numeral overlays match. **Full alpha-channel equality is false**, because 12/21 overlays make different interior pixels opaque. The prior report's statement about unchanged silhouette alpha must be read as exterior silhouette equality, not whole-channel equality. This is an evidence clarification, not a stand mismatch or new scene change. The overlay union is `(243,203,518,394)`.

## Blocking and minor issues

Confirmed artwork defects are MINOR: near-opaque interiors, faint exterior residue/tight bright rims, tabletop glare, mixed object viewpoints and weak contact shadows. None currently warrants regeneration or a geometry change.

The following are BLOCKING **for final production adoption**, without implying a discovered fatal artwork defect:

1. No first-time human evidence yet establishes fair passport/star/strap recognition after 25 seconds at mobile sizes.
2. Existing interaction geometry is not validated in an actual responsive UI. The near-zero row gap and incomplete stand-base correspondence require real touch testing.
3. Character placement/identity is unresolved. The dossier expects Mara in the same place in both snapshots; the offline environmental previews depict neither approved Mara nor Owen. An absence in a candidate preview cannot silently become an approved final treatment.
4. Final source/rights/provenance acceptance and explicit owner adoption/T17 authorization are outstanding.

## Controlled retouch proposals — not executed

| Affected asset / problem | Smallest correction if approved | Method and artifact risk |
|---|---|---|
| All six: body alpha 250–253 and faint exterior residue | Use a reviewed solid-body mask to make only opaque materials 255; clean disconnected exterior residue while retaining antialiasing and legitimate shadows | Deterministic retouch sufficient. Low/moderate risk: blanket thresholding would destroy soft shadows, harden edges or erase fine leather/brass outlines. Do not apply a global alpha clamp |
| Table: tight hard rim and strong glare | Locally reduce the brightest glare/rim values while preserving marble texture and original envelope; clean edge residue without moving/cropping the art | Deterministic masked tonal retouch sufficient. Moderate risk of dull metal, smeared veining or a dark contour. Side clearance alone does not justify padding/rescaling under fixed geometry |
| Mat/passport: navy-on-navy mobile association | If recognition tests fail, modestly lift the existing passport page/gold edge or locally lower mat highlight behind it; retain all shape, pose and placement | Deterministic tonal retouch plausible. Moderate risk of fake outline, inconsistent lighting or drawing excessive attention to the clue. Do not invent readable microtext as a solution |
| Wallet: very sharp glossy seams; small star/stripe cues | Retain the already clear star/stripe design. Only if testing exposes confusion, selectively reduce distracting glare near those features and clean lower exterior residue | Deterministic retouch plausible. Moderate risk of flattening star facets or merging stripes. No new emblem, strap, open-wallet state or resizing |
| Both stands: crisp overlay and subtle contact | If needed, harmonize numeral edge antialiasing lightly at the same dimensions/position; strengthen only an existing contact-shadow band. Treat master/shared body identically | Deterministic shared-master retouch sufficient. Moderate risk of blurred tiny numerals or unmatched stands. Recheck body equality outside numeral masks |
| Table/mat/passport/wallet: mixed viewpoint | No correction mandated by this gate. Keep accepted visual direction. If owner later rejects viewpoint, obtain a separate art-treatment decision | True viewpoint repair likely needs substantial repainting or regeneration. High risk of changed silhouettes, proportions, padding, clue visibility and new artifacts; not surgical polish and not authorized here |

No replacement assets were generated. Diagnostic background panels, crops and target overlays are evidence only and must not be used as production assets. Minor cosmetic opportunities are optional, not mandatory work items. Any approved retouch must retain B geometry and be reinspected at source, desktop and mobile sizes.

## Mobile gameplay recognition and touch risk

Both original and changed refined scenes were inspected at 320×180 and 390×219 raster dimensions. All three authored differences remain visually identifiable to this model: the passport disappears leaving the mat; left/right numerals reverse; the same wallet moves from left to right. This is static detectability by an informed reviewer, **not evidence that a first-time viewer remembers or recognizes them**.

| Feature | 320px full-scene width | 390px full-scene width | Risk |
|---|---|---|---|
| Passport | 22.4×18.9px envelope; approximately 20.7×17.5px solid bounds | 27.3×23.0px envelope; approximately 25.2×21.4px solid bounds | Highest recognition risk: small navy booklet on navy mat; removal easier to detect than identifying the object. Title reading not required or assured |
| Mat | 64×50.4px envelope; solid leather height approximately 26.2px | 78×61.4px envelope; solid height approximately 31.9px | Stable border and empty center remain discernible; padding makes nominal envelope overstate physical leather height |
| Wallet | 32×21.6px envelope; solid width approximately 30.3px | 39×26.3px envelope; solid width approximately 37.0px | Movement is strong; star/striped strap remain small. Broad light/dark bands survive; individual feature recognition needs testing |
| Stands | 38.4×32.4px envelopes; approximately 30.4×28.6px solid bodies | 46.8×39.5px envelopes; approximately 37.1×34.8px solid bodies | Numerals visibly distinguishable in static previews; approximately 9.6/11.6px high numeral union before raster rounding. Exchange must be understood as two numbered objects moving |

Desktop support relationships pass static inspection: mat and passport occupy the left table, wallet remains inside either tabletop at its endpoint, stands touch the rear table surfaces, and low pedestals meet the floor. Viewpoint/glare inconsistencies remain MINOR. Background, tables, mat and backpack are stable; only passport, wallet and the two exchange participants differ in the scene data. Two changed stand visuals represent one canonical exchange, so there are exactly three meaningful changes.

### Existing interaction rectangles

All four B investigation regions are in bounds and pairwise nonoverlapping; observation has no regions. Passport target remains after sprite removal. Either stand maps to the existing exchange; no IDs or mappings changed.

| Available scene width | Each target width × height |
|---|---|
| 320px | 51.2×44.1 CSS px |
| 390px | 62.4×53.75 CSS px |
| 288px (hypothetical 16px padding each side in 320 viewport) | 46.08×39.69 CSS px |
| 358px (same padding in 390 viewport) | 57.28×49.34 CSS px |

Approximately 319.3px available scene width is needed to reach a 44px target height. These are analytical scenarios; no particular production padding has been tested or changed.

Passport target covers the remembered booklet position and central mat, with surrounding surface included. Wallet region contains its changed visible envelope and extra table surface. Stand regions contain the numeral faces but end at normalized y=0.405; visual envelopes continue to y=0.425 and the solid base to approximately 0.4131. A tap low on a stand can therefore miss its target; at the right stand, the lowest base nearly touches/very slightly enters the wallet target beginning at y=0.4125.

Vertical separation between stand regions and lower-row regions is only 0.0075 normalized height: **1.35px at 320 and 1.65px at 390**. Left stand and passport regions also overlap horizontally, despite being separated vertically. Finger occlusion, imprecise taps or careless target expansion could cause wrong selections; rectangle nonoverlap alone does not prove usability. Regions are centered above the stand visual centers. Target overlays in this folder illustrate the mismatch and are not gameplay markers.

Likely responsive conflicts to test: horizontal padding reduces targets and clues; limited canvas height further reduces FIT width; timer/header overlays can cover upper targets; evidence panels or bottom controls can overlap the lower row; CSS canvas offsets/DPR/letterboxing can misroute taps; browser scroll gestures can interfere with taps. None was exercised. Prefer proving full scene visibility and available-width behavior before requesting a geometry exception. Any geometry change requires separate owner approval and is outside this gate.

## Character integration recommendation

**Recommend C: a separate owner-approved character treatment is required.** A is spatially plausible in broad terms but not established by the zone annotation. B may be proposed as a future scope decision, but deferral to cinematic/testimony alone would need an explicit owner reconciliation with the dossier's stable Mara presence. Do not silently adopt B.

Mara's marked zone `(12,375)–(105,515)` fits foreground seating outside clue rectangles, but a seated upper body, head/arms and occlusion by the chair have not been composed. Owen's zone `(810,265)–(856,375)` overlaps the right tabletop area; it is only 46px wide at desktop, approximately 15px at 320 width. A convincing seated body is not proven within it. Hands, clothing or chair occlusion could obscure the changed wallet or distract from it. Rectangles are not validated poses.

The concept sheet proposes realistic Mara/Owen portraits. Mara v2 proposes a noticeably more stylized face, loose shoulder-length hair, jewelry, watch and bag, versus the earlier tied-back portrait treatment. Shared teal clothing does not settle identity/continuity. Owen has portrait views, no approved seated full-body treatment. Reference-sheet text asserting consistency is not approval evidence.

The separate treatment should select Mara's reference/style, align Owen's style, approve seating poses, lighting, exact unchanged presence in both endpoints, and clarify whether any deferral is approved. Characters must not obscure passport/mat, star/strap, numerals or stable window/plant landmarks; no additional endpoint differences or new clues. Maintain canonical temporary absence between snapshots. No sprites, runtime IDs, new canonical changes, background edits or cinematic production were introduced. CIN-01 remains a separately gated planning track.

## Human observation-test protocol — three first-time viewers

Recruit P1–P3 who have not seen Case 001 images, solution or this QA report. Use the unchanged refined previews without target overlays, clue annotations or side-by-side comparison. Record screen/device/browser, CSS scene dimensions, DPR, viewing distance, vision aids and presentation scale. Show images at their actual intended size with no zoom; do not confuse 320 image pixels with 320 CSS pixels on a high-DPR device.

1. Give the approved neutral instruction: “Remember the documents, table numbers and where they belong.” Do not list the three changes, name the wallet details or show character concepts.
2. Once fully loaded, show the original scene for **25 seconds**, timed. Hide it completely; use a neutral 2-second blank consistent with current case settings.
3. Show the changed scene alone. Ask “What changed?” Allow up to 60 seconds of uncoached free recall. Record verbatim answers, time to first response, all changes mentioned, mistaken changes and uncertainty. Do not reveal the answer before scoring.
4. Code each of passport removal, stand exchange and wallet movement as independently identified / partial / not identified. “Something on the mat disappeared” is partial unless the viewer identifies the passport/booklet; “numbers changed” is partial unless the exchange/reversed table association is understood. Record both object description and location; do not require exact wording.
5. After locking free-recall results, ask neutral recognition questions about what the document, wallet mark/strap and stands looked like. Record confusion (passport vs book/card, star vs glare, strap vs decoration, 12 vs 21), without turning prompted answers into independent discoveries.
6. Include mobile trials: P1 first views desktop then 320px; P2 first views 320px then desktop/390px; P3 first views 390px then desktop/320px. Repeat the same 25-second/hide/changed sequence at each scale. **Only each viewer's first trial is first-time recognition evidence; later trials are familiarized legibility checks.** There is only one fresh viewer per primary size in this small protocol, so it cannot establish a recognition rate or robust device comparison.
7. After recognition trials, run a separate real-device target-selection session only when an owner-authorized interactive QA surface exists. Record intended object, actual tap coordinates, selected ObjectId, first-tap success, base taps, adjacent-target errors, scroll interference, UI occlusion and actual available canvas width. Static image pointing is not runtime touch QA.

Use OBSERVATIONS.csv as a blank recording sheet. It contains **no participant results**. Summarize observed counts and confusion verbatim after the sessions; do not turn this three-person smoke test into a statistically validated claim. Recommended review trigger, not a newly imposed product rule: any missed change or repeated object confusion should prompt focused review; further fresh mobile viewers are needed if the cause is uncertain. Owner acceptance of the evidence is required.

## Exact adoption prerequisites

1. Owner accepts this gate's minor issues as-is or separately authorizes specific retouches; no regeneration solely for optional cosmetic gains. Approved corrections retain B geometry and pass renewed native/desktop/320/390 inspection.
2. Record the three-viewer observation results, including fresh mobile trials and recognition difficulties. Resolve material clue-recognition failures and obtain owner acceptance; no fabricated results or presumed recognition.
3. Validate an owner-authorized responsive QA surface at actual 320/390 viewports and narrower padded scene widths, with touch/pointer routing, both stands, remembered passport location, wallet, UI occlusion and neutral keyboard access. Address the stand-base mismatch and row-gap risk through tested layout/treatment or a separately approved geometry revision. This gate grants neither implementation nor geometry revision authority.
4. Approve a character treatment consistent with the frozen dossier and chosen Mara/Owen identity, or explicitly approve a dossier-reconciled deferral. Recheck both snapshots for occlusion and unintended changes after any later authorized insertion.
5. Clear generation/source/font/rights provenance and agree production encoding/optimization while preserving transparency, detail and stand equivalence. Generated candidates are not automatically provenance-cleared masters.
6. **Issue explicit owner authorization for production adoption and a separately scoped T17 implementation instruction.** Visual acceptance alone is insufficient. In that future authorized task, validate canonical content/evidence identities, exactly three changes, asset loading, production renderer fidelity and applicable tests/build; keep the frozen dossier intact and update governance only within authorized scope.

## Outputs and verification

Only this `final-art-qa/` folder was created/modified: REPORT.md, OBSERVATIONS.csv, inspect.py, verification.json, six native three-background diagnostic panels, six edge crops and two mobile target overlays. Existing PNGs were read without alteration. No dependencies installed; existing Python/Pillow used.

Executed `python artifacts/asset-validation/case-001/final-art-qa/inspect.py`: passed. It records alpha histograms/interior heuristics, candidate hashes, stand equivalence, unchanged background, expected changed visual IDs, four in-bounds/nonoverlapping regions and width-dependent target sizes. All 11 protected hashes from the earlier refinement verification match current inputs. Hash snapshots cover root files and files under src/public/docs/tests/previous case-001 artifacts, excluding this QA folder; before/after equality passed. `git diff --check` passed; tracked diff empty; git status shows only the new isolated QA folder. Initial status was clean.

Application lint/type/unit/integration/build/E2E checks were not run: this is an inspection/diagnostic-output task with no application, canonical data or production asset edits. No claims about their current health are made. Human and device checks remain unperformed. No commit or push.

T17 FINAL ARTWORK QA COMPLETE — PRODUCTION ADOPTION NOT AUTHORIZED
