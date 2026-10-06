import { describe, expect, it } from "vitest";
import type { CaseSession, GamePhase } from "@/game/domain/session";
import {
  applySessionCommand,
  createInitialSession,
  getNextPhase,
} from "@/game/domain/session-machine";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import { createSyntheticCase } from "../fixtures/synthetic-case";

const phases = [
  "case_briefing",
  "observation_intro",
  "observation_active",
  "observation_end",
  "transition",
  "investigation_intro",
  "investigation_active",
  "evidence_review",
  "witness_testimony",
  "deduction",
  "final_decision",
  "resolution",
  "results",
] as const satisfies readonly GamePhase[];
function initial(id = "fixture-case", attemptId = "fixture-attempt") {
  const result = validateCaseDefinition({ ...createSyntheticCase(), id });
  if (!result.ok) throw new Error("Synthetic case must validate");
  return createInitialSession(result.value, { attemptId, startedAt: 100 });
}
function advance(state: CaseSession, to: GamePhase, at = 200) {
  return applySessionCommand(
    state,
    { type: "advance_phase", from: state.currentPhase, to, at },
    { ok: true },
  );
}
function runSequence(): CaseSession {
  let state = initial();
  for (const [index, phase] of phases.slice(1).entries()) {
    const result = advance(state, phase, 101 + index);
    if (!result.ok) throw new Error(result.code);
    state = result.state;
  }
  return state;
}
describe("deterministic session foundation", () => {
  it("initializes the complete T03 shape deterministically with independent identities", () => {
    const state = initial();
    expect(state).toEqual(initial());
    expect(state).toMatchObject({
      caseId: "fixture-case",
      caseVersion: 7,
      attemptId: "fixture-attempt",
      currentPhase: "case_briefing",
      startedAt: 100,
      completionStatus: "in_progress",
      completedAt: null,
      observationStartedAt: null,
      observationEndedAt: null,
      investigationStartedAt: null,
      finalDecision: null,
      score: null,
    });
    for (const values of [
      state.selectedObjects,
      state.correctDiscoveries,
      state.incorrectSelections,
      state.evidenceCollected,
      state.hintsUsed,
      state.deductionAnswers,
    ])
      expect(values).toEqual([]);
    expect(initial("fixture-other", "fixture-other-attempt")).toMatchObject({
      caseId: "fixture-other",
      caseVersion: 7,
      attemptId: "fixture-other-attempt",
    });
    expect(initial().evidenceCollected).not.toBe(state.evidenceCollected);
  });
  it("tests every documented edge and records only phase milestones", () => {
    let state = initial();
    for (const [index, phase] of phases.slice(1).entries()) {
      const before = JSON.stringify(state);
      Object.freeze(state);
      const at = 101 + index;
      expect(getNextPhase(state.currentPhase)).toBe(phase);
      const result = advance(state, phase, at);
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error(result.code);
      expect(JSON.stringify(state)).toBe(before);
      expect(result.state).not.toBe(state);
      expect(result.state).toMatchObject({
        currentPhase: phase,
        caseId: "fixture-case",
        caseVersion: 7,
        attemptId: "fixture-attempt",
      });
      state = result.state;
    }
    expect(state).toMatchObject({
      observationStartedAt: 102,
      observationEndedAt: 103,
      investigationStartedAt: 106,
      completedAt: 112,
      completionStatus: "completed",
      finalDecision: null,
      score: null,
    });
  });
  it("rejects skipping, reversing, repeating and stale commands without changing state", () => {
    const state = Object.freeze(initial());
    for (const command of [
      { type: "advance_phase", from: "case_briefing", to: "results", at: 101 },
      {
        type: "advance_phase",
        from: "case_briefing",
        to: "case_briefing",
        at: 101,
      },
      {
        type: "advance_phase",
        from: "observation_intro",
        to: "observation_active",
        at: 101,
      },
    ] as const)
      expect(applySessionCommand(state, command, { ok: true })).toEqual({
        ok: false,
        code: "command_not_allowed_in_phase",
        state,
      });
    const next = advance(state, "observation_intro");
    if (!next.ok) throw new Error(next.code);
    expect(advance(next.state, "case_briefing")).toMatchObject({
      ok: false,
      code: "command_not_allowed_in_phase",
    });
    expect(state.currentPhase).toBe("case_briefing");
  });
  it("requires an explicit prerequisite outcome without choosing gameplay gates", () => {
    const state = initial();
    const command = {
      type: "advance_phase",
      from: "case_briefing",
      to: "observation_intro",
      at: 101,
    } as const;
    const rejected = applySessionCommand(state, command, { ok: false });
    expect(rejected).toEqual({
      ok: false,
      code: "prerequisite_not_satisfied",
      state,
    });
    expect(rejected.state).toBe(state);
    expect(applySessionCommand(state, command, { ok: true })).toMatchObject({
      ok: true,
      state: { currentPhase: "observation_intro" },
    });
  });
  it("treats results as terminal and completion independently of correctness", () => {
    const state = runSequence();
    expect(getNextPhase("results")).toBeNull();
    expect(advance(state, "case_briefing")).toEqual({
      ok: false,
      code: "command_not_allowed_in_phase",
      state,
    });
    expect(state.finalDecision).toBeNull();
    expect(state.score).toBeNull();
  });
  it("produces equivalent state for the same explicit command sequence", () => {
    expect(runSequence()).toEqual(runSequence());
  });
  it("rejects nonfinite or regressing milestone timestamps", () => {
    for (const at of [NaN, Infinity, 99])
      expect(advance(initial(), "observation_intro", at)).toMatchObject({
        ok: false,
        code: "invalid_command_timestamp",
      });
    const intro = advance(initial(), "observation_intro", 101);
    if (!intro.ok) throw new Error(intro.code);
    const observing = advance(intro.state, "observation_active", 110);
    if (!observing.ok) throw new Error(observing.code);
    expect(advance(observing.state, "observation_end", 109)).toMatchObject({
      ok: false,
      code: "invalid_command_timestamp",
    });
    expect(observing.state.observationEndedAt).toBeNull();
  });
  it("rejects inconsistent terminal bookkeeping as data", () => {
    const state = { ...initial(), completionStatus: "completed" } as const;
    expect(advance(state, "observation_intro")).toEqual({
      ok: false,
      code: "invalid_session_state",
      state,
    });
  });
  it("reports malformed injected initialization inputs as programmer errors", () => {
    const data = createSyntheticCase();
    expect(() =>
      createInitialSession(data, { attemptId: "", startedAt: 100 }),
    ).toThrow(RangeError);
    expect(() =>
      createInitialSession(data, {
        attemptId: "fixture-attempt",
        startedAt: NaN,
      }),
    ).toThrow(RangeError);
  });
});
