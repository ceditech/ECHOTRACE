# Browser test matrix

No actual browser name/version, viewport or DPR was measured. Chrome was detected as an installed executable. The local server prerequisite failed before launch. All rows below are **NOT EXECUTED** as browser procedures. BLOCKED identifies checks prevented by setup. BV-10 is NOT EXECUTED because no controlled browser failure injection could be reached.

| Test | Planned procedure | Expected | Actual/status |
| --- | --- | --- | --- |
| BV-01 · Briefing entry | Load /case. Inspect case content and Start. | Briefing available with no premature scene or countdown. | BLOCKED · No browser reached. |
| BV-02 · Start handoff | Activate Start and inspect available phase diagnostics. | Intro, renderer initialization and guarded activation. | BLOCKED · No browser reached. |
| BV-03 · Neutral Original rendering | Inspect canvas, labels and object representation. Capture screenshot and network evidence. | One visible development Original with no production image requests. | BLOCKED · No browser reached. |
| BV-04 · Renderer readiness | Inspect ready status after render using available diagnostics. | Active neutral Original. First-frame ordering independently observed only if exposed. | BLOCKED · No browser reached. |
| BV-05 · Desktop FIT | Inspect dimensions and screenshots at 1440×900, 1280×720 and 960×540. | Centered uniform 16:9, complete content and one canvas. | BLOCKED · No browser reached. |
| BV-06 · Mobile viewport FIT | Inspect 430×932, 390×844 and 320×640. | Uniform FIT, no horizontal overflow and usable controls. | BLOCKED · No browser reached. |
| BV-07 · Keyboard and focus | Tab to Start, activate with Enter and inspect focus/status/canvas behavior. | Native controls and status usable with no canvas focus trap. | BLOCKED · No browser reached. |
| BV-08 · Navigation and teardown | Navigate home, return and repeat. Inspect canvases and console. | Canvas removed and one canvas on return without persistent errors. | BLOCKED · No browser reached. |
| BV-09 · Resize behavior | Resize between the planned desktop and mobile dimensions. | Stable relative positions and one uniformly fitted canvas. | BLOCKED · No browser reached. |
| BV-10 · Recoverable failure/retry | Block an identified required renderer request, unblock and retry if safe. | Controlled failure followed by a fresh successful scene. | NOT EXECUTED · No browser reached. |
| BV-11 · Forbidden behavior | Inspect visible UI/network/storage during Original and after 25 seconds. | No timer, Changed, evidence, deduction, scoring, completion write or artwork. | BLOCKED · No browser reached. |

Each row’s environment, evidence class and limitation is also recorded in [browser-results.json](browser-results.json). [Server startup diagnostics](diagnostics/browser-and-server.json) and [resume/stop diagnostics](diagnostics/resume-stop.txt) support the blocked classification. T17-N01 reported automated results support only their existing test contracts and were not independently rerun here.
