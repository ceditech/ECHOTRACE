import { z } from "zod";
import {
  assetReferenceSchema,
  idSchema,
  nonnegativeSchema,
  pointSchema,
  positiveSchema,
  sizeSchema,
  textReferenceSchema,
} from "./primitives";

export const objectSchema = z.strictObject({
  id: idSchema,
  description: textReferenceSchema,
  characterId: idSchema.exactOptional(),
});
export const visualSchema = z.strictObject({
  objectId: idSchema,
  asset: assetReferenceSchema,
  position: pointSchema,
  size: sizeSchema,
  rotationDegrees: z.number().finite(),
});
export const geometrySchema = z.discriminatedUnion("kind", [
  z.strictObject({
    kind: z.literal("rectangle"),
    origin: pointSchema,
    size: sizeSchema,
  }),
  z.strictObject({
    kind: z.literal("circle"),
    center: pointSchema,
    radius: positiveSchema.max(1),
  }),
]);
export const sceneSchema = z.strictObject({
  id: idSchema,
  background: assetReferenceSchema,
  visuals: z.array(visualSchema),
  interactionRegions: z.array(
    z.strictObject({ objectId: idSchema, geometry: geometrySchema }),
  ),
});
export const relationshipSchema = z.strictObject({
  objectId: idSchema,
  relation: z.enum(["under", "beside", "on", "near", "inside"]),
  relatedObjectId: idSchema,
});
const changeBase = {
  id: idSchema,
  observationSceneId: idSchema,
  investigationSceneId: idSchema,
  significance: z.enum(["meaningful", "decorative"]),
  isRequired: z.boolean(),
};
export const changeSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    ...changeBase,
    kind: z.literal("object_added"),
    objectId: idSchema,
  }),
  z.strictObject({
    ...changeBase,
    kind: z.literal("object_removed"),
    objectId: idSchema,
  }),
  z.strictObject({
    ...changeBase,
    kind: z.literal("object_moved"),
    objectId: idSchema,
    from: pointSchema,
    to: pointSchema,
  }),
  z.strictObject({
    ...changeBase,
    kind: z.literal("object_rotated"),
    objectId: idSchema,
    fromDegrees: z.number().finite(),
    toDegrees: z.number().finite(),
  }),
  z.strictObject({
    ...changeBase,
    kind: z.literal("object_opened_closed"),
    objectId: idSchema,
    before: z.enum(["open", "closed"]),
    after: z.enum(["open", "closed"]),
  }),
  z.strictObject({
    ...changeBase,
    kind: z.literal("object_exchanged"),
    objectIds: z.tuple([idSchema, idSchema]),
  }),
  z.strictObject({
    ...changeBase,
    kind: z.literal("object_state_changed"),
    objectId: idSchema,
    beforeState: z.string().min(1),
    afterState: z.string().min(1),
  }),
  z.strictObject({
    ...changeBase,
    kind: z.literal("object_quantity_changed"),
    objectId: idSchema,
    beforeQuantity: nonnegativeSchema.int(),
    afterQuantity: nonnegativeSchema.int(),
  }),
  z.strictObject({
    ...changeBase,
    kind: z.literal("relationship_changed"),
    before: relationshipSchema,
    after: relationshipSchema,
  }),
]);
