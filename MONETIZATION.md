# EchoTrace — Monetization Strategy

**File:** `MONETIZATION.md`  
**Product:** EchoTrace  
**Document Type:** Business Model, Monetization & Unit Economics Strategy  
**Version:** 1.0  
**Status:** Initial Commercial Strategy  
**Date:** October 2026  
**Depends On:** `PRD.md`, `GAME_SPEC.md`, `CASE_AUTHORING_GUIDE.md`, `ARCHITECTURE.md`, `ROADMAP.md`  
**Previous Document:** `ROADMAP.md`  
**Next Document:** `README.md`

---

# 1. Purpose

This document defines how EchoTrace may become a sustainable and profitable game without damaging the player experience.

It establishes:

- commercial principles;
- free versus paid structure;
- premium case-pack strategy;
- rewarded-ad strategy;
- Daily Echo's role;
- subscription criteria;
- pricing hypotheses;
- entitlement requirements;
- unit economics;
- key metrics;
- experimentation rules;
- anti-patterns;
- commercialization stages.

This is a strategy document, not a promise of specific revenue.

All pricing and financial scenarios are hypotheses until validated with real players and market data.

---

# 2. Commercial Thesis

EchoTrace should be treated as a **reusable mystery content engine**, not as a one-time game.

The engine is built once.

New mysteries, collections, daily challenges, and premium content are delivered on top of that engine.

The business becomes more attractive if:

```text
Case production cost ↓
Content library ↑
Player retention ↑
Paid conversion ↑
Lifetime value ↑
```

The central economic objective is:

> **Increase the value of the content library faster than the cost of producing and acquiring players.**

---

# 3. Monetization Principles

EchoTrace monetization must follow these principles.

## 3.1 Prove Fun Before Monetizing Aggressively

The vertical slice exists to validate gameplay.

Do not optimize purchases before proving players want another case.

## 3.2 Sell Value, Not Frustration Relief

Players should pay because they want more good mysteries, not because the free game was intentionally made annoying.

## 3.3 Keep the Mystery Fair

Paid players must not receive a logically easier “correct answer.”

Monetization should not corrupt case fairness.

## 3.4 Make Purchases Understandable

Players should know:

- what they receive;
- whether it is permanent;
- whether it renews;
- what content is included.

## 3.5 Preserve Trust

Avoid deceptive countdowns, fake scarcity, hidden subscriptions, manipulative confirmation flows, or intentionally confusing pricing.

## 3.6 Monetize After Engagement Signals

Retention and content demand should guide commercialization.

---

# 4. Recommended Monetization Ladder

Preferred progression:

```text
FREE INTRODUCTORY EXPERIENCE
          ↓
PREMIUM CASE PACKS
          ↓
OPTIONAL REWARDED HINTS
          ↓
DAILY ECHO RETENTION
          ↓
MEMBERSHIP / SUBSCRIPTION
          ↓
SEASONAL / SPECIAL COLLECTIONS
```

Not every layer must be implemented.

Each should earn its place through player behavior.

---

# 5. Free Experience

The free experience should be good enough to demonstrate the complete EchoTrace value proposition.

Recommended initial model:

- several free cases;
- full observation/evidence/witness/deduction loop;
- basic progression;
- replay;
- Daily Echo participation later at an appropriate level.

Do not make the free version feel like a nonfunctional demo.

The player should understand why buying more cases would be worthwhile.

---

# 6. Free-to-Paid Conversion Moment

The strongest conversion moment is likely:

> **After the player has solved enough good mysteries to want another one.**

Potential placement:

```text
Complete free collection
       ↓
Results / collection completion
       ↓
“Continue investigating”
       ↓
Premium collection preview
```

Do not interrupt the middle of a mystery with a purchase demand.

---

# 7. Premium Case Packs

Premium case packs are the preferred first direct-purchase model.

Advantages:

