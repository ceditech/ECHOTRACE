# MIV-001 interaction results

2026-11-09. **PASS:21/21 isolated Node test groups**, zero failed/skipped, plus independent pixel/source verification. No production test was edited. Counts refer to named test groups, not participants or individual assertions.

## Coordinate contract

960×540 logical source → uniform fit `s=min(A/960,B/540)` with centered letterbox → bounded zoom1–2 about viewport center → CSS pan. Pointer client coordinates are made relative to the current viewport rectangle once; DPR is reported, never multiplied into hit coordinates. inverse() returns source coordinates for diagnostics and round-trip checks. Exact membership is evaluated against the same authored rectangle edges transformed into local CSS coordinates; this is equivalent under the positive uniform affine transform and avoids unnecessary inverse rounding at edges.

Authored finite-decimal origin/size sums define exact far edges (.15+.27=.42, .13+.18=.31). Origins are inclusive, far edges exclusive. No hit slop, epsilon, nearest-object guess, adjusted target size or correctness-based routing exists. Viewport bounds are checked before source/target bounds, so an offscreen object cannot be selected by an outside point. Letterbox is noninteractive. Multiple matching rectangles reject ambiguity; the synthetic-overlap test is a negative control, not a candidate change. The actual candidate rectangles have no overlap.

The matrix covers320/390/430/768/960, narrower288/256, normal/tall/height-constrained containers, zoom1/1.5/2 and five pan requests including both clamped extremes. Valid transformed centers retain all four exact ObjectIds. All transformed edges, gap misses, camera bounds, invalid dimensions, source round-trips and resize source-center preservation are checked. Numeric round-trip assertions allow floating arithmetic precision; this does not add hit tolerance.

## Pointer transaction contract and tests

Pointer-down only establishes a pending transaction with ID/type, starting position, target and layout/camera epoch. No commit occurs then. Pointer-up commits at most once only for the same ID/target/epoch, maximum displacement≤8 CSS px, enabled Changed inspection and no cancellation/pan/multi-pointer block. Moving over8px permanently cancels a tap even if the pointer returns to its start. Pointer-up displacement is checked even without a move event. The threshold is a research parameter, not an approved production threshold.

Tested invariant groups:

- Single matching tap and duplicate-up rejection; different down/up regions and misses reject.
- Exactly8px versus8.01px unit boundary; real-browser8px versus9px movement.
- Unknown pointer IDs cannot commit **or consume another pointer's pending transaction**.
- Pointercancel/lostcapture; explicit epoch invalidation for resize/snapshot/zoom/pan/scroll/blur.
- Multiple pointers cancel and block until all release; a remaining finger never becomes a fresh tap.
- Continuous pan uses CSS deltas, survives its own camera epochs, and never turns release into selection. External camera changes cancel an active gesture.
- Simulated mouse/touch/pen share semantics; nonprimary buttons, unsupported types and disabled Original reject.
-25 rapid distinct unit taps yield25 diagnostic commits, each exactly once. These are event diagnostics, not score/discovery awards.

The browser adapter also tracks established capture. A cancelled pending capture request can produce no got/lostcapture event; it must not become a tap. Conversely normal implicit capture release around pointer-up must not falsely reject a valid tap. The adapter checks capture during movement, tracks got/lostcapture and distinguishes pending versus established capture at completion. The full browser regression exercises both cancellation and valid movement. No global browser method is patched.

## Candidate and pixel integrity

Five candidate test groups verify exact copy/projection, three events, shared closed wallet and stand identities/positions, unchanged nonvisual scoring/evidence/deduction truth, target nonoverlap/comfort calculations and byte-exact source image copies. Python independently reconstructs the pair from the single candidate and original rasters. Original passport2630 solid pixel centers are inside the remembered region; Changed left/right stands6673 each and wallet4553 have zero solid centers outside their regions. Changed explicitly has no passport visual but retains its target. Stable environmental layers and character pixels are identical across endpoints.

No evidence collection, domain selection correctness, scoring, Phaser/application bridge, observation timer, transition or replay exists. Full production case validation/integration is not claimed. See unit-results.json, unit-test-results.txt and verification.json for executed evidence. Browser pointer input remains simulation, not physical finger accuracy.
