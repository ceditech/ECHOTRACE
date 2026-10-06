# EchoTrace — Product Requirements Document

**File:** `PRD.md`  
**Product:** EchoTrace  
**Document Type:** Product Requirements Document  
**Version:** 1.0  
**Status:** Initial Product Definition  
**Date:** October 2026  
**Product Stage:** Pre-Development / Product Definition  
**Initial Release:** Web / Progressive Web App  
**Future Platforms:** iOS and Android  
**Development Model:** AI-assisted engineering / controlled vibe coding  
**Primary AI Development Agent:** Codex

---

## 1. Executive Summary

**EchoTrace** is a short-session visual detective and memory puzzle game in which players solve mysteries by carefully observing environments, detecting changes, collecting evidence, evaluating witness testimony, identifying contradictions, and reaching logical conclusions.

EchoTrace combines elements traditionally found in visual observation games, memory games, hidden-object games, detective mysteries, logic puzzles, deduction games, and narrative investigation games.

The core differentiator is that **observation and memory are not the final objective—they are evidence used in an investigation.**

A player might initially believe they are simply identifying what changed in a room. However, the changes reveal evidence. Evidence exposes contradictions. Contradictions challenge witness statements. Those discoveries allow the player to solve the underlying mystery.

The core experience can be summarized as:

> **Observe. Remember. Investigate. Deduce. Solve.**

EchoTrace will initially launch as a lightweight web-based game with one highly polished vertical-slice mystery. The architecture and content model will nevertheless be designed to support potentially hundreds of cases without requiring individual cases to be hardcoded into the core game engine.

---

## 2. Product Vision

### 2.1 Vision Statement

Create an accessible, intelligent, and highly replayable detective puzzle experience where **attention becomes evidence and memory becomes investigation**.

EchoTrace should make players feel like detectives rather than players completing arbitrary visual puzzles.

The long-term vision is to transform EchoTrace from an individual game into a **scalable mystery platform** capable of continuously delivering new investigations.

### 2.2 Product Promise

Every EchoTrace case should challenge the player to answer three questions:

> **What did I see?**

> **What changed?**

> **What does it mean?**

The third question is particularly important. Many observation games stop at "find the differences." EchoTrace begins there.

---

## 3. Product Positioning

EchoTrace sits at the intersection of memory games, visual observation, detective mysteries, and logical deduction.

The game should not be marketed primarily as another hidden-object or spot-the-difference game.

Its intended positioning is:

> **A visual detective game where memory, evidence, and deduction solve the mystery.**

---

## 4. Problem / Market Opportunity

Casual puzzle games are easy to understand and convenient to play, but many rely heavily on repetitive mechanics.

Narrative detective games can provide deeper experiences, but they often require substantial time commitments.

EchoTrace attempts to occupy the space between them:

- Easy to understand
- Short to play
- Intellectually satisfying
- Narratively interesting
- Replayable

A player should be able to complete an investigation during a short break while still experiencing the satisfaction of solving a genuine mystery.

---

## 5. Product Principles

### 5.1 Easy to Learn, Difficult to Master
Basic interaction should require little explanation. Complexity should emerge through increasingly sophisticated mysteries rather than increasingly complicated controls.

### 5.2 Reasoning Over Randomness
Players should succeed primarily because they observed carefully, remembered correctly, interpreted evidence, identified contradictions, and reasoned logically. Random mechanics should never determine whether the player can solve a mystery.

### 5.3 Fair Mysteries
The correct solution must be logically discoverable from information available to the player. Red herrings are acceptable. Impossible deductions are not.

### 5.4 Short, Meaningful Sessions
A normal investigation should initially target approximately **3–8 minutes**. More advanced cases may eventually be longer.

### 5.5 Content Over Complexity
Adding another mystery should generally provide more player value than adding another unnecessary system.

### 5.6 Mobile-Friendly by Design
Although the first implementation is web-first, interactions must be designed for mouse, touch, and keyboard where appropriate.

### 5.7 Monetization Must Not Destroy Trust
Monetization should expand or enhance the experience rather than deliberately making gameplay frustrating.

---

## 6. Target Audience

### 6.1 Primary Audience

Casual and mid-core players who enjoy:

- Detective stories
- Mysteries
- Logic puzzles
- Memory challenges
- Hidden-object games
- Escape-room puzzles
- Visual puzzles
- Crime-solving experiences
- Brain-training games

### 6.2 Initial Age Positioning

Recommended initial target: **13+**.

