# T17-N14-B — Synthetic technical verification

## Result and authority

Implementation is complete within the eight-file boundary. Verification is PARTIAL because actual browser visibility and resize interruption were not confirmed. This report grants no research execution readiness, timing tolerance, visual fairness acceptance, artwork adoption or production permission.

Owner authority: N14-A approved; current explicit T17-N14-B authorization supersedes Stage A's implementation prohibition only within the approved boundary. The attached N14 preparation specification supplied the V01–V23 and AC-01–AC-12 definitions. No earlier research or governance document was rewritten.

Mission date: November 16, 2026 (America/Chicago). Repository baseline: `feature/echotrace`, HEAD `3b2a58ab9d23ce7fa653ebbf1f302a0843928900`. Initial worktree clean; output directory absent. Root and baseline were checked before creation.

## Exact created inventory

All paths below are relative to `artifacts/asset-validation/case-001/f3b-research-harness/`:

| File | Responsibility |
|---|---|
| index.html | Separate facilitator console and control-free presentation document |
| viewer.css | Exact B1/B2 frame, uniform containment, neutral surround and external controls |
| viewer.js | Verified decoding, phase sequence, invalidation, diagnostics and synthetic response audit |
| research-config.js | Immutable input identities, condition sizes, timings and fixed mock fixtures |
| test-harness.cjs | 23 built-in Node technical tests |
| serve.cjs | Restricted 127.0.0.1-only HTTP server and read-only source verification |
| README.md | Local operation, authority limits and unresolved checks |
| TECHNICAL_VERIFICATION.md | This evidence record and acceptance matrix |

No persistent screenshots, image copies, trial data, logs, manifests, dependencies or other files were created. Browser screenshots were inspected in the tool session only; none was saved because screenshots are outside this mission's eight-file allowlist.

## Inputs

Both files were read in place under `../controlled-combination-validation/candidate/`:

| Input | SHA-256 | Native dimensions | Evidence |
|---|---|---|---|
| CCV-C1a-C2a-B0-Original-960.png | d7a4bbb6c141b1c2b9d15c38591f16ff6bc4d80629cad0877ce05a43a2993945 | 960 × 540 | Filesystem hash/header; browser verified bytes, successful decode and natural size |
| CCV-C1a-C2a-B0-Changed-960.png | 4668c32059ec29c4b087f2efcd46f8e64d2829c042545228b6e2031df5cde7ba | 960 × 540 | Filesystem hash/header; browser verified bytes, successful decode and natural size |

Server startup checks hashes and PNG dimensions. Browser independently hashes fetched bytes, decodes those same bytes through an in-memory Blob URL, verifies native dimensions and decodes the display elements before enabling Start. No alternate source or production registration exists. These remain research candidates.

## Executed commands

From repository root:

- `node --check artifacts/asset-validation/case-001/f3b-research-harness/viewer.js` — PASS.
- `node --check artifacts/asset-validation/case-001/f3b-research-harness/research-config.js` — PASS.
- `node --check artifacts/asset-validation/case-001/f3b-research-harness/test-harness.cjs` — PASS.
- `node --check artifacts/asset-validation/case-001/f3b-research-harness/serve.cjs` — PASS.
- `node --test --test-reporter=spec artifacts/asset-validation/case-001/f3b-research-harness/test-harness.cjs` — final run: 23 tests, 23 PASS, 0 FAIL, 0 skipped; duration 149.3901 ms.
- `node artifacts/asset-validation/case-001/f3b-research-harness/serve.cjs` — restricted local server exercised in Chrome through the browser extension.
- Read-only Git status/diff/ref/metadata inspection and SHA-256 comparison of all 886 original tracked files — PASS.

Initial restricted-context test run: 22 PASS, V21 failed with loopback EACCES at port 54440. Initial server at 127.0.0.1:64935 was unreachable from Chrome. Retried in an owner-authorized execution context permitting loopback: all 23 passed; server at 127.0.0.1:60287 was reachable. No assertion, server binding, network protection or test was weakened.

Both long-running server sessions were stopped. Subsequent connection probes to ports 64935 and 60287 returned ECONNREFUSED. The ephemeral test server closes in its test's finally block. No production build or application suite was run: no production change is in scope.

## V01–V23 matrix

Node PASS establishes only the named deterministic/source/server assertion. Browser results are separate. NV means NOT VERIFIED, not an inferred pass. For failures, stop the affected preflight; V01–V11/V15–V21 failures block use, V12–V14 uncertainty blocks research execution, V22–V23 failures require a scope/integrity stop.

