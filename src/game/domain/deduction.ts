import type { CaseDefinition } from "./case";
import type { DeductionAnswer } from "./reasoning";
import type { CaseSession } from "./session";

export type DeductionResult = {
  readonly outcome:
    | "CORRECT"
    | "INCORRECT"
    | "ALREADY_ANSWERED"
    | "UNKNOWN_DEDUCTION"
    | "UNKNOWN_CHOICE"
    | "INVALID_ANSWER"
    | "NOT_AVAILABLE"
    | "SESSION_CASE_MISMATCH";
  readonly state: CaseSession;
};

export function evaluateDeduction(
  definition: CaseDefinition,
  session: CaseSession,
  answer: DeductionAnswer,
): DeductionResult {
  const reject = (outcome: DeductionResult["outcome"]): DeductionResult => ({
    outcome,
    state: session,
  });
  if (
    session.caseId !== definition.id ||
    session.caseVersion !== definition.caseVersion
  )
    return reject("SESSION_CASE_MISMATCH");
  const deduction = definition.deductions.find(
    (item) => item.id === answer.deductionId,
  );
  if (!deduction) return reject("UNKNOWN_DEDUCTION");
  if (
    session.deductionAnswers.some((item) => item.deductionId === deduction.id)
  )
    return reject("ALREADY_ANSWERED");
  if (
    session.completionStatus !== "in_progress" ||
    session.currentPhase === "results"
  )
    return reject("NOT_AVAILABLE");
  if (answer.kind !== deduction.kind) return reject("INVALID_ANSWER");
  const choices =
    answer.kind === "single_choice" ? [answer.choiceId] : answer.choiceIds;
  if (choices.length === 0 || new Set(choices).size !== choices.length)
    return reject("INVALID_ANSWER");
  if (
    choices.some((id) => !deduction.choices.some((choice) => choice.id === id))
  )
    return reject("UNKNOWN_CHOICE");
  const canonical = definition.solution.deductionAnswers.find(
    (item) => item.deductionId === deduction.id,
  );
  if (!canonical || canonical.kind !== answer.kind)
    return reject("NOT_AVAILABLE");
  // Choice IDs identify a multiple-choice set; presentation order is not answer truth.
  const expected =
    canonical.kind === "single_choice"
      ? [canonical.choiceId]
      : canonical.choiceIds;
  const correct =
    choices.length === expected.length &&
    choices.every((id) => expected.includes(id));
  // Copy caller-owned arrays before storing them in the authoritative session.
  const recorded: DeductionAnswer =
    answer.kind === "single_choice"
      ? {
          kind: answer.kind,
          deductionId: answer.deductionId,
          choiceId: answer.choiceId,
        }
      : {
          kind: answer.kind,
          deductionId: answer.deductionId,
          choiceIds: [...answer.choiceIds],
        };
  return {
    outcome: correct ? "CORRECT" : "INCORRECT",
    state: {
      ...session,
      deductionAnswers: [...session.deductionAnswers, recorded],
    },
  };
}
