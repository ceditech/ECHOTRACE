import type { CaseDefinition } from "@/game/domain/case";

export type ValidationPath = readonly (string | number)[];
export type ValidationCategory =
  "structure" | "version" | "identity" | "reference" | "semantic";
export interface ValidationIssue {
  readonly category: ValidationCategory;
  readonly code: string;
  readonly path: ValidationPath;
  readonly message: string;
}
export type ValidationResult =
  | { readonly ok: true; readonly value: CaseDefinition }
  | { readonly ok: false; readonly issues: readonly ValidationIssue[] };
export type ReportIssue = (
  category: ValidationCategory,
  code: string,
  path: ValidationPath,
  message: string,
) => void;
