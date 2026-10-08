# EchoTrace — Case Authoring Guide

**File:** `CASE_AUTHORING_GUIDE.md`  
**Product:** EchoTrace  
**Document Type:** Mystery Design & Content Authoring Standard  
**Version:** 1.0  
**Status:** Initial Authoring Standard  
**Date:** October 2026  
**Depends On:** `PRD.md`, `GAME_SPEC.md`  
**Previous Document:** `GAME_SPEC.md`  
**Next Document:** `ARCHITECTURE.md`

---

## 1. Purpose

This document defines how EchoTrace cases are designed, authored, reviewed, validated, balanced, and prepared for implementation.

The goal is to make case creation:

- consistent;
- fair;
- scalable;
- data-driven;
- testable;
- engaging;
- understandable by human writers and AI-assisted authoring tools.

A normal EchoTrace case should be creatable without changing the core game engine.

This guide is the content-design contract between:

- game designers;
- mystery writers;
- developers;
- visual designers;
- QA/playtesters;
- Codex and other AI agents;
- future internal Case Builder tooling.

---

## 2. Authoring Philosophy

An EchoTrace case is not merely a scene containing differences.

It is a **small logical mystery** in which visual changes become evidence and evidence supports deduction.

Every case should answer:

1. What happened?
2. What did the player have an opportunity to observe?
3. What changed?
4. Which changes matter?
5. What evidence can the player collect?
6. What do witnesses claim?
7. Where are the contradictions?
8. What can the player logically deduce?
9. What is the canonical solution?
10. Can the resolution prove that solution using information already available?

If the answer to question 10 is no, the case is not ready.

---

## 3. The EchoTrace Mystery Contract

Every standard published case must satisfy six principles.

### 3.1 Observable

Required clues must be reasonably perceivable.

### 3.2 Rememberable

The observation challenge may be difficult, but must not depend on unreasonable memorization.

### 3.3 Relevant

At least some observed changes must contribute to the investigation rather than existing only as visual trivia.

### 3.4 Deductible

The canonical conclusion must follow logically from evidence.

### 3.5 Fair

The game must not require hidden information or arbitrary guessing.

### 3.6 Explainable

The resolution must be able to reconstruct why the answer is correct.

The core authoring rule is:

> **Never ask the player to know something the case never gave them a fair opportunity to learn.**

---

## 4. Standard Case Anatomy

A standard case should conceptually contain:

```text
CASE
│
├── Metadata
├── Premise
├── Setting
├── Objective
├── Characters
├── Observation Scene
│   ├── Objects
│   ├── Positions
│   └── Relationships
├── Investigation Scene
│   ├── Changes
│   ├── Interactive Regions
│   └── Discoveries
├── Evidence
├── Witnesses
│   └── Statements
├── Contradictions
├── Red Herrings
├── Deductions
├── Final Decision
├── Canonical Solution
├── Resolution
├── Scoring Configuration
└── Authoring / QA Metadata
```

The technical schema will be defined in `ARCHITECTURE.md`.

---

## 5. Case Design Workflow

Authors should follow this order:

```text
1. SOLUTION
      ↓
2. INCIDENT
      ↓
3. EVIDENCE CHAIN
      ↓
4. CHARACTERS / WITNESSES
      ↓
5. CONTRADICTIONS
      ↓
6. VISUAL CHANGES
      ↓
7. OBSERVATION SCENE
      ↓
8. DEDUCTION QUESTIONS
      ↓
9. RED HERRINGS
      ↓
10. RESOLUTION
      ↓
11. DIFFICULTY TUNING
      ↓
12. VALIDATION
      ↓
13. PLAYTEST
```

Do **not** begin by randomly creating visual differences and attempt to invent a mystery afterward.

Start with the truth.

Then work backward to the clues.

---

## 6. Step 1 — Define the Canonical Solution

Before writing dialogue or designing the scene, write the true sequence of events.

Example:

