# EchoTrace — Technical Architecture

**File:** `ARCHITECTURE.md`  
**Product:** EchoTrace  
**Document Type:** Technical Architecture & Engineering Blueprint  
**Version:** 1.0  
**Status:** Initial Architecture Baseline  
**Date:** October 2026  
**Depends On:** `PRD.md`, `GAME_SPEC.md`, `CASE_AUTHORING_GUIDE.md`  
**Previous Document:** `CASE_AUTHORING_GUIDE.md`  
**Next Document:** `AGENTS.md`

---

## 1. Purpose

This document defines the technical architecture for EchoTrace.

It translates the product requirements, gameplay specification, and case-authoring model into a scalable implementation blueprint for developers and AI coding agents.

The architecture is designed to support:

- a small, fast MVP;
- strict TypeScript;
- a clean separation between application UI and game runtime;
- data-driven cases;
- deterministic game logic;
- testability;
- responsive web/mobile experiences;
- progressive enhancement;
- future backend services;
- future monetization;
- future Daily Echo;
- future internal Case Builder;
- future native/mobile packaging;
- potentially hundreds of cases.

The guiding rule is:

> **Design for growth without building the future prematurely.**

---

# 2. Architectural Principles

## 2.1 Modular Monolith First

The MVP should be a well-structured modular application rather than a distributed system.

Do not introduce microservices for the initial product.

Modules should have explicit boundaries so they can be extracted later if necessary.

---

## 2.2 Data-Driven Cases

Normal cases must be represented as structured content.

Adding Case 002, Case 003, or Case 100 should not require changes to core engine behavior.

---

## 2.3 Framework Separation

Next.js/React owns the application experience.

Phaser owns the interactive game canvas and scene rendering.

Neither should unnecessarily absorb responsibilities belonging to the other.

---

## 2.4 Domain Logic Independent of Rendering

Scoring, evidence rules, case validation, deductions, progression, and state transitions should be implemented as pure or largely framework-independent TypeScript wherever practical.

This allows the logic to be unit tested without launching Phaser or a browser.

---

## 2.5 Single Source of Truth

The application must not maintain conflicting copies of authoritative gameplay state.

Case content, session state, scoring configuration, and progression should each have clearly defined owners.

---

## 2.6 Explicit State Transitions

Gameplay phases must transition through an explicit state machine or equivalent deterministic domain model.

Components must not infer the game phase independently.

---

## 2.7 Validate at Boundaries

External or authored case data must be validated before the engine trusts it.

Malformed content should fail clearly during development.

---

## 2.8 Progressive Complexity

Do not introduce infrastructure merely because the product might need it someday.

Build extension points where justified, but defer unnecessary systems.

---

# 3. Recommended Technology Stack

## 3.1 Application Framework

**Next.js** with the App Router.

Responsibilities:

- routing;
- application shell;
- metadata;
- case selection;
- settings;
- results pages;
- future account UI;
- future commerce UI;
- server capabilities when required.

---

## 3.2 UI Framework

**React**

Responsibilities:

- non-canvas application interfaces;
- overlays;
- dialogs;
- evidence panels;
- witness UI;
- results;
- settings;
- navigation.

---

## 3.3 Language

**TypeScript with strict mode enabled.**

Avoid `any`.

Use explicit domain types and discriminated unions where useful.

---

## 3.4 Styling

**Tailwind CSS**

Optionally use **shadcn/ui** for standard application UI primitives when it reduces implementation cost without coupling core game behavior to the component library.

---

## 3.5 Game Runtime

**Phaser 4.2.1**

Primary responsibilities:

- visual game scenes;
- interactive scene objects;
- pointer/touch hit areas;
- scene transitions;
- game-specific animation;
- visual feedback;
- asset rendering;
- spatial interaction.

Phaser must not become the authoritative owner of business/domain rules.

---

## 3.6 Validation

Use a runtime schema validation library such as **Zod**, subject to dependency review under `AGENTS.md`.

Use it for:

- case manifests;
- authored case data;
- configuration;
- persisted state migrations where appropriate;
- API boundaries when a backend is introduced.

---

## 3.7 Testing

Recommended baseline:

- **Vitest** or equivalent for unit/integration logic tests;
- **React Testing Library** where component behavior warrants it;
- **Playwright** for browser-level critical-path tests.

Exact package choices should be verified for compatibility when implementation begins.

---

## 3.8 Persistence — MVP

Use browser-local persistence for the vertical slice.

Preferred abstraction:

```text
ProgressRepository
        │
        └── LocalProgressRepository
```

Do not scatter direct `localStorage` calls throughout the codebase.

The abstraction enables future replacement with authenticated cloud persistence.

---

