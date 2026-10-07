# EchoTrace — Game Specification

**File:** `GAME_SPEC.md`  
**Product:** EchoTrace  
**Document Type:** Gameplay & Systems Specification  
**Version:** 1.0  
**Status:** Initial Game Specification  
**Date:** October 2026  
**Depends On:** `PRD.md`  
**Next Document:** `CASE_AUTHORING_GUIDE.md`

---

## 1. Purpose

This document defines how EchoTrace behaves as a game.

`PRD.md` defines **what** EchoTrace is and why it exists. This document defines the rules, states, player interactions, gameplay systems, scoring concepts, difficulty model, replay behavior, and the playable vertical slice.

The specification is intended to prevent implementation agents from inventing gameplay behavior while coding.

When a gameplay behavior is ambiguous, it must be clarified in this specification or explicitly approved rather than silently invented.

---

## 2. Core Game Fantasy

The player is an investigator whose greatest tools are:

- attention;
- memory;
- observation;
- evidence;
- contradiction detection;
- logical deduction.

The player should feel:

> “I solved this because I noticed something important and understood what it meant.”

The game must not feel like a sequence of arbitrary clicks.

---

## 3. Core Gameplay Pillars

### 3.1 Observe

The player studies a scene before knowing exactly which details will matter.

### 3.2 Remember

The original scene becomes unavailable or meaningfully obscured. The player must rely on memory.

### 3.3 Investigate

The player examines a changed scene and identifies relevant differences or suspicious details.

### 3.4 Collect Evidence

Valid observations become structured evidence rather than merely awarding points.

### 3.5 Evaluate Testimony

Characters provide statements that may be truthful, incomplete, mistaken, misleading, or false.

### 3.6 Connect Contradictions

The player compares testimony with evidence and identifies inconsistencies.

### 3.7 Deduce

The player uses accumulated information to answer reasoning questions.

### 3.8 Resolve

The player commits to a final explanation and receives a logical case resolution.

---

## 4. Standard Case State Machine

A standard case follows this state sequence:

```text
LOCKED / AVAILABLE
        ↓
CASE_BRIEFING
        ↓
OBSERVATION_INTRO
        ↓
OBSERVATION_ACTIVE
        ↓
OBSERVATION_END
        ↓
TRANSITION
        ↓
INVESTIGATION_INTRO
        ↓
INVESTIGATION_ACTIVE
        ↓
EVIDENCE_REVIEW
        ↓
WITNESS_TESTIMONY
        ↓
DEDUCTION
        ↓
FINAL_DECISION
        ↓
RESOLUTION
        ↓
RESULTS
        ↓
COMPLETE / REPLAY
```

A case may later omit or repeat certain optional phases, but the MVP should use the standard sequence.

State transitions must be explicit and deterministic. UI components must not independently invent the current game phase.

---

## 5. Case Session Lifecycle

A case session represents one attempt.

A session should track, at minimum:

```text
caseId
attemptId
startedAt
currentPhase
observationStartedAt
observationEndedAt
investigationStartedAt
selectedObjects
correctDiscoveries
incorrectSelections
evidenceCollected
hintsUsed
deductionAnswers
finalDecision
score
completionStatus
completedAt
```

The exact implementation model belongs in `ARCHITECTURE.md`.

---

## 6. Case Briefing

The briefing prepares the player without revealing the solution.

It must provide:

- case number or identifier;
- title;
- setting;
- concise incident description;
- investigation objective;
- essential interaction instructions;
- optional difficulty indicator.

A briefing should generally be short enough to understand in less than 30 seconds.

The player explicitly starts the case after reading the briefing.

---

## 7. Observation Phase

### 7.1 Purpose

The player studies the original state of the environment.

### 7.2 MVP Duration

Case 001 default observation time:

**25 seconds**

This value must be configurable per case.

### 7.3 Behavior

During observation:

- the full intended scene is visible;
- important objects are presented naturally;
- interactive investigation markers are not shown;
- the player cannot collect evidence;
- the countdown is visible but should not obscure the scene;
- pausing behavior, if supported, must not allow exploitation.

### 7.4 Fairness

Critical clues must be reasonably visible.

A solution must not depend on an object that is effectively impossible to perceive because of scale, contrast, cropping, or interface obstruction.

### 7.5 End Condition

Observation ends when:

- the timer reaches zero; or
- a future case explicitly allows the player to end observation early.

For the MVP, the timer reaching zero is the standard behavior.

---

