import Vector2D from './Vector2D';
import { Physics, Linear, HasPhysics } from './Physics';
import { Render } from '@/game/Render';

export default class Planet implements HasPhysics {
    physics: Physics;
    render: Render;

    constructor(initialLocation: Vector2D, radius: number) {
        // our planet shouldn't move...
        const motion = new Linear();
        this.physics = new Physics(initialLocation, motion);
        this.render = new Render(radius);
    }
}
