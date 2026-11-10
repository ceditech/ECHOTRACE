# Asset origin and rights reconciliation

A12 groups mixed sources. A06 and A07 share one generated stand body. The [machine-readable ledger](asset-origin-reconciliation.json) includes evidence hashes, upstream IDs, remaining questions and [terms references](OPENAI_TERMS_REVIEW.md).

| ID | Asset | Origin classification | Recorded tool or provider |
| --- | --- | --- | --- |
| A01 | Background | ORIGIN UNRESOLVED | Unknown |
| A02 | Furniture | AI-GENERATED — DIRECT EVIDENCE, CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Built-in image generation for the refined output |
| A03 | Document mat | AI-GENERATED — DIRECT EVIDENCE, CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Built-in image generation for the refined output |
| A04 | Passport | AI-GENERATED — DIRECT EVIDENCE, CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Built-in image generation for the refined output |
| A05 | Wallet | AI-GENERATED — DIRECT EVIDENCE, CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Built-in image generation for the refined output |
| A06 | Table stand12 | AI-GENERATED — DIRECT EVIDENCE, CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Built-in image generation for the shared blank master |
| A07 | Table stand21 | AI-GENERATED — DIRECT EVIDENCE, CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Built-in image generation for the shared blank master |
| A08 | Mara character | AI-GENERATED — DIRECT EVIDENCE, CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Built-in image generation recorded in character placement history |
| A09 | Owen character | AI-GENERATED — DIRECT EVIDENCE, CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Built-in image generation recorded in character placement history |
| A10 | Font input record | EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | No generation service evidenced for the font |
| A11 | Owner-provided reference | EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED, ORIGIN UNRESOLVED | Unknown for the exact active sheet |
| A12 | Other upstream visual references | AI-GENERATED — DIRECT EVIDENCE, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED, ORIGIN UNRESOLVED | Built-in image generation for recorded concept, table proof and earlier cutouts only |
| A13 | Derived static character layer | CODEX-COMPOSED / TRANSFORMED | Local composition tooling |
| A14 | B0 control composites | CODEX-COMPOSED / TRANSFORMED | Local composition tooling |
| A15 | C1a passport derivative | CODEX-COMPOSED / TRANSFORMED | Local pixel-processing tooling |
| A16 | C2a stand derivatives | CODEX-COMPOSED / TRANSFORMED, EXTERNAL REFERENCE — SOURCE REVIEW REQUIRED | Local raster and pixel-processing tooling |
| A17 | Exact CCV combined pair | CODEX-COMPOSED / TRANSFORMED | Local composition tooling |
| A18 | Owen backpack | ORIGIN UNRESOLVED | Unknown |

### A01 · Background

- [lounge-background.webp](../../../../public/assets/cases/case-001/lounge-background.webp) · 394291387030b6f3149a6a767796c08518ee3855908f44c3043b9e82c40fc03d

**A. AI-service output rights** · No asset-specific service agreement can be assigned to the unresolved origin.

**B. Input and reference rights** · Scene background also appears as a lighting reference in earlier character work.

**C. Downstream composition rights** · Use in a downstream artifact requires coverage for the identified role. The repository fingerprint establishes file identity.

**Chain** · Existing1920x1080 repository background → unchanged source resized to960x540 → B0/CCV. No distinct regenerated refined-background asset is established.

**Confidence** · Exact identity and use verified. Origin unresolved. Owner statement supplies project-level context only.

**Next action** · Identify the source and creation context of this exact file and any material input.

Evidence records

- [inventory.json](../../../../artifacts/asset-validation/case-001/inventory.json)
- [REPORT.md](../../../../artifacts/asset-validation/case-001/REPORT.md)
- [study.py](../../../../artifacts/asset-validation/case-001/composition-correction-study/study.py)
- [COMBINATION_METHOD.md](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/COMBINATION_METHOD.md)


### A02 · Furniture

- [table-candidate.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/table-candidate.png) · 2417c34daa3cdaf8ee5b3c8b6418b5ce123cf0eb1a657ca148de9bb4c0da85a8
- [table-candidate.png](../../../../artifacts/asset-validation/case-001/table-proof/table-candidate.png) · 20454fbf9d270ad62076df5993574ca44e23b56b5996bf9bb7cfaadc40e0ce5c
- [table.png](../../../../public/assets/cases/case-001/table.png) · a9a4373fc8db98fee1c286f288502507c4cbeb4479ace128278ed9550670219b

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Table proof and its earlier public table reference. Original public asset origin unresolved.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Public table reference → table-proof generated candidate → refined generated table → normalization/composition. External generated master path recorded, not read or byte-verified.

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Tie the refined output to its account and agreement, and trace the material table reference through the proof.

