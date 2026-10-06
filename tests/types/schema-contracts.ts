import type { z } from "zod";
import type { CaseDefinition } from "@/game/domain/case";
import type {
  ChangeDefinition,
  ObjectDefinition,
  SceneDefinition,
} from "@/game/domain/scene";
import type {
  CharacterDefinition,
  ContradictionDefinition,
  DeductionAnswer,
  DeductionDefinition,
  EvidenceDefinition,
  FinalDecisionDefinition,
  HintDefinition,
  InformationReference,
  SolutionDefinition,
  StatementDefinition,
  WitnessDefinition,
} from "@/game/domain/reasoning";
import type { ScoringConfiguration } from "@/game/domain/scoring";
import type {
  caseDefinitionSchema,
  scoringSchema,
} from "@/cases/schemas/case-definition";
import type {
  changeSchema,
  objectSchema,
  sceneSchema,
} from "@/cases/schemas/scene";
import type {
  characterSchema,
  contradictionSchema,
  deductionAnswerSchema,
  deductionSchema,
  evidenceSchema,
  finalDecisionSchema,
  hintSchema,
  informationSchema,
  solutionSchema,
  statementSchema,
  witnessSchema,
} from "@/cases/schemas/reasoning";

type Compatible<Output, Domain> = [Output] extends [Domain]
  ? [Domain] extends [Output]
    ? true
    : false
  : false;
type Assert<T extends true> = T;
// Readonly domain arrays are intentional; schema parsing returns mutable array copies.
type Mutable<T> = T extends readonly (infer Item)[]
  ? number extends T["length"]
    ? Mutable<Item>[]
    : { -readonly [K in keyof T]: Mutable<T[K]> }
  : T extends object
    ? { -readonly [K in keyof T]: Mutable<T[K]> }
    : T;
export type SchemaContracts = [
  Assert<
    Compatible<z.output<typeof caseDefinitionSchema>, Mutable<CaseDefinition>>
  >,
  Assert<Compatible<z.output<typeof objectSchema>, Mutable<ObjectDefinition>>>,
  Assert<Compatible<z.output<typeof sceneSchema>, Mutable<SceneDefinition>>>,
  Assert<Compatible<z.output<typeof changeSchema>, Mutable<ChangeDefinition>>>,
  Assert<
    Compatible<z.output<typeof evidenceSchema>, Mutable<EvidenceDefinition>>
  >,
  Assert<
    Compatible<z.output<typeof characterSchema>, Mutable<CharacterDefinition>>
  >,
  Assert<
    Compatible<z.output<typeof witnessSchema>, Mutable<WitnessDefinition>>
  >,
  Assert<
    Compatible<z.output<typeof statementSchema>, Mutable<StatementDefinition>>
  >,
  Assert<
    Compatible<
      z.output<typeof contradictionSchema>,
      Mutable<ContradictionDefinition>
    >
  >,
  Assert<
    Compatible<
      z.output<typeof informationSchema>,
      Mutable<InformationReference>
    >
  >,
  Assert<
    Compatible<z.output<typeof deductionSchema>, Mutable<DeductionDefinition>>
  >,
  Assert<
    Compatible<z.output<typeof deductionAnswerSchema>, Mutable<DeductionAnswer>>
  >,
  Assert<
    Compatible<
      z.output<typeof finalDecisionSchema>,
      Mutable<FinalDecisionDefinition>
    >
  >,
  Assert<Compatible<z.output<typeof hintSchema>, Mutable<HintDefinition>>>,
  Assert<
    Compatible<z.output<typeof solutionSchema>, Mutable<SolutionDefinition>>
  >,
  Assert<
    Compatible<z.output<typeof scoringSchema>, Mutable<ScoringConfiguration>>
  >,
];