```text
Canonical Truth

1. Traveler places passport beside coffee cup.
2. Traveler leaves table briefly.
3. Another passenger accidentally moves the coffee cup.
4. Passport becomes attached beneath a folded boarding document.
5. Document is placed inside the red travel folder.
6. Witness assumes someone stole the passport.
7. Passport was misplaced, not stolen.
```

This is only an example.

The canonical truth must remain internally consistent throughout the case.

---

## 7. Step 2 — Define the Incident

The incident is what the player is asked to investigate.

Good incident descriptions are:

- understandable;
- specific;
- immediately interesting;
- short.

Example:

> A passenger's passport has disappeared minutes before boarding. Determine what happened before the flight closes.

Avoid revealing the solution in the briefing.

---

## 8. Step 3 — Build the Evidence Chain

Every important conclusion should be supported by evidence.

Use a chain such as:

```text
Observation
    ↓
Change
    ↓
Evidence
    ↓
Contradiction
    ↓
Deduction
    ↓
Conclusion
```

Example:

```text
Observation:
Red suitcase was beside Chair A.

Change:
It is now beside Chair B.

Evidence:
The suitcase was moved during the relevant period.

Witness statement:
“I stayed in my seat the entire time.”

Additional evidence:
Witness's boarding pass is beside Chair B.

Deduction:
The witness moved from the original location.

Conclusion:
The statement is unreliable.
```

The exact story may vary, but the logical chain must be traceable.

---

## 9. Evidence Categories

Evidence may be categorized as:

### 9.1 Primary Evidence

Required to reach the canonical solution.

### 9.2 Supporting Evidence

Strengthens a conclusion but is not strictly necessary.

### 9.3 Context Evidence

Explains setting, motive, timeline, or relationships.

### 9.4 Contradictory Evidence

Directly conflicts with testimony or another claim.

### 9.5 Exculpatory Evidence

Helps eliminate a suspect or hypothesis.

### 9.6 Red-Herring Evidence

Initially appears important but can be logically dismissed.

Required evidence must always be reasonably discoverable.

---

## 10. Evidence Dependency Map

For nontrivial cases, authors should create a dependency map.

Example:

```text
E1: Passport missing
E2: Coffee cup moved
E3: Boarding pass found at second table
S1: Witness claims never to have moved

E2 + E3
    ↓
Contradicts S1
    ↓
D1: Witness changed location

E1 + D1 + E4
    ↓
Final Deduction
```

No required final conclusion should depend on evidence that is impossible to discover.

---

## 11. Step 4 — Create Characters

Characters should exist for a reason.

Possible roles include:

- victim;
- witness;
- suspect;
- employee;
- bystander;
- investigator contact;
- person of interest.

For each significant character, define:

```text
id
name
role
publicDescription
relationshipToIncident
knowledge
beliefs
motive
opportunity
truthfulFacts
mistakenFacts
hiddenFacts
```

Not every case requires multiple suspects.

Characters should not be added solely to make a scene look busy.

---

## 12. Witness Design

A witness statement may be:

- true;
- incomplete;
- mistaken;
- misleading;
- intentionally false.

Authors must distinguish between these internally.

### Truthful

The witness accurately reports what they know.

### Incomplete

The statement is technically true but omits relevant information.

### Mistaken

The witness genuinely believes something incorrect.

### Misleading

The witness frames true information to create a false impression.

### False

The witness knowingly states something untrue.

The resolution should distinguish intentional deception from innocent error when it matters to the story.

---

## 13. Writing Witness Statements

Statements should sound like natural human speech rather than database records.

Weak:

> “I was located at table three during timestamp 14:03.”

Better:

> “I stayed right here. I never went near that table.”

Statements should be:

- concise;
- believable;
- relevant;
- understandable;
- consistent with the character.

Avoid excessively long exposition.

---

## 14. Step 5 — Design Contradictions

A contradiction should create a reasoning opportunity.

Types include:

### 14.1 Visual vs. Testimony

The scene contradicts what someone says.