Evidence records

- [REPORT.md](../../../../artifacts/asset-validation/case-001/table-proof/REPORT.md)
- [REPORT.md](../../../../artifacts/asset-validation/case-001/B-art-refinement/REPORT.md)
- [generation-paths.json](../../../../artifacts/asset-validation/case-001/B-art-refinement/generation-paths.json)
- [refine.py](../../../../artifacts/asset-validation/case-001/B-art-refinement/refine.py)


### A03 · Document mat

- [document-mat-candidate.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/document-mat-candidate.png) · 655f0f2f8df1f580f5b8e511636910c583a5831a2cfafb27ba054e77fbe33fa9
- [document-mat.png](../../../../public/assets/cases/case-001/document-mat.png) · 4b8c7a1656cf6e607c8fd0566b579e0fcfa2e462e44436537f2646406cb7e616

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Recorded public mat input. Upstream origin unresolved.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Public source used as recorded reference → generated refined mat → normalization → unchanged B0/CCV mat

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Verify source and applicable input authority for the public mat.

Evidence records

- [REPORT.md](../../../../artifacts/asset-validation/case-001/B-art-refinement/REPORT.md)
- [generation-paths.json](../../../../artifacts/asset-validation/case-001/B-art-refinement/generation-paths.json)
- [refine.py](../../../../artifacts/asset-validation/case-001/B-art-refinement/refine.py)


### A04 · Passport

- [passport-candidate.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/passport-candidate.png) · 6d53912426aa5a3f1eae2de4a4ab48826c3d8f3e242783083602d96a01429a06
- [passport.png](../../../../public/assets/cases/case-001/passport.png) · 83920d74c1c3b12d5c36ddc64e73a302f7bf6165d3f51fd27aadfa32f1a118a4

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Recorded public passport input. Upstream origin unresolved.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Public passport reference → generated refined booklet → normalized640x540 parent of C1a

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Verify source and applicable input authority for the public passport.

Evidence records

- [REPORT.md](../../../../artifacts/asset-validation/case-001/B-art-refinement/REPORT.md)
- [generation-paths.json](../../../../artifacts/asset-validation/case-001/B-art-refinement/generation-paths.json)
- [refine.py](../../../../artifacts/asset-validation/case-001/B-art-refinement/refine.py)


### A05 · Wallet

- [star-wallet-candidate.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/star-wallet-candidate.png) · 20d9d42b798adf1bc2ba4efee1edba1220df4b21fa9ff03a66702c295d69add6
- [star-wallet.png](../../../../public/assets/cases/case-001/star-wallet.png) · 2c1c197917ae4e152444cf824b87a815b5d3388516b301ea6a196675a31bb338

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Recorded public wallet input. Upstream origin unresolved.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Public wallet reference → generated refined closed star/stripe wallet → normalized shared source → B0/CCV endpoints

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Verify source and applicable input authority for the public wallet.

Evidence records

- [REPORT.md](../../../../artifacts/asset-validation/case-001/B-art-refinement/REPORT.md)
- [generation-paths.json](../../../../artifacts/asset-validation/case-001/B-art-refinement/generation-paths.json)
- [refine.py](../../../../artifacts/asset-validation/case-001/B-art-refinement/refine.py)
- [COMBINATION_METHOD.md](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/COMBINATION_METHOD.md)


### A06 · Table stand12

- [stand-12-candidate.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/stand-12-candidate.png) · 691442aeacbfd0f677b3665ea3e4399cc54fbd596e93344aab680b4fc8fe72ee
- [stand-master-candidate.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/stand-master-candidate.png) · 9ca1b88820af33ad5b5e85c1f306e8edbfac029fc64bfc6b09c8963477f0bb89
- [stand-12.png](../../../../public/assets/cases/case-001/stand-12.png) · f70bc518dda3bb73baccb7b56ebe783ee4cc732b93cfabfb973766d6fe3a7b22

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Recorded stand references and Arial Bold raster input. The exact per-reference generation linkage is incomplete.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Recorded stand references → generated blank master → Arial Bold260 centered12 plus2px stroke → refined stand12

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Resolve the shared master cohort, material stand references and one common raster-use question.