# 4. High-Level Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                        ECHOTRACE WEB                         │
├──────────────────────────────────────────────────────────────┤
│                      NEXT.JS APP SHELL                       │
│                                                              │
│  Home │ Case Select │ Settings │ Results │ Future Account   │
└──────────────────────────────┬───────────────────────────────┘
                               │
                    React Game Experience
                               │
          ┌────────────────────┴────────────────────┐
          │                                         │
   GAME DOMAIN LAYER                        PHASER ADAPTER
          │                                         │
   State Machine                             Scene Rendering
   Scoring Engine                            Hit Areas
   Evidence Logic                            Animations
   Deduction Logic                           Asset Display
   Case Runtime                              Pointer/Touch
          │                                         │
          └────────────────────┬────────────────────┘
                               │
                         CASE CONTENT
                               │
                 Validated Structured Data
                               │
       ┌───────────────────────┼───────────────────────┐
       │                       │                       │
    Case 001                Case 002                Case N
                               │
                               ▼
                     PERSISTENCE ADAPTER
                               │
                      Browser Local Store
                               │
                  Future Cloud Repository
```

---

# 5. Architectural Layers

## 5.1 Presentation Layer

Contains:

- Next.js routes;
- React components;
- Phaser scenes;
- visual UI;
- input handling.

It renders state and sends user intent to the domain/application layer.

It should not contain duplicated scoring formulas or canonical case truth.

---

## 5.2 Application Layer

Coordinates use cases such as:

- start case;
- complete observation;
- select scene object;
- collect evidence;
- submit deduction;
- submit final decision;
- calculate results;
- save progress;
- replay case.

It orchestrates domain logic and infrastructure adapters.

---

## 5.3 Domain Layer

Contains framework-independent concepts:

- case;
- case session;
- phase;
- evidence;
- discovery;
- witness;
- statement;
- contradiction;
- deduction;
- score;
- rating;
- progression.

This is the most important layer to keep deterministic and testable.

---

## 5.4 Infrastructure Layer

Contains adapters for:

- persistence;
- analytics;
- logging;
- future API access;
- future authentication;
- future payments;
- asset loading;
- runtime validation.

Infrastructure should implement interfaces defined closer to the domain/application layer.

---

# 6. Proposed Repository Structure

Initial recommendation:

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
├── MONETIZATION.md
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
│   │   ├── page.tsx
│   │   ├── cases/
│   │   ├── play/
│   │   ├── results/
│   │   └── settings/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── evidence/
│   │   ├── witness/
│   │   ├── deduction/
│   │   └── results/
│   │
│   ├── game/
│   │   ├── phaser/
│   │   │   ├── config/
│   │   │   ├── scenes/
│   │   │   ├── objects/
│   │   │   └── adapters/
│   │   │
│   │   ├── domain/
│   │   │   ├── case/
│   │   │   ├── session/
│   │   │   ├── evidence/
│   │   │   ├── deduction/
│   │   │   ├── scoring/
│   │   │   └── progression/
│   │   │
│   │   └── application/
│   │       ├── commands/
│   │       ├── services/
│   │       └── selectors/
│   │
│   ├── cases/
│   │   ├── schemas/
│   │   ├── loader/
│   │   ├── validation/
│   │   └── content/
│   │       └── case-001/
│   │
│   ├── infrastructure/
│   │   ├── persistence/
│   │   ├── analytics/
│   │   ├── logging/
│   │   └── config/
│   │
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

This is a starting blueprint, not permission to create empty abstraction layers with no current purpose.

---

# 7. Dependency Direction

Preferred dependency direction:

```text
Presentation
     ↓
Application
     ↓
Domain

Infrastructure ──implements──> Domain/Application interfaces
```

The domain layer should not import:

- Next.js;
- React;
- Phaser;
- browser storage APIs;
- analytics SDKs;
- payment SDKs.

This protects core game logic from framework coupling.

---

# 8. Game State Model

The game should maintain one authoritative case session.

Conceptual phase type:

```ts
type GamePhase =
  | "case_briefing"
  | "observation_intro"
  | "observation_active"
  | "observation_end"
  | "transition"
  | "investigation_intro"
  | "investigation_active"
  | "evidence_review"
  | "witness_testimony"
  | "deduction"
  | "final_decision"
  | "resolution"
  | "results";
```

The exact naming may evolve, but transitions must remain explicit.

---

# 9. State Machine Rules

The state machine should define legal transitions.

Example:

```text
CASE_BRIEFING
    → OBSERVATION_INTRO

OBSERVATION_INTRO
    → OBSERVATION_ACTIVE

OBSERVATION_ACTIVE
    → OBSERVATION_END

OBSERVATION_END
    → TRANSITION

