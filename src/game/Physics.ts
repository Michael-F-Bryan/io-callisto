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

    if (p.motion instanceof Orbiting) {
        p.currentLocation = updateOrbitalMotion(p.currentLocation, p.motion, dt);
    } else if (p.motion instanceof Linear) {
        p.currentLocation = updateLinearMotion(p.currentLocation, p.motion, dt);
    } else {
        throw "Well what type of motion is this then?!";
    }
}

export function updateOrbitalMotion(currentLocation: Vector2D, motion: Orbiting, dt: number): Vector2D {
    const parentLocation = motion.parent.physics.currentLocation;
    const angle = currentLocation.sub(parentLocation).angle;
    const newAngle = angle + motion.angularVelocity * dt;

    const dx = motion.radius * Math.cos(newAngle);
    const dy = motion.radius * Math.sin(newAngle);

    return new Vector2D(parentLocation.x + dx, parentLocation.y + dy);
}

export function updateLinearMotion(currentLocation: Vector2D, motion: Linear, dt: number): Vector2D {
    const delta = motion.velocity.multiply(dt);
    return currentLocation.add(delta);
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

/**
 * A type guard for checking whether something implements the Physical
 * interface.
 *
 * @param item The item to check.
 */
export function IsPhysical(item: any): item is Physical {
    return item && item.physics instanceof Physics;
}