## 8. Transition Phase

The transition separates memory from direct comparison.

It should:

- remove or obscure the original scene;
- last long enough to prevent trivial visual comparison;
- clearly signal that investigation is beginning;
- avoid excessive delay.

For Case 001, a short cinematic transition or approximately 1–3 seconds of interruption is appropriate.

The final duration should be playtested.

---

## 9. Investigation Phase

### 9.1 Purpose

The player examines the altered scene and identifies relevant changes.

### 9.2 Player Interaction

Players may select/tap/click objects or defined interaction regions.

Each selectable target should resolve to a stable object identifier.

### 9.3 Selection Outcomes

A selection may be:

- `CORRECT_CHANGE`
- `RELEVANT_EVIDENCE`
- `INCORRECT`
- `ALREADY_DISCOVERED`
- `NON_INTERACTIVE`

### 9.4 Correct Selection

When the player correctly identifies a relevant change:

- provide immediate feedback;
- record the discovery;
- prevent duplicate scoring;
- reveal or create associated evidence when appropriate;
- update progress.

### 9.5 Incorrect Selection

An incorrect selection should:

- provide subtle feedback;
- not create evidence;
- optionally apply a score penalty;
- not trap the player in a failure loop.

The MVP should not end the case merely because the player makes several incorrect selections.

### 9.6 Duplicate Selection

Repeatedly selecting an already-discovered target must not generate additional points or evidence.

### 9.7 Approved T07 Source and Selection Contract

Evidence becomes available only when its explicitly authored source is satisfied. `supportingInformation` is reasoning/justification, not an unlock condition. Change-sourced evidence requires its exact discovered ChangeId. Other source variants remain structurally supported but return unsupported outcomes until deterministic triggers are approved.

Discovery and collection are separate. One change may make multiple evidence items available; collection requests one EvidenceId and cannot duplicate it. Repeated discovery cannot duplicate a ChangeId or create new scoring opportunities. Incorrect selections do not unlock or collect evidence; T09 owns scoring.

Semantic object selections resolve against authored investigation regions and changes in the case's scene pair. Exchanges identify either participant; relationships identify their subject. Multiple matches produce ambiguity without mutation; array ordering and prior discovery cannot choose a winner. T07 does not decide investigation advancement or make UI-supplied prerequisite booleans authoritative.

---

## 10. Investigation Completion

A case may define:

- required discoveries;
- optional discoveries;
- maximum discoveries;
- minimum evidence needed to proceed.

For Case 001, the investigation should contain **three primary scene changes**.

The player should be able to proceed after finding the required discoveries.

A future hint or “continue with incomplete evidence” mechanism may be supported, but the MVP should prioritize a clear guided flow.

---

## 11. Evidence System

### 11.1 Purpose

Evidence transforms visual observation into detective reasoning.

### 11.2 Evidence Properties

Each evidence item should conceptually include:

```text
id
title
description
source
importance
relatedObjects
relatedCharacters
relatedStatements
isRequired
```

### 11.3 Evidence Sources

Evidence may originate from:

- scene changes;
- unchanged but suspicious objects;
- witness statements;
- documents;
- timestamps;
- environmental details;
- deductions.

The MVP primarily uses scene discoveries and testimony.

### 11.4 Evidence Panel

The player can review discovered evidence during appropriate phases.

An evidence card should communicate:

- what was discovered;
- why it may matter without revealing the solution prematurely;
- an optional visual reference.

Undiscovered evidence must not expose solution information.

---

## 12. Witness System

### 12.1 Purpose

Witnesses transform the game from visual memory into narrative investigation.

### 12.2 Witness Properties

Conceptually:

```text
id
name
role
portrait
statements
reliabilityModel
relatedEvidence
```

### 12.3 Statement Types

A statement may be:

- truthful;
- incomplete;
- mistaken;
- misleading;
- deliberately false.

These labels are authoring concepts and should not automatically be shown to the player.

### 12.4 MVP Requirement

Case 001 requires at least **one witness** and at least **one meaningful contradiction or inconsistency** that the player can reason about using discovered evidence.

### 12.5 Fairness Rule

If a witness is lying, the game must provide sufficient evidence to challenge the lie.

The player must never be expected to identify dishonesty based solely on intuition.

---

## 13. Contradiction System

A contradiction is a meaningful logical conflict between two pieces of case information.

Examples:

```text
Witness:
“I never went near the table.”

Evidence:
The witness's boarding pass is underneath the moved coffee cup.
```

