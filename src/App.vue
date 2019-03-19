<template>
    <div id="app">
        <h1>Io-Callisto</h1>
        <InteractiveCanvas :world="world"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InteractiveCanvas from './components/InteractiveCanvas.vue';
import World from "@/game/World";

@Component({
    components: {
        InteractiveCanvas,
    },
})
export default class App extends Vue {
    world = new World();
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

body,
html {
    margin: 0;
    overflow: hidden;
}
</style>
