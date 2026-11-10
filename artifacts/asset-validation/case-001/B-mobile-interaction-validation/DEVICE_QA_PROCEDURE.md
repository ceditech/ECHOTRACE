# Actual-device technical QA procedure — not executed

Status for Android Chrome, iOS Safari and installed PWA: **NOT PERFORMED**. The browser tests in this package use Windows desktop Chromium and emulated viewport/DPR/input/media. This procedure is technical device QA, not a new human observation or recognition study; the owner's closed participant study is not reopened.

## Prepare the surface and record the device

Use a complete copy of this isolated folder. The desktop file:// route is tested, but mobile file viewers may not execute relative scripts/images correctly. If needed, the owner can serve only this directory on a trusted local network, for example from repository root:

```powershell
python -m http.server 8765 --bind 0.0.0.0 --directory artifacts/asset-validation/case-001/B-mobile-interaction-validation
```

Use the workstation's actual reachable LAN address on the phone; localhost on a phone is not the workstation. Stop the server afterward, restrict access to the trusted network, and do not serve the repository root. No server was started or physical device accessed in this task. If assets/scripts fail, stop and record the problem, not a fabricated pass. Verify candidate/image hashes against asset-manifest.json before transferring.

Record model, OS/build, browser/version, orientation, devicePixelRatio, OS display/text scale, browser/page zoom, visual viewport scale, requested frame width, actual viewport dimensions/effective fit width, safe-area behavior, zoom/pan, source hash revision and date. Width320/390 means actual CSS scene width; do not enlarge a320 source PNG and call it equivalent. Record unavailable hardware/width/mode honestly.

## Android Chrome and iOS Safari — portrait and landscape

1. Load Original. Confirm image readiness, complete undistorted16:9 overview and external controls; verify no target selection/app zoom. The page can scroll because it is a diagnostic tool, not a timed game. Toggle optional visual diagnostics only for technical inspection.
2. Set320/390/430 where usable; record actual width rather than assuming selection equals available width. Include available larger widths and both portrait/landscape. Expand/collapse browser chrome and inspect notch/home/safe-area boundaries. At simulated16/32px insets under320, expect288/256 effective width and explicit failure of48px comfort height.
3. Switch Changed. Tap each stand face/base, wallet and remembered empty-mat location; inspect ObjectIds. Probe region origin/far edges,9px full320 gap, letterbox and outside viewport. Do not infer finger accuracy from a few taps or turn ObjectId feedback into recognition success.
4. Exercise one-finger taps,8px-near movement, deliberate drag, return-to-start after drag, cancellation and two simultaneous pointers. No commit on pointer-down; moved/multi/cancelled gestures must not commit. Release all fingers before beginning a fresh tap.8px is a research setting, not a physical standard.
5. Set1×/1.5×/2×, pan to limits using both drag and single-pointer buttons, and use Overview. No scene beyond the permitted source extent or automatic clue centering. Selection should retain ObjectId under valid transforms; offscreen sources cannot be selected outside the viewport. Custom pinch camera is not implemented; test native browser pinch separately, record browser handling/pointercancel and do not report it as application pinch support.
6. Change snapshot, width, orientation, camera zoom/pan or page scroll during a held pointer. Expect cancellation, not a selection at the stale location. Try rapid distinct taps and different pointer types if hardware supports a pen/mouse. Capture/lost-capture behavior needs real platform evidence.
7. Use external controls with keyboard/switch alternatives where available. Test neutral cursor arrows/Enter/Space, Shift+arrow pan and Escape. Confirm visible focus and no correctness-coded target labels. With TalkBack/VoiceOver, test entering/exiting the role=application scene region and external controls; record any trapped navigation or missing semantics. A keyboard path does not prove screen-reader access.
8. Increase system/browser text scaling (including a200% scenario where supported), use browser zoom, and enable reduced motion. Controls must remain reachable and not cover the scene; effective fit may shrink and must be recorded. No transition/camera animation is needed. The visual-memory limitation and tiny original clues remain unresolved.
9. Record load/decode time, visible stalls during pan/rotation, repeated-snapshot memory behavior and errors through available device tools. No frame/memory budget is declared achieved. The prototype has no game clock, replay, evidence or resume policy; do not test absent features as passed.

## Installed PWA condition

This folder has no web-app manifest/service worker/install infrastructure. **Installed-PWA QA is NOT APPLICABLE to the delivered standalone surface.** Do not call a home-screen shortcut an accepted installed PWA result. Only if a later owner-authorized installable surface exists should standalone bounds, safe areas, cached pair version, offline/load/reconnect, app switch/lock and orientation be checked separately from browser tabs. That future surface/authorization is outside this task.

## Acceptance record

Separate simulated-browser versus actual-device evidence and test statuses. Block any stale/incorrect hit, ambiguous routing, unexpected original app zoom/selection, crop at overview or extra endpoint difference. Record technical bugs and the actual conditions; do not silently adjust region geometry, add hit slop or change canonical files to get a pass. Proposed48px height/8px separation goals are assessed at measured effective width, not from hit-test success. Keep character-staging and visual-recognition acceptance separate from interaction mechanics. Owner reviews device results before any new adoption/implementation instruction.
