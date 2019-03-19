import World from "@/game/World";
import { Physics } from "@/game/Physics";

export function renderWorld(world: World, ctx: CanvasRenderingContext2D) {
  render(ctx, world.jupiter);
}

function render(ctx: CanvasRenderingContext2D, item: Renderable) {
  const centre = item.physics.currentLocation;

  ctx.arc(centre.x, centre.y, item.render.radius, 0, Math.PI * 2);
  ctx.fillStyle = item.render.fillColour;
  ctx.fill();
}

export interface Renderable {
  readonly render: Render;
  readonly physics: Physics;
}

export class Render{
  radius: number;
  fillColour: string;

  constructor(radius: number, fillColour: string = 'brown') {
    this.radius = radius;
    this.fillColour = fillColour;
  }
}
