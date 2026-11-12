# Process and port lifecycle

**OBSERVED.** The diagnostic Node process created one response server on 127.0.0.1:52648. It stayed alive while all six client probes completed. The listener address, process/parent IDs, start/end timestamps, and zero accepted requests are captured in the structured record.

**OBSERVED.** server.close completed without error. Node then reported listening false. A second exclusive bind on the same address and port succeeded and was closed gracefully. That second bind tested port release and accepted no requests. The diagnostic process then exited normally. No process kill or forced cleanup was used.

**UNKNOWN.** Filtered netstat returned no row for port 52648, despite Node’s in-process listener state. Get-Process observed the Node PID. The unavailable CIM query and absent netstat row prevent an independent OS-level listener-owner confirmation. Process/network isolation is a possible explanation and remains an inference.

**NOT EXECUTED.** Next.js start, parent/child ownership, HTTP liveness and Next shutdown/lock lifecycle were gated out. No pre-existing server was terminated. No temporary source files or application cache writes were created by this mission.

[Server lifecycle and process records](diagnostic-results.json)
