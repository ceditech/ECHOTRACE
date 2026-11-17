# F3-B isolated synthetic harness

Implementation and technical verification only under owner T17-N14-B authorization. No participant research, personal data, production adoption, geometry migration or governance change.

Built-in Node only: `node test-harness.cjs`; server: `node serve.cjs`. Use the printed 127.0.0.1 URL. No dependency install or application build. Stop the server after preflight.

This package reads the exact CCV pair in place, verifies byte hashes, then decodes those verified bytes. No artwork copy is created. The server serves only fixed browser files and two read-only image routes. Direct file opening is unsupported.

Open the separate presentation window; Prepare; Start. The console stays separate from the image. Responses and review are fixed SYNTHETIC fixtures, with no free-text entry. Records exist in memory only. Reload discards them. In-memory serialization is not a real-study storage/export workflow.

B1 is 215×120.9375 CSS pixels; B2 is 300×168.75. The 25-second Original, 2-second blank and up-to 60-second recall have no participant countdown. Visibility/resize/bounds changes invalidate and conceal. Reset requires a new synthetic trial. Callback timestamps and rendering opportunities are not physical-exposure proof; no timing or size tolerance is approved.

Input-test modes intentionally simulate wrong hash, missing input or decoder failure without editing source images. The delay button creates a labeled 100ms scheduling disturbance and marks timing uncertain. These are technical diagnostics only.

Historical references: [protocol](../observation-human-test/TEST_PROTOCOL.md), [rubric](../observation-human-test/SCORING_RUBRIC.md), [N03 fit evidence](../../../engineering-readiness/t17-t18/T17-N03-presentation-corrections/BROWSER_RETEST_MATRIX.md), [governance](../owner-decision-ratification/DECISION_DEPENDENCY_MAP.md). The original viewer and all old evidence remain protected.

See [technical verification](TECHNICAL_VERIFICATION.md) for executed checks and remaining gates.

Browser preflight found that preparing while the scene window was hidden correctly failed closed. Prepare and Start now explicitly focus the presentation window before sending their command. Both exact-size conditions then loaded successfully. If the local execution context denies loopback access (EACCES), use an owner-authorized context that permits loopback; do not weaken the server binding or tests.

This is a synthetic-only demonstrator: mock scoring, mock consent and mock independent review are not operational research capabilities. Browser resize/visibility interruption verification remains outstanding; see the verification matrix. Do not use this package for participants.