| ID | Expected behavior and executed method | Node | Browser evidence / limit | Browser essential |
|---|---|---|---|---|
| V01 | Exact input hash and native dimensions | PASS | PASS: both verified and decoded before ready | Yes, actual decode |
| V02 | Wrong hash rejected before decode/Start | PASS | PASS: hash_mismatch, Start disabled | Yes, user-visible concealment |
| V03 | Missing image rejected | PASS | PASS: input_unavailable from deliberate missing route | Yes |
| V04 | Decode failure and wrong native dimensions rejected | PASS | PASS for explicitly simulated decoder exception; actual corrupt-image decoder failure and wrong-native browser case NV | Yes for actual decoder behavior |
| V05 | B1 requested and measured exact size | PASS | PASS: 215 × 120.9375 CSS px | Yes |
| V06 | B2 requested and measured exact size | PASS | PASS: 300 × 168.75 CSS px | Yes |
| V07 | Reject distortion, insufficient viewport and unsupported condition | PASS | Full-frame normal cases observed; undersized viewport rejection NV | Yes for clipping/viewport |
| V08 | No scene controls, overlay, crop or highlighting | PASS | PASS: screenshot inspection; presentation has zero control elements | Yes |
| V09 | Original 25,000 ms; no duplicate Start | PASS | PASS sequence/instrumentation; measured DOM interval 25,005.7 ms | Yes for live trace |
| V10 | Conceal 2,000 ms; no Original replay | PASS | PASS sequence/instrumentation; measured DOM interval 2,010.4 ms | Yes |
| V11 | Recall up to nominal 60,000 ms or manual End | PASS | PASS: B1 auto-end; measured DOM interval 60,004.5 ms; B2 manual End observed | Yes |
| V12 | Hidden presentation invalidates and cancels reveals | PASS | NV: opening another tab did not yield a hidden presentation; cannot count that attempt as a test pass | Yes |
| V13 | Resize invalidates blank/recall and cancels callbacks | PASS | NV: attempted browser viewport/zoom controls did not change observed presentation viewport | Yes |
| V14 | Late scheduling recorded; preserve full next blank | PASS | Natural lateness recorded; deliberate delay-at-deadline browser exercise NV | Yes for browser scheduling characterization |
| V15 | Spontaneous capture locked and immutable | PASS | PASS: capture, lock, disabled recapture; later correction retained original fixture | Yes for workflow |
| V16 | Follow-up only after lock; separate prompted record | PASS | PASS: separate fixture; star remains NOT_DEMONSTRATED in locked spontaneous record | Yes |
| V17 | Monotonic event sequence and matching trial identity | PASS | PASS: ordered B1 live record; tampering/backward clock rejected in Node | No, deterministic part |
| V18 | Complete synthetic audit/review/correction fields | PASS | PASS: mock review and append-only correction observed; not actual independent review | Yes for console workflow |
| V19 | In-memory serialization round trip; reject invalid record | PASS | PASS: event 30 reports equal true, serialized length 8358 | Yes for UI command |
| V20 | Fixed synthetic fields; no personal-data entry/upload | PASS | PASS for exposed UI: no free-text/file entry; source audit found no storage or upload path | No, audit plus UI |
| V21 | Isolated fixed-route server; local binding only | PASS | PASS: package loaded without production application; route/method/Host rejection tested in Node | No for server assertions |
| V22 | Historical viewer remains protected | PASS | Byte-integrity audit PASS; no historical browser rerun | No |
| V23 | Exactly approved eight files; no other changes | PASS | Final Git and protected-file audit PASS | No |

V04's simulated decoder mode is labeled SIMULATED_decoder_failure. It does not manufacture or alter an image. It demonstrates error routing, not a browser's handling of actual corrupted bytes. Likewise Node V08 is a source assertion, supplemented by actual screenshots; it is not a general automated visual-occlusion detector.

## Browser measurements and live trace

Actual environment: desktop Chrome controlled through the browser extension. This is not Android/iOS, a physical mobile device or participant testing. No browser-version claim is made. Reported DPR 1, visualViewport scale 1, landscape-primary. Browser zoom and OS scaling are explicitly MANUAL_NOT_MEASURED; a visualViewport scale of 1 does not independently establish OS scaling or browser zoom.

| Condition | Frame x,y | Requested / measured CSS size | Viewport | Uniform scale from 960 × 540 |
|---|---|---|---|---|
| B1 | 732.5, 386.03125 | 215 × 120.9375 / exact | 1680 × 893 | 0.2239583333 |
| B2 | 690, 362.125 | 300 × 168.75 / exact | 1680 × 893 | 0.3125 |

Both image elements decoded to natural 960 × 540. Full-scene screenshot inspection showed the entire image centered in the neutral surround, with no scene controls or countdown. Exact target dimensions were achieved without adding a tolerance. No recognition or legibility outcome is inferred from these images.

