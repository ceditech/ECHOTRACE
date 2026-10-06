# EchoTrace — AI Engineering Constitution

**File:** `AGENTS.md`  
**Product:** EchoTrace  
**Document Type:** AI Agent & Engineering Operating Rules  
**Version:** 1.0  
**Status:** Initial Engineering Constitution  
**Date:** October 2026  
**Applies To:** Codex and any AI-assisted coding agent working in this repository  
**Depends On:** `PRD.md`, `GAME_SPEC.md`, `CASE_AUTHORING_GUIDE.md`, `ARCHITECTURE.md`  
**Previous Document:** `ARCHITECTURE.md`  
**Next Document:** `TESTING_STRATEGY.md`

---

# 1. Purpose

This file is the permanent engineering constitution for EchoTrace.

Any AI coding agent working in this repository must follow these rules unless the project owner explicitly overrides a rule for a specific task.

The objective is controlled AI-assisted development:

> **SPEC → PLAN → CODE → TEST → INSPECT → FIX → VERIFY → COMMIT**

The goal is not maximum code generation speed.

The goal is:

> **Maximum sustainable development velocity without sacrificing correctness, architecture, maintainability, security, or player experience.**

---

# 2. Instruction Priority

When working in this repository, follow requirements in this order:

1. Explicit current instruction from the project owner.
2. Approved product documentation.
3. This `AGENTS.md`.
4. Existing architectural conventions.
5. Existing implementation patterns.
6. General framework conventions.

If instructions conflict, **stop and report the conflict** rather than silently choosing an interpretation.

Do not override an explicit approved requirement merely because another implementation would be easier.

---

# 3. Required Documents

Before significant implementation, read the documents relevant to the task.

Core documents:

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

Minimum read sets:

### Architecture / foundational task

```text
PRD.md
GAME_SPEC.md
CASE_AUTHORING_GUIDE.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
```

### Gameplay mechanic

```text
GAME_SPEC.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
```

### New case

```text
GAME_SPEC.md
CASE_AUTHORING_GUIDE.md
AGENTS.md
TESTING_STRATEGY.md
```

### Monetization feature

```text
PRD.md
MONETIZATION.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
```

Never assume a remembered requirement is still current when the repository contains the source of truth.

---

# 4. Before Writing Code

For any nontrivial task:

1. Read the relevant specifications.
2. Inspect the existing implementation.
3. Identify the smallest correct scope.
4. Identify affected files/modules.
5. Identify risks and likely regressions.
6. Determine required tests.
7. Produce a concise implementation plan.
8. Only then modify code.

Do not begin by generating large amounts of code from the task description alone.

---

# 5. Stop Conditions

Stop and ask for clarification when:

- requirements materially conflict;
- the requested behavior is absent from specifications and has significant product impact;
- a change would require violating architecture;
- a requested case is logically ambiguous;
- a destructive migration is required;
- credentials or secrets appear necessary but are unavailable;
- a dependency choice has major long-term implications not covered by documentation;
- a change would substantially expand scope beyond the task;
- the requested solution would knowingly introduce a security vulnerability;
- tests expose an unresolved product ambiguity.

For small implementation details that do not affect product behavior or architecture, use established conventions and proceed.

---

# 6. Strict Scope Discipline

Implement only what the task requires.

Do not:

- redesign unrelated screens;
- refactor unrelated modules;
- rename unrelated files;
- change public APIs without need;
- update dependencies without reason;
- add speculative features;
- “clean up” the entire repository;
- introduce future systems prematurely.

If unrelated problems are discovered, report them separately.

A task should leave the repository better, not unpredictably different.

---

# 7. No Silent Requirement Invention

Do not invent:

- gameplay rules;
- scoring formulas;
- case solutions;
- monetization behavior;
- account requirements;
- subscription rules;
- leaderboard rules;
- content restrictions;
- architectural services.

If a detail is required to implement a task but unspecified, either:

1. choose the smallest reversible implementation detail that does not alter product behavior; or
2. stop and request a decision when the choice materially affects the product.

---

# 8. Architecture Must Be Preserved

Follow `ARCHITECTURE.md`.

Core boundaries:

```text
Presentation
     ↓
Application
     ↓
Domain

Infrastructure implements domain/application interfaces.
```

The domain layer must remain independent of:

- React;
- Next.js;
- Phaser;
- browser storage;
- analytics vendors;
- payment vendors.

Do not move logic into a framework merely because it is convenient.

---

# 9. Data-Driven Case Rule

