# Decision dependencies and distinct states

| Decision | Decision recorded? | Governance implication | Gate/evidence state | Task authorized? | Production adoption approved? |
|---|---|---|---|---|---|
| D01 | CONFIRMED | Preferred research identity confirmed | No new technical evidence; G01 already PASS | No additional task | No |
| D02 | F3 selected | Final visual acceptance HELD | G04–G06 remain CONDITIONAL; recognition unresolved | F2/new study NOT authorized | No |
| D03 | S1 selected | B0 provisional retention | G07–G09 remain CONDITIONAL; staging concerns retained | No new staging/artwork task | No |
| D04 | W3 selected | Direction toward separate fallback study | G11 BLOCKED; minimum width UNDECIDED | RFS-001 NOT authorized; scope/criteria/consent required | No |
| D05 | PENDING | Required rights evidence prerequisite | G18 BLOCKED; permission evidence missing | No provider contact/evidence review authority inferred | No |
| D06 | PENDING | Explicit canonical/refined governance needed | G19 BLOCKED; canonical authoritative | No geometry migration | No |
| D07 | PENDING | Production adoption decision | G20 NOT AUTHORIZED | No artwork adoption task | No |
| D08 | PENDING | T17 authority | G21 NOT AUTHORIZED | No T17 | No |
| D09 | PENDING | T18 authority | G22 NOT AUTHORIZED | No T18 | No |
| D10 | PENDING | Platform/accessibility/performance coverage | Existing Android/iOS/PWA/access gaps unchanged | No new QA task | No |
| D11 | PENDING | Timing/interruption/recovery policy | Policy unresolved;25s baseline only existing planning fact | No timer/recovery implementation | No |

Decision recorded ≠ gate resolved ≠ evidence obtained ≠ task authorized ≠ production adoption approved. The new evidence here is the owner instruction for four governance selections; no new technical/recognition/device/rights evidence is obtained. Existing technical PASS is retained by evidence, not created by ratification.

Dependency paths from FAG-001 remain applicable:

- D01 → preferred research baseline. D02/D03 → fairness/staging direction only; F3 hold/S1 provisional status do not clear final acceptance.
- D02 → D04: fairness direction is now known, but W3 leaves the width decision open. D04 → separate RFS-001 charter/authorization/acceptance criteria → possible later feasibility evidence → later explicit minimum-width decision. None after W3 is executed or granted here.
- D05 → required rights evidence/acceptance before any production artwork adoption. D06 depends on actual fairness/staging/width governance, not merely three filled-in choice fields.
- D07 depends on exact candidate, final visual/staging/presentation decisions, required rights, geometry and supported-coverage scope. Its source dependency IDs are not automatically satisfied by D01–D04 ratification.
- D08 requires separate T17 scope and relevant D06/D10 decisions. D09 requires separate T18 scope and relevant D08/D11 dependencies. D10/D11 remain unresolved; no default policy is invented.

Historical [FAG-001 register](../final-artwork-governance/OWNER_DECISION_REGISTER.md) remains unchanged. Current [machine overlay](owner-decisions.json) and [gate impacts](gate-impact.json) record these distinctions.
