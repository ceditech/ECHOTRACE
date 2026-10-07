# EchoTrace

> **Observe. Remember. Deduce.**

EchoTrace is a short-session visual detective, memory, mystery, and logic puzzle game in which players observe a scene, identify meaningful changes, turn those observations into evidence, evaluate witness testimony, detect contradictions, and solve a mystery.

This repository is designed for disciplined AI-assisted development using Codex and human review.

---

## Project Status

**Stage:** Pre-Development / Product Definition  
**Current Goal:** Build and validate the vertical slice  
**Vertical Slice:** Case 001 — *The Missing Passport*  
**Initial Platform:** Web / PWA direction  
**Future Platforms:** iOS / Android packaging after product validation  
**Documentation Baseline:** Complete

The next engineering action is **planning only**. Do not begin implementation until the architecture plan has been reviewed and approved.

---

# 1. Product Vision

EchoTrace should create the feeling:

> **“I wonder what today’s mystery is.”**

The core player experience is:

```text
Observe
   ↓
Remember
   ↓
Investigate
   ↓
Collect Evidence
   ↓
Evaluate Testimony
   ↓
Identify Contradictions
   ↓
Deduce
   ↓
Make a Decision
   ↓
Resolve the Mystery
   ↓
Score / Replay / Continue
```

EchoTrace must not become a generic spot-the-difference game.

Visual memory is the entry mechanic.

**Evidence and deduction are the product identity.**

---

# 2. Product Positioning

Working positioning:

> **A visual detective game where memory, evidence, and deduction solve the mystery.**

Working tagline:

> **Every detail leaves a trace.**

Primary phrase:

> **Observe. Remember. Deduce.**

---

# 3. Vertical Slice

The first complete playable case is:

## Case 001 — The Missing Passport

**Setting:** Airport lounge  
**Observation Time:** Approximately 25 seconds  
**Target Playtime:** Approximately 3–5 minutes for the initial case  
**Purpose:** Prove the complete EchoTrace loop

The case must include:

- briefing;
- original scene;
- timed observation;
- altered scene;
- three meaningful changes;
- evidence;
- at least one witness;
- at least one contradiction;
- deduction;
- final decision;
- logical resolution;
- deterministic score;
- replay.

The exact canonical mystery must be finalized through the Case 001 authoring process before implementation hardcodes any assumptions.

---

# 4. Technology Direction

Initial architecture:

```text
Next.js
React
TypeScript
Tailwind CSS
Phaser 3
Runtime schema validation
Automated testing
Browser-local persistence for the vertical slice
```

The exact supported package versions must be selected during repository initialization based on current compatibility and stability.

Do not add a backend, database, authentication, payment system, or other major infrastructure until a current requirement needs it.

---

# 5. Architectural Model

EchoTrace follows a layered architecture.

```text
Presentation
     ↓
Application
     ↓
Domain

Infrastructure implements domain/application interfaces.
```

### Presentation

- Next.js routes
- React UI
- Phaser rendering
- user input

### Application

- case orchestration
- commands/use cases
- session coordination
- persistence coordination

### Domain

- case rules
- state machine
- evidence
- deductions
- scoring
- progression

### Infrastructure

- local persistence
- analytics adapters
- logging
- future APIs
- future authentication
- future payments

Core domain logic must remain independent of React, Next.js, Phaser, browser storage, and vendor SDKs.

---

# 6. Data-Driven Case Principle

Normal EchoTrace cases must be structured content.

The desired model is:

```text
EchoTrace Engine
      +
Case Definition
      +
Case Assets
      =
Playable Mystery
```

Adding a standard new case should **not** require changing the core engine.

If a case requires a missing reusable mechanic, the mechanic should be designed generically rather than implemented as a case-specific hack.

---

# 7. Repository Documentation

The repository is governed by nine primary documents.

```text
ECHOTRACE/
│
├── README.md
├── PRD.md
├── GAME_SPEC.md
├── CASE_AUTHORING_GUIDE.md
├── ARCHITECTURE.md
├── AGENTS.md
├── TESTING_STRATEGY.md
├── ROADMAP.md
└── MONETIZATION.md
```

