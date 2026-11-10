# Candidate source and geometry audit

2026-11-09. Repository and feature/echotrace confirmed; working tree initially clean. Before any candidate generation, nine required refined-study inputs were checked against the study's FILE_INVENTORY.json, and all returned **EXACT raw SHA-256 matches**. source-audit.json contains every source path, full recorded hash and full observed raw hash. It also defines an explicit EOL-only detection path for a future checkout; none was needed in this execution. No mismatch was normalized away. Frozen/canonical/raster sources referenced by the study were checked before copying.

The isolated candidate.json is a byte-exact copy of composition-correction-study/B-proposed-case.json, not a registered production case. Images/original.png and changed.png are exact copies of that study's B/original-960.png and changed-960.png. data.js projects scenes/changes/measurement rows from that one candidate; no independent geometry constant overrides it. prepare.py reproduces these copies and records precise raw hashes in asset-manifest.json. The older canonical prototype images and historical layout-alternatives/B geometry are not used for rendering or hit membership.

## Expected values verified against the source

| ObjectId in Changed | Origin | Size |
|---|---|---|
| object-passport (remembered) |(.13,.47)|(.18,.27)|
| object-stand-21 (left) |(.26,.15)|(.18,.27)|
| object-stand-12 (right) |(.66,.15)|(.18,.27)|
| object-star-wallet |(.66,.47)|(.18,.27)|

Upper rectangles end at .42 and lower begin .47, leaving .05 normalized height. Width320 yields57.6×48.6px/gap9; width390 yields70.2×59.23125px/gap10.96875. Six rectangle pairs have no overlap. Original has no interaction regions. Its visible passport at(.22,.535) is compared with the later remembered target; original stands/wallet must not be incorrectly tested against their Changed ObjectId destinations.

Proposed visual centers/sizes are mat(.22,.535)/(.20,.28), original passport(.22,.535)/(.08,.12), wallet(.38,.535)→(.75,.535)/(.11,.132), and stands(.35,.335)↔(.75,.335)/(.12,.18). Tables and backpack retain their stable source configuration. Complete geometry is in candidate.json; it is distinct from canonical stand y=.25 and passport/wallet y=.65. Canonical target size(.18,.30)/row gap.10 is also not this candidate. No canonical source changes.

## Exact mystery integrity

Only change-passport-removed/object_removed, change-stands-exchanged/object_exchanged and change-wallet-moved/object_moved remain, all meaningful/required. The passport disappears from the window-side mat, either stand participates in the same one exchange, and the same closed star-wallet raster moves left to right. Candidate from/to metadata matches its visual endpoints. Static table/mat/backpack definitions, background and Mara/Owen source treatment stay fixed between snapshots. No additional prop, opening/closing event, pose or narrative action is added.

Nonvisual case fields—including scoring, evidence, deduction, witnesses and truth—are compared with canonical data and remain identical. The candidate's already-proposed movement coordinates are the only change metadata difference; no new logic is introduced. The verification script independently reconstructs both960×540 images from candidate geometry and verified existing rasters, compares every pixel, checks that all differences lie in the existing three-event object layer union and verifies no changed character pixels. This is stronger than simply accepting two loosely related screenshot files.

The candidate is not imported into any application catalog, bridge or loader. Offline checks do not claim full production schema/application validation or production adoption. All404 existing nonignored files are protected by the task's raw-hash baseline; historical baselines are not rewritten.