- easy to understand;
- permanent ownership;
- naturally aligned with content;
- no recurring-content promise required;
- easy to theme;
- supports gift/promotional bundles later.

Potential collections:

```text
Airport Mysteries
Hotel Mysteries
Corporate Mysteries
Museum Mysteries
Train Mysteries
Holiday Mysteries
```

---

# 8. Illustrative Case-Pack Pricing

Initial hypotheses only:

| Pack | Example Content | Illustrative Price |
|---|---:|---:|
| Mini Pack | 5 cases | $2.99 |
| Standard Pack | 10 cases | $4.99 |
| Large Collection | 20 cases | $7.99 |
| Special/Seasonal Pack | varies | $1.99–$6.99 |

These values must be tested.

They are not approved final prices.

Pricing should consider:

- content quality;
- case length;
- production cost;
- platform fees;
- competitor expectations;
- willingness to pay;
- geographic pricing;
- promotions.

---

# 9. Premium Content Quality Rule

Paid content must not merely contain more cases.

It should maintain or improve:

- writing;
- visual quality;
- deduction quality;
- variety;
- polish;
- resolution quality.

Players who purchase a pack should feel the content justified the price.

---

# 10. Rewarded Advertising

If ads are introduced, EchoTrace should prefer **rewarded advertising** over disruptive forced advertising.

Potential exchange:

```text
Player requests strong hint
        ↓
Optional rewarded ad
        ↓
Hint granted
```

or:

```text
Player completes daily case
        ↓
Optional ad
        ↓
Bonus noncompetitive reward
```

Ads should not be required to complete a fair mystery.

---

# 11. Advertising Rules

Do not:

- intentionally make clues unfair to increase hint-ad usage;
- interrupt observation with ads;
- interrupt deduction with ads;
- place ads immediately before critical decisions;
- use deceptive close buttons;
- overload players with interstitials.

The mystery experience must remain coherent.

---

# 12. Paid Hint Alternative

If rewarded ads are unavailable or inappropriate, hints may instead be:

- limited free hints;
- included with premium membership;
- earned through normal play;
- purchased only if the economic model proves appropriate.

Avoid complicated consumable-currency systems in the early product.

---

# 13. Daily Echo

Daily Echo is primarily a **retention mechanism**, but it can support monetization indirectly.

Potential free Daily Echo:

- one daily case;
- score;
- accuracy;
- streak.

Potential premium enhancements later:

- expanded history;
- additional daily challenge;
- deeper statistics;
- premium archives;
- special monthly mysteries;
- cosmetic profile status.

Do not make the daily core unfairly pay-to-win.

---

# 14. Subscription / Detective Club

A subscription should be introduced only when EchoTrace can consistently deliver recurring value.

Working concept:

**Detective Club**

Illustrative hypothesis:

> $4.99/month

Potential benefits:

- access to rotating premium cases;
- additional monthly cases;
- premium Daily Echo archive;
- enhanced statistics;
- cosmetic profile elements;
- member collections;
- reduced/removed advertising where applicable.

This is not an approved launch price.

---

# 15. Subscription Readiness Gate

Do not launch a subscription until:

- players demonstrate recurring engagement;
- content production is reliable;
- release cadence is sustainable;
- enough premium content exists;
- churn can be measured;
- membership has ongoing value beyond “support us.”

If these conditions are not met, case packs are safer.

---

# 16. Subscription Anti-Pattern

Do not promise:

> “New mysteries every week”

unless the production pipeline can reliably deliver that cadence at acceptable quality.

Recurring billing creates recurring expectations.

Failure to maintain content cadence can increase churn and damage trust.

---

# 17. Seasonal Content

Seasonal packs can create natural purchase moments.

Examples:

- Halloween Mystery Collection;
- Winter Travel Mysteries;
- Valentine's Deceptions;
- Summer Vacation Mysteries.

Seasonal content should remain playable after purchase unless clearly sold as time-limited access.

