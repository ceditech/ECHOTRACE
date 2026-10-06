import type {
  AttemptId,
  CaseId,
  ChangeId,
  DecisionId,
  EvidenceId,
  HintId,
  ObjectId,
  TimestampMilliseconds,
} from "./identity";
import type { DeductionAnswer } from "./reasoning";
import type { ScoreResult, StarRating } from "./scoring";

export type GamePhase =
  | "case_briefing"
  | "observation_intro"
  | "observation_active"
  | "observation_end"
  | "transition"
  | "investigation_intro"
  | "investigation_active"
  | "evidence_review"
  | "witness_testimony"
  | "deduction"
  | "final_decision"
  | "resolution"
  | "results";

export interface SelectionRecord {
  readonly objectId: ObjectId;
  readonly selectedAt: TimestampMilliseconds;
}

export interface CaseSession {
  readonly caseId: CaseId;
  readonly caseVersion: number;
  readonly attemptId: AttemptId;
  readonly currentPhase: GamePhase;
  readonly startedAt: TimestampMilliseconds;
  readonly observationStartedAt: TimestampMilliseconds | null;
  readonly observationEndedAt: TimestampMilliseconds | null;
  readonly investigationStartedAt: TimestampMilliseconds | null;
  readonly selectedObjects: readonly SelectionRecord[];
  readonly correctDiscoveries: readonly ChangeId[];
  readonly incorrectSelections: readonly SelectionRecord[];
  readonly evidenceCollected: readonly EvidenceId[];
  readonly hintsUsed: readonly HintId[];
  readonly deductionAnswers: readonly DeductionAnswer[];
  readonly finalDecision: DecisionId | null;
  readonly score: ScoreResult | null;
  readonly completionStatus: "in_progress" | "completed";
  readonly completedAt: TimestampMilliseconds | null;
}

// Domain progress facts, not a storage envelope, migration, or entitlement model.
export interface CaseProgress {
  readonly caseId: CaseId;
  readonly caseVersion: number;
  readonly completed: boolean;
  readonly attemptCount: number;
  readonly bestScore: number | null;
  readonly bestRating: StarRating | null;
}
