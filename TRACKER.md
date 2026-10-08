# EchoTrace — Project Tracker

**File:** `TRACKER.md`  
**Product:** EchoTrace  
**Document Type:** Operational Sprint, Milestone & Task Tracker  
**Version:** 1.0  
**Status:** Active Execution Ledger  
**Date:** October 2026  
**Strategic Source:** `ROADMAP.md`  
**Engineering Rules:** `AGENTS.md`  
**Verification Rules:** `TESTING_STRATEGY.md`

---

# 1. Purpose

`TRACKER.md` is the operational mirror of `ROADMAP.md`.

Use it to track:

- current stage;
- current milestone;
- current sprint;
- task status;
- dependencies;
- blockers;
- acceptance;
- verification;
- commits/PRs;
- release readiness.

`ROADMAP.md` answers **what and why**.

`TRACKER.md` answers **where are we now?**

A future project-tracker UI should use a structured representation of this model rather than parsing Markdown directly.

---

# 2. Synchronization Rules

1. Strategic scope and sequencing changes begin in `ROADMAP.md`.
2. Mirror approved changes here.
3. Routine task-status changes are made here.
4. Stable task IDs must not be renumbered after execution begins.
5. `DONE` requires acceptance criteria and required verification.
6. If this tracker conflicts with `ROADMAP.md`, the roadmap controls scope/sequence and this file must be corrected.
7. If implementation conflicts with an approved specification, the specification controls until intentionally revised.

---

# 3. Status Vocabulary

```text
NOT_STARTED
READY
IN_PROGRESS
BLOCKED
IN_REVIEW
VERIFICATION
DONE
DEFERRED
CANCELLED
```

---

# 4. Current Project Snapshot

| Field | Current Value |
|---|---|
| Product Stage | Stage 1 — Vertical Slice |
| Current Milestone | M3 — Case 001 Content & Core Loop (IN_PROGRESS, 2/7) |
| Current Sprint | S5 — Case 001 Definition & Observation (IN_PROGRESS, 2/5) |
| Implementation Status | T01–T15 complete; M1 6/6; M2 7/7; M3 2/7; S3 4/4; S4 3/3; S5 2/5 |
| Current Engineering Task | T15 — Add Case 001 structured data (DONE) |
| Next Implementation Task | T16 after explicit authorization |
| Vertical Slice | Case 001 — The Missing Passport |
| Documentation | Complete |
| Overall T01–T34 Completion | 15 / 34 (approximately 44.1%) |
| Blockers | None; accepted development-tooling risks recorded below |
| Last Tracker Update | 2026-10-07 |

**Important:** T01–T15, M2 and S4 are DONE. T14's canonical dossier remains frozen. T15 provides validated content, not playable gameplay. M3 and S5 remain IN_PROGRESS. T16 is not started or authorized.

---

# 5. Milestone Dashboard

| ID | Milestone | Sprint(s) | Tasks | Status | Completion | Exit Gate |
|---|---|---|---|---|---:|---|
| M0 | Planning & Approval | S0 | Planning gate | DONE | — | Architecture plan approved |
| M1 | Foundation | S1–S2 | T01–T06 | DONE | 6/6 | Build + domain + validation + state model healthy |
| M2 | Core Game Engine | S3–S4 | T07–T13 | DONE | 7/7 | Reusable engine foundations operational |
| M3 | Case 001 Content & Core Loop | S5–S6 | T14–T20 | IN_PROGRESS | 2/7 | Briefing → observation → investigation works |
| M4 | Detective Reasoning Loop | S6–S7 | T21–T26 | NOT_STARTED | 0/6 | Mystery reasoning loop complete |
| M5 | Product Shell & Replay | S8 | T27–T30 | NOT_STARTED | 0/4 | Coherent player-facing vertical slice |
| M6 | Quality & Validation | S9–S10 | T31–T34 | NOT_STARTED | 0/4 | Vertical Slice Exit Gate satisfied |

---

# 6. Sprint Dashboard

| Sprint | Milestone | Tasks | Status | Primary Outcome |
|---|---|---|---|---|
| S0 | M0 | Architecture planning | DONE | Approved implementation plan |
| S1 | M1 | T01–T03 | DONE | 3/3 complete; scaffold, quality baseline, and domain contracts verified |
| S2 | M1 | T04–T06 | DONE | 3/3 complete; validation, integrity, and session state machine verified |
| S3 | M2 | T07–T10 | DONE | 4/4 complete; deterministic rules and local progress verified |
| S4 | M2 | T11–T13 | DONE | 3/3 complete; Phaser shell, typed bridge and trusted case loader verified |
| S5 | M3 | T14–T18 | IN_PROGRESS | 2/5 complete; approved design and validated content; observation deferred |
| S6 | M3/M4 | T19–T23 | NOT_STARTED | Investigation + evidence + witness + deduction |
| S7 | M4 | T24–T26 | NOT_STARTED | Decision + resolution + results |
| S8 | M5 | T27–T30 | NOT_STARTED | Replay + app shell + accessibility + polish |
| S9 | M6 | T31–T32 | NOT_STARTED | E2E + production readiness |
| S10 | M6 | T33–T34 | NOT_STARTED | Human playtest + revision |

---

# 7. Master Task Tracker

| ID | Task | Milestone | Sprint | Status | Priority | Depends On |
|---|---|---|---|---|---|---|
| T01 | Scaffold application | M1 | S1 | DONE | HIGH | M0 |
| T02 | Configure quality tooling | M1 | S1 | DONE | HIGH | T01 |
| T03 | Define domain types | M1 | S1 | DONE | HIGH | T01–T02 |
| T04 | Implement case schema | M1 | S2 | DONE | HIGH | T03 |
| T05 | Implement cross-reference validator | M1 | S2 | DONE | HIGH | T04 |
| T06 | Implement game state machine | M1 | S2 | DONE | HIGH | T03 |
| T07 | Implement evidence domain | M2 | S3 | DONE | HIGH | T03,T06 |
| T08 | Implement deduction domain | M2 | S3 | DONE | HIGH | T03,T07 |
| T09 | Implement scoring engine | M2 | S3 | DONE | HIGH | T03,T07,T08 |
| T10 | Implement progress repository | M2 | S3 | DONE | HIGH | T03 |
| T11 | Integrate Phaser shell | M2 | S4 | DONE | HIGH | T01–T02 |
| T12 | Implement typed React–Phaser bridge | M2 | S4 | DONE | HIGH | T06,T11 |
| T13 | Implement case loader | M2 | S4 | DONE | HIGH | T04,T05 |
| T14 | Finalize Case 001 authoring | M3 | S5 | DONE | CRITICAL | Documentation baseline |
| T15 | Add Case 001 structured data | M3 | S5 | DONE | HIGH | T13,T14 |
| T16 | Build briefing | M3 | S5 | NOT_STARTED | HIGH | T06,T15 |
| T17 | Build observation scene | M3 | S5 | NOT_STARTED | HIGH | T11–T12,T15 |
| T18 | Build observation timer | M3 | S5 | NOT_STARTED | HIGH | T06,T17 |
| T19 | Build transition | M3 | S6 | NOT_STARTED | MEDIUM | T17,T18 |
| T20 | Build investigation | M3 | S6 | NOT_STARTED | HIGH | T07,T12,T15,T19 |
| T21 | Build evidence panel | M4 | S6 | NOT_STARTED | HIGH | T07,T20 |
| T22 | Build witness phase | M4 | S6 | NOT_STARTED | HIGH | T15,T21 |
| T23 | Build deduction | M4 | S6 | NOT_STARTED | HIGH | T08,T21,T22 |
| T24 | Build final decision | M4 | S7 | NOT_STARTED | HIGH | T23 |
| T25 | Build resolution | M4 | S7 | NOT_STARTED | HIGH | T14,T24 |
| T26 | Build results/scoring UI | M4 | S7 | NOT_STARTED | HIGH | T09,T24,T25 |
| T27 | Implement replay | M5 | S8 | NOT_STARTED | HIGH | T10,T26 |
| T28 | Build minimal app shell/case selection | M5 | S8 | NOT_STARTED | MEDIUM | T13,T16,T26 |
| T29 | Accessibility/responsive pass | M5 | S8 | NOT_STARTED | HIGH | T16–T28 |
| T30 | Audio/polish | M5 | S8 | NOT_STARTED | MEDIUM | Core flow stable |
| T31 | E2E critical paths | M6 | S9 | NOT_STARTED | CRITICAL | T27–T30 |
| T32 | Production-readiness audit | M6 | S9 | NOT_STARTED | CRITICAL | T31 |
| T33 | Human playtest | M6 | S10 | NOT_STARTED | CRITICAL | T32 |
| T34 | Revision sprint | M6 | S10 | NOT_STARTED | CRITICAL | T33 |

