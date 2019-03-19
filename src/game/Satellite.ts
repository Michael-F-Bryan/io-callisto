import { Physics, Orbiting, Physical } from './Physics';
import { Renderable, Render } from './Render';

export default class Satellite implements Physical, Renderable {
    physics: Physics;
    render: Render;

    constructor(physics: Physics, render: Render) {
        this.physics = physics;
        this.render = render;
    }

    get orbitalData(): Orbiting {
        if (this.physics.motion instanceof Orbiting) {
            return this.physics.motion;
        } else {
            throw "All satellites should be orbiting something...";
        }
    }
}