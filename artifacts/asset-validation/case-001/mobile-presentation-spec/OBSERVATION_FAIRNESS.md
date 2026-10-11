# Observation fairness and interruption contract

Recommended contract subject to owner review, especially O02/O09/O10. Existing authoritative requirements are **25 seconds original, 2 seconds blank, then changed investigation**, exactly three changes and no frozen-story rewrite. No new timing/scoring policy is adopted by this document.

## Readiness and timing

Before explicit Start, preload/decode the accepted assets for both snapshots, verify their common version, fit the complete scene and disable selection. Start attaches one observation start/deadline to the authoritative attempt: `D=t_start+25,000ms`. The clock is provided by application orchestration, never a decrementing React counter or independent Phaser game truth. Observation timer display is derived from the deadline and remains outside the scene. New frames, focus events, zoom, orientation and ResizeObserver callbacks do not recreate t_start.

On deadline, obscure/remove original before transitioning other UI; cancel pointers and selections. Start the neutral blank from the actual removal/opaque-mask moment for at least **2,000ms** before revealing changed. Reset presentation camera while hidden. Normal sequence has 25-second original and 2-second blank; delayed/hidden execution may lengthen absence, never intentionally lengthen visible original. Browser timer callbacks cannot guarantee millisecond-perfect exposure: late masking is an observed defect, not accepted extra time. Record overshoot and resolve it during device QA.

Use monotonic elapsed time within a live document, with an agreed suspend/resume-safe reconciliation. An in-memory performance clock is not by itself proof of wall-clock continuity across OS sleep or document reconstruction. Current session milestones do not persist a resumable deadline. Clock choice/serialization/recovery is a future architecture decision within O09, not an instruction to silently add persistence. If time cannot be trusted, mask original and require an approved recovery decision rather than guessing remaining exposure.

## Controls and fairness rules

Default recommended app policy O02: observation remains complete 1×; no app zoom/pan/magnifier. Investigation optional zoom is O01 and does not retroactively make original clues fair. Browser/assistive zoom is not disabled. Its viewport consequences may reduce visible content and must be documented; full nonvisual equivalence is not claimed. Observation zoom that changes access is a separate explicit owner decision with controls and timer invariants; it cannot be inferred from investigation zoom approval.

No evidence selection/collection/feedback or hit markers during observation. No automatic zoom, clue-centered framing, “things changed here” focus, replay thumbnail or hover magnifier. Ordinary accessibility controls provide neutral operation, not answer disclosure. Text scaling and reduced motion do not increase duration; untimed briefing/setup permits preparation before Start. Countdown announcements must not flood screen readers every frame; final announcement policy should be reviewed without turning the timer into a clue or requiring fast listening.

At the initial changed scene, recommended O10 policy is full overview regardless of prior browser layout/camera. A transition reset must occur under the opaque blank, not as a visible camera jump that looks like another object change. Investigation zoom shows only current changed pixels; never cache original content in a lens/minimap or compare slider. Browser history/back/reload cannot be fully prevented; future app restoration must reconcile the authoritative attempt and never auto-reveal an old original from its own view state. External screenshots/OS thumbnails/developer tools are not preventable by this contract; do not claim anti-cheat security.

## Interruption table — recommended O09 policy

| Event | Original handling | Time/recovery handling |
|---|---|---|
| Ordinary orientation/size/chrome change | Refit complete original, cancel gesture; if original is no longer safely visible, mask it during layout repair | Preserve same absolute deadline, no new Start; reveal only remaining interval if still valid |
| Background, lock, app switch, pagehide | Mask original as early as lifecycle permits; ensure restoration starts masked, not with a stale original surface | Clock continues; if return before trusted deadline, show only remaining time. If expired, do not show original; give a complete 2-second neutral blank on return before changed |
| BFCache pageshow | First reconcile while masked; cancel cached pointers/camera | No timer restart; elapsed deadline wins. A stale rendered original flash is a failing QA result |
| Browser zoom/text scale/assistive interruption | Do not disable user feature. Recompute safe complete fit or mask when geometry invalid | Same deadline, no compensation or new clues. Resulting accessibility limits need owner acceptance |
| Renderer failure during original | Remove canvas/cover with opaque neutral fallback, no frozen original visible under error modal | Continue trusted deadline or treat attempt as interrupted under O09; never reveal full original for another 25s |
| Reload/navigation/document destroyed | Initial restored UI neutral; no automatic original restoration from component state | Use only approved persisted attempt/deadline recovery. If unavailable/uncertain, no automatic replay; owner must approve cancel/restart behavior |
| Delayed callback / OS suspend / clock anomaly | Mask before rendering any scene after uncertainty is detected | Reconcile trusted elapsed time; if uncertain, fail closed to neutral recovery rather than grant time |
| Interruption during blank | Original remains unavailable | On resume give complete neutral 2-second separation before changed; this extends blank, never original exposure |
| Interruption during investigation | No original available; stop input under cover and cancel pointers | Restore changed scene using agreed camera policy; no observation replay or automatic evidence submission |

Lifecycle masking is best effort across browsers/OS snapshots; it is not a guarantee against external captured images. An observed excess/flash is a defect to report. A neutral recovery panel is presentation state, not a newly invented gameplay phase. O09 alternatives include aborting disrupted attempts or continuing trusted remaining time; neither scoring, attempt-count nor progress semantics is decided here.

## Replay, reset and accessibility exceptions

Reset-camera operates in investigation only and resets no timer/session. Replay is an explicit future new-attempt operation through the approved lifecycle, never a reset button attached to active observation. Any replay is familiarized, cannot count as fresh human evidence and must not overwrite an old attempt or create repeated awards. Replays/recovery are O09 decisions; no completion/progress policy is added.

Accommodations that extend observation or introduce narrated scene clues require a separate owner-approved product treatment, not an implementation convenience or implied timer pause. The approved 25-second contract remains. UI text can reflow and untimed narrative can be reread; those accommodations are different from exposing the original for longer. Do not reopen the owner's closed human-test program without authorization.

## Required future regression evidence

Fake-clock tests cover deadline boundaries, repeated Start, background before/after expiry, blank duration, stale scheduled callbacks and uncertain clock handling. Browser/device checks cover actual original masking, OS sleep/BFCache behavior, reload/history, orientation while tapping and text-size changes; virtual tests cannot establish those. Verify no original buffer is shown after deadline/through modal/transition, no zoom changes source asset version, no gesture extends the timer, and no fourth endpoint event appears. Record observed exposure durations/overshoot on actual devices rather than labeling constants as verified display timing.