Avoid fake scarcity.

---

# 18. Cosmetic Monetization — Future

Potential cosmetics:

- detective profile frames;
- badges;
- case-folder themes;
- evidence-board skins;
- achievement displays.

Cosmetics must not obscure evidence or create gameplay advantages.

This is a later opportunity, not an MVP priority.

---

# 19. What EchoTrace Should Not Monetize Early

Avoid early:

- loot boxes;
- random paid rewards;
- energy/lives;
- pay-to-skip waiting;
- complex virtual currencies;
- pay-to-win clues;
- paid probability boosts;
- aggressive interstitial ads;
- expensive subscriptions with little content.

These systems are unnecessary for proving the product.

---

# 20. Entitlement Model

When paid content is introduced, access should be based on verified entitlements.

Conceptually:

```text
Player
  ↓
Purchase
  ↓
Payment Provider
  ↓
Server Verification
  ↓
Entitlement Record
  ↓
Case / Pack Access
```

The client should ask:

> “Does this player own entitlement X?”

It should not decide ownership from an editable local boolean.

---

# 21. Example Entitlements

```text
pack.airport.v1
pack.hotel.v1
pack.museum.v1
membership.detective_club
season.halloween.2027
```

Stable entitlement identifiers simplify future storefronts and platform integration.

---

# 22. Guest Players

EchoTrace should ideally allow players to experience free content without immediate account creation.

When a purchase requires account association or restoration, explain why.

Avoid forcing registration before players understand the game's value unless platform requirements make it necessary.

---

# 23. Purchase Restoration

Paid content should be recoverable where platform/provider capabilities permit.

The commercial architecture should eventually support:

- restored purchases;
- account-linked entitlements;
- device changes;
- duplicate-purchase prevention.

---

# 24. Web vs. App Store Economics

Distribution channel affects:

- fees;
- payment options;
- discovery;
- purchase rules;
- subscriptions;
- refunds;
- taxes;
- regional requirements.

Do not assume web payment architecture can be copied unchanged into native app stores.

Platform-specific requirements should be reviewed before native commercialization.

---

# 25. Core Business Metrics

Track at least the following once sufficient traffic exists.

## Acquisition

- installs/visits;
- acquisition source;
- cost per acquired user;
- organic versus paid share.

## Activation

- case started;
- first case completed;
- time to first completion.

## Engagement

- sessions per player;
- cases per session;
- completion rate;
- replay rate;
- Daily Echo participation.

## Retention

- D1;
- D7;
- D30;
- streak continuation.

## Monetization

- payer conversion;
- purchase conversion;
- ARPU;
- ARPPU;
- pack attach rate;
- subscription conversion;
- churn if subscription exists.

---

# 26. Key Definitions

### ARPU

Average Revenue Per User.

```text
ARPU = Total Revenue / Total Users
```

### ARPPU

Average Revenue Per Paying User.

```text
ARPPU = Total Revenue / Paying Users
```

### CAC

Customer Acquisition Cost.

```text
CAC = Acquisition Spend / New Acquired Customers
```

Definitions must remain consistent in analytics/reporting.

---

# 27. Lifetime Value

LTV estimates the economic value generated by a player over their relationship with EchoTrace.

A simple early approximation might use:

```text
LTV ≈ average monthly contribution margin per player
      × expected retained lifetime in months
```

A more mature model should use observed retention and purchase cohorts.

Do not invent precision before enough data exists.

---

# 28. Fundamental Economic Rule

The business must ultimately satisfy:

> **LTV > CAC**

Preferably by a meaningful margin.

If it costs more to acquire a paying player than that player generates in contribution value, scaling paid acquisition destroys value.

---

# 29. Contribution Margin

Revenue is not profit.

Consider:

```text
Gross Revenue
- platform/payment fees
- advertising revenue share effects
- refunds
- taxes where applicable
- content production
- infrastructure
- customer support
- acquisition spend
--------------------------------
Contribution / Operating Margin
```

