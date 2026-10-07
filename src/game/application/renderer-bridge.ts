import type { AttemptId, ObjectId, SceneId } from "../domain/identity";
import type { GamePhase } from "../domain/session";

// A neutral target proves the boundary; production visuals/assets belong to later tasks.
export interface RendererProjection {
  readonly attemptId: AttemptId;
  readonly revision: number;
  readonly displayPhase: GamePhase;
  readonly sceneId: SceneId;
  readonly interactionEnabled: boolean;
  readonly target: {
    readonly objectId: ObjectId;
    readonly label: string;
    readonly highlighted: boolean;
  } | null;
}

export interface ObjectSelectionIntent {
  readonly type: "object_selected";
  readonly attemptId: AttemptId;
  readonly projectionRevision: number;
  readonly objectId: ObjectId;
}

export type BridgeResult =
  | { readonly status: "accepted" }
  | {
      readonly status: "rejected";
      readonly reason:
        | "disposed"
        | "stale_attempt"
        | "invalid_revision"
        | "stale_revision"
        | "no_projection"
        | "interaction_disabled"
        | "unknown_target"
        | "unsupported_intent";
    };

export interface RendererBridge {
  publish(projection: RendererProjection): BridgeResult;
  attachRenderer(apply: (projection: RendererProjection) => void): BridgeResult;
  receiveIntent(intent: ObjectSelectionIntent): BridgeResult;
  dispose(): void;
}

export function createRendererBridge<
  State extends { readonly attemptId: AttemptId },
>(application: {
  readonly readState: () => State | null;
  readonly dispatch: (state: State, intent: ObjectSelectionIntent) => void;
}): RendererBridge {
  let disposed = false;
  let projection: RendererProjection | undefined;
  let apply: ((projection: RendererProjection) => void) | undefined;
  const reject = (
    reason: Extract<BridgeResult, { status: "rejected" }>["reason"],
  ): BridgeResult => ({ status: "rejected", reason });
  return {
    publish(next) {
      if (disposed) return reject("disposed");
      if (!Number.isSafeInteger(next.revision) || next.revision < 0)
        return reject("invalid_revision");
      if (application.readState()?.attemptId !== next.attemptId)
        return reject("stale_attempt");
      if (
        projection?.attemptId === next.attemptId &&
        next.revision <= projection.revision
      )
        return reject("stale_revision");
      // Explicitly copy only display fields, preventing structural typing from leaking extra truth.
      projection = Object.freeze({
        attemptId: next.attemptId,
        revision: next.revision,
        displayPhase: next.displayPhase,
        sceneId: next.sceneId,
        interactionEnabled: next.interactionEnabled,
        target:
          next.target === null
            ? null
            : Object.freeze({
                objectId: next.target.objectId,
                label: next.target.label,
                highlighted: next.target.highlighted,
              }),
      });
      apply?.(projection);
      return { status: "accepted" };
    },
    attachRenderer(renderer) {
      if (disposed) return reject("disposed");
      apply = renderer;
      if (
        projection &&
        application.readState()?.attemptId === projection.attemptId
      )
        apply(projection);
      return { status: "accepted" };
    },
    receiveIntent(intent) {
      if (disposed) return reject("disposed");
      if (intent.type !== "object_selected")
        return reject("unsupported_intent");
      const state = application.readState();
      if (!state || state.attemptId !== intent.attemptId)
        return reject("stale_attempt");
      if (!projection) return reject("no_projection");
      if (projection.attemptId !== intent.attemptId)
        return reject("stale_attempt");
      if (
        !Number.isSafeInteger(intent.projectionRevision) ||
        intent.projectionRevision < 0
      )
        return reject("invalid_revision");
      if (projection.revision !== intent.projectionRevision)
        return reject("stale_revision");
      if (!projection.interactionEnabled) return reject("interaction_disabled");
      if (projection.target?.objectId !== intent.objectId)
        return reject("unknown_target");
      // Accepted means delivered, never that the selected object is correct.
      application.dispatch(state, intent);
      return { status: "accepted" };
    },
    dispose() {
      disposed = true;
      projection = undefined;
      apply = undefined;
    },
  };
}
