import { updateWorld } from '@/game/Physics';
import Planet from "@/game/Planet";
import Vector2D from "@/game/Vector2D";
import { renderWorld } from "@/game/Render";

/**
 * The entire game world.
 */
export default class World implements Interactive {
    recentTickIntervals: number[] = [];
    jupiter: Planet = new Planet(new Vector2D(100, 100), 50);

    render(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        renderWorld(this, ctx);
        this.writeFPS(ctx);
    }

    update(deltaTime: number) {
        this.pushTick(deltaTime);
        updateWorld(this, deltaTime);
    }

    private writeFPS(ctx: CanvasRenderingContext2D) {
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        const fps = Math.round(this.fps);
        ctx.fillText(`FPS: ${fps}`, 0, 0);
    }

    private pushTick(dt: number) {
        this.recentTickIntervals.push(dt);
        while (this.recentTickIntervals.length > 60) {
            this.recentTickIntervals.shift();
        }
    }

    get fps(): number {
        if (this.recentTickIntervals.length == 0) {
            return 0;
        } else {
            const total = this.recentTickIntervals.reduce((acc, elem) => acc + elem, 0);
            return this.recentTickIntervals.length / total;
        }
    }
}

/**
 * Something which can be used by an interactive canvas.
 */
export interface Interactive {
    /**
     * Render this object onto a canvas.
     * @param ctx The 2D drawing context.
     */
    render(ctx: CanvasRenderingContext2D): void;
    /**
     * Update the object's internal state.
     * @param deltaTime the number of seconds which have passed since the last
     * update call.
     */
    update(deltaTime: number): void;

    // optional event handlers

    /**
     * Optional callback fired whenever the mouse moves.
     * @param x the mouse's new x-coordinate.
     * @param y the mouse's new y-coordinate.
     */
    onMouseMove?(x: number, y: number): void;
    /**
     * Optional callback fired whenever the canvas moves.
     * @param width the new canvas width.
     * @param height the new canvas height.
     */
    onCanvasResize?(width: number, height: number): void;
}

/**
 * A type guard for checking whether an item implements the Interactive 
 * interface for use with the InteractiveCanvas.
 * 
 * @param item the item to check.
 */
export function IsInteractive(item: any): item is Interactive {
    return item && typeof item.render == "function" && typeof item.update == "function";
}