Track costs by stage.

---

# 30. Case Economics

EchoTrace should eventually measure the economics of producing a case.

Potential components:

```text
writing
logic design
visual assets
audio
implementation
QA
playtesting
localization
maintenance
```

The content engine becomes powerful when additional cases require progressively less engineering effort.

---

# 31. Content Production KPI

Track:

> **Average production cost and time per publishable case**

Over time, the goal is to reduce this through:

- reusable mechanics;
- standardized authoring;
- asset pipelines;
- Case Builder;
- AI-assisted drafting;
- automated validation.

Do not reduce cost by sacrificing fairness or quality.

---

# 32. Illustrative Revenue Scenario

This is a scenario, **not a forecast**.

Assume:

```text
Monthly active users: 10,000
Paying conversion:    3%
Paying users:         300
Average paid revenue: $5
Paid revenue:         $1,500
Ads/other revenue:    $500
--------------------------------
Illustrative gross:   $2,000/month
```

Actual results could be materially lower or higher.

The purpose is to show which variables matter:

- audience;
- conversion;
- revenue per payer;
- retention;
- ad economics.

---

# 33. Scenario Modeling

Maintain at least three scenarios later:

### Conservative

Lower acquisition, retention, and conversion.

### Base

Evidence-based central assumptions.

### Upside

Strong retention and organic growth.

Do not use the upside scenario as the operating plan.

---

# 34. Conversion Funnel

A future commercial funnel might be:

```text
Visitor
  ↓
Starts free case
  ↓
Completes free case
  ↓
Completes free collection
  ↓
Views premium collection
  ↓
Starts checkout
  ↓
Purchases
  ↓
Completes premium cases
  ↓
Returns for new content
```

Measure drop-off at each stage.

---

# 35. Monetization Experiments

Potential experiments:

- number of free cases;
- pack size;
- pack price;
- premium preview design;
- bundle discount;
- post-completion offer timing;
- Daily Echo premium benefit.

Each experiment should define:

```text
hypothesis
primary metric
guardrail metrics
sample requirements
decision rule
```

Do not change many commercial variables simultaneously without being able to interpret results.

---

# 36. Guardrail Metrics

Revenue experiments should also monitor:

- completion;
- retention;
- session satisfaction;
- abandonment;
- refund rate;
- ad complaints;
- support issues.

A change that increases short-term revenue while damaging retention may be harmful.

---

# 37. Pricing Experiments

Pricing tests should be deliberate.

Possible questions:

- Is $2.99 for five cases attractive?
- Does a 10-case pack outperform smaller packs?
- Does a bundle increase total revenue?
- Does premium content need a free preview?
- Does localized pricing improve conversion?

Respect platform rules and consumer-protection requirements.

---

# 38. Discounts

Use discounts strategically.

Potential:

- launch promotion;
- collection bundle;
- seasonal promotion;
- returning-player offer.

Avoid permanent fake discounts where the “sale” price is effectively the normal price.

---

# 39. Bundles

Bundles may improve perceived value.

Example:

```text
Airport Pack      $4.99
Hotel Pack        $4.99
Mystery Bundle    $7.99
```

Prices are illustrative.

Bundle ownership logic must avoid charging players incorrectly for content they already own.

---

# 40. Free Content Strategy

Free content is acquisition and conversion infrastructure.

Free cases should:

- demonstrate the strongest mechanics;
- include satisfying resolutions;
- represent product quality;
- create curiosity for more.

Do not reserve all interesting mechanics for paid content.

If free content is weak, players will not assume premium content is better.

---

# 41. Premium Preview

Players may be allowed to see:

- collection artwork;
- titles;
- themes;
- difficulty;
- number of cases;
- short descriptions.

Avoid exposing spoilers.

A premium preview should communicate value without pressure.

---

# 42. Ads vs. Purchases

The product should not assume every player monetizes the same way.

