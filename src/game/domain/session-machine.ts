import type { CaseDefinition } from "./case";
import type { AttemptId, TimestampMilliseconds } from "./identity";
import type { CaseSession, GamePhase } from "./session";

const nextPhases: Readonly<Record<GamePhase, GamePhase | null>> = {
  case_briefing: "observation_intro",
  observation_intro: "observation_active",
  observation_active: "observation_end",
  observation_end: "transition",
  transition: "investigation_intro",
  investigation_intro: "investigation_active",
  investigation_active: "evidence_review",
  evidence_review: "witness_testimony",
  witness_testimony: "deduction",
  deduction: "final_decision",
  final_decision: "resolution",
  resolution: "results",
  results: null,
};

export interface SessionInitialization {
  readonly attemptId: AttemptId;
  readonly startedAt: TimestampMilliseconds;
}
export interface SessionCommand {
  readonly type: "advance_phase";
  readonly from: GamePhase;
  readonly to: GamePhase;
  readonly at: TimestampMilliseconds;
}
// Later orchestration supplies its approved gate outcome, never a default guess.
export type TransitionPrerequisite =
  { readonly ok: true } | { readonly ok: false };
export type SessionRejectionCode =
  | "command_not_allowed_in_phase"
  | "invalid_session_state"
  | "invalid_command_timestamp"
  | "prerequisite_not_satisfied";
export type SessionCommandResult =
  | { readonly ok: true; readonly state: CaseSession }
  | {
      readonly ok: false;
      readonly code: SessionRejectionCode;
      readonly state: CaseSession;
    };

export function getNextPhase(phase: GamePhase): GamePhase | null {
  return nextPhases[phase];
}

export function createInitialSession(
  caseDefinition: CaseDefinition,
  input: SessionInitialization,
): CaseSession {
  // These injected values are programmer inputs; case validation is owned by T04/T05.
  if (
    !Number.isFinite(input.startedAt) ||
    input.attemptId.trim().length === 0
  ) {
    throw new RangeError(
      "Session initialization requires a finite timestamp and nonempty attempt ID",
    );
  }
  return {
    caseId: caseDefinition.id,
    caseVersion: caseDefinition.caseVersion,
    attemptId: input.attemptId,
    currentPhase: "case_briefing",
    startedAt: input.startedAt,
    observationStartedAt: null,
    observationEndedAt: null,
    investigationStartedAt: null,
    selectedObjects: [],
    correctDiscoveries: [],
    incorrectSelections: [],
    evidenceCollected: [],
    hintsUsed: [],
    deductionAnswers: [],
    finalDecision: null,
    score: null,
    completionStatus: "in_progress",
    completedAt: null,
  };
}

export function applySessionCommand(
  state: CaseSession,
  command: SessionCommand,
  prerequisite: TransitionPrerequisite,
): SessionCommandResult {
  const reject = (code: SessionRejectionCode): SessionCommandResult => ({
    ok: false,
    code,
    state,
  });
  const terminal = state.currentPhase === "results";
  if (
    (state.completionStatus === "completed") !== terminal ||
    (state.completedAt !== null) !== terminal
  ) {
    return reject("invalid_session_state");
  }
  if (
    terminal ||
    command.type !== "advance_phase" ||
    command.from !== state.currentPhase ||
    nextPhases[state.currentPhase] !== command.to
  ) {
    return reject("command_not_allowed_in_phase");
  }
  const milestones = [
    state.startedAt,
    state.observationStartedAt,
    state.observationEndedAt,
    state.investigationStartedAt,
  ];
  if (milestones.some((time) => time !== null && !Number.isFinite(time)))
    return reject("invalid_session_state");
  if (
    !Number.isFinite(command.at) ||
    milestones.some((time) => time !== null && command.at < time)
  )
    return reject("invalid_command_timestamp");
  if (!prerequisite.ok) return reject("prerequisite_not_satisfied");
  return {
    ok: true,
    state: {
      ...state,
      currentPhase: command.to,
      observationStartedAt:
        command.to === "observation_active"
          ? command.at
          : state.observationStartedAt,
      observationEndedAt:
        command.to === "observation_end"
          ? command.at
          : state.observationEndedAt,
      investigationStartedAt:
        command.to === "investigation_active"
          ? command.at
          : state.investigationStartedAt,
      completionStatus:
        command.to === "results" ? "completed" : state.completionStatus,
      completedAt: command.to === "results" ? command.at : state.completedAt,
    },
  };
}
