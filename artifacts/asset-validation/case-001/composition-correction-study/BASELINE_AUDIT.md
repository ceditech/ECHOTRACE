# Measurable baseline and source reconciliation

## Authority and evidence classes

Canonical/frozen authority: dossier §§8–9 and case.json define the 960×540 scene concept, original/changed physical table associations, exact authored visuals/regions and three events. MPS-001 is an owner-approved planning direction, with the later OWNER_APPROVAL_RECORD distinguishing test authorization from deferred art/geometry/staging/production decisions. Existing B artwork and Mara/Owen layer are testing candidates. Historical B geometry is experimental; it is not canonical. The new B in this folder is a different bounded proposal.

Owner-reported five first-time trials generally recognized clues; P1 questioned proportions, P5's 390px retest felt small/effortful. That retest is not new first-time evidence; 320/390 presentations were desktop simulations. Repository trial sheets remain blank, so no raw score/quote/latency can be audited. The owner has closed testing. Prior reports awaiting human/testing-design approval are historical; latest owner information governs current status without changing those reports.

Reviewed the frozen dossier, case JSON, B refinement/report, character placement transforms/report, usability reports/measurements, MPS/interaction contract/approval record, mobile verification render/readability/test/open issues, architecture and bounds-validation rules. Existing validation checks normalized bounds/references; it does not prove art contact, physical proportions, visual fairness or comfortable target gaps.

## Coordinate and raster conventions

Normalized scene positions/sizes use 960 source units horizontally and 540 vertically. Visual position is envelope center; region origin is top-left. At uniform fit width W, multiply source pixels by W/960; height is 9W/16. Actual mobile padding/chrome/height can reduce W. Raster widths/heights and top-left origins are rounded to nearest native pixel; original/changed use the same rule. Canvas itself is never stretched or cropped.

Exact baseline visuals, endpoints and all target rectangles are preserved in baseline-measurements.json; representative canonical values:

| Visual | Original center → changed center | Envelope width×height normalized | Native analytical envelope |
|---|---|---|---|
| Window / plant tables | (.30,.55) / (.75,.55), stable | .40×.50 | 384×270 |
| Mat | (.18,.65), stable | .20×.30 | 192×162 |
| Passport | (.18,.65) → absent | .10×.18 | 96×97.2 |
| Wallet | (.38,.65) → (.75,.65) | .12×.18 | 115.2×97.2 |
| Stand 12 | (.35,.25) → (.75,.25) | .12×.18 | 115.2×97.2 |
| Stand 21 | (.75,.25) → (.35,.25) | .12×.18 | 115.2×97.2 |
| Backpack | (.92,.80), stable | .10×.18 | 96×97.2 |

Canonical investigation rectangles: passport origin (.09,.50), left stand (.26,.10), right stand (.66,.10), wallet (.66,.50); each size (.18,.30). Original has no interaction regions. At 320 they are 57.6×54px with 18px row gap; at 390, 70.2×65.81px/gap21.94px. These already differ favorably from historical B spacing.

## Source alpha and padding

Solid here means alpha≥128, not a semantic material segmentation. Boxes are half-open source-pixel bounds. Faint fringe/shadow α>0 bounds and exact hashes are additionally recorded in baseline-measurements.json; alpha overlap does not prove contact.

| Asset | Raster | Solid box | Padding L/T/R/B |
|---|---|---|---|
| Table | 1280×900 | (1,87)–(1279,873) | 1/87/1/27 |
| Mat | 800×630 | (6,147)–(794,474) | 6/147/6/156 |
| Passport | 640×540 | (32,25)–(622,526) | 32/25/18/14 |
| Wallet | 800×540 | (24,12)–(782,533) | 24/12/18/7 |
| Stand 12/21 | 768×648 | (80,34)–(688,605) | 80/34/80/43 |
| Backpack | 1278×1230 | (109,21)–(1177,1197) | 109/21/101/33 |

The baseline renderer normalizes the entire source raster to the canonical envelope. This includes padding and may distort an asset's internal proportions: horizontal/vertical scale ratios are table ~1.00, mat .933, passport .835 and wallet .800. Stand ratio ~1.0003 reflects rounding. A uniform scene fit does not repair this per-asset normalization. A experiments use uniform contain for flat props; B dimensions approximately match native source aspect (residual rounding below ~0.8%).

## Reproducible support assessment

study-config.json stores an explicitly hand-traced **inner marble plane** on the existing table source. Its conservative rear-edge segment begins around y100 and front inner edge is around y659–663 near the center; brass front lip extends below this and is excluded. The full polygon/transform is recorded, not inferred from alpha or a rectangular tabletop bound. At native canonical window-table x336, the transformed inner rear/front edges are y192/y360. Table raster origin is (96,162); its broad rear rim is near y188–192 and front brass lip around y365–385, varying with x. These are 2D image landmarks, not measured 3D furniture dimensions.

For flat mat/passport/wallet, compare solid footprint to this polygon. For upright stands, compare only source lower-base ROI (100,525)–(668,605), and separately report base anchor (384,595), never the upright face. Proposed screening thresholds are ≥98% inside for flat footprints and ≥95% for stand base ROI. These are conservative study proxies, not physical laws or human perception thresholds. A footprint outside the mask triggers inspection; passing does not establish convincing contact or shadows. Inspect the actual tabletop/rim/occlusion in unannotated images independently.

Baseline stand anchor is ~y175.07, **16.93px above** the inner rear edge at x336. The entire canonical stand envelope ends near y183.6, still above y192. Baseline flat inside fractions: mat50.93%, passport62.41%, wallet65.44%; stand base0%. Visual inspection confirms floating stands and front-rim crossings. The baseline exactly reproduces the earlier canonical verification PNG pair byte-for-byte; it is not substituted with B.

The polygon has manual uncertainty and omits the brass border intentionally. Threshold failures close to edges are not equivalent to a floating gap. B's support footprint has enough interior margin to pass this polygon; its artistic judgment remains distinct. New shadows would not solve a geometric floating gap and were not invented.

## Characters, source integrity and baseline mobile size

Unchanged Mara/Owen source envelopes are (5,292)–(133,522) and (470,116)–(570,321). Effective visible bounds are ~89×141 and 88×182 source px; occlusion changes slightly with props/table experiment, never between its two snapshots. Similar projected widths at differing apparent depths support review, not arbitrary rescaling.

Baseline solid passport at 320/390 is 29.33×30.33 /35.75×36.97px; wallet36×31.33 /43.88×38.19px; numeral union13.75×9.55 /16.76×11.64px. Clickable sizes are larger and distinct. The exact three mystery events remain passport removal, one stand exchange and wallet movement, with a closed wallet and no new props.

protected-before.json captures **329 existing nonignored files** before output creation. Source manifest includes exact hashes for canonical/frozen data, reused imagery and reviewed references. All remain byte-identical; no baseline is regenerated. Git internals/dependencies/build outputs are excluded from this protected inventory; no claim is made about unrelated OS files.
