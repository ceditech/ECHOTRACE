import * as Phaser from "phaser";
import type { ShellRuntime } from "./shell-lifecycle";
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

export function createShellRuntime(
  container: HTMLElement,
  onReady: () => void,
  emitIntent?: (intent: ObjectSelectionIntent) => BridgeResult,
): ProjectedShellRuntime {
  let destroyed = false;
  let projection: RendererProjection | undefined;
  let frame: Phaser.GameObjects.Rectangle | undefined;
  let heading: Phaser.GameObjects.Text | undefined;
  let caption: Phaser.GameObjects.Text | undefined;
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
