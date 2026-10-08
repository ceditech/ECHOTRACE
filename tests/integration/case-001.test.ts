import { describe, expect, it, vi } from "vitest";
import raw from "@/cases/content/case-001/case.json";
import { loadCase } from "@/cases/load-case";
import {
  bundledCaseSource,
  BundledCaseSource,
} from "@/infrastructure/cases/bundled-case-source";
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
import { evaluateDeduction } from "@/game/domain/deduction";
import { calculateCaseScore } from "@/game/domain/score-calculation";
import {
  createRendererBridge,
  type RendererProjection,
} from "@/game/application/renderer-bridge";
import type { CaseDefinition } from "@/game/domain/case";
import type { CaseSession } from "@/game/domain/session";

async function loaded(): Promise<CaseDefinition> {
  const result = await loadCase("case-001", bundledCaseSource);
  if (!result.ok) throw new Error(JSON.stringify(result));
  return result.value;
}
function investigating(data: CaseDefinition): CaseSession {
  let state = createInitialSession(data, {
    attemptId: "case-001-test",
    startedAt: 100,
  });
  while (state.currentPhase !== "investigation_active") {
    const to = getNextPhase(state.currentPhase);
    if (!to) throw new Error("Unexpected terminal phase");
    // Domain contract exercise; production readiness gates belong to later orchestration.
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
function score(data: CaseDefinition, state: CaseSession): number {
  const result = calculateCaseScore(data, state);
  if (!result.ok) throw new Error(result.code);
  return result.value.total;
}

describe("Case 001 trusted content and domain integration", () => {
  it("loads production JSON with preserved identity/versions into a fresh session", async () => {
    const data = await loaded();
    expect(data).toMatchObject({
      id: "case-001",
      schemaVersion: 1,
      caseVersion: 1,
    });
    expect(
      createInitialSession(data, { attemptId: "fresh", startedAt: 100 }),
    ).toMatchObject({
      caseId: "case-001",
      caseVersion: 1,
      currentPhase: "case_briefing",
    });
    expect(data).not.toBe(raw);
    const source = await bundledCaseSource.read("case-001");
    if (!source.ok) throw new Error(source.code);
    const referenced = new Set(
      data.scenes.flatMap((scene) => [
        scene.background.id,
        ...scene.visuals.map((visual) => visual.asset.id),
      ]),
    );
    expect(new Set(source.declaredAssetIds)).toEqual(referenced);
    expect(source.declaredAssetIds.every((id) => !/[/.\\\\]/.test(id))).toBe(
      true,
    );
  });
  it.each(["object-stand-12", "object-stand-21"])(
    "accepts %s first and counts its exchanged partner only once",
    async (first) => {
      const data = await loaded();
      const selected = evaluateSelection(data, investigating(data), {
        objectId: first,
        selectedAt: 120,
      });
      expect(selected.outcome).toBe("CORRECT_CHANGE");
      expect(selected.state.correctDiscoveries).toEqual([
        "change-stands-exchanged",
      ]);
      const repeated = evaluateSelection(data, selected.state, {
        objectId:
          first === "object-stand-12" ? "object-stand-21" : "object-stand-12",
        selectedAt: 121,
      });
      expect(repeated.outcome).toBe("ALREADY_DISCOVERED");
      expect(repeated.state).toBe(selected.state);
      expect(score(data, repeated.state)).toBe(1200);
    },
  );
  it("selects the absent passport and unlocks each distinct evidence only through its change", async () => {
    const data = await loaded();
    const initial = investigating(data);
    for (const [objectId, evidenceId] of [
      ["object-passport", "evidence-passport-absence"],
      ["object-stand-12", "evidence-stands-exchanged"],
      ["object-star-wallet", "evidence-wallet-destination"],
    ]) {
      if (!objectId || !evidenceId) throw new Error("Missing test input");
      expect(collectEvidence(data, initial, evidenceId).status).toBe(
        "unavailable",
      );
      const selected = evaluateSelection(data, initial, {
        objectId,
        selectedAt: 120,
      });
      expect(selected.outcome).toBe("CORRECT_CHANGE");
      expect(
        data.evidence
          .filter(
            (item) =>
              evaluateEvidenceAvailability(data, selected.state, item.id)
                .status === "available",
          )
          .map((item) => item.id),
      ).toEqual([evidenceId]);
      expect(score(data, selected.state)).toBe(1200);
      const collected = collectEvidence(data, selected.state, evidenceId);
      expect(collected.status).toBe("collected");
      expect(score(data, collected.state)).toBe(1450);
      const repeated = collectEvidence(data, collected.state, evidenceId);
      expect(repeated.status).toBe("already_collected");
      expect(repeated.state).toBe(collected.state);
      expect(score(data, repeated.state)).toBe(1450);
    }
  });
  it("reaches the 2650 ceiling without duplicate discovery/evidence awards or new scoring rules", async () => {
    const data = await loaded();
    let state = investigating(data);
    for (const objectId of [
      "object-passport",
      "object-stand-12",
      "object-star-wallet",
    ]) {
      const selected = evaluateSelection(data, state, {
        objectId,
        selectedAt: 120,
      });
      if (selected.outcome !== "CORRECT_CHANGE")
        throw new Error(selected.outcome);
      state = selected.state;
      for (const id of selected.availableEvidenceIds)
        state = collectEvidence(data, state, id).state;
    }
    const answer = {
      kind: "single_choice",
      deductionId: "deduction-delivery-route",
      choiceId: "choice-route-swapped-labels",
    } as const;
    const deduced = evaluateDeduction(data, state, answer);
    expect(deduced.outcome).toBe("CORRECT");
    expect(evaluateDeduction(data, deduced.state, answer).outcome).toBe(
      "ALREADY_ANSWERED",
    );
    expect(score(data, deduced.state)).toBe(2650);
    const duplicates = {
      ...deduced.state,
      correctDiscoveries: [
        ...deduced.state.correctDiscoveries,
        ...deduced.state.correctDiscoveries,
      ],
      evidenceCollected: [
        ...deduced.state.evidenceCollected,
        ...deduced.state.evidenceCollected,
      ],
    };
    expect(score(data, duplicates)).toBe(2650);
    expect(calculateCaseScore(data, deduced.state)).toMatchObject({
      ok: true,
      value: {
        breakdown: { finalDecision: 0, timeBonus: 0, hintPenalty: 0 },
        accuracy: null,
        rating: null,
      },
    });
  });
  it("retains the first incorrect deduction answer and encodes final truth without a retry policy", async () => {
    const data = await loaded();
    const initial = investigating(data);
    const wrong = evaluateDeduction(data, initial, {
      kind: "single_choice",
      deductionId: "deduction-delivery-route",
      choiceId: "choice-route-owner-request",
    });
    expect(wrong.outcome).toBe("INCORRECT");
    expect(
      evaluateDeduction(data, wrong.state, {
        kind: "single_choice",
        deductionId: "deduction-delivery-route",
        choiceId: "choice-route-swapped-labels",
      }).outcome,
    ).toBe("ALREADY_ANSWERED");
    expect(score(data, wrong.state)).toBe(1000);
    expect(data.finalDecision.choices[0]?.id).toBe(
      data.solution.correctDecisionId,
    );
  });
  it("does not leak loaded solution or witness classifications into the display projection", async () => {
    const data = await loaded();
    const state = investigating(data);
    const apply = vi.fn<(projection: RendererProjection) => void>();
    const bridge = createRendererBridge({
      readState: () => state,
      dispatch: vi.fn(),
    });
    bridge.attachRenderer(apply);
    const display: RendererProjection = {
      attemptId: state.attemptId,
      revision: 0,
      displayPhase: state.currentPhase,
      sceneId: data.investigationSceneId,
      interactionEnabled: true,
      target: {
        objectId: "object-star-wallet",
        label: "Wallet",
        highlighted: false,
      },
    };
    const authoredInput = {
      ...display,
      solution: data.solution,
      statements: data.statements,
    };
    bridge.publish(authoredInput);
    expect(apply.mock.lastCall?.[0]).toEqual(display);
    expect(apply.mock.lastCall?.[0]).not.toHaveProperty("solution");
    expect(apply.mock.lastCall?.[0]).not.toHaveProperty("statements");
    bridge.dispose();
  });
  it("preserves unknown-source, identity/version and missing-declaration failures", async () => {
    for (const id of [
      "case-002",
      "../case-001",
      "https://example.com/case-001",
    ])
      expect(await loadCase(id, bundledCaseSource)).toEqual({
        ok: false,
        code: "unknown_case",
      });
    const source = await bundledCaseSource.read("case-001");
    if (!source.ok) throw new Error(source.code);
    for (const [content, expected] of [
      [{ ...raw, id: "other-case" }, "case_id_mismatch"],
      [{ ...raw, schemaVersion: 2 }, "unsupported_schema"],
      [{ ...raw, caseVersion: 0 }, "invalid_case"],
    ] as const) {
      const input = new BundledCaseSource(
        new Map([
          [
            "case-001",
            {
              read: async () => content,
              declaredAssetIds: source.declaredAssetIds,
            },
          ],
        ]),
      );
      expect(await loadCase("case-001", input)).toMatchObject({
        ok: false,
        code: expected,
      });
    }
    expect(
      await loadCase(
        "case-001",
        new BundledCaseSource(
          new Map([
            ["case-001", { read: async () => raw, declaredAssetIds: [] }],
          ]),
        ),
      ),
    ).toMatchObject({ ok: false, code: "missing_asset_declaration" });
  });
});
