import type {
  ObjectSelectionIntent,
  RendererProjection,
} from "@/game/application/renderer-bridge";

// Compile-time boundary checks; never imported by application source.
export function verifyReadonlyProjection(projection: RendererProjection) {
  // @ts-expect-error The renderer cannot advance the authoritative projection revision.
  projection.revision = 1;
  if (projection.target) {
    // @ts-expect-error Renderer feedback is supplied by the application.
    projection.target.highlighted = true;
  }
  // @ts-expect-error Canonical answers are absent from renderer contracts.
  return projection.solution;
}
export const invalidIntent: ObjectSelectionIntent = {
  type: "object_selected",
  attemptId: "contract-attempt",
  projectionRevision: 0,
  objectId: "contract-object",
  // @ts-expect-error Phaser instances and screen coordinates are not semantic object identity.
  pointer: { x: 10, y: 20 },
};