Dependencies are the initial planning baseline and may be refined during the approved architecture-planning phase without changing the task's intended outcome.

---

# 8. M0 — Planning & Approval

## Current Task — Architecture Planning

**Status:** `DONE`
**Owner:** Project Owner + Codex  
**Coding Allowed:** No during M0; T01 was separately authorized after approval.

### Required Inputs

```text
README.md
PRD.md
GAME_SPEC.md
CASE_AUTHORING_GUIDE.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
ROADMAP.md
MONETIZATION.md
TRACKER.md
```

### Required Output

- final proposed folder structure;
- dependency recommendations and justification;
- exact case data format recommendation;
- state-management approach;
- React–Phaser bridge design;
- persistence approach;
- validation approach;
- testing setup;
- implementation sequence;
- risks;
- conflicts/ambiguities;
- owner decisions required;
- overengineering/underengineering review.

### Acceptance Criteria

```text
[x] All project documents reviewed
[x] No code changed during M0
[x] No dependencies installed during M0
[x] No scaffold created during M0
[x] Architecture conflicts identified
[x] Open decisions explicitly listed
[x] Task sequence reviewed against ROADMAP.md
[x] Project owner approves the plan
```

### Verification

Human review only.

### Completion Record

- Start Date: —
- Completion Date: —
- Commit / PR: N/A
- Blockers: None
- Notes: Owner approved M0/S0 with proposed changes in this chat. Later environment approval selects existing NVM Node 22.18.0/npm 11.5.2 for Stage 1 after compatibility verification. Remaining gameplay/product decisions stay deferred to their blocking tasks.

---

## T01 — Scaffold Application — Completion Record