Normal EchoTrace cases must be data-driven.

Do not hardcode:

```ts
if (caseId === "case-001") {
  // special behavior
}
```

for ordinary mechanics.

If a new case exposes a missing reusable mechanic:

1. identify the generic mechanic;
2. update the specification if required;
3. implement it generically;
4. add tests;
5. keep case-specific content in case data.

Case content must not mutate core engine rules arbitrarily.

---

# 10. Single Source of Truth

Do not create competing authoritative state.

Examples:

- one authoritative current game phase;
- one authoritative case definition;
- one authoritative session state;
- one scoring engine;
- one persisted progress abstraction.

Derived UI state should be derived rather than separately maintained whenever practical.

---

# 11. TypeScript Rules

Use strict TypeScript.

Required:

- explicit domain types;
- typed function boundaries;
- discriminated unions where appropriate;
- exhaustive handling for important domain states;
- runtime validation for untrusted/authored data.

Avoid:

- `any`;
- unsafe casts;
- broad `as unknown as`;
- non-null assertions used to silence design problems;
- loosely typed event payloads.

If an escape hatch is unavoidable, document why and keep its scope minimal.

---

# 12. Function and Component Design

Prefer single-responsibility functions and components.

A function should generally do one conceptual job.

A React component should not simultaneously own:

- case loading;
- game rules;
- scoring;
- persistence;
- rendering;
- analytics.

Split responsibilities at meaningful boundaries.

Do not micro-fragment simple code into dozens of trivial files merely to appear modular.

---

# 13. Naming

Names must communicate intent.

Prefer:

```text
calculateCaseScore
evaluateDeduction
loadCaseDefinition
collectEvidence
transitionGamePhase
```

Avoid vague names such as:

```text
handleStuff
processData
doThing
manager
helper2
temp
misc
```

Event names should describe semantic events rather than UI implementation details.

---

# 14. Comments

Comments should explain **why**, constraints, or non-obvious reasoning.

Do not add comments that merely repeat the code.

Good:

```ts
// Use elapsed timestamps rather than decrementing React state so
// background-tab throttling cannot extend observation time.
```

Weak:

```ts
// Set score to zero.
score = 0;
```

---

# 15. Case Data Validation

Never trust authored case data merely because it lives in the repository.

Validate:

- schema version;
- IDs;
- required fields;
- cross-references;
- scoring configuration;
- answer references;
- asset declarations;
- supported values.

Invalid case data should fail early with useful developer information.

---

# 16. Game-State Rules

Game state transitions must be explicit.

Do not allow components to jump between arbitrary phases.

Invalid transitions should be rejected.

Important state-machine behavior requires tests.

---

# 17. Deterministic Domain Logic

The following should be deterministic whenever practical:

- scoring;
- evidence collection;
- deduction evaluation;
- state transitions;
- rating calculation;
- case validation;
- progression.

The same inputs should produce the same outputs.

If randomness is introduced later, make it injectable or seedable where appropriate.

---

# 18. Phaser Rules

Phaser owns interactive scene rendering.

Phaser may:

- render objects;
- define hit regions;
- animate scene elements;
- handle pointer/touch input;
- emit semantic object selections.

Phaser must not independently own:

- canonical case truth;
- scoring formulas;
- player entitlements;
- persistence;
- final deduction correctness.

Keep the React–Phaser bridge narrow and typed.

---

# 19. React Rules

React owns application UI and orchestration views.

Use React for:

- briefing;
- evidence panel;
- witness UI;
- deduction UI;
- results;
- settings;
- navigation.

Do not put core game rules inside JSX click handlers.

Keep components predictable.

Avoid unnecessary effects.

Clean up effects and subscriptions.

---

# 20. State Management

Do not add Redux, Zustand, XState, or another state library by default.

Use the simplest approach that preserves correct ownership.

If adding a state library:

1. explain the concrete problem;
2. explain why existing mechanisms are insufficient;
3. evaluate bundle/maintenance cost;
4. obtain approval if the change is architectural.

---

# 21. Persistence Rules

Do not scatter direct `localStorage` calls.

Use the repository abstraction defined by architecture.

Persisted data must be:

- namespaced;
- versioned;
- validated on read;
- safely recoverable when malformed.

Do not persist secrets or unnecessary personal information.

---

# 22. Error Handling

Never silently swallow errors.

Do not use empty catch blocks.

Errors should be:

- handled;
- transformed;
- logged appropriately;
- or propagated intentionally.

User-facing errors should be understandable.

Developer-facing errors should contain enough context to diagnose the problem without exposing secrets.

