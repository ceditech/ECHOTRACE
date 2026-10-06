# EchoTrace — Testing Strategy

**File:** `TESTING_STRATEGY.md`  
**Product:** EchoTrace  
**Document Type:** Quality Engineering, Verification & Playtesting Strategy  
**Version:** 1.0  
**Status:** Initial Testing Baseline  
**Date:** October 2026  
**Depends On:** `PRD.md`, `GAME_SPEC.md`, `CASE_AUTHORING_GUIDE.md`, `ARCHITECTURE.md`, `AGENTS.md`  
**Previous Document:** `AGENTS.md`  
**Next Document:** `ROADMAP.md`

---

# 1. Purpose

This document defines how EchoTrace will be verified throughout development.

Testing exists to protect:

- gameplay correctness;
- mystery fairness;
- deterministic scoring;
- case integrity;
- player progress;
- responsive behavior;
- accessibility;
- performance;
- maintainability;
- release confidence.

EchoTrace has two different quality problems:

1. **Software correctness** — does the application behave as designed?
2. **Mystery correctness** — is the case logically fair, understandable, and satisfying?

Both must pass.

A technically flawless unfair mystery is still a defective EchoTrace case.

---

# 2. Testing Philosophy

The project follows:

> **Test deterministic logic deeply. Test integrations selectively. Test critical player journeys end-to-end. Validate mystery quality with humans.**

Testing should provide confidence without turning the MVP into a testing research project.

Use the lowest-cost test level that reliably catches the defect.

---

# 3. Quality Pyramid

Recommended emphasis:

```text
                ┌──────────────┐
                │   PLAYTEST   │
                └──────────────┘
              ┌──────────────────┐
              │       E2E        │
              └──────────────────┘
           ┌────────────────────────┐
           │      INTEGRATION       │
           └────────────────────────┘
        ┌──────────────────────────────┐
        │          UNIT TESTS          │
        └──────────────────────────────┘
     ┌────────────────────────────────────┐
     │ SCHEMA / CONTENT / STATIC CHECKS   │
     └────────────────────────────────────┘
```

Most deterministic behavior should be protected below the browser level.

Do not attempt to verify every rule through slow E2E tests.

---

# 4. Test Categories

EchoTrace uses:

1. Static verification
2. Schema/content validation
3. Unit tests
4. Integration tests
5. Component tests
6. End-to-end tests
7. Visual/responsive QA
8. Accessibility testing
9. Performance testing
10. Security/dependency checks
11. Manual exploratory testing
12. Mystery logic review
13. Human playtesting
14. Regression testing
15. Release verification

---

# 5. Static Verification

Every significant change should pass the configured static checks.

Expected baseline:

```text
format
lint
type-check
```

Static verification catches:

- malformed code;
- unused or unsafe patterns;
- TypeScript contract violations;
- some accessibility issues;
- accidental imports;
- inconsistent formatting.

Static checks do not replace behavioral tests.

---

# 6. Case Schema Validation

Every case definition must be validated before gameplay.

Automated validation should cover:

- supported schema version;
- required metadata;
- unique IDs;
- valid scene references;
- valid object references;
- valid evidence references;
- valid witness references;
- valid statement references;
- valid contradiction references;
- valid deduction references;
- valid final-answer references;
- scoring configuration;
- required asset declarations;
- supported enum values.

Invalid case content should fail early.

---

# 7. Case Logical Validation

Some logical checks can also be automated.

Examples:

- every required evidence ID exists;
- required deductions reference available evidence;
- every final answer has a valid identifier;
- exactly one correct answer exists when the question requires one;
- no evidence item references itself improperly;
- no impossible dependency cycle exists where detectable;
- star thresholds are ordered;
- scoring values are within permitted ranges.

Automated validation cannot prove that a mystery is narratively fair. Human review remains mandatory.

---

# 8. Unit Testing Scope

Unit tests should heavily cover deterministic domain logic.

Priority areas:

