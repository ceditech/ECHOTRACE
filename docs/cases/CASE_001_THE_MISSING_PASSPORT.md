# Case 001 — The Missing Passport

**Concept:** The Wrong Table
**Case ID:** `case-001`
**Status:** OWNER-APPROVED CANONICAL DESIGN — implementation not complete
**Approval:** Project owner approved the complete final T14 Stage C dossier in the T14 Controlled Closeout instruction, 2026-10-07.
**Scope:** T14 design closeout only. T15 is NOT AUTHORIZED.

This document is the single canonical Case 001 design reference. Stage C in the current project conversation is the authoritative source; the closeout instruction supplies the exact request, witness and answer text reproduced below. Unchanged supporting identifiers and layout detail come from Stage B as expressly preserved by Stage C. No earlier alternative overrides the approved final design.

The owner approval covers the fictional service, request, truth, responsibilities, mapping, timeline, three changes, three primary evidence items, eight statements, contradiction, deduction, final decision, resolution, difficulty, accessibility and existing scoring. It does not authorize production JSON, source registration, assets, text catalogs, gameplay implementation, schema/engine/renderer changes, dependencies, commits or T15.

## 1. Premise and narrative hook

Mara's passport disappears from the window table while she steps away. Her distinctive star travel wallet appears beside Owen at the plant-side table. The player must explain why it reached the wrong person by distinguishing physical location from a displaced table label.

The canonical explanation is accidental misdelivery, not intentional theft. Nia misremembers restoring the stands correctly; an inaccurate statement is not automatically a lie. Owen's possession alone does not establish theft.

**Difficulty:** Easy, with one substantial causal deduction.
**Observation:** 25 seconds.
**Intended experience:** 3–5 minutes.
**Eligible maximum score:** 2,650.

## 2. Fictional concierge premise

Approved briefing text:

> This fictional airport lounge offers an optional concierge service that packs loose travel documents into a guest's own travel wallet and returns it to their numbered table. Mara requested the service before stepping out to take a private call. When she returned, her passport and wallet were gone from the window table.

The player then studies the lounge before the disappearance and compares it with the changed scene. This optional convenience is explicitly fictional, not a claim about standard airport practice. Ellis receives a written request without meeting Mara; he can identify the pickup landmark and return number without recognizing her face or knowing the original table layout.

## 3. Exact written request

> Please collect my passport and the star wallet from the window table. Put the passport inside the wallet, then leave the wallet at table 12.

Mara writes this before the exchange. It is untimed briefing context, readable again before decisions, not a collectible document or new document-opening interaction. The window landmark identifies pickup; number 12 identifies return. Originally they identify the same physical table.

## 4. Physical table mapping and counterfactual

| Stable location | Traveler | Original stand | Stand after exchange |
|---|---|---|---|
| Window table, left (`object-table-window`) | Mara | 12 | 21 |
| Plant-side table, right (`object-table-plant`) | Owen | 21 | 12 |

Tables and environmental anchors do not move. Stand 12 remains the same numbered object and moves right; stand 21 moves left. Printed numerals do not change. Ellis collects from the window, encloses the passport at the counter, then follows the current stand matching 12 to Owen's table.

**Counterfactual:** Without the exchange, 12 remains at the window table, so following the same request returns the wallet to Mara's place. An instruction to return to 21 would not produce this canonical misdelivery.

## 5. Character knowledge and responsibilities

| Character | Role and goal | Knowledge/actions | Assumption and responsibility |
|---|---|---|---|
| Mara | Traveler; recover documents before boarding | Owns passport/wallet, writes request, steps out for private call, returns and confirms identity | Expects original table number to remain reliable; authorizes assistance |
| Owen | Traveler at plant-side table; clarify unexpected delivery | Receives wallet from Ellis, checks passport name, leaves it there, shows Mara and returns documents | Initially assumes attendant has a legitimate reason for delivery; does not steal |
| Nia | Cleaner; complete routine maintenance | Lifts both stands to wipe bases and accidentally exchanges them before collection | Genuinely believes she restored them; causes label error, never handles passport |
| Ellis | Attendant; fulfill written request | Collects from window, packs passport inside wallet at counter, returns by displayed number | Assumes number still identifies intended return place; does not verify traveler identity |

No new witnesses or deliberate deception are introduced. Names remain Mara, Owen, Nia and Ellis.

