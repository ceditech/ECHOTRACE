import { describe, expect, it } from "vitest";
import type { CaseDefinition } from "@/game/domain/case";
import type { CaseSession } from "@/game/domain/session";
import type { EvidenceSource } from "@/game/domain/reasoning";
import {
  createInitialSession,
  applySessionCommand,
  getNextPhase,
} from "@/game/domain/session-machine";
import { evaluateSelection } from "@/game/domain/selection";
import {
  collectEvidence,
  evaluateEvidenceAvailability,
} from "@/game/domain/evidence";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import {
  createSyntheticCase,
  createChangeVariants,
} from "../fixtures/synthetic-case";

function trusted(input: unknown = createSyntheticCase()): CaseDefinition {
  const result = validateCaseDefinition(input);
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.value;
}
function investigating(data: CaseDefinition): CaseSession {
  let state = createInitialSession(data, {
    attemptId: "test-attempt",
    startedAt: 100,
  });
  while (state.currentPhase !== "investigation_active") {
    const to = getNextPhase(state.currentPhase);
    if (!to) throw new Error("Unexpected terminal phase");
    const result = applySessionCommand(
      state,
      { type: "advance_phase", from: state.currentPhase, to, at: 110 },
      { ok: true },
    );
    if (!result.ok) throw new Error(result.code);
    state = result.state;
  }
  return state;
}
const intent = { objectId: "fixture-object", selectedAt: 120 };
function discovered(data: CaseDefinition): CaseSession {
  const result = evaluateSelection(data, investigating(data), intent);
  if (result.outcome !== "CORRECT_CHANGE") throw new Error(result.outcome);
  return result.state;
}
function extraObject(interactive: boolean): CaseDefinition {
  const input = createSyntheticCase();
  const scene = input.scenes[1];
  const region = scene?.interactionRegions[0];
  if (!scene || !region) throw new Error("Missing fixture region");
  return trusted({
    ...input,
    objects: [
      ...input.objects,
      { id: "fixture-extra", description: { key: "fixture.extra" } },
    ],
    scenes: [
      input.scenes[0],
      {
        ...scene,
        interactionRegions: interactive
          ? [
              ...scene.interactionRegions,
              { ...region, objectId: "fixture-extra" },
            ]
          : scene.interactionRegions,
      },
    ],
  });
}