The first B1 prepare attempt returned presentation_not_exact_or_not_visible and concealed both images. Subsequent read-only inspection found exact frame bounds and a visible presentation. The console had not reliably foregrounded that window during preparation. The isolated send helper was corrected to focus the presentation before Prepare/Start; V08 now guards that source behavior. The subsequent B1/B2 preflight succeeded. Visibility remains a fail-closed prerequisite.

B1 synthetic ID: SYNTHETIC-B1-001. `performance.now()` timestamps in milliseconds:

| Event | Timestamp | Interpretation |
|---|---|---|
| inputs_verified_decoded | 19663.1000 | Both exact hashes attached to ordered synthetic record |
| Original requested | 23092.3000 | Requested transition |
| Original DOM update | 23092.7000 | Original unhidden |
| Original rendering opportunity callback | 23093.0000 | Frame timestamp 23089.6; not physical paint evidence |
| Original timer callback | 48098.0000 | Due 48092.7000; lateness 5.3000 |
| Concealment DOM update | 48098.4000 | Both snapshots hidden |
| Concealment timer callback | 50108.4000 | Due 50098.4000; lateness 10.0000 |
| Changed/recall DOM update | 50108.8000 | Changed unhidden |
| Recall timer callback | 110113.0000 | Due 110108.8000; lateness 4.1000 |
| Ended DOM update | 110113.3000 | Both snapshots hidden |
| spontaneous_locked | 134301.7000 | Fixed recall frozen after capture |
| mock_prompted_captured | 135379.4000 | Separate answer, not spontaneous scoring |
| mock_correction_appended | 136380.5000 | Original retained |
| mock_second_review | 137380.5000 | Explicit mock reviewer |
| synthetic_roundtrip_verified | 138372.8000 | equal true; 8358 serialized characters/ASCII bytes |

Fixed recall: “SYNTHETIC: A document booklet disappeared from the left mat; 12 and 21 exchanged tables; the same closed wallet moved left to right.” All three IDENTIFIED values are fixtures, not observations. The locked star identity is NOT_DEMONSTRATED. The later fabricated answer explicitly mentions the star and does not upgrade the spontaneous fixture.

## Timing and interruption limitations

Timers specify nominal durations. Browser callbacks run after scheduling delays; recall is not guaranteed to stop at exactly 60,000 physical milliseconds. Request, DOM update, rendering opportunity and callback timestamps are distinguishable, but none proves exact illuminated display exposure. No millisecond tolerance or research-validity classification has been approved. Every record remains UNAPPROVED_FOR_RESEARCH.

Synthetic tests prove cancellation and no replay after invalidation, including blank/recall resize cases, and a deliberate 120 ms late callback. The browser contains visibilitychange, resize, visualViewport resize and pagehide handling. Real browser interruption delivery/cancellation remains unconfirmed. Temporary viewport overrides were reset; presentation remained 1680 × 893 during the unsuccessful resize attempt. No physical-display occlusion, monitor switching, OS suspension, device rotation or assistive-technology test was performed.

The 100 ms synthetic delay control is implemented and labeled timingUncertain; its browser behavior near a phase deadline was not exercised. Never classify an interrupted/late real trial as valid or select replacement policy using this technical package.

## AC-01–AC-12 acceptance matrix

PASS applies only to this bounded synthetic technical mission. A missing essential browser failure check is preserved as NOT VERIFIED.

| Criterion | Status | Supporting evidence |
|---|---|---|
| AC-01 File boundary | PASS | Exactly eight allowlisted untracked files; V23 and final integrity audit |
| AC-02 Input identity | PASS | Both exact hashes, native dimensions, successful actual browser decoding before ready |
| AC-03 Research condition accuracy | PASS | Requested and live measured B1/B2 bounds recorded above; no tolerance substituted |
| AC-04 Full-frame presentation | PASS | Uniform 16:9 bounds, contain style and B1/B2 screenshot inspection at observed viewport; no controls/overlay |
| AC-05 Timing instrumentation | PASS | V09–V14 deterministic tests and live ordered timing trace; physical timing precision remains unverified |
| AC-06 Protocol integrity | PASS | Neutral screen, fixed sequence, lock before separate follow-up; V15/V16 and browser workflow |
| AC-07 Synthetic evidence integrity | PASS | Ordered trial/hash binding, preserved lock/correction/review, round-trip equality; V17–V19 |
| AC-08 Privacy boundary | PASS | Fixed synthetic fixtures only; no real data, free-text fields, persistence or external upload |
| AC-09 Isolation | PASS | All 886 protected files match baseline; no production imports or changes |
| AC-10 Git integrity | PASS | HEAD/branch/refs/index/config/FETCH_HEAD unchanged; no agent Git mutation |
| AC-11 Failure handling | NOT VERIFIED | Wrong hash/missing/simulated decode fail closed in browser and synthetic invalidation passes; actual browser resize/visibility interruption and undersized viewport rejection remain unconfirmed |
| AC-12 Execution boundary | PASS | Facilitator-only synthetic preflight; no participants, contact, real responses or studies |

