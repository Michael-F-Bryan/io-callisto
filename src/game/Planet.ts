import Vector2D from './Vector2D';
import { Physics, Linear } from './Physics';

export default class Planet {
    physics: Physics;

    constructor(initialLocation: Vector2D) {
        // our planet shouldn't move...
        const motion = new Linear();
        this.physics = new Physics(initialLocation, motion);
    }
}