- Status: DONE; M1/S1; completion and reconfirmed verification recorded 2026-10-05.
- Scope: minimal App Router shell, strict TypeScript, Tailwind 4, npm lockfile, lint and build configuration. No gameplay or T02 tooling implemented.
- Environment: existing NVM Node 22.18.0/npm 11.5.2, explicit executables with process-only PATH prepend and required execution approvals. No machine PATH or Node installation changes.
- Baseline: Next.js 16.3.8, React/React DOM 19.3.0, TypeScript 5.9.3, Tailwind/PostCSS plugin 4.3.3, PostCSS 8.5.29, ESLint 9.39.5, eslint-config-next 16.3.8.
- Verification: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build` passed. Development startup on 127.0.0.1:3100 and production startup on 127.0.0.1:3101 passed. Browser checks confirmed EchoTrace content, active Tailwind styling, responsive widths 390/768/1280 without horizontal overflow, and no captured warning/error logs. Temporary servers stopped after verification.
- Audit: `npm audit --omit=dev --json` passed with zero findings. Full audit reports five high findings along the development-only braces → micromatch → fast-glob → Next ESLint plugin/config chain (GHSA-vfj7-8cjw-p6xm); no patched braces release is available. No external glob patterns are accepted by this scaffold. ESLint 9 is unsupported but retained for current plugin peer compatibility; revisit when compatible fixes are published.
- Preservation: framework agent-rule generation disabled; AGENTS.md has no net changes. Existing untracked TRACKER_v1.1.md preserved. Build output, node_modules, generated next-env.d.ts, and TypeScript caches are ignored.
- Tests: none added or installed, per T01 scope. Commit/PR: not created.
- Resolved scope decision: owner approved Zod 4.6.5 solely as a transitive development dependency of eslint-plugin-react-hooks 7.1.1 via eslint-config-next 16.3.8. It is not directly declared or imported by application source; no runtime validation or T04 work was added.
- Accepted tooling risks: owner retained ESLint 9 and the unpatched braces advisory without suppression, forced overrides, unofficial forks, downgrades, or weakened lint rules. Reconfirmed `npm explain braces` identifies only the development ESLint chain; production audit remains clean and application source has no imports of these packages.
- Next: T02 READY; not started. M1 1/6; S1 1/3; Stage 1 1/34.

---

## T02 — Configure Quality Tooling — Completion Record

- Status: DONE; M1/S1; completion recorded 2026-10-06. T03 has not started.
- Added development-only Prettier 3.9.9, eslint-config-prettier 10.1.8, and Vitest 5.0.3. Existing T01 dependency versions and strict TypeScript options preserved.
- Formatting: small LF configuration; project source/config/tests/CI covered. Product Markdown, generated outputs, npm lockfile, and environment files excluded from rewriting.
- Tests: Node environment, TypeScript and `@/` imports; one smoke test of the existing semantic home page. `test`/`test:run` exit deterministically; `test:watch` explicitly opts into watch mode. No gameplay utility invented.
- Component/DOM testing deferred per conditional specification until UI behavior warrants it. Playwright deferred to later browser lifecycle work and T31 E2E; none of these dependencies installed.
- Boundaries: ESLint rejects static test-only imports from application source. Layer import conventions documented; stronger dependency enforcement deferred until T03+ introduces actual modules. No empty architecture folders created.
- CI: official checkout/setup-node v7, Ubuntu runner, Node 22.18.0/npm 11.5.2, npm cache, read-only permissions, lockfile install, format/lint/typecheck/tests/build. YAML parsed locally; hosted GitHub Actions execution not claimed. No deployment or secrets.
- Verification: `npm ci`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, aggregate `npm run check`, production build, and `git diff --check` passed. One test passed and exited. CI YAML parsed successfully.
- Lockfile repair: npm initially omitted optional Rolldown bindings. Regenerated the lockfile through npm from the pinned manifest after clearing generated dependencies; Windows/Linux binding entries now present, existing locked versions unchanged, clean `npm ci` and tests passed. No manual lockfile edits.
- Security: full audit executed and retained the same five accepted high development-only braces-chain findings; production-only audit reports zero. Accepted transitive lint-tool Zod and ESLint 9 warning remain unchanged. No direct Zod, Phaser, or test-only application imports introduced.
- T01 regression: development startup and browser rendering passed; Tailwind active at widths 390/768/1280, no horizontal overflow, no captured browser warning/error logs. Server stopped after checks.
- Preservation: AGENTS.md, ROADMAP.md, and product specifications unchanged; existing TRACKER_v1.1.md preserved; generated output ignored. No commit/PR created.
- Next: T03 READY after explicit authorization. M1 2/6; S1 2/3; overall 2/34.

---

## T03 — Establish Core Domain Types — Completion Record

- Status: DONE; M1/S1; completion recorded 2026-10-06. S1 complete; T04 not started.
- Created six populated plain-TypeScript modules in src/game/domain: identity, scene, reasoning, scoring, case, session. No empty architecture directories, engine behavior, runtime validation, case data, or Case 001 truth.
- Contracts cover semantic string ID aliases; localization/asset references; separate schemaVersion/caseVersion; scene objects, visuals and independent rectangle/circle regions; finite documented changes; evidence, characters, witnesses, statement truth, contradictions, choice-based deductions, final decision, canonical solution/reconstruction, three hint levels, configurable scoring/result shapes, phases, session attempts, and progress facts.
- Modeling: readonly JSON-compatible data with type-only sibling imports. Person changes use logical objects linked to characters; missing objects can retain interaction regions without visuals. No branded factories, callbacks, framework types, or policy constants. IDs/numeric ranges/references still require T04/T05 validation.
- Boundaries: targeted ESLint permits sibling domain imports only. Isolated tsconfig.domain.json uses ES2022 libraries and no ambient Node/DOM types; typecheck runs both project and domain checks. Six manual lint probes rejected react, next, phaser, zod, node:fs, and an application-layer import.
- Tests: lightweight compile-time positive/negative contracts cover independent regions, distinct versions, readonly data, phase/hint vocabularies, change kinds, and deduction answer shapes. No artificial runtime domain tests. Existing Vitest smoke test remains unchanged and passed.
- Verification: npm ci, format:check, lint, typecheck (including isolated domain), test:run, aggregate check, production build, both dependency audits, and git diff --check executed. Quality/build checks passed; one existing runtime test passed. Production audit reports zero; full audit retains the same five accepted development-only braces-chain findings. No new dependencies; lockfile SHA256 unchanged.
- Regression: app startup/rendering passed; Tailwind active at 390/768/1280 widths without horizontal overflow; no captured browser warnings/errors. CI YAML still parses; hosted execution not claimed. Temporary server stopped.
- Workspace preservation: nested .kilo worktree was reached by the existing formatter; only line endings changed, and they were restored with its Git status clean. Formatting and lint now exclude .kilo to prevent recurrence. Product specs, AGENTS.md, ROADMAP.md, and unrelated user work preserved. No commit created.
- Deferred product decisions: Case 001 truth, scoring formulas/threshold values, deduction/final-decision retries, investigation progression, hint penalties, timing/background policy. Types do not choose these policies.
- Next: T04 READY after explicit authorization. M1 3/6; S1 3/3 DONE; overall 3/34.

---

## T04 — Implement Case Schema & Runtime Validation — Completion Record

- Status: DONE; M1/S2; completion recorded 2026-10-06. T05 not started.
- Direct dependency: exact Zod 4.6.5, MIT; registry metadata and official TypeScript/strict-mode compatibility reviewed. Existing NVM Node 22.18.0/npm 11.5.2 verified; no permanent PATH or environment change.
- Added four schema modules and five validation modules under src/cases. Domain contracts, tsconfig.domain.json, and ESLint boundaries remain unchanged. No application UI, loader, catalog, production case content, scoring engine, persistence, or Phaser.
- API: validateCaseDefinition(input: unknown) returns a discriminated result containing CaseDefinition or normalized category/code/path/message issues. Ordinary malformed content does not throw. Strict schemas reject unknown properties and unsupported variants; descriptor inspection rejects functions, accessors, non-JSON objects, nonfinite numbers, and cycles without executing content.
- Pipeline: declarative data, structure, supported schema version 1, namespace uniqueness and entity references, then semantic checks. caseVersion remains independent and positive. Choices are unique within their deduction; IDs need not be globally unique.
- Semantics: normalized rectangle/circle containment, no-op changes/self-exchanges/self-relationships, witness/statement ownership, distinct contradiction references, complete and matching canonical deduction answers, no self-supporting evidence, nonnegative score/penalty magnitudes, unique hint penalty levels and ordered star thresholds. No tuning constants, algorithms, unlock dependency model, or fairness judgment.
- Scope decision: the owner's T04 prompt explicitly includes cross-reference checks, superseding earlier README allocation to T05. T05 remains a separate unstarted task; its authorization should build on these checks rather than duplicate them.
- Model limitation preserved: T03 has asset IDs/text keys but no manifest or translation dictionary. Structure is validated; resource existence belongs to the future resource boundary. Authored support links do not establish phase availability or evidence-unlock dependencies. Human truth/fairness review remains required.
- Tests: 66 validation tests plus the existing T02 smoke test passed (67 total, two files). Synthetic fixture only; all finite change and evidence-source variants, structural/version/identity/reference/semantic failures, disappeared-object region, declarative safety, error paths, and nonmutation. Bidirectional compile-time schema/domain checks added; T03 contracts retained.
- Verification: npm ci, format:check, lint, typecheck, typecheck:domain, test:run, aggregate check, production build, both audits, and git diff --check executed. Final quality/build checks passed. Production audit zero; full audit exit 1 with the same five accepted high development-tooling braces-chain findings. ESLint 9 warning retained.
- Lockfile: npm initially pruned optional bindings; regenerated via npm in a clean temporary directory and verified Windows/Linux bindings. Final lockfile diff only declares direct Zod and removes its development-only flag; no version upgrades or manual lockfile edits.
- Regression: production startup and app rendering passed; Tailwind flex styles and responsive heading sizes active at 390/768/1280 widths, no horizontal overflow, no captured browser warnings/errors. CI YAML parses (nine steps); hosted CI not claimed. Temporary browser tab/server closed.
- Review: no domain or application changes, unrelated product documentation changes, generated files, secrets, or human work overwritten. No commit created. Existing development-tooling advisory remains documented.
- Next: T05 READY after explicit authorization; M1 4/6; S2 1/3 IN_PROGRESS; overall 4/34.

---

## T05 — Case Reference & Semantic Integrity — Completion Record

- Status: DONE; M1/S2; completion recorded 2026-10-06. T06 not started. Verified ROADMAP stable T05 definition (cross-reference validator), phase-4 validation acceptance, and TRACKER dependency T04; no material scope conflict.
- T04 inventory: structural/version validation, all modeled entity references, namespace uniqueness, witness/statement ownership, local canonical choice membership, answer completeness/kinds, geometry/numeric/scoring constraints, no-op changes, self-relationships and self-supporting evidence were already implemented. Retained rather than duplicated.
- New responsibilities: relationship_changed preserves its subject object; visual/evidence/testimony contradiction categories require compatible reference kinds according to CASE_AUTHORING_GUIDE section 14. Testimony-versus-testimony compares statements from different witnesses. Relation/target changes and reversed contradiction pair order remain allowed.
- Pipeline: one additional internal relationship integrity pass follows successful T04 checks inside validateCaseDefinition. One public trust API and unchanged normalized issue contract. Stable new semantic codes: relationship_subject_mismatch, contradiction_kind_mismatch, testimony_witness_mismatch. A local statement Map supports ownership checks; no global cache or exposed application indexes.
- Reasoning/canonical integrity: T04 reference checks remain authoritative; added regression coverage proves a canonical choice cannot come from a different deduction even if its ID exists there. Valid reasoning links, optional flavor, red herrings and descriptive support cycles remain accepted.
- Conservative limits: current contracts do not define scene ownership, unlock dependencies, phase availability or an acyclic dependency graph. No blanket cycle/orphan rule inferred. Timeline and object-relationship contradictions lack a precise reference-kind matrix; T04 existence/structure checks still apply. Asset/text resource resolution and human fairness remain outside this model. Clarify availability/dependency semantics before stronger reachability checks; no authoring/spec documents rewritten.
- Tests: 10 focused new tests in tests/unit/case-integrity.test.ts; all 77 tests passed across three files. Existing 66 T04 tests, synthetic fixture and type contracts unchanged. New tests assert stable codes/paths/order and input nonmutation.
- Verification: approved NVM Node 22.18.0/npm 11.5.2 confirmed; npm ci, format:check, lint, typecheck, typecheck:domain, test:run, aggregate check, production build, both audits and git diff --check executed. Final quality/build checks passed. Production audit zero; full audit exit 1 with the same five accepted high braces-chain development-tool findings; ESLint 9 warning retained.
- Regression/boundaries: app production startup/rendering passed; Tailwind active at 390/768/1280 widths, no horizontal overflow or captured browser warnings/errors. CI YAML parses (nine steps); six domain import probes rejected Zod, validation, React, Next, Phaser and Node. Hosted CI not claimed. Temporary browser tab/server closed.
- Diff: added relationships.ts and case-integrity.test.ts; modified pipeline entry, README and this tracker only. No dependency/package-lock, schema, domain, application, tooling, strategic roadmap, generated artifact or secret changes. No human work overwritten and no commit created.
- Next: T06 READY (T03 dependency DONE), awaiting explicit authorization. M1 5/6; S2 2/3 IN_PROGRESS; overall 5/34.

---

## T06 — Game Session State Machine Foundation — Completion Record

- Status: DONE; M1/S2; completion recorded 2026-10-06. Canonical ROADMAP scope and dependency T03 confirmed. T07 not started.
- Implementation: pure domain initialization, explicit adjacent transitions through all 13 existing phases, typed commands/results, immutable accepted updates and original-state rejected results. Reuses CaseSession without changing T03 contracts.
- Prerequisites: every command requires an explicit approved outcome from future orchestration; no investigation, evidence, testimony, deduction, or decision gate invented.
- Time/identity: supplied attempt ID and timestamps; observation/investigation/completion milestones recorded. Timestamp checks compare recorded milestones, not a full command history. No timer, random source, clock, storage, React, Next, Phaser, or Zod dependency in the core.
- Completion: results is terminal and marks the attempt completed independently of solving correctly; score and final decision remain untouched. Replay remains future work.
- Tests: nine new tests cover initialization, all 12 legal edges, illegal transitions, denied prerequisites, terminal behavior, determinism, immutability, timestamps and inconsistent completion bookkeeping. All 86 tests across four files passed.
- Boundaries: existing isolated domain compilation and import restrictions retained; lint rejects Date.now, Math.random and crypto.randomUUID. Nine negative boundary probes passed.
- Verification: npm ci, format:check, lint, typecheck, typecheck:domain, test:run, aggregate check, production build and git diff --check passed. Production browser smoke passed at 390/768/1280px with active Tailwind, no horizontal overflow, and no console warnings/errors. CI configuration parsed and retained.
- Audit: production zero vulnerabilities; full audit retains five accepted high development-tool findings in the existing Next ESLint → fast-glob → micromatch → braces chain. ESLint 9 support warning retained. No dependencies or lockfile changes; no forced audit fix.
- Files: added session-machine.ts and session-machine.test.ts; updated ESLint, README and TRACKER. No application UI changes, ROADMAP changes, or commit.
- Limitations: readonly types and nonmutating functions do not deep-freeze consumer state. Gameplay prerequisite policies and completion correctness remain for their approved later tasks.
- Progress: M1 DONE 6/6; S2 DONE 3/3; overall 6/34. M2/S3 READY. T07 READY because T03 and T06 are DONE; requires explicit authorization.

---

## T07 — Selection & Evidence Evaluation — Completion Record

- Status: DONE; M2/S3; 2026-10-06. Canonical evidence-domain task and T03/T06 dependencies confirmed; the owner approved the checkpoint's availability clarification. T08 not started.
- Added pure selection.ts and evidence.ts using existing CaseDefinition/CaseSession contracts. ObjectId selections require authored investigation regions and unique changes within the case scene pair. Exchanges match either participant; relationships match their subject. Ambiguity rejects without mutation regardless of array order or prior discoveries.
- Discovery records a SelectionRecord and unique ChangeId; reports available evidence without collecting it. Incorrect interactive selections record existing selection/incorrect history but never unlock evidence or change score. Duplicate discoveries preserve the original state.
- Availability uses the exact authored change source, not supportingInformation, visibility, UI or phase alone. Other source types return unsupported_source_semantics. One change can support multiple evidence IDs. Explicit collection appends only the requested ID; repeats are idempotent. Observation/terminal restrictions remain. No scoring, progression, deductions, timer, loader, UI or Case 001 work.
- Tests: 15 new focused tests; all 101 tests across five files passed. Coverage includes all nine change kinds, source identity, ambiguity/order, unsupported sources, multiple evidence items, phase/timestamp/identity checks, immutability, determinism and populated-session preservation through T06 transitions.
- Verification: npm ci, format:check, lint, typecheck, isolated typecheck:domain, test:run, aggregate check, production build and git diff --check passed. CI YAML parsed (nine steps). Production app/Tailwind baseline passed at 390/768/1280px without horizontal overflow or console warnings/errors.
- Security: production audit zero vulnerabilities; full audit retains the five accepted high development-only braces-chain findings. ESLint 9 warning retained. No dependencies or lockfile changes, forced fixes, generated artifacts or commit.
- Documentation: concise approved contract in GAME_SPEC and API/limits in README; decision D005 below. No strategic sequencing change or ROADMAP edit.
- Preserved decisions: non-change source triggers, investigation advancement, retry policy, scoring/hints, persistence/attempt counts, timing/background policy, Case 001 truth and replay remain later work. No new collection timestamp/event field introduced.
- Progress: M2 1/7 and S3 1/4 IN_PROGRESS; overall 7/34. T08 READY because T03/T07 are DONE, awaiting explicit authorization.

---

## T08 — Deduction Evaluation — Completion Record

- Status: DONE; M2/S3; 2026-10-06. Canonical deduction-domain task and T03/T07 dependencies confirmed. T09 not started.
- Added pure evaluateDeduction in deduction.ts using existing trusted CaseDefinition, CaseSession and DeductionAnswer contracts. Single-choice and multiple-choice submissions use the authored canonical solution only; multiple-choice answers compare exact sets independent of order.
- Approved policy: one valid submission per deduction/attempt. Correct and incorrect answers are recorded and locked. Repeated submissions preserve the first answer/state. Incorrect submissions do not end the case, reveal the answer, change score, collect evidence or advance phase.
- Typed failures: unknown deduction/choice, foreign choice, invalid kind/empty/duplicate selection, closed attempt and case identity/version mismatch. Invalid/repeated submissions preserve the original state. No evidence prerequisite inferred from supportingInformation; phase-entry/exit policy remains future orchestration. No timestamp added because the existing answer model records none.
- Tests: 11 focused new tests; all 112 tests across six files passed. Covers canonical correctness, scoped membership, locks after correct/incorrect answers, exact multiple-choice sets, input-array copying, immutability, deterministic results, closed attempts and preservation of unrelated state.
- Verification: npm ci, format:check, lint, typecheck including isolated typecheck:domain, test:run, aggregate check, production build and git diff --check passed. CI parsed (nine steps). App renders and Tailwind/responsive baseline passes at 390/768/1280px with no overflow or console warnings/errors.
- Audit: production zero vulnerabilities; full audit retains five accepted high development-only braces-chain findings. ESLint 9 warning retained. No new dependencies, lockfile changes, forced fixes, generated artifacts, secrets or commit.
- Files: new deduction.ts and deduction.test.ts; concise GAME_SPEC/README policy and this tracker updated. Existing uncommitted T07 work preserved; T06/T07 source, validation and old tests unchanged.
- Decisions: D006 records the owner-approved single-submission policy. Scoring, final-decision evaluation, progression, partial contradiction semantics, persistence and replay remain deferred. No ROADMAP sequencing change.
- Progress: M2 2/7, S3 2/4 IN_PROGRESS, overall 8/34. T09 READY because T03/T07/T08 are DONE; requires explicit authorization.

---

## T09 — Deterministic Scoring — Completion Record

- Status: DONE; M2/S3; 2026-10-07. Canonical scoring task and completed T03/T07/T08 dependencies confirmed. T10 not started.
- Added pure calculateCaseScore in score-calculation.ts, consuming trusted CaseDefinition and authoritative CaseSession. Authored ScoringConfiguration determines all active values; no incremental or stored-score authority.
- Approved eligibility: primary change means meaningful AND required; important evidence means primary category AND required. Unique discoveries/collections score once; available but uncollected evidence scores zero. Canonically correct first recorded deductions score once; incorrect/unanswered deductions earn zero. Each T07 incorrect attempt record contributes one penalty, including retries.
- Added rawTotal to ScoreResult; total floors at zero. Case identity/version mismatch and non-finite arithmetic return typed failures. Unknown award IDs are excluded. Final decision/time bonus/hint penalty remain zero; accuracy/rating remain null. No T06/T07/T08, schema, UI, progression, persistence, timer or Case 001 changes.
- Tests: 20 focused new tests; 132 tests across seven files passed. Eligibility matrices, unique IDs, canonical exact sets, first-answer authority, actual T07 outcomes/availability, penalties, combined breakdown, negative raw total, floor, authored tuning, immutability and repeatability covered.
- Verification: npm ci; aggregate check (format:check, lint, typecheck including isolated typecheck:domain, test:run); production build; final format/check and diff review passed. CI parsed successfully (nine steps). Production startup and responsive/Tailwind smoke passed at 390/768/1280px without horizontal overflow or console warnings/errors.
- Audit: production zero vulnerabilities; full audit exits 1 with five accepted high development-tooling findings: eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces (GHSA-vfj7-8cjw-p6xm). ESLint 9 deprecation warning retained. No dependency/lockfile changes or forced fixes.
- Files: new score-calculation.ts and score-calculation.test.ts; scoring.ts result shape, GAME_SPEC, README and TRACKER updated. No ROADMAP sequencing change or commit.
- Progress: M2 3/7, S3 3/4 IN_PROGRESS; overall 9/34. T10 READY because T03 is DONE; requires explicit authorization.

---

## T10 — Local Progress and Attempt Semantics — Completion Record

- Status: DONE; M2/S3; 2026-10-07. Canonical progress repository task and completed T03 dependency confirmed. T11 not started.
- Added CompletedAttempt creation restricted to canonical completed Results. Injected attempt identity and completion timestamp are preserved; final score delegates to T09. No solved inference: existing CaseProgress contains completion, not solved correctness; bestRating remains null.
- Pure aggregation derives attemptCount from distinct completed identities and bestScore from their highest final total. First saved identity wins even if retry payload differs. caseId + authored caseVersion isolate histories; interrupted/abandoned sessions restart with new injected IDs and do not count.
- Added replaceable ProgressRepository and storage-injected LocalProgressRepository. Namespaced per-case/version keys store schemaVersion-1 minimal completed summaries, never live gameplay. Reads validate, report recovery, salvage valid entries and preserve unsupported versions. Quota/access failures return typed codes; unrelated keys are untouched.
- Tests: 17 focused tests; all 149 tests across nine files passed. Terminal boundary, T09 delegation, first/distinct/duplicate attempts, higher/lower/equal scores, identity/version isolation, frozen inputs, injected timestamps, save/read recreation, malformed/partial data, unsupported formats and storage failures covered.
- Verification: npm ci, aggregate check including format:check/lint/project and isolated-domain typechecks/test:run, production build, CI parse (nine steps), final diff review and git diff --check passed. Production rendering and Tailwind/responsive smoke passed at 390/768/1280px without horizontal overflow or console warnings/errors.
- Audit: production zero vulnerabilities; full audit retains five accepted high development-only braces-chain findings and exit 1. ESLint 9 deprecation retained. npm ci exited 0 with an EPERM cleanup warning within node_modules; subsequent gates passed. No dependencies or lockfile changes.
- Limits: localStorage read/modify/write is synchronous within one call but not transactional between separate tabs. The minimal completed-attempt ledger grows with completed playthroughs; quota failure is explicit. Settings, live resume, cloud sync, authoritative solved evaluation, ratings and UI integration remain deferred.
- Files: progress.ts, progress-repository.ts, local-progress-repository.ts and two test files added; ARCHITECTURE/GAME_SPEC/README/TRACKER documented. T06–T09 implementations and previous tests unchanged; no ROADMAP sequencing change, generated tracked artifacts or commit.
- Progress: M2 4/7 IN_PROGRESS; S3 DONE 4/4; overall 10/34. S4/T11 READY because T01/T02 are DONE; explicit authorization required.

---

## T11 — Integrate Phaser Shell — Completion Record

- Status: DONE; M2/S4; 2026-10-07. Canonical shell scope confirmed; T12 not started.
- Baseline: approved Phaser 4.2.1 (MIT), superseding provisional Phaser 3.90.0 before completion. Phaser 3 removed; only one Phaser package installed. New direct runtime dependency is Phaser; EventEmitter3 5.0.4 is its required transitive dependency. No other direct dependency/version changes, npm manifest entry, native-binding declaration or global event bus.
- Architecture: React-owned host loads the runtime after mount. One mount-local Game/neutral Canvas Scene, temporary 960×540 logical rectangle, FIT scaling and centering. Readiness rerenders retain the runtime; ResizeObserver refreshes parent bounds without reconstruction. Cleanup disconnects the observer, invalidates delayed imports/callbacks, detaches the owned canvas and requests Phaser destruction with remount support retained.
- Phaser 4 compatibility: existing namespace import, Game constructor, Scene inheritance, Canvas renderer, scale and destruction APIs required no source adaptation. Strict TypeScript 5.9.3 and Next.js 16.3.8 production prerender passed; stable server placeholder has no browser-global access.
- Tests: eight new tests (six lifecycle/failure/cancellation tests and two server-safe host/route tests). All 157 tests across 11 files passed, including all 149 previous tests. No existing tests weakened or modified.
- npm blocker resolved: npm 11.5.2 initially pruned 27 existing optional lockfile entries; clean install exited 0 but Vitest could not start. Owner-authorized temporary npm 11.6.4 was used only for package-lock-only repair. It restored all entries without changing any existing locked version. Returned to NVM Node 22.18.0/npm 11.5.2; fresh npm ci left the lockfile hash unchanged and all tests executed. Windows/Linux Rolldown binding entries retained; no permanent PATH, Node or npm change.
- Verification: npm ci, format:check, lint, typecheck, typecheck:domain, test:run, aggregate check, production build and git diff --check passed. Unchanged CI YAML parsed with nine steps; hosted CI execution not claimed. Production audit zero vulnerabilities; full audit exit 1 retains five accepted high development-only braces → micromatch → fast-glob → Next ESLint plugin/config findings. ESLint 9 support warning retained.
- Browser automation: production /renderer initialized after loading placeholder with one canvas inside its host; 390×844, 768×1024, 1280×900 and 844×390 viewports preserved the full scene, uniform fit, centering and no horizontal overflow. Three navigation cycles gave zero canvases on home and one on remount. Development Strict Mode startup/unmount/remount gave one/zero/one canvas. No captured warning/error logs. Mobile screenshot visually inspected; home Tailwind/responsive checks passed at 390/768/1280. Temporary tabs/servers closed and viewport reset.
- Boundaries/regression: T06–T10 source, authored data, prior tests and CI unchanged. Domain remains framework/browser-free and passes isolated typechecking. No gameplay bridge, case loader, Case 001, production assets, gameplay input, timer, scoring, persistence, audio or backend added. Typed failures expose import/construction errors with a minimal user-facing failure caption.
- Documentation: ARCHITECTURE/README record Phaser 4, browser-only loading, lifecycle ownership, infrastructure sizing and unchanged T11/T12 boundary. ROADMAP sequencing unchanged. Final diff reviewed; no generated tracked output, unrelated changes or commit/PR.
- Limits: shell verification is not full gameplay E2E, accessibility certification or memory profiling. Native bindings are reproducible via npm ci; future npm 11.5.2 lockfile mutations should be checked for renewed pruning.
- Progress: M2 5/7 IN_PROGRESS; S4 1/3 IN_PROGRESS; overall 11/34. T12 READY because T06/T11 are DONE; explicit authorization still required.

---

## T12 — Typed React–Phaser Bridge — Completion Record

- Status: DONE; M2/S4; 2026-10-07. Canonical typed-bridge scope and completed T06/T11 dependencies confirmed; T13 not started.
- Added a framework-independent application bridge with readonly display projection and semantic object_selected intent. Projection includes attemptId, revision, displayPhase, sceneId, interactionEnabled and one optional neutral target. Explicit copies/freeze exclude hidden extra fields; no CaseDefinition/CaseSession, solution, scoring or progress data is sent to Phaser.
- Synchronization: nonnegative safe-integer revisions strictly increase per attempt; old/equal updates and stale attempt updates are rejected. Latest projection is retained during lazy loading and applied when the renderer attaches. A new authoritative attempt may begin at zero; no history/event sourcing/global bus.
- Dispatch: each intent carries ObjectId, attempt identity and displayed revision. The bridge reads current injected application state before delivery and returns typed stale/disposed/invalid/disabled/unknown-target rejections. Acceptance means delivery, not correctness. One synthetic integration test invokes unchanged T07 through an injected application handler; production gameplay wiring remains deferred.
- Host/adapter: mount-local bridge is disposed before runtime cleanup. React Effect Events read current props/callbacks; a separate projection effect updates existing rectangle/text objects. T11 browser-only loading, cancellation, resize and teardown retained. Minimal typed onRuntime lifecycle callback attaches the existing adapter. Pointer/touch emits intent only; no game rules or persistence inside Phaser.
- Preview: reducer-owned synthetic presentation state demonstrates updates, semantic selection feedback, interaction enablement and HTML keyboard selection. The reducer rechecks queued attempt/revision/target against current state. No Case 001, loader, authored assets, observation/investigation gameplay, time, score, evidence/deduction UI or persistence integration.
- Tests: nine new runtime tests plus compile-time readonly/solution/pointer-contract checks. All 166 tests across 12 files passed, including the prior 157 and all eight T11 tests. Tests cover ordering, frozen display-only copying, latest-state dispatch, attempt replacement, disposed/remounted connections, invalid revisions, disabled/unknown targets, lazy-load projection buffering and injected T07 dispatch. Existing tests unchanged.
- Verification: npm ci, format:check, lint, typecheck including typecheck:domain, test:run, aggregate check, build and git diff --check passed. Final clean install under NVM Node 22.18.0/npm 11.5.2 preserved the repaired lockfile hash; all 166 tests passed afterward. Phaser remains 4.2.1; no dependency/lockfile changes during T12. Unchanged CI YAML parsed (nine steps); hosted CI not run.
- Browser: production projection update visibly changed canvas text; canvas click delivered selection and returned highlight feedback. Disabled click did not change revision; HTML Enter selection worked. One canvas remained through updates; 390/768/1280 and landscape preserved fit/centering/containment without horizontal overflow. Three navigation cycles gave zero canvases after unmount and one after remount. Development Strict Mode update/selection/unmount/remount passed; no captured warn/error logs. Mobile screenshot inspected and saved. Home Tailwind/responsive checks passed; tabs/servers closed and viewport reset.
- Audit: production zero vulnerabilities (exit 0); full audit retains the same five accepted high development-only braces-chain findings (exit 1). ESLint 9 support warning retained. No secrets, arbitrary URLs, executable authored messages, unsafe HTML, global bus or duplicate authoritative session added.
- Regression/preservation: T06–T10 source, domain contracts, case validation/content, prior tests, CI, package.json/package-lock and ROADMAP sequencing unchanged by T12. Existing uncommitted T11 work preserved. No generated tracked output or commit/PR.
- Documentation: ARCHITECTURE and README describe projection direction, authority, revision policy, latest-state/queued-action dispatch, stale mount protection and the T12/T13 boundary.
- Limits: the contract deliberately renders one neutral target; production scenes/assets/regions and game-phase policy remain future tasks. Browser verification covers synthetic bridge behavior, not Case 001 gameplay or memory profiling. Application reducers must retain current-state validation when committing queued intents.
- Progress: M2 6/7 IN_PROGRESS; S4 2/3 IN_PROGRESS; overall 12/34. T13 READY because T04/T05 are DONE; explicit authorization required.

---

## T13 Completion Record

- Status: DONE; M2/S4; 2026-10-07. Canonical loader scope and T04/T05 dependencies confirmed.
- Added application CaseSource port, explicit bundled-source registry and loadCase trust boundary. Authored data remains unknown until the unchanged T04/T05 validator succeeds; source identity and asset declarations are checked before success.
- Failures are typed: unknown_case, source_unavailable, malformed_source, invalid_case, unsupported_schema, case_id_mismatch and missing_asset_declaration. Existing structured validation issues and authored schemaVersion/caseVersion are preserved.
- Registry entries are explicit, copied and read/validated on each load. No caller-derived path, URL, executable authored callback, cache or fallback. The production registry is empty until approved T15 JSON content; synthetic fixtures remain test-only.
- Asset coverage checks scene backgrounds and visual references against source-entry declaredAssetIds. Physical file existence, decoding and renderer resolution are deferred; no asset resolver or application case schema was added.
- Tests: 13 new unit tests and one integration test; all 180 tests across 14 files passed, including all prior 166. Integration proves approved source → parse → existing validation → trusted definition → initial application session.
- Verification: npm ci, format:check, lint, typecheck, typecheck:domain, test:run, aggregate check, build and git diff --check passed. Node 22.18.0/npm 11.5.2 reconfirmed; clean install preserved package-lock.json. No dependencies or CI changes; unchanged CI YAML parsed successfully, hosted CI not run.
- Production browser regression: bridge update/selection worked; one centered contained canvas and no horizontal overflow at 390×844, 768×1024 and 1280×900. Navigation removed the canvas; remount created one canvas. No browser warnings/errors. Temporary server/tab closed.
- Security: production audit zero vulnerabilities. Full audit retains five accepted high development-tool findings in braces → micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next. ESLint 9 support warning retained; no force fix, suppression or downgrade.
- M2 exit review: session/state, selection/evidence, deduction, scoring, local progress, Phaser shell, typed bridge and trusted loader foundations operate generically, without Case 001-specific hacks. Canonical reusable-engine exit gate satisfied; M2 DONE 7/7 and S4 DONE 3/3.
- Domain, T04/T05 validator, T06–T10 engine, T11/T12 renderer/bridge, package files and ROADMAP unchanged. ARCHITECTURE, README and TRACKER updated. No commit made; T14 not started.
- Progress: overall 13/34. T14 READY because its documentation baseline dependency is complete; explicit authorization required.

---

## T14 — Finalize Case 001 Authoring

- Status: DONE. Owner approved the complete final Stage C dossier through the T14 Controlled Closeout request on 2026-10-07.
- Canonical design: [Case 001 — The Missing Passport / The Wrong Table](docs/cases/CASE_001_THE_MISSING_PASSPORT.md). Preserves request, mapping, custody, three changes/evidence items, eight statements and classifications, contradiction, deduction/final choices, verbatim resolution, 25-second observation, fairness and 2,650 maximum.
- Content verification: all 23 canonical-content acceptance items passed. Exact-text audit verified all 19 request/statement/question/choice strings supplied in closeout and all six approved resolution paragraphs. Existing schema/domain inspection confirmed design representability; playable implementation is not claimed.
- Repository verification: `npm run check` passed formatting, lint, application and isolated-domain TypeScript checks, and 180 tests across 14 files; `npm run build` passed. Markdown is intentionally excluded by existing Prettier configuration; content and documentation diffs reviewed separately. `git diff --check` passed.
- Scope: canonical dossier plus minimal GAME_SPEC, CASE_AUTHORING_GUIDE, README and TRACKER edits only. ROADMAP sequencing unchanged. No source, schema, registry, production JSON, assets, text catalog, dependency, package, lockfile or CI changes. No commit or push.
- Deferred: wrong-final-decision policy, readiness gates, production encoding/registration, text and physical assets, multiobject rendering, mobile/keyboard/accessibility QA and human playtesting.
- Progress: 14/34 (approximately 41.2%); M3 IN_PROGRESS 1/7; S5 IN_PROGRESS 1/5. T15 READY by dependency, NOT STARTED and explicitly NOT AUTHORIZED; separate owner authorization required.

---

## T15 — Add Case 001 Structured Data

- Status: DONE under owner T15 Controlled Implementation Authorization; T14 remains DONE and its canonical dossier unchanged.
- Added declarative case.json and complete en.json in src/cases/content/case-001, plus two focused test files. Registered an explicit lazy JSON import with eight logical asset IDs in the existing bundled source; no artwork paths or resolver.
- Content: schemaVersion 1/caseVersion 1, two scenes, stable objects and stand identities, three meaningful required changes, three required primary change-sourced evidence items, four witnesses/eight exact classified statements, S-N2/E2 contradiction, ordered deduction/final choices, 15 events/reconstruction, exact six-paragraph resolution and existing 2,650 scoring ceiling.
- Encoding details: estimatedDurationSeconds 240, observationDurationSeconds 25, transitionDurationSeconds 2; visual sizes are provisional declarative layout values pending rendered QA. No hint, rating, final/time award or final-decision retry/reveal policy added.
- Verification: npm run check passed formatting, lint, application and isolated-domain TypeScript checks, and 196 tests across 16 files (16 new tests). npm run build passed. Canonical-text tests compare against the frozen dossier; trusted loader, absent-passport selection, both exchange participants, evidence unlocks/idempotency, first-answer policy, scoring and renderer truth isolation passed. Final diff, whitespace and scope inspection passed.
- Warnings: Git reports LF-to-CRLF conversion and inaccessible user-level ignore configuration; checks and file inventory completed. Vitest printed an informational transform-cache suggestion. No lint/build warnings or failures.
- Deferred: artwork/file resolution, runtime text presentation, full playability/readiness gates, accessibility/responsive QA, human playtesting and incorrect-final-decision behavior.
- Scope: only authorized content, registry, tests, README and TRACKER. Schemas/domain/loader contracts, React/Phaser, frozen dossier, dependencies, generic fixtures and CI unchanged. No commit or push; T16 not started.
- Progress: 15/34 (44.1%); M3 IN_PROGRESS 2/7; S5 IN_PROGRESS 2/5.

---

# 9. Task Detail Template

Use this template when a task becomes active.

```text
## TXX — Task Title