---

# 23. Defensive Programming

Validate assumptions at system boundaries.

Examples:

- case files;
- persistence;
- API responses;
- environment configuration;
- payment webhooks;
- user-generated data if introduced.

Do not fill every internal function with redundant defensive checks when upstream invariants already guarantee correctness.

Defend boundaries, then rely on validated types internally.

---

# 24. Security Rules

Never:

- commit secrets;
- expose private keys;
- expose server credentials to client code;
- trust client purchase flags;
- disable security checks to make tests pass;
- render untrusted HTML without appropriate protection;
- log sensitive credentials.

Use `.env.example` for configuration names only.

If a secret is accidentally discovered in the repository, report it immediately and avoid reproducing it unnecessarily.

---

# 25. Dependency Rules

Before adding a dependency, verify:

- the problem cannot reasonably be solved with existing tools;
- the package is actively maintained;
- the license is acceptable;
- versions are compatible;
- client bundle impact is reasonable;
- security history is acceptable for the use case.

Do not install multiple libraries that solve the same problem.

Do not replace stable dependencies without a task-specific reason.

---

# 26. Package Manager Discipline

Use the package manager already selected by the repository.

Do not switch package managers casually.

Commit the lockfile.

Do not manually edit lockfiles.

Avoid broad dependency upgrades during unrelated feature work.

---

# 27. Performance Rules

Avoid premature optimization, but prevent obvious waste.

Required habits:

- lazy-load case-specific assets;
- do not preload the full case library;
- avoid duplicate Phaser instances;
- clean event listeners;
- clean timers;
- clean tweens;
- avoid unnecessary React rerenders;
- optimize large assets;
- avoid blocking the main thread unnecessarily.

Measure before introducing complex optimization infrastructure.

---

# 28. Accessibility Rules

Do not regress accessibility for convenience.

Where applicable:

- use semantic HTML;
- preserve keyboard navigation;
- preserve visible focus;
- maintain contrast;
- avoid color-only meaning;
- respect reduced motion;
- use reasonable touch targets;
- ensure gameplay remains understandable without audio.

When a visual mechanic has inherent accessibility limitations, document them honestly.

---

# 29. Responsive Design Rules

Do not design only for the developer's desktop viewport.

Verify relevant UI at:

- desktop;
- tablet;
- mobile.

Interactive scene hit targets must remain usable after scaling.

Do not solve responsive problems by hiding required gameplay information.

---

# 30. Internationalization Rules

Do not use player-facing English text as IDs.

Avoid embedding player-facing strings deep inside game logic.

Allow translated strings to expand.

Do not create clues that depend accidentally on English wording unless explicitly designed as language-specific content.

---

# 31. Testing Is Part of Implementation

A feature is not complete merely because it appears to work manually.

For deterministic logic, add or update tests.

At minimum, consider tests for:

- state transitions;
- scoring;
- evidence;
- deductions;
- case validation;
- persistence;
- timers;
- regressions caused by the task.

Detailed requirements are in `TESTING_STRATEGY.md`.

---

# 32. Regression Rule

Every bug fix should ask:

> Can this failure be reproduced in an automated test?

If yes, add a regression test before or alongside the fix.

A bug that can recur silently should not be fixed only by editing implementation code.

---

# 33. Do Not Modify Tests to Hide Failures

Never weaken, delete, or bypass a valid test simply to make the suite green.

If a requirement legitimately changes:

1. update the specification if necessary;
2. update the test intentionally;
3. explain the behavior change.

Do not lower quality gates without approval.

---

# 34. Required Verification

Before declaring a coding task complete, run the applicable checks.

Expected baseline once configured:

```text
format/check formatting
lint
type-check
unit tests
integration tests
production build
critical E2E tests when applicable
```

If a check cannot run, state exactly why.

Never claim a test passed if it was not executed.

---

# 35. Build Must Remain Healthy

Do not knowingly leave:

- TypeScript errors;
- lint errors;
- failing tests;
- broken imports;
- production build failures;
- missing required assets.

If an existing unrelated failure blocks verification, distinguish it clearly from changes introduced by the current task.

---

# 36. Refactoring Rules

Refactor only with purpose.

Valid reasons:

- reduce duplication that directly affects the task;
- enforce architecture;
- make a required change safely;
- fix a demonstrated maintainability problem;
- improve testability.

Refactoring must preserve behavior unless behavior change is explicitly required.

Large refactors should be isolated from feature changes when practical.

---

# 37. No Opportunistic Rewrites

