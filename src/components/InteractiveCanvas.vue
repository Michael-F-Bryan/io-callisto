<template>
    <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import World from "@/game/World";

@Component({
    props: {
        world: { type: World, required: true }
    }
})
export default class InteractiveCanvas extends Vue {
    token?: number;
    lastTick = new Date();

    mounted() {
        window.addEventListener("resize", this.onResize);
        this.token = requestAnimationFrame(this.animate);

        this.onResize();
    }

    beforeDestroy() {
        // make sure we remove any event listeners when this component
        // is destroyed

        window.removeEventListener("resize", this.onResize);

        if (this.token) {
            cancelAnimationFrame(this.token);
        }
    }

    onResize() {
        this.canvas.height = window.innerHeight - this.canvas.offsetTop;
        this.canvas.width = window.innerWidth;
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