AC-11 is a remaining technical gate, not an observed production defect. This matrix does not certify operational consent, privacy storage, independent scoring, recruitment or visual fairness.

## Privacy and synthetic-data audit

No recruitment, participant contact, audio/video, physical-device study or real response collection occurred. IDs are generated SYNTHETIC condition/serial IDs. Screening, consent reference, reviewer and response content are explicit mocks. No claim of real consent, real independent scoring or research findings is made.

Records are memory-only. In-memory round trip is not participant-data storage/export or a secure operational ingestion interface. No file import or arbitrary data entry is exposed. Record validation checks known fields, fixture responses, identity and ordering; it is not a general adversarial schema/security certification. Nested metadata has not been comprehensively fuzzed. No participant information may be supplied to this package.

Only local same-origin image/static GETs are used. The server restricts fixed routes, methods and Host, sends no-store and a self/blob CSP, and writes no request log or record. No storage service, analytics, telemetry endpoint or dependency was added. An isolated local service is not a multi-user secured deployment.

## Protected-file and Git integrity

Before: clean initial worktree; branch and exact HEAD matched; target directory absent. Protected scope: all 886 tracked files (initially no nonignored untracked files), including canonical case, frozen dossier, artwork, historical viewers, source/tests, tracker/roadmap and governance.

Method: compute SHA-256 of each raw working-tree file; serialize the sorted path-to-hash dictionary with Python json.dumps default separators and sort_keys=True; SHA-256 that UTF-8 manifest in memory. No manifest file was created.

Before and after aggregate: `3b9f7f60310cffbb684c73f57bde58dfca83aee49ddc62ed75727fbdacbee6ff` — MATCH, 886/886 protected files unchanged.

Git metadata hashes before/after matched:

| Metadata | SHA-256 |
|---|---|
| HEAD | b0a1f2c92e2d20bc8a37f3265b2ce01dc3a99aedd61d135e38b632d4f234f19c |
| index | 2e9061806416ce6c97058edfc29d51ff3950246cf9946bf2411d54480e6b925f |
| config | 079cd5753c15d92dbf23b8e432f5426c5b75ed2541866d3cf95123cc60147356 |
| FETCH_HEAD | cb2723fad0eda98f9dec44b68c07f57f0ca0368f3c7287058529d99f8da8bb6f |

All enumerated refs match baseline, including existing host-managed codex refs, local feature branch and origin tracking ref. git diff and git diff --cached both returned clean. Final status contains only the eight authorized untracked files. No staging, commit, push, fetch, branch/history/config mutation or cleanup was executed. Both server process IDs 27220 and 21488 were absent after stopping their sessions, and both listening-port probes returned ECONNREFUSED.

## Remaining gates and next owner decision

1. Authorize a narrowly bounded synthetic browser follow-up for actual visibility/resize/undersized-viewport interruption and cancellation, plus deliberate scheduling-delay characterization. Confirm any browser/OS setup prospectively; do not infer tolerances from these measurements.
2. Review this implementation and AC-11 limitation. Do not infer participant execution readiness from 23 green Node tests.
3. Any later study requires separate execution authorization, operational consent/access/deletion/withdrawal and private-storage procedures, approved timing/size handling and replacement rules, facilitator/display setup and actual independent review arrangements. No provider or real-data workflow was selected here.
4. D02/F3 final acceptance, D06 geometry, artwork/release gates and broader T17 criteria remain held/pending under existing governance. No evidence here ratifies them.

Recommended next owner decision: review the isolated package and, if desired, explicitly authorize only the missing synthetic browser verification. Participant research and production work remain unauthorized. No next mission is automatically started.

**T17-N14-B:** PARTIAL (implementation complete; browser failure-path verification incomplete).

**F3-B CHARTER:** OWNER-APPROVED DESIGN ONLY.

**PARTICIPANT RESEARCH:** NOT AUTHORIZED.

**D02/F3:** FINAL ACCEPTANCE HELD.

**D06:** PENDING.

**T17:** IN_PROGRESS.

**T18:** NOT_STARTED / NOT AUTHORIZED.

**GIT COMMITS:** NONE.

**NEXT MISSION:** NOT AUTHORIZED.