TRANSITION
    → INVESTIGATION_INTRO

INVESTIGATION_INTRO
    → INVESTIGATION_ACTIVE

INVESTIGATION_ACTIVE
    → EVIDENCE_REVIEW

EVIDENCE_REVIEW
    → WITNESS_TESTIMONY

WITNESS_TESTIMONY
    → DEDUCTION

DEDUCTION
    → FINAL_DECISION

FINAL_DECISION
    → RESOLUTION

RESOLUTION
    → RESULTS
```

Invalid transitions should be rejected rather than silently accepted.

---

# 10. Case Runtime Model

A loaded case should produce a runtime-safe structure after validation.

Conceptually:

```ts
interface CaseDefinition {
  id: string;
  version: number;
  metadata: CaseMetadata;
  briefing: CaseBriefing;
  settings: CaseSettings;
  scenes: SceneDefinition[];
  objects: ObjectDefinition[];
  changes: ChangeDefinition[];
  evidence: EvidenceDefinition[];
  witnesses: WitnessDefinition[];
  contradictions: ContradictionDefinition[];
  deductions: DeductionDefinition[];
  finalDecision: FinalDecisionDefinition;
  solution: SolutionDefinition;
  scoring: ScoringConfiguration;
}
```

Do not treat this interface alone as runtime validation.

Authored data must be parsed and validated.

---

# 11. Stable Identifiers

Case entities should use stable IDs.

Examples:

```text
case-001
scene-lounge-observation
passport-01
red-suitcase-01
evidence-passport-missing
witness-01
statement-01
contradiction-01
deduction-01
```

IDs should not depend on array position or screen coordinates.

---

# 12. Case Data Format

Recommended initial format:

**TypeScript-backed validated JSON-compatible data**, or validated JSON files.

Requirements:

- serializable;
- versioned;
- schema-validated;
- human-readable;
- suitable for future Case Builder generation.

Avoid embedding executable arbitrary code inside case definitions.

---

# 13. Case Schema Versioning

Every case should declare a schema/content version.

Example:

```text
schemaVersion: 1
caseVersion: 1
```

Purpose:

- future migrations;
- compatibility checks;
- safe evolution of the content model;
- regression testing.

The engine should fail clearly when it encounters an unsupported schema version.

---

# 14. Case Loader

The case loader should:

1. locate case content;
2. load structured data;
3. validate schema;
4. validate cross-references;
5. produce a trusted runtime definition;
6. return clear errors when invalid.

Conceptual API:

```ts
loadCase(caseId): Result<CaseDefinition, CaseLoadError>
```

Avoid throwing opaque errors from deep inside the rendering layer.

## T13 Loading Boundary

`src/cases/load-case.ts` orchestrates `CaseSource.read(caseId)` → JSON parsing when the source supplies text → the unchanged T04/T05 `validateCaseDefinition` pipeline → trusted CaseDefinition. Raw source values remain unknown; no raw-to-domain assertion or alternate schema exists. The successful definition can be consumed by application/domain session creation, never passed directly to Phaser.

The application owns the small CaseSource interface; BundledCaseSource implements it with an explicit Map of stable CaseId to repository-controlled read/import thunk and declared asset IDs. Caller IDs are used only for exact lookup, never interpolated into paths, URLs or imports. The production registry is intentionally empty until approved content is added in T15; synthetic fixtures remain test-only. Registry entries/declarations are copied at construction. Every load reads and validates again; there is no loader cache.

Failures are typed: unknown_case, source_unavailable, malformed_source, invalid_case, unsupported_schema, case_id_mismatch and missing_asset_declaration. Validation failures retain T04/T05 category/code/path/message issues without exposing source exception stacks or local paths. The loader checks requested/authored ID agreement and preserves schemaVersion and caseVersion without migration or inference.

Asset references already have identifier syntax validated by T04. Because the current case format has no authored asset catalog, the source entry's declaredAssetIds is the authoritative declaration catalog. The loader checks every scene background/visual reference against it and reports missing declarations with structured paths. This proves declarations only: file existence, URL/path resolution, decoding and production asset loading remain future renderer/content work. No case metadata or solution is duplicated in the registry.

T12 continues to expose only application-derived display projections and semantic intents. T13 does not change renderer contracts, load a production case into the preview, or start T14 authoring.

---

# 15. Cross-Reference Validation

Validation should ensure:

- referenced object IDs exist;
- evidence sources exist;
- witness IDs exist;
- statement IDs exist;
- deduction evidence exists;
- scoring configuration is valid;
- required assets are declared;
- final decision has valid answers;
- canonical solution is reachable;
- duplicate IDs are rejected.

Some logical fairness checks remain manual/playtest concerns.

---

# 16. Phaser Integration Boundary

Phaser should receive a view/runtime representation of the scene.

It should report semantic interactions upward.

Example:

```text
Player taps suitcase
        ↓