- game state transitions;
- observation timer calculations;
- evidence collection;
- duplicate discovery prevention;
- deduction evaluation;
- final decision evaluation;
- scoring;
- rating thresholds;
- case validation;
- persistence serialization/migration logic;
- progression rules.

---

# 9. State Machine Tests

Test every legal transition.

Example:

```text
case_briefing
→ observation_intro
→ observation_active
→ observation_end
→ transition
→ investigation_intro
→ investigation_active
→ evidence_review
→ witness_testimony
→ deduction
→ final_decision
→ resolution
→ results
```

Also test invalid transitions.

Example:

```text
case_briefing → results
```

should be rejected.

Test state invariants after transitions.

---

# 10. Observation Timer Tests

The observation timer is gameplay-critical.

Test:

- starts with configured duration;
- reaches zero correctly;
- cannot become negative;
- expiration triggers expected transition;
- rendering delays do not extend the authoritative timer;
- timestamp calculations remain correct;
- pause behavior if later implemented;
- resume behavior if later implemented.

Where browser timing is involved, use controllable/fake time where practical.

---

# 11. Evidence Tests

Test:

- valid evidence can be collected;
- locked evidence cannot be collected;
- unknown evidence IDs are rejected;
- duplicate collection does not score twice;
- collected evidence appears in session state;
- required evidence status is correct;
- evidence survives permitted phase transitions.

---

# 12. Selection Tests

Test scene-selection evaluation separately from rendering.

Cases:

- correct change;
- relevant evidence;
- incorrect selection;
- already discovered object;
- noninteractive target;
- unknown target.

Phaser hit-testing itself may require integration/E2E coverage, but semantic evaluation belongs in unit tests.

---

# 13. Deduction Tests

For every deduction type implemented, test:

- correct answer;
- incorrect answer;
- malformed answer;
- missing answer;
- duplicate submission if prohibited;
- evidence prerequisites where applicable.

Case-specific deduction fixtures should verify the authored correct answer.

---

# 14. Scoring Tests

Scoring requires strong coverage.

Test:

- base score;
- correct discovery points;
- evidence points;
- deduction points;
- final decision points;
- incorrect-selection penalties;
- hint penalties;
- efficiency bonus;
- score floor;
- rating calculation;
- maximum expected score;
- duplicate action protection.

Golden examples should make expected totals obvious.

Example:

```text
Base                      1000
3 changes                 +600
1 evidence bonus          +250
1 correct deduction       +300
Correct final decision    +500
No penalties                 0
--------------------------------
Expected subtotal         2650
```

Exact production configuration remains case-driven.

---

# 15. Determinism Tests

Given the same:

- case definition;
- session actions;
- timestamps;
- scoring configuration;

the engine must produce the same result.

If randomness is later introduced, inject or seed it for tests.

---

# 16. Case Loader Integration Tests

Test the complete loader pipeline:

```text
case source
    ↓
load
    ↓
schema validation
    ↓
cross-reference validation
    ↓
trusted CaseDefinition
```

Include negative fixtures:

- missing object;
- duplicate ID;
- unsupported schema;
- invalid evidence reference;
- invalid answer;
- missing required field.

---

# 17. Persistence Tests

Test the repository abstraction.

For local persistence:

- save progress;
- read progress;
- update best score;
- preserve best score when a worse attempt occurs;
- increment attempt count;
- store settings;
- handle missing data;
- handle malformed data;
- handle unsupported version;
- recover safely where specified.

Do not require a real browser storage implementation for all domain tests.

---

# 18. Migration Tests

When persisted schema versions change:

- test old valid data → new format;
- test partially malformed legacy data;
- test unsupported versions;
- ensure valid progress is preserved where possible.

Every migration should have representative fixtures.

---

# 19. Component Testing

Use component tests for UI behavior that is valuable to verify without full E2E.

Candidates:

- briefing controls;
- evidence panel;
- witness statement presentation;
- deduction options;
- final confirmation;
- results breakdown;
- settings controls.

