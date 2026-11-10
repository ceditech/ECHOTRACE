# R1–R12 regression evidence

| ID | Pair RGB diff pixels | Explained event regions | Unexplained pixels | Outside event alpha | Structural R1–R11 | Static R12 | Unchanged targets |
|---|---|---|---|---|---|---|---|
| B0 | 15391 | 5 | 0 | 0 | PASS | PASS | PASS |
| C1a | 15393 | 5 | 0 | 0 | PASS | PASS | PASS |
| C1b | 15396 | 5 | 0 | 0 | PASS | PASS | PASS |
| C2a | 15411 | 5 | 0 | 0 | PASS | PASS | PASS |
| C2b | 15265 | 5 | 0 | 0 | PASS | PASS | PASS |
| C3a | 15391 | 5 | 0 | 0 | PASS | PASS | PASS |
| C3b | 15391 | 5 | 0 | 0 | PASS | PASS | PASS |

R1: candidate/canonical share the exact three change IDs/kinds. R2: all RGB differences lie in passport removal, two numeral-swap and wallet old/new regions; no unexplained fourth region. R3: unrelated layers equal B0 and candidate-to-B0 deltas stay inside the allowed source-variable footprints. R4: Mara/static lower-left render unchanged. R5: Owen's effective visibility masks are identical between endpoints. R6: original passport present, Changed absent; clear removal in static review, no new recognition result. R7:12 left/21 right →21 left/12 right, matched source assets per number. R8: same closed wallet moves window→plant. R9: no Owen target intrusion or C3-caused changed pixels on clue alpha. R10: read-only candidate target geometry/source hash unchanged. R11: native960×540 framing, unchanged prop transforms, unchanged character scale and in-bounds translated source support; no new source clipping/stretching. R12: manual static review finds no added prop/label/glow/gesture/expression or new custody cue; not a human recognition claim.

Changed pixel counts may differ from B0 because authorized passport/numeral RGB values change. Five locations are not five meaningful events. No count equality requirement was imposed. C3 pairs retain B0's15,391 pair-difference count because their new character staging is identical across endpoints and does not intersect event footprints. Anti-aliased boundary variation stays within source/event masks.

The first automated run falsely rejected R7 for B0 and every variant because its assertion assumed authored scene array order was spatial left-to-right. It compared an ordered list instead of the number-ID→x mapping. Original failed metrics/manifests remain in records/initial-order-dependent-*.json. Corrected only the new verifier to compare identities/positions independent of array order, then recomputed metrics against byte-identical existing images. No geometry, targets, candidate artwork or valid assertion was weakened. Initial script syntax failure occurred before outputs and was corrected locally. These are study-tool defects, not candidate mystery failures.

Final structural tests pass; C3b remains visually REJECTED for increased occlusion/seating cost. This separate quality rejection is retained and excluded from any combination/recommendation. Fresh repeat verification reconstructs each candidate, checks all image hashes and previews, and never executes historical generators. [measurements](measurements.json), [manifest](candidate-manifest.json), [verification](VERIFICATION_REPORT.md).
