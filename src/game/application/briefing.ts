import type { CaseDefinition, CaseMetadata } from "../domain/case";
import type { CaseSession } from "../domain/session";
import type { SessionInitialization } from "../domain/session-machine";
import {
  applySessionCommand,
  createInitialSession,
} from "../domain/session-machine";
import type { CaseSource } from "./case-source";
import { loadCase } from "@/cases/load-case";
import { projectNeutralScene } from "./neutral-scene";
import type {
  NeutralScene,
  ObservationRenderFailure,
  ObservationRenderOutcome,
} from "./neutral-scene";

type ObservationState =
  | { readonly status: "loading" | "ready"; readonly revision: number }
  | {
      readonly status: "failed";
      readonly revision: number;
      readonly code:
        ObservationRenderFailure | "invalid_scene" | "phase_rejected";
    };

export interface BriefingModel {
  readonly caseId: string;
  readonly title: string;
  readonly setting: string;
  readonly incident: string;
  readonly objective: string;
  readonly instructions: string;
  readonly difficulty: CaseMetadata["difficulty"];
}

export function prepareBriefing(
  definition: CaseDefinition,
  catalog: Readonly<Record<string, string>>,
):
  | { readonly ok: true; readonly model: BriefingModel }
  | { readonly ok: false } {
  const title = catalog[definition.metadata.title.key];
  const setting = catalog[definition.briefing.setting.key];
  const incident = catalog[definition.briefing.incident.key];
  const objective = catalog[definition.briefing.objective.key];
  const instructions = catalog[definition.briefing.instructions.key];
  if (
    !title?.trim() ||
    !setting?.trim() ||
    !incident?.trim() ||
    !objective?.trim() ||
    !instructions?.trim()
  )
    return { ok: false };
  // Explicit display fields prevent structural typing from forwarding author truth.
  return {
    ok: true,
    model: {
      caseId: definition.id,
      title,
      setting,
      incident,
      objective,
      instructions,
      difficulty: definition.metadata.difficulty,
    },
  };
}

export type BriefingFailure =
  "case_load_failed" | "missing_briefing_text" | "invalid_initialization";
export type BriefingState =
  | { readonly status: "loading"; readonly requestId: number }
  | {
      readonly status: "failed";
      readonly requestId: number;
      readonly code: BriefingFailure;
    }
  | {
      readonly status: "ready";
      readonly requestId: number;
      readonly model: BriefingModel;
      readonly session: CaseSession;
      readonly startError: boolean;
      readonly original: NeutralScene<"original"> | null;
      readonly observation: ObservationState | null;
    };
export type BriefingAction =
  | {
      readonly type: "loaded";
      readonly requestId: number;
      readonly model: BriefingModel;
      readonly session: CaseSession;
      readonly original: NeutralScene<"original"> | null;
    }
  | {
      readonly type: "failed";
      readonly requestId: number;
      readonly code: BriefingFailure;
    }
  | { readonly type: "retry" }
  | { readonly type: "start"; readonly attemptId: string; readonly at: number }
  | (Extract<ObservationRenderOutcome, { type: "observation_ready" }> & {
      readonly at: number;
    })
  | Extract<ObservationRenderOutcome, { type: "observation_failed" }>
  | { readonly type: "retry_observation" };
export const initialBriefingState: BriefingState = {
  status: "loading",
  requestId: 0,
};

export const BRIEFING_LOAD_TIMEOUT_MS = 15_000;

