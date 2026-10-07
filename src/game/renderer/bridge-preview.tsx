"use client";

import { useReducer } from "react";
import type {
  ObjectSelectionIntent,
  RendererProjection,
} from "../application/renderer-bridge";
import { PhaserHost } from "./phaser-host";

// Synthetic presentation state only; this preview is not a CaseSession or a case solution.
const initial: RendererProjection = {
  attemptId: "bridge-preview",
  revision: 0,
  displayPhase: "investigation_active",
  sceneId: "neutral-preview",
  interactionEnabled: true,
  target: {
    objectId: "preview-target",
    label: "EchoTrace",
    highlighted: false,
  },
};
type PreviewAction =
  { readonly type: "update" | "toggle_interaction" } | ObjectSelectionIntent;
function reducePreview(
  state: RendererProjection,
  action: PreviewAction,
): RendererProjection {
  switch (action.type) {
    case "update":
      return {
        ...state,
        revision: state.revision + 1,
        target: {
          objectId: "preview-target",
          label: "Preview updated",
          highlighted: false,
        },
      };
    case "toggle_interaction":
      return {
        ...state,
        revision: state.revision + 1,
        interactionEnabled: !state.interactionEnabled,
      };
    case "object_selected":
      // The reducer reads current state even if an action was queued before another update.
      if (
        action.attemptId !== state.attemptId ||
        action.projectionRevision !== state.revision ||
        action.objectId !== state.target?.objectId ||
        !state.interactionEnabled
      )
        return state;
      return {
        ...state,
        revision: state.revision + 1,
        target: {
          ...state.target,
          label: "Selection received",
          highlighted: true,
        },
      };
  }
}

export function BridgePreview() {
  const [projection, dispatch] = useReducer(reducePreview, initial);
  return (
    <>
      <PhaserHost projection={projection} onIntent={dispatch} />
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "update" })}
          className="rounded-lg border border-slate-600 px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Update preview
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "toggle_interaction" })}
          className="rounded-lg border border-slate-600 px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {projection.interactionEnabled
            ? "Disable interaction"
            : "Enable interaction"}
        </button>
        <button
          type="button"
          disabled={!projection.interactionEnabled}
          onClick={() =>
            dispatch({
              type: "object_selected",
              attemptId: projection.attemptId,
              projectionRevision: projection.revision,
              objectId: "preview-target",
            })
          }
          className="rounded-lg border border-slate-600 px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50"
        >
          Select preview target
        </button>
      </div>
      <p role="status" className="mt-3 text-sm text-slate-300">
        {projection.target?.label} · revision {projection.revision}
      </p>
    </>
  );
}
