import type { CaseDefinition } from "../domain/case";
import type { ObjectVisual } from "../domain/scene";

export type NeutralSnapshot = "original" | "changed";

export interface NeutralScene<Snapshot extends NeutralSnapshot> {
  readonly snapshot: Snapshot;
  readonly sceneId: string;
  readonly objects: readonly (Pick<
    ObjectVisual,
    "objectId" | "position" | "size" | "rotationDegrees"
  > & { readonly label: string })[];
}

export interface ObservationRenderRequest {
  readonly attemptId: string;
  readonly revision: number;
  readonly scene: NeutralScene<"original">;
}

export type ObservationRenderFailure =
  | "runtime_load_failed"
  | "runtime_initialization_failed"
  | "scene_initialization_failed";

export type ObservationRenderOutcome = Pick<
  ObservationRenderRequest,
  "attemptId" | "revision"
> &
  (
    | { readonly type: "observation_ready" }
    | {
        readonly type: "observation_failed";
        readonly code: ObservationRenderFailure;
      }
  );

export function projectNeutralScene<Snapshot extends NeutralSnapshot>(
  definition: CaseDefinition,
  snapshot: Snapshot,
):
  | { readonly ok: true; readonly scene: NeutralScene<Snapshot> }
  | {
      readonly ok: false;
      readonly code: "unsupported_snapshot" | "invalid_scene";
    } {
  if (snapshot !== "original" && snapshot !== "changed")
    return { ok: false, code: "unsupported_snapshot" };
  const id =
    snapshot === "original"
      ? definition.observationSceneId
      : definition.investigationSceneId;
  const scene = definition.scenes.find((entry) => entry.id === id);
  if (
    !scene ||
    definition.observationSceneId === definition.investigationSceneId
  )
    return { ok: false, code: "invalid_scene" };
  const knownObjects = new Set(definition.objects.map(({ id }) => id));
  const seen = new Set<string>();
  const objects: NeutralScene<Snapshot>["objects"][number][] = [];
  for (const { objectId, position, size, rotationDegrees } of scene.visuals) {
    if (
      !knownObjects.has(objectId) ||
      seen.has(objectId) ||
      ![position.x, position.y, size.width, size.height].every(
        (value) => Number.isFinite(value) && value >= 0 && value <= 1,
      ) ||
      size.width === 0 ||
      size.height === 0 ||
      !Number.isFinite(rotationDegrees)
    )
      return { ok: false, code: "invalid_scene" };
    seen.add(objectId);
    // Development labels come from stable IDs, without exposing authored descriptions.
    objects.push({
      objectId,
      label: objectId.replace(/^object-/, "").replaceAll("-", " "),
      position: { ...position },
      size: { ...size },
      rotationDegrees,
    });
  }
  return { ok: true, scene: { snapshot, sceneId: id, objects } };
}
