import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import raw from "@/cases/content/case-001/case.json";
import catalog from "@/cases/content/case-001/en.json";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import type { TextReference } from "@/game/domain/identity";

const dossier = readFileSync(
  new URL("../../docs/cases/CASE_001_THE_MISSING_PASSPORT.md", import.meta.url),
  "utf8",
).replace(/\r/g, "");
const english: Readonly<Record<string, string>> = catalog;
function text(reference: TextReference): string {
  const value = english[reference.key];
  if (value === undefined) throw new Error("Missing text: " + reference.key);
  return value;
}
function section(number: number): string {
  const heading = "## " + number + ". ";
  const start = dossier.indexOf(heading);
  if (start < 0) throw new Error("Missing canonical section");
  const end = dossier.indexOf("\n## ", start + heading.length);
  return dossier.slice(start, end < 0 ? undefined : end);
}
function quotes(number: number): string {
  return section(number)
    .split("\n")
    .filter((line) => line.startsWith(">"))
    .map((line) => line.replace(/^> ?/, ""))
    .join("\n")
    .trim();
}
function assertTextCoverage(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(assertTextCoverage);
    return;
  }
  if (value !== null && typeof value === "object") {
    if ("key" in value && typeof value.key === "string")
      expect(english[value.key]).toEqual(expect.any(String));
    Object.values(value).forEach(assertTextCoverage);
  }
}

