# EchoTrace — Development Roadmap

**File:** `ROADMAP.md`  
**Product:** EchoTrace  
**Document Type:** Product & Engineering Execution Roadmap  
**Version:** 1.0  
**Status:** Initial Execution Baseline  
**Date:** October 2026  
**Depends On:** `PRD.md`, `GAME_SPEC.md`, `CASE_AUTHORING_GUIDE.md`, `ARCHITECTURE.md`, `AGENTS.md`, `TESTING_STRATEGY.md`  
**Previous Document:** `TESTING_STRATEGY.md`  
**Next Document:** `MONETIZATION.md`

---

# 1. Purpose

This document converts EchoTrace's product, gameplay, content, architecture, engineering, and testing requirements into an ordered execution plan.

It is designed for controlled AI-assisted development with Codex.

The roadmap answers:

- What should be built first?
- What should not be built yet?
- What does Codex receive in each step?
- What must be verified before continuing?
- When should human playtesting occur?
- When is the project ready to scale from one case to many?
- When should monetization and backend systems enter?

The governing workflow is:

> **SPEC → PLAN → CODE → TEST → INSPECT → FIX → VERIFY → COMMIT**

---

# 2. Roadmap Philosophy

EchoTrace should not begin by building a large game.

It should prove increasingly difficult hypotheses.

```text
Can the architecture support the game?
        ↓
Can one complete mystery work?
        ↓
Is the mystery actually fun and fair?
        ↓
Can additional cases be added cheaply?
        ↓
Do players return?
        ↓
Will players pay?
        ↓
Can the content system scale?
```

Each stage should earn the right to proceed to the next.

---

# 3. Product Stages

EchoTrace development is divided into five major stages.

## Stage 1 — Vertical Slice

**Goal:** Prove the complete game loop with one polished mystery.

Primary artifact:

> Case 001 — The Missing Passport

---

## Stage 2 — MVP

**Goal:** Prove repeat engagement with a small library.

Target:

> Approximately 5–10 high-quality cases.

---

## Stage 3 — Market Validation

**Goal:** Test the game with external players and measure retention, comprehension, replay, and demand.

---

## Stage 4 — Commercial Release

**Goal:** Introduce validated monetization and stronger retention systems.

Potential systems:

- premium case packs;
- rewarded hints;
- Daily Echo;
- accounts/cloud progress where justified.

---

## Stage 5 — Mystery Platform

**Goal:** Scale content production and recurring engagement.

Potential systems:

- internal Case Builder;
- AI-assisted authoring;
- larger case library;
- seasonal content;
- competitive Daily Echo;
- creator ecosystem only if justified.

---

# 4. Stage Gates

Do not advance merely because a calendar date arrives.

Advance when evidence supports the next investment.

The most important gates are:

```text
Architecture Gate
      ↓
Playable Loop Gate
      ↓
Case Fairness Gate
      ↓
Player Desire Gate
      ↓
Content Scalability Gate
      ↓
Retention Gate
      ↓
Monetization Gate
```

---

# 5. Phase 0 — Documentation Baseline

## Objective

Complete the repository's source-of-truth documents before implementation.

Required:

```text
PRD.md
GAME_SPEC.md
CASE_AUTHORING_GUIDE.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
ROADMAP.md
MONETIZATION.md
README.md
```

## Exit Criteria

- product vision documented;
- gameplay rules documented;
- case authoring standard documented;
- architecture documented;
- AI engineering rules documented;
- testing strategy documented;
- roadmap documented;
- monetization strategy documented;
- repository onboarding documented.

No application code is required for this phase.

---

# 6. Phase 1 — Architecture Planning

## Objective

Have Codex translate approved documentation into a concrete implementation plan without writing code.

## Codex Prompt

