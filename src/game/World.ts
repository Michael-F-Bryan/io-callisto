import { updateWorld, Linear } from '@/game/Physics';
import Planet from "@/game/Planet";
import Vector2D from "@/game/Vector2D";
import { renderWorld } from "@/game/Render";
import Interactive from './Interactive';

/**
 * The entire game world.
 */
export default class World implements Interactive {
    recentTickIntervals: number[] = [];
    jupiter: Planet;

    constructor() {
        this.jupiter = new Planet(new Vector2D(100, 100), 50);
        //this.jupiter.physics.motion = new Linear(new Vector2D(10, 50));
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        renderWorld(this, ctx);
        this.writeFPS(ctx);
    }

    public update(deltaTime: number) {
        this.pushTick(deltaTime);
        updateWorld(this, deltaTime);
    }

    onCanvasResize(width: number, height: number): void {
        this.jupiter.physics.currentLocation = new Vector2D(width / 2, height / 2);
        console.log(this.jupiter.physics);
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
