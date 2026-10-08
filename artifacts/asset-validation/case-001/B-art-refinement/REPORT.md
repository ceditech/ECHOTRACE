# Proposal B artwork refinement gate

Recommendation: CONDITIONAL PASS for owner visual review, not final production acceptance. Proposal B remains an offline working direction. Geometry adoption and T17 implementation are not authorized.

## Files and production provenance

Six environmental candidates: table-candidate.png, document-mat-candidate.png, passport-candidate.png, star-wallet-candidate.png, stand-12-candidate.png and stand-21-candidate.png. Additional justified files: stand-master-candidate.png (the single common editable raster reference), character-concept-reference.png (concept-only portraits), character-placement-zones.png (annotated non-runtime placement proposal), stand-numeral-difference.png, six *-isolation.png three-background inspection panels, generation-paths.json, verification.json, refine.py and this report.

Previews: original-refined.png, changed-refined.png, comparison-refined.png, difference-mask.png and original/changed-mobile-390.png and original/changed-mobile-320.png.

Built-in image generation was actually used: one call each for table, mat, passport, wallet and blank stand master, plus one character concept sheet call. No repeated image regeneration. Table reference was table-proof/table-candidate.png; other environmental references were the corresponding public source assets. Generated originals remain at the paths in generation-paths.json. Character generation output: exec-055811fb-341a-4a02-a8e6-31e15f10367f.png in the same Codex generated_images thread directory. Editable working process is preserved in refine.py plus the raster masters; layered 3D/source project files are not available from this tool. Assets are generated candidates, not independently licensed/provenance-cleared production masters; owner rights/source approval remains required.

Production decisions: table prompt requested broad muted-gloss marble/brass surface and low pedestal; mat requested flat dark leather and warm light; passport requested closed flat navy booklet with large PASSPORT title and no personal information; wallet requested closed brown leather, gold star and broad alternating navy/ivory stripe strap; stand prompt requested blank flat face, matching brass body and clean alpha. Character concept requested fictional Mara/Owen appearance proposals consistent with prior visual brief. Canvas normalization used Pillow's LANCZOS resampling to exact Proposal B aspect ratios; no geometry offsets, origin changes, art-layer relocation or hidden scaling factors were applied. Stand numerals use installed Windows Arial Bold at identical size/alignment and color on copies of the one blank master. Local font sourcing is recorded; deployment/production rights review is not claimed.

## Candidate integrity

All six are actual PNG/RGBA with alpha range 0–255; white/dark-gray/warm-lounge panels show genuine exterior transparency, no visible baked checkerboards or opaque rectangles, and no conspicuous black/white matte halos at inspected scale. Full source-resolution professional edge review remains outstanding. Some alpha bounds touch canvas edges and many pixels have partial alpha; no blanket opacity correction was applied.

| Candidate | Dimensions | Fully transparent | Review |
|---|---|---:|---|
| Table | 1280×900 | 30.3031% | Conditional: improved support; steep perspective/gloss and tight side margins remain |
| Mat | 800×630 | 51.7708% | Conditional: passport associated, empty mat clear; perspective harmonization review |
| Passport | 640×540 | 46.4566% | Conditional: distinct booklet, tiny at 320; no readable personal information |
| Wallet | 800×540 | 38.3134% | Conditional: closed, star and broad stripes visible; resting perspective still needs owner judgment |
| Stand 12 | 768×648 | 38.6359% | Technical pass: matched body, readable numeral; final edge/contact review |
| Stand 21 | 768×648 | 38.6359% | Technical pass: matched body, readable numeral; final edge/contact review |

verification.json records byte counts, alpha bounds, partial-alpha percentages and protected input hashes. Normalized envelope ratios match Proposal B exactly. That prevents runtime aspect-ratio mismatch; it does not prove generated shape proportions are artistically ideal.

## Desktop contact and before/after comparison

