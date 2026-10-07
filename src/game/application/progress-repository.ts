import type { CompletedAttempt } from "@/game/domain/progress";
import type { CaseProgress } from "@/game/domain/session";

export type ProgressRepositoryResult =
  | {
      readonly ok: true;
      readonly progress: CaseProgress | null;
      readonly recovered: boolean;
    }
  | {
      readonly ok: false;
      readonly code:
        | "INVALID_INPUT"
        | "UNSUPPORTED_VERSION"
        | "STORAGE_READ_FAILED"
        | "STORAGE_WRITE_FAILED";
    };

export interface ProgressRepository {
  getCaseProgress(
    caseId: string,
    caseVersion: number,
  ): Promise<ProgressRepositoryResult>;
  saveCompletedAttempt(
    attempt: CompletedAttempt,
  ): Promise<ProgressRepositoryResult>;
}
