<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import World from "@/game/World";
import Interactive, { IsInteractive } from "@/game/Interactive";

@Component({})
export default class InteractiveCanvas extends Vue {
  token?: number;
  lastTick = new Date();
  @Prop({ required: true, validator: IsInteractive })
  world!: Interactive;

  mounted() {
    window.addEventListener("resize", this.onResize);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.token = requestAnimationFrame(this.animate);

    this.onResize();
  }

  beforeDestroy() {
    // make sure we remove any event listeners when this component
    // is destroyed

    window.removeEventListener("resize", this.onResize);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);

    if (this.token) {
      cancelAnimationFrame(this.token);
    }
  }

  onResize() {
    this.canvas.height = window.innerHeight - this.canvas.offsetTop;
    this.canvas.width = window.innerWidth;

    if (this.world.onCanvasResize) {
      this.world.onCanvasResize(this.canvas.width, this.canvas.height);
    }
  }

  onMouseMove(e: MouseEvent) {
    if (this.world.onMouseMove) {
      this.world.onMouseMove(e.x, e.y);
    }
  }

  animate() {
    const now = new Date();
    const dt = (now.valueOf() - this.lastTick.valueOf()) / 1000;
    this.$props.world.update(dt);

    const ctx = this.canvas.getContext("2d");
    this.$props.world.render(ctx);

    this.token = requestAnimationFrame(this.animate);
    this.lastTick = now;
  }

  get canvas(): HTMLCanvasElement {
    return this.$refs["canvas"] as HTMLCanvasElement;
  }
}
</script>

<style>
</style>
