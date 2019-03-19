import { Physics, HasPhysics, Orbiting } from './Physics';

export default class Satellite implements HasPhysics {
    physics: Physics;

    constructor(physics: Physics) {
        this.physics = physics;
    }

    get orbitalData(): Orbiting {
        if (this.physics.motion instanceof Orbiting) {
            return this.physics.motion;
        } else {
            throw "All satellites should be orbiting something...";
        }
    }
}