# Mobile-first audit

## Evidence and authority

Reviewed current offline Proposal B geometry, its difference from canonical case.json, current character composites/transforms/occlusion evidence, prior artwork QA, observation-package records, relevant GAME_SPEC §§7–8/30, testing requirements and implementation status. Root AGENTS rules apply. No approved source was altered. The current branch is feature/echotrace and the initial Git working tree was clean.

Human evidence is the owner's current summary: five completed fresh trials, generally successful core recognition, P1's proportion concern and P5's small-scene/attention concern. P5's 390px retest is familiarized evidence, not a sixth fresh trial or fresh mobile recognition datum. Repository OBSERVATIONS.csv contains only headers and RESULTS_TEMPLATE.md is blank. No per-participant score, response-time distribution, recognition rate or raw quotation can be independently reconstructed. Historical reports saying human testing was pending remain untouched; current owner evidence supersedes that historical status for this study. No additional humans were tested. Mobile trials were desktop-browser simulations. The owner has closed testing.

The measured composition is the latest approved-for-testing character-placement pair at 960×540. Its geometry is offline B, not canonical production. measurements.json explicitly lists differing canonical/B visuals. Recommendations about these targets cannot certify production geometry. Current candidate art remains unchanged.

## Measurements

All analytical values assume a complete 16:9 scene occupying the stated CSS width. Dimensions below are authored envelopes, which include transparency. Solid bounds are alpha≥128 after rendering each candidate at 960; those bounds are then uniformly scaled analytically. Rounding/interpolation differ slightly from earlier native-mask measurements. A high-DPR device adds physical pixels without increasing CSS size or perceived object size.

| Object | 960 CSS px | 390 CSS px | 320 CSS px |
|---|---:|---:|---:|
| Whole scene | 960×540 | 390×219.38 | 320×180 |
| Each table envelope | 384×270 | 156×109.69 | 128×90 |
| Mat envelope | 192×151.2 | 78×61.43 | 64×50.4 |
| Passport envelope | 67.2×56.7 | 27.3×23.03 | 22.4×18.9 |
| Passport solid bounds | 62×53 | 25.19×21.53 | 20.67×17.67 |
| Wallet envelope | 96×64.8 | 39×26.33 | 32×21.6 |
| Wallet solid bounds | 91×63 | 36.97×25.59 | 30.33×21 |
| Each stand envelope | 115.2×97.2 | 46.8×39.49 | 38.4×32.4 |
| Stand solid bounds | 91×86 | 36.97×34.94 | 30.33×28.67 |
| Numeral union ROI | 41.25×28.65 | 16.76×11.64 | 13.75×9.55 |
| Star diagnostic ROI | 29.16×28.68 | 11.85×11.65 | 9.72×9.56 |
| Mara visible bounds | 89×141 | 36.16×57.28 | 29.67×47 |
| Owen visible bounds | 88×182 | 35.75×73.94 | 29.33×60.67 |

The numeral ROI is the shared source overlay union. Star/strap rectangles are manually identified source diagnostic regions, not semantic masks or individual line widths. Star ROI includes nearby leather. Strap ROI at 320 is 12.36×17.8px; this entire oblique band contains several stripes, so individual bands are much narrower. Mat solid visible leather bounds are 189×79 at 960, 76.78×32.09 at 390 and 63×26.33 at 320. The envelope substantially overstates actual leather height.

## Interaction correspondence and separation

Observation has no authored targets. Each of the four B investigation rectangles is 0.16 scene width × 0.245 scene height. They are mathematically nonoverlapping; smallest edge-to-edge distance is the vertical row gap.

| Fit width | Each target | Smallest row gap |
|---|---:|---:|
| 960 | 153.6×132.3 | 4.05 |
| 390 | 62.4×53.75 | 1.645 |
| 320 | 51.2×44.1 | 1.35 |
| 358 (390 minus hypothetical 32px padding) | 57.28×49.34 | 1.51 |
| 288 (320 minus hypothetical 32px padding) | 46.08×39.69 | 1.215 |

Padded widths are scenarios, not observed UI. Targets clear the WCAG 24×24 CSS-pixel minimum at these widths, but that does not establish usability or whole-product conformance. [W3C SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) distinguishes target dimensions from exceptions and spacing. Android recommends 48×48dp and Apple's general button guidance specifies at least 44×44pt; these native units are not automatically equivalent to web CSS pixels. [Android guidance](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views), [Apple guidance](https://developer.apple.com/design/human-interface-guidelines/buttons).

**Canonical comparison is essential:** production case.json instead has .18×.30 rectangles and .10 normalized vertical separation. At 960 these are 172.8×162px with a 54px row gap; at 390, 70.2×65.81px with 21.94px gap; at 320, 57.6×54px with 18px gap. Thus the narrow gap is specifically an offline B regression relative to canonical target spacing, not a discovered defect in existing production hit geometry. These larger canonical regions cannot simply be overlaid unchanged on B's relocated art: object correspondence needs joint review. Canonical interaction geometry and B remain distinct sources, and neither was modified. measurements.json records both.