These files collectively form the source of truth for the project.

---

# 8. Documentation Map

## `README.md`

**Purpose:** Repository entry point.

Read this first to understand the project and find the correct specification.

---

## `PRD.md`

**Purpose:** Product requirements.

Defines:

- vision;
- audience;
- product principles;
- MVP scope;
- functional requirements;
- UX;
- metrics;
- risks;
- long-term stages.

Read when making product-level decisions.

---

## `GAME_SPEC.md`

**Purpose:** Gameplay rules.

Defines:

- core loop;
- game phases;
- observation;
- investigation;
- evidence;
- witnesses;
- contradictions;
- deductions;
- scoring;
- replay;
- difficulty;
- Case 001 gameplay acceptance criteria.

Read before implementing game mechanics.

---

## `CASE_AUTHORING_GUIDE.md`

**Purpose:** Mystery creation standard.

Defines:

- canonical truth;
- evidence chains;
- characters;
- witness statements;
- contradictions;
- red herrings;
- visual changes;
- deductions;
- resolutions;
- difficulty;
- case validation;
- playtesting;
- future Case Builder requirements.

Read before designing or modifying a case.

---

## `ARCHITECTURE.md`

**Purpose:** Technical system blueprint.

Defines:

- technology direction;
- architectural layers;
- dependency direction;
- repository structure;
- state ownership;
- case loader;
- React–Phaser boundary;
- persistence;
- scoring/evidence engines;
- security;
- performance;
- future backend extension points.

Read before foundational engineering work.

---

## `AGENTS.md`

**Purpose:** Engineering constitution.

Defines mandatory behavior for Codex and other coding agents:

- read specs;
- plan first;
- preserve scope;
- preserve architecture;
- strict TypeScript;
- testing;
- security;
- dependencies;
- Git discipline;
- verification;
- completion reports.

**All coding tasks are governed by `AGENTS.md`.**

---

## `TESTING_STRATEGY.md`

**Purpose:** Quality and verification strategy.

Defines:

- static checks;
- unit tests;
- integration tests;
- E2E;
- case validation;
- responsive QA;
- accessibility;
- performance;
- regression testing;
- mystery fairness;
- human playtesting;
- release gates.

Read before implementing or reviewing tests.

---

## `ROADMAP.md`

**Purpose:** Execution sequence.

Defines:

- development stages;
- implementation phases;
- Codex task queue;
- stage gates;
- Case 001 sequence;
- MVP expansion;
- market validation;
- commercial rollout;
- future Case Builder.

Read when deciding what should be built next.

---

## `MONETIZATION.md`

**Purpose:** Commercial strategy.

Defines:

- free experience;
- premium case packs;
- rewarded hints;
- Daily Echo;
- subscription criteria;
- entitlements;
- pricing hypotheses;
- LTV/CAC;
- content economics;
- monetization guardrails.

Read before implementing any commercial feature.

---

# 9. Recommended Reading Order

A new developer or AI agent should read:

```text
1. README.md
2. PRD.md
3. GAME_SPEC.md
4. CASE_AUTHORING_GUIDE.md
5. ARCHITECTURE.md
6. AGENTS.md
7. TESTING_STRATEGY.md
8. ROADMAP.md
9. MONETIZATION.md
```

This moves from:

```text
WHY
 ↓
WHAT
 ↓
HOW THE GAME WORKS
 ↓
HOW CONTENT IS CREATED
 ↓
HOW SOFTWARE IS STRUCTURED
 ↓
HOW ENGINEERING MUST BE DONE
 ↓
HOW QUALITY IS VERIFIED
 ↓
WHAT TO BUILD NEXT
 ↓
HOW THE BUSINESS MAY MONETIZE
```

---

# 10. Task-Specific Reading

Not every small task requires rereading every document.

### Architecture Task

Read:

```text
PRD.md
GAME_SPEC.md
CASE_AUTHORING_GUIDE.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
```

### Gameplay Task

Read:

```text
GAME_SPEC.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
```

### New Case

Read:

```text
GAME_SPEC.md
CASE_AUTHORING_GUIDE.md
AGENTS.md
TESTING_STRATEGY.md
```

### Monetization Feature

Read:

```text
PRD.md
MONETIZATION.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
```

`AGENTS.md` governs every coding task.

---

# 11. Proposed Source Structure

The exact scaffold must be approved during architecture planning, but the current blueprint is:

```text
ECHOTRACE/
│
├── public/
│   ├── assets/
│   │   ├── common/
│   │   └── cases/
│   │       └── case-001/
│   └── audio/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── game/
│   │   ├── domain/
│   │   ├── application/
│   │   └── phaser/
│   ├── cases/
│   │   ├── schemas/
│   │   ├── loader/
│   │   ├── validation/
│   │   └── content/
│   ├── infrastructure/
│   ├── hooks/
│   ├── lib/
│   └── types/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
└── package.json
```

Do not create unnecessary empty layers merely to match this diagram.

---

# 12. Development Workflow

Every significant coding task follows:

```text
SPEC
 ↓
PLAN
 ↓
CODE
 ↓
TEST
 ↓
INSPECT
 ↓
FIX
 ↓
VERIFY
 ↓
COMMIT
```

Before implementation:

- read relevant documentation;
- inspect existing code;
- identify scope;
- identify risks;
- plan;
- define verification.

After implementation:

- inspect the diff;
- run tests;
- run lint;
- run type-check;
- run production build;
- report files changed and verification results.

---

# 13. Engineering Principles

The most important repository rules are:

1. Read specifications before coding.
2. Plan before significant implementation.
3. Keep scope surgical.
4. Preserve architecture.
5. Keep cases data-driven.
6. Maintain one source of truth.
7. Use strict TypeScript.
8. Keep domain logic independent of rendering.
9. Validate authored/untrusted data.
10. Never swallow errors.
11. Test deterministic logic.
12. Add regression tests for reproducible bugs.
13. Keep dependencies minimal.
14. Protect accessibility and responsive behavior.
15. Never expose secrets client-side.
16. Do not claim verification that was not performed.
17. Preserve user changes.
18. Update documentation when behavior materially changes.

The complete rules are in `AGENTS.md`.

---

# 14. Testing Philosophy

EchoTrace quality requires both:

```text
SOFTWARE CORRECTNESS
        +
MYSTERY CORRECTNESS
```

The test strategy includes:

- schema validation;
- unit testing;
- integration testing;
- E2E;
- responsive QA;
- accessibility;
- performance;
- regression testing;
- mystery logic review;
- human playtesting.

A case can pass every automated test and still fail publication if its mystery is unfair.

---

# 15. Case Authoring Philosophy

Cases should be designed backward from the truth.

```text
Canonical Solution
      ↓
Incident
      ↓
Evidence Chain
      ↓
Characters / Witnesses
      ↓
Contradictions
      ↓
Visual Changes
      ↓
Observation Scene
      ↓
Deductions
      ↓
Red Herrings
      ↓
Resolution
      ↓
Playtest
```

Do not randomly create visual differences and attempt to invent a mystery around them afterward.

---

# 16. Mystery Fairness

Every standard case must be:

- observable;
- rememberable;
- relevant;
- deductible;
- fair;
- explainable.

Core rule:

> **Never ask the player to know something the case never gave them a fair opportunity to learn.**

The final resolution may explain existing evidence.

It must not introduce a decisive hidden clue that makes the answer correct only after the fact.

---

# 17. State Machine

The initial gameplay flow is:

```text
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
```

There must be one authoritative current phase.

---

# 18. Initial Scoring Direction

The current design target is configurable per case.

Illustrative Case 001 values:

```text
Base completion score                 1,000
Correct primary change                +200 each
Important evidence                    +250 each
Correct deduction                     +300 each
Correct final decision                +500
Efficiency bonus                      0–500
Incorrect investigation selection     -100 each
Hint penalty                          configurable
```

These are initial tuning values, not immutable product economics.

Scoring must be deterministic and independently testable.

---

# 19. Persistence

