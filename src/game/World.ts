import { updateWorld } from './Physics';

export default class World {
    recentTickIntervals: number[] = [];

    render(ctx: CanvasRenderingContext2D) {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.writeFPS(ctx);
    }

    update(deltaTime: number) {
        this.pushTick(deltaTime);
        updateWorld(this, deltaTime);
    }

    writeFPS(ctx: CanvasRenderingContext2D) {
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        const fps = Math.round(this.fps);
        ctx.fillText(`FPS: ${fps}`, 0, 0);
    }

    pushTick(dt: number) {
        this.recentTickIntervals.push(dt);
        while (this.recentTickIntervals.length > 60) {
            this.recentTickIntervals.shift();
        }
    }

    get fps(): number {
        if (this.recentTickIntervals.length == 0) {
            return 0;
        } else {
            const total = this.recentTickIntervals.reduce((acc, elem) => acc + elem.valueOf(), 0);
            return this.recentTickIntervals.length / total;
        }
    }
}