Phaser resolves hit target
        ↓
emit objectSelected("red-suitcase-01")
        ↓
Application/domain evaluates selection
        ↓
Domain returns outcome
        ↓
Presentation renders feedback
```

Phaser should **not** decide:

> “This suitcase is worth 200 points.”

That belongs to domain/scoring logic.

---

# 17. React–Phaser Communication

Use a narrow typed bridge.

Conceptual events:

```text
React/Application → Phaser
- loadScene
- setPhase
- revealDiscovery
- highlightObject
- setInteractionEnabled

Phaser → Application
- objectSelected
- sceneReady
- transitionCompleted
- assetLoadFailed
```

Avoid a global untyped event bus.

Event names and payloads should be typed.

---

# 18. Scene Lifecycle

Phaser scenes must clean up:

- event listeners;
- timers;
- tweens;
- transient objects;
- subscriptions;
- audio handles where applicable.

React mounting/unmounting must not accidentally create duplicate Phaser game instances.

## T11 Runtime Shell

The approved renderer baseline is Phaser 4.2.1 (MIT), superseding provisional Phaser 3.90.0 before T11 completion. The shell uses an asset-free Canvas base scene. `PhaserHost` owns a mount-local lifecycle in `src/game/renderer`; its effect lazily imports the runtime module only after mounting. Server rendering produces a stable container and loading caption. The runtime is retained outside React render state, so readiness rerenders do not reconstruct it.

The neutral logical rectangle is 960×540, with uniform FIT scaling and centering in a responsive host. This is infrastructure sizing, not a Case 001 art requirement. One ResizeObserver per active mount refreshes parent bounds and scale without recreating the runtime. Cleanup cancels delayed creation/callbacks, disconnects the observer, detaches the owned canvas immediately and requests Phaser destruction on its next frame with remount support retained.

The T11 lifecycle interface exposes readiness and typed load/initialization failures. The `/renderer` preview route exercises mounting/navigation; no case data, audio, timer, scoring or persistence is connected. T12 adds the instance-local projection/intent boundary below; T13 retains case/asset loading.

## T12 Projection and Intent Bridge

`src/game/application/renderer-bridge.ts` defines the framework-independent application boundary. React/application/domain remains authoritative. The renderer receives a disposable readonly projection containing attempt identity, a revision, display phase, scene identity, interaction enablement and an optional neutral target (ObjectId, display label, derived highlight). This intentionally small contract proves communication; authored visuals, regions, assets and production scene rendering remain later tasks. No CaseDefinition, CaseSession, solution, scoring configuration or progress envelope crosses into Phaser.

The bridge explicitly copies and freezes display fields, retains only the latest projection and pushes it into the existing runtime once attached. Application-controlled revisions are nonnegative safe integers, strictly increasing within an attempt. Older/equal revisions are rejected; a new authoritative attempt may begin at revision zero. There is no history or event log.

Phaser emits only `object_selected` with ObjectId, attempt identity and the displayed projection revision. Before dispatch the bridge reads current application state, checks attempt/revision/target and interaction enablement, and returns typed rejection reasons for stale or invalid delivery. Acceptance means delivered, not correct. The injected application handler may call T07; Phaser never evaluates selection truth. An application reducer must also validate queued actions against current state before committing changes.

Each mounted host creates its own connection. Cleanup disposes it before destroying the runtime, so previous-runtime callbacks remain rejected even when a remount reuses an attempt ID. React Effect Events read current projection/callback props without capturing old values or restarting the runtime. Projection effects update existing Phaser rectangle/text objects; they do not create another Game. No global event bus or second authoritative session exists.

The `/renderer` route uses reducer-owned synthetic presentation state and neutral controls to exercise projection updates, selection feedback and interaction enablement, with an HTML selection alternative. It does not load a case or assert discovery correctness. T13 owns real case loading; later gameplay tasks derive projections from authoritative sessions and integrate semantic selection with T07.

---

# 19. Coordinate Strategy

Case content should avoid fragile absolute screen assumptions.

Use:

- normalized coordinates;
- logical scene dimensions;
- responsive scaling;
- stable anchor points;
- sufficiently large hit regions.

Scene composition must be tested at mobile and desktop sizes.

---

# 20. Asset Architecture

Assets should be organized by:

```text
public/assets/
├── common/
└── cases/
    ├── case-001/
    ├── case-002/
    └── ...
