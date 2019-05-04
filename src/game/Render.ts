import World from "@/game/World";
import { Physics } from "@/game/Physics";

/**
 * Use the rendering system to render a world onto a canvas.
 * 
 * @param world The world to render.
 * @param ctx Context for the 2D canvas to be rendered on.
 */
export function renderWorld(world: World, ctx: CanvasRenderingContext2D) {
  for (const entity of world.Renderables()) {
    render(ctx, entity);
  }
}

function render(ctx: CanvasRenderingContext2D, item: Renderable) {
  const centre = item.physics.currentLocation;

  ctx.beginPath();
  ctx.arc(centre.x, centre.y, item.render.radius, 0, Math.PI * 2);
  ctx.fillStyle = item.render.fillColour;
  ctx.fill();
}

export interface Renderable {
  readonly render: Render;
  readonly physics: Physics;
}

export class Render {
  radius: number;
  fillColour: string;

  constructor(radius: number, fillColour: string = 'brown') {
    this.radius = radius;
    this.fillColour = fillColour;
  }
}

/**
 *  A type guard for checking whether something satisfies the Renderable 
 * interface.
 * 
 * @param item The item to check.
 */
export function IsRenderable(item: any): item is Renderable {
  return item && item.render instanceof Render && item.physics instanceof Physics;
}