Do not over-test visual implementation details.

Prefer behavior:

> “Submitting a selected deduction calls the expected application action.”

over:

> “The third div has this CSS class.”

---

# 20. React–Phaser Bridge Tests

The typed bridge is an important integration boundary.

Test:

- object selection event reaches application logic;
- application commands reach Phaser adapter;
- duplicate listeners are not registered;
- cleanup occurs on unmount;
- scene-ready event is handled;
- asset failure is surfaced;
- phase changes enable/disable interaction appropriately.

---

# 21. End-to-End Testing

E2E tests should protect the highest-value player journeys.

Do not use E2E for every scoring edge case.

Core Case 001 E2E journey:

```text
Open app
→ Select Case 001
→ Read briefing
→ Start observation
→ Observation expires
→ Enter investigation
→ Find required changes
→ Review evidence
→ View witness
→ Submit deduction
→ Submit final decision
→ View resolution
→ View results
→ Verify progress saved
→ Replay case
```

---

# 22. E2E Happy Path

At least one E2E test should complete Case 001 correctly from start to finish.

It should verify:

- no critical runtime errors;
- expected phase progression;
- interactive scene works;
- result is produced;
- persistence occurs.

---

# 23. E2E Imperfect Player Path

Add a second important flow:

- make an incorrect selection;
- optionally use a hint when implemented;
- submit an incorrect deduction or final decision;
- verify case still resolves according to specification;
- verify score reflects penalties;
- verify replay remains available.

This ensures the game works for normal players, not only perfect test scripts.

---

# 24. E2E Recovery Tests

As the product matures, test:

- reload at safe phases;
- corrupted local progress;
- missing asset behavior;
- invalid case load;
- navigation away and return;
- unsupported case ID.

Only automate high-value recovery paths for MVP.

---

# 25. Visual QA

Automated tests cannot determine whether a clue is visually fair.

Manually inspect:

- object visibility;
- scene cropping;
- overlays;
- countdown placement;
- evidence cards;
- witness UI;
- deduction UI;
- resolution;
- results.

Critical scene objects must remain visible at supported viewport sizes.

---

# 26. Responsive Test Matrix

Minimum manual/automated viewport categories:

### Mobile
Representative narrow smartphone viewport.

### Tablet
Representative portrait/landscape tablet.

### Desktop
Representative laptop/desktop viewport.

Exact devices can be selected during implementation.

Do not assume responsive success because CSS uses percentages.

---

# 27. Touch Testing

Verify on touch-capable behavior:

- hit regions are large enough;
- tapping does not require pixel precision;
- no hover-only clue is required;
- overlays do not block scene interaction;
- accidental double-taps do not duplicate discoveries.

---

# 28. Accessibility Testing

Testing should include:

- keyboard navigation for non-canvas UI;
- visible focus;
- semantic headings/buttons;
- labels;
- contrast;
- reduced motion behavior where implemented;
- audio-off gameplay;
- touch target size;
- screen-reader checks for application UI where practical.

Use automated accessibility tools as assistance, not proof of full accessibility.

---

# 29. Audio Testing

When audio is introduced:

- game works with audio disabled;
- mute controls work;
- volume settings persist if specified;
- sounds do not stack accidentally;
- scene changes clean up audio;
- no critical clue depends solely on audio.

---

# 30. Performance Testing

MVP performance testing should focus on real player impact.

Measure:

- initial application load;
- game runtime lazy loading;
- Case 001 asset loading;
- scene transition responsiveness;
- memory growth across replay;
- duplicate Phaser instances;
- long-task behavior;
- mobile responsiveness.

Do not optimize based only on intuition.

---

# 31. Memory / Resource Leak Testing

Repeatedly:

```text
Start case
→ Complete case
→ Replay
→ Exit
→ Re-enter
```

Inspect for:

- duplicate event listeners;
- duplicate timers;
- duplicate Phaser instances;
- retained textures unnecessarily;
- growing audio handles;
- escalating memory use.