```

Case manifests should declare required assets.

Avoid importing case assets from arbitrary unrelated locations.

---

# 21. Asset Optimization

Before production:

- compress raster images;
- use appropriate modern formats where supported;
- avoid unnecessarily huge source dimensions;
- lazy-load case-specific assets;
- preload only what is required for the imminent phase;
- avoid duplicate assets;
- define caching strategy.

Large case assets should not make the home page download the entire game library.

---

# 22. Scoring Engine

Scoring should be a deterministic domain service.

Conceptual interface:

```ts
calculateScore(attempt, caseScoringConfig): ScoreResult
```

Inputs should contain recorded player actions and case configuration.

Outputs may contain:

```text
baseScore
observationScore
evidenceScore
deductionScore
finalDecisionScore
efficiencyBonus
penalties
totalScore
rating
```

The same inputs must produce the same result.

---

# 23. Evidence Engine

Evidence state should be represented by stable evidence IDs.

Rules:

- no duplicate collection;
- evidence must exist in case definition;
- locked evidence cannot appear collected;
- collection events are recorded;
- UI derives from authoritative evidence state.

---

# 24. Deduction Engine

Deduction evaluation should be independent of UI.

Conceptually:

```ts
evaluateDeduction(
  deductionDefinition,
  submittedAnswer,
  sessionContext
): DeductionResult
```

The renderer should not contain correct-answer logic.

---

# 25. Progress Repository

Define a persistence contract.

Conceptual:

```ts
interface ProgressRepository {
  getCaseProgress(caseId: string): Promise<CaseProgress | null>;
  saveCaseProgress(progress: CaseProgress): Promise<void>;
  getSettings(): Promise<PlayerSettings>;
  saveSettings(settings: PlayerSettings): Promise<void>;
}
```

MVP implementation:

```text
LocalProgressRepository
```

Future implementation:

```text
CloudProgressRepository
```

Application code should depend on the interface rather than direct storage APIs.

## Approved T10 Contract

The Stage-1 ProgressRepository lives in `src/game/application/progress-repository.ts`. Its operations are `getCaseProgress(caseId, caseVersion)` and `saveCompletedAttempt(attempt)`, returning typed results rather than permitting arbitrary aggregate overwrites. The settings methods above remain conceptual; settings persistence is outside this historical-progress task.

`createCompletedAttempt` accepts only the canonical completed Results state and obtains the final score through the existing T09 calculation. Pure domain functions append unique completed-attempt summaries and derive the existing CaseProgress. Completion is independent of solved correctness: CaseProgress has no solved field, and T10 adds no inference or solved transition. bestRating remains null while ratings are deferred.

LocalProgressRepository receives a getItem/setItem storage interface; browser orchestration can inject localStorage without domain access or a browser global at module initialization. Each `echotrace:progress:v1:<encoded-caseId>:<caseVersion>` key contains a schemaVersion-1 envelope and minimal completed-attempt summaries (case identity/version, injected attemptId, injected completedAt, T09 score). Distinct case versions have independent histories. The first persisted result for an attempt identity wins, including retries with different payloads.

Reads report recovery explicitly, retain valid entries from partially malformed ledgers and never modify storage. A later successful save repairs recoverable data. Unsupported envelope versions and storage failures return typed errors; unsupported data is not overwritten. No unrelated keys are cleared. The adapter performs each read/modify/write synchronously, but localStorage does not provide transactions between separate tabs: concurrent independent writers are not coordinated in Stage 1. Minimal completed-attempt history grows with completed playthroughs; quota failures remain explicit.

Interrupted sessions restart with a new externally injected attemptId and are not counted. This ledger cannot reconstruct live gameplay. There is no autosave, cloud sync, settings implementation or new dependency in T10.

---

# 26. Local Persistence

Browser-local data should be:

- namespaced;
- versioned;
- validated when loaded;
- resilient to malformed data;
- minimal.

Do not store sensitive information unnecessarily.

Suggested categories:

```text
echotrace:progress:v1
echotrace:settings:v1
```

Exact storage structure should be finalized during implementation.

---

# 27. Save Model

For MVP, persist:

- completed cases;
- best score;
- best rating;
- attempt count;
- player settings.

Exact mid-case restoration is optional.

If mid-case state is not supported, returning to an interrupted case should restart the attempt cleanly.

---

# 28. Application State Management

Do not introduce a heavyweight state library automatically.

Start with the simplest solution that preserves clear ownership.

Potential approach:

- React state/context for app-level coordination;
- domain session reducer/state machine for case state;
- repository abstraction for persistence.

Introduce Zustand, Redux, XState, or another state library only if concrete complexity justifies it.

The agent must document the reason before adding such a dependency.

---

# 29. Timer Architecture

Observation timing must not depend solely on repeated UI decrement state.

Use timestamps or a robust timer abstraction so rendering delays do not alter game rules.

Conceptually:

```text
observationStartedAt
observationDurationMs
remaining = duration - (now - startedAt)
```

The presentation may display rounded seconds.

Timer behavior must be testable.

---

# 30. Time and Pause Integrity

If pause is supported:

- pause records the time;
- scene becomes unavailable/obscured;
- remaining duration is preserved;
- resuming cannot grant free observation time.

The MVP may omit pause if unnecessary.

---

# 31. Error Model

Prefer typed domain/application errors.

Examples:

```text
CaseNotFoundError
CaseValidationError
UnsupportedSchemaVersionError
AssetLoadError
PersistenceReadError
PersistenceWriteError
InvalidGameTransitionError
```

User-facing messages should be understandable.

Developer logs may contain more detail.

---

# 32. Logging

Logging should be centralized.

Levels may include:

- debug;
- info;
- warn;
- error.

Production logs must not expose secrets or unnecessary personal data.

Avoid scattered `console.log` statements in committed production code.

---

# 33. Analytics Architecture

Analytics should use an adapter.

Conceptually:

```ts
interface Analytics {
  track(event: AnalyticsEvent): void;
}
```

Domain logic may emit semantic events through the application layer.

It should not import a vendor SDK directly.

This allows providers to change without rewriting game logic.

---

# 34. Analytics Privacy

Only collect data necessary for product understanding.

Avoid sending:

- secrets;
- full arbitrary user-entered text;
- unnecessary identifiers;
- sensitive personal information.

Analytics requirements must align with privacy policies before commercial launch.

---

# 35. Authentication

Authentication is **not required for the first vertical slice**.

When introduced, authentication should be added at the application/infrastructure boundary rather than embedded into core game logic.

Guest play should remain technically possible unless product strategy later changes.

---

# 36. Backend Strategy

The MVP does not require a complex backend.

Introduce backend capabilities only when needed for features such as:

- accounts;
- cloud progress;
- purchases;
- Daily Echo;
- public leaderboards;
- content delivery;
- remote configuration;
- server-authoritative score validation.

Next.js server capabilities may initially be sufficient.

Do not create microservices without evidence that they are needed.

---

# 37. Database Strategy

No production database is required for the first local vertical slice.

When persistence moves server-side, choose a database based on actual access patterns.

Likely future entities include:

```text
users
profiles
case_catalog
case_progress
attempts
achievements
daily_challenges
entitlements
purchases
subscriptions
```

The choice of database should be made when backend requirements are concrete.

---

# 38. Monetization Architecture

Payments are out of scope for the first vertical slice.

Future monetization should use an entitlement model.

Example:

```text
Product Purchase
      ↓