## 6. Canonical truth and custody

1. Mara places her passport beside her closed star wallet at the window table, originally marked 12.
2. She leaves the request and steps away.
3. Nia lifts both stands to wipe their bases and accidentally restores them in opposite locations.
4. Ellis collects the loose passport and wallet from the window location.
5. At the service counter, Ellis puts the passport inside the wallet.
6. Ellis places the closed wallet beside the current stand 12, at Owen's plant-side table.
7. Owen checks the unexpected wallet, sees Mara's name on the passport, recloses it and leaves it on the table.
8. Mara returns and notices her documents absent from the window table.
9. Before deduction, Owen corroborates contents/handoff and Mara confirms the passport is hers.
10. The player reconstructs the exchange and numbered return. Owen returns the wallet and passport during resolution.

Canonical author truth: Owen did not steal the documents, Mara did not pack the passport herself, Ellis did not retain it, and Nia did not knowingly redirect it. The player selects the best-supported reconstruction; evidence does not mathematically prove private innocent intent.

| Custody stage | Passport location/handler | Predecision support |
|---|---|---|
| Original | Loose on window-table document mat | Observation, E1 |
| Collection | Ellis carries passport and wallet to counter | S-E1, consistent with E1/E3 |
| Enclosure | Inside star wallet at counter | S-E1, corroborated by S-O2/S-M2 |
| Delivery | Inside wallet beside Owen | E2/E3, S-E2/S-O1 |
| Identity check | Owen checks; Mara confirms identity before decision | S-O2/S-M2 |
| Recovery | Owen returns documents to Mara | Closure, not new proof |

Private belief and intention are author metadata. Decisive placement, instruction, route and custody information is available before the final decision. No resolution-only confession or unseen decisive clue is required.

## 7. Ordered timeline

Story chronology and player phase order are distinct: the briefing is retrospective. A short transition compresses ordinary elapsed lounge time rather than implying that every action occurs within one or two seconds.

| Order/event ID | Location and actor/action | Affected objects/facts | Player access and support |
|---|---|---|---|
| 1 `event-setup` | Mara at window table places documents | Passport beside closed wallet; original 12 | Observation, E1/E3 |
| 2 `event-request` | Mara leaves request at counter | Pickup window; return 12 | Untimed briefing, S-M1 |
| 3 `event-observation` | Lounge before disappearance | Window 12, plant 21 | 25-second original scene |
| 4 `event-away` | Mara steps out for private call | Owner absent during handling | Briefing |
| 5 `event-swap` | Nia cleans stand bases at both tables | Stands exchange before collection | E2, S-N1/S-N2 |
| 6 `event-collect` | Ellis collects at window | Passport/wallet enter his custody | S-E1, E1/E3 |
| 7 `event-enclose` | Ellis at counter | Passport inside wallet | S-E1, later S-O2/S-M2 |
| 8 `event-handoff` | Ellis at Owen's table | Wallet returned by displayed 12 | E2/E3, S-E2/S-O1 |
| 9 `event-recipient-check` | Owen at plant table | Checks name, recloses and leaves wallet | S-O2 |
| 10 `event-disappearance` | Mara returns to window | Original documents absent | Investigation introduction |
| 11 `event-investigation` | Player compares scene | Discovers changes, collects E1–E3 | Required player actions |
| 12 `event-testimony` | Untimed testimony UI | Accounts and identity confirmed | All eight statements before deduction |
| 13 `event-deduction` | Player submits route answer | First valid submission locks | One deduction |
| 14 `event-decision` | Player selects explanation | Best-supported reconstruction | Final decision |
| 15 `event-resolution` | Closing narrative | Documents returned, responsibility acknowledged | Previously available proof |

## 8. Observation and investigation scenes

The preserved layout concept uses a 960×540 logical rectangle with uniform mobile-first FIT scaling. Final asset sizing and rendered QA remain implementation work.

Window table is left; plant table is right. Tables, chairs, service-counter anchor, window, plant, document mat and Owen's backpack stay fixed. Mara occupies the same place in both snapshots; her temporary absence is between them. Nia/Ellis can be introduced in testimony UI. Avoid additional moving characters or incidental endpoint differences.

Wallet recognition uses a large star emblem, broad striped strap and consistent silhouette, not color alone. Number stands are upright and high contrast. Passport is recognizable without reading fine print. Observation instruction: "Remember the documents, table numbers and where they belong."

