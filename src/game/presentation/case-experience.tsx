"use client";

import Link from "next/link";
import { useEffect, useReducer, useRef } from "react";
import catalog from "@/cases/content/case-001/en.json";
import { bundledCaseSource } from "@/infrastructure/cases/bundled-case-source";
import {
  initialBriefingState,
  loadBriefing,
  reduceBriefing,
} from "../application/briefing";
import { BriefingView } from "./briefing-view";

export function CaseExperience() {
  const [state, dispatch] = useReducer(reduceBriefing, initialBriefingState);
  const handoffHeading = useRef<HTMLHeadingElement>(null);
  const phase = state.status === "ready" ? state.session.currentPhase : null;

  useEffect(() => {
    let current = true;
    const controller = new AbortController();
    void loadBriefing(
      state.requestId,
      bundledCaseSource,
      catalog,
      () => ({ attemptId: crypto.randomUUID(), startedAt: Date.now() }),
      () => current,
      controller.signal,
    )
      .then((action) => {
        if (current && action) dispatch(action);
      })
      .catch(() => {
        if (current)
          dispatch({
            type: "failed",
            requestId: state.requestId,
            code: "case_load_failed",
          });
      });
    // The loader cannot abort imports; obsolete completions must never initialize/commit a session.
    return () => {
      current = false;
      controller.abort();
    };
  }, [state.requestId]);

  useEffect(() => {
    if (phase === "observation_intro") handoffHeading.current?.focus();
  }, [phase]);

  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-5 py-8 sm:px-10 sm:py-12">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded text-sm text-slate-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
      >
        ← Back to EchoTrace
      </Link>
      <div className="mt-6">
        {state.status === "loading" && (
          <p
            role="status"
            className="rounded-2xl border border-slate-700 p-8 text-slate-200"
          >
            Preparing your case briefing…
          </p>
        )}
        {state.status === "failed" && (
          <section
            aria-labelledby="load-error-title"
            className="rounded-2xl border border-slate-700 p-8"
          >
            <h1 id="load-error-title" className="text-2xl font-bold">
              The briefing could not load
            </h1>
            <p role="alert" className="mt-4 text-slate-300">
              We could not prepare this case. You can retry or return to
              EchoTrace.
            </p>
            <button
              type="button"
              onClick={() => dispatch({ type: "retry" })}
              className="mt-6 rounded-xl bg-amber-300 px-6 py-3 font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Retry briefing
            </button>
          </section>
        )}
        {state.status === "ready" &&
          (state.session.currentPhase === "case_briefing" ? (
            <BriefingView
              model={state.model}
              startError={state.startError}
              onStart={() =>
                dispatch({
                  type: "start",
                  attemptId: state.session.attemptId,
                  at: Date.now(),
                })
              }
            />
          ) : (
            <section
              aria-labelledby="observation-intro-title"
              className="rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-10"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
                {state.model.title}
              </p>
              <h1
                ref={handoffHeading}
                tabIndex={-1}
                id="observation-intro-title"
                className="mt-4 rounded text-3xl font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Ready to observe
              </h1>
              <p className="mt-5 leading-relaxed text-slate-200">
                Your case has started. The observation scene is not available
                yet.
              </p>
              <p className="mt-3 text-sm text-slate-300">
                No countdown is running. Return to EchoTrace when you are ready.
              </p>
            </section>
          ))}
      </div>
    </main>
  );
}