```text
You are the lead software architect for EchoTrace.

Read these files fully:
- PRD.md
- GAME_SPEC.md
- CASE_AUTHORING_GUIDE.md
- ARCHITECTURE.md
- AGENTS.md
- TESTING_STRATEGY.md
- ROADMAP.md

Do not implement or modify code yet.

Produce a concrete technical implementation plan for the EchoTrace vertical slice.

Include:
1. proposed final folder structure;
2. application/game/domain boundaries;
3. game session state model;
4. case data model;
5. runtime validation strategy;
6. React–Phaser integration boundary;
7. persistence abstraction;
8. testing structure;
9. dependency recommendations with justification;
10. implementation sequence;
11. technical risks;
12. unresolved decisions;
13. anything in the documentation that conflicts or is ambiguous.

Prefer the simplest architecture that satisfies the approved requirements.
Do not add speculative backend systems.
Stop after the plan.
```

## Human Review Gate

Review:

- dependency choices;
- folder structure;
- state ownership;
- case format;
- Phaser boundary;
- testing approach;
- unresolved decisions.

Do not scaffold until the plan is accepted.

---

# 7. Phase 2 — Repository Scaffold

## Objective

Create the smallest healthy application foundation.

## Scope

Initialize:

- Next.js;
- React;
- TypeScript strict mode;
- Tailwind;
- linting;
- formatting;
- test runner;
- basic test configuration;
- Phaser dependency;
- runtime validation dependency if approved.

## Do Not Build Yet

- full gameplay;
- backend;
- authentication;
- Stripe;
- database;
- Daily Echo;
- Case Builder.

## Verification

```text
development server starts
lint passes
type-check passes
test runner executes
production build succeeds
```

## Exit Criteria

A clean empty application can be developed, tested, and built reliably.

---

# 8. Phase 3 — Core Domain Types

## Objective

Define the stable language of EchoTrace.

Create domain concepts for:

- case metadata;
- case definition;
- scenes;
- objects;
- changes;
- evidence;
- witnesses;
- statements;
- contradictions;
- deductions;
- final decisions;
- scoring configuration;
- case session;
- progress.

## Requirements

- strict TypeScript;
- no Phaser/React imports in domain;
- stable identifiers;
- no case-specific hardcoding.

## Tests

Compile/type-level confidence plus targeted domain tests where behavior exists.

## Exit Criteria

The application has a coherent vocabulary before game mechanics are added.

---

# 9. Phase 4 — Case Schema & Validator

## Objective

Make authored case data safe.

Implement:

- schema version;
- runtime validation;
- unique ID checks;
- cross-reference checks;
- scoring validation;
- answer validation;
- useful validation errors.

Create fixtures:

```text
valid-minimal-case
invalid-duplicate-id
invalid-evidence-reference
invalid-answer
unsupported-schema
```

## Exit Criteria

Malformed case content cannot silently enter the runtime.

---

# 10. Phase 5 — Game State Machine

## Objective

Implement deterministic case phase progression.

Initial phases:

```text
case_briefing
observation_intro
observation_active
observation_end
transition
investigation_intro
investigation_active
evidence_review
witness_testimony
deduction
final_decision
resolution
results
```

## Tests

- every legal transition;
- representative illegal transitions;
- terminal behavior;
- session initialization.

## Exit Criteria

Game phase progression works without rendering.

---

# 11. Phase 6 — Scoring & Evidence Domain

## Objective

Implement deterministic gameplay rules before UI.

Build:

- evidence collection;
- duplicate prevention;
- selection outcomes;
- scoring;
- penalties;
- rating calculation;
- deduction evaluation;
- final decision evaluation.

## Tests

Strong unit coverage.

## Exit Criteria

A synthetic case attempt can be evaluated entirely in TypeScript without Phaser.

---

# 12. Phase 7 — Persistence Abstraction

## Objective

Introduce player progress without coupling domain logic to browser storage.

Implement:

```text
ProgressRepository
LocalProgressRepository
```

Persist:

- completion;
- best score;
- best rating;
- attempt count;
- settings.

## Tests

- save/read;
- best-score preservation;
- malformed storage;
- version handling.

## Exit Criteria

Progress survives reload without scattered storage calls.

---

# 13. Phase 8 — Phaser Integration Shell

## Objective

Prove that Phaser can live cleanly inside the Next.js/React application.

