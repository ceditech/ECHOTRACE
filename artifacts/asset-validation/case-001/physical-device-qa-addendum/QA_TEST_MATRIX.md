# PDQA-001 consolidated QA matrix

Primary status refers to the platform named in each row. Rows13–16 physical NOT TESTED do not erase archived desktop Automated PASS. Row12 Physically observed PASS is owner-confirmed category D only. CONDITIONAL is not software failure or accessibility certification. All evidence IDs/categories resolve through [ledger](EVIDENCE_REGISTER.md).

| # | Test | Status | Evidence | Conditions/limits | Gate |
|---|---|---|---|---|---|
| 1 | Source and geometry integrity | Automated PASS | A03/A04;B01 | Archived candidate + current source hashes; no canonical adoption | G1/G2 |
| 2 | Exactly three mystery changes | Automated PASS | A01/A03;B01 | Passport removal, stand exchange, wallet movement | G1 |
| 3 | Stable characters/environment | Automated PASS | A03;B02 | Archived stable pixels/layers; not perception proof | G1/G7 |
| 4 | Desktop loading/rendering | Automated PASS | A02;E01(C) | Archived full desktop run; owner video supportive | G3 |
| 5 | Desktop responsive fit | Automated PASS | A02;E06(E) | Five widths; effective dimensions reported separately | G2/G3 |
| 6 | Desktop zoom/pan | Automated PASS | A01/A02;E01(C) | Automated bounded transforms; reported1.5× video | G3 |
| 7 | Physical Android loading | Provisionally supported | E02/E03(C) | Reported phone LAN loading; no independent video access | G4 |
| 8 | Physical Android Original/Changed switching | Provisionally supported | E02(C) | Pair display reported; not complete lifecycle test | G4 |
| 9 | Physical Android target selection | Provisionally supported | E03(C) | Four distinct IDs at reported390; not every tap/boundary | G2/G4 |
| 10 | Physical Android effective-width reporting | Provisionally supported | E02/E03(C) | 390 reported; requested430 ≈411.43 once; cause unknown | G2/G4 |
| 11 | Physical Android zoom/pan | Provisionally supported | E02/E03(C) | Reached2×; pan available; all limits unverified | G4/G5 |
| 12 | Physical Android Show taps | Physically observed PASS | E04(D) | USER-CONFIRMED by owner; no independent frame review | G4 |
| 13 | Empty-gap rejection | NOT TESTED | U01;A01/A02(A) | Physical inconclusive; desktop Automated PASS | G5 |
| 14 | Drag-versus-tap cancellation | NOT TESTED | U01;A01/A02(A) | Physical inconclusive; desktop Automated PASS;8px research threshold | G5 |
| 15 | Multi-touch cancellation | NOT TESTED | U01;A01/A02(A) | Physical inconclusive; simulated desktop Automated PASS | G5 |
| 16 | Pointer capture/cancellation | NOT TESTED | U01;A01/A02(A) | Physical inconclusive; corrected desktop regression archived PASS | G5 |
| 17 | Narrow effective-width comfort | CONDITIONAL | E06(E);A02(A) | 288 height43.74<48;256 height38.88<48,gap7.2<8; proposed goals | G6 |
| 18 | Portrait/landscape | NOT TESTED | U02;A02(A) | No complete physical rotation result; desktop arrangement PASS | G4/G6 |
| 19 | Browser/system text scaling | NOT TESTED | U02 | No supplied physical coverage; possible shrink/occlusion | G6 |
| 20 | TalkBack/screen-reader interaction | NOT TESTED | U02 | Keyboard path does not establish screen-reader acceptance | G6 |
| 21 | Original observation readability | CONDITIONAL | E05(E);E01(C);B01(B) | Small details; no new recognition trial; later zoom not fairness proof | G6 |
| 22 | Character staging/table association | CONDITIONAL | B02(B);E01(C) | Proportions/Owen association await owner review | G7 |
| 23 | Artwork provenance/rights | BLOCKED | B03(B) | Production clearance not established; not unlawful-use finding | G8 |
| 24 | iOS Safari compatibility | NOT TESTED | U03 | No physical/Safari evidence supplied | G9 |
| 25 | Installed-PWA behavior | NOT TESTED | U03 | No installable surface; standalone HTML not installed PWA | G10 |
| 26 | Gameplay timer/interruption/recovery | NOT TESTED | U04;B01(B) | Absent by scope; policy unresolved; not diagnostic defect | G10 |
