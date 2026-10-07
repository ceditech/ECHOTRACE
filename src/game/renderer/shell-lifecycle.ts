export interface ShellRuntime {
  resize(): void;
  destroy(): void;
}
export interface ShellFailure {
  readonly code: "runtime_load_failed" | "runtime_initialization_failed";
  readonly cause: unknown;
}
export interface ShellCallbacks<Runtime extends ShellRuntime = ShellRuntime> {
  readonly onReady: () => void;
  readonly onFailure: (failure: ShellFailure) => void;
  readonly onRuntime?: (runtime: Runtime) => void;
}
export type ShellFactory<
  Container,
  Runtime extends ShellRuntime = ShellRuntime,
> = (container: Container, onReady: () => void) => Runtime;

// One invocation owns one mount generation; cleanup invalidates every asynchronous callback.
export function mountShell<
  Container,
  Runtime extends ShellRuntime = ShellRuntime,
>(
  container: Container,
  load: () => Promise<ShellFactory<Container, Runtime>>,
  observeResize: (container: Container, resize: () => void) => () => void,
  callbacks: ShellCallbacks<Runtime>,
): () => void {
  let cancelled = false;
  let runtime: Runtime | undefined;
  let disconnect: (() => void) | undefined;
  const dispose = () => {
    disconnect?.();
    disconnect = undefined;
    runtime?.destroy();
    runtime = undefined;
  };
  void (async () => {
    let factory: ShellFactory<Container, Runtime>;
    try {
      factory = await load();
    } catch (cause) {
      if (!cancelled)
        callbacks.onFailure({ code: "runtime_load_failed", cause });
      return;
    }
    if (cancelled) return;
    try {
      runtime = factory(container, () => {
        if (!cancelled) callbacks.onReady();
      });
      disconnect = observeResize(container, () => {
        if (!cancelled) runtime?.resize();
      });
      runtime.resize();
      callbacks.onRuntime?.(runtime);
    } catch (cause) {
      cancelled = true;
      dispose();
      callbacks.onFailure({ code: "runtime_initialization_failed", cause });
    }
  })();
  return () => {
    if (cancelled) return;
    cancelled = true;
    dispose();
  };
}
