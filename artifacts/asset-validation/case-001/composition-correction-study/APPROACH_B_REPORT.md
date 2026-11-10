# Approach B — coordinated visual/target geometry proposal

**Result: recommended offline candidate for owner review, not adoption.** B-proposed-case.json wraps the isolated candidate with an explicit NOT FOR LOADING/ADOPTION status. Canonical case.json, frozen dossier, existing B and application files are unchanged.

## How this differs from automatic Proposal B adoption

The support diagnosis independently calls for lowering stands onto the existing rear tabletops and lifting rim-crossing flat props. Historical B supplies a known candidate composition reference, not a geometry authority. This study measures that reference, retains only its contact-compatible placement/aspect direction, enlarges its passport/wallet moderately and replaces its target design. It makes no table/background/character coordinate change.

| Visual | Canonical normalized center / size | Proposed center / size | Reason |
|---|---|---|---|
| Mat | (.18,.65) /(.20,.30) | (.22,.535) /(.20,.28) | Native aspect, inside tabletop, stable empty location |
| Passport | (.18,.65) /(.10,.18) | (.22,.535) /(.08,.12) | Native aspect, distinct mat border; 14% wider than historical B's .07 |
| Original wallet | (.38,.65) /(.12,.18) | (.38,.535) /(.11,.132) | Native aspect, clear front rim; 10% wider than historical B's .10 |
| Changed wallet | (.75,.65) /(.12,.18) | (.75,.535) /(.11,.132) | Same source and size at destination |
| Original 12 / changed 21 at window | (.35,.25) /(.12,.18) | (.35,.335) /(.12,.18) | Base supported on rear tabletop |
| Original 21 / changed 12 at plant | (.75,.25) /(.12,.18) | (.75,.335) /(.12,.18) | Same exchange, same stand dimensions |

Table envelopes/centers, backpack, background and character layer remain unchanged. B-geometry-diff.json includes every before/after visual and target field for both snapshots, not just the summary above. The wallet change's `from`/`to` y coordinates are updated inside the candidate only to match its visual endpoints; kind, IDs, scene links, discovery/evidence/reasoning/scoring data remain the same. No new story action or open-wallet state is introduced.

## Target proposal, separate from visible clue size

All widths remain .18; heights become .27 instead of canonical .30. Origins:

| Investigation target | Canonical origin | Proposed origin | Canonical → proposed size |
|---|---|---|---|
| Remembered passport | (.09,.50) | (.13,.47) | (.18,.30) →(.18,.27) |
| Current left stand (21) | (.26,.10) | (.26,.15) | (.18,.30) →(.18,.27) |
| Current right stand (12) | (.66,.10) | (.66,.15) | (.18,.30) →(.18,.27) |
| Wallet | (.66,.50) | (.66,.47) | (.18,.30) →(.18,.27) |

The upper row ends at .42, lower row begins .47: .05 normalized height separates them. At 320, each target is **57.6×48.6px**, minimum gap **9px**; at 390, **70.2×59.23px**, gap **10.97px**. Six pairwise rectangle comparisons at each measured scale show zero overlap. Half-open normalized lookup gives exactly one ObjectId at each target center and no ObjectId in the gap; no nearest-clue disambiguation or invisible inflation is used.

Historical B instead uses .16×.245 targets with only .0075 normalized row separation: 51.2×44.1px/gap1.35px at 320, 62.4×53.75px/gap1.645px at 390. Its 320 height and both gaps miss MPS comfort goals. New B explicitly addresses this issue; it does not disguise target padding as artwork correction. Canonical targets still have larger 18/21.94px separation but correspond to unsupported canonical/candidate art.

Solid selectable stand bodies/bases and changed wallet are fully inside their new target rectangles; the original passport is inside its later remembered-location region. Original has no interactive regions; it is incorrect to require the original right-hand stand21 or original left wallet to occupy the changed-scene target for the same ID. Target centers are not the visible object's center in every case: upper rectangles include extra space above the stands. This generous correspondence is a real selection-design tradeoff requiring later device QA, not a claim of perfect tap accuracy.

## Contact and readability findings

All mat/passport/wallet solid footprints and stand lower-base ROIs fall inside the conservative traced marble surface at both endpoints (100% proxy coverage). Passport solid footprint is also entirely inside solid mat. At window x336 the base anchor is ~y221.07, versus inner rear edge y192 and front edge y360: approximately29px inside the plane rather than17px above it. Actual images show bases resting at rear tabletop and flat props behind the front rim. Natural contact shadows remain subtle; perspective/glare are still inherited candidate issues.

B's passport at 320 has envelope25.6×21.6px and solid23.67×20px; wallet envelope35.2×23.76px and solid33.67×22.67px. This gives more visible clue area than historical B while keeping the passport inside the mat and preserving separate wallet placement. It remains smaller than the distorted canonical render, and the 9.55px numeral height remains unchanged. No first-time success is inferred from those dimensions.

## Stability, landmarks and limits

Reviewed main-window and main-plant ROIs show zero image changes from baseline for this candidate. Existing table and character treatment is untouched; Mara/Owen have the same effective treatment in Original/Changed. Compared with baseline, 98 Mara pixels previously covered by rim-crossing mat become visible; this is a shared static-occlusion difference between proposals, not character movement between endpoints. Owen visibility is unchanged.

At effective scene width288 (hypothetical 16px padding each side in320), target height43.74px misses the48px comfort goal even though gap8.1px passes; do not silently enlarge targets. At390 with32px total padding, width358 yields target64.44×54.37px/gap10.07px. Layout must preserve sufficient effective width and be reviewed on actual devices. All row-gap calculations are analytical CSS sizes under full fit, not real touch results.

This is the smallest accepted **tested** route, not a globally optimal geometry proof. Future owner adoption would require explicit geometry/visual addendum approval that reconciles the frozen dossier's coordinate concepts without changing its mystery facts, original T04/T05 validation, case/evidence regression, accepted art/provenance and real responsive mapping/target QA. No such adoption, new runtime layer or T17/T18 implementation is authorized now.
