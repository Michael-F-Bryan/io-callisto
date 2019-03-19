import Vector2D from "@/game/Vector2D";
import World from './World';

/**
 * Run our physics engine over every entity in the world.
 * @param world the world being updated.
 * @param deltaTime the number of seconds that have passed.
 */
export function updateWorld(world: World, deltaTime: number) {
    // TODO: Actually implement this...
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
export interface Physical {
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

/**
 * Orbital motion.
 */
export class Orbiting {
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
}

/**
 * A type guard for checking whether something implements the Physical 
 * interface.
 * 
 * @param item The item to check.
 */
export function IsPhysical(item: any): item is Physical {
    return item && item.physics instanceof Physics;
}