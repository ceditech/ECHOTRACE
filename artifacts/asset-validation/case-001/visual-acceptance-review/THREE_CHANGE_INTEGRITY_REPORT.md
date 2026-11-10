# Three-change visual integrity

V7 PASS and V8 PASS for this exact offline pair. Fresh aligned960×540 RGB comparison and deterministic in-memory reconstruction reproduce both candidate PNGs pixel-for-pixel from the existing background, static character layer and candidate prop geometry. No scene was regenerated/exported as a replacement asset. Source files and prior outputs remained read-only.

| Region/event | Changed pixels | Actual RGB difference bbox, exclusive far edge |
|---|---|---|
| left_stand_exchange | 1268 | [312, 160, 358, 194] |
| right_stand_exchange | 1267 | [696, 160, 742, 194] |
| passport_removal | 2891 | [174, 257, 250, 321] |
| wallet_departure | 4985 | [313, 253, 418, 324] |
| wallet_arrival | 4980 | [668, 253, 773, 324] |

Total15,391 differing RGB pixels. Five spatial regions represent exactly three events: passport removal; stand exchange at two positions; closed-wallet departure and arrival. Native binary mask: [difference diagnostic](previews/difference-mask-native-DIAGNOSTIC.png). It is an inspection aid, not scene artwork. Counts are not meaningful-event counts.

No changed pixel lies outside the union of changed-prop alpha footprints or outside these five reviewed regions. Zero changed pixels intersect the static character alpha. Effective character visibility masks are byte-identical; table-window/table-plant, mat and backpack layers are identical. The same background and character source bytes and transforms are reused. No additional background/character event was found.

The stands share exterior support (alpha>0) and solid silhouettes (alpha≥128) and common body design; interior alpha/RGB differences are confined to the numeral ROI [243,203,518,394], consistent with antialiased numeral compositing; native scene differences at both positions lie in numeral regions. Upright orientation and same-sized bodies support an exchange rather than a change of physical stand design. Minor one-pixel/count differences between left/right numeral regions and wallet endpoints arise within allowed translated/composited raster footprints against different backgrounds; they do not form independent regions. No unexplained fourth-change region remains. Anti-aliased perimeter pixels count in RGB difference but are not extra gameplay events.

Fresh geometry checks match all owner-listed visual centers/sizes and four target origins/sizes. Candidate and canonical contain the same three change IDs/kinds; wallet y endpoints differ in the offline candidate as documented in B-geometry-diff.json. Canonical data is not adopted or rewritten. Frozen mystery remains accidental stand swap, delivery to displayed12 and recovery by Owen, not theft. Identical neutral characters show no new custody action.

Measurement investigation: the first hand-selected diagnostic passport box ended at y320 and missed two perimeter pixels. Expanding only the review box to [160,240,270,335] captured the existing edge through y320. The source pair, allowed alpha mask and geometry were untouched. Final unexplained count is zero; the initial failed diagnostic assertion is retained in measurements.json as a note.

Limits: this proves exact pair/source stability and explains measured difference regions. It does not prove first-time recognition, memory fairness, story comprehension, device behavior or legal rights. See [source register](SOURCE_AND_SCOPE_REGISTER.md) and [measurements](measurements.json).
