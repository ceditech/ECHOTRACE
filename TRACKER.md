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
| Current Milestone | M1 — Foundation |
| Current Sprint | S2 — Case validation & state machine (READY) |
| Implementation Status | T01–T03 complete; S1 complete |
| Current Engineering Task | T04 — Implement case schema (READY) |
| Next Implementation Task | T04 after explicit authorization |
| Vertical Slice | Case 001 — The Missing Passport |
| Documentation | Complete |
| Overall T01–T34 Completion | 3 / 34 |
| Blockers | None; accepted development-tooling risks recorded below |
| Last Tracker Update | 2026-10-06 |

**Important:** T01–T03 are DONE. T04 is READY but has not started.

---

# 5. Milestone Dashboard

| ID | Milestone | Sprint(s) | Tasks | Status | Completion | Exit Gate |
|---|---|---|---|---|---:|---|
| M0 | Planning & Approval | S0 | Planning gate | DONE | — | Architecture plan approved |
| M1 | Foundation | S1–S2 | T01–T06 | IN_PROGRESS | 3/6 | Build + domain + validation + state model healthy |
| M2 | Core Game Engine | S3–S4 | T07–T13 | NOT_STARTED | 0/7 | Reusable engine foundations operational |
| M3 | Case 001 Content & Core Loop | S5–S6 | T14–T20 | NOT_STARTED | 0/7 | Briefing → observation → investigation works |
| M4 | Detective Reasoning Loop | S6–S7 | T21–T26 | NOT_STARTED | 0/6 | Mystery reasoning loop complete |
| M5 | Product Shell & Replay | S8 | T27–T30 | NOT_STARTED | 0/4 | Coherent player-facing vertical slice |
| M6 | Quality & Validation | S9–S10 | T31–T34 | NOT_STARTED | 0/4 | Vertical Slice Exit Gate satisfied |

---

# 6. Sprint Dashboard

| Sprint | Milestone | Tasks | Status | Primary Outcome |
|---|---|---|---|---|
| S0 | M0 | Architecture planning | DONE | Approved implementation plan |
| S1 | M1 | T01–T03 | DONE | 3/3 complete; scaffold, quality baseline, and domain contracts verified |
| S2 | M1 | T04–T06 | READY | Case validation + state machine; T04 awaits authorization |
| S3 | M2 | T07–T10 | NOT_STARTED | Evidence + deduction + scoring + persistence |
| S4 | M2 | T11–T13 | NOT_STARTED | Phaser integration + case loader |
| S5 | M3 | T14–T18 | NOT_STARTED | Case 001 definition + observation |
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
| T04 | Implement case schema | M1 | S2 | READY | HIGH | T03 |
| T05 | Implement cross-reference validator | M1 | S2 | NOT_STARTED | HIGH | T04 |
| T06 | Implement game state machine | M1 | S2 | NOT_STARTED | HIGH | T03 |
| T07 | Implement evidence domain | M2 | S3 | NOT_STARTED | HIGH | T03,T06 |
| T08 | Implement deduction domain | M2 | S3 | NOT_STARTED | HIGH | T03,T07 |
| T09 | Implement scoring engine | M2 | S3 | NOT_STARTED | HIGH | T03,T07,T08 |
| T10 | Implement progress repository | M2 | S3 | NOT_STARTED | HIGH | T03 |
| T11 | Integrate Phaser shell | M2 | S4 | NOT_STARTED | HIGH | T01–T02 |
| T12 | Implement typed React–Phaser bridge | M2 | S4 | NOT_STARTED | HIGH | T06,T11 |
| T13 | Implement case loader | M2 | S4 | NOT_STARTED | HIGH | T04,T05 |
| T14 | Finalize Case 001 authoring | M3 | S5 | NOT_STARTED | CRITICAL | Documentation baseline |
| T15 | Add Case 001 structured data | M3 | S5 | NOT_STARTED | HIGH | T13,T14 |
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
| Format | PASS | 2026-10-06 | T02 Prettier baseline |
| Lint | PASS | 2026-10-06 | Next.js lint plus test-import protection |
| Type-check | PASS | 2026-10-06 | Strict project + isolated domain + compile-time contracts |
| Unit tests | PASS | 2026-10-06 | Vitest: one smoke test |
| Integration tests | CONFIGURED | — | Runner supports tests/integration; no integration suite yet |
| E2E | NOT_CONFIGURED | — | Planned before vertical-slice release |
| Production build | PASS | 2026-10-06 | T02 build passed; T01 shell retained |
| Case validation | NOT_IMPLEMENTED | — | T04–T05 |
| Responsive QA | NOT_STARTED | — | T29 |
| Accessibility QA | NOT_STARTED | — | T29 |
| Human playtest | NOT_STARTED | — | T33 |

---

# 11. Blocker Log

No active blockers. The T01 transitive-Zod scope conflict was resolved by explicit owner approval. The braces advisory and ESLint 9 support warning remain accepted development-tooling risks, documented in the T01 completion record.

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
M1 IN_PROGRESS; S1 DONE; T01–T03 DONE; S2 READY

NEXT AFTER EXPLICIT AUTHORIZATION:
T04 — Implement Case Schema (READY)
```

T03 domain contracts are verified. Do not start T04 automatically.

---

# 18. Tracker Status

**Tracker Version:** 1.0  
**Stage:** Stage 1 — Vertical Slice  
**Milestone:** M1 — Foundation

**Sprint:** S2 — Case validation & state machine (READY)

**T01–T34 Complete:** 3 / 34

**Next Implementation Task:** T04 after explicit authorization
