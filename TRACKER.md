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
| Current Milestone | M0 — Planning & Approval |
| Current Sprint | S0 — Architecture Planning |
| Implementation Status | Not started |
| Current Engineering Task | Architecture planning — no coding |
| Next Implementation Task | T01 — Scaffold application |
| Vertical Slice | Case 001 — The Missing Passport |
| Documentation | Complete |
| Overall T01–T34 Completion | 0 / 34 |
| Blockers | None recorded |
| Last Tracker Update | October 2026 |

**Important:** T01 is not `READY` until the architecture-planning gate is approved.

---

# 5. Milestone Dashboard

| ID | Milestone | Sprint(s) | Tasks | Status | Completion | Exit Gate |
|---|---|---|---|---|---:|---|
| M0 | Planning & Approval | S0 | Planning gate | IN_PROGRESS | — | Architecture plan approved |
| M1 | Foundation | S1–S2 | T01–T06 | NOT_STARTED | 0/6 | Build + domain + validation + state model healthy |
| M2 | Core Game Engine | S3–S4 | T07–T13 | NOT_STARTED | 0/7 | Reusable engine foundations operational |
| M3 | Case 001 Content & Core Loop | S5–S6 | T14–T20 | NOT_STARTED | 0/7 | Briefing → observation → investigation works |
| M4 | Detective Reasoning Loop | S6–S7 | T21–T26 | NOT_STARTED | 0/6 | Mystery reasoning loop complete |
| M5 | Product Shell & Replay | S8 | T27–T30 | NOT_STARTED | 0/4 | Coherent player-facing vertical slice |
| M6 | Quality & Validation | S9–S10 | T31–T34 | NOT_STARTED | 0/4 | Vertical Slice Exit Gate satisfied |

---

# 6. Sprint Dashboard

| Sprint | Milestone | Tasks | Status | Primary Outcome |
|---|---|---|---|---|
| S0 | M0 | Architecture planning | IN_PROGRESS | Approved implementation plan |
| S1 | M1 | T01–T03 | NOT_STARTED | Scaffold + quality baseline + domain vocabulary |
| S2 | M1 | T04–T06 | NOT_STARTED | Case validation + state machine |
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
| T01 | Scaffold application | M1 | S1 | NOT_STARTED | HIGH | M0 |
| T02 | Configure quality tooling | M1 | S1 | NOT_STARTED | HIGH | T01 |
| T03 | Define domain types | M1 | S1 | NOT_STARTED | HIGH | T01–T02 |
| T04 | Implement case schema | M1 | S2 | NOT_STARTED | HIGH | T03 |
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

**Status:** `IN_PROGRESS`  
**Owner:** Project Owner + Codex  
**Coding Allowed:** No

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
[ ] All project documents reviewed
[ ] No code changed
[ ] No dependencies installed
[ ] No scaffold created
[ ] Architecture conflicts identified
[ ] Open decisions explicitly listed
[ ] Task sequence reviewed against ROADMAP.md
[ ] Project owner approves the plan
```

### Verification

Human review only.

### Completion Record

- Start Date: —
- Completion Date: —
- Commit / PR: N/A
- Blockers: None
- Notes: T01 becomes READY only after approval.

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
| Format | NOT_CONFIGURED | — | Begins with scaffold/tooling |
| Lint | NOT_CONFIGURED | — | Begins with scaffold/tooling |
| Type-check | NOT_CONFIGURED | — | Begins with scaffold/tooling |
| Unit tests | NOT_CONFIGURED | — | Begins with scaffold/tooling |
| Integration tests | NOT_CONFIGURED | — | Begins with scaffold/tooling |
| E2E | NOT_CONFIGURED | — | Planned before vertical-slice release |
| Production build | NOT_CONFIGURED | — | Begins with scaffold |
| Case validation | NOT_IMPLEMENTED | — | T04–T05 |
| Responsive QA | NOT_STARTED | — | T29 |
| Accessibility QA | NOT_STARTED | — | T29 |
| Human playtest | NOT_STARTED | — | T33 |

---

# 11. Blocker Log

No blockers recorded.

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
M0 / S0 — Architecture Planning

NEXT AFTER APPROVAL:
T01 — Scaffold Application
```

No coding should begin before M0 approval.

---

# 18. Tracker Status

**Tracker Version:** 1.0  
**Stage:** Stage 1 — Vertical Slice  
**Milestone:** M0 — Planning & Approval  
**Sprint:** S0 — Architecture Planning  
**T01–T34 Complete:** 0 / 34  
**Next Implementation Task:** T01 after M0 approval