At 320, target height is approximately 44px rather than the study's proposed 48 CSS-pixel comfort goal. Required fit width for a 48px target height is 348.30px; 44px requires 319.27px. The low row gap persists even on desktop. A 2× camera enlarges the 320 gap only to 2.7px, so zoom alone does not achieve meaningful separation.

Stand targets end at normalized y=.405 while visual envelopes extend to .425; solid bases reach approximately .4131. A low tap can miss a stand and approach the wallet target starting at .4125. Padding targets globally would risk ambiguity; region nonoverlap is not evidence of accurate selection. The passport region persists at the remembered empty mat after removal, which must be retained. Actual DPR/canvas offsets/letterboxing, gestures, evidence UI and target-routing code were not tested. No tap-accuracy claim is made.

## Specific readability and accessibility risks

**Passport/mat — high scale risk, bounded contrast risk.** A ~21×18px solid booklet at 320 supports disappearance noticing more readily than passport identity. Navy cover against navy mat, tiny title/emblem, mixed viewpoint and strong adjacent marble compete. Manual small-ROI median relative luminance is .00676 on cover and .03657 on adjacent mat: an illustrative ratio of **1.53:1**. Exact ROI coordinates/method are in measurements.json. This is one rendered-area proxy, not whole-object contrast or a WCAG failure determination. Gold edges can separate the silhouette, but excessive edge enhancement could become an unintended clue highlight. Do not require title reading; do not add a passport label to solve visibility.

**Stands — small numeral risk and selection mismatch.** Existing gold-on-navy treatment has strong sampled separation (chosen numeral/face ROI medians .66369/.01958, approximately 10.26:1), yet the combined numeral union is only 9.55px high at 320. Favor shape and stroke continuity over sharper artificial labels. 12/21 must read as an exchange in association with tables, not merely numeral changes. Both stand bodies must remain identical; no one-sided polish.

**Wallet — feature recognition risk.** Movement is relatively strong; recognizing a star and several stripes at ~10px and smaller scales requires attention. Glare and fine texture compete, and an enlarged inspection can interpolate without adding information. Existing broad stripes are preferable to finer detail. Use the same source wallet at both endpoints and preserve its closed state; no replacement emblem or strap becomes a new clue.

**Mara/Owen — proportion and association concern.** Relative to a 384px table envelope, visible figure widths are .232/.229 and heights .367/.474. These are screen-space ratios, not anatomical proportions: Mara is more occluded, Owen is in the midground, and source/table perspective differs. Similar figure width despite different apparent depth warrants review. Mara's full offline envelope is 128×230 at the window-side foreground; Owen's is 100×205 at (470,116), between table silhouettes beside the plant table's left edge. Owner-reported P1 concern supports targeted scale/contact evaluation but does not establish a unique correction. Owen's proximity to the visual center and separated right tabletop can obscure table ownership; tiny mobile faces cannot solve that association. Bright cream clothing can draw attention. Camera zoom scales people and tables equally and cannot repair proportion ratios. Resizing people blindly risks chair support, headroom, clues and visual continuity.

## Framing constraints and prototype findings

Fit 390px uses 219.38px height. Merely providing a 300px-tall container without increasing width does not enlarge the scene; it creates letterboxing. Our taller-camera diagnostic uses a uniformly enlarged 533×300 image and center-crops into a 390/320px viewport. Gains are 1.367×/1.666× relative to full fit, but Mara disappears, side anchors/backpack are lost and the 320 passport edge is clipped. The changed wallet remains rightward, making unequal clue exposure likely. This is a presentation transform with no source geometry change, yet it conflicts with GAME_SPEC §7.3's full intended scene visibility and §7.4 fairness. Reject it as default observation framing; adopting such behavior would require an explicit product/spec decision, not just CSS.

Uniform optional 2× zoom raises a 320 passport envelope to 44.8×37.8px, numeral union height to 19.1px and star ROI to ~19.44×19.12px. Only part of the scene is visible at once. Static left/right zoom previews demonstrate lost context, not improved recognition evidence. Neutral player pan can recover the whole scene; automatic clue-seeking pans/magnifiers would reveal attention priorities and are unsuitable. Prefer a wider full-scene layout in landscape where available, with no forced orientation. For example 640px fit doubles 320 sizes while retaining context, but actual landscape height/safe areas/UI may limit this and have not been measured.

## Verification and limits

study.py verifies 249 protected file hashes and the nonignored outside-package inventory, exact source copies, approved difference-mask equality and unchanged pixels beneath the stable character layer. Canonical JSON and B source geometry remain byte-identical. Same transformations apply to both snapshots, so presentation does not add a fourth mystery event. Preview dimensions match across pairs. Node checks verify uniform prototype dimension calculations; JavaScript syntax checks passed. Full rendering/viewer DOM and actual gestures were not browser-tested.

Inspected the generated fit-versus-tall comparison and the existing wallet source. Earlier source/native alpha and perspective QA remains applicable; this audit does not claim a fresh calibrated assessment of every pixel or physical scene dimension. Static previews, analytical CSS scenarios, source ROI contrast and owner's trial summary are distinct evidence classes. No physical Android/iOS/PWA validation, new participants, runtime integration or accessibility conformance testing occurred. Findings are hypotheses and measurable risks, not proven visual improvement. All new outputs remain in this study folder.
