import { describe, expect, it } from "vitest";
import type { CaseDefinition } from "@/game/domain/case";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import type { ValidationCategory } from "@/cases/validation/result";
import {
  createChangeVariants,
  createSyntheticCase,
} from "../fixtures/synthetic-case";

function invalid(
  input: unknown,
  category: ValidationCategory,
  path: readonly (string | number)[],
) {
  const result = validateCaseDefinition(input);
  expect(result.ok).toBe(false);
  if (result.ok) throw new Error("Expected validation failure");
  expect(result.issues).toContainEqual(
    expect.objectContaining({
      category,
      path,
      code: expect.any(String),
      message: expect.any(String),
    }),
  );
  return result;
}
// Mutations below target untrusted JSON, not the readonly domain contract.
function edit(path: readonly (string | number)[], value: unknown): unknown {
  const input: unknown = JSON.parse(JSON.stringify(createSyntheticCase()));
  let parent = input;
  for (const key of path.slice(0, -1)) {
    if (typeof parent !== "object" || parent === null)
      throw new Error("Invalid test path");
    parent = Reflect.get(parent, key);
  }
  const key = path.at(-1);
  if (typeof parent !== "object" || parent === null || key === undefined)
    throw new Error("Invalid test path");
  Reflect.set(parent, key, value);
  return input;
}