Potential segmentation:

```text
Free player → optional rewarded ads
Paid player → premium packs
Highly engaged player → future membership
```

Avoid forcing paid players through excessive advertising.

---

# 43. Membership Cannibalization

If a subscription is introduced, evaluate whether it reduces profitable case-pack purchases.

Potential models:

- membership includes all packs;
- membership includes rotating packs;
- membership discounts packs;
- packs remain permanent while membership offers temporary access.

The choice should be based on observed behavior and economics.

---

# 44. Daily Echo Economics

Daily Echo may improve:

- retention;
- session frequency;
- reactivation;
- ad inventory;
- membership value;
- organic sharing.

Its primary purpose should remain habit formation.

A retention feature can be economically valuable even when it does not directly charge the player.

---

# 45. Streak Ethics

Streaks can encourage return behavior.

Do not design them to create excessive anxiety or punitive loss.

Potentially allow:

- grace mechanisms;
- visible but nonpunitive history;
- achievement milestones.

Player habit should come from enjoyment, not coercion.

---

# 46. Referral & Sharing — Future

Potential organic growth mechanics:

- spoiler-safe Daily Echo result card;
- score percentile;
- streak milestone;
- collection completion badge.

Do not reveal mystery solutions in shared content.

Referral rewards, if added, should be simple and fraud-resistant.

---

# 47. Organic Acquisition

EchoTrace has potential for content-led acquisition.

Channels may include:

- short-form mystery clips;
- “Can you spot what changed?” previews;
- social deduction teasers;
- creator playthroughs;
- puzzle communities;
- app-store discovery;
- SEO around mystery/brain games.

Marketing strategy should be validated separately from engineering.

---

# 48. Paid Acquisition

Do not scale paid advertising before basic unit economics are understood.

Before meaningful spend, know:

- activation;
- retention;
- payer conversion;
- ARPU;
- approximate LTV.

Small acquisition tests may still be useful for learning.

---

# 49. Virality

EchoTrace should not depend on virality for viability.

However, Daily Echo can create shareable behavior.

A strong viral loop would be:

```text
Solve daily mystery
      ↓
Receive spoiler-safe result
      ↓
Share
      ↓
Friend tries same mystery
      ↓
Compare results
```

This should be considered after core gameplay works.

---

# 50. Retention Before Scale

Do not aggressively acquire players into a product that does not retain them.

A leaky funnel wastes marketing spend.

Priority:

```text
Core fun
→ completion
→ desire for another case
→ retention
→ monetization
→ acquisition scale
```

---

# 51. Revenue Forecasting Rules

Financial forecasts must clearly label:

- assumptions;
- time period;
- user counts;
- conversion;
- pricing;
- fees;
- costs;
- uncertainty.

Do not present illustrative math as guaranteed revenue.

Update forecasts when real cohort data becomes available.

---

# 52. Break-Even Thinking

A future break-even model should include:

```text
Fixed Costs
+ Content Costs
+ Infrastructure
+ Marketing
+ Support
+ Platform/Payment Costs
--------------------------------
Required Contribution Revenue
```

Then determine the combination of:

- active users;
- payer conversion;
- ARPPU;
- ad revenue;

needed to cover costs.

---

# 53. Infrastructure Cost Discipline

The game should remain inexpensive to operate early.

Avoid:

- oversized servers;
- unnecessary always-on services;
- expensive AI inference in the live gameplay loop;
- premature distributed infrastructure.

AI-assisted authoring can occur offline/internal rather than requiring costly inference for every player session.

---

# 54. AI Economics

AI may improve margins by reducing authoring cost.

Potential uses:

- case ideation;
- dialogue drafts;
- localization drafts;
- QA scenario generation;
- contradiction analysis.

Measure whether AI actually reduces:

- author hours;
- revision cycles;
- localization cost;
- QA effort.

Do not assume AI-generated content is free; review time is also a cost.

