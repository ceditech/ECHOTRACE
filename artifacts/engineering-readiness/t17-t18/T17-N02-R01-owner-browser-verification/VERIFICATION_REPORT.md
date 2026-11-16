# Verification report

**Documentation integrity PASS. Browser result FAIL for BV-03 and BV-05.**

Preflight confirmed the expected root, feature/echotrace and HEAD e9ae3547ff91472fa836a3b9e35b45e5b3139c16. No commits followed the known ED01 baseline and initial status was clean. The R01 directory was initially absent. The full raw-hash baseline contains 836 pre-existing non-ignored files. It also verified the prior ED01 protected baseline and inventory.

All 836 files and all eight T17-N01 files remained byte-identical. Canonical Case 001, frozen dossier, prior QA, governance, source/tests, package and lockfiles matched. Both exact CCV hashes matched before and after:

- CCV-C1a-C2a-B0-Original-960.png · d7a4bbb6c141b1c2b9d15c38591f16ff6bc4d80629cad0877ce05a43a2993945
- CCV-C1a-C2a-B0-Changed-960.png · 4668c32059ec29c4b087f2efcd46f8e64d2829c042545228b6e2031df5cde7ba

HEAD, branch and refs remained unchanged. Sampled metadata hash changes are recorded in browser-results.json. FETCH_HEAD was captured before and after without modification. The historical integrity records were preserved. Codex issued no staging, fetch, commit, push or other intentional Git mutation.

This run used the reconnected Chrome interface against the owner’s existing server at 127.0.0.1:53949. No shell networking, server startup, privilege escalation, new automation script, dependency installation, source/test change or repair was performed. The temporary favicon tab was closed, viewport override reset, and owner tab/server retained.

Ignored generated samples changed during browser requests as follows: .next/dev/trace, .next/dev/logs/next-development.log. The development lock was already present and its hash was inaccessible due to sharing restrictions. Ignored cache writes were not fully enumerated. No ignored generated file was manually edited.

The package contains the 11 required documents, nine genuine browser JPEG captures and one sanitized console JSON log. Browser screenshots were preserved as returned, with raster dimensions recorded. The older owner screenshots were not supplied, archived or hashed.

JSON documents parse, Markdown links resolve, screenshot headers/dimensions and SHA-256 values were checked, and inventory hashes match. Only paths in this R01 directory were added. The inventory omits its own digest. Final Git status consists only of the R01 output directory.

T17 remains incomplete, T18 unstarted and roadmap completion remains 16/34. No artwork adoption, RFS-001, governance change, provenance reopening or implementation occurred.

[Structured results and integrity baseline](browser-results.json) · [Inventory](FILE_INVENTORY.json)
