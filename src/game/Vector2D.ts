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

    public multiply(scaleFactor: number): Vector2D {
        return new Vector2D(this.x * scaleFactor, this.y * scaleFactor);
    }

    public add(other: Vector2D): Vector2D {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    sub(other: Vector2D): Vector2D {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }

    public toString(): string {
        const { x, y } = this;
        return `(${x}, ${y})`;
    }
}
