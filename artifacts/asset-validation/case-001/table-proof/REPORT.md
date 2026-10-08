# Single-table feasibility proof

Verdict: BLOCKED. Exactly one image-generation call produced one candidate using the existing table as a material reference. No second candidate or corrective artwork iteration was generated.

table-candidate.png is a detected PNG, RGBA, 1280×900 (exact 64:45 table-envelope ratio), with 30.1223% fully transparent pixels and alpha range 0–255. The generated 1496×1051 output was normalized to this export envelope without object offsets. The original generated output remains in the Codex generated_images directory. Candidate is a non-runtime artifact; public table.png is unchanged. No baked props or checkerboard background is visible. The marble veining is intentional material detail. Tight alpha bounds touch export edges; this is not a final edge-quality approval.

Generation reference: public/assets/cases/case-001/table.png. Prompt requested warm marble/brass, high elevated perspective, broad deep near-rectangular surface, minimal base and transparent background, with no props or characters. The output did not fully satisfy the requested rear-contact area.

proof.py used unchanged case.json centers, extents, rotation and visual order, substituting only this candidate for asset-table. Shared candidate and background are reused at both table locations. Source asset SHA-256 comparisons passed. No coordinate offsets, padding corrections to other sprites, or layering changes were applied. Nearest-pixel raster rounding matches the earlier offline validation.

## Acceptance

1. Rear stand contact: FAIL. Both bases end near y=184 while the candidate's actual rear surface begins near y=190 at the relevant x coordinates. A visible gap remains; alpha-bounds overlap is not treated as surface support.
2. Document support: FAIL. The surface now extends substantially farther toward the documents, but the mat and passport protrude at the front-left corner. Original wallet and changed wallet overlap the front rim and extend beyond the supported surface; upright source perspective remains unresolved. Partial overlap does not establish plausible resting contact.
3. Both locations: FAIL for full support; identical failure repeats at both locations, demonstrating that no per-table offset was used.
4. Lounge consistency: PARTIAL. Gold/brass and marble lighting are compatible; steep tabletop perspective differs from the environment and existing document assets.
5. Clue visibility: PASS for visibility only. No clues are obscured by the table because original ordering was retained. Misleading support relationships remain.
6. Canonical changes: PASS on static inspection. 12/21 exchange, passport disappears and wallet changes side. Stable artwork remains identical between snapshots.
7. Mobile: PARTIAL. 12 and 21, passport silhouette and wallet star remain distinguishable at 390/320 full-canvas widths. Floating stands and front-edge overhang remain evident. No browser or human playtest performed.

Compared with the old shallow oval tabletop, this candidate improves the depth of usable surface and reduces pedestal prominence. It does not pass the support gate. Frozen geometry has not been proven impossible, but a successful shared surface within it remains unproven. Owner review is required before any further candidate or geometry-related decision. No data changes are proposed or made here.

Outputs: original-table-proof.png, changed-table-proof.png, comparison-table-proof.png, original-mobile-390.png, original-mobile-320.png, table-candidate.png, verification.json and proof.py. No production assets, application files, case data, frozen/governance documents, dependencies or tracker statuses were changed. No commit/push.
