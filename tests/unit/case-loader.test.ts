import { describe, expect, it, vi } from "vitest";
import { loadCase } from "@/cases/load-case";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import {
  BundledCaseSource,
  bundledCaseSource,
} from "@/infrastructure/cases/bundled-case-source";
import { createSyntheticCase } from "../fixtures/synthetic-case";

const assets = ["fixture-background", "fixture-visual"];
function source(raw: unknown, declaredAssetIds: readonly string[] = assets) {
  return new BundledCaseSource(
    new Map([["fixture-case", { read: async () => raw, declaredAssetIds }]]),
  );
}

describe("T13 case loading trust boundary", () => {
  it("loads equivalent trusted content repeatedly without mutating authored source or versions", async () => {
    const raw = createSyntheticCase();
    const before = structuredClone(raw);
    const input = source(raw);
    const first = await loadCase("fixture-case", input);
    const second = await loadCase("fixture-case", input);
    expect(first.ok).toBe(true);
    expect(second).toEqual(first);
    if (!first.ok || !second.ok) throw new Error("Expected valid case");
    expect(first.value.schemaVersion).toBe(1);
    expect(first.value.caseVersion).toBe(7);
    expect(first.value).not.toBe(raw);
    expect(first.value).not.toBe(second.value);
    expect(raw).toEqual(before);
  });
  it("resolves only exact registered IDs and never converts caller IDs to paths", async () => {
    const read = vi.fn(async () => createSyntheticCase());
    const input = new BundledCaseSource(
      new Map([["fixture-case", { read, declaredAssetIds: assets }]]),
    );
    for (const id of [
      "unknown",
      "../fixture-case",
      "C:\\secrets.json",
      "https://example.com/case.json",
      "__proto__",
      "constructor",
    ])
      expect(await loadCase(id, input)).toEqual({
        ok: false,
        code: "unknown_case",
      });
    expect(read).not.toHaveBeenCalled();
    expect(await loadCase("fixture-case", bundledCaseSource)).toEqual({
      ok: false,
      code: "unknown_case",
    });
  });
  it("bounds source/import exceptions without exposing paths or stacks", async () => {
    const error = new Error("private local path");
    const input = new BundledCaseSource(
      new Map([
        [
          "fixture-case",
          {
            read: async () => {
              throw error;
            },
            declaredAssetIds: assets,
          },
        ],
      ]),
    );
    expect(await loadCase("fixture-case", input)).toEqual({
      ok: false,
      code: "source_unavailable",
    });
    expect(
      await loadCase("fixture-case", {
        read: async () => {
          throw error;
        },
      }),
    ).toEqual({ ok: false, code: "source_unavailable" });
  });
  it("distinguishes malformed JSON from structurally invalid parsed content", async () => {
    expect(await loadCase("fixture-case", source("{"))).toEqual({
      ok: false,
      code: "malformed_source",
    });
    const invalid = await loadCase("fixture-case", source("null"));
    expect(invalid.ok).toBe(false);
    if (invalid.ok) throw new Error("Unexpected trust");
    expect(invalid.code).toBe("invalid_case");
    expect(invalid).not.toHaveProperty("value");
  });
  it("rejects unsupported schemas using existing version issues", async () => {
    const raw = { ...createSyntheticCase(), schemaVersion: 2 };
    const validation = validateCaseDefinition(raw);
    const loaded = await loadCase("fixture-case", source(raw));
    expect(loaded).toEqual({ ...validation, code: "unsupported_schema" });
    expect(loaded).not.toHaveProperty("value");
  });
  it.each([
    { name: "structure", raw: { ...createSyntheticCase(), caseVersion: 0 } },
    {
      name: "reference",
      raw: { ...createSyntheticCase(), investigationSceneId: "missing-scene" },
    },
    {
      name: "semantic",
      raw: {
        ...createSyntheticCase(),
        metadata: {
          ...createSyntheticCase().metadata,
          supportedLanguages: ["en", "en"],
        },
      },
    },
  ])(
    "preserves authoritative $name validation issues without trusted partial content",
    async ({ raw }) => {
      const validation = validateCaseDefinition(raw);
      expect(validation.ok).toBe(false);
      const loaded = await loadCase("fixture-case", source(raw));
      expect(loaded).toEqual({ ...validation, code: "invalid_case" });
      expect(loaded).not.toHaveProperty("value");
    },
  );
  it("rejects executable content without executing it", async () => {
    const callback = vi.fn();
    const raw = {
      ...createSyntheticCase(),
      briefing: { ...createSyntheticCase().briefing, objective: callback },
    };
    const validation = validateCaseDefinition(raw);
    expect(await loadCase("fixture-case", source(raw))).toEqual({
      ...validation,
      code: "invalid_case",
    });
    expect(callback).not.toHaveBeenCalled();
  });
  it("rejects registry/content identity mismatch without overriding authored ID", async () => {
    const result = await loadCase(
      "fixture-case",
      source({ ...createSyntheticCase(), id: "other-case" }),
    );
    expect(result).toMatchObject({
      ok: false,
      code: "case_id_mismatch",
      issues: [{ path: ["id"] }],
    });
    expect(result).not.toHaveProperty("value");
  });
  it("rejects undeclared assets with structured reference paths", async () => {
    const result = await loadCase(
      "fixture-case",
      source(createSyntheticCase(), ["fixture-background"]),
    );
    expect(result).toMatchObject({
      ok: false,
      code: "missing_asset_declaration",
      issues: [
        {
          category: "reference",
          code: "missing_asset_declaration",
          path: ["scenes", 0, "visuals", 0, "asset", "id"],
        },
      ],
    });
    expect(result).not.toHaveProperty("value");
  });
  it("revalidates changed source on every load rather than trusting a cached value", async () => {
    let raw: unknown = createSyntheticCase();
    const read = vi.fn(async () => raw);
    const input = new BundledCaseSource(
      new Map([["fixture-case", { read, declaredAssetIds: assets }]]),
    );
    expect((await loadCase("fixture-case", input)).ok).toBe(true);
    raw = { invalid: true };
    expect((await loadCase("fixture-case", input)).ok).toBe(false);
    expect(read).toHaveBeenCalledTimes(2);
  });
  it("snapshots registry declarations against caller mutation", async () => {
    const declarations = [...assets];
    const entries = new Map([
      [
        "fixture-case",
        {
          read: async () => createSyntheticCase(),
          declaredAssetIds: declarations,
        },
      ],
    ]);
    const input = new BundledCaseSource(entries);
    entries.clear();
    declarations.length = 0;
    expect((await loadCase("fixture-case", input)).ok).toBe(true);
  });
});