or:

```text
Witness:
“The suitcase never moved.”

Observation:
The suitcase is in a different location after the transition.
```

Contradictions may be explicit player interactions in later versions.

For the MVP, at least one contradiction must influence the deduction phase.

---

## 14. Deduction Phase

### 14.1 Purpose

The deduction phase tests interpretation rather than memory alone.

### 14.2 Question Types

Future supported types may include:

- single-choice;
- multiple-choice;
- evidence-to-statement matching;
- contradiction selection;
- sequence reconstruction;
- suspect elimination;
- timeline reconstruction.

The MVP may begin with single-choice or evidence-based multiple-choice questions.

### 14.3 Rules

Every correct deduction must be supported by information available before the question is asked.

Questions must avoid ambiguous wording.

When multiple answers appear plausible, the evidence must establish why one is superior.

### 14.4 Approved Stage-1 Deduction Submission Policy (T08)

Each deduction has one authored canonical answer. A valid answer is submitted once per deduction per attempt and recorded whether correct or incorrect. Incorrect answers complete that deduction submission without ending the case, revealing the answer, or forcing restart. A second submission cannot replace the first; retries require a future separate replay attempt.

Correctness comes only from the trusted canonical solution. Single-choice IDs must match; a multiple-choice answer must contain exactly the canonical choice set, independent of order. Empty, duplicate, mismatched-kind or foreign-choice submissions are invalid and do not lock the question. Supporting information is narrative justification, not an inferred submission gate. T08 does not define phase entry/exit, evidence prerequisites, scoring or final-decision evaluation.

---

## 15. Final Decision

The final decision is the player's committed explanation of the mystery.

Examples:

- Who took the object?
- What actually happened?
- Which witness is lying?
- Where is the missing item?
- Which sequence of events is correct?

The player should receive a clear confirmation before submitting a decision if it cannot be changed afterward.

---

## 16. Case Resolution

The resolution is not simply “Correct” or “Incorrect.”

It should explain:

1. what happened;
2. the key sequence of events;
3. which evidence mattered;
4. which testimony was relevant;
5. why the correct deduction follows logically.

The resolution is part of the player's reward.

A good resolution should produce:

> “That makes sense. I could have figured that out.”

---

## 17. Scoring Model

### 17.1 Goals

Scoring should reward skill while allowing story-focused players to complete cases.

### 17.2 MVP Conceptual Formula

Initial tuning target:

```text
Base completion score                    1,000
Correct primary change                   +200 each
Important evidence bonus                 +250 each
Correct deduction                        +300 each
Correct final decision                   +500
Efficiency / time bonus                  0–500
Incorrect investigation selection        -100 each
Hint penalty                             configurable
```

These numbers are initial design values, not immutable constants.

### 17.3 Score Constraints

- Duplicate discoveries never score twice.
- Score calculations must be deterministic.
- Score values must be configurable.
- Final score should not become negative unless intentionally approved later.
- Scoring logic must be testable independently of rendering.

### 17.4 Accuracy

Accuracy may be calculated conceptually as:

```text
meaningfulCorrectActions /
(meaningfulCorrectActions + incorrectActions)
```

The final formula should be finalized during implementation/playtesting.

### 17.5 Approved Stage-1 Scoring Contract (T09)

Score is derived from the trusted case definition and authoritative session, never incremented during interactions. Authored ScoringConfiguration values remain the tuning source. The base applies even to a fresh session. A change qualifies only when significance is meaningful and isRequired is true; evidence qualifies only when category is primary and isRequired is true. Each discovered ChangeId and collected EvidenceId contributes once; availability alone earns nothing.

Each correctly recorded deduction earns its configured value by comparison with the canonical solution. Multiple-choice answers require the exact set; the first recorded answer remains authoritative. Incorrect or unanswered deductions earn zero without penalty. Each T07 incorrectSelections record contributes one configured penalty, including repeated incorrect attempts; other selection outcomes do not create such records.

ScoreResult exposes rawTotal before the zero floor and total = max(0, rawTotal). Case identity/version mismatch and non-finite arithmetic return typed failures; unknown discovery, evidence and deduction IDs earn nothing. Inputs and session.score are never mutated. Final-decision scoring remains zero until authoritative correctness evaluation exists. Time bonus and hint penalty remain zero; accuracy and star rating remain null pending their approved policies.

---

## 18. Rating System

The MVP may translate score into a star rating:

