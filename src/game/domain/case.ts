import type { CaseId, SceneId, TextReference } from "./identity";
import type {
  ChangeDefinition,
  ObjectDefinition,
  SceneDefinition,
} from "./scene";
import type {
  CharacterDefinition,
  ContradictionDefinition,
  DeductionDefinition,
  EvidenceDefinition,
  FinalDecisionDefinition,
  HintDefinition,
  SolutionDefinition,
  StatementDefinition,
  WitnessDefinition,
} from "./reasoning";
import type { ScoringConfiguration } from "./scoring";

export interface CaseMetadata {
  readonly slug: string;
  readonly title: TextReference;
  readonly difficulty: "easy" | "medium" | "hard" | "expert";
  readonly estimatedDurationSeconds: number;
  readonly supportedLanguages: readonly string[];
}

export interface CaseBriefing {
  readonly setting: TextReference;
  readonly incident: TextReference;
  readonly objective: TextReference;
  readonly instructions: TextReference;
}

export interface CaseSettings {
  readonly observationDurationSeconds: number;
  readonly transitionDurationSeconds: number;
}

// Structure compatibility and authored revision are independent. T04 validates both.
export interface CaseDefinition {
  readonly id: CaseId;
  readonly schemaVersion: number;
  readonly caseVersion: number;
  readonly metadata: CaseMetadata;
  readonly briefing: CaseBriefing;
  readonly settings: CaseSettings;
  readonly observationSceneId: SceneId;
  readonly investigationSceneId: SceneId;
  readonly scenes: readonly SceneDefinition[];
  readonly objects: readonly ObjectDefinition[];
  readonly changes: readonly ChangeDefinition[];
  readonly evidence: readonly EvidenceDefinition[];
  readonly characters: readonly CharacterDefinition[];
  readonly witnesses: readonly WitnessDefinition[];
  readonly statements: readonly StatementDefinition[];
  readonly contradictions: readonly ContradictionDefinition[];
  readonly deductions: readonly DeductionDefinition[];
  readonly finalDecision: FinalDecisionDefinition;
  readonly hints: readonly HintDefinition[];
  readonly solution: SolutionDefinition;
  readonly scoring: ScoringConfiguration;
}
