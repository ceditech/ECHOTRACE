import { describe, expect, it, vi } from "vitest";
import { createRendererBridge } from "@/game/application/renderer-bridge";
import type {
  ObjectSelectionIntent,
  RendererProjection,
} from "@/game/application/renderer-bridge";
import { mountShell } from "@/game/renderer/shell-lifecycle";
import {
  createInitialSession,
  applySessionCommand,
  getNextPhase,
} from "@/game/domain/session-machine";
import { evaluateSelection } from "@/game/domain/selection";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import { createSyntheticCase } from "../fixtures/synthetic-case";

function projection(attemptId = "attempt-a", revision = 0): RendererProjection {
  return {
    attemptId,
    revision,
    displayPhase: "investigation_active",
    sceneId: "neutral",
    interactionEnabled: true,
    target: { objectId: "target", label: "Neutral", highlighted: false },
  };
}
function intent(
  attemptId = "attempt-a",
  projectionRevision = 0,
): ObjectSelectionIntent {
  return {
    type: "object_selected",
    attemptId,
    projectionRevision,
    objectId: "target",
  };
}
function setup() {
  let state = { attemptId: "attempt-a", marker: 0 };
  const dispatch = vi.fn();
  const apply = vi.fn();
  const bridge = createRendererBridge({ readState: () => state, dispatch });
  bridge.attachRenderer(apply);
  return {
    bridge,
    dispatch,
    apply,
    setState: (next: typeof state) => {
      state = next;
    },
  };
}