Relative to unrefined B, stands are physically consistent rather than independently shaped; mat is more strongly defined; passport silhouette is simplified; wallet gains required striped strap. Both shared tables use the same candidate and preserve their respective landmark associations.

At both locations the stand bases visually overlap the actual rear tabletop surface. Mat and passport occupy the left tabletop area with a visible mat border. Wallet occupies the foreground surface fully without the earlier front-rim crossing. There is no significant floating gap evident in the refined composites. Inspection concerns actual tabletop surface/contact, not merely alpha-envelope overlap. Highlights remain strong, table viewpoint remains steeper than background furniture, and contact shadows are subtle; this is conditional visual acceptance, not a measured physical simulation.

The original and changed snapshots reuse every stable pixel source. Desktop ordering remains the supplied Proposal B visual ordering. Background and Owen backpack were unchanged: no specific new defect justified replacement. No runtime characters were inserted.

## Wallet and stand checks

Wallet's star remains unobscured to the left of its broad navy/ivory striped strap. The same closed candidate is reused before/after. At desktop both details are clear. Mobile stripes remain visible but tiny, particularly at 320 pixels; human recognition confirmation is required.

Stand overlay/difference inspection: automated equality outside the union of the two rendered numeral masks passed. This comparison includes all RGB body pixels; both copies also share unchanged silhouette alpha. stand-numeral-difference.png shows only the numeral change. Frame, base, perspective, padding and contact points are identical. These are one physical design, not separate generated stands.

## Mobile and interaction alignment

Actual full-scene 390/320 images were visually inspected. 12 and 21 are distinguishable, passport and mat are distinct, wallet star and stripes can be seen, and contact relationships remain clearer than earlier proofs. Passport width is only 27.3px at 390 and 22.4px at 320 before its transparent margins: text cannot be treated as reliably readable, and recognition requires human QA. No enlargement of the working proposal was applied. Cropping/padding in the future application may reduce perceived size further.

Automated region bounds and nonoverlap checks passed without any edits to B regions. Each remains linked to its original ObjectId. Remembered passport location is retained after removal, and existing change/evidence IDs establish either stand as the same exchange. Regions at 320 full width are 51.2×44.1px, but they are larger than visible objects and partly include surrounding surface. Stand regions cover the numeral faces but not the complete base. This is mathematically compatible, not proof of touch usability; device and human target-selection QA remains necessary.

Canonical check passed: only passport visual removal, stand exchange and wallet movement differ; same background, table, mat and backpack persist. difference-mask.png reflects numeral differences at the two stands plus passport/old-new wallet regions; identical stand bodies appropriately do not differ. Story truth, stable IDs and evidence mappings remain unchanged.

## Characters and remaining gate

character-concept-reference.png supplies front/three-quarter appearance proposals, Mara left and Owen right. These are owner-unapproved concepts, not final CIN-01 continuity sheets; poses, costume continuity, likeness/source rights and stylization need approval. character-placement-zones.png marks possible seated zones outside critical clue envelopes; it is an annotation mockup, not a rendered character insertion or validated seating anatomy. No production background modification or new runtime object is proposed here. Final stable character treatment remains pending owner decision.

Remaining acceptance conditions: owner review of tabletop/document viewpoint and gloss; source-resolution alpha/padding retouch inspection; human passport/star/stripe recognition and touch QA at actual padded 320/390 widths; character visual identity/treatment and rights approval. No human playtesting, browser accessibility test or production-ready claim is made.

Next gate: owner reviews these candidates and identifies any targeted asset retouch requirements. Only after art and geometry are separately accepted should canonical adoption be authorized with corresponding fidelity validation. Do not implement T17 on the strength of this conditional pass.

All outputs are isolated in B-art-refinement. Protected-source hash checks passed. No production asset, previous artifact, case data, frozen/governance document, application/domain/loader/schema/test file, dependency or tracker status was changed. No installation, commit or push.