Payment Provider
      ↓
Verified Server Event
      ↓
Entitlement
      ↓
Player Access
```

Do not trust client-side flags as proof of purchase.

Detailed strategy belongs in `MONETIZATION.md`.

---

# 39. Daily Echo Architecture — Future

Daily Echo will likely require:

- server-selected daily case;
- date/time authority;
- challenge identifier;
- attempt rules;
- score submission;
- leaderboard/ranking logic;
- anti-cheat considerations;
- challenge history.

These systems must not be built into the MVP prematurely.

---

# 40. Case Builder Architecture — Future

The future Case Builder should generate the same validated case format consumed by the game engine.

Desired architecture:

```text
Case Builder UI
      ↓
Case Draft Model
      ↓
Validation
      ↓
Approved Case Definition
      ↓
Same Runtime Case Loader
      ↓
EchoTrace Engine
```

There should not be one format for manual cases and a separate incompatible format for Case Builder cases.

---

# 41. Internationalization Architecture

Player-facing strings should be separable from game logic.

Potential strategy:

```text
locales/
  en/
  fr/
  es/
```

Case content should use localization-friendly fields or keys.

Do not use localized display text as stable identifiers.

---

# 42. Accessibility Architecture

Application UI should use semantic HTML where possible.

Phaser canvas interactions should have appropriate companion UI/labels where feasible.

Support:

- keyboard navigation for non-canvas UI;
- focus management;
- sufficient contrast;
- reduced motion;
- audio settings;
- responsive touch targets.

Accessibility requirements must be tested rather than assumed.

---

# 43. Performance Targets

Initial engineering targets should include:

- no unnecessary blocking work on the main thread;
- home/app shell should not preload all case assets;
- case assets load on demand;
- avoid duplicate Phaser instances;
- clean event listeners;
- minimize React rerenders around the game canvas;
- optimize images/audio before release;
- lazy-load heavy game runtime where practical.

Concrete performance budgets should be measured during MVP development.

---

# 44. Security Baseline

Even a game requires disciplined security.

Rules:

- never commit secrets;
- never expose server credentials client-side;
- validate untrusted input;
- sanitize or safely render user-provided content if introduced;
- use secure dependencies;
- keep packages updated deliberately;
- minimize third-party scripts;
- protect server-side purchase verification;
- enforce authorization server-side when accounts exist;
- do not rely on obscurity.

---

# 45. Environment Configuration

Use environment variables only for environment-specific configuration.

Provide an example file such as:

```text
.env.example
```

It may contain variable names but never real secrets.

Client-exposed environment variables must be explicitly safe for public exposure.

---

# 46. Dependency Policy

Every dependency adds:

- maintenance;
- security surface;
- bundle cost;
- upgrade burden.

Before adding a dependency, ask:

1. Is the problem real?
2. Is the dependency maintained?
3. Can existing stack capabilities solve it?
4. What does it add to the client bundle?
5. Is the license acceptable?
6. Is it compatible with current versions?

Codex must not install libraries merely for convenience without justification.

---

# 47. Testing Architecture

Testing details belong in `TESTING_STRATEGY.md`, but architecture must enable testing.

Core logic should support:

### Unit Tests
- scoring;
- state transitions;
- evidence;
- deductions;
- validation;
- progression;
- timer calculations.

### Integration Tests
- case loading;
- full session transitions;
- evidence-to-deduction flow;
- persistence.

### E2E Tests
- start Case 001;
- observe;
- investigate;
- submit deduction;
- finish;
- view results;
- replay.

---

# 48. Determinism

Deterministic systems are essential for reliable tests.

Where randomness is later introduced:

- inject the random source;
- support seeded randomness where appropriate;
- record generated variants;
- never allow hidden uncontrolled randomness to determine scoring.

Case 001 should be deterministic.

---

# 49. Build Quality Gates

Before code is considered ready:

```text
format
  ↓