This is especially important for React–Phaser integration.

---

# 32. Security Testing

For MVP:

- verify no secrets are bundled client-side;
- verify environment variables are correctly scoped;
- run dependency vulnerability checks as appropriate;
- validate case data;
- safely render authored text;
- verify no unsafe arbitrary code execution from case content.

When accounts/payments arrive, security testing must expand substantially.

---

# 33. Dependency Verification

Before release:

- inspect critical dependency advisories;
- avoid blindly applying breaking automated upgrades;
- verify production build after dependency changes;
- test gameplay after Phaser/Next.js major upgrades.

Dependency health is part of release quality.

---

# 34. Mystery Logic Review

Before a case reaches visual production or publication, conduct structured logic review.

Reviewers should answer:

1. What is the canonical truth?
2. Which evidence proves it?
3. Which evidence is required?
4. Can required evidence be discovered?
5. Are witness statements correctly classified?
6. Are contradictions real?
7. Can red herrings be eliminated?
8. Is the final answer unique?
9. Does the resolution rely only on previously available information?
10. Could a reasonable player defend another answer equally well?

If question 10 is yes, revise the case unless ambiguity is intentional and supported by design.

---

# 35. Case Fairness Test

A case fails fairness if:

- required clue is effectively invisible;
- final resolution introduces decisive new evidence;
- correct answer depends on external trivia not introduced;
- multiple answers are equally supported but only one is accepted;
- witness dishonesty must be guessed;
- hitbox difficulty replaces reasoning;
- translation changes the logical answer.

Fairness defects are release blockers.

---

# 36. Human Playtesting

Human playtesting is mandatory before considering the vertical slice validated.

The purpose is not to ask whether testers “like games.”

Observe whether players:

- understand the objective;
- study the right information;
- notice changes;
- understand evidence;
- interpret testimony;
- recognize contradictions;
- make logical deductions;
- understand the resolution;
- want another case.

---

# 37. Playtest Protocol

Recommended session:

1. Give only normal game instructions.
2. Do not coach during the attempt.
3. Observe behavior.
4. Record confusion points.
5. Record completion time.
6. Record incorrect selections.
7. Record missed clues.
8. Record deduction choices.
9. After completion, ask structured questions.
10. Avoid defending the design.

The game should teach itself sufficiently.

---

# 38. Playtest Questions

Ask:

- What did you think the objective was?
- What part was easiest?
- What part was hardest?
- Did any clue feel unfair?
- Did you understand why the evidence mattered?
- Did you trust the final explanation?
- Did you feel you solved the mystery or guessed?
- Was 25 seconds enough for observation?
- Did you want a hint?
- Would you play another case?
- Would you return for a daily mystery?

Record answers rather than relying on memory.

---

# 39. Playtest Metrics

For each case, consider tracking:

```text
attempts
completion rate
median completion time
observation success
incorrect selections
hint usage
deduction accuracy
final decision accuracy
replay rate
fairness rating
desire-to-play-next rating
```

Do not set arbitrary success thresholds before sufficient data exists.

Use early testing primarily to discover failure patterns.

---

# 40. Small-Sample Testing

The first tests may involve a small number of people.

Small samples are useful for finding:

- obvious confusion;
- broken mechanics;
- unfair clues;
- wording problems;
- usability failures.

They are not sufficient for confident market forecasts.

Avoid overinterpreting early percentages.

---

# 41. Regression Testing

Every meaningful bug should produce a regression test when practical.

Regression suites should protect:

- previously fixed state bugs;
- scoring bugs;
- duplicate evidence;
- persistence bugs;
- case validation bugs;
- timer bugs;
- React–Phaser lifecycle bugs.

A fix without protection is vulnerable to recurrence.

---

# 42. Case Regression Suite

Every published case should eventually have automated content assertions.

For Case 001, verify:

- case loads;
- schema valid;
- three required changes exist;
- required evidence exists;
- witness exists;
- contradiction references valid entities;
- deduction has valid correct answer;
- final decision has canonical answer;
- scoring config valid;
- required assets declared.

