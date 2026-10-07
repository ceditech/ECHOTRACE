import { describe, expect, it } from "vitest";
import type { CaseDefinition } from "@/game/domain/case";
import type { CaseSession } from "@/game/domain/session";
import { calculateCaseScore } from "@/game/domain/score-calculation";
import { evaluateSelection } from "@/game/domain/selection";
import { evaluateEvidenceAvailability } from "@/game/domain/evidence";
import { createInitialSession } from "@/game/domain/session-machine";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import { createSyntheticCase } from "../fixtures/synthetic-case";

function fixture(): CaseDefinition {
  const input = createSyntheticCase();
  const result = validateCaseDefinition({
    ...input,
    scoring: {
      ...input.scoring,
      baseCompletionScore: 1000,
      correctChangeScore: 200,
      importantEvidenceScore: 250,
      deductionScore: 300,
      finalDecisionScore: 500,
      incorrectSelectionPenalty: 100,
      timeBonusMaximum: 500,
    },
  });
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.value;
}
function initial(data: CaseDefinition): CaseSession {
  return createInitialSession(data, {
    attemptId: "score-attempt",
    startedAt: 100,
  });
}
function score(data: CaseDefinition, state: CaseSession) {
  const result = calculateCaseScore(data, state);
  if (!result.ok) throw new Error(result.code);
  return result.value;
}
function freeze(value: unknown): void {
  if (value && typeof value === "object") {
    Object.freeze(value);
    for (const child of Object.values(value)) freeze(child);
  }
}

