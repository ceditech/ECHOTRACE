# Layout alternatives — proposed only

Recommendation: B as a conditional design direction; none is final production approval. All artifacts use unchanged source artwork except B substitutes the already generated table candidate. No new art was generated. Original case.json/dossier, production assets, application/governance and tracker remain unchanged.

Each A/B/C folder contains original.png, changed.png, comparison.png, original/changed-mobile-390.png, original/changed-mobile-320.png, geometry-diff.json and proposed-scenes.json. JSON files are non-runtime proposals, not validated production case definitions. explore.py is offline only.

## Comparison (1 poor, 5 strong)

| Criterion | A minimal | B deeper table | C compact furniture |
|---|---:|---:|---:|
| Physical credibility | 3 | 4 | 2 |
| Visual polish | 3 | 4 | 3 |
| Clue fairness | 3 | 4 | 3 |
| Mobile readability | 3 | 3 | 3 |
| Implementation simplicity | 5 | 4 | 4 |
| Smallness of geometry change | 4 | 3 | 2 |

Scores are design judgments from static previews, not playtest results. A moves clues onto the old surface with reduced passport/wallet sizes; stand/wallet separation is tight. B distributes rear stands and foreground documents across a deeper surface without moving the tables. C moves tables lower and flattens their envelopes, causing perspective compression and wallet/base crowding. B is recommended for further owner-approved refinement, not implementation.

## Exact geometry summary

All coordinates/sizes are normalized. Unlisted values, object IDs, rotation, ordering, background, backpack and narrative/evidence associations remain unchanged. The window table stays left and plant table right.

All proposals: passport/mat x .18 → .22; passport size (.10,.18) → (.07,.105); mat size (.20,.30) → (.20,.28); wallet size (.12,.18) → (.10,.12). Wallet retains original x .38 and changed x .75; stand x values .35/.75 exchange as before. No fourth change is introduced.

| Value | Frozen | A | B | C |
|---|---|---|---|---|
| Stand y, both scenes | .25 | .335 | .335 | .43 |
| Passport/mat y | .65 | .445 | .535 | .535 |
| Wallet y, both endpoints | .65 | .445 | .535 | .535 |
| Table y | .55 | .55 | .55 | .61 |
| Table size | (.40,.50) | unchanged | unchanged | (.42,.40) |

geometry-diff.json records per-scene before/proposed values, corresponding interaction regions and wallet-move from/to endpoint changes. Adoption would require explicit owner approval to revise frozen visual geometry and its dossier mappings, followed by production validation and fidelity-test changes under separate authorization. No such changes were made.

## Interaction regions

For B, rectangle origin/size:
- Remembered passport: (.14,.4125), (.16,.245). Survives removal; no sprite required.
- Current left stand-21: (.27,.16), (.16,.245).
- Current right stand-12: (.67,.16), (.16,.245).
- Changed wallet: (.67,.4125), (.16,.245).

All are in bounds and pairwise nonoverlapping. Both stand IDs remain linked to change-stands-exchanged and its existing evidence. At full 320-pixel canvas width these rectangles measure 51.2×44.1 pixels. Padding or letterboxing may reduce that; actual application touch QA remains required. Larger regions include some surrounding surface deliberately, without overlapping another target.

A/C use .16-wide rectangles, .14 high for upper stand faces and .10 high for documents; these avoid overlap but fall below a 44-pixel touch height at phone scale. Their exact origins are in their diffs. This is a material disadvantage, not completed mobile interaction acceptance.

## Visual and art review

Support: B places stand bases within the rear surface and documents within its broad center/front area. Mat shift removes the major left overhang. Its table viewpoint is still steeper than the lounge and passport/wallet art. All proposals preserve draw order; no character sprites were added and therefore no new character occlusion occurs. Mara/Owen representation remains an unresolved canonical visual requirement, not new game objects.

Contact shadows are currently baked into isolated artwork where present; no procedural shadows were added. Broad surface overlap improves support but existing highlights and upright document perspective still weaken contact realism. Flatten passport/wallet resting perspective, correct mat perspective, harmonize lighting and add restrained contact treatment through approved asset retouching before production approval. Wallet still lacks the canonical broad striped strap; both stands need one common physical/export template. Clue silhouettes and numerals are recognizable in mobile previews, but reduced passport size needs human readability testing; fine text is not a clue.

Snapshots use identical stable layers. Only passport removal, stand exchange and wallet movement differ. No solution or handling action is introduced. No change/evidence identity is renamed.

## Acceptance and next approval

Owner approval requested for B as a proposed replacement visual-geometry baseline, including four interaction regions and revised wallet movement endpoints, conditional on corrected artwork and desktop/mobile human review. Approval of direction does not itself authorize changing canonical files or implementing T17. Require exact contact/perspective review, numeral/strap recognition at actual padded 320/390 widths, usable nonoverlapping regions, unchanged three-change behavior and canonical fidelity tests before adoption.

Source-asset hashes were checked after rendering; no modifications. No installations, commits or pushes. Static offline checks only; no runtime tests, browser QA or playable-case claim.
