# Canonical versus refined B geometry

EV12: fresh documentary comparison of actual canonical JSON and research B-proposed-case.json, not a geometry change. All normalized positions/sizes below are available and verified. Canonical case.json remains authoritative for production; frozen story is unchanged. Refined B is the current research compositor input only.13 of19 comparable visual/target entries differ.

| Scene | Element | Coordinate type | Canonical position | Canonical size | Refined position | Refined size | Comparison | Implication | Current authority |
|---|---|---|---|---|---|---|---|---|---|
| scene-lounge-before | visuals / object-table-window | center | (0.3, 0.55) | (0.4, 0.5) | (0.3, 0.55) | (0.4, 0.5) | SAME | Unchanged fixed source anchor/envelope | canonical case.json |
| scene-lounge-before | visuals / object-table-plant | center | (0.75, 0.55) | (0.4, 0.5) | (0.75, 0.55) | (0.4, 0.5) | SAME | Unchanged fixed source anchor/envelope | canonical case.json |
| scene-lounge-before | visuals / object-document-mat | center | (0.18, 0.65) | (0.2, 0.3) | (0.22, 0.535) | (0.2, 0.28) | DIFF | Mat lifted/right-shifted; envelope aspect revised | canonical case.json |
| scene-lounge-before | visuals / object-owen-backpack | center | (0.92, 0.8) | (0.1, 0.18) | (0.92, 0.8) | (0.1, 0.18) | SAME | Unchanged fixed source anchor/envelope | canonical case.json |
| scene-lounge-before | visuals / object-passport | center | (0.18, 0.65) | (0.1, 0.18) | (0.22, 0.535) | (0.08, 0.12) | DIFF | Booklet lifted/right-shifted, smaller native-aspect envelope | canonical case.json |
| scene-lounge-before | visuals / object-star-wallet | center | (0.38, 0.65) | (0.12, 0.18) | (0.38, 0.535) | (0.11, 0.132) | DIFF | Wallet lifted at both endpoints; native-aspect size revised; same closed source | canonical case.json |
| scene-lounge-before | visuals / object-stand-12 | center | (0.35, 0.25) | (0.12, 0.18) | (0.35, 0.335) | (0.12, 0.18) | DIFF | Stand lowered onto tabletop; same size and exchange identity | canonical case.json |
| scene-lounge-before | visuals / object-stand-21 | center | (0.75, 0.25) | (0.12, 0.18) | (0.75, 0.335) | (0.12, 0.18) | DIFF | Stand lowered onto tabletop; same size and exchange identity | canonical case.json |
| scene-lounge-after | visuals / object-table-window | center | (0.3, 0.55) | (0.4, 0.5) | (0.3, 0.55) | (0.4, 0.5) | SAME | Unchanged fixed source anchor/envelope | canonical case.json |
| scene-lounge-after | visuals / object-table-plant | center | (0.75, 0.55) | (0.4, 0.5) | (0.75, 0.55) | (0.4, 0.5) | SAME | Unchanged fixed source anchor/envelope | canonical case.json |
| scene-lounge-after | visuals / object-document-mat | center | (0.18, 0.65) | (0.2, 0.3) | (0.22, 0.535) | (0.2, 0.28) | DIFF | Mat lifted/right-shifted; envelope aspect revised | canonical case.json |
| scene-lounge-after | visuals / object-owen-backpack | center | (0.92, 0.8) | (0.1, 0.18) | (0.92, 0.8) | (0.1, 0.18) | SAME | Unchanged fixed source anchor/envelope | canonical case.json |
| scene-lounge-after | visuals / object-star-wallet | center | (0.75, 0.65) | (0.12, 0.18) | (0.75, 0.535) | (0.11, 0.132) | DIFF | Wallet lifted at both endpoints; native-aspect size revised; same closed source | canonical case.json |
| scene-lounge-after | visuals / object-stand-12 | center | (0.75, 0.25) | (0.12, 0.18) | (0.75, 0.335) | (0.12, 0.18) | DIFF | Stand lowered onto tabletop; same size and exchange identity | canonical case.json |
| scene-lounge-after | visuals / object-stand-21 | center | (0.35, 0.25) | (0.12, 0.18) | (0.35, 0.335) | (0.12, 0.18) | DIFF | Stand lowered onto tabletop; same size and exchange identity | canonical case.json |
| scene-lounge-after | interactionRegions / object-passport | origin | (0.09, 0.5) | (0.18, 0.3) | (0.13, 0.47) | (0.18, 0.27) | DIFF | Authored target origin/height differ; must migrate jointly with approved visual mapping | canonical case.json |
| scene-lounge-after | interactionRegions / object-stand-21 | origin | (0.26, 0.1) | (0.18, 0.3) | (0.26, 0.15) | (0.18, 0.27) | DIFF | Authored target origin/height differ; must migrate jointly with approved visual mapping | canonical case.json |
| scene-lounge-after | interactionRegions / object-stand-12 | origin | (0.66, 0.1) | (0.18, 0.3) | (0.66, 0.15) | (0.18, 0.27) | DIFF | Authored target origin/height differ; must migrate jointly with approved visual mapping | canonical case.json |
| scene-lounge-after | interactionRegions / object-star-wallet | origin | (0.66, 0.5) | (0.18, 0.3) | (0.66, 0.47) | (0.18, 0.27) | DIFF | Authored target origin/height differ; must migrate jointly with approved visual mapping | canonical case.json |

Passport is absent from Changed in both definitions; no extra Changed passport visual/character ID is introduced. Character presence in the offline PNG is a separate static layer, not new canonical scene objects. Mara/Owen positions are not silently written into canonical JSON.

Change metadata: change-passport-removed/object_removed and change-stands-exchanged/object_exchanged are identical. change-wallet-moved/object_moved retains ID/kind/x endpoints(.38→.75) but canonical from/to y=.65; refined y=.535. This metadata difference must be part of any explicit migration, not ignored because the three event names match. Frozen identity/custody/reasoning/evidence logic must remain intact.

Targets: canonical width.18,height.30 versus refined.18,.27. At320 canonical57.6×54/gap18; refined57.6×48.6/gap9. At390 canonical70.2×65.8125/gap21.9375; refined70.2×59.23125/gap10.96875. Refined target nonoverlap/interaction tests do not authorize substitution for canonical regions. Early MPS O05 describes an older historical B (51.2×44.1/gap1.35 at320), not this later refined layout; preserve the old report and use the exact versioned source here (EV16).

D06 owner options: retain canonical; hold migration; or separately authorize a precise migration plan specifying all listed visual/region/change-endpoint fields, exact chosen assets/hashes, authoring/schema/evidence/regression implications and reconciliation of frozen geometry documentation through an explicit owner-approved process. Story facts remain frozen. No canonical JSON/frozen dossier/governance edit is allowed in FAG. A future plan is not migration authorization and no implementation follows automatically.

[geometry-comparison.json](geometry-comparison.json) contains full unchanged source entries; [gates](ACCEPTANCE_GATE_MATRIX.md) G12/G19 and [owner register](OWNER_DECISION_REGISTER.md) D06 separate technical research mapping from adoption authority.