describe("T09 deterministic scoring", () => {
  it("consumes T07 discovery and incorrect outcomes without penalizing rejected or repeated discoveries", () => {
    const data = fixture();
    const investigation = data.scenes.find(
      (scene) => scene.id === data.investigationSceneId,
    );
    const region = investigation?.interactionRegions[0];
    if (!region) throw new Error("Missing interaction region");
    const input: CaseDefinition = {
      ...data,
      objects: [
        ...data.objects,
        { id: "unchanged", description: { key: "fixture.object" } },
        { id: "noninteractive", description: { key: "fixture.object" } },
      ],
      scenes: data.scenes.map((scene) =>
        scene.id === data.investigationSceneId
          ? {
              ...scene,
              interactionRegions: [
                ...scene.interactionRegions,
                { ...region, objectId: "unchanged" },
              ],
            }
          : scene,
      ),
    };
    let state: CaseSession = {
      ...initial(input),
      currentPhase: "investigation_active",
      investigationStartedAt: 100,
    };
    const correct = evaluateSelection(input, state, {
      objectId: "fixture-object",
      selectedAt: 200,
    });
    expect(correct.outcome).toBe("CORRECT_CHANGE");
    state = correct.state;
    expect(
      evaluateEvidenceAvailability(input, state, "fixture-evidence").status,
    ).toBe("available");
    expect(score(input, state).breakdown.evidence).toBe(0);
    for (const objectId of ["fixture-object", "noninteractive", "unknown"]) {
      state = evaluateSelection(input, state, {
        objectId,
        selectedAt: 200,
      }).state;
      expect(score(input, state).breakdown.incorrectSelectionPenalty).toBe(0);
    }
    const wrong = evaluateSelection(input, state, {
      objectId: "unchanged",
      selectedAt: 200,
    });
    expect(wrong.outcome).toBe("INCORRECT");
    expect(score(input, wrong.state).breakdown.incorrectSelectionPenalty).toBe(
      100,
    );
  });
  it("awards the authored base to a fresh session and defers unapproved components", () => {
    const data = fixture();
    expect(score(data, initial(data))).toEqual({
      rawTotal: 1000,
      total: 1000,
      breakdown: {
        completion: 1000,
        changes: 0,
        evidence: 0,
        deductions: 0,
        finalDecision: 0,
        timeBonus: 0,
        incorrectSelectionPenalty: 0,
        hintPenalty: 0,
      },
      accuracy: null,
      rating: null,
    });
  });
  it.each([
    ["meaningful", true, 200],
    ["meaningful", false, 0],
    ["decorative", true, 0],
    ["decorative", false, 0],
  ] as const)(
    "scores change eligibility %s/%s",
    (significance, isRequired, expected) => {
      const data = fixture();
      const changed = {
        ...data,
        changes: data.changes.map((item) => ({
          ...item,
          significance,
          isRequired,
        })),
      };
      expect(
        score(changed, {
          ...initial(data),
          correctDiscoveries: ["fixture-change"],
        }).breakdown.changes,
      ).toBe(expected);
    },
  );
  it.each([
    ["primary", true, 250],
    ["primary", false, 0],
    ["supporting", true, 0],
    ["red_herring", false, 0],
  ] as const)(
    "scores evidence eligibility %s/%s",
    (category, isRequired, expected) => {
      const data = fixture();
      const changed = {
        ...data,
        evidence: data.evidence.map((item) => ({
          ...item,
          category,
          isRequired,
        })),
      };
      expect(
        score(changed, {
          ...initial(data),
          evidenceCollected: ["fixture-evidence"],
        }).breakdown.evidence,
      ).toBe(expected);
    },
  );
  it("scores unique authored discoveries and collections once, excluding unknown IDs", () => {
    const data = fixture();
    const state = {
      ...initial(data),
      correctDiscoveries: ["fixture-change", "fixture-change", "unknown"],
      evidenceCollected: ["fixture-evidence", "unknown", "fixture-evidence"],
    };
    expect(score(data, state).total).toBe(1450);
    expect(
      score(data, { ...state, evidenceCollected: [] }).breakdown.evidence,
    ).toBe(0);
  });
  it("counts multiple unique eligible authored items", () => {
    const data = fixture();
    const expanded: CaseDefinition = {
      ...data,
      changes: data.changes.flatMap((item) => [
        item,
        { ...item, id: "other-change" },
      ]),
      evidence: data.evidence.flatMap((item) => [
        item,
        { ...item, id: "other-evidence" },
      ]),
    };
    expect(
      score(expanded, {
        ...initial(data),
        correctDiscoveries: ["fixture-change", "other-change"],
        evidenceCollected: ["fixture-evidence", "other-evidence"],
      }).total,
    ).toBe(1900);
  });
  it("scores canonical correct answers, excluding incorrect, unknown and unanswered deductions", () => {
    const data = fixture();
    const state = initial(data);
    const withWrongChoice: CaseDefinition = {
      ...data,
      deductions: data.deductions.map((item) => ({
        ...item,
        choices: [
          ...item.choices,
          {
            id: "wrong",
            text: { key: "fixture.wrong" },
            supportingInformation: [],
          },
        ],
      })),
    };
    expect(
      score(withWrongChoice, {
        ...state,
        deductionAnswers: [
          {
            kind: "single_choice",
            deductionId: "fixture-deduction",
            choiceId: "wrong",
          },
        ],
      }).breakdown.deductions,
    ).toBe(0);
    expect(
      score(data, {
        ...state,
        deductionAnswers: data.solution.deductionAnswers,
      }).breakdown.deductions,
    ).toBe(300);
    expect(
      score(data, {
        ...state,
        deductionAnswers: [
          {
            kind: "single_choice",
            deductionId: "fixture-deduction",
            choiceId: "unknown",
          },
          {
            kind: "single_choice",
            deductionId: "unknown",
            choiceId: "fixture-choice",
          },
        ],
      }).breakdown.deductions,
    ).toBe(0);
  });
  it("preserves first-answer authority and never rewards duplicate submissions", () => {
    const data = fixture();
    const canonical = data.solution.deductionAnswers;
    expect(
      score(data, {
        ...initial(data),
        deductionAnswers: [...canonical, ...canonical],
      }).breakdown.deductions,
    ).toBe(300);
    expect(
      score(data, {
        ...initial(data),
        deductionAnswers: [
          {
            kind: "single_choice",
            deductionId: "fixture-deduction",
            choiceId: "wrong",
          },
          ...canonical,
        ],
      }).breakdown.deductions,
    ).toBe(0);
  });
  it("compares exact multiple-choice sets, rejecting subsets, supersets, duplicates and kind mismatches", () => {
    const data = fixture();
    const changed: CaseDefinition = {
      ...data,
      deductions: data.deductions.map((item) => ({
        ...item,
        kind: "multiple_choice",
        choices: ["a", "b", "c"].map((id) => ({
          id,
          text: { key: "fixture.choice" },
          supportingInformation: [],
        })),
      })),
      solution: {
        ...data.solution,
        deductionAnswers: [
          {
            kind: "multiple_choice",
            deductionId: "fixture-deduction",
            choiceIds: ["a", "b"],
          },
        ],
      },
    };
    for (const [choiceIds, expected] of [
      [["b", "a"], 300],
      [["a"], 0],
      [["a", "b", "c"], 0],
      [["a", "a"], 0],
      [[], 0],
    ] as const)
      expect(
        score(changed, {
          ...initial(data),
          deductionAnswers: [
            {
              kind: "multiple_choice",
              deductionId: "fixture-deduction",
              choiceIds,
            },
          ],
        }).breakdown.deductions,
      ).toBe(expected);
    expect(
      score(changed, {
        ...initial(data),
        deductionAnswers: [
          {
            kind: "single_choice",
            deductionId: "fixture-deduction",
            choiceId: "a",
          },
        ],
      }).breakdown.deductions,
    ).toBe(0);
  });
  it("counts each recorded incorrect attempt once, including retries, without penalizing selection history", () => {
    const data = fixture();
    const attempt = { objectId: "fixture-object", selectedAt: 200 };
    const state = {
      ...initial(data),
      selectedObjects: [attempt, attempt, attempt],
      incorrectSelections: [attempt, attempt],
    };
    expect(score(data, state).breakdown.incorrectSelectionPenalty).toBe(200);
    expect(score(data, { ...state, incorrectSelections: [] }).total).toBe(1000);
  });
  it("combines components and exposes a negative raw total while flooring the total", () => {
    const data = fixture();
    const state = {
      ...initial(data),
      correctDiscoveries: ["fixture-change"],
      evidenceCollected: ["fixture-evidence"],
      deductionAnswers: data.solution.deductionAnswers,
      incorrectSelections: [{ objectId: "fixture-object", selectedAt: 200 }],
    };
    expect(score(data, state)).toEqual({
      rawTotal: 1650,
      total: 1650,
      breakdown: {
        completion: 1000,
        changes: 200,
        evidence: 250,
        deductions: 300,
        finalDecision: 0,
        timeBonus: 0,
        incorrectSelectionPenalty: 100,
        hintPenalty: 0,
      },
      accuracy: null,
      rating: null,
    });
    const negative = score(data, {
      ...initial(data),
      incorrectSelections: Array.from({ length: 11 }, () => ({
        objectId: "fixture-object",
        selectedAt: 200,
      })),
    });
    expect(negative.rawTotal).toBe(-100);
    expect(negative.total).toBe(0);
  });
  it("uses authored tuning rather than hardcoded baseline values", () => {
    const data = fixture();
    const changed = {
      ...data,
      scoring: {
        ...data.scoring,
        baseCompletionScore: 10,
        correctChangeScore: 7,
        importantEvidenceScore: 11,
        deductionScore: 13,
        incorrectSelectionPenalty: 3,
      },
    };
    expect(
      score(changed, {
        ...initial(data),
        correctDiscoveries: ["fixture-change"],
        evidenceCollected: ["fixture-evidence"],
        deductionAnswers: data.solution.deductionAnswers,
        incorrectSelections: [{ objectId: "fixture-object", selectedAt: 200 }],
      }).total,
    ).toBe(38);
  });
  it("is repeatable and read-only, ignoring stale scores, final choices, hints and elapsed time", () => {
    const data = fixture();
    const state = {
      ...initial(data),
      score: { ...score(data, initial(data)), total: 99999 },
      finalDecision: "fixture-decision",
      hintsUsed: ["fixture-hint"],
      completedAt: 99999,
    };
    const before = JSON.stringify({ data, state });
    freeze(data);
    freeze(state);
    expect(score(data, state)).toEqual(score(data, state));
    expect(score(data, state).total).toBe(1000);
    expect(JSON.stringify({ data, state })).toBe(before);
  });
  it("rejects case identity/version mismatch and non-finite arithmetic explicitly", () => {
    const data = fixture();
    for (const state of [
      { ...initial(data), caseId: "other" },
      { ...initial(data), caseVersion: 8 },
    ])
      expect(calculateCaseScore(data, state)).toEqual({
        ok: false,
        code: "SESSION_CASE_MISMATCH",
      });
    expect(
      calculateCaseScore(
        {
          ...data,
          scoring: { ...data.scoring, correctChangeScore: Number.MAX_VALUE },
          changes: data.changes.flatMap((item) => [
            item,
            { ...item, id: "other" },
          ]),
        },
        { ...initial(data), correctDiscoveries: ["fixture-change", "other"] },
      ),
    ).toEqual({ ok: false, code: "NON_FINITE_SCORE" });
  });
});
