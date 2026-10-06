import type { CaseDefinition } from "@/game/domain/case";
import type { ChangeDefinition } from "@/game/domain/scene";

const text = { key: "fixture.text" };
const support = [{ kind: "evidence", id: "fixture-evidence" }] as const;
export function createSyntheticCase() {
  return {
    id: "fixture-case",
    schemaVersion: 1,
    caseVersion: 7,
    metadata: {
      slug: "fixture-case",
      title: text,
      difficulty: "easy",
      estimatedDurationSeconds: 60,
      supportedLanguages: ["en"],
    },
    briefing: {
      setting: text,
      incident: text,
      objective: text,
      instructions: text,
    },
    settings: { observationDurationSeconds: 10, transitionDurationSeconds: 1 },
    observationSceneId: "fixture-before",
    investigationSceneId: "fixture-after",
    scenes: [
      {
        id: "fixture-before",
        background: { id: "fixture-background" },
        visuals: [
          {
            objectId: "fixture-object",
            asset: { id: "fixture-visual" },
            position: { x: 0.2, y: 0.2 },
            size: { width: 0.1, height: 0.1 },
            rotationDegrees: 0,
          },
        ],
        interactionRegions: [],
      },
      {
        id: "fixture-after",
        background: { id: "fixture-background" },
        visuals: [],
        interactionRegions: [
          {
            objectId: "fixture-object",
            geometry: {
              kind: "rectangle",
              origin: { x: 0.2, y: 0.2 },
              size: { width: 0.1, height: 0.1 },
            },
          },
        ],
      },
    ],
    objects: [
      {
        id: "fixture-object",
        description: text,
        characterId: "fixture-character",
      },
    ],
    changes: [
      {
        id: "fixture-change",
        kind: "object_removed",
        objectId: "fixture-object",
        observationSceneId: "fixture-before",
        investigationSceneId: "fixture-after",
        significance: "meaningful",
        isRequired: true,
      },
    ],
    evidence: [
      {
        id: "fixture-evidence",
        title: text,
        description: text,
        source: { kind: "change", changeId: "fixture-change" },
        category: "primary",
        isRequired: true,
        relatedObjectIds: ["fixture-object"],
        relatedCharacterIds: ["fixture-character"],
        relatedStatementIds: ["fixture-statement"],
        supportingInformation: [{ kind: "change", id: "fixture-change" }],
      },
    ],
    characters: [
      {
        id: "fixture-character",
        name: text,
        role: text,
        publicDescription: text,
        relationshipToIncident: text,
      },
    ],
    witnesses: [
      {
        id: "fixture-witness",
        characterId: "fixture-character",
        statementIds: ["fixture-statement"],
        relatedEvidenceIds: ["fixture-evidence"],
      },
    ],
    statements: [
      {
        id: "fixture-statement",
        witnessId: "fixture-witness",
        text,
        truthStatus: "mistaken",
        relatedInformation: [{ kind: "fact", id: "fixture-fact" }],
      },
    ],
    contradictions: [
      {
        id: "fixture-contradiction",
        kind: "evidence_testimony",
        conflictingInformation: [
          { kind: "evidence", id: "fixture-evidence" },
          { kind: "statement", id: "fixture-statement" },
        ],
        explanation: text,
      },
    ],
    deductions: [
      {
        id: "fixture-deduction",
        kind: "single_choice",
        question: text,
        choices: [
          { id: "fixture-choice", text, supportingInformation: support },
        ],
        supportingInformation: [
          { kind: "contradiction", id: "fixture-contradiction" },
        ],
      },
    ],
    finalDecision: {
      question: text,
      choices: [{ id: "fixture-decision", text }],
    },
    hints: [
      { id: "fixture-hint", level: 1, text, relatedInformation: support },
    ],
    solution: {
      correctDecisionId: "fixture-decision",
      deductionAnswers: [
        {
          kind: "single_choice",
          deductionId: "fixture-deduction",
          choiceId: "fixture-choice",
        },
      ],
      facts: [{ id: "fixture-fact", description: text }],
      events: [
        {
          id: "fixture-event",
          description: text,
          relatedCharacterIds: ["fixture-character"],
          relatedObjectIds: ["fixture-object"],
        },
      ],
      explanation: text,
      reconstruction: [
        {
          eventId: "fixture-event",
          explanation: text,
          supportingInformation: support,
        },
      ],
      supportingInformation: [{ kind: "deduction", id: "fixture-deduction" }],
    },
    scoring: {
      baseCompletionScore: 0,
      correctChangeScore: 1,
      importantEvidenceScore: 1,
      deductionScore: 1,
      finalDecisionScore: 1,
      incorrectSelectionPenalty: 0,
      hintPenalties: [{ level: 1, penalty: 0 }],
      timeBonusMaximum: 0,
      starThresholds: [
        { stars: 1, minimumScore: 0 },
        { stars: 2, minimumScore: 2 },
      ],
    },
  } satisfies CaseDefinition;
}

export function createChangeVariants(): ChangeDefinition[] {
  const base = {
    id: "fixture-change",
    observationSceneId: "fixture-before",
    investigationSceneId: "fixture-after",
    significance: "meaningful",
    isRequired: true,
  } as const;
  return [
    { ...base, kind: "object_added", objectId: "fixture-object" },
    { ...base, kind: "object_removed", objectId: "fixture-object" },
    {
      ...base,
      kind: "object_moved",
      objectId: "fixture-object",
      from: { x: 0, y: 0 },
      to: { x: 1, y: 1 },
    },
    {
      ...base,
      kind: "object_rotated",
      objectId: "fixture-object",
      fromDegrees: 0,
      toDegrees: 90,
    },
    {
      ...base,
      kind: "object_opened_closed",
      objectId: "fixture-object",
      before: "open",
      after: "closed",
    },
    {
      ...base,
      kind: "object_exchanged",
      objectIds: ["fixture-object", "fixture-other"],
    },
    {
      ...base,
      kind: "object_state_changed",
      objectId: "fixture-object",
      beforeState: "state-a",
      afterState: "state-b",
    },
    {
      ...base,
      kind: "object_quantity_changed",
      objectId: "fixture-object",
      beforeQuantity: 1,
      afterQuantity: 2,
    },
    {
      ...base,
      kind: "relationship_changed",
      before: {
        objectId: "fixture-object",
        relation: "under",
        relatedObjectId: "fixture-other",
      },
      after: {
        objectId: "fixture-object",
        relation: "beside",
        relatedObjectId: "fixture-other",
      },
    },
  ];
}