Implement:

- lazy game runtime loading where appropriate;
- single Phaser instance;
- base scene;
- resize behavior;
- typed bridge;
- cleanup on unmount.

Do not implement full Case 001 yet.

## Tests

- mount/unmount;
- semantic bridge;
- no duplicate listeners;
- responsive resize smoke test.

## Exit Criteria

React and Phaser communicate without leaking responsibilities.

---

# 14. Phase 9 — Case Loader

## Objective

Load a validated case into the application.

Implement:

```text
case ID
   ↓
load source
   ↓
validate
   ↓
cross-reference
   ↓
trusted runtime definition
```

## Error Cases

- unknown case;
- invalid case;
- unsupported version;
- missing asset declaration.

## Exit Criteria

The runtime can load a case without knowing Case 001-specific logic.

---

# 15. Phase 10 — Finalize Case 001 Logic

## Objective

Complete the authoring worksheet for **The Missing Passport** before hardcoding assumptions into assets or implementation.

Finalize:

- incident;
- canonical truth;
- three primary changes;
- evidence;
- witness;
- statement;
- contradiction;
- deduction;
- final decision;
- solution;
- resolution;
- scoring;
- difficulty.

## Important Gate

Do not continue case-specific implementation until the canonical solution is approved.

---

# 16. Phase 11 — Case 001 Data

## Objective

Represent the approved mystery as validated structured case data.

Add:

- metadata;
- scene definitions;
- objects;
- changes;
- evidence;
- witness;
- statements;
- contradiction;
- deduction;
- final decision;
- solution;
- scoring.

## Verification

- schema validation passes;
- cross-references pass;
- Case 001 content regression tests pass.

---

# 17. Phase 12 — Briefing Experience

## Objective

Build the first player-facing phase.

Implement:

- title;
- incident;
- objective;
- difficulty;
- start control;
- responsive UI.

## Exit Criteria

A player understands the task without developer explanation.

---

# 18. Phase 13 — Observation Scene

## Objective

Render the initial airport lounge scene.

Implement:

- scene asset loading;
- original object states;
- interaction disabled;
- countdown;
- 25-second default;
- phase transition at expiration.

## Tests

- timer;
- phase transition;
- scene load;
- no investigation interaction during observation.

## Manual QA

- critical objects visible;
- mobile framing acceptable.

---

# 19. Phase 14 — Transition

## Objective

Prevent trivial side-by-side comparison.

Implement:

- original scene removal/obscuring;
- short transition;
- investigation handoff.

Keep it fast.

Do not overproduce cinematic effects yet.

---

# 20. Phase 15 — Investigation Mode

## Objective

Allow the player to inspect the altered scene.

Implement:

- altered object states;
- selectable hit regions;
- semantic object selection;
- correct discovery;
- incorrect selection;
- already-discovered handling;
- progress feedback.

## Tests

- three changes detectable;
- duplicate scoring prevented;
- incorrect actions handled.

---

# 21. Phase 16 — Evidence Panel

## Objective

Transform discoveries into investigation.

Implement:

- evidence creation/collection;
- evidence cards;
- discovered-only visibility;
- review UI;
- responsive behavior.

## Exit Criteria

The player understands that observations now matter to the mystery.

---

# 22. Phase 17 — Witness Experience

## Objective

Introduce narrative testimony.

Implement:

- witness identity;
- statement presentation;
- evidence review access;
- progression to deduction.

Do not add a generalized dialogue engine unless needed.

---

# 23. Phase 18 — Contradiction & Deduction

## Objective

Deliver the key differentiator beyond spot-the-difference.

Implement:

- evidence-based deduction question;
- plausible answer options;
- answer submission;
- deterministic evaluation;
- feedback consistent with `GAME_SPEC.md`.

## Gate

The question must be solvable from previously available evidence.

---

# 24. Phase 19 — Final Decision

## Objective

Let the player commit to the case explanation.

Implement:

- final question;
- options;
- confirmation if appropriate;
- submission;
- correctness evaluation.

Do not change the canonical solution based on player score.

