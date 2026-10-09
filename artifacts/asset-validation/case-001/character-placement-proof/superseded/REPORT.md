# T17 Mara / Owen character-placement proof

Date: 2026-10-09. Scope: controlled creative preflight and isolated offline visual prototyping.

**Recommendation: CONDITIONAL GO for owner visual review of option B, using the original paired portrait treatment.** The proof demonstrates stable visible people and protected clues without adopting Proposal B geometry. It is not final art acceptance, production adoption, T17 implementation or CIN-01 authorization. Seating scale, Owen's physical-table association, visual identity and human mobile recognition remain owner-review conditions.

## 1. Source inspection and narrative fidelity

Read relevant source requirements from AGENTS.md, ROADMAP.md, TRACKER.md, PRD.md, GAME_SPEC.md, ARCHITECTURE.md, CASE_AUTHORING_GUIDE.md, frozen `docs/cases/CASE_001_THE_MISSING_PASSPORT.md`, canonical case.json, B-art-refinement/REPORT.md and final-art-qa/REPORT.md. Inspected the existing lounge background, refined B original/changed scenes and mobile previews, proposed-scenes.json, geometry-diff.json, original paired portrait sheet, Mara v2 sheet, placement-zone mockup and stable/changing scene assets. Earlier native asset QA remains applicable; this proof does not retouch those assets or override its outstanding gates.

Chronology was resolved **before composites** in PREFLIGHT.md. The frozen dossier's ordered timeline (§7) is the precise snapshot guide:

| Story stage | Snapshot significance |
|---|---|
| Setup/request, orders 1–2 | Documents belong to Mara at window table; written pickup/return instruction established |
| Observation, order 3 | Original scene: window 12, plant 21; loose passport and closed wallet at window |
| Mara away, order 4 | Private call occurs after original snapshot |
| Exchange, order 5 | Nia exchanges stands while Mara is away |
| Collection/enclosure/delivery, orders 6–8 | Ellis collects at window, encloses passport at counter and returns wallet by current 12 to plant table |
| Owen checks/recloses, order 9 | Closed wallet is the changed endpoint state |
| Mara returns/notices absence, order 10 | Before changed investigation scene |
| Investigation, order 11 | Changed scene: window 21, plant 12; mat empty; wallet at plant table |

The abbreviated custody summary omits the observation moment; it does not move observation after Mara's departure. Briefing is retrospective, and transition compresses story time. No new story action was invented to accommodate placement.

Section 8 explicitly states: **“Mara occupies the same place in both snapshots; her temporary absence is between them.”** This proof honors that as stable visible endpoint presence. The same neutral seated artwork is reused as requested; it does not assert she never left, returned without noticing the documents, or had a canonical emotional expression. Exact pose/expression remains a treatment decision.

Owen is the traveler associated with the plant-side table. Continuous visible presence in both snapshots is not explicitly mandated, but no departure/seat-change event is authored. Stable seated Owen is a compatible proposal, not a newly canonical fact. No unresolved timeline conflict requires stopping this proof. Owner approval is still needed for the proposed staging, and the dossier remains authoritative if later interpretation differs.

## 2. Identity and cinematic continuity

| Reference | Findings | Recommendation |
|---|---|---|
| Mara original, left of paired sheet | Natural cinematic face; tied-back dark waves; teal jacket over cream ribbed top; apparent adult roughly early/mid thirties; compatible with lounge lighting and Owen's portrait | Use as this proof's identity reference, subject to approval |
| Mara v2 | More stylized facial proportions/larger eyes; loose shoulder-length hair; cream trousers, jewelry/watch/handbag details; somewhat younger apparent presentation | Treat as a distinct unapproved treatment, not an interchangeable angle. Do not blend its face/accessory design silently into the earlier identity |
| Owen original, right of paired sheet | Dark short waves, stubble, navy bomber and light gray shirt; similar apparent adult age; shares original Mara's realism and warm light | Retain this reference for the proof |

See character-identity-comparison.png. Apparent ages are visual estimates, not authored character ages. Neither sheet is canonical or independently likeness/provenance cleared. The reference images' own labels do not constitute owner approval.

Narrow harmonization proposal: retain the original pair's faces, hair and clothing; use the same natural cinematic shading for both seated figures. No unrelated alternate identities were generated. Generated Mara adds plain cream trousers/loafers and Owen plain dark trousers/shoes to complete seated bodies. These are proposed clothing details, not new clues. No handbag, phone, document, wallet, cup or other prop was introduced.

CIN-01 has planning approval only. The same selected identity treatment could supply later continuity, but no approved cinematic identity or storyboard currently exists. If Mara v2 is selected instead, Owen would require a narrowly scoped matching style treatment and a new shared review; this proof cannot certify that alternate continuity. No cinematic media was produced.

