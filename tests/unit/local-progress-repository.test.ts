import { describe, expect, it } from "vitest";
import {
  LocalProgressRepository,
  progressStorageKey,
} from "@/infrastructure/persistence/local-progress-repository";
import type { ProgressStorage } from "@/infrastructure/persistence/local-progress-repository";
import type { CompletedAttempt } from "@/game/domain/progress";

class MemoryStorage implements ProgressStorage {
  readonly values = new Map<string, string>();
  writes = 0;
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.values.set(key, value);
    this.writes += 1;
  }
}
const attempt: CompletedAttempt = {
  caseId: "fixture-case",
  caseVersion: 7,
  attemptId: "A",
  completedAt: 200,
  score: 1000,
};
const key = progressStorageKey(attempt.caseId, 7);
describe("T10 local progress persistence", () => {
  it("survives repository recreation, counts distinct attempts and makes duplicate saves no-ops", async () => {
    const storage = new MemoryStorage();
    storage.values.set("unrelated", "keep");
    const repository = new LocalProgressRepository(storage);
    expect(await repository.getCaseProgress(attempt.caseId, 7)).toEqual({
      ok: true,
      progress: null,
      recovered: false,
    });
    expect(await repository.saveCompletedAttempt(attempt)).toMatchObject({
      ok: true,
      progress: { attemptCount: 1, bestScore: 1000 },
    });
    const serialized = storage.values.get(key);
    const recreated = new LocalProgressRepository(storage);
    await recreated.saveCompletedAttempt({ ...attempt, score: 9999 });
    expect(storage.writes).toBe(1);
    expect(storage.values.get(key)).toBe(serialized);
    expect(
      await recreated.saveCompletedAttempt({
        ...attempt,
        attemptId: "B",
        score: 1500,
      }),
    ).toMatchObject({ progress: { attemptCount: 2, bestScore: 1500 } });
    await recreated.saveCompletedAttempt({
      ...attempt,
      attemptId: "C",
      score: 500,
    });
    await recreated.saveCompletedAttempt({
      ...attempt,
      attemptId: "D",
      score: 1500,
    });
    expect(await recreated.getCaseProgress(attempt.caseId, 7)).toMatchObject({
      progress: { attemptCount: 4, bestScore: 1500 },
    });
    expect(storage.values.get("unrelated")).toBe("keep");
    expect(JSON.parse(storage.values.get(key) ?? "{}")).toEqual({
      schemaVersion: 1,
      attempts: [
        attempt,
        { ...attempt, attemptId: "B", score: 1500 },
        { ...attempt, attemptId: "C", score: 500 },
        { ...attempt, attemptId: "D", score: 1500 },
      ],
    });
  });
  it("isolates case ID and authored version keys", async () => {
    const repository = new LocalProgressRepository(new MemoryStorage());
    await repository.saveCompletedAttempt(attempt);
    await repository.saveCompletedAttempt({
      ...attempt,
      caseVersion: 8,
      score: 2000,
    });
    await repository.saveCompletedAttempt({
      ...attempt,
      caseId: "other",
      score: 3000,
    });
    expect(await repository.getCaseProgress(attempt.caseId, 7)).toMatchObject({
      progress: { bestScore: 1000, attemptCount: 1 },
    });
    expect(await repository.getCaseProgress(attempt.caseId, 8)).toMatchObject({
      progress: { bestScore: 2000, attemptCount: 1 },
    });
    expect(await repository.getCaseProgress("other", 7)).toMatchObject({
      progress: { bestScore: 3000, attemptCount: 1 },
    });
  });
  it.each(["{broken", "null", "{}", '{"schemaVersion":1,"attempts":null}'])(
    "recovers malformed data explicitly: %s",
    async (raw) => {
      const storage = new MemoryStorage();
      storage.values.set(key, raw);
      const repository = new LocalProgressRepository(storage);
      expect(await repository.getCaseProgress(attempt.caseId, 7)).toEqual({
        ok: true,
        progress: null,
        recovered: true,
      });
      expect(storage.values.get(key)).toBe(raw);
      expect(await repository.saveCompletedAttempt(attempt)).toMatchObject({
        ok: true,
        recovered: true,
        progress: { attemptCount: 1 },
      });
    },
  );
  it("salvages valid entries without counting invalid, foreign or duplicate entries", async () => {
    const storage = new MemoryStorage();
    storage.values.set(
      key,
      JSON.stringify({
        schemaVersion: 1,
        attempts: [
          attempt,
          { ...attempt, score: 9999 },
          { ...attempt, attemptId: "B", score: -1 },
          { ...attempt, caseVersion: 8 },
          { ...attempt, caseId: "other" },
          { ...attempt, attemptId: "C", completedAt: "bad" },
          { ...attempt, attemptId: "D", score: 1200 },
        ],
      }),
    );
    expect(
      await new LocalProgressRepository(storage).getCaseProgress(
        attempt.caseId,
        7,
      ),
    ).toMatchObject({
      ok: true,
      recovered: true,
      progress: { attemptCount: 2, bestScore: 1200 },
    });
    const repository = new LocalProgressRepository(storage);
    expect(
      await repository.saveCompletedAttempt({
        ...attempt,
        attemptId: "E",
        score: 900,
      }),
    ).toMatchObject({
      ok: true,
      recovered: true,
      progress: { attemptCount: 3, bestScore: 1200 },
    });
    expect(await repository.getCaseProgress(attempt.caseId, 7)).toMatchObject({
      ok: true,
      recovered: false,
      progress: { attemptCount: 3, bestScore: 1200 },
    });
  });
  it("preserves unsupported formats and refuses writes", async () => {
    const storage = new MemoryStorage();
    const raw = JSON.stringify({ schemaVersion: 2, attempts: [attempt] });
    storage.values.set(key, raw);
    const repository = new LocalProgressRepository(storage);
    expect(await repository.getCaseProgress(attempt.caseId, 7)).toEqual({
      ok: false,
      code: "UNSUPPORTED_VERSION",
    });
    expect(await repository.saveCompletedAttempt(attempt)).toEqual({
      ok: false,
      code: "UNSUPPORTED_VERSION",
    });
    expect(storage.values.get(key)).toBe(raw);
    expect(storage.writes).toBe(0);
  });
  it("returns typed failures for unavailable storage and quota errors", async () => {
    const blocked = new LocalProgressRepository({
      getItem() {
        throw new Error("blocked");
      },
      setItem() {
        throw new Error("blocked");
      },
    });
    expect(await blocked.getCaseProgress(attempt.caseId, 7)).toEqual({
      ok: false,
      code: "STORAGE_READ_FAILED",
    });
    expect(await blocked.saveCompletedAttempt(attempt)).toEqual({
      ok: false,
      code: "STORAGE_READ_FAILED",
    });
    const full = new LocalProgressRepository({
      getItem() {
        return JSON.stringify({ schemaVersion: 1, attempts: [attempt] });
      },
      setItem() {
        throw new Error("quota");
      },
    });
    expect(
      await full.saveCompletedAttempt({
        ...attempt,
        attemptId: "B",
        score: 9999,
      }),
    ).toEqual({
      ok: false,
      code: "STORAGE_WRITE_FAILED",
    });
    expect(await full.getCaseProgress(attempt.caseId, 7)).toMatchObject({
      ok: true,
      progress: { attemptCount: 1, bestScore: 1000 },
    });
  });
  it("rejects invalid write inputs without touching storage", async () => {
    const storage = new MemoryStorage();
    const repository = new LocalProgressRepository(storage);
    for (const invalid of [
      { ...attempt, score: Infinity },
      { ...attempt, attemptId: " " },
      { ...attempt, caseVersion: 0 },
      { ...attempt, completedAt: NaN },
    ])
      expect(await repository.saveCompletedAttempt(invalid)).toEqual({
        ok: false,
        code: "INVALID_INPUT",
      });
    expect(await repository.getCaseProgress("", 7)).toEqual({
      ok: false,
      code: "INVALID_INPUT",
    });
    expect(storage.writes).toBe(0);
  });
});
