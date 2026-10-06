import { describe, expect, it } from "vitest";
import type { CaseDefinition } from "@/game/domain/case";
import type { DeductionAnswer } from "@/game/domain/reasoning";
import { evaluateDeduction } from "@/game/domain/deduction";
import { createInitialSession } from "@/game/domain/session-machine";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import { createSyntheticCase } from "../fixtures/synthetic-case";

function fixture(): CaseDefinition {
  const input = createSyntheticCase();
  const question = input.deductions[0];
  if (!question) throw new Error("Missing synthetic question");
  const choice = (id: string) => ({
    id,
    text: { key: "fixture.choice" },
    supportingInformation: [],
  });
  const result = validateCaseDefinition({
    ...input,
    deductions: [
      { ...question, choices: [choice("right"), choice("wrong")] },
      {
        ...question,
        id: "other-question",
        kind: "multiple_choice",
        choices: [choice("a"), choice("b"), choice("c")],
      },
    ],
    solution: {
      ...input.solution,
      deductionAnswers: [
        { kind: "single_choice", deductionId: question.id, choiceId: "right" },
        {
          kind: "multiple_choice",
          deductionId: "other-question",
          choiceIds: ["a", "b"],
        },
      ],
    },
  });
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.value;
}
function initial(data: CaseDefinition) {
  return createInitialSession(data, {
    attemptId: "fixture-attempt",
    startedAt: 100,
  });
}
const right = {
  kind: "single_choice",
  deductionId: "fixture-deduction",
  choiceId: "right",
} as const;
const wrong = { ...right, choiceId: "wrong" };