## 3. Smallest useful treatment alternatives

| Option | Actual proof method and quality | Occlusion / mobile / continuity | Future runtime implications and risks |
|---|---|---|---|
| A — background integrated | Flatten the approved-for-review static cutouts and existing chair occlusion onto a **copy** of the unchanged background; render all existing B props in front. background-integrated-proposal.png is actual inspectable output, not a generated replacement of the whole lounge | Same visible endpoints as B. People remain identifiable as human figures in static mobile inspection. Shared fixed background prevents character drift, but locks seating/identity into the background | Could reduce layering work later, but entails a distinct background derivative and less flexible revisions. Background-only file exposes Owen's legs before foreground tables are rendered; assess final scene, not this intermediate alone. Any production format/resolution choice remains separate |
| B — separate offline layers | Two actual transparent generated cutouts, uniformly scaled; combined immutable static-character-layer.png sits behind existing authored objects, with the existing foreground chair occluding Mara's lower figure | Exactly the same final pixels as A in this controlled proof. Identity can be revised without regenerating the lounge. Positions, pose, lighting and visibility identical across snapshots | Preferred for **review** because transformations and occlusion are explicit/reversible. A later implementation would need owner-approved display layering and lifecycle handling; this proof introduces no runtime character IDs, objects, sprites or code |
| C — constrained fallback | Not produced: A/B are sufficiently feasible for conditional visual review | Deferring all presence to testimony/cinematic would not automatically honor stable Mara endpoint presence | Any deferral or environment/seating redesign requires a separate owner decision. Do not use it as a silent workaround |

A and B are technical treatment alternatives sharing one composition, not unrelated artistic variants. Their pixel equivalence allows one common desktop/mobile preview set rather than duplicating identical outputs. The script compares both rendering paths; production encoding is not implemented.

## 4. Exact final proposed placement

All values are offline transforms on a 960×540 canvas. **Every existing B object coordinate, size, rotation, region and endpoint is unchanged.** Character zones are proposals only; source crops remove transparent margins before uniform scaling.

| Character | Previous hypothesis | Final full layer envelope | Normalized top-left; size | Visible effective bounds after furniture (alpha >8) |
|---|---|---|---|---|
| Mara | `(12,375)–(105,515)` | `(5,292)–(133,522)`, 128×230 | `(0.0052083,0.5407407)`; `(0.1333333,0.4259259)` | `(6,293)–(97,434)` |
| Owen | `(810,265)–(856,375)` | `(470,116)–(570,321)`, 100×205 | `(0.4895833,0.2148148)`; `(0.1041667,0.3796296)` | `(471,117)–(562,308)` |

Mara's zone expands upward and slightly left while retaining the window-side seating association. Final refinement places her below the main window glazing, with head/torso and some lap visible. The existing chair back hides lower legs. The mask polygon, in canvas pixels, is `(0,451),(247,377),(260,436),(294,466),(295,540),(0,540)`. This is a manually traced existing-furniture occlusion hypothesis, not a chair edit or new asset.

Owen's zone relocates to the existing middle chair beside the left edge of the plant-side table. The earlier 46px-wide right-side hypothesis is insufficient for a seated figure and risks plant/backpack conflict. The final proposal keeps his face clear and uses the plant-side table to occlude part of his lower/right figure. Because he is between the table silhouettes rather than at the far right chair, **owner review must confirm that the right-facing pose and adjacency communicate the correct physical table**. Do not claim that human association was tested.

placement-zones.json records source crop rectangles, exact transforms, hashes, previous zones and reasons. Prototype placement refinement changed only these offline character transforms; no source artwork was repainted or regenerated, and no B geometry was adopted.

## 5. Inspectable desktop and mobile previews

The following common preview set represents both A and B. All are actual rendered files.

- Original desktop: original-with-characters.png (960×540).
- Changed desktop: changed-with-characters.png (960×540).
- Side by side: comparison-with-characters.png (1920×540).
- Individual annotated placement evidence: mara-placement-proof.png and owen-placement-proof.png. Cyan boxes are diagnostics only.
- Mobile original/changed at 390px scene width: original-mobile-390.png and changed-mobile-390.png (390×219).
- Mobile original/changed at 320px scene width: original-mobile-320.png and changed-mobile-320.png (320×180).

![Original desktop proof](C:/Users/CedricYovodevi/sources/repo/Games/ECHOTRACE/artifacts/asset-validation/case-001/character-placement-proof/original-with-characters.png)