- 1 Star — Case Solved
- 2 Stars — Capable Investigator
- 3 Stars — Skilled Detective
- 4 Stars — Expert Investigator
- 5 Stars — Master Detective

Thresholds should be case-configurable because cases may have different maximum scores.

Rank names are provisional and may change during branding.

---

## 19. Hints

Hints should reduce frustration without replacing reasoning.

Potential hint levels:

### Hint 1 — Directional
Draw attention to an area of the scene.

### Hint 2 — Contextual
Suggest what type of detail to reconsider.

### Hint 3 — Strong
Identify a specific clue or relationship.

Hints may carry a score penalty.

The MVP can begin with a minimal hint system if playtesting demonstrates a need. Hints should not be used to compensate for unfair case design.

---

## 20. Failure and Recovery

EchoTrace should generally favor case completion over hard failure.

Possible poor performance outcomes include:

- low score;
- fewer stars;
- incorrect deduction;
- incorrect final conclusion.

An incorrect final decision may either:

1. resolve the case and show the correct explanation; or
2. allow a limited retry.

For the initial vertical slice, the recommended behavior is to **complete the attempt, reveal the resolution, score the result, and allow replay**.

This avoids frustrating loops and provides learning value.

---

## 21. Replay Rules

A completed case may be replayed.

Replay must:

- create a new attempt;
- reset attempt-specific discoveries;
- reset evidence;
- reset deductions;
- reset temporary score;
- preserve historical completion status and best performance where appropriate.

For static MVP cases, replay may make some clues easier because the player remembers the solution. That is acceptable.

Future cases may support controlled variants.

---

## 22. Persistence

For the MVP, local persistence should store at minimum:

- case completion status;
- best score;
- best rating;
- number of attempts;
- basic settings.

An interrupted in-progress case may initially restart rather than support exact mid-case restoration, unless implementation proves simple and reliable.

Persistent data must be versionable so future schema changes can be handled safely.

### 22.1 Approved Stage-1 Attempt and Progress Semantics (T10)

A playthrough has an externally injected unique attemptId for one caseId + caseVersion. Only completed Results attempts enter historical progress. attemptCount counts distinct completed identities; repeated persistence of the same identity is idempotent and preserves its first saved result. Initialized, abandoned and interrupted attempts do not count.

bestScore is the highest T09 final total among saved completed attempts for that case/version. Lower or equal later results cannot reduce it. Completion does not imply solved correctness; the current CaseProgress has no solved field and T10 does not infer one from scores, discoveries, deductions or final choices. Ratings remain null until approved.

Completed summaries preserve injected completedAt timestamps without adding a new last-played chronology policy. Stage-1 progress is browser-local, namespaced, validated and format-versioned. Authored caseVersion is independent of storage schemaVersion. Interrupted gameplay starts a new attempt rather than resuming transient state. Settings persistence remains later work outside T10's historical-progress scope.

---

## 23. Progression Rules

Initial progression should be simple.

A future multi-case MVP may use:

```text
Case 001 completed
      ↓
Case 002 unlocked
      ↓
Case 003 unlocked
```

Alternative unlock systems may be introduced later.

Progression must not require grinding previously completed cases merely to access the core story.

---

## 24. Difficulty Model

Difficulty may be influenced by:

- observation duration;
- scene density;
- visual similarity of changes;
- number of changes;
- number of witnesses;
- number of statements;
- red herrings;
- deduction complexity;
- number of evidence relationships;
- hint availability.

Difficulty must not rely primarily on making objects tiny or inaccessible.

---

## 25. Red Herrings

Red herrings are permitted when they improve mystery reasoning.

A red herring must:

- be plausible;
- not contradict the actual solution;
- be dismissible through evidence or logic;
- not exist solely to trick the player unfairly.

The MVP should use red herrings sparingly.

---

## 26. Timer Rules

Observation timers are core to memory pressure.

Investigation timers are optional.

For the MVP:

- Observation: timed.
- Investigation: preferably untimed.
- Witness review: untimed.
- Deduction: untimed.
- Resolution: untimed.

This keeps pressure focused on observation rather than reading speed.

---

## 27. Pause Behavior

If a pause function exists during observation, it must not allow the player to freeze the timer while continuing to view the scene.

Acceptable behavior:

- pause overlays/obscures the scene;
- countdown stops;
- resuming restores the scene and countdown.

For the earliest MVP, pause may be omitted if unnecessary.

---

## 28. Input Rules

The game must support:

### Desktop
- pointer/mouse;
- keyboard for general application navigation where appropriate.