| Element | Original state | Investigation state |
|---|---|---|
| Passport | On mat, visual center `(0.18, 0.65)` | Absent from visible scene; mat remains |
| Closed star wallet | Window, center `(0.38, 0.65)` | Beside Owen, center `(0.75, 0.65)` |
| Stand 12 | Left, center `(0.35, 0.25)` | Right, center `(0.75, 0.25)` |
| Stand 21 | Right, center `(0.75, 0.25)` | Left, center `(0.35, 0.25)` |
| Other scene elements | Stable anchors and belongings | Unchanged |

## 9. Exactly three meaningful changes

All three use the same before/after scene pair, `significance: meaningful` and `isRequired: true`.

| ChangeId | Object identity | Variant | Independent target | Evidence/reasoning |
|---|---|---|---|---|
| `change-passport-removed` | `object-passport` | `object_removed` | Remembered position on stable mat | E1: disappearance from pickup location |
| `change-stands-exchanged` | `object-stand-12`, `object-stand-21` | `object_exchanged` | Either current stand | E2: one label exchange explains routing |
| `change-wallet-moved` | `object-star-wallet` | `object_moved` | Wallet at new destination | E3: route endpoint and custody corroboration |

The passport's removal is from view, not narrative destruction. Wallet opening/reclosing is off-screen and leaves the wallet closed in both snapshots; it is not a fourth authored change. No object participates in ambiguous competing changes. Either stand resolves to the same ChangeId; selecting the second after discovery yields already-discovered behavior, not another award.

Preserved proposed normalized interaction rectangles:

| Target | Origin | Size |
|---|---|---|
| Missing passport | `(0.09, 0.50)` | `(0.18, 0.30)` |
| Current left stand | `(0.26, 0.10)` | `(0.18, 0.30)` |
| Current right stand | `(0.66, 0.10)` | `(0.18, 0.30)` |
| Wallet | `(0.66, 0.50)` | `(0.18, 0.30)` |

These are inside normalized bounds and do not overlap. Actual rendered touch sizes require QA. The missing-object region remains even without a passport sprite.

## 10. Exactly three required primary evidence items

Each item has `category: primary`, `isRequired: true` and its exact change source. Discovery precedes explicit collection; supportingInformation supplies justification, never unlock logic. Availability without collection earns no evidence score.

| Evidence/ID | Change source | Exact approved text | Distinct contribution |
|---|---|---|---|
| E1 — Empty Document Place / `evidence-passport-absence` | `change-passport-removed` | The passport is gone from its place on the window table. The document mat is still there. | Source disappearance; connects to S-E1 and request |
| E2 — Reversed Table Numbers / `evidence-stands-exchanged` | `change-stands-exchanged` | The window table displayed 12; it now displays 21. The plant-side table shows the opposite change. | Routing error; contradicts S-N2 |
| E3 — The Star Wallet / `evidence-wallet-destination` | `change-wallet-moved` | The star wallet has moved from the window table to the plant-side table beside Owen. | Destination; corroborates S-E2/S-O1 |

Request specifies 12 → E2 places current 12 at Owen's table → S-E2 establishes matching the return number → E3 confirms destination → deduction explains misdelivery. E1 and S-E1 connect passport collection/enclosure to that route. All evidence and testimony precede decisions.

## 11. Eight verbatim witness statements

Exact wording follows the owner closeout instruction. Author truth classifications are not pre-solution labels shown to the player.

| ID / speaker | Approved statement | Truth classification |
|---|---|---|
| S-M1 — Mara / `statement-mara-request` | I left that request before stepping away. Twelve was the window table when I wrote it. | truthful |
| S-M2 — Mara / `statement-mara-identity` | The star wallet is mine. Owen showed me the passport inside—it has my name. | truthful |
| S-N1 — Nia / `statement-nia-handling` | I lifted both number stands to wipe their bases. I'd finished before Ellis collected the documents. | truthful |
| S-N2 — Nia / `statement-nia-restoration` | I put twelve back by the window and twenty-one by the plant. I'm sure of it. | mistaken |
| S-E1 — Ellis / `statement-ellis-collection` | I collected the loose passport and star wallet from the window table. At the counter, I put the passport inside. | truthful |
| S-E2 — Ellis / `statement-ellis-delivery` | For the return, I matched the number on the request to a table stand and left the wallet there. I didn't check the traveler's name. | truthful |
| S-O1 — Owen / `statement-owen-handoff` | Ellis put the wallet on my table. I hadn't asked for it, and I left it here. | truthful |
| S-O2 — Owen / `statement-owen-contents` | I checked because the wallet wasn't mine. The passport said Mara. I showed her, then closed it again. | truthful |