---

# 43. Golden Case Fixtures

Maintain representative fixtures:

```text
valid-minimal-case
valid-case-001
invalid-duplicate-id
invalid-evidence-reference
invalid-deduction-answer
unsupported-schema-version
```

Fixtures make validator behavior stable and understandable.

---

# 44. Test Data Rules

Test data should be:

- explicit;
- minimal;
- deterministic;
- readable.

Do not copy huge production cases into every unit test.

Use small fixtures for isolated rules and full Case 001 only where integration requires it.

---

# 45. Mocking Policy

Mock external/infrastructure boundaries when useful.

Good candidates:

- persistence;
- analytics;
- time;
- future network calls;
- payment providers.

Avoid mocking the core domain logic being tested.

Excessive mocking can create tests that pass while the application is broken.

---

# 46. Snapshot Testing

Use snapshots sparingly.

Good uses may include stable structured output.

Do not rely heavily on large UI snapshots that developers update without understanding differences.

Behavioral assertions are preferred.

---

# 47. Flaky Test Policy

Flaky tests are defects.

Do not normalize rerunning tests until they pass.

When a test flakes:

1. reproduce;
2. identify timing/shared-state/root cause;
3. fix the test or product;
4. keep deterministic behavior.

Quarantine only as a temporary documented measure when necessary.

---

# 48. CI Quality Gates

Once CI is configured, pull requests should normally require:

```text
install from lockfile
format/lint
type-check
unit tests
integration tests
production build
```

Critical E2E tests should be added when stable enough.

Do not merge known critical failures merely because they are inconvenient.

---

# 49. Local Pre-Completion Gate

Before an AI agent reports a task complete, it must run the checks relevant to that task.

Typical:

```text
lint
type-check
targeted tests
full unit/integration suite
production build
E2E if critical flow changed
```

If a command is unavailable because tooling is not yet configured, state that fact explicitly.

---

# 50. Severity Classification

### Critical

Blocks core gameplay, corrupts progress, exposes serious security issue, or makes canonical case completion impossible.

### High

Major feature broken, scoring materially wrong, case solution unfair, severe responsive failure.

### Medium

Noticeable functional issue with workaround, localized UX problem, noncritical incorrect feedback.

### Low

Cosmetic issue, minor copy issue, low-impact polish defect.

Critical and High defects normally block release.

---

# 51. Release Blockers

The vertical slice must not release publicly with:

- inability to complete Case 001;
- incorrect canonical solution;
- required clue unavailable;
- scoring corruption;
- repeatable progress corruption;
- production build failure;
- critical mobile interaction failure;
- serious security exposure;
- unresolved High/Critical regression;
- resolution depending on hidden evidence.

---

# 52. Case 001 Test Plan

## 52.1 Content Validation

Verify:

- case ID/version;
- all object IDs unique;
- exactly three intended primary changes;
- evidence references valid;
- witness data valid;
- contradiction valid;
- deduction valid;
- final decision valid;
- scoring configuration valid;
- required assets available.

## 52.2 Observation

Verify:

- briefing leads into observation;
- default duration is 25 seconds;
- countdown is visible;
- investigation cannot begin early accidentally;
- original scene becomes unavailable at end.

## 52.3 Investigation

Verify:

- three changes selectable;
- correct feedback;
- incorrect feedback;
- duplicates do not score twice;
- evidence updates correctly;
- touch/mouse behavior works.

## 52.4 Witness / Contradiction

Verify:

- statement readable;
- contradiction supported by evidence;
- no hidden knowledge required.

## 52.5 Deduction

Verify:

- correct option recognized;
- wrong option handled;
- explanation consistent with canonical truth.

## 52.6 Final Decision

Verify:

- decision can be submitted;
- result recorded;
- incorrect decision follows specified behavior.

## 52.7 Resolution

Verify:

- explains what happened;
- references previously available evidence;
- introduces no decisive new clue.

