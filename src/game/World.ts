import { updateWorld, Physical, Physics, Orbiting } from '@/game/Physics';
import Planet from "@/game/Planet";
import Vector2D from "@/game/Vector2D";
import { renderWorld, Render, Renderable } from "@/game/Render";
import Interactive from './Interactive';
import Satellite from './Satellite';

/**
 * The entire game world.
 */
export default class World implements Interactive {
    recentTickIntervals: number[] = [];
    jupiter: Planet;
    moon: Planet;

    constructor() {
        this.jupiter = new Planet(new Vector2D(100, 100), 50);

        const physics = new Physics(new Vector2D(150, 200), new Orbiting(this.jupiter, 1, 150));
        this.moon = new Satellite(physics, new Render(20, 'green'));
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

    public onCanvasResize(width: number, height: number): void {
        this.jupiter.physics.currentLocation = new Vector2D(width / 2, height / 2);
    }

    public PhysicalObjects(): Physical[] {
        return [this.jupiter, this.moon];
    }

    public Renderables(): Renderable[] {
        return [this.jupiter, this.moon];
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