Mara confirms instruction/identity; Nia supplies handling/order and an inaccurate restoration claim; Ellis establishes collection/enclosure/numbered return; Owen corroborates handoff/contents. No speaker supplies the full causal answer. Identity confirmation is before deduction; the player performs no inventory search or free-form interrogation.

## 12. Provable contradiction

`contradiction-stand-restoration` uses `visual_testimony` with references to statement `statement-nia-restoration` (S-N2) and evidence `evidence-stands-exchanged` (E2).

Observation establishes window 12/plant 21. Investigation establishes window 21/plant 12. Nia's restoration claim is incompatible with E2. Because the exchange precedes collection/delivery, it explains why numbered return led to Owen. This proves inaccurate placement, not deliberate lying or criminal intent.

## 13. Deduction and ordered choices

**Deduction ID:** `deduction-delivery-route`
**Kind:** `single_choice`
**Question:** Why did Ellis deliver Mara's wallet to Owen's table?

| Order | ChoiceId | Exact choice | Canonical answer |
|---|---|---|---|
| A | `choice-route-swapped-labels` | The exchanged stands made Owen's table display Mara's requested number, 12. | YES |
| B | `choice-route-owner-request` | Mara had asked Ellis to give her documents to Owen. | No |
| C | `choice-route-wrong-pickup` | Ellis collected the documents from Owen's table. | No |
| D | `choice-route-owen-moved-wallet` | Owen carried the wallet from the window table himself. | No |

Question and choices are untimed, after evidence/testimony. B contradicts the request; C contradicts pickup evidence/S-E1; D is weaker than corroborated handoff. E2/E3, request, original assignment and S-E2 establish A. First valid answer locks whether correct or incorrect; invalid submissions do not lock. No retries introduced. Evidence/phase readiness is later orchestration, not supportingInformation semantics.

## 14. Final decision and ordered choices

**Question:** What best explains Mara's missing passport?

| Order | DecisionId | Exact choice | Canonical answer |
|---|---|---|---|
| A | `decision-accidental-misdelivery` | Ellis placed it inside Mara's wallet, then delivered it to Owen because the table-number stands had been exchanged. | YES |
| B | `decision-owen-theft` | Owen took the passport and wallet from Mara's table. | No |
| C | `decision-mara-packed-it` | Mara packed the passport herself and forgot. | No |
| D | `decision-ellis-kept-it` | Ellis deliberately kept the passport while delivering only the wallet. | No |

A accounts for every discovery and corroborated custody. The correctDecisionId is `decision-accidental-misdelivery`. Wrong-decision behavior requires later approval before implementation; no final-decision evaluator is implemented by T14.

## 15. Complete verbatim Stage C resolution

> The tables stayed where they were. Their numbers did not.
>
> Mara’s request identified the pickup by the window and the return by number twelve. When Nia wiped the stands, twelve went to Owen’s table and twenty-one went to Mara’s.
>
> Ellis collected the correct documents. He put the passport inside the star wallet, then followed the displaced twelve. Owen’s possession came from that handoff.
>
> Nia remembered restoring the stands correctly. The scene showed otherwise. An inaccurate memory explained the mistake; it did not establish a lie.
>
> Owen returns the wallet and passport. Nia apologizes for the exchange, and Ellis acknowledges that he should have checked the return location.
>
> Mara checks her documents before heading to the gate. You found more than the missing passport: you explained how a familiar label led everyone to the wrong table.

The service/request and numbered-return method are known before deciding. Contents/identity are confirmed in testimony. Recovery closes custody without adding decisive evidence. Reconstruction references existing request, swap, collection, enclosure and handoff events.

## 16. Alternative hypotheses and red herrings