### 14.2 Evidence vs. Testimony

A collected clue contradicts a statement.

### 14.3 Testimony vs. Testimony

Two witnesses provide incompatible accounts.

### 14.4 Timeline Contradiction

A claimed event cannot fit the established timeline.

### 14.5 Object Relationship Contradiction

The location or condition of an object makes a claim implausible.

Contradictions must be meaningful. Minor wording differences are not automatically contradictions.

---

## 15. Step 6 — Design Visual Changes

Visual changes are the bridge between memory gameplay and investigation.

Potential change types:

- object removed;
- object added;
- object moved;
- object rotated;
- object opened/closed;
- object exchanged;
- color/state changed;
- quantity changed;
- person moved;
- person disappeared;
- relationship between objects changed.

Use subtlety carefully.

The player should be challenged by memory, not by poor visibility.

---

## 16. Meaningful vs. Decorative Changes

### Meaningful Change

Contributes directly or indirectly to the mystery.

Example:

> A boarding pass moves to a location that contradicts a witness.

### Decorative Change

Exists primarily as observation challenge or misdirection.

Example:

> A magazine changes orientation but has no bearing on the mystery.

Decorative changes are allowed, but standard cases should prioritize meaningful changes.

The MVP should keep decorative changes minimal.

---

## 17. Change Difficulty

Change difficulty may be influenced by:

- object size;
- scene density;
- visual similarity;
- spatial distance moved;
- semantic importance;
- observation time;
- number of competing objects.

Do not make difficulty primarily depend on tiny hitboxes, poor contrast, or barely visible pixels.

---

## 18. Scene Composition Rules

A good observation scene should:

- establish visual hierarchy;
- contain enough detail to challenge memory;
- avoid excessive clutter;
- keep critical clues visible;
- support desktop and mobile layouts;
- avoid UI overlays covering evidence;
- maintain consistent object identity between states.

The visual designer and case author must collaborate.

---

## 19. Object Identity

Every meaningful object should have a stable conceptual identity.

Example:

```text
passport_01
coffee_cup_01
red_suitcase_01
boarding_pass_01
chair_a
chair_b
```

Do not identify important objects only by screen coordinates.

The same logical object may have different visual states.

---

## 20. Object Relationships

Some evidence depends on relationships rather than individual objects.

Examples:

- passport is **under** newspaper;
- suitcase is **beside** Chair B;
- coffee cup is **on** Table 2;
- witness is **near** exit;
- boarding pass is **inside** folder.

Relationship changes can create stronger mysteries than simple disappearance.

---

## 21. Step 7 — Build the Observation Scene

Once the solution and evidence are known, build the original scene.

Ask:

- Which facts must the player have a chance to remember?
- Which objects establish those facts?
- Which objects are environmental context?
- Which changes will become evidence?
- Is the scene readable at target screen sizes?

Do not reveal which objects will matter.

---

## 22. Step 8 — Write Deduction Questions

Deduction questions should test reasoning.

Bad question:

> What color was the suitcase?

This tests memory only.

Better:

> Which evidence proves the witness changed seats?

Best:

> Based on the boarding pass and the suitcase location, which part of the witness's statement cannot be true?

EchoTrace may contain memory questions, but its strongest questions connect facts.

---

## 23. Deduction Question Requirements

Every deduction question must have:

```text
id
prompt
answerOptions
correctAnswer
supportingEvidence
explanation
difficulty
```

For multiple-choice questions:

- distractors must be plausible;
- only one answer should be defensibly correct unless multi-select is explicitly supported;
- wording should not accidentally reveal the answer;
- options should be comparable in specificity.

---

## 24. Step 9 — Red Herrings

Red herrings make mysteries richer when used responsibly.

A valid red herring should:

1. appear relevant;
2. have a plausible reason to attract suspicion;
3. be eliminable using evidence;
4. not invalidate the canonical solution.

Example:

A character acts nervous, but evidence shows the nervousness concerns a missed flight rather than the missing passport.