describe("T08 deduction evaluation", () => {
  it.each([
    [right, "CORRECT"],
    [wrong, "INCORRECT"],
  ] as const)("records a valid answer with outcome %s", (answer, outcome) => {
    const data = fixture();
    const state = initial(data);
    const result = evaluateDeduction(data, state, answer);
    expect(result.outcome).toBe(outcome);
    expect(result.state.deductionAnswers).toEqual([answer]);
    expect(result.state).not.toBe(state);
    expect(result.state.currentPhase).toBe(state.currentPhase);
    expect(result.state.completionStatus).toBe("in_progress");
    expect(result.state.score).toBeNull();
  });
  it("uses canonical truth rather than wording, evidence, or choice order", () => {
    const data = fixture();
    const changed: CaseDefinition = {
      ...data,
      solution: {
        ...data.solution,
        deductionAnswers: [
          { ...right, choiceId: "wrong" },
          ...data.solution.deductionAnswers.slice(1),
        ],
      },
    };
    expect(evaluateDeduction(changed, initial(changed), right).outcome).toBe(
      "INCORRECT",
    );
    expect(evaluateDeduction(changed, initial(changed), wrong).outcome).toBe(
      "CORRECT",
    );
    expect(initial(changed).evidenceCollected).toEqual([]);
  });
  it("rejects unknown questions, unknown choices and choices owned by another question", () => {
    const data = fixture();
    const state = initial(data);
    for (const [answer, outcome] of [
      [{ ...right, deductionId: "unknown" }, "UNKNOWN_DEDUCTION"],
      [{ ...right, choiceId: "unknown" }, "UNKNOWN_CHOICE"],
      [{ ...right, choiceId: "a" }, "UNKNOWN_CHOICE"],
    ] as const) {
      const result = evaluateDeduction(data, state, answer);
      expect(result.outcome).toBe(outcome);
      expect(result.state).toBe(state);
    }
  });
  it.each([right, wrong])(
    "locks the first answer regardless of correctness",
    (first) => {
      const data = fixture();
      const state = evaluateDeduction(data, initial(data), first).state;
      for (const next of [right, wrong, { ...right, choiceId: "unknown" }]) {
        const result = evaluateDeduction(data, state, next);
        expect(result.outcome).toBe("ALREADY_ANSWERED");
        expect(result.state).toBe(state);
        expect(result.state.deductionAnswers).toEqual([first]);
      }
    },
  );
  it("compares multiple-choice sets exactly without order sensitivity", () => {
    const data = fixture();
    const state = initial(data);
    for (const [choiceIds, outcome] of [
      [["b", "a"], "CORRECT"],
      [["a"], "INCORRECT"],
      [["a", "b", "c"], "INCORRECT"],
    ] as const) {
      const result = evaluateDeduction(data, state, {
        kind: "multiple_choice",
        deductionId: "other-question",
        choiceIds,
      });
      expect(result.outcome).toBe(outcome);
      expect(result.state.deductionAnswers).toHaveLength(1);
    }
  });
  it("rejects mismatched answer kinds, empty sets and duplicate choices without locking", () => {
    const data = fixture();
    const state = initial(data);
    const invalid: readonly DeductionAnswer[] = [
      {
        kind: "multiple_choice",
        deductionId: right.deductionId,
        choiceIds: ["right"],
      },
      { kind: "single_choice", deductionId: "other-question", choiceId: "a" },
      { kind: "multiple_choice", deductionId: "other-question", choiceIds: [] },
      {
        kind: "multiple_choice",
        deductionId: "other-question",
        choiceIds: ["a", "a"],
      },
    ];
    for (const answer of invalid) {
      const result = evaluateDeduction(data, state, answer);
      expect(result.outcome).toBe("INVALID_ANSWER");
      expect(result.state).toBe(state);
    }
    expect(evaluateDeduction(data, state, right).outcome).toBe("CORRECT");
  });
  it("keeps answers scoped to their questions and copies caller-owned choice arrays", () => {
    const data = fixture();
    const first = evaluateDeduction(data, initial(data), wrong).state;
    const choiceIds = ["a", "b"];
    const result = evaluateDeduction(data, first, {
      kind: "multiple_choice",
      deductionId: "other-question",
      choiceIds,
    });
    expect(result.outcome).toBe("CORRECT");
    choiceIds.push("c");
    expect(result.state.deductionAnswers).toEqual([
      wrong,
      {
        kind: "multiple_choice",
        deductionId: "other-question",
        choiceIds: ["a", "b"],
      },
    ]);
    expect(first.deductionAnswers).toEqual([wrong]);
  });
  it("preserves populated unrelated fields, previous session and canonical data", () => {
    const data = fixture();
    const state = {
      ...initial(data),
      correctDiscoveries: ["fixture-change"],
      evidenceCollected: ["fixture-evidence"],
      hintsUsed: ["fixture-hint"],
      finalDecision: "fixture-decision",
    };
    const before = JSON.stringify(state);
    const authored = JSON.stringify(data);
    Object.freeze(state);
    Object.freeze(state.deductionAnswers);
    const result = evaluateDeduction(data, state, wrong);
    const { deductionAnswers, ...rest } = result.state;
    const { deductionAnswers: previousAnswers, ...previousRest } = state;
    expect(rest).toEqual(previousRest);
    expect(deductionAnswers).toEqual([wrong]);
    expect(previousAnswers).toEqual([]);
    expect(JSON.stringify(state)).toBe(before);
    expect(JSON.stringify(data)).toBe(authored);
    expect(evaluateDeduction(data, state, wrong)).toEqual(result);
  });
  it("rejects case identity/version mismatch and closed attempts without inventing evidence gates", () => {
    const data = fixture();
    const state = initial(data);
    for (const mismatch of [
      { ...state, caseId: "other" },
      { ...state, caseVersion: 99 },
    ]) {
      expect(evaluateDeduction(data, mismatch, right)).toEqual({
        outcome: "SESSION_CASE_MISMATCH",
        state: mismatch,
      });
    }
    const closed = {
      ...state,
      currentPhase: "results",
      completionStatus: "completed",
      completedAt: 200,
    } as const;
    expect(evaluateDeduction(data, closed, right)).toEqual({
      outcome: "NOT_AVAILABLE",
      state: closed,
    });
    expect(evaluateDeduction(data, state, right).outcome).toBe("CORRECT");
  });
});
