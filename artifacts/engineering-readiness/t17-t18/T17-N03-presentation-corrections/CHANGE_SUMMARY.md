# Change summary

## Label rendering

All authored rectangles retain their original identity, order, normalized position, size and rotation. A second pass draws exactly one label per projected object. Labels use the upper edge with an inset capped at eight logical pixels, and the anchor is rotated with the object. Different heights separate the concentric mat and passport labels. Text remains scaled to each object's envelope. The development caption remains present. This changes label presentation only and uses no Case 001 IDs, new objects, interaction or layout engine. [phaser-runtime.ts](../../../../src/game/renderer/phaser-runtime.ts)

## Short desktop observation

At desktop widths from 640px and heights up to 600px, observation views use 12px page/panel padding, tighter margins and a 24px heading. The Back link retains its existing 44px minimum height and focus styling. The observation host uses calc(100dvh - 13rem), with its prior minimum height released in this media range. Its figure margin is reduced. The measured 960×540 scene ends at 513px, and the complete page is 540px high.

The rules apply only to observation. Briefing layout, normal-height desktop layout and mobile layout retain their existing treatment. Existing 960×540 logical resolution, FIT and centering are unchanged. No JavaScript viewport listener or session behavior was added. [case-experience.tsx](../../../../src/game/presentation/case-experience.tsx) · [phaser-host.tsx](../../../../src/game/renderer/phaser-host.tsx)

## Focused tests

The renderer test checks foreground ordering, exact object geometry, one label per object, distinct anchors for concentric objects, rotated anchor association and unchanged input. The host test verifies compact-height rules are restricted to observation and retain the neutral preview sizing. Existing ready/teardown, case semantics, stale outcomes, failure and retry tests remain intact. [neutral-phaser-runtime.test.ts](../../../../tests/unit/neutral-phaser-runtime.test.ts) · [phaser-host.test.tsx](../../../../tests/unit/phaser-host.test.tsx)
