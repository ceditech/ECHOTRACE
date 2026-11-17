/* Research only. No production registration or participant execution permission. */
(function (root) {
  "use strict";
  const config = Object.freeze({
    revision: "T17-N14-B-v1", syntheticOnly: true, researchExecutionAuthorized: false,
    conditions: Object.freeze({ B1: Object.freeze({ width: 215, height: 120.9375 }), B2: Object.freeze({ width: 300, height: 168.75 }) }),
    timing: Object.freeze({ original: 25000, blank: 2000, recall: 60000 }),
    inputs: Object.freeze({
      original: Object.freeze({ url: "/research-inputs/original.png", hash: "d7a4bbb6c141b1c2b9d15c38591f16ff6bc4d80629cad0877ce05a43a2993945" }),
      changed: Object.freeze({ url: "/research-inputs/changed.png", hash: "4668c32059ec29c4b087f2efcd46f8e64d2829c042545228b6e2031df5cde7ba" })
    }),
    instruction: "Look carefully at the scene. Try to remember the objects, table numbers and where things are located.",
    mockRecall: "SYNTHETIC: A document booklet disappeared from the left mat; 12 and 21 exchanged tables; the same closed wallet moved left to right.",
    mockPrompt: "SYNTHETIC PROMPT: What did the brown item look like?",
    mockAnswer: "SYNTHETIC ANSWER: A closed wallet with a star. Fabricated technical fixture, not recognition evidence."
  });
  if (typeof module !== "undefined") module.exports = config;
  else root.F3B_CONFIG = config;
})(typeof globalThis === "undefined" ? this : globalThis);
