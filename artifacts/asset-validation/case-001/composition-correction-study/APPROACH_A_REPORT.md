# Approach A — fixed canonical envelopes and targets

**Result: reject both tested candidates.** Canonical centers, sizes, rotations, interaction rectangles and change metadata are exactly preserved in A-fixed-envelopes.json. Effective visible pixels move inside those envelopes explicitly; fixed metadata is not a claim that perceived object centers stay fixed.

## A1: mild native-aspect alignment

Use uniform contain/top alignment for flat objects: mat90%, passport85%, wallet85% of their maximum contained source scale. Center horizontally within the fixed envelope. Move stand pixels down 6 native pixels, until solid bases reach the envelope bottom. Table pixels remain unchanged. All parameters and effective solid bounds are recorded. No opaque silhouette is cropped, retouched or regenerated; only existing antialias/fringe handling under raster placement applies.

At 320 the passport solid is 25.33×21.33px, wallet31×21px, mat57×23.33px. Source aspect distortion is removed apart from integer rounding. But stand base ROI remains 0% inside the tabletop plane; its anchor is ~10.93px above the rear edge. Flat support fractions improve to mat73.18%, passport94.53%, wallet96.83%; all miss the stated screening goals. Visual inspection still finds unsupported stands and props too close to/on front brass lip. No new contact shadow could honestly fix that support gap.

## A2: bounded stress test of internal table shift and compact props

Retain canonical envelope metadata, shift both table images **20 native pixels up inside their envelopes**, and preserve the stand +6px alignment. Mat factor60%, passport/wallet48% of native-aspect contained scale, top aligned. Table's top solid padding permits this without clipping opaque tabletop/body; faint exterior residue can be clipped by its fixed envelope and is not treated as meaningful identity. This is a substantial effective-placement deviation despite unchanged canonical metadata, recorded rather than hidden.

At 320, solid passport is **14.33×12px**, wallet17.33×12px, mat37.67×15.67px. Passport/wallet footprint proxies reach100%; mat95.79% and stand base91.73% still fail screening. The anchor itself is inside the shifted plane, demonstrating why point contact alone is insufficient. Eleven passport solid pixels overhang the small mat. These are additional rejection findings, not hidden by relaxed thresholds.

Inspection finds tiny document/feature cues and a different table/chair/depth relationship. The table shift changes 7,946 pixels in the reviewed window ROI and 13,384 in the plant-side ROI versus baseline; those ROIs include foreground table areas, so this is not a claim that semantic plant leaves were repainted. Owen loses 310 effective visible pixels to changed stable foreground occlusion. These differences are shared at both endpoints and do not create a fourth mystery event, but they undermine the “smallest” correction rationale.

## Boundary of the conclusion

A1/A2 do not show that every possible canonical-preserving redraw is impossible. They show that these bounded padding/alignment/scaling routes either retain support defects or make already-small clues materially smaller. Stretching/repainting the tabletop plane, cropping recognizable bodies, enlarging casts/shadows to disguise floating support or generating new art was not undertaken. A larger art treatment would need owner approval and new source/provenance review; do not treat it as surgical padding.

Both original/changed pairs are available at A1/ and A2/ in 960/390/320 rasters, plus annotated support evidence. Fixed targets contain the selectable solid objects and remembered passport in these renders, but large targets do not make tiny clue images readable. Canonical target preservation scores well on regression risk and poorly on actual composition in these examples. No human/device tests occurred.