Final age rating will depend on eventual content, themes, advertising, data collection, and platform requirements.

The MVP should avoid graphic violence, explicit sexual content, and unnecessarily disturbing imagery. Mysteries can involve crime without requiring graphic depictions.

---

## 7. Player Personas

### 7.1 Casual Investigator
Plays for several minutes during breaks and wants quick cases, simple controls, satisfying conclusions, and moderate difficulty.

### 7.2 Puzzle Enthusiast
Enjoys challenging cases, minimal hints, high scores, perfect evidence collection, achievements, and leaderboards.

### 7.3 Mystery Fan
Primarily interested in story, believable motives, interesting characters, twists, witness contradictions, and satisfying resolutions.

### 7.4 Daily Player
Returns frequently for new content and may value Daily Echo, streaks, rankings, achievements, seasonal mysteries, and community challenges.

---

## 8. Core Gameplay Loop

The standard EchoTrace investigation consists of:

```text
CASE SELECTION
      ↓
CASE BRIEFING
      ↓
OBSERVATION
      ↓
TRANSITION
      ↓
INVESTIGATION
      ↓
EVIDENCE COLLECTION
      ↓
WITNESS TESTIMONY
      ↓
DEDUCTION
      ↓
FINAL DECISION
      ↓
CASE RESOLUTION
      ↓
SCORING
      ↓
PROGRESSION / REPLAY
```

Individual cases may eventually vary this structure, but the underlying mental model should remain recognizable. Exact rules will be defined in `GAME_SPEC.md`.

---

## 9. MVP Objective

The MVP should answer one fundamental question:

> **Does solving an EchoTrace mystery feel sufficiently enjoyable and distinctive that players want another case?**

The MVP is not intended to prove every future feature. It must prove the **core gameplay loop**.

---

## 10. MVP Vertical Slice

### Case 001 — The Missing Passport

**Setting:** Airport lounge.

**Basic premise:** A passenger's passport disappears shortly before boarding. The player must reconstruct what happened.

The player receives a briefing. An airport lounge scene appears for approximately 25 seconds. After a transition, the environment returns with important details changed. The player identifies those changes, generating evidence. Witness testimony introduces additional information. The player combines memory, scene changes, evidence, and testimony to determine what actually happened.

---

## 11. MVP Functional Requirements

- **FR-001 — Home Screen:** The player can access the game and begin playing.
- **FR-002 — Case Selection:** The system can display at least Case 001 and its status.
- **FR-003 — Case Briefing:** Present case title, scenario, objective, and instructions.
- **FR-004 — Observation Phase:** Present the original scene for a defined period.
- **FR-005 — Countdown:** Players can understand how much observation time remains.
- **FR-006 — Scene Transition:** Clearly transition between observation and investigation.
- **FR-007 — Altered Scene:** Investigation scene contains predetermined changes.
- **FR-008 — Interactive Investigation:** Players can select relevant objects or changes.
- **FR-009 — Correct Observation Recognition:** Recognize valid discoveries.
- **FR-010 — Incorrect Selection Handling:** Provide feedback and optionally affect scoring.
- **FR-011 — Evidence System:** Valid discoveries can become evidence.
- **FR-012 — Evidence Panel:** Players can inspect collected evidence.
- **FR-013 — Witness Testimony:** Present at least one witness statement.
- **FR-014 — Contradiction:** At least one meaningful relationship exists between evidence and testimony.
- **FR-015 — Deduction:** Require at least one reasoning-based decision.
- **FR-016 — Final Conclusion:** Player selects a final explanation or suspect.
- **FR-017 — Resolution:** Explain what happened, why, and which evidence mattered.
- **FR-018 — Scoring:** Calculate player performance.
- **FR-019 — Rating:** Translate performance into a recognizable rating such as stars or investigator rank.
- **FR-020 — Replay:** Player can replay Case 001.
- **FR-021 — Local Persistence:** Relevant progress survives refresh or return visits on the same supported device/browser.

---

## 12. Scoring Requirements

The scoring engine should reward correct observations, important evidence, accurate deductions, the correct final conclusion, and efficient investigation.

It may penalize incorrect selections, unnecessary hints, and incorrect deductions.

Conceptual model:

```text
Base Score
+ Observation Accuracy
+ Evidence Bonus
+ Deduction Bonus
+ Final Solution Bonus
+ Efficiency Bonus
- Incorrect Selection Penalties
- Hint Penalties
= Final Investigation Score
```

The exact scoring formula belongs in `GAME_SPEC.md`.

---

## 13. Difficulty System

