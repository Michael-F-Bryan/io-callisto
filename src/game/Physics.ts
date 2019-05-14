import Vector2D from "@/game/Vector2D";
import World from './World';

/**
 * Run our physics engine over every entity in the world.
 * @param world the world being updated.
 * @param deltaTime the number of seconds that have passed.
 */
export function updateWorld(world: World, deltaTime: number) {
    updatePhysicalObject(world.jupiter, deltaTime);
}

function updatePhysicalObject(entity: Physical, dt: number) {
    const p = entity.physics;

    const [newLocation, motion] = p.motion.nextState(p.currentLocation, dt);
    p.currentLocation = newLocation;
    p.motion = motion;
}

/**
 * The component of an object which dictates its physical location and behaviour 
 * in the world.
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

export interface Motion {
    /**
     * Get the object's new location and @type Motion.
     * @param currentLocation The object's current location in space.
     * @param dt the number of seconds since the last tick.
     */
    nextState(currentLocation: Vector2D, dt: number): [Vector2D, Motion];
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
