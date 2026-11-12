# Environment baseline

**OBSERVED.** The local baseline is 86973632a8bcb5fa0a77e6d89bd9e41fe31dd071 on feature/echotrace. Initial status was clean and the output directory was absent. The 825 non-ignored protected files comprise the prior 814-file baseline plus the 11 published T17-N02 reports. The eight T17-N01 hashes match. Initial HEAD, index, configuration and relevant ref/reflog metadata were captured read-only.

**OBSERVED.** Windows Windows 11 Pro build 10.0.26300, Node v22.18.0, npm 11.5.2 and installed Next.js 16.3.8. The current orchestrator PID was 34496 and its parent PID was 30872. Get-Process identified the node process. The targeted Win32_Process CIM command-line query returned access unavailable.

**OBSERVED.** HTTP_PROXY, HTTPS_PROXY, ALL_PROXY, NO_PROXY and lowercase variants, NODE_USE_ENV_PROXY and NODE_OPTIONS were absent in the current process. curl repeated the request with explicit proxy bypass and still failed. Node DNS lookup returned localhost addresses ::1 and 127.0.0.1.

**UNKNOWN.** WinHTTP proxy configuration could not be read. netsh.exe winhttp show proxy returned exit 1 with “The following command was not found.” No Windows proxy conclusion follows from that failure. No configuration was changed. OS-level listener ownership was not independently visible in the filtered netstat output.

Commands, exit codes, exact sanitized outputs and process contexts are recorded under baseline, commands and independent in [diagnostic-results.json](diagnostic-results.json). No unrelated environment variables or credentials were collected.