lint
  ↓
type-check
  ↓
unit tests
  ↓
integration tests
  ↓
production build
  ↓
critical E2E tests
```

Exact commands will be documented in `README.md` and `AGENTS.md`.

A coding agent must report failures rather than claiming completion.

---

# 50. CI Strategy

Once the repository is initialized, continuous integration should run on pull requests.

Minimum future CI:

- install with lockfile;
- lint;
- type-check;
- unit tests;
- production build.

Add E2E testing as the product stabilizes.

Do not allow CI configuration to diverge from documented local commands.

---

# 51. Git Strategy

Prefer small, coherent changes.

Recommended:

- feature branches or equivalent isolated work;
- descriptive commits;
- no unrelated refactoring;
- no generated artifacts unless required;
- lockfile committed;
- documentation updated when behavior changes.

Detailed AI-agent git behavior belongs in `AGENTS.md`.

---

# 52. Architectural Decision Records

For significant irreversible or costly choices, consider lightweight ADRs:

```text
docs/adr/
├── 0001-phaser-for-game-runtime.md
├── 0002-case-data-format.md
└── ...
```

Do not create ADRs for trivial decisions.

Use them when future developers would reasonably ask:

> “Why did we choose this?”

---

# 53. Avoiding Overengineering

The following are explicitly discouraged for the MVP unless justified:

- microservices;
- event sourcing;
- CQRS frameworks;
- Kubernetes;
- multiple databases;
- complex message queues;
- custom design system infrastructure;
- premature plugin systems;
- generalized workflow engines;
- elaborate dependency injection frameworks;
- multiplayer networking;
- distributed caches.

Scalability means preserving good boundaries, not maximizing infrastructure.

---

# 54. Avoiding Underengineering

Conversely, do not:

- hardcode Case 001 into React components;
- put scoring inside click handlers;
- use object coordinates as IDs;
- scatter `localStorage` calls;
- duplicate game phase state;
- embed secrets in frontend code;
- skip runtime validation;
- allow arbitrary case data to mutate engine rules;
- create giant components containing the whole game;
- use `any` to bypass design problems.

---

# 55. Proposed MVP Runtime Flow

```text
User opens EchoTrace
        ↓
Next.js loads app shell
        ↓
User selects Case 001
        ↓
Case Loader loads case definition
        ↓
Schema + references validated
        ↓
Application creates CaseSession
        ↓
Briefing rendered in React
        ↓
Game runtime initialized
        ↓
Observation scene rendered by Phaser
        ↓
Domain timer/session controls phase
        ↓
Transition
        ↓
Investigation scene
        ↓
Phaser emits semantic object selections
        ↓
Domain evaluates discoveries
        ↓
React evidence UI updates
        ↓
Witness UI
        ↓
Deduction evaluation
        ↓
Final decision
        ↓