---

# 25. Phase 20 — Resolution

## Objective

Make the mystery satisfying.

Implement a resolution that explains:

- what happened;
- decisive evidence;
- contradiction;
- deduction;
- conclusion.

## Fairness Gate

No decisive new clue may appear for the first time in the resolution.

---

# 26. Phase 21 — Results & Scoring

## Objective

Reward performance and close the loop.

Display:

- total score;
- score breakdown;
- accuracy where supported;
- rating/stars;
- completion status;
- replay option.

Persist:

- completion;
- best score;
- best rating;
- attempt count.

---

# 27. Phase 22 — Replay

## Objective

Ensure Case 001 can be replayed reliably.

Replay must reset:

- current session;
- evidence;
- deductions;
- temporary score;
- investigation discoveries.

Preserve:

- historical completion;
- best score;
- best rating;
- attempt count.

## Resource Test

Repeat the case to detect Phaser/event/timer leaks.

---

# 28. Phase 23 — Application Shell & Case Selection

## Objective

Provide a minimal complete game application around Case 001.

Implement:

- home;
- case selection;
- Case 001 status;
- settings entry;
- results navigation.

Avoid building a large content catalog UI for one case.

---

# 29. Phase 24 — Settings & Accessibility Baseline

## Objective

Provide essential player controls.

Potential MVP settings:

- sound effects;
- music/ambience when audio exists;
- reduced-motion compatibility;
- reset progress only if intentionally supported.

Verify:

- keyboard navigation for app UI;
- focus states;
- contrast;
- touch targets;
- readable typography.

---

# 30. Phase 25 — Audio & Polish

## Objective

Improve feel without changing game rules.

Potential additions:

- ambient lounge sound;
- countdown cue;
- discovery cue;
- incorrect-selection cue;
- deduction cue;
- resolution cue;
- subtle transitions.

Gameplay must remain understandable muted.

---

# 31. Phase 26 — Automated Vertical Slice QA

## Objective

Run the complete quality strategy.

Required:

```text
lint
type-check
unit tests
integration tests
production build
Case 001 E2E happy path
imperfect-player E2E path
```

Fix regressions before playtesting.

---

# 32. Phase 27 — Manual Responsive QA

Verify:

- desktop;
- tablet;
- smartphone;
- pointer;
- touch.

Inspect:

- scene cropping;
- hit regions;
- evidence panel;
- witness UI;
- deduction UI;
- results;
- transitions.

---

# 33. Phase 28 — Human Playtest Round 1

## Objective

Determine whether the game is understandable and fair.

Do not coach players.

Measure:

- completion;
- confusion;
- missed clues;
- incorrect selections;
- deduction success;
- final decision;
- time;
- perceived fairness;
- desire to play another case.

## Key Question

> **Did players feel they solved a mystery rather than guessed a puzzle?**

---

# 34. Phase 29 — Vertical Slice Revision

Prioritize playtest findings.

Fix in this order:

1. unfair logic;
2. unclear objective;
3. broken mechanics;
4. inaccessible clues;
5. confusing evidence;
6. ambiguous deductions;
7. poor resolution;
8. excessive friction;
9. polish.

Do not add unrelated features during revision.

---

# 35. Phase 30 — Human Playtest Round 2

Retest after meaningful changes.

Goal:

- confirm fixes;
- detect new regressions;
- evaluate whether the core loop now creates desire for another case.

If the core experience remains weak, continue improving Case 001 before scaling.

---

# 36. Vertical Slice Exit Gate

Stage 1 is complete when:

```text
[ ] Case 001 works end-to-end
[ ] automated checks pass
[ ] production build passes
[ ] responsive QA passes
[ ] mystery logic approved
[ ] resolution judged fair
[ ] replay reliable
[ ] no critical resource leaks
[ ] human playtesting completed
[ ] major confusion addressed
[ ] players demonstrate interest in another case
```

This is the most important early gate.

---

# 37. Stage 2 — MVP Content Expansion

After the vertical slice proves the loop, expand to approximately 5–10 cases.

