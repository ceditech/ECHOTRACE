# T17 character-placement proof — continuity correction

Date: 2026-10-09. **CONDITIONAL GO for owner visual review only.**

The owner-selected attached Mara sheet is the design authority for this revision. This report supersedes the previous recommendation to use the earlier paired portrait treatment. All active cutouts, identity/alpha panels, placement previews, desktop/mobile scenes, flattened background proposal, static layer, metadata and QA outputs have been refreshed. Earlier rejected cutouts and reports are retained in superseded/ as historical evidence.

## Design continuity

| Element | Corrected treatment | Assessment |
|---|---|---|
| Mara face | Soft rounded facial sculpt, expressive eyes and cinematic stylization follow the attached sheet | PASS for model inspection; owner likeness acceptance pending |
| Hair | Loose chestnut shoulder-length waves replace tied-back styling | PASS |
| Clothing | Teal rolled-sleeve blazer, cream ribbed top and ankle trousers | PASS |
| Accessories | Small gold earrings, oval pendant, gold watch with black strap on left wrist | PASS in source; not individually readable at mobile scene scale |
| Shoes | White low-top sneakers replace previous footwear | PASS in source; scene furniture hides most lower figure |
| Handbag | Omitted from this scene proof to preserve the existing no-new-props scope | Explicit treatment limitation; sheet remains the accessory reference |
| Owen | Existing curls, stubble, navy bomber, gray shirt and seated pose retained; shading and facial rendering harmonized toward the attached sheet | PASS as a proposed style treatment; owner shared-style acceptance pending |

The identity comparison panel shows the owner reference alongside the corrected seated figures. This is a generated interpretation, not a certified exact facial match or new canonical character definition. No cinematic media or production character sprites were created.

## Narrative and staging

The frozen dossier remains authoritative. Its ordered timeline is setup/request → original observation → Mara away → stand exchange → collection/enclosure/delivery → Owen checks/recloses → Mara returns/notices absence → investigation. Section 8 requires Mara in the same place at both snapshots; her absence occurs between them. Identical neutral endpoint art preserves that requirement without inventing an event or emotion. Stable visible Owen remains a proposed compatible staging, not a newly authored fact.

The existing offline character envelopes are retained exactly: Mara (5,292)–(133,522), Owen (470,116)–(570,321) on 960×540. New alpha crops fit uniformly within these envelopes, centered horizontally and top aligned. Actual silhouette bounds can change with the corrected artwork; placement-zones.json records exact source crops and transforms. No approved B object geometry or interaction region changed.

The existing foreground chair masks Mara's lower figure. Owen remains beside the left edge of the plant-side table. His physical table association and both characters' seating scale/support remain conditional composition judgments. The small figures contrast stylistically with the more photographic room; owner review should accept that intended treatment before any adoption.

## Treatment alternatives and inspection

Option A flattens the same static character treatment onto a background copy; option B retains separate offline layers behind existing props. Both produce identical final pixels. B remains recommended for reversible review. Neither method has been implemented in React or Phaser.

Inspected the refreshed identity panel, white/dark alpha panel, original/changed desktop comparison and all four mobile files at 320×180 and 390×219. Figures read as people in static inspection, but face identity and accessories are too small to serve as gameplay information. Passport removal, stand exchange and wallet movement remain visually discernible. Passport/star/strap recognition risks from final-art-qa remain; unchanged pixels do not establish unchanged human attention. No participant, real-device, responsive UI or touch test was performed.

Cutout exterior transparency is genuine. White/dark composites show no baked room or obvious broad halo. Warm hair/clothing rim light remains visible; this is not a production-perfect edge certification. The raw alpha statistics are recorded by the renderer. No deterministic retouch was applied, and no environmental asset was regenerated.

## Verification

Executed compose.py successfully:
- Plain scene re-render matches the earlier refined pair.
- A/B final composites are pixel equivalent.
- Zero changed pixels beneath native authored clue alpha masks.
- Zero changed solid clue pixels at 320/390.
- Zero character-caused changes inside existing interaction rectangles and reviewed window/plant landmark masks.
- Identical character treatment and effective visibility at both endpoints.
- Before/after difference mask identical to the previous refined pair; zero new endpoint differences.
- All 203 protected input hashes unchanged, including prior QA artifacts, canonical case data, production assets, code and governance documents.

Exact geometry/case hashes and measurements are in occlusion-analysis.json. generation.json records the two Mara correction passes (only the final selected), Owen's style pass, prompts and original output paths. Original generation history is archived in superseded/generation.json; generated originals remain in place. The copied owner reference SHA-256 is 780dcca0ef04eab3312bcde77cb069d0b7a83c2896f0690eca4b230589b2c8ec.

## Adoption prerequisites

1. Owner accepts Mara facial continuity, Owen's shared style, accessory treatment, seating and table association.
2. Owner selects background or separate-layer treatment.
3. Three first-time viewers perform the existing 25-second observation protocol, including a mobile-size trial and character attention/table-association notes. Record actual results only.
4. Real responsive interaction/device checks confirm usable regions and UI layout.
5. Source/rights provenance and cinematic continuity treatment receive appropriate review.
6. Separate explicit authorization is provided for production adoption and a bounded T17 implementation.

No application tests/build were run because application files were untouched. No canonical/frozen data, production assets, React/Phaser code, tracker or roadmap changes; no T17/CIN-01 implementation, commit or push. Earlier QA reports remain historical records; this revision changes the current character design recommendation only.

T17 CHARACTER-PLACEMENT PROOF COMPLETE — OWNER VISUAL APPROVAL REQUIRED — PRODUCTION ADOPTION NOT AUTHORIZED — T17 IMPLEMENTATION NOT AUTHORIZED