## 52.8 Scoring

Verify:

- deterministic total;
- penalties applied once;
- rating threshold correct;
- best score persisted.

## 52.9 Replay

Verify:

- new attempt created;
- temporary evidence cleared;
- score reset;
- historical best preserved;
- no duplicate listeners/resources.

---

# 53. Browser Compatibility

Initial supported browser policy should be finalized before public release.

At minimum, test current mainstream Chromium-based browsers and other browsers selected by product strategy.

Do not claim broad browser support without testing it.

---

# 54. Device Testing

Emulators are useful but do not fully replace real devices.

Before broader launch, test at least:

- a real desktop/laptop;
- a real modern smartphone;
- touch interaction;
- realistic network conditions.

Expand the matrix as usage data becomes available.

---

# 55. Network Testing

For the vertical slice, test:

- normal connection;
- slow asset loading;
- failed asset request;
- refresh during loading.

When backend services arrive, add:

- offline/temporary failure;
- timeout;
- retry;
- server error;
- authentication expiry.

---

# 56. Production Smoke Test

After deployment, verify:

```text
site loads
Case 001 appears
case starts
assets load
observation timer runs
investigation works
case completes
results display
progress persists
replay works
```

A successful CI pipeline does not eliminate the need for a deployed smoke test.

---

# 57. Observability — Future

As the product grows, production observability may include:

- client error monitoring;
- performance monitoring;
- failed case-load telemetry;
- asset-load failures;
- completion funnels.

Do not add excessive monitoring infrastructure before it is useful.

Never expose sensitive information in telemetry.

---

# 58. Test Ownership

Quality is not solely a QA function.

### Developers / AI Agents
Own automated correctness and regression protection.

### Case Authors
Own canonical logic and evidence integrity.

### Designers
Own visual clarity and interaction fairness.

### Playtesters
Expose confusion and player-experience problems.

### Product Owner
Approves product behavior and release tradeoffs.

---

# 59. Testing Anti-Patterns

Avoid:

### E2E Everything
Slow and brittle.

### Unit Test Nothing
Leaves domain rules unprotected.

### Testing Implementation Details
Makes refactoring unnecessarily painful.

### Updating Expected Results Blindly
Can hide regressions.

### Manual-Only Regression Testing
Does not scale.

### Perfect-Player-Only Testing
Ignores normal user behavior.

### Testing Only Desktop
Misses mobile failures.

### Assuming Schema Valid Means Mystery Fair
It does not.

### Treating Build Success as Product Validation
A build can succeed while the game is not fun.

---

# 60. MVP Test Automation Priority

Implement automation in this order:

### Priority 1
- case validation;
- state machine;
- timer;
- evidence;
- scoring;
- deductions.

### Priority 2
- persistence;
- case loader integration;
- React–Phaser bridge.

### Priority 3
- Case 001 E2E happy path;
- imperfect-player E2E path.

### Priority 4
- accessibility automation;
- performance regression checks;
- expanded browser matrix.

This provides high confidence early without overbuilding.

---

# 61. Release Readiness Checklist

Before the vertical slice is considered release-ready:

```text
[ ] PRD requirements satisfied
[ ] GAME_SPEC acceptance criteria satisfied
[ ] Case 001 logic approved
[ ] Case schema validates
[ ] Unit suite passes
[ ] Integration suite passes
[ ] Production build passes
[ ] Critical E2E passes
[ ] Desktop QA passes
[ ] Mobile QA passes
[ ] Touch interaction passes
[ ] Accessibility baseline reviewed
[ ] No known Critical defects
[ ] No unresolved High defects
[ ] Playtesting completed
[ ] Resolution judged fair
[ ] Performance acceptable
[ ] Production smoke test passes
```

---

# 62. Vertical Slice Validation Gate

After Case 001 is technically complete, development should not immediately rush into dozens of cases.

First evaluate:

