import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import catalog from "@/cases/content/case-001/en.json";
import raw from "@/cases/content/case-001/case.json";
import { validateCaseDefinition } from "@/cases/validation/validate-case-definition";
import { prepareBriefing } from "@/game/application/briefing";
import { BriefingView } from "@/game/presentation/briefing-view";
import CasePage from "@/app/case/page";
import HomePage from "@/app/page";

function model() {
  const valid = validateCaseDefinition(raw);
  if (!valid.ok) throw new Error("Invalid case");
  const prepared = prepareBriefing(valid.value, catalog);
  if (!prepared.ok) throw new Error("Missing briefing");
  return prepared.model;
}
describe("T16 briefing semantics", () => {
  it("renders approved paragraphs, identity, difficulty and native Start without solution text", () => {
    const html = renderToStaticMarkup(
      <BriefingView
        model={model()}
        onStart={() => undefined}
        startError={false}
      />,
    );
    expect(html).toContain("The Missing Passport</h1>");
    expect(html).toContain("case-001");
    expect(html).toContain("Difficulty: Easy");
    expect(html).toContain(
      "Remember the documents, table numbers and where they belong.\n\nPlease collect my passport",
    );
    expect(html).toContain("then leave the wallet at table 12.");
    expect(html).toMatch(/<button type="button"[^>]*>Start case<\/button>/);
    expect(html).toContain('aria-describedby="start-description"');
    expect(html).not.toContain("case001.");
    expect(html).not.toContain("Their numbers did not.");
    expect(html).not.toContain("exchanged stands");
    expect(html).not.toContain("<canvas");
  });
  it("announces rejected Start without exposing domain diagnostics", () => {
    const html = renderToStaticMarkup(
      <BriefingView model={model()} onStart={() => undefined} startError />,
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain("Please try Start again.");
    expect(html).not.toContain("invalid_command_timestamp");
  });
  it("server-renders a loading status without creating a browser session or scene", () => {
    const html = renderToStaticMarkup(<CasePage />);
    expect(html).toMatch(/^<main\b/);
    expect(html).toContain('role="status"');
    expect(html).toContain("Preparing your case briefing…");
    expect(html).not.toContain("Start case");
    expect(html).not.toContain("<canvas");
  });
  it("adds briefing navigation while preserving the renderer preview and home identity", () => {
    const html = renderToStaticMarkup(<HomePage />);
    expect(html).toContain('href="/case"');
    expect(html).toContain('href="/renderer"');
    expect(html).toContain("EchoTrace</h1>");
  });
});
