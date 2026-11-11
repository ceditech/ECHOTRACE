import { EventEmitter } from "node:events";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createShellRuntime } from "@/game/renderer/phaser-runtime";

const mock = vi.hoisted(() => ({
  rectangle: vi.fn(),
  text: vi.fn(),
  removeCanvas: vi.fn(),
  destroy: vi.fn(),
  startScene: () => {},
  renderFrame: () => {},
}));

vi.mock("phaser", () => ({
  CANVAS: 1,
  Core: { Events: { POST_RENDER: "postrender" } },
  Scale: { FIT: 1, CENTER_BOTH: 2 },
  Scene: class {
    add = { rectangle: mock.rectangle, text: mock.text };
  },
  Game: class {
    events = new EventEmitter();
    canvas = { remove: mock.removeCanvas, setAttribute: vi.fn() };
    destroy = mock.destroy;
    constructor({
      scene: Scene,
    }: {
      scene: new () => { game: unknown; create(): void };
    }) {
      const scene = new Scene();
      scene.game = this;
      mock.startScene = () => scene.create();
      mock.renderFrame = () => this.events.emit("postrender");
    }
  },
}));

function start() {
  const ready = vi.fn();
  const failed = vi.fn();
  const intent = vi.fn();
  const runtime = createShellRuntime({} as HTMLElement, ready, intent, {
    original: {
      sceneId: "original-scene",
      snapshot: "original",
      objects: [
        {
          objectId: "object-table",
          label: "table",
          position: { x: 0.25, y: 0.5 },
          size: { width: 0.5, height: 0.25 },
          rotationDegrees: 12,
        },
      ],
    },
    onFailure: failed,
  });
  return { runtime, ready, failed, intent };
}

describe("neutral Phaser shell lifecycle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const shape = {
      setStrokeStyle: vi.fn().mockReturnThis(),
      setAngle: vi.fn().mockReturnThis(),
      setOrigin: vi.fn().mockReturnThis(),
      setScale: vi.fn(),
      width: 50,
      height: 16,
    };
    mock.rectangle.mockReturnValue(shape);
    mock.text.mockReturnValue(shape);
  });

  it("maps normalized geometry and reports ready once after the rendered Original", () => {
    const { ready, failed, intent, runtime } = start();
    mock.startScene();
    expect(mock.rectangle).toHaveBeenNthCalledWith(
      2,
      240,
      270,
      480,
      135,
      0x344155,
    );
    expect(mock.text.mock.calls.map((call) => call[2])).toEqual([
      "table",
      "Original · Development representation",
    ]);
    expect(ready).not.toHaveBeenCalled();
    mock.renderFrame();
    mock.renderFrame();
    expect(ready).toHaveBeenCalledOnce();
    expect(failed).not.toHaveBeenCalled();
    expect(intent).not.toHaveBeenCalled();
    runtime.destroy();
  });

  it("removes a failed canvas before retry and suppresses late render callbacks on teardown", () => {
    const first = start();
    mock.rectangle.mockImplementationOnce(() => {
      throw new Error("cannot draw");
    });
    mock.startScene();
    expect(first.failed).toHaveBeenCalledOnce();
    first.runtime.destroy();
    expect(mock.removeCanvas).toHaveBeenCalledOnce();
    expect(mock.destroy).toHaveBeenCalledOnce();

    const retry = start();
    mock.startScene();
    const lateFrame = mock.renderFrame;
    retry.runtime.destroy();
    retry.runtime.destroy();
    lateFrame();
    expect(mock.removeCanvas).toHaveBeenCalledTimes(2);
    expect(mock.destroy).toHaveBeenCalledTimes(2);
    expect(retry.ready).not.toHaveBeenCalled();
    expect(first.ready).not.toHaveBeenCalled();
  });
});
