# Case 001 asset validation — 2026-10-08

Verdict: BLOCKED for production scene acceptance. T17 implementation is not authorized.

## Method and output

Existing bundled Python/Pillow 12.3.0 was used; no dependencies were installed. compose.py is an offline validation script, not application code. It reads case.json and the eight source files. Center placement, normalized extents, authored rotation and array ordering are retained. Raster sizes/positions are rounded to the nearest pixel (at most half a pixel); no layering correction was made. The original and changed previews use the identical background and table texture. Mobile previews represent a full-width canvas at 390/320 pixels without page padding; actual padded layouts will be smaller.

inventory.json records exact byte sizes, detected formats, modes, alpha statistics, alpha bounds and SHA-256 hashes. placements.json records rendered object placement. All hashes were checked again after generation; sources were unchanged. Transparency panels composite every object over white, dark gray and warm lounge gray. Visual review covered all seven panels, the assembled scenes, mobile previews and difference mask.

## Inventory

| File | Detected format / mode | Pixels | Bytes | Fully transparent pixels | Alpha |
|---|---|---|---:|---:|---|
| lounge-background.webp | WEBP / RGB | 1920×1080 | 566826 | 0% | None; opaque expected |
| table.png | PNG / RGBA | 1496×1051 | 1503740 | 53.8603% | Present |
| document-mat.png | PNG / RGBA | 640×540 | 319546 | 60.1765% | Present |
| owen-backpack.png | PNG / RGBA | 1278×1230 | 2509210 | 37.7529% | Present |
| passport.png | PNG / RGBA | 1359×1158 | 2200563 | 44.2036% | Present |
| star-wallet.png | PNG / RGBA | 1424×1105 | 2487978 | 36.7722% | Present |
| stand-12.png | PNG / RGBA | 1261×1247 | 1806723 | 36.2723% | Present |
| stand-21.png | PNG / RGBA | 1321×1191 | 1972311 | 33.0154% | Present |

All eight expected filenames are present, detected formats match extensions, and each maps to its existing asset-ID counterpart. No filename/ID mismatch. Source envelopes differ from the proposed export specification for all objects except the mat. The preview scales the entire image to the authored display envelope; it does not crop padding or preserve an alternative source aspect ratio.

## Isolation and edges

All seven object panels show genuine background isolation: no visible opaque rectangular background, baked checkerboard, black matte halo or unwanted detached floor shadow at inspected scale. Fine edge quality at native source resolution has not received a professional retouch audit. PNGs contain extensive partial alpha (see nonopaque_percent in inventory.json), so RGBA alone must not be interpreted as full interior opacity.

Table, backpack, passport, wallet and both stands have nonzero-alpha bounds touching one or more image edges. No obvious severed major contour appears in the panels, but edge-touching pixels and tight export margins warrant source-resolution review and safer padding. The mat has ample padding, making its actual visible footprint far smaller vertically than its authored envelope. The stand silhouettes and source envelope aspect ratios differ: normalize both from one master before final acceptance, retaining their respective printed numerals.

Transparency alone: provisional PASS for all seven objects. Production suitability is blocked separately by composition and canonical fidelity below. Background has no visible checkerboard; its patterned floor/table materials are intentional artwork, not a transparency grid.

## Canonical composition checks

Automated assertions passed: original stand 12 left and stand 21 right exchange positions; passport disappears; only passport, wallet and the two stand visuals differ between scene arrays; background and all stable visual definitions remain identical. Four changed object IDs represent exactly three authored changes. Difference-mask regions are confined to the two stands, passport and old/new wallet locations. Stable objects remain unchanged. No extra objects or characters were introduced by the script.

The background does not visibly duplicate the separately composited clue objects or foreground tables, but includes decorative lounge furniture. It contains no visible Mara or Owen. This does not satisfy the dossier's stable traveler presence/association with their respective places and needs owner-reviewed correction inside the existing background asset, not invented new runtime objects.

## Production blockers and required correction

1. Table surface alignment: stands float above the rear edge; mat/passport/wallet float beside/below the tabletop rather than resting on it. The mat's perspective and sparse visible footprint amplify this. Correct the table/artwork support surfaces and object export envelopes within the frozen normalized bounds. Do not move centers or sizes to conceal the mismatch. If a plausible table cannot support both stands and documents under those bounds, report the geometry conflict for explicit owner review.
2. Wallet canonical mismatch: closed wallet and large star are visible, but the broad striped strap is absent. The existing closure tab is not a broad striped strap. Correct the source design before acceptance.
3. Stable character presence: Mara/Owen are not visible or associated with their tables. Obtain approved background character treatment consistent with both snapshots, without occluding clues or showing handling.
4. Export consistency: normalize stand perspective, relative silhouette size and center/padding; passport/backpack/wallet source aspect ratios distort when mapped directly to frozen display extents. Retouch/re-export without changing case geometry.

## Mobile findings

12 and 21 remain visually distinguishable at 390 and 320 full-canvas widths. Passport silhouette and gold lettering, wallet star and empty mat can be distinguished on static inspection. Fine passport text is unnecessary and not reliably readable. No objects are hidden by layer order. However floating objects and table misalignment remain misleading at both widths; the canonical striped strap cannot be assessed because it is absent. This is static image inspection, not browser/device/human playtest acceptance or accessibility certification.

## Deliverables and restrictions

original.png, changed.png, comparison.png, difference.png, difference-mask.png; original/changed-mobile-390.png and original/changed-mobile-320.png; seven *-transparency.png panels; inventory.json, placements.json, this report and compose.py. All output is under artifacts/asset-validation/case-001, outside the runtime package. Original files, case.json, frozen documents, roadmap/tracker, runtime code and dependencies were not modified. No commit or push.
