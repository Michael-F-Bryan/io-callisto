import Vector2D from "@/game/Vector2D";
import { Motion } from './Physics';
export class Linear implements Motion {
    velocity: Vector2D;
    constructor(velocity?: Vector2D) {
        this.velocity = velocity || new Vector2D(0, 0);
    }
    nextState(currentLocation: Vector2D, dt: number): [Vector2D, Motion] {
        const delta = this.velocity.multiply(dt);
        const newLocation = currentLocation.add(delta);
        return [newLocation, this];
    }
}