Status:
Priority:
Milestone:
Sprint:
Owner / Agent:
Dependencies:

Relevant Specs:
- ...

Scope:
- ...

Out of Scope:
- ...

Acceptance Criteria:
[ ] ...
[ ] ...

Verification:
[ ] lint
[ ] type-check
[ ] targeted tests
[ ] relevant full tests
[ ] production build
[ ] E2E/manual QA if applicable

Start Date:
Completion Date:
Commit / PR:

Blockers:
- None

Notes:
- ...
```

---

# 10. Quality Dashboard

| Check | Current State | Last Verified | Notes |
|---|---|---|---|
| Format | PASS | 2026-10-07 | T02 Prettier baseline |
| Lint | PASS | 2026-10-07 | Next.js lint plus test-import protection |
| Type-check | PASS | 2026-10-07 | Strict project + isolated domain + compile-time contracts |
| Unit tests | PASS | 2026-10-07 | 179 unit tests across 13 files; 180 total including one integration test |
| Integration tests | PASS | 2026-10-07 | One approved source → loader → validator → application session test |
| E2E | NOT_CONFIGURED | — | Planned before vertical-slice release |
| Production build | PASS | 2026-10-07 | T13 production build passed; renderer preview and shell retained |
| Case validation | PASS | 2026-10-07 | T04 pipeline plus T05 relationship integrity |
| Responsive QA | NOT_STARTED | — | T29 |
| Accessibility QA | NOT_STARTED | — | T29 |
| Human playtest | NOT_STARTED | — | T33 |

---

# 11. Blocker Log

No active blockers. The T01 transitive-Zod scope conflict was resolved by explicit owner approval. The braces advisory and ESLint 9 support warning remain accepted development-tooling risks, documented in the T01 completion record.

T11's optional-native-binding blocker was resolved with owner-authorized temporary npm 11.6.4 lockfile repair. Final npm 11.5.2 clean installation reproduced the repaired graph without changing the lockfile; all 157 tests passed. Future lockfile updates under npm 11.5.2 require checking optional-binding retention.

When a blocker occurs, record:

| ID | Task | Blocker | Owner | Opened | Resolution | Status |
|---|---|---|---|---|---|---|

Do not hide blockers by changing task scope without approval.

---

# 12. Decision Log

Track execution decisions that affect tasks but do not yet justify a separate ADR.

| ID | Decision | Related Task | Status | Date | Notes |
|---|---|---|---|---|---|
| D001 | Architecture plan must be approved before T01 | M0/T01 | APPROVED | October 2026 | No coding before planning gate |
| D002 | Allow transitive development-only Zod | T01 | APPROVED | 2026-10-05 | No direct application dependency, imports, runtime validation, or T04 work |
| D003 | Retain lint baseline with known development-only braces advisory and ESLint 9 warning | T01 | APPROVED | 2026-10-05 | Production audit clean; no audit suppression, forced overrides, forks, downgrades, or weakened linting |
| D004 | Direct Zod 4 and entity cross-reference validation authorized in T04 | T04 | APPROVED | 2026-10-06 | Zod outside domain; preserve T03 model; T05 remains unstarted |
| D005 | Approve source-triggered evidence, separate discovery/collection, idempotency and ambiguity rejection | T07 | APPROVED | 2026-10-06 | Exact discovered ChangeId unlocks change evidence; supportingInformation is not an unlock rule; other triggers remain unsupported |
| D006 | Approve one valid deduction submission per attempt, including incorrect answers | T08 | APPROVED | 2026-10-06 | Canonical solution determines correctness; first answer locks; no retry, scoring or progression; replay later |
| D007 | Approve derived scoring and existing-field eligibility | T09 | APPROVED | 2026-10-07 | Primary change = meaningful AND required; important evidence = primary AND required; authored values, unique awards, first-answer truth, incorrect-attempt penalties, rawTotal/zero floor; final/time/hint/accuracy/rating deferred |
| D008 | Approve local completed-attempt progress semantics | T10 | APPROVED | 2026-10-07 | Unique injected attempt identity; completed Results only; first save wins; T09 best score; caseVersion isolation; completion is not solved; interrupted sessions restart; local-only versioned persistence |
| D009 | Approve Phaser 4.2.1 renderer baseline and narrow temporary npm lockfile repair | T11 | APPROVED | 2026-10-07 | Supersedes provisional Phaser 3.90.0 before completion; temporary npm 11.6.4 repairs lockfile only; final environment remains Node 22.18.0/npm 11.5.2; T12 remains unauthorized |

Major architectural decisions should still be reflected in `ARCHITECTURE.md` and, where useful later, ADRs.

---

# 13. Vertical Slice Release Readiness

```text
[ ] Case 001 works end-to-end
[ ] Automated checks pass
[ ] Production build passes
[ ] Responsive QA passes
[ ] Accessibility baseline reviewed
[ ] Mystery logic approved
[ ] Resolution judged fair
[ ] Replay reliable
[ ] No critical resource leaks
[ ] E2E critical paths pass
[ ] Production-readiness audit passes
[ ] Human playtesting completed
[ ] Major confusion addressed
[ ] No unresolved Critical/High blocker
[ ] Players demonstrate interest in another case
```

---

# 14. Future Tracker UI

The future UI should not parse this file directly.

Recommended evolution:

```text
ROADMAP.md
    ↓
