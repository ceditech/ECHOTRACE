import { describe, expect, it, vi } from "vitest";
import { mountShell } from "@/game/renderer/shell-lifecycle";
import type { ShellFactory } from "@/game/renderer/shell-lifecycle";

function setup() {
  const host = {};
  const runtime = { resize: vi.fn(), destroy: vi.fn() };
  const onReady = vi.fn();
  const onFailure = vi.fn();
  const disconnect = vi.fn();
  let ready = () => {};
  let resize = () => {};
  const factory = vi.fn((_host: object, callback: () => void) => {
    ready = callback;
    return runtime;
  });
  const observe = vi.fn((_host: object, callback: () => void) => {
    resize = callback;
    return disconnect;
  });
  const load = vi.fn(async () => factory);
  const mount = () => mountShell(host, load, observe, { onReady, onFailure });
  return {
    host,
    runtime,
    onReady,
    onFailure,
    disconnect,
    factory,
    observe,
    load,
    mount,
    ready: () => ready(),
    resize: () => resize(),
  };
}
async function flush() {
  await Promise.resolve();
  await Promise.resolve();
}

describe("T11 shell lifecycle", () => {
  it("creates one runtime, reports readiness and resizes without reconstructing", async () => {
    const test = setup();
    const cleanup = test.mount();
    await flush();
    expect(test.load).toHaveBeenCalledOnce();
    expect(test.factory).toHaveBeenCalledOnce();
    expect(test.factory).toHaveBeenCalledWith(test.host, expect.any(Function));
    test.ready();
    expect(test.onReady).toHaveBeenCalledOnce();
    test.resize();
    test.resize();
    expect(test.runtime.resize).toHaveBeenCalledTimes(3);
    expect(test.factory).toHaveBeenCalledOnce();
    cleanup();
    cleanup();
    expect(test.disconnect).toHaveBeenCalledOnce();
    expect(test.runtime.destroy).toHaveBeenCalledOnce();
    test.ready();
    test.resize();
    expect(test.onReady).toHaveBeenCalledOnce();
    expect(test.runtime.resize).toHaveBeenCalledTimes(3);
  });
  it("cancels an obsolete delayed load before construction or subscriptions", async () => {
    const test = setup();
    let resolve: ((factory: ShellFactory<object>) => void) | undefined;
    const loading = new Promise<ShellFactory<object>>((done) => {
      resolve = done;
    });
    const cleanup = mountShell(test.host, () => loading, test.observe, {
      onReady: test.onReady,
      onFailure: test.onFailure,
    });
    cleanup();
    resolve?.(test.factory);
    await flush();
    expect(test.factory).not.toHaveBeenCalled();
    expect(test.observe).not.toHaveBeenCalled();
    expect(test.onReady).not.toHaveBeenCalled();
    expect(test.onFailure).not.toHaveBeenCalled();
  });
  it("tolerates Strict Mode setup-cleanup-setup and later remounts", async () => {
    const test = setup();
    const obsolete = test.mount();
    obsolete();
    const active = test.mount();
    await flush();
    expect(test.factory).toHaveBeenCalledOnce();
    expect(test.observe).toHaveBeenCalledOnce();
    active();
    const next = test.mount();
    await flush();
    expect(test.factory).toHaveBeenCalledTimes(2);
    expect(test.runtime.destroy).toHaveBeenCalledOnce();
    next();
    expect(test.runtime.destroy).toHaveBeenCalledTimes(2);
    expect(test.disconnect).toHaveBeenCalledTimes(2);
  });
  it("reports import failure without constructing a runtime", async () => {
    const test = setup();
    const cause = new Error("load failed");
    const cleanup = mountShell(
      test.host,
      async () => {
        throw cause;
      },
      test.observe,
      { onReady: test.onReady, onFailure: test.onFailure },
    );
    await flush();
    expect(test.onFailure).toHaveBeenCalledWith({
      code: "runtime_load_failed",
      cause,
    });
    expect(test.observe).not.toHaveBeenCalled();
    cleanup();
  });
  it("reports construction failure and suppresses obsolete load errors", async () => {
    const test = setup();
    const cause = new Error("construction failed");
    mountShell(
      test.host,
      async () => () => {
        throw cause;
      },
      test.observe,
      { onReady: test.onReady, onFailure: test.onFailure },
    );
    await flush();
    expect(test.onFailure).toHaveBeenCalledWith({
      code: "runtime_initialization_failed",
      cause,
    });
    test.ready();
    expect(test.onReady).not.toHaveBeenCalled();
    test.onFailure.mockClear();
    const cleanup = mountShell(
      test.host,
      async () => {
        throw cause;
      },
      test.observe,
      { onReady: test.onReady, onFailure: test.onFailure },
    );
    cleanup();
    await flush();
    expect(test.onFailure).not.toHaveBeenCalled();
  });
  it("destroys a constructed runtime if resize setup fails", async () => {
    const test = setup();
    const cause = new Error("observer unavailable");
    mountShell(
      test.host,
      test.load,
      () => {
        throw cause;
      },
      { onReady: test.onReady, onFailure: test.onFailure },
    );
    await flush();
    expect(test.runtime.destroy).toHaveBeenCalledOnce();
    expect(test.onFailure).toHaveBeenCalledWith({
      code: "runtime_initialization_failed",
      cause,
    });
    test.ready();
    expect(test.onReady).not.toHaveBeenCalled();
  });
});
