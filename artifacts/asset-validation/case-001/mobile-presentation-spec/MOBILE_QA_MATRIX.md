# Mobile QA matrix — planned, not performed

All rows below are **NOT PERFORMED for MPS-001**. Existing pure calculation/static study checks are supporting evidence, not device passes. Completed human trials remain owner-reported desktop observation evidence; no new participant testing is authorized. Device QA is a separate future gate O08/O12, not permission to implement T17/T18.

## Coverage inventory

Record device model, OS/build, browser/version, display mode, physical orientation, hardware/virtual keyboard, effective scene A/B/fit width, CSS layout/visual viewport, safe-area values, browser zoom, OS text/display scale, DPR/renderer resolution, asset revision/hash, camera z/pan and timestamp for every run. “390 source PNG enlarged” is not 390 CSS-pixel evidence. A physical device whose safe usable width differs from 320/390 records its actual value; do not fabricate a hardware match.

| ID | Surface | Width/orientation coverage | Focus | Evidence required |
|---|---|---|---|---|
| S01 | Desktop Chromium simulation | Effective 320, 390, 430, 768, 960; portrait/landscape emulation | Fit/letterbox, text reflow, transform round-trips, timer/state harness | Automated/browser screenshots and event logs; mark SIMULATED |
| S02 | Desktop WebKit simulation if available | Same effective sizes and safe-area fixtures | Browser-layout differences | SIMULATED; not Safari hardware/OS gestures |
| D01 | Physical Android + Chrome browser tab | Actual portrait/landscape including a narrow usable scene; near 390 and larger where available | Touch, chrome expansion/collapse, keyboard, system back/lock | ACTUAL DEVICE, versioned logs/screenshots |
| D02 | Physical iPhone + Safari browser tab | Actual portrait/landscape with notch/home safe area; narrow/near390/larger usable widths | Safari chrome, visual viewport, browser pinch, BFCache, rotation | ACTUAL DEVICE; no inference from S02 |
| D03 | Installed Android PWA where supported/approved | Same device both modes | Standalone bounds, launch/restore, cached revision consistency | ACTUAL INSTALLED MODE; mark unavailable if not installed/supported |
| D04 | Installed iOS web app/PWA where supported/approved | Same device both modes | Standalone safe area, resume/lock, gesture differences | ACTUAL INSTALLED MODE; do not equate with Safari tab |
| D05 | Larger physical phone/tablet | Larger effective width and height-constrained landscape | Full scene plus UI, optional keyboard/mouse | ACTUAL DEVICE; desktop remains separate |

Minimum release device counts/models/OS versions and which installed modes are in scope are owner O08 decisions. Unsupported/unavailable coverage is “NOT RUN” with reason; emulation cannot silently fill an actual-device requirement.

## Scenario matrix

| QA ID | Procedure at required surfaces | Expected contract | Current status |
|---|---|---|---|
| Q01 | Load pair before Start; fail one decode/version | Neutral untimed preparation/error; no partial original or timer | NOT PERFORMED |
| Q02 | Full fit at 320/390/larger; include narrow padded/height-limited sizes | Uniform 16:9, entire source, neutral letterbox; actual width recorded | NOT PERFORMED |
| Q03 | Browser chrome/safe areas/standalone launch | No clue/control occlusion; insets applied once; no stale coordinate map | NOT PERFORMED |
| Q04 | Observe after explicit Start | Original deadline 25s, then actual original removal and ≥2s neutral blank; no 60s gameplay limit | NOT PERFORMED |
| Q05 | Tap numeral faces, bases, wallet edge and empty mat; near boundaries/gaps | Exact canonical membership/correspondence; no silent B targets or wrong routing | NOT PERFORMED |
| Q06 | Zoom 1×/2×, pan to every edge, Overview | All source reachable, no blank beyond clamp, identical source revision; no auto-clue centering | NOT PERFORMED |
| Q07 | Short taps, 8px boundary moves, pan release, two-finger pinch, cancel | At most one confirmed selection; no release-after-pan/pinch, duplicate or stale selection | NOT PERFORMED |
| Q08 | Repeat Q05 at all zooms/DPR, CSS offsets/letterboxing | Inverse maps to same ObjectId; no DPR double multiplication | NOT PERFORMED |
| Q09 | Select either stand and then the other | One exchange discovery/award; already-discovered; evidence separately collected | NOT PERFORMED |
| Q10 | Keyboard, screen reader controls, single-pointer buttons | Neutral spatial access, visible focus, no answer labels/truth leaks; no gesture-only dependency | NOT PERFORMED |
| Q11 | Increased text scaling (e.g. 200%), browser zoom and OS font settings | UI reflows, required information remains available, no timer restart or hidden controls | NOT PERFORMED |
| Q12 | Reduced-motion setting on/off before and during session | No smooth/pulsing travel; same 25s/2s timing and scene pair | NOT PERFORMED |
| Q13 | Orientation/resize at 5s, 24.9s and during pointerdown | Complete fit or neutral mask; deadline unchanged; pending tap cancelled | NOT PERFORMED |
| Q14 | Background/lock/suspend before and after deadline, then restore | Original not replayed; trusted remaining time or fail-closed recovery; complete blank before changed | NOT PERFORMED |
| Q15 | Back/forward/BFCache/reload/runtime failure | No stale original flash, retained pointer or reconstructed 25s; owner-approved recovery only | NOT PERFORMED |
| Q16 | Inspect accepted paired art/staging at all widths | Exactly three events, static people/props, clear table associations; no changed-only enhancement | NOT PERFORMED |
| Q17 | Frame/load/memory measurements during pinch/reflow/long session | One runtime, bounded memory, no timing/input corruption; O11 budget met | NOT PERFORMED |
| Q18 | Installed cached/offline/reconnected launch if approved | Same accepted pair version or neutral error; no mixed/stale scenes | NOT PERFORMED |

Use injected clocks for automated boundary regression, plus measured wall-clock/display recordings on actual devices. Record tolerances and overshoot, not an unsupported “exactly 25.000 seconds” display claim. Accessibility testing considers relevant WCAG criteria/assistive behavior; pixel contrast proxies and target sizes alone are not conformance tests.

## Release evidence and sign-off

O08 owner accepts actual-device coverage, unresolved limits and defect severity. Block adoption for extra endpoint differences, incorrect target mapping, unintended original replay/extended exposure, required clue clipping, mixed pair versions, stale evidence selection or unusable input. Do not mark physical/mobile success from simulated results. Completed participant recognition evidence remains separate from device rendering/touch evidence; any new participant research requires explicit reopening by the owner. No QA row is passed or engineering task marked complete in this document.