The vertical slice should begin with local persistence through an abstraction.

Conceptually:

```text
ProgressRepository
        │
        └── LocalProgressRepository
```

Persist initially:

- completed cases;
- best score;
- best rating;
- attempt count;
- basic settings.

Do not scatter direct browser-storage calls throughout components.

---

# 20. MVP Boundaries

The initial vertical slice does **not** require:

- multiplayer;
- real-time competition;
- chat;
- clans/guilds;
- public UGC;
- live AI-generated cases;
- subscriptions;
- complex payment systems;
- native applications;
- advanced Case Builder;
- elaborate backend;
- large achievement system;
- public leaderboards;
- energy/lives systems.

Do not implement future features merely because they are mentioned in strategy documents.

---

# 21. Product Stages

```text
STAGE 1
Vertical Slice
1 polished case
→ Prove fun

STAGE 2
MVP
5–10 cases
→ Prove repeat engagement

STAGE 3
Market Validation
External players + analytics
→ Prove retention

STAGE 4
Commercial
Premium content + Daily Echo
→ Prove revenue

STAGE 5
Mystery Platform
Large library + Case Builder + AI assistance
→ Scale content
```

---

# 22. Monetization Direction

Preferred sequence:

```text
Free introductory cases
        ↓
Premium themed case packs
        ↓
Optional rewarded hints
        ↓
Daily Echo
        ↓
Subscription only after recurring value exists
```

Illustrative pricing hypotheses include:

```text
5-case pack     ~$2.99
10-case pack    ~$4.99
20-case pack    ~$7.99
```

These are experiments, not approved final prices.

The fundamental economic objective is:

> **LTV > CAC**

Revenue must not be pursued by making mysteries intentionally frustrating.

---

# 23. Important Product Metrics

When market validation begins, evaluate:

- activation;
- first-case completion;
- case completion;
- replay;
- D1 retention;
- D7 retention;
- D30 retention;
- sessions per player;
- cases per player;
- hint usage;
- free-to-paid conversion;
- ARPU;
- ARPPU;
- CAC;
- LTV.

Early vertical-slice testing should prioritize qualitative evidence before inventing arbitrary numeric thresholds.

---

# 24. Setup

T01 provides the minimal Next.js App Router scaffold in `src/app/`.

Verified prerequisites: the existing NVM-managed Node **22.18.0** and npm **11.5.2**. Next.js **16.3.8** supports Node >=20.9.0; React **19.3.0** is the selected compatible baseline. Use npm and the generated `package-lock.json`; do not switch package managers.

From the repository root:

```powershell
npm ci
npm run dev
```

The default development URL is `http://localhost:3000`.

```powershell
npm run lint
npm run typecheck
npm run format:check
npm run test
npm run check
npm run build
npm run start
```

Run `build` before `start`. Stop a local server with Ctrl+C before reusing its port. T01 verification used `-- --hostname 127.0.0.1 --port 3100` for development and port `3101` for production.

When Codex cannot resolve the NVM executables, use the existing paths explicitly, with execution approval when required:

```powershell
$env:Path = 'C:\nvm4w\nodejs;' + $env:Path
& 'C:\nvm4w\nodejs\node.exe' --version
& 'C:\nvm4w\nodejs\npm.cmd' --version
& 'C:\nvm4w\nodejs\npm.cmd' ci
& 'C:\nvm4w\nodejs\npm.cmd' run dev
```

This PATH change applies only to that process and its children. No permanent PATH change or Node installation is needed.

