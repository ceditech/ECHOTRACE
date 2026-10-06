import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("EchoTrace scaffold", () => {
  it("renders the semantic home page through the TypeScript source alias", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toMatch(/^<main\b/);
    expect(html).toMatch(/<h1\b[^>]*>EchoTrace<\/h1>/);
    expect(html).toContain("Observe. Remember. Deduce.");
    expect(html).toContain("Stage 1 — Vertical Slice");
  });
});