describe("T07 selection and evidence", () => {
  it("discovers a change and reports available evidence without collecting or scoring", () => {
    const data = trusted();
    const previous = investigating(data);
    const before = JSON.stringify(previous);
    Object.freeze(previous);
    Object.freeze(previous.correctDiscoveries);
    Object.freeze(previous.selectedObjects);
    const result = evaluateSelection(data, previous, intent);
    expect(result).toMatchObject({
      outcome: "CORRECT_CHANGE",
      changeId: "fixture-change",
      availableEvidenceIds: ["fixture-evidence"],
    });
    expect(result.state.correctDiscoveries).toEqual(["fixture-change"]);
    expect(result.state.selectedObjects).toEqual([intent]);
    expect(result.state.evidenceCollected).toEqual([]);
    expect(result.state.score).toBeNull();
    expect(JSON.stringify(previous)).toBe(before);
    expect(result.state).not.toBe(previous);
  });
  it("repeated discovery preserves the state reference and produces no new opportunities", () => {
    const data = trusted();
    const state = discovered(data);
    expect(evaluateSelection(data, state, intent)).toEqual({
      outcome: "ALREADY_DISCOVERED",
      changeId: "fixture-change",
      state,
    });
    expect(evaluateSelection(data, state, intent).state).toBe(state);
    expect(state.correctDiscoveries).toHaveLength(1);
    expect(state.selectedObjects).toHaveLength(1);
  });
  it("records an incorrect interactive selection but does not unlock, collect or score", () => {
    const data = extraObject(true);
    const state = investigating(data);
    const wrong = { objectId: "fixture-extra", selectedAt: 120 };
    const result = evaluateSelection(data, state, wrong);
    expect(result.outcome).toBe("INCORRECT");
    expect(result.state.incorrectSelections).toEqual([wrong]);
    expect(result.state.selectedObjects).toEqual([wrong]);
    expect(result.state.correctDiscoveries).toEqual([]);
    expect(result.state.evidenceCollected).toEqual([]);
    expect(result.state.score).toBeNull();
    expect(
      evaluateEvidenceAvailability(data, result.state, "fixture-evidence")
        .status,
    ).toBe("unavailable");
    expect(state.incorrectSelections).toEqual([]);
  });
  it("distinguishes noninteractive and unknown objects without recording attempts", () => {
    const data = extraObject(false);
    const state = investigating(data);
    for (const [objectId, outcome] of [
      ["fixture-extra", "NON_INTERACTIVE"],
      ["missing-object", "UNKNOWN_TARGET"],
    ]) {
      const result = evaluateSelection(data, state, {
        objectId: objectId ?? "",
        selectedAt: 120,
      });
      expect(result.outcome).toBe(outcome);
      expect(result.state).toBe(state);
    }
  });
  it("rejects ambiguous mappings independent of array order and existing discoveries", () => {
    const input = createSyntheticCase();
    const original = input.changes[0];
    if (!original) throw new Error("Missing fixture change");
    const changes = [original, { ...original, id: "fixture-second-change" }];
    for (const ordered of [changes, [...changes].reverse()]) {
      const data = trusted({ ...input, changes: ordered });
      for (const correctDiscoveries of [[], [original.id]]) {
        const state = { ...investigating(data), correctDiscoveries };
        const result = evaluateSelection(data, state, intent);
        expect(result.outcome).toBe("AMBIGUOUS");
        expect(result.state).toBe(state);
        expect(state.evidenceCollected).toEqual([]);
      }
    }
  });
  it("requires the exact source change, ignoring supporting information", () => {
    const input = createSyntheticCase();
    const original = input.changes[0];
    const evidence = input.evidence[0];
    if (!original || !evidence) throw new Error("Missing fixture data");
    const data = trusted({
      ...input,
      changes: [...input.changes, { ...original, id: "fixture-other-change" }],
      evidence: [
        {
          ...evidence,
          supportingInformation: [
            { kind: "change", id: "fixture-other-change" },
          ],
        },
      ],
    });
    const state = {
      ...investigating(data),
      correctDiscoveries: ["fixture-other-change"],
    };
    expect(evaluateEvidenceAvailability(data, state, evidence.id)).toEqual({
      status: "unavailable",
      changeId: original.id,
    });
    expect(collectEvidence(data, state, evidence.id)).toEqual({
      status: "unavailable",
      state,
    });
    expect(
      evaluateEvidenceAvailability(
        data,
        { ...state, correctDiscoveries: [original.id] },
        evidence.id,
      ).status,
    ).toBe("available");
  });
  it("collects only requested available evidence immutably and idempotently", () => {
    const data = trusted();
    const state = discovered(data);
    Object.freeze(state);
    Object.freeze(state.evidenceCollected);
    const result = collectEvidence(data, state, "fixture-evidence");
    expect(result.status).toBe("collected");
    expect(result.state.evidenceCollected).toEqual(["fixture-evidence"]);
    expect(state.evidenceCollected).toEqual([]);
    expect(result.state.correctDiscoveries).toBe(state.correctDiscoveries);
    expect(result.state.score).toBeNull();
    const repeated = collectEvidence(data, result.state, "fixture-evidence");
    expect(repeated.status).toBe("already_collected");
    expect(repeated.state).toBe(result.state);
  });
  it("supports multiple evidence items from one source without automatic collection", () => {
    const input = createSyntheticCase();
    const evidence = input.evidence[0];
    if (!evidence) throw new Error("Missing fixture evidence");
    const data = trusted({
      ...input,
      evidence: [evidence, { ...evidence, id: "fixture-second-evidence" }],
    });
    const result = evaluateSelection(data, investigating(data), intent);
    expect(result).toMatchObject({
      outcome: "CORRECT_CHANGE",
      availableEvidenceIds: [evidence.id, "fixture-second-evidence"],
    });
    const collection = collectEvidence(data, result.state, evidence.id);
    expect(collection.state.evidenceCollected).toEqual([evidence.id]);
    expect(
      evaluateEvidenceAvailability(
        data,
        collection.state,
        "fixture-second-evidence",
      ).status,
    ).toBe("available");
  });
  it("preserves unsupported source variants and reports them without guessing", () => {
    const input = createSyntheticCase();
    const evidence = input.evidence[0];
    if (!evidence) throw new Error("Missing fixture evidence");
    const sources: readonly EvidenceSource[] = [
      { kind: "object", objectId: "fixture-object" },
      { kind: "document", objectId: "fixture-object" },
      { kind: "statement", statementId: "fixture-statement" },
      { kind: "timestamp", eventId: "fixture-event" },
      { kind: "environment", sceneId: "fixture-after" },
      { kind: "deduction", deductionId: "fixture-deduction" },
    ];
    for (const source of sources) {
      const data = trusted({ ...input, evidence: [{ ...evidence, source }] });
      const state = discovered(data);
      expect(evaluateEvidenceAvailability(data, state, evidence.id)).toEqual({
        status: "unsupported_source_semantics",
        sourceKind: source.kind,
      });
      expect(collectEvidence(data, state, evidence.id)).toEqual({
        status: "unsupported_source_semantics",
        state,
      });
    }
  });
  it("rejects unknown evidence and mismatched case identity/version", () => {
    const data = trusted();
    const state = investigating(data);
    expect(collectEvidence(data, state, "unknown")).toEqual({
      status: "unknown_evidence",
      state,
    });
    for (const mismatch of [
      { ...state, caseId: "other" },
      { ...state, caseVersion: 8 },
    ]) {
      expect(evaluateSelection(data, mismatch, intent).outcome).toBe(
        "SESSION_CASE_MISMATCH",
      );
      expect(collectEvidence(data, mismatch, "fixture-evidence").status).toBe(
        "session_case_mismatch",
      );
    }
  });
  it("rejects selection outside investigation and malformed injected timestamps", () => {
    const data = trusted();
    const initial = createInitialSession(data, {
      attemptId: "attempt",
      startedAt: 100,
    });
    expect(evaluateSelection(data, initial, intent).outcome).toBe(
      "SELECTION_NOT_ALLOWED_IN_PHASE",
    );
    const state = investigating(data);
    for (const selectedAt of [NaN, Infinity, 99, 109]) {
      const result = evaluateSelection(data, state, { ...intent, selectedAt });
      expect(result.outcome).toBe("INVALID_SELECTION_TIMESTAMP");
      expect(result.state).toBe(state);
    }
    for (const currentPhase of ["observation_active", "results"] as const) {
      const wrongPhase = { ...discovered(data), currentPhase };
      expect(collectEvidence(data, wrongPhase, "fixture-evidence").status).toBe(
        "collection_not_allowed_in_phase",
      );
    }
  });
  it("preserves populated reasoning fields and evidence through later phase transitions", () => {
    const data = trusted();
    const collected = collectEvidence(
      data,
      discovered(data),
      "fixture-evidence",
    ).state;
    const state = {
      ...collected,
      deductionAnswers: [
        {
          kind: "single_choice",
          deductionId: "fixture-deduction",
          choiceId: "fixture-choice",
        },
      ],
      finalDecision: "fixture-decision",
      hintsUsed: ["fixture-hint"],
    } as const;
    const result = applySessionCommand(
      state,
      {
        type: "advance_phase",
        from: "investigation_active",
        to: "evidence_review",
        at: 130,
      },
      { ok: true },
    );
    expect(result.ok).toBe(true);
    expect(result.state).toMatchObject({
      evidenceCollected: state.evidenceCollected,
      deductionAnswers: state.deductionAnswers,
      finalDecision: state.finalDecision,
      hintsUsed: state.hintsUsed,
    });
    expect(state.currentPhase).toBe("investigation_active");
  });
  it("evaluates identical inputs deterministically without changing authored data", () => {
    const data = trusted();
    const state = investigating(data);
    const before = JSON.stringify(data);
    expect(evaluateSelection(data, state, intent)).toEqual(
      evaluateSelection(data, state, intent),
    );
    const discovery = discovered(data);
    expect(collectEvidence(data, discovery, "fixture-evidence")).toEqual(
      collectEvidence(data, discovery, "fixture-evidence"),
    );
    expect(JSON.stringify(data)).toBe(before);
  });
  it("maps all change kinds, both exchange objects, and only the relationship subject", () => {
    const input = createSyntheticCase();
    const scene = input.scenes[1];
    const region = scene?.interactionRegions[0];
    if (!scene || !region) throw new Error("Missing fixture scene");
    for (const change of createChangeVariants()) {
      const data = trusted({
        ...input,
        changes: [change],
        objects: [
          ...input.objects,
          { id: "fixture-other", description: { key: "fixture.other" } },
        ],
        scenes: [
          input.scenes[0],
          {
            ...scene,
            interactionRegions: [
              ...scene.interactionRegions,
              { ...region, objectId: "fixture-other" },
            ],
          },
        ],
      });
      const state = investigating(data);
      const result = evaluateSelection(data, state, intent);
      expect(result.outcome).toBe("CORRECT_CHANGE");
      const other = { objectId: "fixture-other", selectedAt: 120 };
      if (change.kind === "object_exchanged") {
        expect(evaluateSelection(data, state, other).outcome).toBe(
          "CORRECT_CHANGE",
        );
        expect(evaluateSelection(data, result.state, other).outcome).toBe(
          "ALREADY_DISCOVERED",
        );
      } else if (change.kind === "relationship_changed") {
        expect(evaluateSelection(data, state, other).outcome).toBe("INCORRECT");
      }
    }
  });
  it("does not consider changes authored for another scene pair", () => {
    const input = createSyntheticCase();
    const change = input.changes[0];
    const scene = input.scenes[1];
    if (!change || !scene) throw new Error("Missing fixture data");
    const data = trusted({
      ...input,
      scenes: [...input.scenes, { ...scene, id: "fixture-another-scene" }],
      changes: [
        ...input.changes,
        {
          ...change,
          id: "fixture-other-pair",
          investigationSceneId: "fixture-another-scene",
        },
      ],
    });
    expect(evaluateSelection(data, investigating(data), intent).outcome).toBe(
      "CORRECT_CHANGE",
    );
  });
});