### Mobile/Tablet
- touch.

Interaction regions should be large enough to avoid requiring pixel-perfect selection.

Gameplay correctness must not depend on hover-only information.

---

## 29. Feedback Rules

Player actions require clear but restrained feedback.

Examples:

**Correct discovery**
- subtle animation;
- sound cue if audio enabled;
- evidence notification.

**Incorrect selection**
- short visual feedback;
- optional subtle sound;
- no disruptive modal.

**Case phase transition**
- clear heading or animation.

Feedback should never obscure important evidence.

---

## 30. Accessibility Gameplay Rules

Where technically feasible:

- avoid relying on color alone;
- maintain readable text;
- provide visible focus indicators in application UI;
- respect reduced-motion preferences;
- allow audio to be disabled;
- maintain appropriate touch targets;
- avoid unnecessarily rapid interactions.

Because visual observation is inherently visual, not every mechanic can be made fully nonvisual. Accessibility limitations should be documented honestly rather than hidden.

---

## 31. Audio Behavior

Audio categories should be independently controllable where practical:

- music;
- ambience;
- sound effects.

Gameplay must remain understandable with audio disabled.

No critical clue may depend solely on sound in the MVP.

---

## 32. Case Validation Rules

Before a case is publishable, automated or manual validation should confirm:

- unique identifiers;
- valid object references;
- valid evidence references;
- valid witness references;
- valid deduction references;
- exactly one intended final solution unless the case explicitly supports multiple solutions;
- all required evidence is discoverable;
- no impossible dependency cycles;
- scoring configuration is valid;
- required assets exist.

Technical validation belongs in `ARCHITECTURE.md` and `TESTING_STRATEGY.md`.

---

## 33. Mystery Fairness Standard

Every published case must satisfy:

### Evidence Sufficiency
The correct solution can be derived from available information.

### Evidence Accessibility
Required clues are reasonably discoverable.

### Logical Consistency
No canonical facts contradict the solution.

### Explanation Completeness
The resolution can explain the solution using previously available evidence.

### No Hidden Knowledge Requirement
Players do not need obscure external knowledge unless explicitly introduced in the case.

### Red Herring Fairness
False leads can be eliminated logically.

---

# 34. Case 001 — The Missing Passport

## 34.1 Objective

Prove the complete EchoTrace loop with one polished case.

## 34.2 Setting

An airport lounge shortly before boarding.

## 34.3 Incident

A traveler reports that a passport has disappeared from a table.

## 34.4 Observation

Default duration: **25 seconds**.

The initial scene should include recognizable environmental objects and several characters/items without becoming excessively cluttered.

Candidate objects include:

- passport;
- boarding pass;
- coffee cup;
- red suitcase;
- backpack;
- phone;
- newspaper;
- chair;
- table;
- lounge signage.

Final object placement belongs in the authored Case 001 data.

## 34.5 Primary Changes

The vertical slice should initially target **three meaningful changes**.

Working examples:

1. Passport disappears.
2. Red suitcase changes position.
3. Coffee cup moves or changes relationship to another object.

These are provisional until the complete mystery logic is authored.

## 34.6 Evidence

Each primary change should produce or support evidence.

Evidence must ultimately contribute to understanding the event rather than existing only for score.

## 34.7 Witness

At least one witness provides a statement that can be evaluated against evidence.

## 34.8 Contradiction

At least one discovered fact must challenge or materially qualify witness testimony.

## 34.9 Deduction

The player answers at least one question requiring interpretation of evidence.

## 34.10 Final Decision

The player selects the most plausible explanation of the missing passport.

## 34.11 Resolution

The game reconstructs what happened and identifies the clues that supported the solution.

## 34.12 Important Constraint

The exact culprit and narrative explanation should be finalized in `CASE_AUTHORING_GUIDE.md` / Case 001 authoring work before implementation hardcodes assumptions.

---

## 35. Game-State Invariants

The implementation must preserve these rules:

1. A case has one authoritative current phase.
2. Evidence cannot be collected before it becomes discoverable.
3. A discovery cannot score more than once per attempt.
4. Undiscovered evidence cannot appear as collected.
5. The final resolution cannot alter the canonical solution based on player score.
6. Results must be reproducible from recorded attempt data.
7. Rendering code must not be the sole owner of scoring or case truth.
8. Case content must not directly mutate engine rules.
9. A normal case must be playable without adding case-specific engine code.
10. Invalid case data must fail safely and visibly during development.

