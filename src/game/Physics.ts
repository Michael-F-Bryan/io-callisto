import Vector2D from "@/game/Vector2D";
import World from './World';

/**
 * Run our physics engine over every entity in the world.
 * @param world the world being updated.
 * @param deltaTime the number of seconds that have passed.
 */
export function updateWorld(world: World, deltaTime: number) {

}

/**
 * The component of an object which dictates its physical location in the world.
 */
export class Physics {
    currentLocation: Vector2D;
    motion: Motion;

    constructor(currentLocation: Vector2D, motion: Motion) {
        this.currentLocation = currentLocation;
        this.motion = motion;
    }
}

/**
 * Something which has a Physics component to it.
 */
export interface HasPhysics {
    readonly physics: Physics;
}

/**
 * The type of motion an object may exhibit.
 */
export type Motion = Orbiting | Linear;

export class Linear {
    velocity: Vector2D;

    constructor(velocity?: Vector2D) {
        this.velocity = velocity || new Vector2D(0, 0);
    }
}

export class Orbiting {
    parent: HasPhysics;
    angularVelocity: number;
    isAntiClockwise: boolean;
    radius: number;
    eccentricity: number;

    constructor(parent: HasPhysics, angularVelocity: number, radius: number, isAntiClockwise: boolean = false, eccentricity: number = 1.0) {
        this.parent = parent;
        this.angularVelocity = angularVelocity;
        this.radius = radius;
        this.isAntiClockwise = isAntiClockwise;
        this.eccentricity = eccentricity;
    }
}
