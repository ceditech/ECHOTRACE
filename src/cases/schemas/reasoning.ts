import { z } from "zod";
import {
  assetReferenceSchema,
  hintLevelSchema,
  idSchema,
  textReferenceSchema,
} from "./primitives";

export const informationSchema = z.strictObject({
  kind: z.enum([
    "change",
    "evidence",
    "statement",
    "fact",
    "event",
    "contradiction",
    "deduction",
  ]),
  id: idSchema,
});
const informationList = z.array(informationSchema);
const idList = z.array(idSchema);
export const evidenceSourceSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("change"), changeId: idSchema }),
  z.strictObject({ kind: z.literal("object"), objectId: idSchema }),
  z.strictObject({ kind: z.literal("document"), objectId: idSchema }),
  z.strictObject({ kind: z.literal("statement"), statementId: idSchema }),
  z.strictObject({ kind: z.literal("timestamp"), eventId: idSchema }),
  z.strictObject({ kind: z.literal("environment"), sceneId: idSchema }),
  z.strictObject({ kind: z.literal("deduction"), deductionId: idSchema }),
]);
export const evidenceSchema = z.strictObject({
  id: idSchema,
  title: textReferenceSchema,
  description: textReferenceSchema,
  source: evidenceSourceSchema,
  category: z.enum([
    "primary",
    "supporting",
    "context",
    "contradictory",
    "exculpatory",
    "red_herring",
  ]),
  isRequired: z.boolean(),
  relatedObjectIds: idList,
  relatedCharacterIds: idList,
  relatedStatementIds: idList,
  supportingInformation: informationList,
  visual: assetReferenceSchema.exactOptional(),
});
export const characterSchema = z.strictObject({
  id: idSchema,
  name: textReferenceSchema,
  role: textReferenceSchema,
  publicDescription: textReferenceSchema,
  relationshipToIncident: textReferenceSchema,
  portrait: assetReferenceSchema.exactOptional(),
});
export const witnessSchema = z.strictObject({
  id: idSchema,
  characterId: idSchema,
  statementIds: idList,
  relatedEvidenceIds: idList,
});
export const statementSchema = z.strictObject({
  id: idSchema,
  witnessId: idSchema,
  text: textReferenceSchema,
  truthStatus: z.enum([
    "truthful",
    "incomplete",
    "mistaken",
    "misleading",
    "deliberately_false",
  ]),
  relatedInformation: informationList,
});
export const contradictionSchema = z.strictObject({
  id: idSchema,
  kind: z.enum([
    "visual_testimony",
    "evidence_testimony",
    "testimony_testimony",
    "timeline",
    "object_relationship",
  ]),
  conflictingInformation: z.tuple([informationSchema, informationSchema]),
  explanation: textReferenceSchema,
});
export const deductionSchema = z.strictObject({
  id: idSchema,
  kind: z.enum(["single_choice", "multiple_choice"]),
  question: textReferenceSchema,
  choices: z
    .array(
      z.strictObject({
        id: idSchema,
        text: textReferenceSchema,
        supportingInformation: informationList,
      }),
    )
    .min(1),
  supportingInformation: informationList,
});
export const deductionAnswerSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    kind: z.literal("single_choice"),
    deductionId: idSchema,
    choiceId: idSchema,
  }),
  z.strictObject({
    kind: z.literal("multiple_choice"),
    deductionId: idSchema,
    choiceIds: idList.min(1),
  }),
]);
export const finalDecisionSchema = z.strictObject({
  question: textReferenceSchema,
  choices: z
    .array(z.strictObject({ id: idSchema, text: textReferenceSchema }))
    .min(1),
});
export const hintSchema = z.strictObject({
  id: idSchema,
  level: hintLevelSchema,
  text: textReferenceSchema,
  relatedInformation: informationList,
});
export const solutionSchema = z.strictObject({
  correctDecisionId: idSchema,
  deductionAnswers: z.array(deductionAnswerSchema),
  facts: z.array(
    z.strictObject({ id: idSchema, description: textReferenceSchema }),
  ),
  events: z.array(
    z.strictObject({
      id: idSchema,
      description: textReferenceSchema,
      relatedCharacterIds: idList,
      relatedObjectIds: idList,
    }),
  ),
  explanation: textReferenceSchema,
  reconstruction: z.array(
    z.strictObject({
      eventId: idSchema,
      explanation: textReferenceSchema,
      supportingInformation: informationList,
    }),
  ),
  supportingInformation: informationList,
});
