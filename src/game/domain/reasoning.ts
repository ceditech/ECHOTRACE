import type {
  AssetReference,
  ChangeId,
  CharacterId,
  ChoiceId,
  ContradictionId,
  DecisionId,
  DeductionId,
  EvidenceId,
  EventId,
  FactId,
  HintId,
  ObjectId,
  SceneId,
  StatementId,
  TextReference,
  WitnessId,
} from "./identity";

export type InformationReference =
  | { readonly kind: "change"; readonly id: ChangeId }
  | { readonly kind: "evidence"; readonly id: EvidenceId }
  | { readonly kind: "statement"; readonly id: StatementId }
  | { readonly kind: "fact"; readonly id: FactId }
  | { readonly kind: "event"; readonly id: EventId }
  | { readonly kind: "contradiction"; readonly id: ContradictionId }
  | { readonly kind: "deduction"; readonly id: DeductionId };

export type EvidenceSource =
  | { readonly kind: "change"; readonly changeId: ChangeId }
  | { readonly kind: "object" | "document"; readonly objectId: ObjectId }
  | { readonly kind: "statement"; readonly statementId: StatementId }
  | { readonly kind: "timestamp"; readonly eventId: EventId }
  | { readonly kind: "environment"; readonly sceneId: SceneId }
  | { readonly kind: "deduction"; readonly deductionId: DeductionId };

export type EvidenceCategory =
  | "primary"
  | "supporting"
  | "context"
  | "contradictory"
  | "exculpatory"
  | "red_herring";

export interface EvidenceDefinition {
  readonly id: EvidenceId;
  readonly title: TextReference;
  readonly description: TextReference;
  readonly source: EvidenceSource;
  readonly category: EvidenceCategory;
  readonly isRequired: boolean;
  readonly relatedObjectIds: readonly ObjectId[];
  readonly relatedCharacterIds: readonly CharacterId[];
  readonly relatedStatementIds: readonly StatementId[];
  readonly supportingInformation: readonly InformationReference[];
  readonly visual?: AssetReference;
}

export interface CharacterDefinition {
  readonly id: CharacterId;
  readonly name: TextReference;
  readonly role: TextReference;
  readonly publicDescription: TextReference;
  readonly relationshipToIncident: TextReference;
  readonly portrait?: AssetReference;
}

export type StatementTruthStatus =
  "truthful" | "incomplete" | "mistaken" | "misleading" | "deliberately_false";

export interface StatementDefinition {
  readonly id: StatementId;
  readonly witnessId: WitnessId;
  readonly text: TextReference;
  // Authoring truth is distinct from the player's knowledge of the statement.
  readonly truthStatus: StatementTruthStatus;
  readonly relatedInformation: readonly InformationReference[];
}

export interface WitnessDefinition {
  readonly id: WitnessId;
  readonly characterId: CharacterId;
  readonly statementIds: readonly StatementId[];
  readonly relatedEvidenceIds: readonly EvidenceId[];
}

export interface ContradictionDefinition {
  readonly id: ContradictionId;
  readonly kind:
    | "visual_testimony"
    | "evidence_testimony"
    | "testimony_testimony"
    | "timeline"
    | "object_relationship";
  readonly conflictingInformation: readonly [
    InformationReference,
    InformationReference,
  ];
  readonly explanation: TextReference;
}

export interface DeductionChoice {
  readonly id: ChoiceId;
  readonly text: TextReference;
  readonly supportingInformation: readonly InformationReference[];
}

interface DeductionBase {
  readonly id: DeductionId;
  readonly question: TextReference;
  readonly choices: readonly DeductionChoice[];
  readonly supportingInformation: readonly InformationReference[];
}

// Stage 1 starts with the documented choice-based forms; later forms need approval.
export type DeductionDefinition = DeductionBase & {
  readonly kind: "single_choice" | "multiple_choice";
};

export type DeductionAnswer =
  | {
      readonly kind: "single_choice";
      readonly deductionId: DeductionId;
      readonly choiceId: ChoiceId;
    }
  | {
      readonly kind: "multiple_choice";
      readonly deductionId: DeductionId;
      readonly choiceIds: readonly ChoiceId[];
    };

export interface FinalDecisionChoice {
  readonly id: DecisionId;
  readonly text: TextReference;
}

export interface FinalDecisionDefinition {
  readonly question: TextReference;
  readonly choices: readonly FinalDecisionChoice[];
}

export interface FactDefinition {
  readonly id: FactId;
  readonly description: TextReference;
}

export interface EventDefinition {
  readonly id: EventId;
  readonly description: TextReference;
  readonly relatedCharacterIds: readonly CharacterId[];
  readonly relatedObjectIds: readonly ObjectId[];
}

export interface ReconstructionStep {
  readonly eventId: EventId;
  readonly explanation: TextReference;
  readonly supportingInformation: readonly InformationReference[];
}

export interface SolutionDefinition {
  readonly correctDecisionId: DecisionId;
  readonly deductionAnswers: readonly DeductionAnswer[];
  readonly facts: readonly FactDefinition[];
  readonly events: readonly EventDefinition[];
  readonly explanation: TextReference;
  readonly reconstruction: readonly ReconstructionStep[];
  readonly supportingInformation: readonly InformationReference[];
}

export type HintLevel = 1 | 2 | 3;

export interface HintDefinition {
  readonly id: HintId;
  readonly level: HintLevel;
  readonly text: TextReference;
  readonly relatedInformation: readonly InformationReference[];
}
