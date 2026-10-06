export type CaseId = string;
export type SceneId = string;
export type ObjectId = string;
export type ChangeId = string;
export type EvidenceId = string;
export type CharacterId = string;
export type WitnessId = string;
export type StatementId = string;
export type ContradictionId = string;
export type DeductionId = string;
export type DecisionId = string;
export type HintId = string;
export type ChoiceId = string;
export type FactId = string;
export type EventId = string;
export type AttemptId = string;
export type AssetId = string;
export type TextKey = string;

export interface TextReference {
  readonly key: TextKey;
}

export interface AssetReference {
  readonly id: AssetId;
}

// Numeric timestamps remain serializable and do not require Date or platform APIs.
export type TimestampMilliseconds = number;
