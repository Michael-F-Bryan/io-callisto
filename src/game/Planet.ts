import Vector2D from './Vector2D';
import { Physics, Physical } from './Physics';
import { Linear } from "./Linear";
import { Render, Renderable } from '@/game/Render';

/**
 * An immovable round body.
 */
export default class Planet implements Physical, Renderable {
    physics: Physics;
    render: Render;

    constructor(initialLocation: Vector2D, radius: number) {
        // our planet shouldn't move...
        const motion = new Linear();
        this.physics = new Physics(initialLocation, motion);
        this.render = new Render(radius);
    }
}