describe("T12 instance-local renderer bridge", () => {
  it("updates an existing renderer and refuses older or equal revisions", () => {
    const test = setup();
    expect(test.bridge.publish(projection())).toEqual({ status: "accepted" });
    test.bridge.publish(projection("attempt-a", 12));
    expect(test.bridge.publish(projection("attempt-a", 11))).toEqual({
      status: "rejected",
      reason: "stale_revision",
    });
    expect(test.bridge.publish(projection("attempt-a", 12))).toEqual({
      status: "rejected",
      reason: "stale_revision",
    });
    expect(test.apply).toHaveBeenCalledTimes(2);
    expect(test.apply.mock.lastCall?.[0].revision).toBe(12);
  });
  it("copies frozen display-only values without mutating or leaking extra truth", () => {
    const test = setup();
    const input = Object.freeze({
      ...projection(),
      target: Object.freeze(projection().target),
      solution: "hidden",
      score: 999,
    });
    test.bridge.publish(input);
    const displayed: RendererProjection = test.apply.mock.lastCall?.[0];
    expect(displayed).toEqual(projection());
    expect(displayed).not.toBe(input);
    expect(displayed.target).not.toBe(input.target);
    expect(Object.isFrozen(displayed)).toBe(true);
    expect(Object.isFrozen(displayed.target)).toBe(true);
    expect(input.solution).toBe("hidden");
  });
  it("dispatches semantic intent with the latest authoritative state", () => {
    const test = setup();
    test.bridge.publish(projection());
    test.setState({ attemptId: "attempt-a", marker: 7 });
    expect(test.bridge.receiveIntent(intent())).toEqual({ status: "accepted" });
    expect(test.dispatch).toHaveBeenCalledWith(
      { attemptId: "attempt-a", marker: 7 },
      intent(),
    );
  });
  it("rejects obsolete attempt input and projections, allowing a new attempt to start at zero", () => {
    const test = setup();
    test.bridge.publish(projection("attempt-a", 12));
    test.setState({ attemptId: "attempt-b", marker: 0 });
    expect(test.bridge.receiveIntent(intent("attempt-a", 12))).toEqual({
      status: "rejected",
      reason: "stale_attempt",
    });
    expect(test.bridge.publish(projection("attempt-a", 13))).toEqual({
      status: "rejected",
      reason: "stale_attempt",
    });
    expect(test.bridge.publish(projection("attempt-b", 0))).toEqual({
      status: "accepted",
    });
    expect(test.dispatch).not.toHaveBeenCalled();
    expect(test.bridge.receiveIntent(intent("attempt-b", 0))).toEqual({
      status: "accepted",
    });
  });
  it("rejects events from disposed mounts even when a remount uses the same attempt", () => {
    const previous = setup();
    previous.bridge.publish(projection());
    previous.bridge.dispose();
    previous.bridge.dispose();
    const current = setup();
    current.bridge.publish(projection());
    expect(previous.bridge.receiveIntent(intent())).toEqual({
      status: "rejected",
      reason: "disposed",
    });
    expect(previous.bridge.publish(projection("attempt-a", 1))).toEqual({
      status: "rejected",
      reason: "disposed",
    });
    expect(previous.bridge.attachRenderer(vi.fn())).toEqual({
      status: "rejected",
      reason: "disposed",
    });
    expect(previous.dispatch).not.toHaveBeenCalled();
    expect(current.bridge.receiveIntent(intent())).toEqual({
      status: "accepted",
    });
    expect(current.dispatch).toHaveBeenCalledOnce();
  });
  it("rejects invalid revisions and stale projection intents", () => {
    const test = setup();
    for (const revision of [
      -1,
      0.5,
      NaN,
      Infinity,
      Number.MAX_SAFE_INTEGER + 1,
    ])
      expect(test.bridge.publish(projection("attempt-a", revision))).toEqual({
        status: "rejected",
        reason: "invalid_revision",
      });
    test.bridge.publish(projection("attempt-a", 2));
    expect(test.bridge.receiveIntent(intent("attempt-a", 1))).toEqual({
      status: "rejected",
      reason: "stale_revision",
    });
    expect(test.bridge.receiveIntent(intent("attempt-a", NaN))).toEqual({
      status: "rejected",
      reason: "invalid_revision",
    });
    expect(test.dispatch).not.toHaveBeenCalled();
  });
  it("rejects input before projection, while disabled, and for unknown targets", () => {
    const test = setup();
    expect(test.bridge.receiveIntent(intent())).toEqual({
      status: "rejected",
      reason: "no_projection",
    });
    test.bridge.publish({ ...projection(), interactionEnabled: false });
    expect(test.bridge.receiveIntent(intent())).toEqual({
      status: "rejected",
      reason: "interaction_disabled",
    });
    test.bridge.publish(projection("attempt-a", 1));
    expect(
      test.bridge.receiveIntent({
        ...intent("attempt-a", 1),
        objectId: "other",
      }),
    ).toEqual({ status: "rejected", reason: "unknown_target" });
    test.bridge.publish({ ...projection("attempt-a", 2), target: null });
    expect(test.bridge.receiveIntent(intent("attempt-a", 2))).toEqual({
      status: "rejected",
      reason: "unknown_target",
    });
    expect(test.dispatch).not.toHaveBeenCalled();
  });
  it("buffers the latest projection during lazy loading and updates without runtime recreation", async () => {
    const bridge = createRendererBridge({
      readState: () => ({ attemptId: "attempt-a" }),
      dispatch: vi.fn(),
    });
    const runtime = {
      resize: vi.fn(),
      destroy: vi.fn(),
      applyProjection: vi.fn(),
    };
    const factory = vi.fn(() => runtime);
    const cleanup = mountShell(
      {},
      async () => factory,
      () => vi.fn(),
      {
        onReady: vi.fn(),
        onFailure: vi.fn(),
        onRuntime: (active) => bridge.attachRenderer(active.applyProjection),
      },
    );
    bridge.publish(projection());
    bridge.publish(projection("attempt-a", 1));
    await Promise.resolve();
    await Promise.resolve();
    expect(factory).toHaveBeenCalledOnce();
    expect(runtime.applyProjection).toHaveBeenCalledOnce();
    expect(runtime.applyProjection).toHaveBeenCalledWith(
      projection("attempt-a", 1),
    );
    bridge.publish(projection("attempt-a", 2));
    expect(runtime.applyProjection).toHaveBeenCalledTimes(2);
    expect(factory).toHaveBeenCalledOnce();
    bridge.dispose();
    cleanup();
    expect(runtime.destroy).toHaveBeenCalledOnce();
  });
  it("leaves selection correctness to T07 through the injected application dispatch", () => {
    const validated = validateCaseDefinition(createSyntheticCase());
    if (!validated.ok) throw new Error("Invalid fixture");
    const definition = validated.value;
    let state = createInitialSession(definition, {
      attemptId: "attempt-a",
      startedAt: 100,
    });
    while (state.currentPhase !== "investigation_active") {
      const to = getNextPhase(state.currentPhase);
      if (!to) throw new Error("Unexpected phase");
      const advanced = applySessionCommand(
        state,
        { type: "advance_phase", from: state.currentPhase, to, at: 110 },
        { ok: true },
      );
      if (!advanced.ok) throw new Error(advanced.code);
      state = advanced.state;
    }
    const dispatch = vi.fn(
      (current: typeof state, selection: ObjectSelectionIntent) => {
        state = evaluateSelection(definition, current, {
          objectId: selection.objectId,
          selectedAt: 120,
        }).state;
      },
    );
    const bridge = createRendererBridge({ readState: () => state, dispatch });
    bridge.publish({
      ...projection(),
      target: {
        objectId: "fixture-object",
        label: "Neutral",
        highlighted: false,
      },
    });
    bridge.receiveIntent({ ...intent(), objectId: "fixture-object" });
    expect(dispatch).toHaveBeenCalledOnce();
    expect(state.correctDiscoveries).toHaveLength(1);
  });
});