| Hypothesis | Apparent support | Elimination/limit |
|---|---|---|
| Owen intentionally stole documents | Wallet appears beside him | Ellis/Owen corroborate handoff; displaced label explains destination. Theft requires unsupported motive or collusion; possession alone insufficient |
| Mara packed/misplaced passport herself | Her belongings end up together | Ellis handling and delivery account conflicts with self-packing; no unexplained additional transfer needed for canonical route |
| Ellis deliberately retained passport | He handled it | Owen/Mara confirm passport inside delivered wallet; handling alone not intent |
| Accidental misdelivery | Instruction, original/current labels, route and custody align | Best-supported reconstruction; off-screen actions remain corroborated testimony, not direct visual proof |

No extra decorative red herring is approved. Owen's possession supplies an initial suspicion fairly resolved through custody. Do not eliminate alternatives by calling a character a good person or claiming innocent intent is certain.

## 17. Player experience

Observe → Remember → Investigate → Evidence → Testimony → Deduction → Decision → Resolution.

The target is 3–5 minutes: untimed briefing/request, 25-second observation, short compressed-story transition, three discoveries and explicit evidence collections, evidence review, eight short statements, one deduction, final decision and resolution. Players reason about why the passport disappeared, not just where it went. No separate contradiction-combination interaction is required; recognition is expressed through the deduction.

## 18. Accessibility and fairness requirements

- Large upright 12/21 numerals; stable window/plant anchors; no rotated or color-only labels.
- Wallet identified by emblem, strap and silhouette; no passport fine-print reading during observation.
- Broad nonoverlapping targets; verify approximately 44 CSS-pixel touch targets where practical after FIT scaling.
- Stable document mat and fair remembered-position target; no invisible pixel hunting.
- Neutral keyboard selection alternatives that do not reveal correct changes; visible focus.
- Readable contrast, rereadable untimed request/evidence/testimony/answers, reduced-motion transitions.
- No mandatory rapid reading, dragging, hover-only information or audio-only clue.
- All E1–E3 discoveries/collections and eight statements must be available before decisions; later flow gates must enforce approved readiness.
- Exact instruction and spatial evidence establish route; custody has Ellis/Owen/Mara corroboration. No private motive or resolution-only fact is needed.
- Core visual-memory accessibility limits must be honestly documented; fully nonvisual gameplay is not claimed.

Design logic is accepted. Artwork legibility, target reachability, actual mobile/keyboard behavior and player comprehension require later QA/playtesting; owner design approval is not rendered QA completion.

## 19. Scoring eligibility and maximum

| Component | Approved eligibility | Maximum |
|---|---|---|
| Base | Existing authored base; applies even to fresh session | 1,000 |
| Changes | Three meaningful AND required ChangeIds discovered once, +200 each | 600 |
| Evidence | Three primary AND required EvidenceIds collected once, +250 each | 750 |
| Deduction | One correct canonical first answer, +300 | 300 |
| Incorrect selections | -100 per authoritative incorrect interactive selection record | 0 penalty at maximum |
| Final/time/hint components | No new scoring policy or award | 0 |

**Maximum: 1,000 + 600 + 750 + 300 = 2,650.**
`total = max(0, 1000 + 200C + 250E + 300D - 100I)` where C≤3, E≤3, D is 0 or 1 and I counts incorrect selections. Either stand earns the same one change award. Availability alone earns no evidence award. Accuracy/rating remain null; no stars, time bonuses, final-decision bonuses or hint penalties are introduced.

## 20. Existing schema and mechanics compatibility

| Design element | Existing contract | Status |
|---|---|---|
| Identity, versions, briefing/settings | CaseDefinition and TextReference | Design representable |
| Stable tables, objects, scene pair | ObjectDefinition/SceneDefinition; observation/investigation SceneIds | Design representable |
| Removal/exchange/movement | object_removed/object_exchanged/object_moved | Design representable |
| Missing sprite target/either stand | InteractionRegion independent of visual; T07 exchange matching | Design representable |
| Three evidence unlocks | EvidenceSource kind change | Design representable |
| Witnesses/classification | WitnessDefinition/StatementDefinition/truthStatus | Design representable |
| Contradiction | visual_testimony statement/evidence pair | Design representable |
| Deduction/final decision | single_choice, DeductionAnswer, final choices/correctDecisionId | Design representable |
| Custody/timeline/recovery | Facts, event descriptions, ordered reconstruction | Narrative representation; no live inventory or structured time simulator |
| Score eligibility | Existing significance/isRequired/category and authored values | Design representable |
| Multiobject rendering, text/asset resolution, keyboard mapping, readiness gates | Later presentation/orchestration work | Implementation deferred |

