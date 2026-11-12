# Root-cause assessment

**OBSERVED.** Current loopback connection failure is reproducible without Next.js. A live in-process IPv4 listener received zero requests. Node clients returned EACCES, PowerShell reported socket access forbidden, and curl failed both with default proxy behavior and explicit proxy bypass.

**SUPPORTED INFERENCE · Moderate confidence.** A restriction or isolation affecting loopback socket access in this Codex execution context is the leading explanation for the current blocker. Reproduction across client languages and child processes narrows the problem beyond a Next-specific fetch implementation. The absence of standard proxy variables and failure with curl proxy bypass reduce support for an environment-proxy explanation.

**UNKNOWN.** The enforcing mechanism could be the execution environment, Windows access controls or another network layer. The precise component is not identified. No firewall, Defender, VPN, proxy, registry or security-policy modification was attempted. The prior elevated self-test success is historical context and was not reproduced or used as authority for elevation.

**UNKNOWN.** The earlier later-stage Next.js timeout and the earlier FETCH_HEAD actor remain unresolved. No new FETCH_HEAD change occurred in this run. Starting another server or changing application code is not supported as a remedy by the current evidence.

Outcome is **PARTIALLY DIAGNOSED**. Meaningful diagnostics reproduced and narrowed the blocker, while the exact enforcement layer and Next startup behavior in a reachable context remain unverified.

[Evidence findings F01–F07 and D01–D08](diagnostic-results.json)
