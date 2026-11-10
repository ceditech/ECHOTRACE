# PDQA-001 independent readiness gates

| Gate | Area | Status | Evidence | Uncertainty | Next action | Owner decision |
|---|---|---|---|---|---|---|
| G1 | Mystery integrity | Automated PASS | A01/A03;B01 | Candidate-only, not integrated gameplay | Retain3 events/stable endpoints in any authorized revision | Separate adoption required |
| G2 | Geometry/target mapping | CONDITIONAL | A01/A02/A03/A04;E03(C);E06(E) | Physical boundaries incomplete; candidate differs from canonical | Close physical mapping gaps; explicitly choose geometry | Validation-only acceptance is not adoption |
| G3 | Desktop automated interaction | Automated PASS | A01/A02;E01(C) | Archived desktop, not fresh hardware run | Preserve evidence; rerun only after relevant changes | No need repeat basic desktop test |
| G4 | Physical Android basics | Provisionally supported | E02/E03(C);E04(D) | No independent recording access/build; Show taps USER-CONFIRMED | Accept attributed basics; focus missing cases | Accept consolidation, not exhaustive PASS |
| G5 | Physical gesture/cancellation | NOT TESTED | U01;A01/A02(A) | Desktop simulation cannot settle hardware input | Focused gaps/drag/multi/capture/stale input/pan extremes | Separate technical Android QA authorization |
| G6 | Original readability | CONDITIONAL | E05/E06(E);E01(C);U02 | Small clues/narrow widths; accessibility unaccepted | Choose supported width/presentation/accessibility plan | Accept limitation or scope smallest correction; study closed |
| G7 | Staging/art acceptance | CONDITIONAL | B02/B03;E01(C) | Proportions/Owen association/final artwork unresolved | Explicit visual acceptance; no arbitrary rescale | Accept or authorize bounded alternatives |
| G8 | Provenance/rights | BLOCKED | B03 | Production clearance unavailable; not infringement claim | Document source/reference rights and clearance | Explicit rights/art acceptance |
| G9 | iOS Safari | NOT TESTED | U03 | No iOS evidence | Authorize actual QA or explicitly defer coverage | Choose release-platform scope |
| G10 | Production integration | BLOCKED | B01;U02/U03/U04;A04 | No timing/recovery/PWA integration; no adoption/T17/T18 authority | Resolve relevant policy/adoption gates and authorize bounded work | Separate adoption/T17/T18/commit/push decisions |

Isolated technical readiness: supported for device diagnostics by archived A01/A02, not production-ready. Physical Android diagnostic readiness: basic use provisionally supported (E02/E03), Show taps USER-CONFIRMED (E04), focused physical gaps remain (U01/U02). Visual design: CONDITIONAL (E05/E06/B02). Canonical/art adoption: NOT CLEARED (B01/B03). T17/T18: NOT AUTHORIZED. These are distinct decisions.

An owner may explicitly sequence bounded preparatory technical work before all deferred platform checks, but must define its scope/gates. This report grants no permission and does not assert every later platform test must precede any T17 work. See [risks](DEFECT_AND_RISK_REGISTER.md) and [actions](RECOMMENDED_NEXT_ACTIONS.md).
