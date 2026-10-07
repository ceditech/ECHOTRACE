import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-12 sm:px-10">
      <p className="mb-4 text-sm font-semibold text-slate-300">
        Stage 1 — Vertical Slice
      </p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        EchoTrace
      </h1>
      <p className="mt-6 text-2xl font-medium">Observe. Remember. Deduce.</p>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
        Visual detective mysteries where every detail leaves a trace.
      </p>
      <Link
        href="/renderer"
        className="mt-8 self-start rounded-lg border border-slate-600 px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        View scene preview
      </Link>
    </main>
  );
}