describe("case validation trust boundary", () => {
  it("checks every evidence source variant in its own namespace", () => {
    const sources = [
      { kind: "object", objectId: "fixture-object" },
      { kind: "document", objectId: "fixture-object" },
      { kind: "statement", statementId: "fixture-statement" },
      { kind: "timestamp", eventId: "fixture-event" },
      { kind: "environment", sceneId: "fixture-before" },
      { kind: "deduction", deductionId: "fixture-deduction" },
    ];
    for (const source of sources) {
      expect(
        validateCaseDefinition(edit(["evidence", 0, "source"], source)),
      ).toMatchObject({ ok: true });
      const key = Object.keys(source).find((key) => key !== "kind");
      if (!key) throw new Error("Missing reference field");
      invalid(
        edit(["evidence", 0, "source"], { ...source, [key]: "missing-id" }),
        "reference",
        ["evidence", 0, "source", key],
      );
    }
  });
  it("rejects no-op changes, self-exchanges, and self-supporting evidence", () => {
    const base = createSyntheticCase().changes[0];
    if (!base) throw new Error("Synthetic fixture must declare a change");
    const noops = [
      {
        ...base,
        kind: "object_moved",
        from: { x: 0, y: 0 },
        to: { x: 0, y: 0 },
      },
      { ...base, kind: "object_rotated", fromDegrees: 0, toDegrees: 360 },
      { ...base, kind: "object_opened_closed", before: "open", after: "open" },
      {
        ...base,
        kind: "object_state_changed",
        beforeState: "same",
        afterState: "same",
      },
      {
        ...base,
        kind: "object_quantity_changed",
        beforeQuantity: 1,
        afterQuantity: 1,
      },
    ];
    for (const change of noops)
      invalid(edit(["changes", 0], change), "semantic", ["changes", 0]);
    const { objectId, ...exchangeBase } = base;
    void objectId;
    invalid(
      edit(["changes", 0], {
        ...exchangeBase,
        kind: "object_exchanged",
        objectIds: ["fixture-object", "fixture-object"],
      }),
      "semantic",
      ["changes", 0, "objectIds"],
    );
    invalid(
      edit(
        ["evidence", 0, "supportingInformation"],
        [{ kind: "evidence", id: "fixture-evidence" }],
      ),
      "semantic",
      ["evidence", 0, "supportingInformation", 0],
    );
  });
  it("returns typed data without mutating input and preserves independent versions", () => {
    const input = createSyntheticCase();
    const before = JSON.stringify(input);
    const result = validateCaseDefinition(input);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error(JSON.stringify(result.issues));
    const value: CaseDefinition = result.value;
    expect(value.caseVersion).toBe(7);
    expect(value.schemaVersion).toBe(1);
    expect(value.scenes[1]?.visuals).toEqual([]);
    expect(value.scenes[1]?.interactionRegions).toHaveLength(1);
    expect(result.value).not.toBe(input);
    expect(JSON.stringify(input)).toBe(before);
  });
  it("accepts all finite change variants", () => {
    for (const change of createChangeVariants()) {
      const input = {
        ...createSyntheticCase(),
        objects: [
          ...createSyntheticCase().objects,
          { id: "fixture-other", description: { key: "fixture.other" } },
        ],
        changes: [change],
      };
      expect(validateCaseDefinition(input)).toMatchObject({ ok: true });
    }
  });
  it.each([
    [["caseVersion"], "7"],
    [["caseVersion"], 0],
    [["schemaVersion"], 1.5],
    [["id"], "../bad/path"],
    [["metadata", "title", "key"], ""],
    [["metadata", "difficulty"], "unknown"],
    [["changes", 0, "kind"], "callback"],
    [["hints", 0, "level"], 4],
    [["scoring", "baseCompletionScore"], -1],
    [["settings", "observationDurationSeconds"], 0],
    [["scenes", 1, "interactionRegions", 0, "geometry", "origin", "x"], -0.1],
    [["scenes", 1, "interactionRegions", 0, "geometry", "size", "width"], 0],
  ] as const)("rejects malformed structure at %j", (path, value) => {
    invalid(edit(path, value), "structure", path);
  });
  it("rejects missing required fields", () => {
    const { solution, ...input } = createSyntheticCase();
    void solution;
    invalid(input, "structure", ["solution"]);
  });
  it("reports unsupported schema versions distinctly", () => {
    invalid(edit(["schemaVersion"], 2), "version", ["schemaVersion"]);
  });
  it.each([
    "scenes",
    "objects",
    "changes",
    "evidence",
    "characters",
    "witnesses",
    "statements",
    "contradictions",
    "deductions",
    "hints",
  ] as const)("rejects duplicate IDs in %s", (namespace) => {
    const input = createSyntheticCase();
    invalid(
      { ...input, [namespace]: [...input[namespace], input[namespace][0]] },
      "identity",
      [namespace, input[namespace].length, "id"],
    );
  });
  it.each([
    [["solution", "facts"], "id"],
    [["solution", "events"], "id"],
    [["finalDecision", "choices"], "id"],
    [["deductions", 0, "choices"], "id"],
  ] as const)("checks nested ID namespace %j", (path, field) => {
    const input = createSyntheticCase();
    let list: unknown = input;
    for (const key of path) {
      if (typeof list !== "object" || list === null)
        throw new Error("Invalid path");
      list = Reflect.get(list, key);
    }
    if (!Array.isArray(list)) throw new Error("Expected array");
    invalid(edit(path, [...list, list[0]]), "identity", [...path, 1, field]);
  });
  it("allows IDs reused across namespaces and choices reused across deductions", () => {
    const input = createSyntheticCase();
    const extra = { ...input.deductions[0], id: "fixture-extra" };
    const answer = {
      kind: "single_choice",
      deductionId: extra.id,
      choiceId: "fixture-choice",
    } as const;
    expect(
      validateCaseDefinition({
        ...input,
        deductions: [...input.deductions, extra],
        solution: {
          ...input.solution,
          facts: [
            ...input.solution.facts,
            { id: "fixture-object", description: { key: "fixture.text" } },
          ],
          deductionAnswers: [...input.solution.deductionAnswers, answer],
        },
      }),
    ).toMatchObject({ ok: true });
  });
  it.each([
    ["observationSceneId"],
    ["investigationSceneId"],
    ["objects", 0, "characterId"],
    ["scenes", 0, "visuals", 0, "objectId"],
    ["scenes", 1, "interactionRegions", 0, "objectId"],
    ["changes", 0, "objectId"],
    ["changes", 0, "observationSceneId"],
    ["evidence", 0, "source", "changeId"],
    ["evidence", 0, "relatedObjectIds", 0],
    ["evidence", 0, "relatedCharacterIds", 0],
    ["evidence", 0, "relatedStatementIds", 0],
    ["evidence", 0, "supportingInformation", 0, "id"],
    ["witnesses", 0, "characterId"],
    ["witnesses", 0, "statementIds", 0],
    ["witnesses", 0, "relatedEvidenceIds", 0],
    ["statements", 0, "witnessId"],
    ["statements", 0, "relatedInformation", 0, "id"],
    ["contradictions", 0, "conflictingInformation", 0, "id"],
    ["deductions", 0, "supportingInformation", 0, "id"],
    ["deductions", 0, "choices", 0, "supportingInformation", 0, "id"],
    ["hints", 0, "relatedInformation", 0, "id"],
    ["solution", "correctDecisionId"],
    ["solution", "deductionAnswers", 0, "deductionId"],
    ["solution", "deductionAnswers", 0, "choiceId"],
    ["solution", "events", 0, "relatedObjectIds", 0],
    ["solution", "events", 0, "relatedCharacterIds", 0],
    ["solution", "reconstruction", 0, "eventId"],
    ["solution", "reconstruction", 0, "supportingInformation", 0, "id"],
    ["solution", "supportingInformation", 0, "id"],
  ])("rejects dangling reference at %j", (...path) => {
    invalid(edit(path, "missing-id"), "reference", path);
  });
  it("rejects out-of-bounds rectangles and circles while accepting boundary geometry", () => {
    const path = ["scenes", 1, "interactionRegions", 0, "geometry"];
    invalid(
      edit(path, {
        kind: "rectangle",
        origin: { x: 0.9, y: 0.2 },
        size: { width: 0.2, height: 0.1 },
      }),
      "semantic",
      path,
    );
    invalid(
      edit(path, { kind: "circle", center: { x: 0.1, y: 0.5 }, radius: 0.2 }),
      "semantic",
      path,
    );
    expect(
      validateCaseDefinition(
        edit(path, { kind: "circle", center: { x: 0.5, y: 0.5 }, radius: 0.5 }),
      ),
    ).toMatchObject({ ok: true });
  });
  it("requires canonical answer kinds, completeness, and scoped choice IDs", () => {
    invalid(
      edit(["solution", "deductionAnswers", 0], {
        kind: "multiple_choice",
        deductionId: "fixture-deduction",
        choiceIds: ["fixture-choice"],
      }),
      "semantic",
      ["solution", "deductionAnswers", 0, "kind"],
    );
    invalid(edit(["solution", "deductionAnswers"], []), "semantic", [
      "deductions",
      0,
      "id",
    ]);
    const input = createSyntheticCase();
    invalid(
      edit(
        ["solution", "deductionAnswers"],
        [
          input.solution.deductionAnswers[0],
          input.solution.deductionAnswers[0],
        ],
      ),
      "semantic",
      ["solution", "deductionAnswers", 1, "deductionId"],
    );
    const multiple = {
      ...input,
      deductions: [{ ...input.deductions[0], kind: "multiple_choice" }],
      solution: {
        ...input.solution,
        deductionAnswers: [
          {
            kind: "multiple_choice",
            deductionId: "fixture-deduction",
            choiceIds: ["fixture-choice"],
          },
        ],
      },
    };
    expect(validateCaseDefinition(multiple)).toMatchObject({ ok: true });
    invalid(
      {
        ...multiple,
        solution: {
          ...multiple.solution,
          deductionAnswers: [
            {
              kind: "multiple_choice",
              deductionId: "fixture-deduction",
              choiceIds: ["fixture-choice", "fixture-choice"],
            },
          ],
        },
      },
      "semantic",
      ["solution", "deductionAnswers", 0, "choiceIds", 1],
    );
  });
  it("rejects inconsistent witnesses, contradictions and scoring", () => {
    invalid(edit(["witnesses", 0, "statementIds"], []), "semantic", [
      "statements",
      0,
      "witnessId",
    ]);
    invalid(
      edit(
        ["contradictions", 0, "conflictingInformation"],
        [
          { kind: "statement", id: "fixture-statement" },
          { kind: "statement", id: "fixture-statement" },
        ],
      ),
      "semantic",
      ["contradictions", 0, "conflictingInformation"],
    );
    invalid(
      edit(
        ["scoring", "starThresholds"],
        [
          { stars: 2, minimumScore: 2 },
          { stars: 1, minimumScore: 0 },
        ],
      ),
      "semantic",
      ["scoring", "starThresholds", 1],
    );
    invalid(
      edit(
        ["scoring", "hintPenalties"],
        [
          { level: 1, penalty: 0 },
          { level: 1, penalty: 1 },
        ],
      ),
      "semantic",
      ["scoring", "hintPenalties", 1],
    );
  });
  it("rejects functions without executing them, unknown fields, accessors, cycles, and non-JSON values", () => {
    let called = false;
    const callback = () => {
      called = true;
      return "bad";
    };
    invalid(edit(["changes", 0, "callback"], callback), "structure", [
      "changes",
      0,
      "callback",
    ]);
    invalid(
      edit(["changes", 0, "modulePath"], "./arbitrary-code"),
      "structure",
      ["changes", 0, "modulePath"],
    );
    const input = createSyntheticCase();
    Object.defineProperty(input, "callback", {
      enumerable: true,
      get: callback,
    });
    invalid(input, "structure", ["callback"]);
    expect(called).toBe(false);
    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    invalid(cycle, "structure", ["self"]);
    invalid(edit(["scoring", "timeBonusMaximum"], Infinity), "structure", [
      "scoring",
      "timeBonusMaximum",
    ]);
    invalid(edit(["solution"], new Date()), "structure", ["solution"]);
  });
});
