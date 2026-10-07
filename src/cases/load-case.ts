import type { CaseDefinition } from "@/game/domain/case";
import type { CaseId } from "@/game/domain/identity";
import type {
  CaseSource,
  CaseSourceResult,
} from "@/game/application/case-source";
import type { ValidationIssue } from "./validation/result";
import { validateCaseDefinition } from "./validation/validate-case-definition";

export type CaseLoadResult =
  | { readonly ok: true; readonly value: CaseDefinition }
  | {
      readonly ok: false;
      readonly code: "unknown_case" | "source_unavailable" | "malformed_source";
    }
  | {
      readonly ok: false;
      readonly code:
        | "invalid_case"
        | "unsupported_schema"
        | "case_id_mismatch"
        | "missing_asset_declaration";
      readonly issues: readonly ValidationIssue[];
    };

export async function loadCase(
  caseId: CaseId,
  source: CaseSource,
): Promise<CaseLoadResult> {
  let content: CaseSourceResult;
  try {
    content = await source.read(caseId);
  } catch {
    return { ok: false, code: "source_unavailable" };
  }
  if (!content.ok) return content;
  let raw: unknown = content.raw;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return { ok: false, code: "malformed_source" };
    }
  }
  const validated = validateCaseDefinition(raw);
  if (!validated.ok)
    return {
      ok: false,
      code: validated.issues.some(
        (issue) => issue.code === "unsupported_schema_version",
      )
        ? "unsupported_schema"
        : "invalid_case",
      issues: validated.issues,
    };
  if (validated.value.id !== caseId)
    return {
      ok: false,
      code: "case_id_mismatch",
      issues: [
        {
          category: "identity",
          code: "case_id_mismatch",
          path: ["id"],
          message: "Authored case ID does not match the requested registry ID",
        },
      ],
    };
  const assets = new Set(content.declaredAssetIds);
  const issues: ValidationIssue[] = [];
  // T04 validates identifier syntax; the source catalog declares which assets this bundle provides.
  validated.value.scenes.forEach((scene, sceneIndex) => {
    const check = (id: string, path: readonly (string | number)[]) => {
      if (!assets.has(id))
        issues.push({
          category: "reference",
          code: "missing_asset_declaration",
          path,
          message: "Referenced asset is not declared by the case source",
        });
    };
    check(scene.background.id, ["scenes", sceneIndex, "background", "id"]);
    scene.visuals.forEach((visual, index) =>
      check(visual.asset.id, [
        "scenes",
        sceneIndex,
        "visuals",
        index,
        "asset",
        "id",
      ]),
    );
  });
  return issues.length > 0
    ? { ok: false, code: "missing_asset_declaration", issues }
    : validated;
}
