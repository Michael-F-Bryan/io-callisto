import { Linear, updateLinearMotion, updateOrbitalMotion, Orbiting } from '@/game/Physics';
import Vector2D from '@/game/Vector2D';
import Planet from '@/game/Planet';

describe('Linear motion', () => {
    it('Gives us a linear velocity of 0 when none is provided', () => {
        const motion = new Linear();
        expect(motion.velocity.x).toBe(0);
        expect(motion.velocity.y).toBe(0);
    })
    it('Can simulate two seconds of horizontal motion', () => {
        const motion = new Linear(new Vector2D(1, 0));
        const initialPosition = new Vector2D(500, 100);

        const newPosition = updateLinearMotion(initialPosition, motion, 2);

        expect(newPosition.y).toBe(initialPosition.y);
        expect(newPosition.x).toBe(initialPosition.x + 2 * motion.velocity.x);
    })
})

describe('Circular motion', () => {
    const parent = new Planet(new Vector2D(0, 0), 1);

    it("can orbit clockwise from 3 o'clock to 12 o'clock", () => {
        const radsPerSecond = 2 * Math.PI;
        const motion = new Orbiting(parent, radsPerSecond, 100, true);
        const initialPosition = new Vector2D(motion.radius, 0);

        const newPosition = updateOrbitalMotion(initialPosition, motion, 0.25);

        const expectedPosition = new Vector2D(0, motion.radius);
        expect(newPosition.x).toBeCloseTo(expectedPosition.x);
        expect(newPosition.y).toBeCloseTo(expectedPosition.y);
    })
})