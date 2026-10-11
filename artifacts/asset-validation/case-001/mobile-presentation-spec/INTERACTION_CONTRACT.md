# Deterministic interaction contract

Status: recommended future contract, subject to O03/O05/O10 and explicit implementation authorization. Canonical normalized regions remain authoritative; no target replacement, hit slop or nearest-clue guess is approved here.

## Coordinates and transforms

Source scene point is p=(X,Y), 0≤X≤960, 0≤Y≤540; normalized point n=(X/960,Y/540). Canonical visuals/regions are normalized. Define current viewport V of CSS width A/height B, its client-coordinate origin (L,T), fit s and centered offsets (ox,oy) per MPS-001. Investigation zoom z≥1 and CSS pan (tx,ty) operate about the viewport center c=(A/2,B/2).

Source-to-local-CSS:

`q = c + z * ([ox,oy] + s*p - c) + [tx,ty]`

Client point is `[L,T]+q`. Inverse:

`p = ((q - [tx,ty] - c)/z + c - [ox,oy])/s`

Then divide X/Y by 960/540 for normalized hit testing. Both axes use one uniform source scale; canonical rectangle y extents are fractions of 540, not 960. These equations assume an axis-aligned host and camera; CSS rotation/skew is not permitted by the proposed baseline. If future transforms introduce a general affine matrix, use its exact inverse and new tests, not bounding-box interpolation.

Take q from pointer clientX/clientY relative to a verified current viewport client rectangle. Document whether the browser event/rectangle coordinate convention includes visual viewport effects; do not add scroll/DPR/visualViewport offsets blindly. If using page coordinates, convert them into the same client convention first. Geometry epoch changes when bounds, zoom, pan, source revision or orientation changes. Freeze the epoch at pointerdown and cancel tap if it changes. Reject points outside V or outside transformed source bounds, including letterboxing. Clamp only camera position, never out-of-scene taps into valid targets.

For the stated center convention let d_x=z*s*960 and d_y=z*s*540. If d_x>A, clamp tx to [-(d_x-A)/2, +(d_x-A)/2]; otherwise tx=0. Apply the equivalent rule for ty/B. Button zoom keeps the source point at viewport center unless that violates bounds; pinch anchors its gesture centroid and recomputes pan accordingly. After reset, z=1 and pan=0.

Example at 320×180 with no letterbox/pan: s=1/3; normalized (.75,.65) maps to CSS (240,117). At centered 2× it maps to (320,144), on the right viewport boundary and partly off-screen. Inverting a screen point before target lookup, not multiplying target tolerances by DPR, restores correct source coordinates. At investigation resize preserve the center source point under the new transform and clamp; pending taps are cancelled.

## DPR and renderer coordinates

CSS coordinate mapping and hit testing are independent of DPR. Backing-pixel sizes may be approximately CSS canvas dimensions × chosen raster ratio; browser DPR, renderer resolution and source logical resolution are different quantities. A physical-backing coordinate must be converted to CSS using actual backing/CSS ratios before the inverse above. Do not multiply clientX by DPR and then apply Phaser's already converted pointer coordinates. Choose exactly one mapping owner and validate source round-trips against rendered landmark positions. React measures layout; Phaser applies the accepted camera and maps input; application validates intents. DPR/zoom/orientation changes must invalidate pending gestures and refresh mapping without recreating gameplay state.

## Targets and correspondence

Case 001 uses four canonical rectangles in investigation: remembered passport (.09,.50,.18,.30), left stand (.26,.10,.18,.30), right stand (.66,.10,.18,.30), wallet (.66,.50,.18,.30). Current left is object-stand-21 and right object-stand-12. Source is case.json, not hardcoded production behavior: these values are documentation examples. Preserve ObjectIds independently of mutable displayed numerals.

| Full fit width | Canonical target | Canonical row gap | Offline B target / gap |
|---|---:|---:|---:|
| 960 | 172.8×162 | 54 | 153.6×132.3 / 4.05 |
| 390 | 70.2×65.81 | 21.94 | 62.4×53.75 / 1.645 |
| 320 | 57.6×54 | 18 | 51.2×44.1 / 1.35 |

