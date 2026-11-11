"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { mountShell } from "./shell-lifecycle";
import { createRendererBridge } from "../application/renderer-bridge";
import type {
  ObservationRenderFailure,
  ObservationRenderOutcome,
  ObservationRenderRequest,
} from "../application/neutral-scene";
import type {
  ObjectSelectionIntent,
  RendererBridge,
  RendererProjection,
} from "../application/renderer-bridge";

export function PhaserHost({
  projection = null,
  onIntent,
  observation,
  onObservationOutcome,
}: {
  readonly projection?: RendererProjection | null;
  readonly onIntent?: (intent: ObjectSelectionIntent) => void;
  readonly observation?: ObservationRenderRequest;
  readonly onObservationOutcome?: (outcome: ObservationRenderOutcome) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const bridge = useRef<RendererBridge | null>(null);
  const readCurrent = useEffectEvent(() => projection);
  const readObservation = useEffectEvent(() => observation);
  const dispatchObservation = useEffectEvent(
    (outcome: ObservationRenderOutcome) => onObservationOutcome?.(outcome),
  );
  const dispatchCurrent = useEffectEvent(
    (_state: RendererProjection, intent: ObjectSelectionIntent) =>
      onIntent?.(intent),
  );
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading",
  );
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    // Observation hosts are keyed by attempt/revision; an outcome belongs to that mount.
    const request = readObservation();
    let disposed = false;
    const reportFailure = (code: ObservationRenderFailure) => {
      if (disposed) return;
      if (request)
        dispatchObservation({
          type: "observation_failed",
          attemptId: request.attemptId,
          revision: request.revision,
          code,
        });
      else setStatus("failed");
    };
    const connection = createRendererBridge({
      readState: () => readCurrent(),
      dispatch: (state, intent) => dispatchCurrent(state, intent),
    });
    bridge.current = connection;
    const cleanup = mountShell(
      element,
      async () => {
        const { createShellRuntime } = await import("./phaser-runtime");
        return (host: HTMLElement, ready: () => void) =>
          createShellRuntime(
            host,
            ready,
            (intent) => connection.receiveIntent(intent),
            request && {
              original: request.scene,
              onFailure: () => reportFailure("scene_initialization_failed"),
            },
          );
      },
      (host, resize) => {
        const observer = new ResizeObserver(resize);
        observer.observe(host);
        return () => observer.disconnect();
      },
      {
        onReady: () => {
          if (request)
            dispatchObservation({
              type: "observation_ready",
              attemptId: request.attemptId,
              revision: request.revision,
            });
          else setStatus("ready");
        },
        onFailure: ({ code }) => reportFailure(code),
        onRuntime: (runtime) =>
          connection.attachRenderer((next) => runtime.applyProjection(next)),
      },
    );
    return () => {
      disposed = true;
      connection.dispose();
      bridge.current = null;
      cleanup();
    };
  }, []);
  useEffect(() => {
    if (projection) bridge.current?.publish(projection);
  }, [projection]);
  return (
    <figure className="mt-8">
      <div
        ref={container}
        data-testid="phaser-host"
        className="relative h-[min(60vh,28rem)] min-h-48 w-full overflow-hidden rounded-xl bg-slate-950 ring-1 ring-slate-700"
      />
      {!observation && (
        <figcaption
          role={status === "failed" ? "alert" : "status"}
          className="mt-3 text-sm text-slate-300"
        >
          {status === "failed"
            ? "The scene could not load. Reload the page to try again."
            : status === "loading"
              ? "Loading scene…"
              : "Observe. Remember. Deduce. — Scene preview"}
        </figcaption>
      )}
    </figure>
  );
}