- Do players understand the loop?
- Does memory create useful tension?
- Does evidence feel meaningful?
- Do witnesses improve the game?
- Does deduction differentiate EchoTrace?
- Is the mystery fair?
- Do players want another case?

If the core loop is weak, improve it before scaling content.

---

# 63. Documentation and Test Synchronization

When gameplay behavior changes:

- update `GAME_SPEC.md`;
- update affected tests.

When case authoring rules change:

- update `CASE_AUTHORING_GUIDE.md`;
- update validators/tests where applicable.

When architecture changes:

- update `ARCHITECTURE.md`;
- update integration/quality expectations.

Documentation and tests should reinforce the same behavior.

---

# 64. Test Naming

Test names should describe behavior.

Good:

```text
prevents duplicate evidence from increasing score twice
rejects transition from briefing directly to results
preserves best score after lower-scoring replay
```

Avoid:

```text
test1
works
score test
case stuff
```

A failing test name should help explain the defect.

---

# 65. Test Isolation

Tests should not depend on:

- execution order;
- another test's local storage;
- shared mutable singleton state;
- uncontrolled current time;
- uncontrolled randomness.

Reset state between tests.

---

# 66. Time Control

Where timing matters, inject or control time.

Avoid tests that literally wait 25 seconds for the observation phase unless validating browser integration.

Unit tests should advance fake time or use timestamp inputs.

This keeps the suite fast.

---

# 67. Coverage Philosophy

Code coverage can reveal untested areas but should not become a vanity metric.

Do not write meaningless tests solely to increase a percentage.

Prioritize:

- critical domain branches;
- failure modes;
- regression-prone code;
- money/progress integrity;
- case logic.

A high coverage number does not prove mystery fairness.

---

# 68. Future Monetization Testing

When purchases arrive, add tests for:

- verified entitlement;
- duplicate webhook/idempotency behavior;
- failed purchase;
- canceled purchase;
- restored purchase;
- expired subscription if introduced;
- locked/unlocked case access;
- client tampering resistance.

Do not implement these tests before monetization exists.

---

# 69. Future Daily Echo Testing

Daily Echo will require:

- correct challenge by date;
- timezone/date authority;
- attempt rules;
- score submission;
- ranking;
- replay restrictions;
- server validation;
- challenge rollover;
- historical results.

This is explicitly post-MVP.

---

# 70. Future Case Builder Testing

The Case Builder should eventually test:

- draft creation;
- validation;
- broken references;
- preview;
- versioning;
- publishing;
- rollback;
- localization;
- asset linkage.

The generated output must pass the same runtime validator as manually authored cases.

---

# 71. Definition of Testing Done for a Feature

Testing for a feature is complete when:

- acceptance behavior is identified;
- deterministic logic has automated tests;
- integration boundaries affected by the feature are verified;
- relevant regressions are covered;
- static checks pass;
- build passes;
- critical manual checks are completed when automation is insufficient;
- unresolved limitations are documented.

---

# 72. Definition of Testing Done for a Case

A case is testing-complete when:

- schema validates;
- logical references validate;
- required evidence is reachable;
- canonical solution is consistent;
- deduction answers are correct;
- resolution is fair;
- scoring is verified;
- responsive visual QA passes;
- end-to-end completion works;
- replay works;
- playtesting is complete;
- blocking defects are resolved.

---

# 73. Final Quality Principle

EchoTrace quality is not merely:

> “The code works.”

It is:

> **The software works, the mystery is fair, the player understands the reasoning, and the result is satisfying.**

All four matter.

---

# 74. Document Status

**Document:** `TESTING_STRATEGY.md`  
**Version:** 1.0  
**Status:** Initial Testing Baseline  
**Product:** EchoTrace  
**Previous Document:** `AGENTS.md`  
**Next Document:** `ROADMAP.md`

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
├── TESTING_STRATEGY.md        ● DOCUMENT 6 — COMPLETE
├── ROADMAP.md                 ◉ DOCUMENT 7 — NEXT
└── MONETIZATION.md            ○ Pending
```
