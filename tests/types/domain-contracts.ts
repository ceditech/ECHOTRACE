import type { CaseDefinition } from "@/game/domain/case";
import type { ChangeDefinition, InteractionRegion } from "@/game/domain/scene";
import type { DeductionAnswer, HintLevel } from "@/game/domain/reasoning";
import type { GamePhase } from "@/game/domain/session";

// This file is checked by tsc, not executed by Vitest or imported by the app.
const missingObjectRegion: InteractionRegion = {
  objectId: "contract-object",
  geometry: {
    kind: "rectangle",
    origin: { x: 0, y: 0 },
    size: { width: 0.1, height: 0.1 },
  },
};
const versions: Pick<CaseDefinition, "schemaVersion" | "caseVersion"> = {
  schemaVersion: 1,
  caseVersion: 2,
};
const phase: GamePhase = "evidence_review";
const multipleAnswer: DeductionAnswer = {
  kind: "multiple_choice",
  deductionId: "contract-deduction",
  choiceIds: ["contract-choice"],
};

const invalidAnswer: DeductionAnswer = {
  kind: "multiple_choice",
  deductionId: "contract-deduction",
  // @ts-expect-error A multiple-choice answer cannot use the single-choice shape.
  choiceId: "contract-choice",
};
// @ts-expect-error Hints have exactly three authored levels.
const invalidHint: HintLevel = 4;
// @ts-expect-error Unknown phases must not enter the domain vocabulary.
const invalidPhase: GamePhase = "free_play";
// @ts-expect-error Content cannot use executable callbacks as a change kind.
const invalidChange: ChangeDefinition["kind"] = "callback";
// @ts-expect-error Schema and case versions cannot collapse into a single version.
const missingCaseVersion: Pick<
  CaseDefinition,
  "schemaVersion" | "caseVersion"
> = { schemaVersion: 1 };
// @ts-expect-error Authored case data cannot be mutated by consumers.
versions.caseVersion = 3;

void [
  missingObjectRegion,
  versions,
  phase,
  multipleAnswer,
  invalidAnswer,
  invalidHint,
  invalidPhase,
  invalidChange,
  missingCaseVersion,
];