No new evidence-source kinds, gameplay phases, inventory, document-search, interrogation, renderer truth exposure, scoring components or backend services. T13 declarations do not prove physical asset existence. Current T12 neutral single-target shell is not a completed production scene. Case 001 is not playable merely because its design is representable.

## 21. Preserved proposed identifiers

These remain proposed technical identifiers for later authorized encoding, not runtime content created by T14.

| Entity | IDs |
|---|---|
| Case | `case-001` |
| Scenes | `scene-lounge-before`, `scene-lounge-after` |
| Characters | `character-mara`, `character-owen`, `character-nia`, `character-ellis` |
| Witnesses | `witness-mara`, `witness-owen`, `witness-nia`, `witness-ellis` |
| Objects | `object-table-window`, `object-table-plant`, `object-passport`, `object-star-wallet`, `object-stand-12`, `object-stand-21`, `object-document-mat`, `object-owen-backpack` |
| Changes/evidence/statements/answers | Exact IDs in sections 9–14 |
| Contradiction | `contradiction-stand-restoration` |
| Events | Exact event IDs in section 7 |
| Facts | `fact-original-labels`, `fact-current-labels`, `fact-return-instruction`, `fact-wallet-custody`, `fact-passport-identity` |
| Text key namespaces | `case001.briefing.*`, `case001.evidence.*`, `case001.statement.*`, `case001.deduction.*`, `case001.decision.*`, `case001.resolution.*` |

Physical-location IDs must not become mutable display-number IDs. Actual asset identifiers/text entries are deferred rather than invented here.

## 22. T15 handoff requirements — not authorization

Only after separate T15 authorization:

1. Encode approved truth using existing schema; preserve exact request, eight statements, classification, question/choice order and resolution.
2. Define exactly three changes/primary evidence items and one canonical single-choice deduction/final decision.
3. Preserve scene positions, stand identity, wallet recognition and independent target mapping.
4. Link witnesses/statements, contradiction and canonical choices; run unchanged T04/T05 validation and trusted loading.
5. Register an explicit approved source entry and source asset declarations within authorized scope.
6. Provide or explicitly schedule text-key catalog integration; no missing player-facing wording.
7. Keep art generation/scene implementation in their separately authorized tasks. Requirements: stable lounge background, passport, wallet, both number stands and necessary static props, reused across snapshots; portraits/evidence illustrations optional.
8. Keep canonical truth outside Phaser projections; extend display projection/rendering only in later authorized implementation.

Case-specific regression requirements: exactly three meaningful required changes and three required primary items; both stands resolve to one ChangeId; no ambiguous targets; missing passport region persists; sprite positions match changes; discovery precedes collection; instruction returns to 12; original/current mappings correct; S-N2/E2 contradiction; canonical D1/F1 answers; maximum 2,650; no new resolution-only proof; eventual text keys/assets resolve.

## 23. Deferred implementation and QA decisions

- Wrong-final-decision behavior needs explicit policy approval before implementation; no retry behavior inferred.
- Application readiness/phase gates must be implemented later; supportingInformation remains justification.
- Text catalog, production JSON/source registration, physical assets and asset decoding/resolution are not implemented here.
- Production multiobject projection/rendering, keyboard alternatives and responsive interaction sizing remain later work.
- Mobile numeral readability, visual fairness, real touch behavior, accessibility, end-to-end flow and human playtesting remain unverified.
- Concierge premise is approved as fictional, but actual player believability and eight-statement pacing still require playtesting.
- Existing canonical truth must not be changed silently in response to QA; material narrative changes require renewed owner approval.

## 24. Approval provenance and scope boundary

Owner approved the complete final Stage C dossier through the current T14 Controlled Closeout request. Only the two approved Stage C refinements supersede Stage B: fictional packing-assistance setup/natural request and non-spoiling S-E2. Other seven statements, table/route logic, custody, changes, evidence, deduction/final choices, resolution and score remain preserved.

T14 closes mystery DESIGN. Technical representability is not implementation completion, release readiness or human-playtest validation. T15 is NOT AUTHORIZED. No production case data, registration, assets, gameplay or commit is authorized by this document.
