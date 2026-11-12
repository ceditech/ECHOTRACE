# Failure, retry and lifecycle

**Environment setup failed before application testing.** Next.js reported ready on port 53947, but the restricted local connection returned EACCES. A second attempt encountered the first mission server still holding the development lock. PID 53692 was explicitly identified and stopped. A subsequent elevated loopback self-test succeeded. The final setup attempt still timed out waiting for the app server. These observations establish setup failures and supply no application retry result.

BV-10 is **NOT EXECUTED — CONTROLLED FAILURE INJECTION UNAVAILABLE** in this run. No required request was blocked, no source was changed and no internal state was injected. BV-08 navigation, canvas removal and listener disposal are likewise unverified.

The final attempt’s cleanup ran before its integrity assertion. A final process query found no matching ECHOTRACE Next development process, and .next/dev/lock was absent. Browser launch never occurred, and the temporary profiles from the earlier setup attempts were removed. The final profile removal was attempted but its result was not persisted before the assertion stopped reporting. No existing browser profile was used. A complete inventory of temporary files outside the repository was not captured.

[Startup evidence](diagnostics/browser-and-server.json) · [Final setup and cleanup observations](diagnostics/resume-stop.txt)
