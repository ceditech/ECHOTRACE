import { afterEach, describe, expect, it, vi } from "vitest";
import catalog from "@/cases/content/case-001/en.json";
import raw from "@/cases/content/case-001/case.json";
import { bundledCaseSource } from "@/infrastructure/cases/bundled-case-source";
import type { CaseSourceResult } from "@/game/application/case-source";
import {
  BRIEFING_LOAD_TIMEOUT_MS,
  initialBriefingState,
  loadBriefing,
  reduceBriefing,
} from "@/game/application/briefing";

const initialization = { attemptId: "briefing-attempt", startedAt: 100 };

describe("T16 trusted briefing boundary", () => {
  afterEach(() => vi.useRealTimers());
  it("bounds a stalled load, releases its timer and permits retry", async () => {
    vi.useFakeTimers();
    const initialize = vi.fn(() => initialization);
    const pending = loadBriefing(
      0,
      { read: () => new Promise(() => undefined) },
      catalog,
      initialize,
      () => true,
    );
    await vi.advanceTimersByTimeAsync(BRIEFING_LOAD_TIMEOUT_MS);
    const action = await pending;
    expect(action).toEqual({
      type: "failed",
      requestId: 0,
      code: "case_load_failed",
    });
    expect(initialize).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    if (!action) throw new Error("Missing timeout result");
    expect(
      reduceBriefing(reduceBriefing(initialBriefingState, action), {
        type: "retry",
      }),
    ).toEqual({ status: "loading", requestId: 1 });
  });
  it("cancels stalled loading on unmount and immediately clears the deadline", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const initialize = vi.fn(() => initialization);
    const pending = loadBriefing(
      0,
      { read: () => new Promise(() => undefined) },
      catalog,
      initialize,
      () => true,
      controller.signal,
    );
    controller.abort();
    expect(await pending).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
    expect(initialize).not.toHaveBeenCalled();
  });
  it("loads registered content into one case_briefing session and starts without advancing observation", async () => {
    const initialize = vi.fn(() => initialization);
    const action = await loadBriefing(
      0,
      bundledCaseSource,
      catalog,
      initialize,
      () => true,
    );
    if (!action || action.type !== "loaded")
      throw new Error(JSON.stringify(action));
    expect(initialize).toHaveBeenCalledOnce();
    expect(action.session).toMatchObject({
      currentPhase: "case_briefing",
      caseId: "case-001",
      caseVersion: 1,
      observationStartedAt: null,
    });
    const ready = reduceBriefing(initialBriefingState, action);
    const started = reduceBriefing(ready, {
      type: "start",
      attemptId: initialization.attemptId,
      at: 120,
    });
    expect(started).toMatchObject({
      status: "ready",
      session: {
        attemptId: initialization.attemptId,
        currentPhase: "observation_intro",
        observationStartedAt: null,
        completedAt: null,
        completionStatus: "in_progress",
        evidenceCollected: [],
        deductionAnswers: [],
        finalDecision: null,
      },
    });
    expect(initialize).toHaveBeenCalledOnce();
  });
  it("bounds source failures and never initializes an attempt", async () => {
    const initialize = vi.fn(() => initialization);
    const action = await loadBriefing(
      0,
      {
        read: async () => {
          throw new Error("private source path");
        },
      },
      catalog,
      initialize,
      () => true,
    );
    expect(action).toEqual({
      type: "failed",
      requestId: 0,
      code: "case_load_failed",
    });
    expect(initialize).not.toHaveBeenCalled();
  });
  it("prevents initialization when required text cannot be resolved", async () => {
    const initialize = vi.fn(() => initialization);
    expect(
      await loadBriefing(0, bundledCaseSource, {}, initialize, () => true),
    ).toEqual({ type: "failed", requestId: 0, code: "missing_briefing_text" });
    expect(initialize).not.toHaveBeenCalled();
  });
  it.each([
    { attemptId: " ", startedAt: 100 },
    { attemptId: "attempt", startedAt: NaN },
    { attemptId: "attempt", startedAt: Infinity },
  ])("bounds invalid initialization %j", async (input) => {
    expect(
      await loadBriefing(
        0,
        bundledCaseSource,
        catalog,
        () => input,
        () => true,
      ),
    ).toEqual({ type: "failed", requestId: 0, code: "invalid_initialization" });
  });
  it("bounds initialization-provider failures", async () => {
    expect(
      await loadBriefing(
        0,
        bundledCaseSource,
        catalog,
        () => {
          throw new Error("identity provider unavailable");
        },
        () => true,
      ),
    ).toEqual({ type: "failed", requestId: 0, code: "invalid_initialization" });
  });
  it("ignores a delayed completion after unmount before requesting attempt identity", async () => {
    let finish: (result: CaseSourceResult) => void = () => {
      throw new Error("Source not requested");
    };
    const pendingSource = new Promise<CaseSourceResult>((resolve) => {
      finish = resolve;
    });
    const initialize = vi.fn(() => initialization);
    let current = true;
    const pending = loadBriefing(
      0,
      { read: async () => pendingSource },
      catalog,
      initialize,
      () => current,
    );
    current = false;
    const original = await bundledCaseSource.read("case-001");
    if (!original.ok) throw new Error(original.code);
    finish({ ...original, raw });
    expect(await pending).toBeNull();
    expect(initialize).not.toHaveBeenCalled();
  });
  it("models Strict Mode cleanup/reload without duplicate committed attempts", async () => {
    const initialize = vi.fn(() => initialization);
    const obsolete = loadBriefing(
      0,
      bundledCaseSource,
      catalog,
      initialize,
      () => false,
    );
    const current = loadBriefing(
      0,
      bundledCaseSource,
      catalog,
      initialize,
      () => true,
    );
    expect(await obsolete).toBeNull();
    const action = await current;
    if (!action) throw new Error("Missing current response");
    expect(reduceBriefing(initialBriefingState, action)).toMatchObject({
      status: "ready",
      session: { attemptId: initialization.attemptId },
    });
    expect(initialize).toHaveBeenCalledOnce();
  });
});
