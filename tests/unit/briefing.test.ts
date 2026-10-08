import { describe, expect, it } from "vitest";
import raw from "@/cases/content/case-001/case.json";
import catalog from "@/cases/content/case-001/en.json";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import { createInitialSession } from "@/game/domain/session-machine";
import {
  initialBriefingState,
  prepareBriefing,
  reduceBriefing,
  type BriefingState,
} from "@/game/application/briefing";

function ready(): Extract<BriefingState, { status: "ready" }> {
  const validated = validateCaseDefinition(raw);
  if (!validated.ok) throw new Error(JSON.stringify(validated.issues));
  const prepared = prepareBriefing(validated.value, catalog);
  if (!prepared.ok) throw new Error("Missing briefing");
  return {
    status: "ready",
    requestId: 0,
    model: prepared.model,
    session: createInitialSession(validated.value, {
      attemptId: "attempt-one",
      startedAt: 100,
    }),
    startError: false,
  };
}

describe("T16 briefing preparation and session ownership", () => {
  it("preserves exact text, identity and difficulty while selecting only display fields", () => {
    const state = ready();
    expect(state.model).toEqual({
      caseId: "case-001",
      title: catalog["case001.title"],
      setting: catalog["case001.briefing.setting"],
      incident: catalog["case001.briefing.incident"],
      objective: catalog["case001.briefing.objective"],
      instructions: catalog["case001.briefing.instructions"],
      difficulty: "easy",
    });
    expect(state.model.instructions).toContain(
      "\n\nPlease collect my passport and the star wallet from the window table.",
    );
    expect(state.model).not.toHaveProperty("solution");
    expect(state.model).not.toHaveProperty("statements");
    expect(state.model).not.toHaveProperty("deductions");
    expect(state.model).not.toHaveProperty("reconstruction");
  });
  it.each([
    "case001.title",
    "case001.briefing.setting",
    "case001.briefing.incident",
    "case001.briefing.objective",
    "case001.briefing.instructions",
  ])("rejects missing and blank %s rather than displaying a key", (key) => {
    const validated = validateCaseDefinition(raw);
    if (!validated.ok) throw new Error("Invalid content");
    const missing: Record<string, string> = { ...catalog };
    delete missing[key];
    expect(prepareBriefing(validated.value, missing)).toEqual({ ok: false });
    expect(
      prepareBriefing(validated.value, { ...catalog, [key]: " \n " }),
    ).toEqual({ ok: false });
  });
  it("accepts one loaded session and ignores duplicate and stale completions", () => {
    const state = ready();
    const action = {
      type: "loaded",
      requestId: 0,
      model: state.model,
      session: state.session,
    } as const;
    const accepted = reduceBriefing(initialBriefingState, action);
    expect(accepted).toEqual(state);
    expect(reduceBriefing(accepted, action)).toBe(accepted);
    expect(
      reduceBriefing(initialBriefingState, { ...action, requestId: 1 }),
    ).toBe(initialBriefingState);
    expect(
      reduceBriefing(accepted, {
        type: "failed",
        requestId: 0,
        code: "case_load_failed",
      }),
    ).toBe(accepted);
  });
  it("retries only failures and rejects old success/failure after retry", () => {
    const state = ready();
    const failed = reduceBriefing(initialBriefingState, {
      type: "failed",
      requestId: 0,
      code: "case_load_failed",
    });
    const retried = reduceBriefing(failed, { type: "retry" });
    expect(retried).toEqual({ status: "loading", requestId: 1 });
    expect(
      reduceBriefing(retried, {
        type: "loaded",
        requestId: 0,
        model: state.model,
        session: state.session,
      }),
    ).toBe(retried);
    expect(
      reduceBriefing(retried, {
        type: "failed",
        requestId: 0,
        code: "missing_briefing_text",
      }),
    ).toBe(retried);
    expect(reduceBriefing(retried, { type: "retry" })).toBe(retried);
    expect(reduceBriefing(state, { type: "retry" })).toBe(state);
  });
  it("starts exactly the existing attempt, stops at observation_intro and ignores repeated starts", () => {
    const state = ready();
    expect(state.session.currentPhase).toBe("case_briefing");
    const action = {
      type: "start",
      attemptId: state.session.attemptId,
      at: 120,
    } as const;
    const next = reduceBriefing(state, action);
    if (next.status !== "ready") throw new Error("Lost session");
    expect(next.session).toEqual({
      ...state.session,
      currentPhase: "observation_intro",
    });
    expect(next.session.observationStartedAt).toBeNull();
    expect(reduceBriefing(next, action)).toBe(next);
    expect(reduceBriefing(next, { ...action, at: 999 })).toBe(next);
    expect(state.session.currentPhase).toBe("case_briefing");
  });
  it("ignores Start before loading and from an obsolete attempt", () => {
    const action = {
      type: "start",
      attemptId: "old-attempt",
      at: 120,
    } as const;
    expect(reduceBriefing(initialBriefingState, action)).toBe(
      initialBriefingState,
    );
    const state = ready();
    expect(reduceBriefing(state, action)).toBe(state);
    const failed = reduceBriefing(initialBriefingState, {
      type: "failed",
      requestId: 0,
      code: "missing_briefing_text",
    });
    expect(reduceBriefing(failed, action)).toBe(failed);
  });
  it.each([NaN, Infinity, 99])(
    "rejects invalid start timestamp %s without losing the session",
    (at) => {
      const state = ready();
      const rejected = reduceBriefing(state, {
        type: "start",
        attemptId: state.session.attemptId,
        at,
      });
      if (rejected.status !== "ready") throw new Error("Lost session");
      expect(rejected.session).toBe(state.session);
      expect(rejected.startError).toBe(true);
      const recovered = reduceBriefing(rejected, {
        type: "start",
        attemptId: state.session.attemptId,
        at: 120,
      });
      expect(recovered).toMatchObject({
        startError: false,
        session: {
          currentPhase: "observation_intro",
          attemptId: "attempt-one",
        },
      });
    },
  );
});