Recommended strategy:

- Case 002 tests whether the engine truly supports another case;
- Case 003 introduces modest variation;
- Cases 004–005 test content production efficiency;
- later cases expand settings and deduction patterns.

Do not immediately create ten cases before proving the second case can be authored cleanly.

---

# 38. Case 002 Architecture Test

Case 002 is a technical milestone.

Ask:

> Can we add this case primarily through content and assets?

If major core-engine modifications are required, determine whether:

- the architecture is incomplete;
- the new case introduces a legitimate reusable mechanic;
- the case design violates current game rules.

Do not accumulate case-specific hacks.

---

# 39. MVP Content Themes

Potential collections:

### Airport Mysteries
- The Missing Passport
- Unclaimed Suitcase
- Gate 17
- The Wrong Boarding Pass

### Hotel Mysteries
- Room 407
- The Vanishing Necklace
- The Midnight Visitor

### Corporate Mysteries
- The Missing Contract
- The Deleted Presentation
- The Boardroom Leak

Exact titles are provisional.

---

# 40. MVP Progression

Introduce only enough progression to motivate continued play.

Potential:

```text
Case completion
→ stars/rating
→ next case
→ collection progress
```

Avoid:

- grinding;
- complex currencies;
- energy systems;
- elaborate skill trees.

---

# 41. MVP Analytics

Once external testing begins, implement privacy-conscious analytics for:

```text
game_opened
case_started
observation_completed
change_discovered
incorrect_selection
hint_used
deduction_submitted
final_decision_submitted
case_completed
case_replayed
case_abandoned
```

Do not let analytics failures break gameplay.

---

# 42. Stage 2 Exit Gate

MVP content stage is ready for broader validation when:

- multiple cases work through the same engine;
- case creation no longer requires routine engine hacks;
- progression works;
- persistence is stable;
- analytics exists if needed;
- quality is consistent;
- content production effort is understood.

---

# 43. Stage 3 — External Market Validation

## Objective

Test real demand.

Evaluate:

- activation;
- case completion;
- replay;
- D1 retention;
- D7 retention;
- later D30 retention;
- cases played per user;
- hint usage;
- abandonment;
- desire for new content.

Do not interpret early data without sufficient sample size.

---

# 44. Market Validation Questions

Answer:

1. Do players understand EchoTrace quickly?
2. Which cases perform best?
3. Where do players abandon?
4. Is observation fun or frustrating?
5. Does deduction increase satisfaction?
6. Do players replay?
7. Do they return for new cases?
8. Would they pay for more cases?
9. Which themes attract them?
10. Does Daily Echo interest them?

---

# 45. Stage 4 — Commercial Systems

Only after engagement evidence exists should commercial systems become a major engineering focus.

Potential order:

```text
Premium case entitlement model
        ↓
Payment integration
        ↓
Premium case packs
        ↓
Rewarded hints if appropriate
        ↓
Daily Echo
        ↓
Subscription only if recurring content supports it
```

Detailed economics belong in `MONETIZATION.md`.

---

# 46. Premium Case Packs

Preferred early paid model:

- free introductory cases;
- themed paid case packs;
- transparent ownership;
- no pay-to-win mechanic.

This is easier to explain than an early subscription.

---

# 47. Rewarded Hints

If advertising is introduced:

- player chooses to watch;
- reward is clear;
- core gameplay is not intentionally made frustrating to force ads;
- frequency is controlled.

Do not add aggressive interstitial advertising merely because it is easy to monetize.

---

# 48. Daily Echo

Daily Echo should be introduced when:

- core loop is validated;
- enough content exists;
- backend/date authority is ready;
- score integrity requirements are understood.

Potential features:

- one mystery per day;
- daily score;
- accuracy;
- streak;
- percentile/rank;
- shareable result.

Daily Echo is a retention system, not an MVP requirement.

---

# 49. Subscription Gate

Do not launch a subscription merely because recurring billing is technically possible.

A subscription should require a credible recurring value proposition such as:

- regular new cases;
- Daily Echo enhancements;
- premium collections;
- meaningful member benefits.

