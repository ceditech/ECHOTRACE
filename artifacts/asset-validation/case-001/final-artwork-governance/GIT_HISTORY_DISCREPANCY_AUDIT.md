# Read-only Git history discrepancy audit

EV17/EV18. HEAD `e2c37758e7798ce610b4a460c1a192950a988833`; branch `feature/echotrace`. Initial status clean. No Git mutation/fetch/pull/push or history repair performed. Commands used: log/show/diff-tree/ls-tree/reflog/for-each-ref/rev-parse/rev-list and read-only ls-remote. Actor identities are not inferred from commit metadata.

| Package | First local introduction | Recorded author time | Recorded commit time | Files in tree | Task-start HEAD | Introduction parent equals task-start HEAD? |
|---|---|---|---|---|---|---|
| VAR-001 | 1c7508fa6876988028226338029480c6e39a164d | 2026-11-10T01:28:00-06:00 | 2026-11-10T01:28:00-06:00 | 24 | 704d5c48ca311c051d178125fdd9d5c107baf04d | True |
| VCS-001 | c3db9a1b08230bb041219e1f2742c3bcefc3cccd | 2026-11-10T01:42:05-06:00 | 2026-11-10T01:42:05-06:00 | 132 | 1c7508fa6876988028226338029480c6e39a164d | True |
| CCV-001 | e2c37758e7798ce610b4a460c1a192950a988833 | 2026-11-10T01:55:02-06:00 | 2026-11-10T01:55:02-06:00 | 46 | c3db9a1b08230bb041219e1f2742c3bcefc3cccd | True |

All introduction changes for these directories are additions:24 VAR,132 VCS,46 CCV. Their complete packages are present in those local trees and current HEAD includes them. Recorded timestamps are metadata, not independent wall-clock or operator authentication. Each recorded task-start HEAD equals the later introduction commit's parent. That establishes ordering of the snapshots, not who performed the later operation or the precise completion time.

Local remote-tracking reflog entries:

| Package | Recorded tracking-ref entry |
|---|---|
| VAR-001 | 1c7508fa6876988028226338029480c6e39a164d refs/remotes/origin/feature/echotrace@{2026-11-10T01:28:08-06:00} update by push |
| VCS-001 | c3db9a1b08230bb041219e1f2742c3bcefc3cccd refs/remotes/origin/feature/echotrace@{2026-11-10T01:42:18-06:00} update by push |
| CCV-001 | e2c37758e7798ce610b4a460c1a192950a988833 refs/remotes/origin/feature/echotrace@{2026-11-10T01:55:13-06:00} update by push |

These explicitly report update by push, stronger evidence than mere local file presence. They remain local metadata, not authenticated service logs identifying an agent or human. Local branch and origin/feature/echotrace point to the same HEAD; ahead/behind0/0 describes that local tracking relationship only.

At 2026-11-10T08:00:20.237501+00:00 the read-only command `git -c credential.helper= -c core.askPass= ls-remote --heads origin feature/echotrace` successfully advertised `e2c37758e7798ce610b4a460c1a192950a988833 refs/heads/feature/echotrace`. No fetch/ref update or persistent configuration change. This confirms the advertised remote commit at that observation time, not continuous future availability. Both exact CCV PNG blobs were also read IN MEMORY from local HEAD and matched required SHA-256 values. The local artifact tree is therefore bound to the advertised commit; remote blobs were not individually downloaded or visually inspected.

Discrepancy and limits:

- Current owner request §14 reports “Committed. Pushed.” completion wording. Exact alleged message artifacts/authenticated prior tool logs are not supplied as repository records, so attribution cannot be established here.
- VAR/VCS/CCV verification reports state no commit/push commands within their respective tasks. Those task-scoped statements do not assert that no later operator could ever commit the files.
- Current evidence confirms local commits, tracking-ref push records and matching remote advertisement. A blanket “these artifacts have never been committed/pushed” claim would conflict with it.
- Later history alone does not disprove the narrower no-within-task-command statements, identify who acted, or establish an AI agent performed a push. Later owner/client/other action is a possible explanation, not a selected fact. Exact message and operation logs are needed for actor-level reconciliation.

Do not rewrite prior reports, assume owner authorization from existing commits, or repair history. This audit grants no Git operation. If attribution is required, review the exact message surfaces and appropriate authenticated operation logs under a separate read-only scope.

[Structured Git observations](git-history-audit.json), [remote advertisement](remote-advertisement.json), [scope](AUTHORIZATION_AND_SCOPE.md).