Future cases should support difficulty levels:

- **Easy:** Longer observation periods, obvious changes, fewer objects, straightforward testimony.
- **Medium:** More environmental complexity, subtler changes, meaningful contradictions.
- **Hard:** Shorter observation opportunities, subtle clues, multiple witnesses, red herrings, complex deductions.
- **Expert:** Advanced evidence relationships, multiple plausible interpretations, minimal assistance.

Difficulty should result from reasoning complexity—not arbitrary frustration.

---

## 14. Case Content Model

Every EchoTrace mystery should ultimately be representable as structured case content:

```text
Case
│
├── Metadata
├── Briefing
├── Setting
├── Characters
├── Scenes
├── Objects
├── Changes
├── Evidence
├── Witnesses
├── Statements
├── Contradictions
├── Red Herrings
├── Deductions
├── Final Question
├── Solution
├── Resolution
└── Scoring Configuration
```

Detailed specifications belong in `CASE_AUTHORING_GUIDE.md` and `ARCHITECTURE.md`.

---

## 15. Content Scalability Requirement

**Adding a normal new case should not require modification of the fundamental EchoTrace game engine.**

Standard cases must remain data-driven. Exceptions may exist for genuinely unique gameplay experiences.

---

## 16. Progression

The MVP requires only basic progression.

Potential later progression includes case completion, stars, investigator rank, experience points, achievements, case collections, mastery, daily streaks, and seasonal rankings.

Progression must reward investigation rather than meaningless grinding.

---

## 17. Daily Echo — Future Feature

**Daily Echo** is a major post-MVP concept where players receive a new investigation or challenge daily.

Potential characteristics include:

- Common case for participating players
- Limited daily availability
- Score comparison
- Accuracy
- Completion time
- Ranking
- Streaks
- Shareable results

Daily Echo is **not required for the first vertical slice**.

---

## 18. Future Case Builder

A future internal tool should allow authorized content creators to produce mysteries without manually editing application code.

Potential capabilities include title, setting, difficulty, characters, observation time, objects, changes, evidence, witnesses, contradictions, questions, solution, resolution, and scoring.

This feature is explicitly **out of scope for the MVP**.

---

## 19. User Experience Requirements

EchoTrace should feel intelligent, mysterious, polished, focused, modern, atmospheric, and readable.

The interface should not overwhelm players with unnecessary controls. During investigation, attention should remain primarily on the mystery.

---

## 20. Visual Direction

The initial direction should evoke:

> **Modern detective thriller + elegant puzzle game**

rather than a children's spot-the-difference game.

Potential visual themes include investigative boards, evidence cards, subtle forensic interfaces, cinematic environments, case folders, dossier-inspired elements, and restrained animations.

---

## 21. Audio Requirements

Audio is not required for the earliest functional prototype but should be incorporated during MVP polish.

Potential categories include ambient environmental sound, countdown cues, evidence discovery, incorrect interaction, deduction confirmation, case resolution, and subtle background music.

Players must be able to control audio.

---

## 22. Accessibility Requirements

Accessibility should be considered from the beginning.

Requirements include, where applicable:

- Sufficient contrast
- Readable typography
- Scalable UI
- Keyboard navigation for application interfaces
- Visible focus states
- Screen-reader-friendly non-game interfaces
- Reduced-motion consideration
- Alternatives to information communicated exclusively through color
- Audio controls
- Touch targets suitable for mobile devices

---

## 23. Responsive Design

The application must support common desktop and mobile viewport sizes.

- **Desktop:** Mouse + keyboard
- **Tablet:** Touch
- **Mobile:** Touch-first

Scene composition must account for smaller screens without making evidence impossible to identify.

---

## 24. Performance Requirements

The experience should feel responsive on typical supported consumer devices.

Objectives include minimizing initial load, optimizing scene assets, avoiding unnecessary downloads, preventing UI blocking and memory leaks, avoiding unnecessary re-renders, and lazy-loading nonessential content where appropriate.

Specific technical budgets will be established in `ARCHITECTURE.md`.

---

## 25. Reliability Requirements

The game should fail gracefully. Case-loading failures should display understandable recovery messages. Corrupted saved progress should not crash the application. Asset failures should be handled safely where practical.

Detailed rules belong in `ARCHITECTURE.md` and `AGENTS.md`.

---

## 26. Analytics Requirements

Production versions should support privacy-conscious product analytics.

Potential events:

```text
game_opened
case_started
observation_completed
evidence_found
hint_used
deduction_submitted
case_completed
case_failed
case_replayed
case_abandoned
premium_viewed
purchase_started
purchase_completed
```

