import type { CaseDefinition } from "./case";
import type { AttemptId, CaseId, TimestampMilliseconds } from "./identity";
import { calculateCaseScore } from "./score-calculation";
import type { CaseProgress, CaseSession } from "./session";

export interface CompletedAttempt {
  readonly caseId: CaseId;
  readonly caseVersion: number;
  readonly attemptId: AttemptId;
  readonly completedAt: TimestampMilliseconds;
  readonly score: number;
}

export type CompletedAttemptResult =
  | { readonly ok: true; readonly value: CompletedAttempt }
  | {
      readonly ok: false;
      readonly code:
        | "ATTEMPT_NOT_COMPLETED"
        | "INVALID_COMPLETION"
        | "SESSION_CASE_MISMATCH"
        | "NON_FINITE_SCORE";
    };

export function createCompletedAttempt(
  definition: CaseDefinition,
  session: CaseSession,
): CompletedAttemptResult {
  if (
    session.currentPhase !== "results" ||
    session.completionStatus !== "completed"
  )
    return { ok: false, code: "ATTEMPT_NOT_COMPLETED" };
  if (
    session.completedAt === null ||
    !Number.isFinite(session.completedAt) ||
    session.completedAt < session.startedAt ||
    session.attemptId.trim().length === 0
  )
    return { ok: false, code: "INVALID_COMPLETION" };
  const result = calculateCaseScore(definition, session);
  if (!result.ok) return result;
  return {
    ok: true,
    value: {
      caseId: session.caseId,
      caseVersion: session.caseVersion,
      attemptId: session.attemptId,
      completedAt: session.completedAt,
      score: result.value.total,
    },
  };
}

// Ledger identity survives reloads; retries retain the original completed result.
export function appendCompletedAttempt(
  attempts: readonly CompletedAttempt[],
  attempt: CompletedAttempt,
): readonly CompletedAttempt[] {
  if (
    attempts.some(
      (item) =>
        item.attemptId === attempt.attemptId &&
        item.caseId === attempt.caseId &&
        item.caseVersion === attempt.caseVersion,
    )
  )
    return attempts;
  return [...attempts, { ...attempt }];
}

export function aggregateCaseProgress(
  caseId: CaseId,
  caseVersion: number,
  attempts: readonly CompletedAttempt[],
): CaseProgress | null {
  const unique = new Map<AttemptId, CompletedAttempt>();
  for (const attempt of attempts)
    if (
      attempt.caseId === caseId &&
      attempt.caseVersion === caseVersion &&
      !unique.has(attempt.attemptId)
    )
      unique.set(attempt.attemptId, attempt);
  if (unique.size === 0) return null;
  const bestScore = Array.from(unique.values()).reduce(
    (best, attempt) => Math.max(best, attempt.score),
    0,
  );
  return {
    caseId,
    caseVersion,
    completed: true,
    attemptCount: unique.size,
    bestScore,
    bestRating: null,
  };
}
