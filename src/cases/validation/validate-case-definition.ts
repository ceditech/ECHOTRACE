import {
  caseDefinitionSchema,
  SUPPORTED_SCHEMA_VERSION,
} from "../schemas/case-definition";
import { checkDeclarativeData } from "./declarative-data";
import { checkReferences } from "./references";
import type { ReportIssue, ValidationIssue, ValidationResult } from "./result";
import { checkSemantics } from "./semantics";

export function validateCaseDefinition(input: unknown): ValidationResult {
  const issues: ValidationIssue[] = [];
  const report: ReportIssue = (category, code, path, message) =>
    issues.push({ category, code, path, message });
  checkDeclarativeData(input, report);
  if (issues.length > 0) return { ok: false, issues };
  const parsed = caseDefinitionSchema.safeParse(input);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const path = issue.path.map((part) =>
        typeof part === "number" ? part : String(part),
      );
      if (issue.code === "unrecognized_keys") {
        for (const key of issue.keys)
          report(
            "structure",
            "unknown_field",
            [...path, key],
            "Field is not supported by the case schema",
          );
      } else report("structure", "invalid_structure", path, issue.message);
    }
    return { ok: false, issues };
  }
  if (parsed.data.schemaVersion !== SUPPORTED_SCHEMA_VERSION) {
    report(
      "version",
      "unsupported_schema_version",
      ["schemaVersion"],
      `Unsupported schema version; expected ${SUPPORTED_SCHEMA_VERSION}`,
    );
    return { ok: false, issues };
  }
  checkReferences(parsed.data, report);
  // References must be sound before semantics can rely on entity identity.
  if (issues.length === 0) checkSemantics(parsed.data, report);
  return issues.length === 0
    ? { ok: true, value: parsed.data }
    : { ok: false, issues };
}