describe("frozen Case 001 content", () => {
  it("passes the existing structural, reference and semantic pipeline", () => {
    const result = validateCaseDefinition(raw);
    expect(result.ok, JSON.stringify(result)).toBe(true);
    expect(raw).toMatchObject({
      id: "case-001",
      schemaVersion: 1,
      caseVersion: 1,
      metadata: { difficulty: "easy", supportedLanguages: ["en"] },
      settings: { observationDurationSeconds: 25 },
    });
    expect(raw.metadata.estimatedDurationSeconds).toBeGreaterThanOrEqual(180);
    expect(raw.metadata.estimatedDurationSeconds).toBeLessThanOrEqual(300);
  });
  it("resolves every authored text reference and preserves briefing/request and resolution paragraphs", () => {
    assertTextCoverage(raw);
    expect(
      Object.values(catalog).every((value) => value.trim().length > 0),
    ).toBe(true);
    expect(text(raw.briefing.incident)).toBe(quotes(2));
    expect(text(raw.briefing.instructions)).toContain(quotes(3));
    expect(text(raw.solution.explanation)).toBe(quotes(15));
    expect(text(raw.solution.explanation).split("\n\n")).toHaveLength(6);
  });
  it("preserves eight exact statements and their classifications from the frozen dossier", () => {
    const rows = section(11)
      .split("\n")
      .filter((line) => /^\| S-/.test(line));
    expect(rows).toHaveLength(8);
    expect(raw.statements).toHaveLength(8);
    for (const row of rows) {
      const cells = row
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      const id = cells[0]?.match(/`([^`]+)`/)?.[1];
      const statement = raw.statements.find((item) => item.id === id);
      if (!statement) throw new Error("Missing canonical statement");
      expect(text(statement.text)).toBe(cells[1]);
      expect(statement.truthStatus).toBe(cells[2]);
    }
    expect(raw.characters).toHaveLength(4);
    expect(raw.witnesses).toHaveLength(4);
    expect(
      raw.statements
        .filter((item) => item.truthStatus === "mistaken")
        .map((item) => item.id),
    ).toEqual(["statement-nia-restoration"]);
  });
  it("preserves ordered deduction/final choices, canonical answers and contradiction references", () => {
    const deduction = raw.deductions[0];
    if (!deduction) throw new Error("Missing deduction");
    expect(raw.deductions).toHaveLength(1);
    for (const [number, question, choices] of [
      [13, deduction.question, deduction.choices],
      [14, raw.finalDecision.question, raw.finalDecision.choices],
    ] as const) {
      expect(text(question)).toBe(
        section(number).match(/\*\*Question:\*\* (.+)/)?.[1],
      );
      const rows = section(number)
        .split("\n")
        .filter((line) => /^\| [A-D] \|/.test(line));
      expect(choices).toHaveLength(4);
      expect(choices.map((choice) => [choice.id, text(choice.text)])).toEqual(
        rows.map((row) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim());
          return [cells[1]?.replace(/`/g, ""), cells[2]];
        }),
      );
    }
    expect(raw.solution.deductionAnswers).toEqual([
      {
        kind: "single_choice",
        deductionId: "deduction-delivery-route",
        choiceId: "choice-route-swapped-labels",
      },
    ]);
    expect(raw.solution.correctDecisionId).toBe(
      "decision-accidental-misdelivery",
    );
    expect(raw.contradictions).toEqual([
      expect.objectContaining({
        kind: "visual_testimony",
        conflictingInformation: [
          { kind: "statement", id: "statement-nia-restoration" },
          { kind: "evidence", id: "evidence-stands-exchanged" },
        ],
      }),
    ]);
  });
  it("keeps exactly three required changes and distinct change-sourced primary evidence", () => {
    expect(raw.changes.map((item) => item.id)).toEqual([
      "change-passport-removed",
      "change-stands-exchanged",
      "change-wallet-moved",
    ]);
    expect(
      raw.changes.every(
        (item) => item.isRequired && item.significance === "meaningful",
      ),
    ).toBe(true);
    expect(raw.evidence).toHaveLength(3);
    expect(
      raw.evidence.every(
        (item) =>
          item.isRequired &&
          item.category === "primary" &&
          item.source.kind === "change",
      ),
    ).toBe(true);
    expect(raw.evidence.map((item) => item.source.changeId)).toEqual(
      raw.changes.map((item) => item.id),
    );
    const evidenceRows = section(10)
      .split("\n")
      .filter((line) => /^\| E[123] /.test(line));
    expect(raw.evidence.map((item) => text(item.description))).toEqual(
      evidenceRows.map((row) => row.split("|")[3]?.trim()),
    );
    expect(raw.scoring).toEqual({
      baseCompletionScore: 1000,
      correctChangeScore: 200,
      importantEvidenceScore: 250,
      deductionScore: 300,
      finalDecisionScore: 0,
      incorrectSelectionPenalty: 100,
      hintPenalties: [],
      timeBonusMaximum: 0,
      starThresholds: [],
    });
    expect(raw.hints).toEqual([]);
  });
  it("preserves table/stand identity, wallet movement and the absent passport region", () => {
    const before = raw.scenes.find(
      (scene) => scene.id === raw.observationSceneId,
    );
    const after = raw.scenes.find(
      (scene) => scene.id === raw.investigationSceneId,
    );
    if (!before || !after) throw new Error("Missing scene pair");
    const position = (scene: typeof before, id: string) =>
      scene.visuals.find((item) => item.objectId === id)?.position;
    expect(position(before, "object-stand-12")).toEqual({ x: 0.35, y: 0.25 });
    expect(position(after, "object-stand-12")).toEqual({ x: 0.75, y: 0.25 });
    expect(position(before, "object-stand-21")).toEqual({ x: 0.75, y: 0.25 });
    expect(position(after, "object-stand-21")).toEqual({ x: 0.35, y: 0.25 });
    expect(position(before, "object-star-wallet")).toEqual({
      x: 0.38,
      y: 0.65,
    });
    expect(position(after, "object-star-wallet")).toEqual({ x: 0.75, y: 0.65 });
    expect(position(before, "object-passport")).toEqual({ x: 0.18, y: 0.65 });
    expect(position(after, "object-passport")).toBeUndefined();
    expect(
      after.interactionRegions.find(
        (region) => region.objectId === "object-passport",
      )?.geometry,
    ).toEqual({
      kind: "rectangle",
      origin: { x: 0.09, y: 0.5 },
      size: { width: 0.18, height: 0.3 },
    });
    for (const id of [
      "object-table-window",
      "object-table-plant",
      "object-document-mat",
      "object-owen-backpack",
    ])
      expect(after.visuals.find((item) => item.objectId === id)).toEqual(
        before.visuals.find((item) => item.objectId === id),
      );
    expect(
      raw.changes.find((item) => item.kind === "object_exchanged")?.objectIds,
    ).toEqual(["object-stand-12", "object-stand-21"]);
  });
  it("preserves complete ordered chronology including collection, enclosure and recovery", () => {
    expect(raw.solution.events.map((event) => event.id)).toEqual([
      "event-setup",
      "event-request",
      "event-observation",
      "event-away",
      "event-swap",
      "event-collect",
      "event-enclose",
      "event-handoff",
      "event-recipient-check",
      "event-disappearance",
      "event-investigation",
      "event-testimony",
      "event-deduction",
      "event-decision",
      "event-resolution",
    ]);
    expect(raw.solution.reconstruction.map((step) => step.eventId)).toEqual(
      raw.solution.events.map((event) => event.id),
    );
    expect(
      text(
        raw.solution.facts.find((fact) => fact.id === "fact-return-instruction")
          ?.description ?? { key: "" },
      ),
    ).toBe(quotes(3));
  });
  it("rejects broken evidence references and witness ownership without changing validators", () => {
    const brokenReference = structuredClone(raw);
    const evidence = brokenReference.evidence[0];
    if (!evidence) throw new Error("Missing evidence");
    evidence.source.changeId = "unknown-change";
    expect(validateCaseDefinition(brokenReference).ok).toBe(false);
    const brokenOwnership = structuredClone(raw);
    const statement = brokenOwnership.statements[0];
    if (!statement) throw new Error("Missing statement");
    statement.witnessId = "witness-owen";
    expect(validateCaseDefinition(brokenOwnership).ok).toBe(false);
  });
});