Evidence records

- [REPORT.md](../../../../artifacts/asset-validation/case-001/B-art-refinement/REPORT.md)
- [generation-paths.json](../../../../artifacts/asset-validation/case-001/B-art-refinement/generation-paths.json)
- [refine.py](../../../../artifacts/asset-validation/case-001/B-art-refinement/refine.py)


### A07 · Table stand21

- [stand-21-candidate.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/stand-21-candidate.png) · 4016cb44452c0876671f3938e7f9a519162c819b54971044d0fdee95464733fc
- [stand-master-candidate.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/stand-master-candidate.png) · 9ca1b88820af33ad5b5e85c1f306e8edbfac029fc64bfc6b09c8963477f0bb89
- [stand-21.png](../../../../public/assets/cases/case-001/stand-21.png) · 6c82b1ad5d7cf7eb7ef2263d19d42f0516f0e0eb21e2bae46da808743e62b1eb

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Recorded stand references and Arial Bold raster input. The exact per-reference generation linkage is incomplete.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Same blank master/font/alignment as12; numeral21 → refined stand21

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Use the same master and raster evidence as A06.

Evidence records

- [REPORT.md](../../../../artifacts/asset-validation/case-001/B-art-refinement/REPORT.md)
- [generation-paths.json](../../../../artifacts/asset-validation/case-001/B-art-refinement/generation-paths.json)
- [refine.py](../../../../artifacts/asset-validation/case-001/B-art-refinement/refine.py)


### A08 · Mara character

- [mara-generated-cutout.png](../../../../artifacts/asset-validation/case-001/character-placement-proof/mara-generated-cutout.png) · c74abdc18b74a786a98b54a74467696dfc46d3fbd6bf6ac9053aa01a04fd0115

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Active owner-supplied revised sheet and earlier concept/pose lineage.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Earlier concept/pose cutout → owner revised sheet authority → two correction passes, mara_selected record retained → cropped/scaled cutout in B0

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Confirm creation and permitted use of the exact active sheet and material earlier pose inputs.

Evidence records

- [generation.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/generation.json)
- [generation.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/superseded/generation.json)
- [REPORT.md](../../../../artifacts/asset-validation/case-001/character-placement-proof/REPORT.md)
- [PREFLIGHT.md](../../../../artifacts/asset-validation/case-001/character-placement-proof/PREFLIGHT.md)
- [placement-zones.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/placement-zones.json)


### A09 · Owen character

- [owen-generated-cutout.png](../../../../artifacts/asset-validation/case-001/character-placement-proof/owen-generated-cutout.png) · 42c312d33720d24b4b9ed58cc8c15f396843a191593f346975ddaa3d0d5996c0

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Generated paired concept, earlier Owen pose and style influence from the active Mara sheet. No separate owner-supplied Owen sheet established.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Generated paired concept/earlier Owen cutout → style harmonization using owner Mara sheet and existing Owen pose → current Owen; no separate owner-supplied Owen sheet established

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Trace material concept and pose inputs and confirm whether the applicable Mara authority covers this reuse.

Evidence records

- [generation.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/generation.json)
- [generation.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/superseded/generation.json)
- [REPORT.md](../../../../artifacts/asset-validation/case-001/character-placement-proof/REPORT.md)
- [PREFLIGHT.md](../../../../artifacts/asset-validation/case-001/character-placement-proof/PREFLIGHT.md)
- [placement-zones.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/placement-zones.json)


### A10 · Font input record

- [source-manifest.json](../../../../artifacts/asset-validation/case-001/visual-correction-study/source-manifest.json) · 97b42696e88111b23d293db5476f889a495e6548061742455f2d8bb569a6f6d3

**A. AI-service output rights** · No independent AI generation shown for this category. Any output-rights basis comes from its inputs.

**B. Input and reference rights** · Arial Bold used to rasterize stand numerals. Repository metadata records the historical font fingerprint.

**C. Downstream composition rights** · Use in a downstream artifact requires coverage for the identified role. The repository fingerprint establishes file identity.

**Chain** · Repository records identify C:/Windows/Fonts/arialbd.ttf and its historical fingerprint; refined/VCS scripts record raster text rendering. External font not opened/copied/rehashed.

**Confidence** · Repository evidence for custody, dependency or transformation; original authority unverified.

**Next action** · Confirm the terms applicable to raster numeral output in this workflow.

Evidence records