Proposed practical goals are 48×48 CSS px and 8px edge separation at minimum supported effective width; canonical meets them analytically at 320, B does not. These goals are not proof of touch accuracy. Under letterboxing the actual displayed width can be smaller than host width. Increase available scene space or request a specific owner-approved solution; never silently enlarge hit regions or overlay canonical targets on relocated B artwork.

Review correspondence using solid visible art, not just transparent envelopes: stand bases belong to their stand, remembered mat location remains selectable without passport, and UI/furniture occlusion cannot create an unrelated interactive area. Artwork could be corrected to fit canonical regions under O04/O06/O07; authored region edits need O05. Domain supports rectangles/circles, but a normalized-circle metric under this non-square source requires a separately agreed interpretation; this Case 001 contract covers its actual rectangles only.

## Gesture arbitration (recommended starting parameters, O03)

Track one gesture transaction with pointer IDs, attempt/revision, layout epoch, initial position, maximum movement and cancellation flag. Threshold proposal: **8 CSS px maximum displacement** for tap, independent of DPR and zoom. No long-press duration awards correctness or displays a hint. Selection occurs once on primary pointer-up within the same canonical ObjectId as pointerdown, with unchanged attempt/projection/phase/epoch and no cancelled gesture. Secondary/mouse nonprimary buttons do not select.

- One pointer starts pending tap. Beyond 8px, cancel tap permanently; at z>1 it becomes pan. At z=1 it becomes navigation/scroll as permitted by layout and still never selects on release.
- A second pointer cancels pending tap and initiates approved pinch. After pinch or loss of one pointer, all pointers must release before a new tap can begin; no residual finger becomes a selection.
- Pan uses CSS deltas and clamps camera, never moving authored objects. Pointer capture stays within the scene transaction; pointercancel/lost capture/bounds mutation/background/phase change discards it.
- External Zoom, Overview and directional-pan buttons provide single-pointer alternatives. Keyboard focus can enter the scene for a neutral spatial cursor: arrow movement at a uniform CSS step; Enter/Space uses the same inverse/region resolution, not a list of only correct targets. Separate focus context for pan controls so arrows do not accidentally select. Cursor/focus style has no correctness color.
- Do not intercept system/browser zoom globally. Restrict custom gesture ownership to the scene and explicitly approved modes; test touch-action/passive-listener behavior on real platforms. Native page scroll must not be mistaken for a tap.

Whether pinch is included initially and exact move threshold remain O03; single-pointer buttons are the recommended minimal accessible first implementation. No gesture behavior is currently provided by the production shell, whose pointerdown callback cannot be reused unchanged as this tap contract.

## Hit resolution and evidence integrity

Inverse-map once; test exact authored geometry. Proposed boundary convention: rectangle origin edges included, far edges excluded, with outer scene boundary handled consistently; validate all cases and owner acceptance under O03. No tolerance inflation. If no hit, no object intent and no incorrect-selection penalty is fabricated. If more than one ObjectId contains the point, classify presentation hit as ambiguous and emit no selection; neutral “Try a more precise location” may appear outside the scene without naming candidates. Do not guess by array order, z-order, nearest center or correctness. This presentation ambiguity differs from domain AMBIGUOUS, which concerns multiple authored changes for a selected object.

One hit produces ObjectId plus authoritative attempt/projection revision using the typed bridge. Current bridge supports a single projected target; a multiobject projection/membership gate extension is mandatory before production use. Camera epochs are local cancellation guards, not a second canonical revision. Revalidate queued actions in application against the current authoritative phase/attempt, even if bridge delivery previously succeeded.

Domain evaluates selection truth through evaluateSelection. Interaction is investigation_active only. Either stand unlocks the same one exchange, repeat discovery is already-discovered and never a second award. Object selection makes evidence available; it does not automatically collect evidence or mutate score directly in Phaser. Neutral keyboard or pointer methods dispatch identical semantics. Do not create extra incorrect selections from double-tap synthesis or one pinch. Renderer cannot receive answer keys/change correctness to aid disambiguation. Subsequent field/API names and membership validation require the independent architecture gate in IMPLEMENTATION_SEQUENCE.md.
