import type { AssetId, CaseId } from "../domain/identity";

export type CaseSourceResult =
  | {
      readonly ok: true;
      readonly raw: unknown;
      readonly declaredAssetIds: readonly AssetId[];
    }
  | {
      readonly ok: false;
      readonly code: "unknown_case" | "source_unavailable";
    };

export interface CaseSource {
  read(caseId: CaseId): Promise<CaseSourceResult>;
}