// Initialization occurs after loading at the asynchronous boundary, never in a render/reducer.
export async function loadBriefing(
  requestId: number,
  source: CaseSource,
  catalog: Readonly<Record<string, string>>,
  initialize: () => SessionInitialization,
  isCurrent: () => boolean,
  signal?: AbortSignal,
): Promise<BriefingAction | null> {
  if (!isCurrent() || signal?.aborted) return null;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let cancel: (() => void) | undefined;
  const deadline = new Promise<null>((resolve) => {
    timeout = setTimeout(() => resolve(null), BRIEFING_LOAD_TIMEOUT_MS);
    cancel = () => resolve(null);
    signal?.addEventListener("abort", cancel, { once: true });
  });
  let loaded: Awaited<ReturnType<typeof loadCase>> | null;
  try {
    loaded = await Promise.race([loadCase("case-001", source), deadline]);
  } finally {
    clearTimeout(timeout);
    if (cancel) signal?.removeEventListener("abort", cancel);
  }
  if (!isCurrent() || signal?.aborted) return null;
  if (loaded === null)
    return { type: "failed", requestId, code: "case_load_failed" };
  if (!loaded.ok)
    return { type: "failed", requestId, code: "case_load_failed" };
  const prepared = prepareBriefing(loaded.value, catalog);
  if (!prepared.ok)
    return { type: "failed", requestId, code: "missing_briefing_text" };
  try {
    const session = createInitialSession(loaded.value, initialize());
    const original = projectNeutralScene(loaded.value, "original");
    return {
      type: "loaded",
      requestId,
      model: prepared.model,
      session,
      original: original.ok ? original.scene : null,
    };
  } catch {
    return { type: "failed", requestId, code: "invalid_initialization" };
  }
}

export function reduceBriefing(
  state: BriefingState,
  action: BriefingAction,
): BriefingState {
  switch (action.type) {
    case "loaded":
      if (state.status !== "loading" || state.requestId !== action.requestId)
        return state;
      return {
        status: "ready",
        requestId: state.requestId,
        model: action.model,
        session: action.session,
        startError: false,
        original: action.original,
        observation: null,
      };
    case "failed":
      if (state.status !== "loading" || state.requestId !== action.requestId)
        return state;
      return {
        status: "failed",
        requestId: state.requestId,
        code: action.code,
      };
    case "retry":
      return state.status === "failed"
        ? { status: "loading", requestId: state.requestId + 1 }
        : state;
    case "start": {
      if (
        state.status !== "ready" ||
        state.session.attemptId !== action.attemptId ||
        state.session.currentPhase !== "case_briefing"
      )
        return state;
      const result = applySessionCommand(
        state.session,
        {
          type: "advance_phase",
          from: "case_briefing",
          to: "observation_intro",
          at: action.at,
        },
        { ok: true },
      );
      return result.ok
        ? {
            ...state,
            session: result.state,
            startError: false,
            observation: state.original
              ? { status: "loading", revision: 0 }
              : { status: "failed", revision: 0, code: "invalid_scene" },
          }
        : { ...state, startError: true };
    }
    case "observation_ready":
    case "observation_failed": {
      if (
        state.status !== "ready" ||
        state.session.currentPhase !== "observation_intro" ||
        state.session.attemptId !== action.attemptId ||
        state.observation?.status !== "loading" ||
        state.observation.revision !== action.revision ||
        !state.original
      )
        return state;
      if (action.type === "observation_failed")
        return {
          ...state,
          observation: {
            status: "failed",
            revision: action.revision,
            code: action.code,
          },
        };
      const result = applySessionCommand(
        state.session,
        {
          type: "advance_phase",
          from: "observation_intro",
          to: "observation_active",
          at: action.at,
        },
        { ok: true },
      );
      return result.ok
        ? {
            ...state,
            session: result.state,
            observation: { status: "ready", revision: action.revision },
          }
        : {
            ...state,
            observation: {
              status: "failed",
              revision: action.revision,
              code: "phase_rejected",
            },
          };
    }
    case "retry_observation":
      return state.status === "ready" &&
        state.session.currentPhase === "observation_intro" &&
        state.original &&
        state.observation?.status === "failed"
        ? {
            ...state,
            observation: {
              status: "loading",
              revision: state.observation.revision + 1,
            },
          }
        : state;
  }
}
