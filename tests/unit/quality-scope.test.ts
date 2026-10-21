import { describe, expect, it } from "vitest";
import { getFileInfo } from "prettier";
import { ESLint } from "eslint";

describe("application quality scope and historical asset evidence", () => {
  const evidence =
    "artifacts/asset-validation/case-001/mobile-verification-prototype/core.js";
  const source = "src/game/domain/session-machine.ts";

  it("does not reformat hashed evidence while retaining application formatting", async () => {
    const options = { ignorePath: ".prettierignore" };
    expect((await getFileInfo(evidence, options)).ignored).toBe(true);
    expect((await getFileInfo(source, options)).ignored).toBe(false);
    expect(
      (await getFileInfo("scripts/check-asset-artifacts.mjs", options)).ignored,
    ).toBe(false);
  });

  it("keeps standalone artifact scripts outside Next lint rules, not application code", async () => {
    const eslint = new ESLint();
    expect(await eslint.isPathIgnored(evidence)).toBe(true);
    expect(await eslint.isPathIgnored(source)).toBe(false);
    expect(
      await eslint.isPathIgnored("scripts/check-asset-artifacts.mjs"),
    ).toBe(false);
  });
});