Do not rewrite a working subsystem merely because another style is preferred.

A rewrite requires strong justification such as:

- incorrect architecture;
- severe technical debt blocking progress;
- security problem;
- unsupported dependency;
- untestable design preventing required changes.

Prefer surgical improvements.

---

# 38. File Size and Complexity

Do not enforce arbitrary line-count limits.

However, investigate a file when it accumulates unrelated responsibilities.

Split by conceptual boundaries, not by line count alone.

Avoid both:

- giant “god files”;
- excessive micro-files that make navigation difficult.

---

# 39. API and Interface Stability

Avoid breaking existing interfaces unnecessarily.

If an interface must change:

1. identify consumers;
2. update them coherently;
3. update tests;
4. document material changes.

Prefer additive evolution when practical.

---

# 40. Database and Backend Rules — Future

When backend systems are introduced:

- use migrations;
- never edit production data casually;
- make destructive operations explicit;
- validate authorization server-side;
- use idempotency where financial actions require it;
- verify payment events server-side;
- keep secrets server-side.

Do not introduce backend infrastructure before product requirements need it.

---

# 41. Monetization Rules

Do not implement monetization mechanics before reading `MONETIZATION.md`.

Never:

- fake ownership with a client boolean;
- unlock paid content solely from local storage;
- manipulate players through undocumented dark patterns;
- make a purchase flow ambiguous.

Commercial access should eventually be based on verified entitlements.

---

# 42. Analytics Rules

Analytics must not control game correctness.

Track semantic events through an abstraction.

Do not scatter vendor calls across components.

Do not collect unnecessary personal data.

A failed analytics request must not break gameplay.

---

# 43. Case Authoring Rules

When implementing or adding cases:

- follow `CASE_AUTHORING_GUIDE.md`;
- do not invent a final solution without author approval;
- preserve canonical truth;
- validate evidence dependencies;
- preserve witness truth status;
- ensure required clues are discoverable;
- ensure resolution introduces no hidden required evidence.

Case logic quality is as important as code quality.

---

# 44. Content Changes Are Product Changes

Changing:

- clue visibility;
- witness wording;
- correct deduction;
- final solution;
- observation duration;
- scoring;
- red herrings;

may change gameplay.

Do not treat content files as harmless static assets.

Run appropriate case/regression tests.

---

# 45. Asset Changes

When adding assets:

- use appropriate directories;
- use descriptive names;
- avoid duplicates;
- optimize size;
- preserve source/license information when required;
- verify rendering at target sizes.

Do not commit huge unoptimized assets merely because they work locally.

---

# 46. Documentation Must Stay Current

If a task materially changes:

- gameplay;
- architecture;
- setup;
- commands;
- case format;
- environment variables;
- public interfaces;

update the relevant documentation in the same task when practical.

Code and documentation should not knowingly contradict each other.

---

# 47. README Responsibility

`README.md` should eventually provide:

- project overview;
- prerequisites;
- installation;
- development commands;
- test commands;
- build commands;
- documentation map;
- basic architecture orientation.

Do not overload the README with content already maintained in specialized documents.

---

# 48. Git Discipline

Prefer small, coherent commits.

Commit messages should describe intent.

Examples:

```text
feat(game): add deterministic observation timer
fix(scoring): prevent duplicate evidence points
test(case-loader): reject invalid evidence references
docs: clarify case schema versioning
```

Avoid:

```text
stuff
updates
fix
changes
final
```

Do not combine unrelated changes in one commit when avoidable.

---

# 49. Destructive Git Operations

Do not perform destructive operations without explicit approval.

Examples:

- force push;
- hard reset of user work;
- rewriting shared history;
- deleting branches containing unknown work;
- mass file deletion.

Protect existing work.

---

# 50. Do Not Revert User Changes

If files contain modifications not created by the current task:

- inspect them;
- preserve them;
- work around them when possible.

Do not revert or overwrite user changes simply to simplify implementation.

If changes conflict, report the conflict.

---

# 51. Generated Files

Do not manually edit generated files unless the project explicitly requires it.

Do not commit build output unless repository policy requires it.

Know which files are source and which are generated.

---

# 52. Task Completion Report

At the end of each implementation task, report concisely:

### Implemented
What changed.

### Files Changed
Important files and why.

### Verification
Commands/checks run and results.

### Tests
Tests added or updated.

### Notes / Risks
Anything unresolved or requiring a decision.

Do not provide a vague “Done” without evidence.

---

# 53. Example Completion Report