Strict TypeScript includes `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and the `@/*` source alias. Tailwind CSS 4 uses the PostCSS plugin and `@import "tailwindcss"`; no legacy Tailwind configuration is required. Next.js generates the ignored `next-env.d.ts` during development/build; do not edit it manually. Automatic Next.js agent-rule generation is disabled to preserve `AGENTS.md`.

`npm run format` writes Prettier formatting; `format:check` verifies it. Product Markdown documents, generated files, and the npm-managed lockfile are excluded to avoid unrelated churn. `test` and `test:run` run Vitest once and exit; `test:watch` is the explicit interactive command. Tests live in `tests/unit/` or `tests/integration/`, use the Node environment and the `@/` alias, and currently smoke-test the existing page without gameplay logic. `check` stops at the first failure across format, lint, typecheck, and tests; run the production build separately. Use `npm ci` for reproducible installs and `npm install` only when intentionally changing dependencies.

DOM/React Testing Library support is deferred until UI behavior warrants component tests. Playwright/browser lifecycle tooling is deferred to later integration tasks, with broader E2E at T31. ESLint rejects test-only imports in `src/`. Domain imports currently permit only sibling domain modules; the separate `tsconfig.domain.json` check excludes DOM and Node ambient types. Expand that import allow-list deliberately if the domain later needs subdirectories. Preserve Presentation → Application → Domain imports; Phaser rendering must never become authoritative game state.

`src/game/domain/` contains plain readonly TypeScript contracts: `identity.ts`, `scene.ts`, `reasoning.ts`, `scoring.ts`, `case.ts`, and `session.ts`. ID aliases communicate meaning but are not runtime validation or nominal brands. Text/asset references separate authored content from presentation. Logical objects, scene visuals, and interaction regions are independent, allowing a disappeared object to retain a selectable region. Person changes use objects linked to character IDs. Schema compatibility (`schemaVersion`) and authored revision (`caseVersion`) remain distinct.

`npm run typecheck` checks both the application and the isolated domain; `typecheck:domain` runs the isolated check alone. Compile-time contracts in `tests/types/` check the domain vocabulary and bidirectional schema/type compatibility. Scoring formulas, retry/progression/timing policy, hint penalties, and Case 001 truth remain later decisions. Ordered reconstruction references describe authored events rather than an executable timeline engine.

Case definitions are untrusted until `validateCaseDefinition(input: unknown)` in `src/cases/validation/validate-case-definition.ts` succeeds. The pipeline checks declarative JSON data, strict Zod structures, supported schema version (currently 1), namespace uniqueness, entity references, and deterministic semantic consistency. It returns `{ ok: true, value: CaseDefinition }` or `{ ok: false, issues }`; issues have category, code, path segments, and an actionable message. Ordinary content errors do not throw. The structural schema alone does not establish trust. Successful parsing returns a copy; readonly domain types are compile-time contracts rather than a runtime freeze.

Zod 4.6.5 is the sole runtime validation dependency, confined to `src/cases/schemas/`. The domain remains plain TypeScript and never imports Zod. IDs use nonempty alphanumeric/underscore/hyphen tokens beginning with an alphanumeric character; text keys additionally allow dots. Case revisions are positive integers independent of schema support. Coordinates are normalized to [0, 1], region extents are positive and must stay inside the scene. Interaction regions need no visual. Durations and scoring values are finite: observation/estimated duration positive, transition and score/penalty magnitudes nonnegative. No tuning defaults or scoring formulas are supplied. Canonical deduction answers must match their question kind and local choices; witnesses and statements must agree on ownership. Star thresholds increase in star order with nondecreasing score requirements; hint penalty levels cannot repeat. Optional scoring lists may remain empty, without inventing rating or hint policy.

T04 includes entity cross-reference checks; T05 extends the same API with relationship integrity after those checks pass. A relationship change retains its subject object while its relation or target may change. Contradiction categories enforce the authoring guide's combinations: visual-versus-testimony pairs a change/evidence reference with a statement; evidence-versus-testimony pairs evidence with a statement; testimony-versus-testimony pairs statements belonging to different witnesses. Pair order is irrelevant. The new semantic issue codes are `relationship_subject_mismatch`, `contradiction_kind_mismatch`, and `testimony_witness_mismatch`. Timeline and object-relationship categories have no precise reference-kind matrix yet, so existing structural/reference checks apply without an invented matrix.

Asset IDs and text keys are validated structurally, but T03 has no asset manifest or localization dictionary against which to resolve them. Resource availability remains a future manifest/loader concern. Supporting-information links describe authored justification; they do not define evidence-unlock dependencies or phase availability. Cycles in descriptive links are not automatically impossible dependencies. No blanket cycle ban, scene-ownership rule, or orphan-content rejection is inferred from those links; optional flavor and red herrings remain allowed. The authoring guide requires discoverable evidence and pre-question support, but the current contracts cannot prove those timing/reachability properties. Clarify that dependency/availability model before adding such checks. Machine validation cannot prove clue visibility, narrative truth, fairness, or enjoyment; author review and playtesting remain mandatory. Synthetic test fixtures are not production cases.

The production dependency audit passed. The full audit reports five high-severity findings in the development-only lint dependency chain rooted in `braces` (GHSA-vfj7-8cjw-p6xm), with no published patch at verification. ESLint 9.39.5 also reports an unsupported-version warning; ESLint 10 is outside the current React/accessibility lint plugins' declared peer ranges. Do not use `npm audit fix --force` to downgrade the approved Next.js baseline.

The owner originally approved transitive development-only Zod introduced through the lint tooling, then explicitly authorized direct Zod use for T04 case validation. The owner also accepted the documented development-tooling braces risk and retained compatible ESLint 9. No audit suppression, forced overrides, forks, or dependency downgrades were introduced.

`src/game/domain/session-machine.ts` provides the deterministic T06 foundation: `createInitialSession(validatedCase, { attemptId, startedAt })`, `getNextPhase(phase)`, and `applySessionCommand(state, command, prerequisite)`. The existing `CaseSession` is the sole authoritative state. Initialization starts at `case_briefing` with fresh empty collections and null future outcomes. Case identity, authored case version, and supplied attempt identity remain separate. Malformed injected initialization values are programmer errors; the engine does not revalidate case JSON.

The command shape is `{ type: "advance_phase", from, to, at }`. Only adjacent phases in the documented standard sequence are legal; `from` also rejects stale commands. Every request requires an explicit `{ ok: true }` or `{ ok: false }` prerequisite decision from future approved orchestration. That boundary is not a gameplay gate implementation or a player-controlled approval: future application logic must evaluate the approved condition. There is no permissive default, timer, deduction submission/evaluation, scoring, or evidence behavior. Results is terminal for this attempt; replay will initialize a separate attempt later.

Accepted commands return `{ ok: true, state }` with a new session object. Rejected commands return `{ ok: false, code, state }` retaining the original state. Codes are `command_not_allowed_in_phase`, `invalid_session_state`, `invalid_command_timestamp`, and `prerequisite_not_satisfied`. The core never mutates the input; readonly fields protect consumers at compile time rather than freezing runtime objects. Supplied finite timestamps record observation start/end, investigation start, and completion; commands cannot precede already recorded milestones. This is not a full command history or observation-timer policy. Entering results records attempt completion independently of final-decision correctness; score and reasoning remain untouched. Future React/context hosts the state, while rendering, clocks, persistence, and other side effects stay outside the core. ESLint also rejects direct Date.now, Math.random, and crypto.randomUUID calls in the domain.

T07 adds `evaluateSelection(caseDefinition, session, selection)` in `src/game/domain/selection.ts` and `evaluateEvidenceAvailability`/`collectEvidence` in `src/game/domain/evidence.ts`. Selections supply an ObjectId and the injected timestamp required by SelectionRecord. Only active investigation evaluates selections. Targets must exist and have an authored investigation interaction region; visuals are not required. Changes match within the case's scene pair: ordinary changes identify their object, exchanges either participant, and relationships their subject. Multiple candidates return AMBIGUOUS before considering prior discovery; array order cannot resolve them.

First discovery records a selection and ChangeId and reports newly available evidence without collecting it. Repeated discovery returns ALREADY_DISCOVERED with the original state. Incorrect interactive selections record selectedObjects/incorrectSelections but never discover, collect or score. Unknown/noninteractive targets and rejected/ambiguous operations leave state unchanged. RELEVANT_EVIDENCE is not produced because direct object/document triggers remain unspecified.

Availability is derived per EvidenceId from its exact source and session, never visibility, UI state, phase alone or supportingInformation. Only change sources currently have approved triggers: the exact ChangeId must be discovered. All six other source kinds return unsupported_source_semantics. One source can make multiple evidence items available. Collection appends only the requested ID and repeats return already_collected; observation and terminal attempts cannot collect. No collection timestamp is added because CaseSession stores IDs rather than collection events. Case identity/version mismatches are rejected. Scoring, advancement and T06 prerequisites remain unchanged.

T08 adds `evaluateDeduction(caseDefinition, session, answer)` in `src/game/domain/deduction.ts`, consuming the existing DeductionAnswer union. Correctness uses only solution.deductionAnswers; multiple-choice selections compare as exact sets without order sensitivity. Choices must belong to their specific question. Valid CORRECT/INCORRECT submissions append a copied answer and lock that question for the attempt; ALREADY_ANSWERED retains the original answer/state even after an incorrect first submission. UNKNOWN_DEDUCTION, UNKNOWN_CHOICE, INVALID_ANSWER, NOT_AVAILABLE and SESSION_CASE_MISMATCH leave state unchanged. Empty/duplicate multiple-choice sets and mismatched kinds are invalid rather than completed submissions.

No timestamp is added because the existing answer model records none. Closed attempts cannot receive new answers. Phase-entry/exit and evidence availability remain orchestration policy; supportingInformation is not an unlock rule. Incorrect submissions do not reveal the canonical answer, finish the case, collect evidence or change score. Scoring is T09; replay is later. Existing T06/T07 behavior is retained.

T09 adds `calculateCaseScore(caseDefinition, session)` in `src/game/domain/score-calculation.ts`. It returns `{ ok: true, value: ScoreResult }` or a typed SESSION_CASE_MISMATCH/NON_FINITE_SCORE failure. Authored scoring values determine the base, unique required meaningful discoveries, unique collected required primary evidence, correct first recorded deductions, and penalties for recorded incorrect attempts. Available evidence alone earns nothing. The read-only result exposes rawTotal and a zero-floored total; stored session scores are ignored. Final decisions, time bonuses and hint penalties contribute zero; accuracy and ratings are null until their policies are approved. No UI or persistence integration is introduced.

---

# 25. Environment Variables

No production environment variables are currently defined.

When needed:

- document them in `.env.example`;
- never commit real secrets;
- clearly distinguish server-only and client-safe values.

Do not create environment variables for configuration that can remain ordinary typed application configuration.

---

# 26. CI/CD

`.github/workflows/ci.yml` runs on pushes and pull requests using a GitHub-hosted Ubuntu runner, Node 22.18.0, npm 11.5.2, npm caching, and read-only repository permissions. Official checkout/setup-node actions are pinned to stable major v7. It installs from the lockfile and runs formatting, lint, typecheck, non-interactive tests, and the production build. No deployment or secrets are configured. Local verification does not imply the hosted workflow has run.

Expected baseline:

```text
install from lockfile
        ↓
lint
        ↓
type-check
        ↓
unit/integration tests
        ↓
production build
```

Critical E2E tests should be added when stable.

Deployment architecture will be selected when the application is initialized.

---

# 27. First Codex Task

After the documentation package is placed in the repository, the **first Codex task is planning only**.

Use:

```text
You are the lead software architect for EchoTrace.

Read all repository documentation fully:
- README.md
- PRD.md
- GAME_SPEC.md
- CASE_AUTHORING_GUIDE.md
- ARCHITECTURE.md
- AGENTS.md
- TESTING_STRATEGY.md
- ROADMAP.md
- MONETIZATION.md

Do not implement code.
Do not install dependencies.
Do not scaffold the application.
Do not modify repository files.

Produce the final implementation plan for Stage 1: the EchoTrace vertical slice.

Include:
1. final proposed folder structure;
2. dependencies and justification for each;
3. exact case data format recommendation;
4. game session/state-management approach;
5. React–Phaser integration design;
6. persistence approach;
7. validation approach;
8. testing setup;
9. implementation tasks in dependency order;
10. technical risks;
11. documentation conflicts or ambiguities;
12. decisions requiring project-owner approval;
13. areas where the current architecture may be overengineered or underengineered.

Prefer the simplest architecture that satisfies the approved requirements.

Do not introduce:
- backend infrastructure;
- authentication;
- payments;
- database;
- Daily Echo;
- Case Builder;
unless needed only as a clearly documented future extension point.

Stop after the plan.
```

Review that plan before allowing Codex to scaffold the project.

---

# 28. Initial Implementation Queue

After the plan is approved, follow `ROADMAP.md`.

Current high-level queue:

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
T28  Build minimal app shell/case selection
T29  Accessibility/responsive pass
T30  Audio/polish
T31  E2E critical paths
T32  Production-readiness audit
T33  Human playtest
T34  Revision sprint
```

Do not ask Codex to implement this entire queue in one prompt.

---

# 29. Standard Codex Task Template

For implementation tasks:

```text
Read:
- [relevant specifications]
- AGENTS.md
- TESTING_STRATEGY.md

Task:
[one specific task]

Requirements:
[acceptance behavior]

Out of Scope:
[explicit exclusions]

Before coding:
- inspect the existing implementation;
- identify conflicts or ambiguity;
- provide a concise plan.

Implementation:
- preserve architecture;
- keep scope surgical;
- add/update relevant tests.

Verification:
- run lint;
- run type-check;
- run targeted tests;
- run relevant full tests;
- run production build.

At completion report:
- what changed;
- files changed and why;
- tests added/updated;
- verification results;
- unresolved risks.

Do not modify unrelated code.
```

---

# 30. Definition of Vertical Slice Done

Case 001 is not complete merely because it renders.

It must be:

- playable end-to-end;
- understandable;
- fair;
- responsive;
- replayable;
- persistent;
- deterministic;
- tested;
- polished enough for external evaluation;
- validated by human playtesting.

Most importantly:

> **Players should want another mystery.**

---

# 31. Contribution / Engineering Conduct

Any contributor—human or AI—must:

- preserve repository architecture;
- respect documented scope;
- avoid hidden behavioral changes;
- add tests for deterministic logic;
- keep cases data-driven;
- report uncertainty;
- verify changes before completion.

Read `AGENTS.md` before modifying the project.

---

# 32. Documentation Change Policy

When behavior changes materially, update the appropriate source-of-truth document.

Examples:

### Product scope
Update `PRD.md`.

### Gameplay
Update `GAME_SPEC.md`.

### Mystery authoring
Update `CASE_AUTHORING_GUIDE.md`.

### Architecture
Update `ARCHITECTURE.md`.

### Engineering rules
Update `AGENTS.md`.

### Testing
Update `TESTING_STRATEGY.md`.

### Execution order
Update `ROADMAP.md`.

### Business model
Update `MONETIZATION.md`.

### Setup/onboarding
Update `README.md`.

Do not knowingly allow implementation and documentation to contradict each other.

---

# 33. Documentation Status

```text
ECHOTRACE/
│
├── README.md                  ● DOCUMENT 9 — COMPLETE
├── PRD.md                     ● COMPLETE
├── GAME_SPEC.md               ● COMPLETE
├── CASE_AUTHORING_GUIDE.md    ● COMPLETE
├── ARCHITECTURE.md            ● COMPLETE
├── AGENTS.md                  ● COMPLETE
├── TESTING_STRATEGY.md        ● COMPLETE
├── ROADMAP.md                 ● COMPLETE
└── MONETIZATION.md            ● COMPLETE
```

**Documentation package: 9 of 9 complete.**

---

# 34. Next Milestone

The product-definition phase is complete.

M0/S0 architecture planning is approved. T01–T09 are complete, including the scaffold, quality tooling, framework-independent domain contracts, runtime case validation, relationship integrity, session state machine foundation, selection/evidence evaluation, deduction evaluation, and deterministic scoring. M1/S2 are complete; M2/S3 are in progress.

The next task is:

> **T10 — Implement Progress Repository — READY, awaiting explicit authorization**

---

# 35. Final Project Principle

EchoTrace should grow through disciplined iteration:

> **Build one fair mystery. Prove players want another. Then scale the system that creates them.**