![Changed desktop proof](C:/Users/CedricYovodevi/sources/repo/Games/ECHOTRACE/artifacts/asset-validation/case-001/character-placement-proof/changed-with-characters.png)

![Original at 320px](C:/Users/CedricYovodevi/sources/repo/Games/ECHOTRACE/artifacts/asset-validation/case-001/character-placement-proof/original-mobile-320.png)

![Changed at 320px](C:/Users/CedricYovodevi/sources/repo/Games/ECHOTRACE/artifacts/asset-validation/case-001/character-placement-proof/changed-mobile-320.png)

![Original at 390px](C:/Users/CedricYovodevi/sources/repo/Games/ECHOTRACE/artifacts/asset-validation/case-001/character-placement-proof/original-mobile-390.png)

![Changed at 390px](C:/Users/CedricYovodevi/sources/repo/Games/ECHOTRACE/artifacts/asset-validation/case-001/character-placement-proof/changed-mobile-390.png)

At 320 and 390, the model can still identify both silhouettes as people. Mara's visible envelope is approximately 30×47px / 37×57px and Owen's 30×64px / 37×78px respectively. **These are figure bounds, not readable face dimensions.** Neither named identity nor correct table association should depend on mobile face recognition. Human attention competition remains untested, even with unchanged clue pixels.

The passport removal, stand exchange and wallet movement remain statically discernible. The prior final-art-qa passport/star/stripe recognition risks and touch-region caveats remain in force. No padded responsive layout or runtime input surface was tested.

## 6. Pixel occlusion and endpoint consistency

occlusion-analysis.json contains actual visible-pixel checks, not merely bounding-box intersection tests:

| Protected content | Result |
|---|---|
| Passport, mat, wallet, both stands, backpack in original | **0 changed pixels** under each authored alpha>0 clue mask compared with original B refinement |
| Mat, wallet, both stands, backpack in changed | **0 changed pixels** under each authored alpha>0 mask; passport remains absent |
| Mobile solid clue masks at 320/390, both endpoints | **0 changed pixels**, using resized authored alpha≥128 masks |
| All four existing B interaction rectangles | **0 character-caused RGB changes inside regions**, including remembered passport region in both endpoints |
| Main window rectangle `(0,0)–(280,220)` and glazing polygon `(0,0),(280,0),(280,218),(0,300)` | **0 changed pixels** in these reviewed landmark areas |
| Main plant foliage/pot ROI `(820,30)–(960,340)` | **0 changed pixels** |
| Character treatment | Same cutout bytes, transforms and occlusion policy at both endpoints; effective alpha visibility counts/bounds identical |
| Before/after differences | Difference mask is **identical** to the previous refined pair; **0 additional changed pixels** outside existing differences |

Landmark masks are manually reviewed regions, not automatic semantic segmentation of every window pane or plant leaf. Desktop visual inspection additionally confirms recognizable window/plant anchors and no figure over the clue silhouettes. Equal pixel preservation does not establish equal human attention or physical seating correctness.

The plain offline re-render matches the prior original-refined.png and changed-refined.png pixel-for-pixel before adding people. Tables, mat, backpack and background stay stable. Two stand visuals participate in the same canonical exchange, so the three meaningful changes remain passport removal, stand exchange and wallet movement. No character animation, disappearance, expression swap or added prop creates a fourth endpoint difference.

## 7. Perspective, seating, lighting and alpha findings

- Both figures have plausible seated bent-leg anatomy and restrained neutral poses; no malformed limb or unexplained prop was evident in model inspection. Mara's legs are intentionally hidden by existing furniture; Owen's visible shoe reaches the carpet and table overlap anchors his lower/right figure. No obvious floating gap appears in the final composites.
- **Seating is conditional:** Mara sits low against the cushion/chair area; her apparent scale versus the foreground chair and Owen's chair/contact alignment require owner visual acceptance. A traced mask and generated pose are not a measured 3D seating solution. No new chair was drawn to hide a mismatch, and no artificial contact shadow was invented.
- Owen's midground scale and Mara's foreground scale produce readable people without covering clues, but their perceived depth and table association remain moderate composition risks. Full-body source images are larger than their endpoint visibility; the hidden feet must not be mistaken for scene objects.
- Golden-hour key light from the upper left matches the window light. Skin, hair and clothing have warm edge light and restrained cooler fill. Generated portraits are sharper than distant existing lounge people, which is reasonable for named foreground/midground characters but still needs stylistic review.
- Cutouts are genuinely RGBA with exterior alpha 0 and maximum alpha 254; near-opaque material interiors predominantly 252–253 resemble the environmental candidates' minor alpha issue. Zero-alpha RGB contains the generator's colored backdrop but is not visible in correct alpha compositing. White/dark panels in cutout-alpha-inspection.png show no baked room, checkerboard or obvious wide halo. This is not a claim of production-perfect edges.
- No source retouch, extra accessory or gaze-based clue is introduced. Figures add attention demand, especially Mara's cream clothing. Only human observation testing can establish whether that distracts from the passport/star/strap after 25 seconds.

