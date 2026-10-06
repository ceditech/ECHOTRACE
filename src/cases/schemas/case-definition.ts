import { z } from "zod";
import {
  hintLevelSchema,
  idSchema,
  nonnegativeSchema,
  positiveSchema,
  textReferenceSchema,
} from "./primitives";
import { changeSchema, objectSchema, sceneSchema } from "./scene";
import {
  characterSchema,
  contradictionSchema,
  deductionSchema,
  evidenceSchema,
  finalDecisionSchema,
  hintSchema,
  solutionSchema,
  statementSchema,
  witnessSchema,
} from "./reasoning";

export const SUPPORTED_SCHEMA_VERSION = 1;
export const scoringSchema = z.strictObject({
  baseCompletionScore: nonnegativeSchema,
  correctChangeScore: nonnegativeSchema,
  importantEvidenceScore: nonnegativeSchema,
  deductionScore: nonnegativeSchema,
  finalDecisionScore: nonnegativeSchema,
  incorrectSelectionPenalty: nonnegativeSchema,
  hintPenalties: z.array(
    z.strictObject({ level: hintLevelSchema, penalty: nonnegativeSchema }),
  ),
  timeBonusMaximum: nonnegativeSchema,
  starThresholds: z.array(
    z.strictObject({
      stars: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ]),
      minimumScore: nonnegativeSchema,
    }),
  ),
});
export const caseDefinitionSchema = z.strictObject({
  id: idSchema,
  schemaVersion: positiveSchema.int(),
  caseVersion: positiveSchema.int(),
  metadata: z.strictObject({
    slug: idSchema,
    title: textReferenceSchema,
    difficulty: z.enum(["easy", "medium", "hard", "expert"]),
    estimatedDurationSeconds: positiveSchema,
    supportedLanguages: z
      .array(
        z
          .string()
          .min(1)
          .refine(
            (value) => value.trim() === value,
            "Language identifiers cannot contain surrounding whitespace",
          ),
      )
      .min(1),
  }),
  briefing: z.strictObject({
    setting: textReferenceSchema,
    incident: textReferenceSchema,
    objective: textReferenceSchema,
    instructions: textReferenceSchema,
  }),
  settings: z.strictObject({
    observationDurationSeconds: positiveSchema,
    transitionDurationSeconds: nonnegativeSchema,
  }),
  observationSceneId: idSchema,
  investigationSceneId: idSchema,
  scenes: z.array(sceneSchema).min(1),
  objects: z.array(objectSchema),
  changes: z.array(changeSchema),
  evidence: z.array(evidenceSchema),
  characters: z.array(characterSchema),
  witnesses: z.array(witnessSchema),
  statements: z.array(statementSchema),
  contradictions: z.array(contradictionSchema),
  deductions: z.array(deductionSchema),
  finalDecision: finalDecisionSchema,
  hints: z.array(hintSchema),
  solution: solutionSchema,
  scoring: scoringSchema,
});
