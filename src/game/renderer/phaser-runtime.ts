import * as Phaser from "phaser";
import type { ShellRuntime } from "./shell-lifecycle";
import type { NeutralScene } from "../application/neutral-scene";
import type {
  BridgeResult,
  ObjectSelectionIntent,
  RendererProjection,
} from "../application/renderer-bridge";

export interface ProjectedShellRuntime extends ShellRuntime {
  applyProjection(projection: RendererProjection): void;
}

// Neutral shell dimensions, not an authored-case aspect-ratio requirement.
const WIDTH = 960;
const HEIGHT = 540;

function drawNeutralOriginal(
  scene: Phaser.Scene,
  original: NeutralScene<"original">,
) {
  scene.add
    .rectangle(WIDTH / 2, HEIGHT / 2, WIDTH - 2, HEIGHT - 2, 0x17202d)
    .setStrokeStyle(2, 0x94a3b8);
  for (const { position, size, rotationDegrees, label } of original.objects) {
    const x = position.x * WIDTH;
    const y = position.y * HEIGHT;
    const width = size.width * WIDTH;
    const height = size.height * HEIGHT;
    scene.add
      .rectangle(x, y, width, height, 0x344155)
      .setStrokeStyle(2, 0xb9c5d4)
      .setAngle(rotationDegrees);
    const text = scene.add
      .text(x, y, label, {
        fontFamily: "sans-serif",
        fontSize: "16px",
        color: "#f8fafc",
      })
      .setOrigin(0.5)
      .setAngle(rotationDegrees);
    text.setScale(
      Math.min(1, (width * 0.92) / text.width, (height * 0.9) / text.height),
    );
  }
  scene.add.text(16, 14, "Original · Development representation", {
    fontFamily: "sans-serif",
    fontSize: "17px",
    color: "#f8fafc",
    backgroundColor: "#17202d",
  });
}

export function createShellRuntime(
  container: HTMLElement,
  onReady: () => void,
  emitIntent?: (intent: ObjectSelectionIntent) => BridgeResult,
  observation?: {
    readonly original: NeutralScene<"original">;
    readonly onFailure: () => void;
  },
): ProjectedShellRuntime {
  let destroyed = false;
  let projection: RendererProjection | undefined;
  let frame: Phaser.GameObjects.Rectangle | undefined;
  let heading: Phaser.GameObjects.Text | undefined;
  let caption: Phaser.GameObjects.Text | undefined;
  const reportRendered = () => {
    if (!destroyed) onReady();
  };
  const renderProjection = () => {
    if (destroyed || !projection || !frame || !heading || !caption) return;
    heading.setText(projection.target?.label ?? "EchoTrace");
    caption.setText(
      `${projection.displayPhase} · revision ${projection.revision}`,
    );
    frame.setFillStyle(projection.target?.highlighted ? 0x164e63 : 0x0f172a);
    if (projection.interactionEnabled && projection.target)
      frame.setInteractive();
    else frame.disableInteractive();
  };
  class ShellScene extends Phaser.Scene {
    constructor() {
      super("echotrace-shell");
    }
    create() {
      if (destroyed) return;
      this.game.canvas.setAttribute("aria-hidden", "true");
      if (observation) {
        try {
          drawNeutralOriginal(this, observation.original);
          // Scene construction alone does not mean the canvas has presented a frame.
          this.game.events.once(Phaser.Core.Events.POST_RENDER, reportRendered);
        } catch {
          observation.onFailure();
        }
        return;
      }
      frame = this.add
        .rectangle(WIDTH / 2, HEIGHT / 2, WIDTH - 80, HEIGHT - 80, 0x0f172a)
        .setStrokeStyle(2, 0x64748b);
      frame.on("pointerdown", () => {
        if (destroyed || !projection?.interactionEnabled || !projection.target)
          return;
        emitIntent?.({
          type: "object_selected",
          attemptId: projection.attemptId,
          projectionRevision: projection.revision,
          objectId: projection.target.objectId,
        });
      });
      heading = this.add
        .text(WIDTH / 2, HEIGHT / 2 - 28, "EchoTrace", {
          fontFamily: "sans-serif",
          fontSize: "48px",
          color: "#f8fafc",
        })
        .setOrigin(0.5);
      caption = this.add
        .text(WIDTH / 2, HEIGHT / 2 + 35, "Observe. Remember. Deduce.", {
          fontFamily: "sans-serif",
          fontSize: "24px",
          color: "#cbd5e1",
        })
        .setOrigin(0.5);
      renderProjection();
      onReady();
    }
  }
  const game = new Phaser.Game({
    type: Phaser.CANVAS,
    parent: container,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: "#020617",
    banner: false,
    audio: { noAudio: true },
    input: { keyboard: false, mouse: true, touch: true, gamepad: false },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: ShellScene,
  });
  return {
    applyProjection(next) {
      if (destroyed) return;
      projection = next;
      renderProjection();
    },
    resize() {
      if (!destroyed && game.isBooted) {
        game.scale.getParentBounds();
        game.scale.refresh();
      }
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      game.events.off(Phaser.Core.Events.POST_RENDER, reportRendered);
      projection = undefined;
      frame?.removeAllListeners();
      frame = undefined;
      heading = undefined;
      caption = undefined;
      // Phaser destroys systems on its next frame; detach the owned canvas immediately.
      game.canvas?.remove();
      game.destroy(true, false);
    },
  };
}
