var canvas;
var ctx;
var token;

function init() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    on_resize();
    token = requestAnimationFrame(animate);
}

function on_resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

var lastTick = new Date();

function animate() {
    const now = new Date();
    const dt = (now - lastTick) / 1000;

    lastTick = now;
    token = requestAnimationFrame(animate);
}

window.addEventListener("resize", on_resize);
window.addEventListener("load", init);