Analytics should answer product questions rather than collect unnecessary data.

---

## 27. Key Product Metrics

Future metrics include:

- Activation
- Case Completion Rate
- Replay Rate
- D1 Retention
- D7 Retention
- D30 Retention
- Average Session Duration
- Cases Per Player
- Hint Usage
- Conversion Rate
- ARPU
- ARPPU
- CAC
- LTV

---

## 28. MVP Success Criteria

The first vertical slice should establish whether the core game deserves expansion.

Qualitative success criteria:

- Players understand the game without extensive explanation.
- Players understand why discovered differences matter.
- Players can logically reach the solution.
- Players find the resolution satisfying.
- Most importantly, players express a desire to play another mystery.

Quantitative thresholds should be established after sufficient playtesting data exists rather than inventing arbitrary numbers beforehand.

---

## 29. Monetization Principles

Detailed commercial strategy belongs in `MONETIZATION.md`.

Potential future revenue sources include premium case packs, rewarded advertising, premium membership, seasonal content, and cosmetic/status features.

The MVP should **not** be designed around aggressive monetization. First prove engagement, then monetize demonstrated value.

---

## 30. Potential Content Collections

Examples:

### Airport Mysteries
- Missing Passport
- Unclaimed Suitcase
- Gate 17
- The Wrong Boarding Pass

### Hotel Mysteries
- Room 407
- The Vanishing Necklace
- The Midnight Visitor

### Corporate Mysteries
- The Missing Contract
- The Deleted Presentation
- The Boardroom Leak

### Train Mysteries
- The Last Passenger
- Platform Nine
- The Empty Briefcase

### Museum Mysteries
- The Missing Painting
- The Switched Artifact
- After Closing

These are examples, not committed roadmap items.

---

## 31. Competitive Strategy

EchoTrace should avoid competing solely on quantity.

The competitive moat should develop around distinctive gameplay, strong mystery writing, content-production efficiency, daily engagement, player progression, and brand.

---

## 32. Artificial Intelligence Strategy

AI should support EchoTrace but should not initially define the product.

Potential internal uses include brainstorming cases, character development, dialogue drafting, witness statements, alternative clues, contradiction generation, difficulty variants, content QA assistance, and localization assistance.

AI-generated mystery content must be validated before publication.

---

## 33. Internationalization

The initial product should be architected so localization is possible later.

Initial launch language: **English**.

Potential future languages include French, Spanish, German, Portuguese, and others based on demand.

Player-facing strings should not be unnecessarily embedded throughout game logic.

---

## 34. Privacy and Security

EchoTrace should collect only information necessary to provide and improve the product.

Core principles:

- Minimize personal information
- Never expose secrets client-side
- Protect authentication if introduced
- Validate untrusted data
- Use secure communication
- Follow applicable privacy requirements
- Provide appropriate controls when accounts are introduced

Detailed technical security controls belong in `ARCHITECTURE.md`.

---

## 35. MVP Out of Scope

Unless explicitly approved later, the first vertical slice excludes:

- Multiplayer
- Real-time multiplayer
- Chat
- Clans or guilds
- User-generated public cases
- AI-generated live cases
- Subscriptions
- Complex payment infrastructure
- Large achievement systems
- Extensive leaderboards
- Social network features
- 100 cases
- Elaborate backend infrastructure
- Native mobile applications
- Advanced Case Builder
- Complex account system

This protects the MVP from feature creep.

---

## 36. Development Philosophy

EchoTrace will use controlled AI-assisted development.

```text
SPEC
  ↓
PLAN
  ↓
CODE
  ↓
TEST
  ↓
INSPECT
  ↓
FIX
  ↓
VERIFY
  ↓
COMMIT
```

The objective is not maximum coding speed. The objective is:

> **Maximum sustainable development velocity without sacrificing architecture, quality, or maintainability.**

Detailed agent behavior belongs in `AGENTS.md`.

---

## 37. Product Risk Register

### Risk 1 — Game Feels Like Ordinary Spot-the-Difference
**Mitigation:** Make evidence, witnesses, contradictions, and deduction central to gameplay.

### Risk 2 — Cases Become Expensive to Produce
**Mitigation:** Data-driven case engine and eventually an internal Case Builder.

### Risk 3 — Mysteries Feel Unfair
**Mitigation:** Formal case-authoring rules and mandatory playtesting.

