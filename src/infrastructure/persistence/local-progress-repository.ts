import { z } from "zod";
import type {
  ProgressRepository,
  ProgressRepositoryResult,
} from "@/game/application/progress-repository";
import {
  aggregateCaseProgress,
  appendCompletedAttempt,
} from "@/game/domain/progress";
import type { CompletedAttempt } from "@/game/domain/progress";

export interface ProgressStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const identity = z.string().refine((value) => value.trim().length > 0);
const caseIdentity = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_-]*$/);
const caseVersionSchema = z.number().int().positive().safe();
const attemptSchema = z
  .object({
    caseId: caseIdentity,
    caseVersion: caseVersionSchema,
    attemptId: identity,
    completedAt: z.number().finite(),
    score: z.number().finite().nonnegative(),
  })
  .strict();
const envelopeSchema = z
  .object({ schemaVersion: z.literal(1), attempts: z.array(z.unknown()) })
  .strict();
type ReadResult =
  | {
      readonly ok: true;
      readonly attempts: readonly CompletedAttempt[];
      readonly recovered: boolean;
    }
  | Extract<ProgressRepositoryResult, { ok: false }>;

export function progressStorageKey(
  caseId: string,
  caseVersion: number,
): string {
  return `echotrace:progress:v1:${encodeURIComponent(caseId)}:${caseVersion}`;
}

export class LocalProgressRepository implements ProgressRepository {
  // Inject window.localStorage from the browser boundary; constructing this adapter is SSR-safe.
  constructor(private readonly storage: ProgressStorage) {}

  private read(caseId: string, caseVersion: number): ReadResult {
    if (
      !caseIdentity.safeParse(caseId).success ||
      !caseVersionSchema.safeParse(caseVersion).success
    )
      return { ok: false, code: "INVALID_INPUT" };
    let raw: string | null;
    try {
      raw = this.storage.getItem(progressStorageKey(caseId, caseVersion));
    } catch {
      return { ok: false, code: "STORAGE_READ_FAILED" };
    }
    if (raw === null) return { ok: true, attempts: [], recovered: false };
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { ok: true, attempts: [], recovered: true };
    }
    // Preserve unknown formats rather than overwriting them as if they were empty.
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "schemaVersion" in parsed &&
      parsed.schemaVersion !== 1
    )
      return { ok: false, code: "UNSUPPORTED_VERSION" };
    const envelope = envelopeSchema.safeParse(parsed);
    if (!envelope.success) return { ok: true, attempts: [], recovered: true };
    let attempts: readonly CompletedAttempt[] = [];
    let recovered = false;
    for (const entry of envelope.data.attempts) {
      const result = attemptSchema.safeParse(entry);
      if (
        !result.success ||
        result.data.caseId !== caseId ||
        result.data.caseVersion !== caseVersion
      ) {
        recovered = true;
        continue;
      }
      const next = appendCompletedAttempt(attempts, result.data);
      if (next === attempts) recovered = true;
      attempts = next;
    }
    return { ok: true, attempts, recovered };
  }

  async getCaseProgress(
    caseId: string,
    caseVersion: number,
  ): Promise<ProgressRepositoryResult> {
    const result = this.read(caseId, caseVersion);
    if (!result.ok) return result;
    return {
      ok: true,
      progress: aggregateCaseProgress(caseId, caseVersion, result.attempts),
      recovered: result.recovered,
    };
  }

  async saveCompletedAttempt(
    attempt: CompletedAttempt,
  ): Promise<ProgressRepositoryResult> {
    if (!attemptSchema.safeParse(attempt).success)
      return { ok: false, code: "INVALID_INPUT" };
    const result = this.read(attempt.caseId, attempt.caseVersion);
    if (!result.ok) return result;
    const attempts = appendCompletedAttempt(result.attempts, attempt);
    // Read and write remain synchronous within this call: no await can interleave retries.
    if (attempts !== result.attempts || result.recovered) {
      try {
        this.storage.setItem(
          progressStorageKey(attempt.caseId, attempt.caseVersion),
          JSON.stringify({ schemaVersion: 1, attempts }),
        );
      } catch {
        return { ok: false, code: "STORAGE_WRITE_FAILED" };
      }
    }
    return {
      ok: true,
      progress: aggregateCaseProgress(
        attempt.caseId,
        attempt.caseVersion,
        attempts,
      ),
      recovered: result.recovered,
    };
  }
}