- [refine.py](../../../../artifacts/asset-validation/case-001/B-art-refinement/refine.py)
- [study.py](../../../../artifacts/asset-validation/case-001/visual-correction-study/scripts/study.py)
- [source-manifest.json](../../../../artifacts/asset-validation/case-001/visual-correction-study/source-manifest.json)


### A11 · Owner-provided reference

- [owner-mara-reference.png](../../../../artifacts/asset-validation/case-001/character-placement-proof/owner-mara-reference.png) · 780dcca0ef04eab3312bcde77cb069d0b7a83c2896f0690eca4b230589b2c8ec

**A. AI-service output rights** · No asset-specific service agreement can be assigned to the unresolved origin.

**B. Input and reference rights** · Exact owner-supplied Mara sheet. Custody and usage are documented. Its upstream origin and permissions remain unverified.

**C. Downstream composition rights** · Use in a downstream artifact requires coverage for the identified role. The repository fingerprint establishes file identity.

**Chain** · Owner reference asserted by PREFLIGHT/REPORT/generation record; retained hash780d... matches current file. Owner-supplied does not establish owner-owned.

**Confidence** · Repository evidence for custody, dependency or transformation; original authority unverified.

**Next action** · Ask for the sheet’s creation record or a focused owner account with evidence of use authority.

Evidence records

- [PREFLIGHT.md](../../../../artifacts/asset-validation/case-001/character-placement-proof/PREFLIGHT.md)
- [REPORT.md](../../../../artifacts/asset-validation/case-001/character-placement-proof/REPORT.md)
- [generation.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/generation.json)


### A12 · Other upstream visual references

- [character-concept-reference.png](../../../../artifacts/asset-validation/case-001/B-art-refinement/character-concept-reference.png) · 41a967df7344d06e3d4dde8e9fb4803ffd4fd4103caf3dcd1ecfafb281b11648
- [table-candidate.png](../../../../artifacts/asset-validation/case-001/table-proof/table-candidate.png) · 20454fbf9d270ad62076df5993574ca44e23b56b5996bf9bb7cfaadc40e0ce5c
- [table.png](../../../../public/assets/cases/case-001/table.png) · a9a4373fc8db98fee1c286f288502507c4cbeb4479ace128278ed9550670219b
- [document-mat.png](../../../../public/assets/cases/case-001/document-mat.png) · 4b8c7a1656cf6e607c8fd0566b579e0fcfa2e462e44436537f2646406cb7e616
- [passport.png](../../../../public/assets/cases/case-001/passport.png) · 83920d74c1c3b12d5c36ddc64e73a302f7bf6165d3f51fd27aadfa32f1a118a4
- [star-wallet.png](../../../../public/assets/cases/case-001/star-wallet.png) · 2c1c197917ae4e152444cf824b87a815b5d3388516b301ea6a196675a31bb338
- [stand-12.png](../../../../public/assets/cases/case-001/stand-12.png) · f70bc518dda3bb73baccb7b56ebe783ee4cc732b93cfabfb973766d6fe3a7b22
- [stand-21.png](../../../../public/assets/cases/case-001/stand-21.png) · 6c82b1ad5d7cf7eb7ef2263d19d42f0516f0e0eb21e2bae46da808743e62b1eb
- [mara-generated-cutout.png](../../../../artifacts/asset-validation/case-001/character-placement-proof/superseded/mara-generated-cutout.png) · 52e54b64f7e1a114ec5a71023253b620d7357105325e1e09d4c9dfad22ef0ec7
- [owen-generated-cutout.png](../../../../artifacts/asset-validation/case-001/character-placement-proof/superseded/owen-generated-cutout.png) · f3fc36a298387646231f4c29b279fd79340cb0c07cb70c0a27981b03bba3e16d

**A. AI-service output rights** · Current individual terms support ownership conditionally for covered output. Original account, service and agreement still need linkage.

**B. Input and reference rights** · Mixed reference group. Public originals lack reliable provider attribution. The public background also appears as a lighting reference. A related Mara v2 image is not linked to the exact active sheet.

**C. Downstream composition rights** · Use in a downstream artifact requires coverage for the identified role. The repository fingerprint establishes file identity.

**Chain** · Refinement references original public props/table proof; superseded generation references generated paired concept and public background for lighting. Earlier pose inputs are recorded; external original mapping remains partial.

**Confidence** · Direct repository evidence for recorded generated portions; underlying authority unverified.

