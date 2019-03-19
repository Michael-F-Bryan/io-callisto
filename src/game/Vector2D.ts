/**
 * Your standard 2D vector class.
 */
export default class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static FromRTheta(radius: number, angle: number): Vector2D {
        return new Vector2D(radius * Math.cos(angle), radius * Math.sin(angle));
    }

    get length(): number {
        return Math.hypot(this.x, this.y);
    }

    get angle(): number {
        return Math.atan2(this.y, this.x);
    }
}
