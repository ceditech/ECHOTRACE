# Regression test results

| Check | Actual result |
| --- | --- |
| Two new regressions before correction | Both failed as expected. Four existing focused tests passed. |
| Focused unit and relevant integration tests after correction | 38 passed across six files. |
| First full Vitest run | 231 passed, one existing quality-scope timeout while checking ESLint ignores. |
| Unchanged full-suite rerun | 232 passed across 22 files. No test weakening or timeout change. |
| TypeScript | Main and domain checks passed. |
| Changed-file ESLint | Passed with zero warnings. |
| Changed-file formatting | Passed. |
| Diff whitespace check | Passed. |
| Production build | Passed, including compilation, TypeScript and static generation. |

The first full-run timeout is retained as an execution limitation. Its cause was not established and no related test/source change was made. The unchanged rerun passed. Repository-wide formatting was not rerun, and no historical artifact was reformatted.

Exact commands, exit codes and the protected source hashes are in [check-results.json](diagnostics/check-results.json). Browser layout measurements independently verify the compact-height result. The SSR test alone establishes only rule scoping.