**Next action** · Resolve the actual material inputs by path and cohort. Reuse evidence for repeated references.

Evidence records

- [REPORT.md](../../../../artifacts/asset-validation/case-001/B-art-refinement/REPORT.md)
- [generation-paths.json](../../../../artifacts/asset-validation/case-001/B-art-refinement/generation-paths.json)
- [generation.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/superseded/generation.json)
- [generation.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/generation.json)
- [REPORT.md](../../../../artifacts/asset-validation/case-001/table-proof/REPORT.md)


### A13 · Derived static character layer

- [static-character-layer.png](../../../../artifacts/asset-validation/case-001/character-placement-proof/static-character-layer.png) · 9a2adff0ad0e35b7cfa16e891936ffe66c44e55e6e739e1ab4185fdf581244d4

**A. AI-service output rights** · No independent AI generation shown for this category. Any output-rights basis comes from its inputs.

**B. Input and reference rights** · Mara and Owen cutouts.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Existing cutout crops/uniform thumbnails/recorded positions plus existing chair occluder → combined static layer → B0/CCV

**Confidence** · Repository evidence for custody, dependency or transformation; original authority unverified.

**Next action** · Carry forward character input and use evidence.

Evidence records

- [compose.py](../../../../artifacts/asset-validation/case-001/character-placement-proof/compose.py)
- [placement-zones.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/placement-zones.json)
- [occlusion-analysis.json](../../../../artifacts/asset-validation/case-001/character-placement-proof/occlusion-analysis.json)
- [REPORT.md](../../../../artifacts/asset-validation/case-001/character-placement-proof/REPORT.md)


### A14 · B0 control composites

- [original-960.png](../../../../artifacts/asset-validation/case-001/visual-correction-study/candidates/B0/original-960.png) · 89bf6885dadb3851893710a14db533573a5d6707b13850bc973ad1170abce54e
- [changed-960.png](../../../../artifacts/asset-validation/case-001/visual-correction-study/candidates/B0/changed-960.png) · 7e98dc2b023cfb6dda0cb58e41e9322934d032915bd280904bd9cc094ff17c9b
- [original-960.png](../../../../artifacts/asset-validation/case-001/composition-correction-study/B/original-960.png) · 89bf6885dadb3851893710a14db533573a5d6707b13850bc973ad1170abce54e
- [changed-960.png](../../../../artifacts/asset-validation/case-001/composition-correction-study/B/changed-960.png) · 7e98dc2b023cfb6dda0cb58e41e9322934d032915bd280904bd9cc094ff17c9b

**A. AI-service output rights** · No independent AI generation shown for this category. Any output-rights basis comes from its inputs.

**B. Input and reference rights** · Background, props, static character layer and backpack.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Documented source-layer compositor with research geometry → refined B pair → byte-exact VCS B0 copies

**Confidence** · Repository evidence for custody, dependency or transformation; original authority unverified.

**Next action** · Carry forward source rights into the B0 control and intended downstream distribution.

Evidence records

- [study.py](../../../../artifacts/asset-validation/case-001/composition-correction-study/study.py)
- [candidate-manifest.json](../../../../artifacts/asset-validation/case-001/visual-correction-study/candidate-manifest.json)
- [VERIFICATION_REPORT.md](../../../../artifacts/asset-validation/case-001/visual-correction-study/VERIFICATION_REPORT.md)
- [COMBINATION_METHOD.md](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/COMBINATION_METHOD.md)


### A15 · C1a passport derivative

- [object-passport.png](../../../../artifacts/asset-validation/case-001/visual-correction-study/candidates/C1a/assets/object-passport.png) · f2f992d0a463a8643aab1ccaa2023452cad0cb900e94e14cac89e7dc677c83c7

**A. AI-service output rights** · No independent AI generation shown for this category. Any output-rights basis comes from its inputs.

**B. Input and reference rights** · Refined passport.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Recorded deterministic smooth navy-cover tone increments10/14/18, unchanged alpha/size → C1a source → CCV Original

**Confidence** · Repository evidence for custody, dependency or transformation; original authority unverified.

**Next action** · Carry forward A04 coverage for contrast retouch and raster embedding.

Evidence records

- [study.py](../../../../artifacts/asset-validation/case-001/visual-correction-study/scripts/study.py)
- [candidate-manifest.json](../../../../artifacts/asset-validation/case-001/visual-correction-study/candidate-manifest.json)
- [PASSPORT_CONTRAST_STUDY.md](../../../../artifacts/asset-validation/case-001/visual-correction-study/PASSPORT_CONTRAST_STUDY.md)
- [source-manifest.json](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/source-manifest.json)