### Risk 4 — Vibe Coding Creates Technical Debt
**Mitigation:** `AGENTS.md`, architectural boundaries, scoped prompts, testing, and review.

### Risk 5 — Feature Creep
**Mitigation:** Strict MVP boundaries and roadmap gates.

### Risk 6 — Players Don't Return
**Mitigation:** Test progression, new content, Daily Echo, and case collections after validating the core loop.

### Risk 7 — Monetization Damages Experience
**Mitigation:** Prefer content-driven and optional monetization over artificial frustration.

### Risk 8 — Content Becomes Repetitive
**Mitigation:** Multiple settings, deduction types, witness structures, difficulty models, and narrative patterns.

---

## 38. Product Decision Framework

Before adding a major feature, ask:

1. Does it make investigations more enjoyable?
2. Does it improve retention or meaningful progression?
3. Does it strengthen our differentiation?
4. Can it scale across many cases?
5. Does it introduce unnecessary architectural complexity?
6. Can we measure whether it works?

If a proposed feature cannot answer these questions convincingly, it should probably wait.

---

## 39. Definition of MVP Done

The MVP should not be considered complete simply because the application builds successfully.

Case 001 must be:

- **Playable:** The entire investigation can be completed.
- **Understandable:** A new player can determine what to do.
- **Fair:** The solution follows from available evidence.
- **Stable:** No known critical defects block the core experience.
- **Responsive:** Supported target devices provide usable gameplay.
- **Replayable:** The case can be restarted correctly.
- **Persistent:** Required local progress behaves correctly.
- **Tested:** Critical deterministic game logic is covered appropriately.
- **Polished:** The vertical slice feels like a game rather than a technical prototype.
- **Validated:** Real users have played it and provided feedback.

Only then should the project move aggressively into additional case production.

---

## 40. Long-Term Product Evolution

### Stage 1 — Vertical Slice
One polished case → prove fun.

### Stage 2 — MVP
5–10 cases + progression + save system + polish → prove repeat engagement.

### Stage 3 — Market Validation
External players + analytics + experimentation → prove retention.

### Stage 4 — Commercial Product
Premium cases + rewarded monetization + Daily Echo + broader distribution → prove revenue.

### Stage 5 — Mystery Platform
Large content library + Case Builder + AI-assisted authoring + seasonal content + competitive experiences + possible creator ecosystem → scale.

---

## 41. North-Star Product Goal

EchoTrace should eventually reach a point where a player thinks:

> **"I wonder what today's mystery is."**

We want players to develop a habit around **solving mysteries**.

---

## 42. Product Identity

**Product Name:** EchoTrace

**Working Product Descriptor:** A visual detective memory game.

**Working Tagline:** **Observe. Remember. Deduce.**

Alternative tagline: **Every detail leaves a trace.**

Branding will be finalized separately.

---

## 43. Documentation Dependencies

This PRD establishes the product-level source of truth.

It should be complemented by:

- `GAME_SPEC.md` — exact gameplay mechanics
- `CASE_AUTHORING_GUIDE.md` — mystery construction standards
- `ARCHITECTURE.md` — technical implementation
- `AGENTS.md` — AI engineering rules
- `TESTING_STRATEGY.md` — quality assurance
- `ROADMAP.md` — development sequence
- `MONETIZATION.md` — business model
- `README.md` — repository entry point

If another document conflicts with an explicit product requirement in this PRD, the conflict should be identified and resolved rather than silently interpreted by Codex.

---

## 44. Approval Gate

Before implementation begins, the project owner should approve:

- Product vision
- Core gameplay concept
- MVP definition
- Case 001 concept
- Target platforms
- MVP exclusions
- Long-term direction

The remaining documentation should then convert this approved product definition into game mechanics, architecture, testing, and implementation instructions.

---

## 45. Document Status

**Document:** `PRD.md`  
**Version:** 1.0  
**Status:** Initial Product Definition  
**Product:** EchoTrace  
**Next Document:** `GAME_SPEC.md`

### Documentation Progress

```text
ECHOTRACE/
│
├── README.md                  ○ Pending
├── PRD.md                     ● DOCUMENT 1 — COMPLETE
├── GAME_SPEC.md               ◉ DOCUMENT 2 — NEXT
├── CASE_AUTHORING_GUIDE.md    ○ Pending
├── ARCHITECTURE.md            ○ Pending
├── AGENTS.md                  ○ Pending
├── TESTING_STRATEGY.md        ○ Pending
├── ROADMAP.md                 ○ Pending
└── MONETIZATION.md            ○ Pending
```
