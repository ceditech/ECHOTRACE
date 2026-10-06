import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  prettier,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "vitest",
                "vitest/*",
                "@vitest/*",
                "@testing-library/*",
                "jsdom",
                "@playwright/*",
                "**/tests/**",
              ],
              message:
                "Keep test-only dependencies and helpers outside application source.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/game/domain/**/*.ts"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "Date",
          property: "now",
          message: "Inject timestamps into the deterministic domain.",
        },
        {
          object: "Math",
          property: "random",
          message: "Inject randomness outside the deterministic domain.",
        },
        {
          object: "crypto",
          property: "randomUUID",
          message: "Inject attempt identifiers into the deterministic domain.",
        },
      ],
      // The initial domain is flat: imports may only name sibling domain modules.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^(?!\\./[A-Za-z0-9_-]+$)",
              message:
                "Domain imports must stay within sibling domain modules; no frameworks, platforms, or outer layers.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    ".kilo/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
