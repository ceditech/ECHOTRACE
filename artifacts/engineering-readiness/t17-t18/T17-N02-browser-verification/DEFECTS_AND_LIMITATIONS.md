# Defects and limitations

- **SETUP-01 · BLOCKER.** The browser workflow never reached the application. Restricted loopback access and a later startup wait timeout prevented BV execution. The recorded commands and Node/npm/OS details are in the structured results.
- **INTEGRITY-01 · OPEN EXCEPTION.** FETCH_HEAD SHA-256 changed from 1da3f02b83e0f3f8646398f3bf01de50aefd176b6d9f3a058e7865b87075fade to 7098fb46150a457ff8c1c6081f70efa5270e83e64f46a749f127ac51c9469d99. No fetch or Git mutation was issued by this mission. The actor and cause are unknown. HEAD, branch, refs and other sampled Git metadata matched. Testing stopped without repair.
- **EVIDENCE-01 · LIMITATION.** The final setup log, port and temporary-profile cleanup result were not persisted because its metadata assertion aborted the report-writing step. The visible failure and final process check were preserved in resume-stop.txt. No result is reconstructed from an assumed successful run.
- **Application defects · UNKNOWN.** No browser pass or application failure can be inferred from setup failure. Internal intro/active phases, first-frame ordering, stale callback rejection, progress effects and listener disposal were not observable. Prior mocked tests supply no new browser evidence.

Next owner decision is whether to authorize a fresh browser attempt with an accepted current metadata baseline after reviewing the exception. Keep the approved HEAD and protected source content. The new scope should permit local loopback access and resolve startup before browser checks. T17 remains incomplete, T18 unstarted and the roadmap stays 16/34.

[Structured integrity comparison](browser-results.json) · [Execution diagnostics](diagnostics/resume-stop.txt)
