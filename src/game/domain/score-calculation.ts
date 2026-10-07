import type { CaseDefinition } from "./case";
import type { DeductionAnswer } from "./reasoning";
import type { ScoreResult } from "./scoring";
import type { CaseSession } from "./session";

export type ScoreCalculationResult =
  | { readonly ok: true; readonly value: ScoreResult }
  | {
      readonly ok: false;
      readonly code: "SESSION_CASE_MISMATCH" | "NON_FINITE_SCORE";
    };

export function calculateCaseScore(
  definition: CaseDefinition,
  session: CaseSession,
): ScoreCalculationResult {
  if (
    session.caseId !== definition.id ||
    session.caseVersion !== definition.caseVersion
  )
    return { ok: false, code: "SESSION_CASE_MISMATCH" };
  const discovered = new Set(session.correctDiscoveries);
  const collected = new Set(session.evidenceCollected);
  const answers = new Map<string, DeductionAnswer>();
  // T08 locks the first recorded answer; later duplicate records cannot replace it.
  for (const answer of session.deductionAnswers)
    if (!answers.has(answer.deductionId))
      answers.set(answer.deductionId, answer);
  const correctDeductions = definition.deductions.filter((deduction) => {
    const answer = answers.get(deduction.id);
    const canonical = definition.solution.deductionAnswers.find(
      (item) => item.deductionId === deduction.id,
    );
    if (
      !answer ||
      !canonical ||
      answer.kind !== deduction.kind ||
      canonical.kind !== answer.kind
    )
      return false;
    const choices =
      answer.kind === "single_choice" ? [answer.choiceId] : answer.choiceIds;
    const expected =
      canonical.kind === "single_choice"
        ? [canonical.choiceId]
        : canonical.choiceIds;
    return (
      choices.length > 0 &&
      new Set(choices).size === choices.length &&
      choices.every((id) =>
        deduction.choices.some((choice) => choice.id === id),
      ) &&
      choices.length === expected.length &&
      choices.every((id) => expected.includes(id))
    );
  }).length;
  const config = definition.scoring;
  const breakdown = {
    completion: config.baseCompletionScore,
    changes:
      definition.changes.filter(
        (change) =>
          change.significance === "meaningful" &&
          change.isRequired &&
          discovered.has(change.id),
      ).length * config.correctChangeScore,
    evidence:
      definition.evidence.filter(
        (item) =>
          item.category === "primary" &&
          item.isRequired &&
          collected.has(item.id),
      ).length * config.importantEvidenceScore,
    deductions: correctDeductions * config.deductionScore,
    finalDecision: 0,
    timeBonus: 0,
    // Each authoritative T07 record represents one incorrect attempt, including retries.
    incorrectSelectionPenalty:
      session.incorrectSelections.length * config.incorrectSelectionPenalty,
    hintPenalty: 0,
  };
  const rawTotal =
    breakdown.completion +
    breakdown.changes +
    breakdown.evidence +
    breakdown.deductions -
    breakdown.incorrectSelectionPenalty;
  if (
    !Object.values(breakdown).every(Number.isFinite) ||
    !Number.isFinite(rawTotal)
  )
    return { ok: false, code: "NON_FINITE_SCORE" };
  return {
    ok: true,
    value: {
      rawTotal,
      total: Math.max(0, rawTotal),
      breakdown,
      accuracy: null,
      rating: null,
    },
  };
}
