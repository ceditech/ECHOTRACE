import type { CaseDefinition } from "@/game/domain/case";
import type { ReportIssue } from "./result";

// Reference existence and T04 semantics have already passed. These checks only
// enforce relationships whose meaning is defined by the authoring vocabulary.
export function checkRelationshipIntegrity(
  data: CaseDefinition,
  report: ReportIssue,
): void {
  data.changes.forEach((change, i) => {
    if (
      change.kind === "relationship_changed" &&
      change.before.objectId !== change.after.objectId
    ) {
      report(
        "semantic",
        "relationship_subject_mismatch",
        ["changes", i, "after", "objectId"],
        "A relationship change must describe the same subject object before and after",
      );
    }
  });
  const statements = new Map(
    data.statements.map((statement) => [statement.id, statement]),
  );
  data.contradictions.forEach((contradiction, i) => {
    const [first, second] = contradiction.conflictingInformation;
    const path = ["contradictions", i, "conflictingInformation"];
    let compatible = true;
    switch (contradiction.kind) {
      case "visual_testimony":
        // A visual observation is a change or evidence; its perceptibility is human review.
        compatible =
          (first.kind === "statement" &&
            (second.kind === "change" || second.kind === "evidence")) ||
          (second.kind === "statement" &&
            (first.kind === "change" || first.kind === "evidence"));
        break;
      case "evidence_testimony":
        compatible =
          (first.kind === "evidence" && second.kind === "statement") ||
          (second.kind === "evidence" && first.kind === "statement");
        break;
      case "testimony_testimony":
        compatible = first.kind === "statement" && second.kind === "statement";
        if (
          compatible &&
          statements.get(first.id)?.witnessId ===
            statements.get(second.id)?.witnessId
        ) {
          report(
            "semantic",
            "testimony_witness_mismatch",
            path,
            "Testimony-versus-testimony compares accounts from two different witnesses",
          );
        }
        break;
      // Timeline and object-relationship pairs have no precise type matrix in
      // the current model. Their references remain checked by T04.
      case "timeline":
      case "object_relationship":
        break;
    }
    if (!compatible)
      report(
        "semantic",
        "contradiction_kind_mismatch",
        path,
        `Information kinds do not match contradiction category '${contradiction.kind}'`,
      );
  });
}