Do not use random irrelevant details merely to waste the player's time.

---

## 25. Suspect Design

If a case uses suspects, each plausible suspect should have some combination of:

- motive;
- means;
- opportunity;
- suspicious behavior;
- relationship to evidence.

However, the correct solution must be determined by evidence rather than stereotypes, appearance, or arbitrary narrative preference.

---

## 26. Timeline Design

For cases involving sequence or timing, authors should create an internal timeline.

Example:

```text
14:00 — Traveler enters lounge.
14:02 — Passport placed on table.
14:03 — Coffee delivered.
14:04 — Traveler leaves table.
14:05 — Witness changes seats.
14:06 — Document folder moved.
14:07 — Traveler returns.
14:08 — Passport reported missing.
```

The player may see only part of this timeline.

The full author timeline prevents contradictions.

---

## 27. Step 10 — Write the Resolution

The resolution should reconstruct the mystery.

Recommended structure:

### What Happened

State the canonical outcome.

### Key Evidence

Explain the decisive clues.

### Contradiction

Explain which claim was wrong or misleading.

### Deduction

Show how evidence leads to the conclusion.

### Closure

Provide a satisfying final narrative beat.

The resolution must not introduce new evidence required to justify the answer.

---

## 28. Resolution Fairness Test

Before approval, ask:

> If a player challenges the solution, can we prove it using only information available before the final decision?

If not, revise the case.

---

## 29. Step 11 — Configure Difficulty

Suggested authoring profiles:

### Easy

- 30–40 second observation;
- 2–3 major changes;
- low scene density;
- one witness;
- direct contradiction;
- limited red herrings.

### Medium

- 20–30 second observation;
- 3–5 changes;
- moderate density;
- 1–2 witnesses;
- one or more contradictions;
- one plausible red herring.

### Hard

- 15–25 second observation;
- 4–7 changes;
- denser scene;
- multiple witnesses;
- indirect evidence relationships;
- multiple plausible hypotheses.

### Expert

- advanced evidence chains;
- complex timelines;
- several testimony relationships;
- carefully controlled ambiguity;
- minimal assistance.

These are guidelines, not immutable rules.

---

## 30. Case Length

Initial target:

**3–8 minutes per standard case.**

A case should not be lengthened merely to appear more valuable.

Longer future cases may contain chapters or multiple scenes.

---

## 31. Hint Authoring

When hints are supported, authors should write escalating hints.

Example:

### Hint 1
> Something near the second table changed.

### Hint 2
> Compare where the travel documents were before and after.

### Hint 3
> Look closely at the boarding pass near Chair B.

A hint should guide reasoning rather than immediately reveal the final solution unless it is the strongest hint tier.

---

## 32. Scoring Configuration

Case authors should specify configurable values rather than embed score rules in prose.

Conceptually:

```text
baseCompletionScore
correctChangeScore
importantEvidenceScore
deductionScore
finalDecisionScore
incorrectSelectionPenalty
hintPenalty
timeBonusMaximum
starThresholds
```

The game engine remains responsible for applying the rules.

---

## 33. Case Metadata

Every case should include metadata such as:

```text
id
slug
version
title
subtitle
collection
difficulty
estimatedDuration
minimumAge
contentWarnings
author
status
createdAt
updatedAt
supportedLanguages
```

Implementation details may change in `ARCHITECTURE.md`.

---

## 34. Content Status Lifecycle

Recommended case lifecycle:

```text
CONCEPT
   ↓
DRAFT
   ↓
LOGIC_REVIEW
   ↓
VISUAL_PRODUCTION
   ↓
IMPLEMENTED
   ↓
INTERNAL_QA
   ↓
PLAYTEST
   ↓
REVISION
   ↓
APPROVED
   ↓
PUBLISHED
   ↓
RETIRED
```

A case must not move directly from draft to published.

---

## 35. Logic Review Checklist

Before visual production:

- Is the canonical truth complete?
- Does every required conclusion have evidence?
- Are all required clues discoverable?
- Are witness statements internally consistent?
- Are intentional lies provably false?
- Can mistaken statements be explained?
- Are red herrings eliminable?
- Is there one defensible canonical solution?
- Does the resolution rely only on previously available facts?

If any answer is no, the case remains in logic review.

---

## 36. Visual Review Checklist

Before implementation:

- Are required objects visible?
- Are critical changes distinguishable?
- Does the scene work on mobile?
- Are hit areas reasonable?
- Are object identities stable?
- Are UI overlays clear of clues?
- Is scene density appropriate?
- Are visual states consistent with the canonical timeline?

---

## 37. Playtest Review Checklist

Observe players without over-explaining.

Record:

- completion rate;
- missed evidence;
- common wrong selections;
- misunderstood statements;
- ambiguous questions;
- time spent per phase;
- hint usage;
- final decision distribution;
- perceived fairness;
- desire to play another case.

A case that technically works but consistently feels unfair must be revised.

---

## 38. Case Quality Rubric

Score each category from 1–5:

| Category | Question |
|---|---|
| Hook | Is the incident immediately interesting? |
| Clarity | Does the player understand the objective? |
| Observation | Is the memory challenge fair? |
| Evidence | Do discoveries feel meaningful? |
| Logic | Does the solution follow from evidence? |
| Witnesses | Does testimony add value? |
| Contradictions | Are inconsistencies meaningful? |
| Deduction | Does reasoning matter? |
| Resolution | Is the ending satisfying and explainable? |
| Replay/Shareability | Is the case memorable enough to discuss or replay? |

A low score in **Logic** or **Fairness** should block publication regardless of total score.

---

## 39. Avoiding Repetition Across Cases

Do not repeatedly use:

- identical object disappearance;
- identical lying-witness structure;
- identical culprit logic;
- identical final question;
- identical setting composition.

Vary:

- settings;
- incident types;
- evidence relationships;
- witness reliability;
- timelines;
- motivations;
- deduction types;
- visual change types;
- endings.

The engine should feel familiar while the mysteries feel fresh.

---

## 40. Mystery Archetypes

Potential reusable archetypes include:

### Missing Object
Determine what happened to an item.

### False Accusation
Evidence clears the obvious suspect.

### Switched Object
Two visually related objects were exchanged.

### Timeline Mystery
Sequence reveals the truth.

### Contradictory Witness
A statement conflicts with physical evidence.

### Misunderstanding
No crime occurred; evidence reveals an innocent explanation.

### Deliberate Deception
A character manipulated the scene.

### Identity / Ownership
Determine which object belongs to whom.

### Access Mystery
Determine who could have reached a location or object.

These are patterns, not templates to copy mechanically.

---

## 41. Ethical Content Guidelines

Cases should avoid relying on harmful stereotypes.

Do not make guilt depend on:

- race;
- ethnicity;
- nationality;
- religion;
- disability;
- gender;
- sexual orientation;
- socioeconomic status;
- appearance.

Characters may be diverse, but evidence—not identity—must determine conclusions.

Sensitive themes should be handled deliberately and age-appropriately.

---

## 42. Crime and Violence

EchoTrace may include crime-related mysteries, but the initial product should favor:

- theft;
- fraud;
- deception;
- disappearance;
- sabotage;
- misplaced items;
- suspicious events;
- non-graphic mysteries.

More serious themes may be evaluated later.

Graphic depictions are not necessary for the core gameplay.

---

## 43. Localization-Friendly Writing

Author text should:

- avoid unnecessary idioms;
- avoid clues dependent on English wordplay unless the case is explicitly language-specific;
- keep sentences concise;
- separate player-facing text from logic identifiers;
- allow translated text to expand in length.

Canonical logic must not accidentally change between translations.

---

## 44. AI-Assisted Case Authoring

AI may assist with:

- brainstorming;
- premise generation;
- character drafts;
- dialogue alternatives;
- red-herring ideas;
- evidence-chain review;
- contradiction review;
- localization drafts;
- QA scenarios.

AI must not independently approve a case for publication.

Human review is required for:

- logical fairness;
- narrative quality;
- cultural sensitivity;
- visual feasibility;
- final solution integrity.

---

## 45. AI Authoring Prompt Pattern

A future authoring workflow may instruct AI:

```text
Read PRD.md, GAME_SPEC.md, and CASE_AUTHORING_GUIDE.md.

Design one EchoTrace case.

Start with the canonical truth.
Then create the evidence dependency chain.
Then create witnesses and contradictions.
Then design visual changes.
Then create deduction questions.
Then write the resolution.

Do not create assets or implementation code.
Do not introduce evidence in the resolution that was unavailable to the player.
Flag any ambiguity in the solution.
```

This pattern keeps AI focused on mystery logic before implementation.

---

# 46. Case 001 Authoring Blueprint — The Missing Passport

## 46.1 Status

**Owner-approved canonical design / Vertical Slice**

The [canonical Case 001 dossier](docs/cases/CASE_001_THE_MISSING_PASSPORT.md) records the approved final design. Implementation, visual QA and human playtesting remain deferred. T15 is NOT AUTHORIZED.

## 46.2 Setting

Airport lounge shortly before boarding.

## 46.3 Player Objective

Determine what happened to a traveler's missing passport.

## 46.4 Design Goal

Demonstrate the complete EchoTrace identity:

```text
Observe
→ Notice Changes
→ Collect Evidence
→ Evaluate Testimony
→ Identify Contradiction
→ Deduce
→ Resolve
```

## 46.5 Required Components

- 25-second observation phase;
- three primary visual changes;
- at least one witness;
- at least one contradiction;
- at least one evidence-based deduction;
- one final decision;
- complete resolution;
- deterministic scoring.

## 46.6 Candidate Scene Objects

- passport;
- boarding pass;
- coffee cup;
- red suitcase;
- backpack;
- phone;
- newspaper;
- travel folder;
- tables;
- chairs;
- lounge signage.

These are historical brainstorming candidates. The canonical dossier defines the approved objects and changes.

## 46.7 Important Authoring Rule

Do **not** implement a culprit or final explanation merely because an early brainstorming example mentioned one.

The final truth must be intentionally authored and approved. Case 001 owner approval is recorded in the canonical dossier.

---

## 47. Recommended Case 001 Design Workshop

Case 001's approved design is recorded in the canonical dossier. The worksheet below remains an authoring template:

```text
CASE ID:
case-001

TITLE:
The Missing Passport

INCIDENT:
[final text]

CANONICAL TRUTH:
[exact sequence]

PLAYER OBJECTIVE:
[exact objective]

REQUIRED EVIDENCE:
E1:
E2:
E3:

SUPPORTING EVIDENCE:
E4:
E5:

WITNESS:
W1:

STATEMENT:
S1:

CONTRADICTION:
C1:

RED HERRING:
R1:

DEDUCTION QUESTION:
D1:

FINAL QUESTION:
F1:

CORRECT SOLUTION:
[solution]

RESOLUTION:
[explanation]

OBSERVATION TIME:
25 seconds

DIFFICULTY:
[Easy / Medium]

ESTIMATED PLAYTIME:
3–5 minutes
```

This worksheet should be completed before production assets or case-specific implementation are finalized.

---

## 48. Future Case Builder Compatibility

The authoring system should eventually map naturally to an internal Case Builder.

Authors should think in structured entities rather than arbitrary code.

The future workflow should resemble:

```text
New Case
  ↓
Enter Metadata
  ↓
Define Canonical Truth
  ↓
Add Characters
  ↓
Configure Scene
  ↓
Define Changes
  ↓
Attach Evidence
  ↓
Write Statements
  ↓
Define Contradictions
  ↓
Create Deductions
  ↓
Configure Scoring
  ↓
Validate
  ↓
Preview
  ↓
Playtest
  ↓
Publish
```