Resolution
        ↓
Scoring engine calculates result
        ↓
ProgressRepository saves best result
        ↓
Results UI
```

---

# 56. Initial Case 001 Technical Boundary

Case 001 may define:

- scene assets;
- object definitions;
- object states;
- three primary changes;
- evidence;
- witness;
- statement;
- contradiction;
- deduction;
- final decision;
- solution;
- scoring configuration.

Case 001 must **not** define custom executable engine code for ordinary mechanics.

If implementation discovers a required capability missing from the engine, ask:

> Is this a reusable game mechanic or a one-off case hack?

Reusable mechanics belong in the engine after specification review.

One-off hacks should be avoided.

---

# 57. Architecture Acceptance Criteria

Architecture is acceptable for MVP implementation when:

- cases are data-driven;
- core logic is testable without Phaser;
- Phaser and React have a typed boundary;
- one authoritative session state exists;
- state transitions are explicit;
- scoring is deterministic;
- case content is runtime validated;
- persistence is abstracted;
- assets are case-scoped;
- the app can support responsive rendering;
- new standard cases do not require engine modification;
- unnecessary backend infrastructure is absent;
- future backend/purchases can be introduced without rewriting the domain;
- build quality gates are defined.

---

# 58. Open Decisions to Resolve During Planning

Codex should not silently decide these without review:

1. Exact supported Next.js version at project initialization.
2. Exact Phaser version.
3. Exact test runner and compatible versions.
4. Whether Zod is selected or an equivalent validator.
5. Whether application state needs an external library.
6. Exact JSON vs TypeScript-authored case storage for MVP.
7. Exact image/audio formats and budgets.
8. Exact deployment provider.
9. Whether PWA support is included in the first public MVP or immediately after.
10. Exact backend/database stack when cloud features become necessary.

For each, prefer the simplest stable option compatible with requirements.

---

# 59. Codex Architecture Planning Requirement

Before implementation, Codex should read:

```text
PRD.md
GAME_SPEC.md
CASE_AUTHORING_GUIDE.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
```

Then produce a concrete implementation plan.

It must identify any conflict between documents before writing code.

The architecture document is a blueprint, not permission to ignore newer approved requirements.

---

# 60. Definition of Architecture Done

For the pre-development phase, architecture documentation is complete when:

- major layers are defined;
- responsibilities are separated;
- data flow is defined;
- case model direction is defined;
- state ownership is defined;
- Phaser boundary is defined;
- persistence boundary is defined;
- testing seams exist;
- future systems have extension points without premature implementation;
- major anti-patterns are documented;
- unresolved choices are explicitly listed.

Implementation may refine low-level details, but material architectural changes must be documented.

---

# 61. Relationship to Other Documents

- `PRD.md` — defines what EchoTrace must achieve.
- `GAME_SPEC.md` — defines how gameplay behaves.
- `CASE_AUTHORING_GUIDE.md` — defines how mysteries are constructed.
- `ARCHITECTURE.md` — defines how the software is structured. **This document.**
- `AGENTS.md` — governs Codex and engineering behavior.
- `TESTING_STRATEGY.md` — defines verification and quality gates.
- `ROADMAP.md` — defines build order.
- `MONETIZATION.md` — defines commercial strategy.
- `README.md` — provides repository onboarding.

If architecture conflicts with an approved product/game requirement, the conflict must be surfaced rather than silently overriding the requirement.

---

# 62. Change Control

Material changes requiring architecture-document updates include:

- framework replacement;
- game runtime replacement;
- case format changes;
- state ownership changes;
- persistence strategy changes;
- backend introduction;
- authentication architecture;
- monetization architecture;
- Daily Echo architecture;
- Case Builder architecture;
- major dependency direction changes.

Architecture should evolve intentionally through source-controlled revisions.

---

# 63. Document Status

**Document:** `ARCHITECTURE.md`  
**Version:** 1.0  
**Status:** Initial Architecture Baseline  
**Product:** EchoTrace  
**Previous Document:** `CASE_AUTHORING_GUIDE.md`  
**Next Document:** `AGENTS.md`

### Documentation Progress

```text
ECHOTRACE/
│
├── README.md                  ○ Pending
├── PRD.md                     ● COMPLETE
├── GAME_SPEC.md               ● COMPLETE
├── CASE_AUTHORING_GUIDE.md    ● COMPLETE
├── ARCHITECTURE.md            ● DOCUMENT 4 — COMPLETE
├── AGENTS.md                  ◉ DOCUMENT 5 — NEXT
├── TESTING_STRATEGY.md        ○ Pending
├── ROADMAP.md                 ○ Pending
└── MONETIZATION.md            ○ Pending
```
