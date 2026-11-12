# Loopback connectivity matrix

**OBSERVED.** One inline Node server bound exclusively to 127.0.0.1:52648, PID 34496. Node reported the listener active during all probes. The response handler would return HTTP 200 with ECHOTRACE_LOOPBACK_OK. It accepted zero requests.

| Client/context | HTTP result | Error or outcome | Duration |
| --- | --- | --- | --- |
| Node fetch · same Node process | No response | EACCES | 90 ms |
| Node http.get · same Node process | No response | EACCES | 85 ms |
| PowerShell Invoke-WebRequest · spawned PowerShell from Node, same Codex environment | No response | An attempt was made to access a socket in a way forbidden by its access permissions 127.0.0.1:52648 | 184 ms |
| Windows curl.exe · spawned curl from Node, same Codex environment | 000 | curl exit 7 / HTTP 000 | 62 ms |
| Node fetch · separate spawned Node process, same Codex environment | No response | EACCES | 29 ms |
| Windows curl.exe · spawned curl from Node, same Codex environment · proxy bypass | 000 | curl exit 7 / HTTP 000 | 50 ms |

**OBSERVED.** Same-process Node fetch and http.get, a separate Node process, PowerShell Invoke-WebRequest and curl were exercised in the current Codex environment. curl was also repeated with --noproxy *. Those comparisons did not escape the execution environment.

**NOT EXECUTED.** IPv6 HTTP and localhost HTTP comparisons were gated out because IPv4 had no successful client. DNS resolution alone establishes neither endpoint connectivity nor address preference for other clients. No hosts file change occurred.

EACCES and PowerShell’s socket access denial indicate permissions failure in those probes. curl exit 7 and status 000 report connection failure with no HTTP response. They do not identify the same low-level cause independently. No HTTP 500, ECONNREFUSED or ETIMEDOUT was reported in this controlled test.

[Probe records, exact child commands and same-process code descriptions](diagnostic-results.json)
