import type { CaseDefinition } from "./case";
import type { ChangeId, EvidenceId } from "./identity";
import type { ChangeDefinition } from "./scene";
import type { CaseSession, SelectionRecord } from "./session";
import { evaluateEvidenceAvailability } from "./evidence";

export type SelectionResult =
  | {
      readonly outcome: "CORRECT_CHANGE";
      readonly changeId: ChangeId;
      readonly availableEvidenceIds: readonly EvidenceId[];
      readonly state: CaseSession;
    }
  | {
      readonly outcome: "ALREADY_DISCOVERED";
      readonly changeId: ChangeId;
      readonly state: CaseSession;
    }
  | {
      readonly outcome:
        | "INCORRECT"
        | "NON_INTERACTIVE"
        | "UNKNOWN_TARGET"
        | "AMBIGUOUS"
        | "SELECTION_NOT_ALLOWED_IN_PHASE"
        | "INVALID_SELECTION_TIMESTAMP"
        | "SESSION_CASE_MISMATCH";
      readonly state: CaseSession;
    };

function matchesObject(change: ChangeDefinition, objectId: string): boolean {
  switch (change.kind) {
    case "object_exchanged":
      return change.objectIds.includes(objectId);
    case "relationship_changed":
      return change.before.objectId === objectId;
    default:
      return change.objectId === objectId;
  }
}

export function evaluateSelection(
  definition: CaseDefinition,
  session: CaseSession,
  selection: SelectionRecord,
): SelectionResult {
  if (
    session.caseId !== definition.id ||
    session.caseVersion !== definition.caseVersion
  )
    return { outcome: "SESSION_CASE_MISMATCH", state: session };
  if (
    session.currentPhase !== "investigation_active" ||
    session.completionStatus !== "in_progress"
  )
    return { outcome: "SELECTION_NOT_ALLOWED_IN_PHASE", state: session };
  if (
    !Number.isFinite(selection.selectedAt) ||
    selection.selectedAt < session.startedAt ||
    (session.investigationStartedAt !== null &&
      selection.selectedAt < session.investigationStartedAt)
  )
    return { outcome: "INVALID_SELECTION_TIMESTAMP", state: session };
  if (!definition.objects.some((object) => object.id === selection.objectId))
    return { outcome: "UNKNOWN_TARGET", state: session };
  const scene = definition.scenes.find(
    (item) => item.id === definition.investigationSceneId,
  );
  if (
    !scene?.interactionRegions.some(
      (region) => region.objectId === selection.objectId,
    )
  )
    return { outcome: "NON_INTERACTIVE", state: session };
  const changes = definition.changes.filter(
    (change) =>
      change.observationSceneId === definition.observationSceneId &&
      change.investigationSceneId === definition.investigationSceneId &&
      matchesObject(change, selection.objectId),
  );
  // Resolve all authored candidates before considering prior discoveries.
  if (changes.length > 1) return { outcome: "AMBIGUOUS", state: session };
  const change = changes[0];
  if (!change)
    return {
      outcome: "INCORRECT",
      state: {
        ...session,
        selectedObjects: [...session.selectedObjects, { ...selection }],
        incorrectSelections: [...session.incorrectSelections, { ...selection }],
      },
    };
  if (session.correctDiscoveries.includes(change.id))
    return {
      outcome: "ALREADY_DISCOVERED",
      changeId: change.id,
      state: session,
    };
  const state: CaseSession = {
    ...session,
    selectedObjects: [...session.selectedObjects, { ...selection }],
    correctDiscoveries: [...session.correctDiscoveries, change.id],
  };
  return {
    outcome: "CORRECT_CHANGE",
    changeId: change.id,
    state,
    availableEvidenceIds: definition.evidence
      .filter(
        (evidence) =>
          evidence.source.kind === "change" &&
          evidence.source.changeId === change.id &&
          evaluateEvidenceAvailability(definition, state, evidence.id)
            .status === "available",
      )
      .map((evidence) => evidence.id),
  };
}
