import type { CaseDefinition } from "@/game/domain/case";
import type { InformationReference } from "@/game/domain/reasoning";
import type { ReportIssue, ValidationPath } from "./result";

export function checkReferences(
  data: CaseDefinition,
  report: ReportIssue,
): void {
  function index<T extends { readonly id: string }>(
    entities: readonly T[],
    path: ValidationPath,
  ): Map<string, T> {
    const result = new Map<string, T>();
    entities.forEach((entity, i) => {
      if (result.has(entity.id))
        report(
          "identity",
          "duplicate_id",
          [...path, i, "id"],
          `Duplicate ID '${entity.id}' in this namespace`,
        );
      else result.set(entity.id, entity);
    });
    return result;
  }
  const scenes = index(data.scenes, ["scenes"]);
  const objects = index(data.objects, ["objects"]);
  const changes = index(data.changes, ["changes"]);
  const evidence = index(data.evidence, ["evidence"]);
  const characters = index(data.characters, ["characters"]);
  const witnesses = index(data.witnesses, ["witnesses"]);
  const statements = index(data.statements, ["statements"]);
  const contradictions = index(data.contradictions, ["contradictions"]);
  const deductions = index(data.deductions, ["deductions"]);
  const decisions = index(data.finalDecision.choices, [
    "finalDecision",
    "choices",
  ]);
  index(data.hints, ["hints"]);
  const facts = index(data.solution.facts, ["solution", "facts"]);
  const events = index(data.solution.events, ["solution", "events"]);
  const information = {
    change: changes,
    evidence,
    statement: statements,
    fact: facts,
    event: events,
    contradiction: contradictions,
    deduction: deductions,
  };
  function reference(
    ids: ReadonlyMap<string, unknown>,
    id: string,
    path: ValidationPath,
  ): void {
    if (!ids.has(id))
      report(
        "reference",
        "missing_reference",
        path,
        `Referenced ID '${id}' does not exist in its namespace`,
      );
  }
  function references(
    ids: ReadonlyMap<string, unknown>,
    values: readonly string[],
    path: ValidationPath,
  ): void {
    values.forEach((id, i) => reference(ids, id, [...path, i]));
  }
  function informationReferences(
    values: readonly InformationReference[],
    path: ValidationPath,
  ): void {
    values.forEach((value, i) =>
      reference(information[value.kind], value.id, [...path, i, "id"]),
    );
  }
  reference(scenes, data.observationSceneId, ["observationSceneId"]);
  reference(scenes, data.investigationSceneId, ["investigationSceneId"]);
  data.objects.forEach((object, i) => {
    if (object.characterId !== undefined)
      reference(characters, object.characterId, ["objects", i, "characterId"]);
  });
  data.scenes.forEach((scene, i) => {
    scene.visuals.forEach((visual, j) =>
      reference(objects, visual.objectId, [
        "scenes",
        i,
        "visuals",
        j,
        "objectId",
      ]),
    );
    scene.interactionRegions.forEach((region, j) =>
      reference(objects, region.objectId, [
        "scenes",
        i,
        "interactionRegions",
        j,
        "objectId",
      ]),
    );
  });
  data.changes.forEach((change, i) => {
    const path = ["changes", i];
    reference(scenes, change.observationSceneId, [
      ...path,
      "observationSceneId",
    ]);
    reference(scenes, change.investigationSceneId, [
      ...path,
      "investigationSceneId",
    ]);
    if (change.kind === "object_exchanged")
      references(objects, change.objectIds, [...path, "objectIds"]);
    else if (change.kind === "relationship_changed") {
      for (const side of ["before", "after"] as const) {
        reference(objects, change[side].objectId, [...path, side, "objectId"]);
        reference(objects, change[side].relatedObjectId, [
          ...path,
          side,
          "relatedObjectId",
        ]);
      }
    } else reference(objects, change.objectId, [...path, "objectId"]);
  });
  data.evidence.forEach((item, i) => {
    const path = ["evidence", i];
    const source = item.source;
    const sourcePath = [...path, "source"];
    switch (source.kind) {
      case "change":
        reference(changes, source.changeId, [...sourcePath, "changeId"]);
        break;
      case "object":
      case "document":
        reference(objects, source.objectId, [...sourcePath, "objectId"]);
        break;
      case "statement":
        reference(statements, source.statementId, [
          ...sourcePath,
          "statementId",
        ]);
        break;
      case "timestamp":
        reference(events, source.eventId, [...sourcePath, "eventId"]);
        break;
      case "environment":
        reference(scenes, source.sceneId, [...sourcePath, "sceneId"]);
        break;
      case "deduction":
        reference(deductions, source.deductionId, [
          ...sourcePath,
          "deductionId",
        ]);
        break;
    }
    references(objects, item.relatedObjectIds, [...path, "relatedObjectIds"]);
    references(characters, item.relatedCharacterIds, [
      ...path,
      "relatedCharacterIds",
    ]);
    references(statements, item.relatedStatementIds, [
      ...path,
      "relatedStatementIds",
    ]);
    informationReferences(item.supportingInformation, [
      ...path,
      "supportingInformation",
    ]);
  });
  data.witnesses.forEach((witness, i) => {
    reference(characters, witness.characterId, ["witnesses", i, "characterId"]);
    references(statements, witness.statementIds, [
      "witnesses",
      i,
      "statementIds",
    ]);
    references(evidence, witness.relatedEvidenceIds, [
      "witnesses",
      i,
      "relatedEvidenceIds",
    ]);
  });
  data.statements.forEach((statement, i) => {
    reference(witnesses, statement.witnessId, ["statements", i, "witnessId"]);
    informationReferences(statement.relatedInformation, [
      "statements",
      i,
      "relatedInformation",
    ]);
  });
  data.contradictions.forEach((item, i) =>
    informationReferences(item.conflictingInformation, [
      "contradictions",
      i,
      "conflictingInformation",
    ]),
  );
  const choiceIndexes = new Map<string, Map<string, unknown>>();
  data.deductions.forEach((deduction, i) => {
    choiceIndexes.set(
      deduction.id,
      index(deduction.choices, ["deductions", i, "choices"]),
    );
    informationReferences(deduction.supportingInformation, [
      "deductions",
      i,
      "supportingInformation",
    ]);
    deduction.choices.forEach((choice, j) =>
      informationReferences(choice.supportingInformation, [
        "deductions",
        i,
        "choices",
        j,
        "supportingInformation",
      ]),
    );
  });
  reference(decisions, data.solution.correctDecisionId, [
    "solution",
    "correctDecisionId",
  ]);
  data.solution.deductionAnswers.forEach((answer, i) => {
    const path = ["solution", "deductionAnswers", i];
    reference(deductions, answer.deductionId, [...path, "deductionId"]);
    const choices = choiceIndexes.get(answer.deductionId);
    if (choices) {
      if (answer.kind === "single_choice")
        reference(choices, answer.choiceId, [...path, "choiceId"]);
      else references(choices, answer.choiceIds, [...path, "choiceIds"]);
    }
  });
  data.solution.events.forEach((event, i) => {
    references(characters, event.relatedCharacterIds, [
      "solution",
      "events",
      i,
      "relatedCharacterIds",
    ]);
    references(objects, event.relatedObjectIds, [
      "solution",
      "events",
      i,
      "relatedObjectIds",
    ]);
  });
  data.solution.reconstruction.forEach((step, i) => {
    reference(events, step.eventId, [
      "solution",
      "reconstruction",
      i,
      "eventId",
    ]);
    informationReferences(step.supportingInformation, [
      "solution",
      "reconstruction",
      i,
      "supportingInformation",
    ]);
  });
  informationReferences(data.solution.supportingInformation, [
    "solution",
    "supportingInformation",
  ]);
  data.hints.forEach((hint, i) =>
    informationReferences(hint.relatedInformation, [
      "hints",
      i,
      "relatedInformation",
    ]),
  );
}