Without a reliable content pipeline, prefer case packs.

---

# 50. Stage 5 — Content Scale

When manual case production becomes the bottleneck, build the internal Case Builder.

It should support:

- metadata;
- canonical truth;
- scenes;
- objects;
- changes;
- evidence;
- witnesses;
- contradictions;
- deductions;
- solution;
- scoring;
- validation;
- preview;
- versioning.

It must generate the same case format used by the runtime.

---

# 51. AI-Assisted Authoring

After the authoring system is stable, AI can accelerate:

- premise generation;
- witness drafts;
- clue alternatives;
- contradiction analysis;
- difficulty variants;
- localization drafts;
- QA scenarios.

Human approval remains mandatory for logical fairness and final publication.

---

# 52. Native Distribution

Web/PWA should prove the product first.

Native packaging may follow when justified by:

- user demand;
- app-store discovery;
- notifications;
- mobile monetization;
- retention strategy.

Do not maintain separate native game logic.

Preserve shared domain and case systems.

---

# 53. Deployment Milestones

Suggested environments:

```text
Local
  ↓
Preview / Pull Request
  ↓
Staging
  ↓
Production
```

The vertical slice may begin with fewer environments if necessary, but production deployment should be repeatable.

---

# 54. Version Milestones

Possible release labels:

```text
0.1.0 — repository scaffold
0.2.0 — domain + case validator
0.3.0 — Phaser shell
0.4.0 — observation/investigation
0.5.0 — evidence/witness/deduction
0.6.0 — complete Case 001
0.7.0 — QA/polish
0.8.0 — internal playtest
0.9.0 — external vertical slice
1.0.0 — validated MVP release
```

These labels are illustrative and may be adjusted.

---

# 55. Codex Task Size

Codex should normally receive tasks small enough to:

- understand fully;
- implement coherently;
- test completely;
- review as one change.

Preferred task scope:

> one system, one phase, one bug, or one vertical behavior.

Avoid:

> “Build all of EchoTrace.”

---

# 56. Standard Codex Task Prompt

Use a pattern such as:

```text
Read:
- GAME_SPEC.md
- ARCHITECTURE.md
- AGENTS.md
- TESTING_STRATEGY.md

Task:
[one specific task]

Requirements:
[specific acceptance behavior]

Out of scope:
[explicit exclusions]

Before coding:
- inspect the current implementation;
- report conflicts or ambiguities;
- produce a concise plan.

Implementation:
- preserve architecture;
- keep the change scoped;
- add/update relevant tests.

Verification:
- run lint;
- run type-check;
- run targeted tests;
- run the relevant full test suite;
- run production build.

At completion report:
- what changed;
- files changed;
- tests added/updated;
- verification results;
- unresolved risks.

Do not modify unrelated code.
```

---

# 57. First Implementation Prompt After Documentation

Once all nine documents are complete, the first Codex task should be **planning only**.

Recommended:

```text
You are the lead software architect for EchoTrace.

Read all repository documentation fully:
- PRD.md
- GAME_SPEC.md
- CASE_AUTHORING_GUIDE.md
- ARCHITECTURE.md
- AGENTS.md
- TESTING_STRATEGY.md
- ROADMAP.md
- MONETIZATION.md
- README.md

Do not implement code.
Do not install dependencies.
Do not scaffold the application.

Produce the final implementation plan for Stage 1: the EchoTrace vertical slice.

Include:
- final proposed folder structure;
- dependencies and why each is needed;
- case data format;
- state-management approach;
- React–Phaser bridge;
- persistence approach;
- testing setup;
- exact implementation tasks in dependency order;
- risks;
- documentation conflicts;
- decisions requiring project-owner approval.

Keep the MVP simple and scalable.
Stop after the plan.
```

---

# 58. Recommended Vertical Slice Task Queue

After the architecture plan is approved:

