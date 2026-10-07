import { expect, it } from "vitest";
import { loadCase } from "@/cases/load-case";
import { BundledCaseSource } from "@/infrastructure/cases/bundled-case-source";
import { createInitialSession } from "@/game/domain/session-machine";
import { createSyntheticCase } from "../fixtures/synthetic-case";

it("loads approved synthetic JSON through the bundled source and validation into an application session", async () => {
  const source = new BundledCaseSource(
    new Map([
      [
        "fixture-case",
        {
          read: async () => JSON.stringify(createSyntheticCase()),
          declaredAssetIds: ["fixture-background", "fixture-visual"],
        },
      ],
    ]),
  );
  const result = await loadCase("fixture-case", source);
  if (!result.ok) throw new Error(result.code);
  const session = createInitialSession(result.value, {
    attemptId: "loaded-attempt",
    startedAt: 100,
  });
  expect(session).toMatchObject({
    caseId: "fixture-case",
    caseVersion: 7,
    attemptId: "loaded-attempt",
    currentPhase: "case_briefing",
  });
});