TRACKER.md
    ↓
machine-readable tracker model
    ↓
Tracker service/repository
    ↓
Internal Project Tracker UI
```

Potential dashboard cards:

- Stage completion
- Milestone completion
- Current sprint
- Tasks ready
- Tasks blocked
- Verification health
- Open blockers
- Vertical-slice readiness

Potential screens:

- Dashboard
- Sprint Board
- Roadmap
- Task Detail
- Quality
- Blockers
- Decisions
- Release Readiness

This tracker is for project monitoring/admin purposes and should remain separate from player-facing game functionality.

---

# 15. Future Structured Data Contract

When explicitly approved, create a machine-readable representation using stable IDs.

Minimum conceptual task fields:

```text
id
title
stage
milestone
sprint
status
priority
dependencies
owner
specs
acceptanceCriteria
verification
startedAt
completedAt
commit
blockers
notes
```

Do not build this system merely because the schema is described here.

---

# 16. Update Procedure

At the end of every implementation task:

1. Confirm acceptance criteria.
2. Record verification.
3. Record blockers or limitations.
4. Add commit/PR reference when available.
5. Set status to `DONE` only if completion rules are satisfied.
6. Recalculate milestone/task completion count.
7. Mark dependency-satisfied next task `READY`.
8. Keep `ROADMAP.md` synchronized if scope or sequencing changed.

---

# 17. Current Next Action

```text
CURRENT:
M1 DONE (6/6); S1/S2/S3/S4 DONE; T01–T15 DONE; M2 DONE (7/7)
M3 IN_PROGRESS (2/7); S5 IN_PROGRESS (2/5); overall 15/34

NEXT AFTER EXPLICIT AUTHORIZATION:
T16 — Build Briefing (NOT_STARTED — NOT AUTHORIZED)
```

T15 approved structured content is verified. Do not start T16 without separate owner authorization.

---

# 18. Tracker Status

**Tracker Version:** 1.0  
**Stage:** Stage 1 — Vertical Slice  
**Milestone:** M3 — Case 001 Content & Core Loop (IN_PROGRESS, 2/7)

**Sprint:** S5 — Case 001 Definition & Observation (IN_PROGRESS, 2/5)

**T01–T34 Complete:** 15 / 34 (approximately 44.1%)

**Next Implementation Task:** T16 after explicit authorization
