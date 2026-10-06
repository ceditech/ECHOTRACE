import type { CaseDefinition } from "./case";
import type { ChangeId, EvidenceId } from "./identity";
import type { EvidenceSource } from "./reasoning";
import type { CaseSession } from "./session";

export type EvidenceAvailability =
  | {
      readonly status: "available" | "unavailable";
      readonly changeId: ChangeId;
    }
  | {
      readonly status:
        "already_collected" | "unknown_evidence" | "session_case_mismatch";
    }
  | {
      readonly status: "unsupported_source_semantics";
      readonly sourceKind: EvidenceSource["kind"];
    };

export function evaluateEvidenceAvailability(
  definition: CaseDefinition,
  session: CaseSession,
  evidenceId: EvidenceId,
): EvidenceAvailability {
  if (
    session.caseId !== definition.id ||
    session.caseVersion !== definition.caseVersion
  )
    return { status: "session_case_mismatch" };
  const evidence = definition.evidence.find((item) => item.id === evidenceId);
  if (!evidence) return { status: "unknown_evidence" };
  if (session.evidenceCollected.includes(evidenceId))
    return { status: "already_collected" };
  // Supporting information is justification, never an unlock condition.
  if (evidence.source.kind !== "change")
    return {
      status: "unsupported_source_semantics",
      sourceKind: evidence.source.kind,
    };
  return {
    status: session.correctDiscoveries.includes(evidence.source.changeId)
      ? "available"
      : "unavailable",
    changeId: evidence.source.changeId,
  };
}

export type EvidenceCollectionResult = {
  readonly status:
    | Exclude<EvidenceAvailability["status"], "available">
    | "collected"
    | "collection_not_allowed_in_phase";
  readonly state: CaseSession;
};

export function collectEvidence(
  definition: CaseDefinition,
  session: CaseSession,
  evidenceId: EvidenceId,
): EvidenceCollectionResult {
  const availability = evaluateEvidenceAvailability(
    definition,
    session,
    evidenceId,
  );
  if (availability.status !== "available")
    return { status: availability.status, state: session };
  // Preserve the explicit observation prohibition and terminal attempt boundary.
  // Source satisfaction, rather than a phase alone, establishes availability.
  if (
    ["observation_intro", "observation_active", "observation_end"].includes(
      session.currentPhase,
    ) ||
    session.currentPhase === "results" ||
    session.completionStatus !== "in_progress"
  )
    return { status: "collection_not_allowed_in_phase", state: session };
  return {
    status: "collected",
    state: {
      ...session,
      evidenceCollected: [...session.evidenceCollected, evidenceId],
    },
  };
}
