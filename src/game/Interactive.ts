/**
 * Something which can be used by an interactive canvas.
 */
export default interface Interactive {
    /**
     * Render this object onto a canvas.
     * @param ctx The 2D drawing context.
     */
    render(ctx: CanvasRenderingContext2D): void;
    /**
     * Update the object's internal state.
     * @param deltaTime the number of seconds which have passed since the last
     * update call.
     */
    update(deltaTime: number): void;

    // optional event handlers

    /**
     * Optional callback fired whenever the mouse moves.
     * @param x the mouse's new x-coordinate.
     * @param y the mouse's new y-coordinate.
     */
    onMouseMove?(x: number, y: number): void;
    /**
     * Optional callback fired whenever the canvas moves.
     * @param width the new canvas width.
     * @param height the new canvas height.
     */
    onCanvasResize?(width: number, height: number): void;
}

/**
 * A type guard for checking whether an item implements the Interactive
 * interface for use with the InteractiveCanvas.
 *
 * @param item the item to check.
 */
export function IsInteractive(item: any): item is Interactive {
    return item && typeof item.render == "function" && typeof item.update == "function";
}
