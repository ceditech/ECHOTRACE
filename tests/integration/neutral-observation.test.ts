import { describe, expect, it, vi } from "vitest";
import { loadCase } from "@/cases/load-case";
import catalog from "@/cases/content/case-001/en.json";
import {
  initialBriefingState,
  loadBriefing,
  reduceBriefing,
} from "@/game/application/briefing";
import { projectNeutralScene } from "@/game/application/neutral-scene";
import { bundledCaseSource } from "@/infrastructure/cases/bundled-case-source";

describe("T17 neutral observation", () => {
  it("projects exact geometry and preserves only the three authored changes", async () => {
    const loaded = await loadCase("case-001", bundledCaseSource);
    if (!loaded.ok) throw new Error(loaded.code);
    const definition = loaded.value;
    const original = projectNeutralScene(definition, "original");
    const changed = projectNeutralScene(definition, "changed");
    if (!original.ok || !changed.ok) throw new Error("Missing scene");
    expect(projectNeutralScene(definition, "original")).toEqual(original);
    for (const { scene } of [original, changed]) {
      const authored = definition.scenes.find(({ id }) => id === scene.sceneId);
      expect(
        scene.objects.map(({ objectId, position, size, rotationDegrees }) => ({
          objectId,
          position,
          size,
          rotationDegrees,
        })),
      ).toEqual(
        authored?.visuals.map(
          ({ objectId, position, size, rotationDegrees }) => ({
            objectId,
            position,
            size,
            rotationDegrees,
          }),
        ),
      );
    }
    expect(original.scene.snapshot).toBe("original");
    expect(changed.scene.snapshot).toBe("changed");
    expect(changed.scene.objects.map(({ objectId }) => objectId)).toEqual(
      original.scene.objects
        .map(({ objectId }) => objectId)
        .filter((id) => id !== "object-passport"),
    );
    const before = new Map(
      original.scene.objects.map((object) => [object.objectId, object]),
    );
    const after = new Map(
      changed.scene.objects.map((object) => [object.objectId, object]),
    );
    expect(
      [...before.keys()]
        .filter(
          (id) =>
            JSON.stringify(before.get(id)) !== JSON.stringify(after.get(id)),
        )
        .sort(),
    ).toEqual([
      "object-passport",
      "object-stand-12",
      "object-stand-21",
      "object-star-wallet",
    ]);
    expect(after.get("object-stand-12")?.position).toEqual(
      before.get("object-stand-21")?.position,
    );
    expect(after.get("object-stand-21")?.position).toEqual(
      before.get("object-stand-12")?.position,
    );
    expect(after.get("object-star-wallet")?.position.x).toBeGreaterThan(0.5);
    expect(before.get("object-star-wallet")?.position.x).toBeLessThan(0.5);
    expect(
      definition.changes
        .filter(({ significance }) => significance === "meaningful")
        .map(({ kind }) => kind),
    ).toEqual(["object_removed", "object_exchanged", "object_moved"]);
    expect(
      projectNeutralScene(
        { ...definition, observationSceneId: "missing" },
        "original",
      ),
    ).toEqual({ ok: false, code: "invalid_scene" });
    expect(
      projectNeutralScene({ ...definition, objects: [] }, "original"),
    ).toEqual({ ok: false, code: "invalid_scene" });
  });

  it("requires a rendered Original, retries the same attempt and ignores obsolete outcomes", async () => {
    const action = await loadBriefing(
      0,
      bundledCaseSource,
      catalog,
      () => ({ attemptId: "current", startedAt: 100 }),
      () => true,
    );
    if (action?.type !== "loaded") throw new Error("Briefing failed");
    const briefing = reduceBriefing(initialBriefingState, action);
    const ready = {
      type: "observation_ready",
      attemptId: "current",
      revision: 0,
      at: 130,
    } as const;
    expect(reduceBriefing(briefing, ready)).toBe(briefing);
    const intro = reduceBriefing(briefing, {
      type: "start",
      attemptId: "current",
      at: 120,
    });
    expect(intro).toMatchObject({
      session: {
        currentPhase: "observation_intro",
        observationStartedAt: null,
      },
      observation: { status: "loading", revision: 0 },
      original: { snapshot: "original" },
    });
    expect(reduceBriefing(intro, { ...ready, attemptId: "obsolete" })).toBe(
      intro,
    );
    expect(reduceBriefing(intro, { ...ready, at: 99 })).toMatchObject({
      observation: { status: "failed", code: "phase_rejected" },
    });
    const failed = reduceBriefing(intro, {
      type: "observation_failed",
      attemptId: "current",
      revision: 0,
      code: "scene_initialization_failed",
    });
    expect(failed).toMatchObject({
      session: {
        currentPhase: "observation_intro",
        observationStartedAt: null,
      },
      observation: { status: "failed", revision: 0 },
    });
    const retried = reduceBriefing(failed, { type: "retry_observation" });
    expect(reduceBriefing(retried, ready)).toBe(retried);
    vi.useFakeTimers();
    try {
      const active = reduceBriefing(retried, { ...ready, revision: 1 });
      expect(active).toMatchObject({
        session: {
          currentPhase: "observation_active",
          observationStartedAt: 130,
          observationEndedAt: null,
          evidenceCollected: [],
          selectedObjects: [],
          score: null,
          completedAt: null,
        },
        observation: { status: "ready", revision: 1 },
      });
      expect(vi.getTimerCount()).toBe(0);
      expect(reduceBriefing(active, { ...ready, revision: 1 })).toBe(active);
    } finally {
      vi.useRealTimers();
    }
  });
});
