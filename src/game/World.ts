export default class World {
    lastTick = new Date();
    recentTickIntervals: number[] = [];

    render(ctx: CanvasRenderingContext2D) {
        this.pushTick();

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        const fps = Math.round(this.fps);
        ctx.fillText(`FPS: ${fps}`, 0, 0);
    }

    pushTick() {
        const now = new Date();
        const dt = (now.valueOf() - this.lastTick.valueOf()) / 1000;
        this.lastTick = now;

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