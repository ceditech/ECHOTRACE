import type { HintLevel } from "./reasoning";

export type StarRating = 1 | 2 | 3 | 4 | 5;

export interface StarThreshold {
  readonly stars: StarRating;
  readonly minimumScore: number;
}

export interface HintPenalty {
  readonly level: HintLevel;
  readonly penalty: number;
}

// Authored values are consumed by the domain score calculation.
export interface ScoringConfiguration {
  readonly baseCompletionScore: number;
  readonly correctChangeScore: number;
  readonly importantEvidenceScore: number;
  readonly deductionScore: number;
  readonly finalDecisionScore: number;
  readonly incorrectSelectionPenalty: number;
  readonly hintPenalties: readonly HintPenalty[];
  readonly timeBonusMaximum: number;
  readonly starThresholds: readonly StarThreshold[];
}

export interface ScoreBreakdown {
  readonly completion: number;
  readonly changes: number;
  readonly evidence: number;
  readonly deductions: number;
  readonly finalDecision: number;
  readonly timeBonus: number;
  readonly incorrectSelectionPenalty: number;
  readonly hintPenalty: number;
}

export interface ScoreResult {
  readonly rawTotal: number;
  readonly total: number;
  readonly breakdown: ScoreBreakdown;
  readonly accuracy: number | null;
  readonly rating: StarRating | null;
}