## 8. Production provenance and methods

Built-in `image_gen.imagegen` was actually used **once per character**, with transparent_background=true. Exact prompts, reference roles and original output paths are in generation.json. The paired identity sheet was used as identity reference; the lounge background as camera/light reference only. Mara v2 was inspected for comparison, not used to silently blend identity.

Original generated outputs:

- Mara: `C:/Users/CedricYovodevi/.codex/generated_images/01a12167-665e-7612-9821-6139c2a83e9d/exec-acc8ee0a-ca79-4bc9-8699-3596c9a90e6b.png`.
- Owen: `C:/Users/CedricYovodevi/.codex/generated_images/01a12167-665e-7612-9821-6139c2a83e9d/exec-e494041a-5ba5-4c44-ab21-7ce444a5a4ae.png`.

Exact copies are retained locally as mara-generated-cutout.png and owen-generated-cutout.png. Generated originals were not deleted. No subsequent artwork generation or extraction was needed; correctly composited alpha removes the apparent preview backdrop. Existing Python/Pillow renders the scene using B coordinates, uniform source-crop scaling, deterministic compositing, shared chair occlusion and LANCZOS scene downsampling. Generated art is unchanged; source crop and furniture masking are documented offline rendering transforms.

No layered 3D rig/source project is available from these outputs. No independent rights, likeness, font or provenance clearance is claimed. These remain unapproved generated treatments, not production masters.

## 9. Owner decisions and exact next gate

1. Select shared identity: this original-pair proposal versus an explicitly harmonized Mara-v2 direction. Approve faces/hair/clothing and proposed seated treatment; do not claim an existing concept is canonical.
2. Accept or request a narrowly scoped revision of final seating scale, chair support, Mara's low placement and Owen's right-table association. Any future environment edit or different character zone must be separately identified; no existing clue geometry should be moved opportunistically.
3. Choose A or B treatment after visual acceptance. B is recommended for reversible review; that is not an authorization to add runtime layers. A would require approval of a background derivative at the intended production resolution/format.
4. Conduct first-time human observation/mobile trials using the previous final-art-qa protocol, including whether the people distract from clues or confuse table ownership. Keep human findings distinct from these static metrics. Device/touch/accessibility validation is still outstanding.
5. Clear generated source/rights provenance and coordinate the selected treatment with CIN-01A creative approval. No cinematic implementation follows automatically.
6. Explicitly authorize production artwork adoption and a separately bounded T17 implementation task only after the outstanding visual/QA decisions are accepted. The present task authorizes neither.

No additional blocking narrative contradiction or measured clue occlusion was found. CONDITIONAL GO applies to **reviewing this actual proposal**, not declaring it production-ready or fully human-tested.

## 10. Verification, files and scope

Created only this isolated directory: PREFLIGHT.md, REPORT.md, generation.json, protected-before.json, compose.py, two raw cutouts, static-character-layer.png, background-integrated-proposal.png, identity/alpha comparison panels, two annotated placement proofs, original/changed desktop previews, comparison, four mobile previews, difference mask, placement-zones.json, occlusion-analysis.json and verification.json.

Executed `python artifacts/asset-validation/case-001/character-placement-proof/compose.py`: passed baseline re-render fidelity, A/B equivalence, desktop/mobile clue preservation, region/landmark checks, identical character visibility and unchanged difference-mask assertions. All **203** protected-source hashes recorded before composition still match. This includes source/public/docs/tests/root documents and all previous case-001 artifacts. B geometry SHA-256 remains `bcc6205ebd853c003e5a0869542c7b8a2365f23c6fae1da074d7acd272e71886`; canonical case.json remains `0c6a1387d3c619ac03cdba9df97a4efdd2823de26d2f83367b19dbf36b8fe976`.

`git diff --check` passed; no tracked source diff; status shows only this new proof folder. Application lint/type/unit/integration/build/E2E checks were not run because application and production data/assets were untouched. No human recognition/device/touch test was performed. No dependencies installed, canonical geometry edits, production replacements, runtime IDs/objects/sprites, application changes, governance status changes, T17/CIN-01 implementation, commit or push.

T17 CHARACTER-PLACEMENT PROOF COMPLETE — OWNER VISUAL APPROVAL REQUIRED — PRODUCTION ADOPTION NOT AUTHORIZED — T17 IMPLEMENTATION NOT AUTHORIZED