```text
T01  Scaffold application
T02  Configure quality tooling
T03  Define domain types
T04  Implement case schema
T05  Implement cross-reference validator
T06  Implement game state machine
T07  Implement evidence domain
T08  Implement deduction domain
T09  Implement scoring engine
T10  Implement progress repository
T11  Integrate Phaser shell
T12  Implement typed React–Phaser bridge
T13  Implement case loader
T14  Finalize Case 001 authoring
T15  Add Case 001 structured data
T16  Build briefing
T17  Build observation scene
T18  Build observation timer
T19  Build transition
T20  Build investigation
T21  Build evidence panel
T22  Build witness phase
T23  Build deduction
T24  Build final decision
T25  Build resolution
T26  Build results/scoring UI
T27  Implement replay
T28  Build minimal case selection/app shell
T29  Accessibility/responsive pass
T30  Audio/polish
T31  E2E critical paths
T32  Production readiness audit
T33  Human playtest
T34  Revision sprint
```

Tasks may be split further if implementation complexity warrants it.

---

# 59. No Calendar Fiction

Do not promise that a phase will take a specific number of days without actual team velocity data.

Instead estimate using:

- task complexity;
- dependencies;
- observed Codex performance;
- human review time;
- asset production;
- testing;
- playtest revision.

After several tasks, velocity can be measured and projections refined.

---

# 60. Risk Register

## Risk 1 — Ordinary Spot-the-Difference Feel

Mitigation:

- evidence;
- witness;
- contradiction;
- deduction;
- satisfying resolution.

## Risk 2 — Case Logic Is Unfair

Mitigation:

- canonical truth first;
- dependency mapping;
- logic review;
- playtesting.

## Risk 3 — AI-Generated Technical Debt

Mitigation:

- `AGENTS.md`;
- scoped prompts;
- architecture boundaries;
- tests;
- diff review.

## Risk 4 — Case-Specific Engine Hacks

Mitigation:

- data-driven cases;
- Case 002 architecture test;
- generic mechanics only.

## Risk 5 — Content Production Too Expensive

Mitigation:

- structured authoring;
- reusable engine;
- later Case Builder;
- later AI assistance.

## Risk 6 — Poor Retention

Mitigation:

- strong cases;
- progression;
- later Daily Echo;
- analytics-driven iteration.

## Risk 7 — Premature Monetization

Mitigation:

- validate engagement first;
- case packs before subscription where appropriate.

## Risk 8 — Scope Explosion

Mitigation:

- stage gates;
- MVP exclusions;
- surgical Codex tasks.

---

# 61. Decision Log Candidates

During development, record material decisions such as:

- final case storage format;
- state-management library if any;
- deployment provider;
- PWA timing;
- backend provider;
- database;
- payment provider;
- analytics provider.

Do not decide these prematurely when requirements do not yet demand them.

---

# 62. Roadmap Success Definition

The roadmap succeeds if EchoTrace reaches market validation with:

- a stable reusable engine;
- compelling mystery gameplay;
- fair cases;
- measurable player behavior;
- efficient case production;
- limited technical debt;
- clear monetization options.

The roadmap does not succeed merely because many features were shipped.

---

# 63. North-Star Development Question

At every stage ask:

> **Does this work make it easier to deliver a better mystery to the player?**

If not, determine whether it is truly necessary now.

---

# 64. Document Status

**Document:** `ROADMAP.md`  
**Version:** 1.0  
**Status:** Initial Execution Baseline  
**Product:** EchoTrace  
**Previous Document:** `TESTING_STRATEGY.md`  
**Next Document:** `MONETIZATION.md`

### Documentation Progress

```text
ECHOTRACE/
│
├── README.md                  ○ Pending
├── PRD.md                     ● COMPLETE
├── GAME_SPEC.md               ● COMPLETE
├── CASE_AUTHORING_GUIDE.md    ● COMPLETE
├── ARCHITECTURE.md            ● COMPLETE
├── AGENTS.md                  ● COMPLETE
├── TESTING_STRATEGY.md        ● COMPLETE
├── ROADMAP.md                 ● DOCUMENT 7 — COMPLETE
└── MONETIZATION.md            ◉ DOCUMENT 8 — NEXT
```
