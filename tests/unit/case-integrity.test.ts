import { describe, expect, it } from "vitest";
import type { CaseDefinition } from "@/game/domain/case";
import type { ContradictionDefinition } from "@/game/domain/reasoning";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import { createSyntheticCase } from "../fixtures/synthetic-case";

function expectIssue(
  input: unknown,
  code: string,
  path: readonly (string | number)[],
) {
  const result = validateCaseDefinition(input);
  expect(result.ok).toBe(false);
  if (result.ok) throw new Error("Expected integrity failure");
  expect(result.issues).toContainEqual(
    expect.objectContaining({ category: "semantic", code, path }),
  );
  return result;
}
function contradictionCase(
  kind: ContradictionDefinition["kind"],
  conflictingInformation: ContradictionDefinition["conflictingInformation"],
): CaseDefinition {
  const input = createSyntheticCase();
  return {
    ...input,
    contradictions: [
      {
        id: "fixture-contradiction",
        kind,
        conflictingInformation,
        explanation: { key: "fixture.explanation" },
      },
    ],
  };
}
const statement = { kind: "statement", id: "fixture-statement" } as const;
const evidence = { kind: "evidence", id: "fixture-evidence" } as const;
const change = { kind: "change", id: "fixture-change" } as const;

describe("T05 relationship integrity", () => {
  it("preserves valid reasoning and accepts either order for typed contradiction pairs", () => {
    for (const [kind, pair] of [
      ["evidence_testimony", [evidence, statement]],
      ["evidence_testimony", [statement, evidence]],
      ["visual_testimony", [change, statement]],
      ["visual_testimony", [statement, change]],
      ["visual_testimony", [evidence, statement]],
    ] as const)
      expect(
        validateCaseDefinition(contradictionCase(kind, pair)),
      ).toMatchObject({ ok: true });
  });
  it.each([
    "evidence_testimony",
    "visual_testimony",
    "testimony_testimony",
  ] as const)("rejects incompatible information in %s", (kind) => {
    const pair =
      kind === "testimony_testimony"
        ? ([evidence, statement] as const)
        : ([change, evidence] as const);
    expectIssue(contradictionCase(kind, pair), "contradiction_kind_mismatch", [
      "contradictions",
      0,
      "conflictingInformation",
    ]);
  });
  it("compares testimony from two witnesses and rejects two accounts assigned to one witness", () => {
    const input = contradictionCase("testimony_testimony", [
      statement,
      { kind: "statement", id: "fixture-second-statement" },
    ]);
    const original = input.statements[0];
    const witness = input.witnesses[0];
    const character = input.characters[0];
    if (!original || !witness || !character)
      throw new Error("Incomplete synthetic fixture");
    const second = { ...original, id: "fixture-second-statement" };
    const sameWitness = {
      ...input,
      statements: [...input.statements, second],
      witnesses: [
        { ...witness, statementIds: [...witness.statementIds, second.id] },
      ],
    };
    expectIssue(sameWitness, "testimony_witness_mismatch", [
      "contradictions",
      0,
      "conflictingInformation",
    ]);
    expect(
      validateCaseDefinition({
        ...input,
        characters: [
          ...input.characters,
          { ...character, id: "fixture-second-character" },
        ],
        statements: [
          ...input.statements,
          { ...second, witnessId: "fixture-second-witness" },
        ],
        witnesses: [
          ...input.witnesses,
          {
            ...witness,
            id: "fixture-second-witness",
            characterId: "fixture-second-character",
            statementIds: [second.id],
          },
        ],
      }),
    ).toMatchObject({ ok: true });
  });
  it("keeps the relationship subject stable while allowing its target to change", () => {
    const input = createSyntheticCase();
    const original = input.changes[0];
    if (!original) throw new Error("Missing fixture change");
    const { kind, objectId, ...base } = original;
    void [kind, objectId];
    const objects = [
      ...input.objects,
      { id: "fixture-target-a", description: { key: "fixture.target" } },
      { id: "fixture-target-b", description: { key: "fixture.target" } },
    ];
    const relationship = {
      ...base,
      kind: "relationship_changed",
      before: {
        objectId: "fixture-object",
        relation: "under",
        relatedObjectId: "fixture-target-a",
      },
      after: {
        objectId: "fixture-object",
        relation: "beside",
        relatedObjectId: "fixture-target-b",
      },
    } as const;
    expect(
      validateCaseDefinition({ ...input, objects, changes: [relationship] }),
    ).toMatchObject({ ok: true });
    expectIssue(
      {
        ...input,
        objects,
        changes: [
          {
            ...relationship,
            after: { ...relationship.after, objectId: "fixture-target-a" },
          },
        ],
      },
      "relationship_subject_mismatch",
      ["changes", 0, "after", "objectId"],
    );
  });
  it("preserves red herrings, optional flavor and descriptive link cycles", () => {
    const input = createSyntheticCase();
    const primary = input.evidence[0];
    if (!primary) throw new Error("Missing fixture evidence");
    const flavor = {
      ...primary,
      id: "fixture-flavor",
      category: "red_herring",
      isRequired: false,
      supportingInformation: [evidence],
    } as const;
    // These are contextual support links, not authored unlock dependencies.
    expect(
      validateCaseDefinition({
        ...input,
        evidence: [
          {
            ...primary,
            supportingInformation: [{ kind: "evidence", id: flavor.id }],
          },
          flavor,
        ],
        objects: [
          ...input.objects,
          {
            id: "fixture-unused-object",
            description: { key: "fixture.flavor" },
          },
        ],
      }),
    ).toMatchObject({ ok: true });
  });
  it("does not invent a type matrix for timeline or object-relationship contradictions", () => {
    for (const kind of ["timeline", "object_relationship"] as const)
      expect(
        validateCaseDefinition(
          contradictionCase(kind, [
            { kind: "event", id: "fixture-event" },
            { kind: "fact", id: "fixture-fact" },
          ]),
        ),
      ).toMatchObject({ ok: true });
  });
  it("retains canonical choice ownership even when the choice exists in another question", () => {
    const input = createSyntheticCase();
    const deduction = input.deductions[0];
    if (!deduction) throw new Error("Missing fixture deduction");
    const result = validateCaseDefinition({
      ...input,
      deductions: [
        ...input.deductions,
        {
          ...deduction,
          id: "fixture-other-deduction",
          choices: [
            {
              id: "fixture-other-choice",
              text: { key: "fixture.choice" },
              supportingInformation: [evidence],
            },
          ],
        },
      ],
      solution: {
        ...input.solution,
        deductionAnswers: [
          {
            kind: "single_choice",
            deductionId: deduction.id,
            choiceId: "fixture-other-choice",
          },
          {
            kind: "single_choice",
            deductionId: "fixture-other-deduction",
            choiceId: "fixture-other-choice",
          },
        ],
      },
    });
    expect(result).toMatchObject({
      ok: false,
      issues: [
        expect.objectContaining({
          category: "reference",
          code: "missing_reference",
          path: ["solution", "deductionAnswers", 0, "choiceId"],
        }),
      ],
    });
  });
  it("returns stable codes, paths and order without mutating input", () => {
    const input = contradictionCase("evidence_testimony", [change, evidence]);
    const other = input.contradictions[0];
    if (!other) throw new Error("Missing fixture contradiction");
    const bad = {
      ...input,
      contradictions: [other, { ...other, id: "fixture-second-contradiction" }],
    };
    const before = JSON.stringify(bad);
    const result = validateCaseDefinition(bad);
    expect(result).toEqual(validateCaseDefinition(JSON.parse(before)));
    expect(result).toMatchObject({
      ok: false,
      issues: [
        expect.objectContaining({
          code: "contradiction_kind_mismatch",
          path: ["contradictions", 0, "conflictingInformation"],
        }),
        expect.objectContaining({
          code: "contradiction_kind_mismatch",
          path: ["contradictions", 1, "conflictingInformation"],
        }),
      ],
    });
    expect(JSON.stringify(bad)).toBe(before);
  });
});
