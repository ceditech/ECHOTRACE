import Link from "next/link";
import { BridgePreview } from "@/game/renderer/bridge-preview";

export default function RendererPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-6 py-12 sm:px-10">
      <Link
        href="/"
        className="text-slate-300 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Back to EchoTrace
      </Link>
      <h1 className="mt-8 text-3xl font-bold">EchoTrace scene preview</h1>
      <BridgePreview />
    </main>
  );
}