```text
Implemented
- Added observation countdown using timestamp-based timing.
- Added automatic transition to investigation.

Files Changed
- src/game/domain/session/...
- src/components/...
- tests/unit/...

Verification
- lint: passed
- type-check: passed
- unit tests: passed
- production build: passed

Tests
- Added timer expiration test.
- Added background-delay regression test.

Notes
- Pause remains intentionally out of scope.
```

---

# 54. Codex Prompt Discipline

Prompts should be narrow.

Good:

> Implement the observation timer defined in GAME_SPEC.md. Read ARCHITECTURE.md and AGENTS.md first. Do not implement investigation mode. Add deterministic unit tests. Run lint, type-check, tests, and build. Report changed files and results.

Weak:

> Build the game and make it awesome.

Small scoped prompts reduce regressions and improve reviewability.

---

# 55. Planning-Only Tasks

When instructed to plan only:

- do not edit code;
- do not install packages;
- do not generate scaffolding;
- do not “helpfully” implement part of the plan.

Return the requested plan and stop.

---

# 56. Review-Only Tasks

When asked to review:

- inspect;
- identify issues;
- rank by severity;
- cite relevant files/locations;
- propose fixes.

Do not modify code unless explicitly asked.

---

# 57. Bug-Fix Workflow

For bugs:

```text
REPRODUCE
   ↓
UNDERSTAND ROOT CAUSE
   ↓
ADD/IDENTIFY REGRESSION TEST
   ↓
FIX MINIMALLY
   ↓
RUN TARGETED TEST
   ↓
RUN REGRESSION SUITE
   ↓
BUILD
```

Do not patch symptoms when the root cause is understood and safely fixable.

---

# 58. Feature Workflow

For features:

```text
READ SPEC
   ↓
INSPECT CURRENT DESIGN
   ↓
PLAN
   ↓
DEFINE/UPDATE TESTS
   ↓
IMPLEMENT SMALLEST VERTICAL SLICE
   ↓
VERIFY
   ↓
REVIEW DIFF
   ↓
REPORT
```

Avoid implementing an entire future roadmap in one task.

---

# 59. Architecture Change Workflow

For architectural changes:

1. Explain the problem.
2. Identify current limitations.
3. Present options.
4. Describe tradeoffs.
5. Recommend one.
6. Obtain approval when material.
7. Update `ARCHITECTURE.md`.
8. Implement incrementally.
9. Add migration/regression tests.
10. Verify the full build.

---

# 60. Case Implementation Workflow

For a new case:

```text
APPROVED CASE DESIGN
       ↓
VALIDATED CASE DATA
       ↓
ASSET MAPPING
       ↓
CASE LOADER VALIDATION
       ↓
PLAYABLE IMPLEMENTATION
       ↓
LOGIC TESTS
       ↓
VISUAL QA
       ↓
PLAYTEST
       ↓
REVISION
```

Do not write custom engine branches unless the case introduces an approved reusable mechanic.

---

# 61. Definition of Done — Code Task

A task is complete only when:

- requested behavior is implemented;
- scope remains controlled;
- architecture is preserved;
- types are correct;
- error states are handled appropriately;
- relevant tests exist;
- regression checks pass;
- build passes;
- documentation is updated if required;
- no known critical regression was introduced;
- completion report is accurate.

---

# 62. Definition of Done — Case Task

A case task is complete only when:

- data validates;
- assets resolve;
- required clues are discoverable;
- evidence relationships work;
- deductions evaluate correctly;
- canonical solution remains consistent;
- scoring works;
- case completes end-to-end;
- replay works;
- responsive behavior is acceptable;
- relevant tests pass.

Publication additionally requires authoring review and playtesting.

---

# 63. Quality Over Artificial Speed

Never sacrifice:

- correctness;
- security;
- maintainability;
- fairness;
- accessibility;
- tests;

merely to reduce implementation time.

However, also avoid perfectionism that delays validation.

The standard is:

> **Build the smallest version that is structurally sound and genuinely testable.**

---

# 64. No False Claims

Never claim:

- “production ready” without verification;
- “fully tested” when only one test ran;
- “no regressions” without relevant checks;
- “secure” without appropriate review;
- “accessible” without testing;
- “optimized” without measurement.

State what was actually verified.

---

# 65. Technical Debt

If intentional technical debt is necessary:

- keep it small;
- document it;
- explain why;
- define the intended resolution trigger.

Do not hide technical debt behind vague comments.

---

# 66. TODO Policy

TODOs should be actionable.

Good:

```ts
// TODO(case-builder): Replace static catalog when remote case publishing is introduced.
```

Avoid:

```ts
// TODO fix later
```

Do not leave TODOs for functionality required by the current acceptance criteria.

---

# 67. Feature Flags — Future

Feature flags may be introduced when needed for:

- staged rollout;
- experiments;
- risky features;
- monetization changes.

Do not create a feature-flag platform for the MVP.

Flags must not become permanent undocumented branching logic.

---

# 68. Compatibility

When changing case schemas or persisted data:

- preserve backward compatibility when reasonable;
- otherwise provide an explicit migration;
- test migration behavior;
- reject unsupported versions clearly.

Do not silently reinterpret old data.

---

# 69. Player Data Integrity

Never knowingly corrupt player progress.

Persistence updates should favor:

- validation;
- safe defaults;
- migrations;
- graceful recovery.

When data cannot be recovered, fail safely and preserve as much valid progress as practical.

---

# 70. Review the Diff

Before completion, inspect the final diff.

Look for:

- accidental changes;
- debug logs;
- dead code;
- duplicate logic;
- secrets;
- unrelated formatting;
- unused imports;
- unexplained dependencies;
- test weakening;
- stale comments.

AI-generated code must be reviewed just like human-generated code.

---

# 71. MVP Guardrails

The initial vertical slice does **not** need:

- microservices;
- multiplayer;
- chat;
- guilds;
- complex authentication;
- subscriptions;
- public UGC;
- live AI-generated cases;
- elaborate leaderboards;
- complex backend infrastructure;
- native apps;
- advanced Case Builder.

Do not implement these unless the product documentation is intentionally updated.

---

# 72. Future-Proofing Rule

Future-proof through:

- clear interfaces;
- modular boundaries;
- stable identifiers;
- versioned schemas;
- testable domain logic;
- adapters.

Do **not** future-proof through speculative infrastructure.

---

# 73. Engineering Decision Test

Before adding complexity, ask:

1. Which current requirement needs this?
2. What simpler option exists?
3. What coupling does this introduce?
4. How will it be tested?
5. How difficult is it to remove?
6. Does it help multiple cases or only one?
7. Does it preserve the documented architecture?

If these questions cannot be answered, do not add the complexity yet.

---

# 74. Mandatory Agent Summary Before Major Implementation

Before a major implementation task, the agent should state:

```text
Understanding:
[brief requirement summary]

Scope:
[what will change]

Out of Scope:
[what will not change]

Plan:
[ordered implementation steps]

Verification:
[tests/checks that will be run]

Risks/Questions:
[only material issues]
```

This keeps AI-assisted development controlled and reviewable.

---

# 75. Repository Rule

This `AGENTS.md` should remain in the repository root unless tooling requirements dictate otherwise.

If future subdirectories require specialized agent instructions, those instructions may add constraints but must not silently contradict this root constitution.

---

# 76. Change Control

Changes to this file are significant engineering-policy changes.

Material updates should be deliberate and source-controlled.

Examples:

- new mandatory quality gates;
- new framework rules;
- dependency policy changes;
- testing requirements;
- security requirements;
- agent workflow changes.

Do not weaken these rules merely to make an individual task easier.

---

# 77. Final Agent Directive

When working on EchoTrace:

> **Understand before editing.**

> **Plan before implementing.**

> **Keep scope surgical.**

> **Preserve architecture.**

> **Treat cases as data.**

> **Keep logic deterministic.**

> **Test behavior, not appearances alone.**

> **Never hide errors or regressions.**

> **Verify before claiming completion.**

> **Build for the next case without prematurely building the next company.**

---

# 78. Document Status

**Document:** `AGENTS.md`  
**Version:** 1.0  
**Status:** Initial Engineering Constitution  
**Product:** EchoTrace  
**Previous Document:** `ARCHITECTURE.md`  
**Next Document:** `TESTING_STRATEGY.md`

### Documentation Progress

```text
ECHOTRACE/
│
├── README.md                  ○ Pending
├── PRD.md                     ● COMPLETE
├── GAME_SPEC.md               ● COMPLETE
├── CASE_AUTHORING_GUIDE.md    ● COMPLETE
├── ARCHITECTURE.md            ● COMPLETE
├── AGENTS.md                  ● DOCUMENT 5 — COMPLETE
├── TESTING_STRATEGY.md        ◉ DOCUMENT 6 — NEXT
├── ROADMAP.md                 ○ Pending
└── MONETIZATION.md            ○ Pending
```