---

## 36. Anti-Cheating Scope

Strong anti-cheat systems are **out of scope for the MVP**.

Basic protections may prevent accidental score duplication or malformed state.

If competitive Daily Echo or public leaderboards are introduced, score integrity and server-side validation will require a separate design.

---

## 37. Analytics-Relevant Gameplay Events

The game should eventually expose semantic events such as:

```text
case_started
briefing_completed
observation_started
observation_completed
investigation_started
change_discovered
incorrect_selection
evidence_collected
hint_used
witness_viewed
deduction_submitted
final_decision_submitted
case_completed
case_replayed
case_abandoned
```

Analytics implementation must remain separate from core game rules.

---

## 38. MVP Gameplay Acceptance Criteria

The vertical slice is gameplay-complete when:

- Case 001 can be started from the application.
- Briefing clearly explains the objective.
- Observation begins reliably.
- The 25-second timer behaves correctly.
- The original scene becomes unavailable before investigation.
- The altered scene loads correctly.
- Three intended changes can be detected.
- Duplicate discoveries do not score twice.
- Incorrect selections are handled safely.
- Evidence is created and reviewable.
- Witness testimony can be viewed.
- At least one contradiction is logically meaningful.
- The player completes a deduction.
- The player makes a final decision.
- The resolution explains the mystery.
- Score and rating are produced deterministically.
- Completion is persisted.
- The case can be replayed.
- The experience works at supported desktop and mobile sizes.
- No critical gameplay path depends on developer tools or manual state manipulation.

---

## 39. Playtesting Questions

Playtesting should answer:

1. Did players understand what to do?
2. Did 25 seconds feel appropriate?
3. Were important objects visible?
4. Were changes too obvious or too subtle?
5. Did evidence feel meaningful?
6. Did the witness system improve the experience?
7. Was the contradiction understandable?
8. Could players logically solve the mystery?
9. Did the resolution feel fair?
10. Was the case too short, too long, or appropriate?
11. Did players want to replay?
12. Most importantly: **Did players want another case?**

---

## 40. Features Reserved for Later Specifications

The following should not be silently added to the MVP:

- branching narratives;
- procedural mysteries;
- multiplayer investigations;
- real-time competition;
- user-created public cases;
- AI-generated live dialogue;
- dynamic culprit selection;
- inventory crafting;
- combat;
- open-world movement;
- complex economy;
- energy/lives systems;
- loot boxes;
- public leaderboards;
- subscription gating.

Any addition requires explicit product approval and corresponding documentation changes.

---

## 41. Relationship to Other Documents

- `PRD.md` — product vision, scope, audience, and requirements.
- `GAME_SPEC.md` — gameplay behavior and rules. **This document.**
- `CASE_AUTHORING_GUIDE.md` — how to construct fair, reusable mysteries.
- `ARCHITECTURE.md` — technical design implementing these rules.
- `AGENTS.md` — constraints for Codex and other engineering agents.
- `TESTING_STRATEGY.md` — verification and quality strategy.
- `ROADMAP.md` — implementation sequence and release gates.
- `MONETIZATION.md` — commercial systems and economic strategy.
- `README.md` — repository entry point.

If implementation conflicts with this document, the conflict must be surfaced and resolved rather than silently changing gameplay behavior.

---

## 42. Change Control

Material changes to any of the following require updating this specification:

- core loop;
- state machine;
- observation rules;
- evidence behavior;
- witness behavior;
- deduction mechanics;
- scoring model;
- replay rules;
- difficulty system;
- Case 001 acceptance criteria.

Version changes should be recorded in source control.

---

## 43. Document Status

**Document:** `GAME_SPEC.md`  
**Version:** 1.0  
**Status:** Initial Game Specification  
**Product:** EchoTrace  
**Previous Document:** `PRD.md`  
**Next Document:** `CASE_AUTHORING_GUIDE.md`

### Documentation Progress

```text
ECHOTRACE/
│
├── README.md                  ○ Pending
├── PRD.md                     ● COMPLETE
├── GAME_SPEC.md               ● DOCUMENT 2 — COMPLETE
├── CASE_AUTHORING_GUIDE.md    ◉ DOCUMENT 3 — NEXT
├── ARCHITECTURE.md            ○ Pending
├── AGENTS.md                  ○ Pending
├── TESTING_STRATEGY.md        ○ Pending
├── ROADMAP.md                 ○ Pending
└── MONETIZATION.md            ○ Pending
```
