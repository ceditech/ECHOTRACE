import { describe, expect, it } from "vitest";
import {
  aggregateCaseProgress,
  appendCompletedAttempt,
  createCompletedAttempt,
} from "@/game/domain/progress";
import type { CompletedAttempt } from "@/game/domain/progress";
import {
  applySessionCommand,
  createInitialSession,
  getNextPhase,
} from "@/game/domain/session-machine";
import { calculateCaseScore } from "@/game/domain/score-calculation";
import { createSyntheticCase } from "../fixtures/synthetic-case";

const attempt: CompletedAttempt = {
  caseId: "fixture-case",
  caseVersion: 7,
  attemptId: "A",
  completedAt: 200,
  score: 1000,
};
describe("T10 completed attempt aggregation", () => {
  it("accepts only terminal completed sessions and delegates scoring to T09", () => {
    const data = createSyntheticCase();
    let state = createInitialSession(data, { attemptId: "A", startedAt: 100 });
    expect(createCompletedAttempt(data, state)).toEqual({
      ok: false,
      code: "ATTEMPT_NOT_COMPLETED",
    });
    while (state.currentPhase !== "results") {
      const to = getNextPhase(state.currentPhase);
      if (!to) throw new Error("Missing next phase");
      const result = applySessionCommand(
        state,
        { type: "advance_phase", from: state.currentPhase, to, at: 200 },
        { ok: true },
      );
      if (!result.ok) throw new Error(result.code);
      state = result.state;
    }
    const scored = calculateCaseScore(data, state);
    if (!scored.ok) throw new Error(scored.code);
    const completed = createCompletedAttempt(data, {
      ...state,
      finalDecision: "fixture-decision",
    });
    expect(completed).toEqual({
      ok: true,
      value: { ...attempt, score: scored.value.total },
    });
    expect(state.score).toBeNull();
    expect(createCompletedAttempt(data, { ...state, caseVersion: 8 })).toEqual({
      ok: false,
      code: "SESSION_CASE_MISMATCH",
    });
    expect(
      createCompletedAttempt(data, { ...state, completedAt: null }),
    ).toEqual({ ok: false, code: "INVALID_COMPLETION" });
    expect(
      createCompletedAttempt(data, {
        ...state,
        completionStatus: "in_progress",
      }),
    ).toEqual({ ok: false, code: "ATTEMPT_NOT_COMPLETED" });
  });
  it("creates the first aggregate without inferring solved status or ratings", () => {
    expect(aggregateCaseProgress(attempt.caseId, 7, [])).toBeNull();
    expect(aggregateCaseProgress(attempt.caseId, 7, [attempt])).toEqual({
      caseId: attempt.caseId,
      caseVersion: 7,
      completed: true,
      attemptCount: 1,
      bestScore: 1000,
      bestRating: null,
    });
  });
  it.each([
    [1500, 1500],
    [500, 1000],
    [1000, 1000],
  ] as const)("aggregates a distinct later score %s", (score, bestScore) => {
    const ledger = appendCompletedAttempt([attempt], {
      ...attempt,
      attemptId: "B",
      score,
      completedAt: 300,
    });
    expect(aggregateCaseProgress(attempt.caseId, 7, ledger)).toMatchObject({
      attemptCount: 2,
      bestScore,
    });
  });
  it("keeps first persisted identity authoritative and leaves frozen inputs unchanged", () => {
    Object.freeze(attempt);
    const ledger = Object.freeze([attempt]);
    expect(
      appendCompletedAttempt(ledger, {
        ...attempt,
        score: 9999,
        completedAt: 9999,
      }),
    ).toBe(ledger);
    expect(
      aggregateCaseProgress(attempt.caseId, 7, [
        ...ledger,
        { ...attempt, score: 9999 },
      ]),
    ).toMatchObject({ attemptCount: 1, bestScore: 1000 });
    const next = appendCompletedAttempt(ledger, { ...attempt, attemptId: "B" });
    expect(next).toHaveLength(2);
    expect(ledger).toEqual([attempt]);
    expect(aggregateCaseProgress(attempt.caseId, 7, next)).toEqual(
      aggregateCaseProgress(attempt.caseId, 7, next),
    );
  });
  it("isolates authored versions and case IDs while preserving injected completion times", () => {
    const ledger = [
      attempt,
      { ...attempt, caseVersion: 8, score: 9999 },
      { ...attempt, caseId: "other", score: 8888 },
    ];
    expect(aggregateCaseProgress(attempt.caseId, 7, ledger)).toMatchObject({
      attemptCount: 1,
      bestScore: 1000,
    });
    expect(aggregateCaseProgress(attempt.caseId, 8, ledger)?.bestScore).toBe(
      9999,
    );
    expect(aggregateCaseProgress("other", 7, ledger)?.bestScore).toBe(8888);
    expect(appendCompletedAttempt([], attempt)[0]?.completedAt).toBe(200);
  });
});
