# Documentation integrity and preservation

Executed results appear in verification.json. FILE_INVENTORY.json records the exact 18 deliverables, with its own digest omitted to avoid recursion.

Before writing, the repository and feature/echotrace branch, HEAD, full porcelain status, absent output path, protected hashes and selected Git metadata were checked and captured. All files in the four required prior package inventories were located and read, and their recorded digests matched where supplied. The REV-001 counts and 12 request statuses were checked against machine records. Both candidate SHA-256 values matched.

| Exact candidate file | Expected and observed SHA-256 |
|---|---|
| artifacts/asset-validation/case-001/controlled-combination-validation/candidate/CCV-C1a-C2a-B0-Original-960.png | d7a4bbb6c141b1c2b9d15c38591f16ff6bc4d80629cad0877ce05a43a2993945 |
| artifacts/asset-validation/case-001/controlled-combination-validation/candidate/CCV-C1a-C2a-B0-Changed-960.png | 4668c32059ec29c4b087f2efcd46f8e64d2829c042545228b6e2031df5cde7ba |

Final inline checks compare the protected raw hashes, outside inventory and status, captured Git metadata, exact candidates and source hashes. They check JSON, Markdown references, required file names, all bundle and asset IDs, untouched request states, the exact D05-B fields and operative decision and gate states. The baseline covers tracked and nonignored files plus selected Git metadata. No executable check file is delivered.

The review package contains documentation only. No owner-held evidence was supplied or reviewed. No external research, provider contact, downloads, collection, legal clearance, adoption, production or canonical change, artwork, RFS-001, T17/T18, commit or push occurred.

The initial final preservation recheck stopped on a variable-name collision in the inline checker after the earlier assertions passed. A corrected read-only recheck completed successfully and the report digest was refreshed.

[Executed checks](verification.json) · [Inventory](FILE_INVENTORY.json) · [Protected baseline and sources](source-manifest.json)
