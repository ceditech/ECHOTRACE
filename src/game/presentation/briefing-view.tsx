import type { BriefingModel } from "../application/briefing";

const difficultyLabels = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  expert: "Expert",
};
const controlStyle =
  "rounded-xl bg-amber-300 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300";

export function BriefingView({
  model,
  onStart,
  startError,
}: {
  readonly model: BriefingModel;
  readonly onStart: () => void;
  readonly startError: boolean;
}) {
  return (
    <section
      aria-labelledby="briefing-title"
      className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl sm:p-10"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <p className="font-semibold uppercase tracking-widest text-amber-300">
          Case 001 · {model.caseId}
        </p>
        <p className="rounded-full border border-slate-600 px-3 py-1 text-slate-200">
          Difficulty: {difficultyLabels[model.difficulty]}
        </p>
      </div>
      <h1
        id="briefing-title"
        className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
      >
        {model.title}
      </h1>
      <p className="mt-4 text-lg text-slate-300">{model.setting}</p>
      <div className="mt-8 space-y-7 text-base leading-relaxed sm:text-lg">
        <section aria-labelledby="incident-title">
          <h2
            id="incident-title"
            className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-200"
          >
            The incident
          </h2>
          <p className="whitespace-pre-wrap text-slate-200">{model.incident}</p>
        </section>
        <section aria-labelledby="objective-title">
          <h2
            id="objective-title"
            className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-200"
          >
            Your objective
          </h2>
          <p>{model.objective}</p>
        </section>
        <section
          aria-labelledby="instructions-title"
          className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"
        >
          <h2
            id="instructions-title"
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-200"
          >
            Before you begin
          </h2>
          <p className="whitespace-pre-wrap text-slate-200">
            {model.instructions}
          </p>
        </section>
      </div>
      <p
        id="start-description"
        className="mt-8 text-sm leading-relaxed text-slate-300"
      >
        Take your time with the briefing. Start when you are ready.
      </p>
      {startError && (
        <p role="alert" className="mt-4 text-sm text-amber-200">
          The case could not start. Please try Start again.
        </p>
      )}
      <button
        type="button"
        aria-describedby="start-description"
        onClick={onStart}
        className={"mt-4 w-full sm:w-auto " + controlStyle}
      >
        Start case
      </button>
    </section>
  );
}
