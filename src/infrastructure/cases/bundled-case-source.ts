import type {
  CaseSource,
  CaseSourceResult,
} from "@/game/application/case-source";
import type { AssetId, CaseId } from "@/game/domain/identity";

export interface BundledCaseEntry {
  // Only repository-controlled imports belong here, never paths supplied by a caller.
  readonly read: () => Promise<unknown>;
  readonly declaredAssetIds: readonly AssetId[];
}

export class BundledCaseSource implements CaseSource {
  private readonly entries: ReadonlyMap<CaseId, BundledCaseEntry>;

  constructor(entries: ReadonlyMap<CaseId, BundledCaseEntry>) {
    this.entries = new Map(
      [...entries].map(([id, entry]) => [
        id,
        {
          read: entry.read,
          declaredAssetIds: [...entry.declaredAssetIds],
        },
      ]),
    );
  }

  async read(caseId: CaseId): Promise<CaseSourceResult> {
    const entry = this.entries.get(caseId);
    if (!entry) return { ok: false, code: "unknown_case" };
    try {
      const raw = await entry.read();
      return { ok: true, raw, declaredAssetIds: [...entry.declaredAssetIds] };
    } catch {
      // Import failures become a bounded application error, without paths or stack traces.
      return { ok: false, code: "source_unavailable" };
    }
  }
}

// Logical declarations only: artwork and physical asset resolution remain deferred.
export const bundledCaseSource = new BundledCaseSource(
  new Map([
    [
      "case-001",
      {
        read: async () =>
          (await import("@/cases/content/case-001/case.json")).default,
        declaredAssetIds: [
          "asset-lounge-background",
          "asset-table",
          "asset-document-mat",
          "asset-owen-backpack",
          "asset-passport",
          "asset-star-wallet",
          "asset-stand-12",
          "asset-stand-21",
        ],
      },
    ],
  ]),
);