---

# 55. Case Builder Economics

The internal Case Builder should be built when:

```text
cost of repetitive manual case production
>
cost of building and maintaining authoring tooling
```

Before that point, structured files may be sufficient.

This avoids premature internal-tool investment.

---

# 56. Localization Economics

Localization may unlock new markets.

Prioritize languages using evidence such as:

- player geography;
- store demand;
- organic traffic;
- conversion opportunity;
- localization cost.

Architecture should support localization early, but commercial localization can be phased.

---

# 57. Customer Support

Monetization creates support obligations.

Prepare for:

- missing purchase;
- restore purchase;
- duplicate charge;
- refund questions;
- account access;
- content availability.

Support burden should be considered in unit economics.

---

# 58. Refunds

Refund behavior varies by platform/provider.

Track:

- refund rate;
- reasons;
- affected products;
- entitlement revocation requirements.

Do not make refund processes intentionally difficult.

---

# 59. Fraud & Abuse — Future

When commercial value increases, risks may include:

- entitlement tampering;
- payment fraud;
- leaderboard manipulation;
- referral abuse.

Use proportionate controls.

Do not build enterprise fraud infrastructure for the vertical slice.

---

# 60. Privacy & Commercial Data

Commercial analytics should collect only necessary information.

Do not sell sensitive player information.

Payment data should be handled by appropriate payment providers rather than stored unnecessarily by EchoTrace.

Privacy requirements must be reviewed before commercial launch.

---

# 61. Children's Considerations

The initial product positioning in `PRD.md` is 13+.

Before knowingly targeting younger children, review applicable:

- privacy;
- advertising;
- consent;
- platform;
- consumer-protection requirements.

Do not expand into child-directed monetization casually.

---

# 62. Commercial Stage Gates

## Gate A — Gameplay

Players want another case.

## Gate B — Content

Multiple cases can be produced efficiently.

## Gate C — Retention

Players return.

## Gate D — Purchase Intent

Players demonstrate willingness to pay.

## Gate E — Unit Economics

Revenue potential can reasonably exceed variable costs and acquisition cost.

## Gate F — Subscription

Recurring engagement and content cadence justify recurring billing.

Each gate should be supported by evidence.

---

# 63. Recommended Commercial Sequence

```text
1. Build Case 001
2. Validate fun/fairness
3. Build 5–10 cases
4. Measure retention
5. Test premium-pack interest
6. Introduce first paid collection
7. Measure conversion and satisfaction
8. Introduce Daily Echo
9. Improve content pipeline
10. Evaluate membership
11. Scale acquisition only after economics support it
```

---

# 64. First Revenue Objective

The first commercial objective should not be:

> “Maximize revenue.”

It should be:

> **Prove that at least some satisfied players will pay for additional high-quality EchoTrace mysteries.**

That validates the core business model.

---

# 65. Monetization Success Metrics

Early:

- premium page views;
- checkout starts;
- purchase conversion;
- pack completion;
- refund rate;
- satisfaction;
- repeat purchase.

Later:

- ARPU;
- ARPPU;
- LTV;
- CAC;
- LTV:CAC;
- subscription churn;
- recurring revenue;
- contribution margin.

---

# 66. Example Dashboard

A future business dashboard might show:

```text
Active Players
New Players
D1 / D7 / D30 Retention
Cases per Player
Daily Echo Participation
Free → Paid Conversion
Pack Revenue
Ad Revenue
ARPU
ARPPU
Refund Rate
Content Cost per Case
CAC
Estimated LTV
```

Metrics should lead to decisions, not exist merely for reporting.

---

# 67. Monetization Anti-Patterns

Do not:

### Monetize Before Product Validation
Revenue mechanics cannot rescue weak gameplay.

### Overload With Ads
Destroys atmosphere and trust.

### Launch Subscription Without Content Cadence
Creates churn and disappointment.

### Build Complex Currency Systems
Adds unnecessary cognitive and technical cost.

