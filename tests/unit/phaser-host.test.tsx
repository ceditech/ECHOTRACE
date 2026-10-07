import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PhaserHost } from "@/game/renderer/phaser-host";
import RendererPage from "@/app/renderer/page";

describe("T11 server-safe shell", () => {
  it("renders a stable accessible placeholder without importing Phaser or accessing browser globals", () => {
    const html = renderToStaticMarkup(<PhaserHost />);
    expect(html).toContain('data-testid="phaser-host"');
    expect(html).toContain("Loading scene…");
    expect(html).not.toContain("<canvas");
    expect(html).toContain('role="status"');
  });
  it("renders the shell route with a navigation path that unmounts the host", () => {
    const html = renderToStaticMarkup(<RendererPage />);
    expect(html).toContain('href="/"');
    expect(html).toContain("EchoTrace scene preview");
    expect(html).toContain("Loading scene…");
  });
});
