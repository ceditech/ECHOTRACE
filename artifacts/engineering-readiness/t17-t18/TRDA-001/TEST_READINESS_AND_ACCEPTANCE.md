# Test readiness and acceptance

Vitest 5.0.3 runs Node-based unit and integration files, with separate TypeScript contract coverage. Existing source includes lifecycle, host, bridge, session and case tests. The tracker records historical browser checks. This task ran no tests. Mocked host checks and fake clocks cannot certify real rendering, touch, accessibility or visibility/suspension behavior. [vitest.config.mts](../../../../vitest.config.mts) · [package.json](../../../../package.json) · [TESTING_STRATEGY.md](../../../../TESTING_STRATEGY.md) · [phaser-host.test.tsx](../../../../tests/unit/phaser-host.test.tsx) · [renderer-bridge.test.ts](../../../../tests/unit/renderer-bridge.test.ts) · [session-machine.test.ts](../../../../tests/unit/session-machine.test.ts) · [case-001.test.ts](../../../../tests/integration/case-001.test.ts)

| Task | Layer | Future acceptance | Execution |
| --- | --- | --- | --- |
| T17 | Unit | Derive phase projection and asset/version mapping. Reject stale attempt/revision and suppress observation evidence, hit markers and selection. | NOT EXECUTED |
| T17 | Unit/integration | Assert exact authored passport removal, stand exchange and closed wallet move. Compare stable objects and independent regions. Validate rectangle/circle mapping, centering, rotation, letterboxing and padding. | NOT EXECUTED |
| T17 | Integration | Exercise ready, missing/failed assets and retry. Ensure old load results cannot activate a new attempt. Original is complete before active. Changed remains hidden until authorized. | NOT EXECUTED |
| T17 | Integration | Repeat mount/unmount/resize, navigation, Strict Mode and asset failure. Assert one canvas, no orphan subscriptions, no duplicate event delivery and no late state writes. | NOT EXECUTED |
| T17 | Browser/device | Check portrait/landscape effective widths, clipping, keyboard and focus, reduced motion, screen reader status, pointer/touch and stale or adjacent region behavior in the proper phase. Reassess actual clue visibility separately. | NOT EXECUTED |
| T18 | Unit/fake clock | Start only once after readiness. Check 0, 24,999 and 25,000 ms, overshoot, clamped display, delayed/multiple wakes and exactly one timeout per attempt. Test invalid clock samples and wall-clock changes. | NOT EXECUTED |
| T18 | Unit/fake clock | Exercise approved pause policy, including no pause for earliest MVP if selected. If supported, hide Original, preserve remaining time, and guard repeated pause/resume. | NOT EXECUTED |
| T18 | Integration | Test phase gates, timeout masks Original, blocks old intents and hands off once to observation_end. Keep T19 blank/Changed responsibility separate. No new score or completion write. | NOT EXECUTED |
| T18 | Integration | Test reset/new attempt, navigation, unmount, remount and stale callbacks. Cancel scheduling/listeners and reject prior attempt events. | NOT EXECUTED |
| T18 | Browser/device | Test visibility, pagehide/pageshow, BFCache, background throttling, OS sleep, reload and failure recovery under the approved policy. Measure actual visible exposure/flash and no automatic replay. | NOT EXECUTED |