### A16 · C2a stand derivatives

- [object-stand-12.png](../../../../artifacts/asset-validation/case-001/visual-correction-study/candidates/C2a/assets/object-stand-12.png) · af29d5e023f01db8247a0087ff3ffc20fb5fad50ca464e5fc3b8170ff81fa284
- [object-stand-21.png](../../../../artifacts/asset-validation/case-001/visual-correction-study/candidates/C2a/assets/object-stand-21.png) · a5800bba6e6460b9accd2106365239988a81f57ecc0209c7c5536fa2614da41f

**A. AI-service output rights** · No independent AI generation shown for this category. Any output-rights basis comes from its inputs.

**B. Input and reference rights** · Refined stands plus font raster use.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Same existing blank master/font260/alignment/stroke; lighter fill255/232/160 within original numeral ROI → exact C2a12/21 rasters

**Confidence** · Repository evidence for custody, dependency or transformation; original authority unverified.

**Next action** · Carry forward A06–A07 and confirm A10 raster scope once.

Evidence records

- [study.py](../../../../artifacts/asset-validation/case-001/visual-correction-study/scripts/study.py)
- [candidate-manifest.json](../../../../artifacts/asset-validation/case-001/visual-correction-study/candidate-manifest.json)
- [NUMERAL_TREATMENT_STUDY.md](../../../../artifacts/asset-validation/case-001/visual-correction-study/NUMERAL_TREATMENT_STUDY.md)
- [source-manifest.json](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/source-manifest.json)


### A17 · Exact CCV combined pair

- [CCV-C1a-C2a-B0-Original-960.png](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/candidate/CCV-C1a-C2a-B0-Original-960.png) · d7a4bbb6c141b1c2b9d15c38591f16ff6bc4d80629cad0877ce05a43a2993945
- [CCV-C1a-C2a-B0-Changed-960.png](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/candidate/CCV-C1a-C2a-B0-Changed-960.png) · 4668c32059ec29c4b087f2efcd46f8e64d2829c042545228b6e2031df5cde7ba

**A. AI-service output rights** · No independent AI generation shown for this category. Any output-rights basis comes from its inputs.

**B. Input and reference rights** · B0 staging, C1a passport, and C2a stands. See transitive upstream inputs.

**C. Downstream composition rights** · Coverage follows the material inputs and their edit, embedding and distribution scope. Recorded deterministic work adds no separate stock acquisition basis.

**Chain** · Exact selected source assets and B0 staging → source recomposition; archived proof equals disjoint RGB-mask union; exact output hashes preserved

**Confidence** · Repository evidence for custody, dependency or transformation; original authority unverified.

**Next action** · Record one coverage schedule for the exact pair, including edits and intended distribution.

Evidence records

- [COMBINATION_METHOD.md](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/COMBINATION_METHOD.md)
- [source-manifest.json](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/source-manifest.json)
- [measurements.json](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/measurements.json)
- [verification.json](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/verification.json)
- [reproduce-combination.py](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/scripts/reproduce-combination.py)


### A18 · Owen backpack

- [owen-backpack.png](../../../../public/assets/cases/case-001/owen-backpack.png) · 50909a9cd018ce38da0072fb77ce6d6003d4e2aa18d3452253af18f08a923651

**A. AI-service output rights** · No asset-specific service agreement can be assigned to the unresolved origin.

**B. Input and reference rights** · Backpack is a distinct rendered input. Repository custody and later placement do not establish creation origin.

**C. Downstream composition rights** · Use in a downstream artifact requires coverage for the identified role. The repository fingerprint establishes file identity.

**Chain** · Existing repository backpack source → unchanged scaled prop layer → both scene endpoints

**Confidence** · Exact identity and use verified. Origin unresolved. Owner statement supplies project-level context only.

**Next action** · Identify the source and creation context of this exact file and any material input.

Evidence records

- [inventory.json](../../../../artifacts/asset-validation/case-001/inventory.json)
- [REPORT.md](../../../../artifacts/asset-validation/case-001/REPORT.md)
- [study.py](../../../../artifacts/asset-validation/case-001/composition-correction-study/study.py)
- [reproduce-combination.py](../../../../artifacts/asset-validation/case-001/controlled-combination-validation/scripts/reproduce-combination.py)