### Hide Prices or Renewal Terms
Damages trust and may violate platform rules.

### Make Free Cases Intentionally Bad
Reduces conversion rather than increasing it.

### Treat Gross Revenue as Profit
Ignores fees and costs.

### Scale CAC Before Knowing LTV
Can turn growth into losses.

### Sell the Answer
Damages the core detective fantasy.

---

# 68. Decision Framework for Any Monetization Feature

Before implementing, answer:

1. What player value does this provide?
2. Why should the player pay?
3. Does it preserve mystery fairness?
4. Is the offer understandable?
5. Does it require backend entitlement verification?
6. What metric will determine success?
7. What retention guardrail will be monitored?
8. What is the engineering/operational cost?
9. Can it be tested before full rollout?
10. Can it be removed if it performs poorly?

If these questions cannot be answered, the feature is not ready.

---

# 69. Architecture Requirements

Commercial implementation must follow `ARCHITECTURE.md`.

In particular:

- payment verification server-side;
- entitlements abstracted from UI;
- provider-specific code isolated;
- analytics isolated;
- no secrets client-side;
- purchase state not trusted from local storage alone.

---

# 70. Testing Requirements

Commercial systems must follow `TESTING_STRATEGY.md`.

Future purchase tests must cover:

- successful purchase;
- failed purchase;
- canceled purchase;
- duplicate event;
- entitlement grant;
- restore;
- revoked/refunded access where applicable;
- network failure;
- client tampering.

No money-related system should depend only on manual testing.

---

# 71. AI-Agent Rules

Codex must not implement monetization merely because this document describes future possibilities.

A monetization feature requires an explicit implementation task.

Before implementation, Codex must read:

```text
PRD.md
MONETIZATION.md
ARCHITECTURE.md
AGENTS.md
TESTING_STRATEGY.md
```

It must preserve the stage gates defined here.

---

# 72. Initial Commercial Recommendation

For EchoTrace's first validated commercial version:

### Free
A strong introductory set of cases.

### Paid
One or more themed permanent case packs.

### Optional
Rewarded hints only if player testing supports them.

### Retention
Daily Echo after the core library and backend are ready.

### Subscription
Defer until recurring engagement and content production justify it.

This structure minimizes commercial complexity while testing willingness to pay.

---

# 73. Long-Term Business Vision

If EchoTrace succeeds, the business can evolve from:

```text
ONE GAME
   ↓
MYSTERY LIBRARY
   ↓
DAILY HABIT
   ↓
RECURRING CONTENT BUSINESS
   ↓
MYSTERY CREATION PLATFORM
```

The strongest moat would come from the combination of:

- recognizable brand;
- strong game engine;
- large high-quality case library;
- efficient authoring pipeline;
- player progression/history;
- Daily Echo habit;
- data-informed case design.

---

# 74. Commercial North Star

The commercial strategy should reinforce the same product feeling:

> **“I wonder what today's mystery is — and I want another one.”**

Revenue should be the result of sustained player value.

---

# 75. Document Status

**Document:** `MONETIZATION.md`  
**Version:** 1.0  
**Status:** Initial Commercial Strategy  
**Product:** EchoTrace  
**Previous Document:** `ROADMAP.md`  
**Next Document:** `README.md`

### Documentation Progress

```text
ECHOTRACE/
│
├── README.md                  ◉ DOCUMENT 9 — NEXT
├── PRD.md                     ● COMPLETE
├── GAME_SPEC.md               ● COMPLETE
├── CASE_AUTHORING_GUIDE.md    ● COMPLETE
├── ARCHITECTURE.md            ● COMPLETE
├── AGENTS.md                  ● COMPLETE
├── TESTING_STRATEGY.md        ● COMPLETE
├── ROADMAP.md                 ● COMPLETE
└── MONETIZATION.md            ● DOCUMENT 8 — COMPLETE
```