The Case Builder is not part of the initial MVP.

---

## 49. Definition of Authoring Done

A case is authoring-complete when:

- canonical truth is documented;
- incident is clear;
- all required evidence exists;
- evidence dependencies are valid;
- witness knowledge is defined;
- statements have known truth status;
- contradictions are logically valid;
- visual changes are meaningful and feasible;
- deductions are supported by evidence;
- distractors are plausible but wrong;
- red herrings are fair;
- final solution is unique or intentionally multi-solution;
- resolution explains the solution without new required facts;
- difficulty has been reviewed;
- localization concerns have been considered;
- logic review passes;
- visual review passes;
- playtesting demonstrates acceptable fairness.

---

## 50. Authoring Anti-Patterns

Do not publish cases that depend on:

### Hidden Solution Information
The resolution reveals a clue the player never had.

### Pixel Hunting
Required evidence is nearly invisible.

### Arbitrary Culprit
Several suspects fit equally well but one is declared correct without evidence.

### Fake Difficulty
Observation time is simply reduced until the case becomes frustrating.

### Dialogue Dumping
Witnesses deliver excessive exposition.

### Meaningless Differences
Most changes have no investigative purpose.

### Unfair Red Herrings
False leads cannot be logically eliminated.

### Stereotype Reasoning
Identity or appearance substitutes for evidence.

### Engine Exceptions
A normal case requires custom engine hacks.

### Resolution Retcon
The ending changes facts to make the intended answer work.

---

## 51. Case Versioning

Published cases should be versioned.

A case update may be needed because of:

- logic correction;
- asset correction;
- localization correction;
- balance adjustment;
- accessibility improvement;
- scoring adjustment.

Material changes affecting the solution or evidence chain require stronger regression testing than cosmetic updates.

---

## 52. Source of Truth

For each case, structured case data should ultimately be the runtime source of truth.

Authoring notes may explain intent, but implementation should not duplicate canonical facts across unrelated files.

The architecture document will define how this is enforced technically.

---

## 53. Relationship to Other Documents

- `PRD.md` defines the product and market-level requirements.
- `GAME_SPEC.md` defines the gameplay rules.
- `CASE_AUTHORING_GUIDE.md` defines how mystery content is constructed. **This document.**
- `ARCHITECTURE.md` defines the technical system that loads and executes authored cases.
- `AGENTS.md` defines how Codex and other agents modify the repository.
- `TESTING_STRATEGY.md` defines automated and manual verification.
- `ROADMAP.md` defines development order.
- `MONETIZATION.md` defines commercialization.
- `README.md` is the repository entry point.

If a proposed case requires violating `GAME_SPEC.md`, the conflict must be resolved explicitly rather than implemented as an undocumented exception.

---

## 54. Change Control

Material changes to the following require updating this guide:

- standard case anatomy;
- fairness rules;
- evidence categories;
- witness semantics;
- contradiction rules;
- case lifecycle;
- publication criteria;
- Case Builder authoring model.

Changes should be versioned in source control.

---

## 55. Document Status

**Document:** `CASE_AUTHORING_GUIDE.md`  
**Version:** 1.0  
**Status:** Initial Authoring Standard  
**Product:** EchoTrace  
**Previous Document:** `GAME_SPEC.md`  
**Next Document:** `ARCHITECTURE.md`

### Documentation Progress

```text
ECHOTRACE/
│
├── README.md                  ○ Pending
├── PRD.md                     ● COMPLETE
├── GAME_SPEC.md               ● COMPLETE
├── CASE_AUTHORING_GUIDE.md    ● DOCUMENT 3 — COMPLETE
├── ARCHITECTURE.md            ◉ DOCUMENT 4 — NEXT
├── AGENTS.md                  ○ Pending
├── TESTING_STRATEGY.md        ○ Pending
├── ROADMAP.md                 ○ Pending
└── MONETIZATION.md            ○ Pending
```
