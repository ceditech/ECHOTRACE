import type { CaseDefinition } from "@/game/domain/case";
import type { ReportIssue, ValidationPath } from "./result";

export function checkSemantics(
  data: CaseDefinition,
  report: ReportIssue,
): void {
  const issue = (path: ValidationPath, message: string) =>
    report("semantic", "inconsistent_data", path, message);
  function unique(
    values: readonly (string | number)[],
    path: ValidationPath,
  ): void {
    const seen = new Set<string | number>();
    values.forEach((value, i) => {
      if (seen.has(value)) issue([...path, i], `Repeated value '${value}'`);
      seen.add(value);
    });
  }
  unique(data.metadata.supportedLanguages, ["metadata", "supportedLanguages"]);
  data.scenes.forEach((scene, i) => {
    // Multiple regions for one object are allowed; sprite presence is irrelevant.
    scene.interactionRegions.forEach((region, j) => {
      const shape = region.geometry;
      const path = ["scenes", i, "interactionRegions", j, "geometry"];
      if (shape.kind === "rectangle") {
        if (
          shape.origin.x + shape.size.width > 1 ||
          shape.origin.y + shape.size.height > 1
        )
          issue(path, "Rectangle extends outside normalized scene bounds");
      } else if (
        shape.center.x - shape.radius < 0 ||
        shape.center.y - shape.radius < 0 ||
        shape.center.x + shape.radius > 1 ||
        shape.center.y + shape.radius > 1
      ) {
        issue(path, "Circle extends outside normalized scene bounds");
      }
    });
  });
  data.evidence.forEach((evidence, i) => {
    evidence.supportingInformation.forEach((reference, j) => {
      if (reference.kind === "evidence" && reference.id === evidence.id)
        issue(
          ["evidence", i, "supportingInformation", j],
          "Evidence cannot be its own supporting information",
        );
    });
  });
  data.changes.forEach((change, i) => {
    const path = ["changes", i];
    if (change.observationSceneId === change.investigationSceneId)
      issue(path, "A change must compare distinct scene definitions");
    if (
      change.kind === "object_exchanged" &&
      change.objectIds[0] === change.objectIds[1]
    )
      issue(
        [...path, "objectIds"],
        "An exchange requires two distinct objects",
      );
    let unchanged = false;
    switch (change.kind) {
      case "object_moved":
        unchanged =
          change.from.x === change.to.x && change.from.y === change.to.y;
        break;
      case "object_rotated":
        unchanged = (change.toDegrees - change.fromDegrees) % 360 === 0;
        break;
      case "object_opened_closed":
        unchanged = change.before === change.after;
        break;
      case "object_state_changed":
        unchanged = change.beforeState === change.afterState;
        break;
      case "object_quantity_changed":
        unchanged = change.beforeQuantity === change.afterQuantity;
        break;
      case "relationship_changed":
        for (const side of ["before", "after"] as const) {
          if (change[side].objectId === change[side].relatedObjectId)
            issue(
              [...path, side],
              "An object relationship cannot reference itself",
            );
        }
        unchanged =
          change.before.objectId === change.after.objectId &&
          change.before.relation === change.after.relation &&
          change.before.relatedObjectId === change.after.relatedObjectId;
        break;
    }
    if (unchanged)
      issue(path, "Declared change has identical before and after states");
  });
  const witnesses = new Map(
    data.witnesses.map((witness) => [witness.id, witness]),
  );
  const statements = new Map(
    data.statements.map((statement) => [statement.id, statement]),
  );
  const witnessStatements = new Map(
    data.witnesses.map((witness) => [
      witness.id,
      new Set(witness.statementIds),
    ]),
  );
  data.witnesses.forEach((witness, i) => {
    unique(witness.statementIds, ["witnesses", i, "statementIds"]);
    witness.statementIds.forEach((id, j) => {
      const statement = statements.get(id);
      if (statement && statement.witnessId !== witness.id)
        issue(
          ["witnesses", i, "statementIds", j],
          "Statement belongs to a different witness",
        );
    });
  });
  data.statements.forEach((statement, i) => {
    if (
      witnesses.has(statement.witnessId) &&
      !witnessStatements.get(statement.witnessId)?.has(statement.id)
    )
      issue(
        ["statements", i, "witnessId"],
        "Owning witness must list this statement",
      );
  });
  data.contradictions.forEach((contradiction, i) => {
    const [first, second] = contradiction.conflictingInformation;
    if (first.kind === second.kind && first.id === second.id)
      issue(
        ["contradictions", i, "conflictingInformation"],
        "A contradiction requires two distinct information references",
      );
  });
  const deductions = new Map(
    data.deductions.map((deduction) => [deduction.id, deduction]),
  );
  const answered = new Set<string>();
  data.solution.deductionAnswers.forEach((answer, i) => {
    const path = ["solution", "deductionAnswers", i];
    if (answered.has(answer.deductionId))
      issue(
        [...path, "deductionId"],
        "A deduction must have exactly one canonical answer structure",
      );
    answered.add(answer.deductionId);
    const deduction = deductions.get(answer.deductionId);
    if (deduction && deduction.kind !== answer.kind)
      issue(
        [...path, "kind"],
        "Canonical answer kind does not match its deduction",
      );
    if (answer.kind === "multiple_choice")
      unique(answer.choiceIds, [...path, "choiceIds"]);
  });
  data.deductions.forEach((deduction, i) => {
    if (!answered.has(deduction.id))
      issue(["deductions", i, "id"], "Deduction has no canonical answer");
  });
  unique(
    data.scoring.hintPenalties.map((penalty) => penalty.level),
    ["scoring", "hintPenalties"],
  );
  unique(
    data.scoring.starThresholds.map((threshold) => threshold.stars),
    ["scoring", "starThresholds"],
  );
  data.scoring.starThresholds.forEach((threshold, i) => {
    const previous = data.scoring.starThresholds[i - 1];
    if (
      previous &&
      (previous.stars >= threshold.stars ||
        previous.minimumScore > threshold.minimumScore)
    )
      issue(
        ["scoring", "starThresholds", i],
        "Thresholds must increase in star order and not decrease in minimum score",
      );
  });
}
