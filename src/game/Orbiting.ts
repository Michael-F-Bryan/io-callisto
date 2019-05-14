import Vector2D from "@/game/Vector2D";
import { Motion, Physical } from './Physics';
/**
 * Orbital motion.
 */
export class Orbiting implements Motion {
    /**
     * The object this entity is orbiting around.
     */
    parent: Physical;
    angularVelocity: number;
    isAntiClockwise: boolean;
    radius: number;
    constructor(parent: Physical, angularVelocity: number, radius: number, isAntiClockwise: boolean = false) {
        this.parent = parent;
        this.angularVelocity = angularVelocity;
        this.radius = radius;
        this.isAntiClockwise = isAntiClockwise;
    }
    nextState(currentLocation: Vector2D, dt: number): [Vector2D, Motion] {
        const parentLocation = this.parent.physics.currentLocation;
        const angle = currentLocation.sub(parentLocation).angle;
        const newAngle = angle + this.angularVelocity * dt;
        const dx = this.radius * Math.cos(newAngle);
        const dy = this.radius * Math.sin(newAngle);
        const newLocation = new Vector2D(parentLocation.x + dx, parentLocation.y + dy);
        return [newLocation, this];
    }
}
