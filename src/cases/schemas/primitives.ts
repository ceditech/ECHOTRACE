import { z } from "zod";

// Stable identifiers are opaque tokens, never paths or executable module names.
export const idSchema = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_-]*$/);
export const textReferenceSchema = z.strictObject({
  key: z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_.-]*$/),
});
export const assetReferenceSchema = z.strictObject({ id: idSchema });
export const nonnegativeSchema = z.number().finite().nonnegative();
export const positiveSchema = z.number().finite().positive();
export const pointSchema = z.strictObject({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
});
export const sizeSchema = z.strictObject({
  width: positiveSchema.max(1),
  height: positiveSchema.max(1),
});
export const hintLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);
