(function(t){function e(e){for(var i,a,s=e[0],c=e[1],u=e[2],l=0,f=[];l<s.length;l++)a=s[l],r[a]&&f.push(r[a][0]),r[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);h&&h(e);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(i=!1)}i&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},r={app:0},o=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/io-callisto/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var h=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"034f":function(t,e,n){"use strict";var i=n("64a9"),r=n.n(i);r.a},"64a9":function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("h1",[t._v("Io-Callisto")]),n("InteractiveCanvas",{attrs:{world:t.world}})],1)},o=[],a=n("d225"),s=n("308d"),c=n("6bb5"),u=n("4e2b"),h=n("9ab4"),l=n("60a3"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("canvas",{ref:"canvas"})},v=[],d=n("b0b4"),p=(n("c7c6"),function(){function t(e,n){Object(a["a"])(this,t),this.x=e,this.y=n}return Object(d["a"])(t,[{key:"length",get:function(){return Math.hypot(this.x,this.y)}},{key:"angle",get:function(){return Math.atan2(this.y,this.x)}}],[{key:"FromRTheta",value:function(e,n){return new t(e*Math.cos(n),e*Math.sin(n))}}]),t}());function b(t,e){w(t.jupiter,e)}function w(t,e){var n=t.physics;if(n.motion instanceof k)n.currentLocation=y(n.currentLocation,n.motion,e);else{if(!(n.motion instanceof j))throw"Well what type of motion is this then?!";n.currentLocation=O(n.currentLocation,n.motion,e)}}function y(t,e,n){throw"TODO: Implement This"}function O(t,e,n){throw"TODO: Implement This"}var m=function t(e,n){Object(a["a"])(this,t),this.currentLocation=e,this.motion=n},j=function t(e){Object(a["a"])(this,t),this.velocity=e||new p(0,0)},k=function t(e,n,i){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];Object(a["a"])(this,t),this.parent=e,this.angularVelocity=n,this.radius=i,this.isAntiClockwise=r};n("6c7b");function g(t,e){T(e,t.jupiter)}function T(t,e){var n=e.physics.currentLocation;t.arc(n.x,n.y,e.render.radius,0,2*Math.PI),t.fillStyle=e.render.fillColour,t.fill()}var M=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"brown";Object(a["a"])(this,t),this.radius=e,this.fillColour=n};var x=function t(e,n){Object(a["a"])(this,t);var i=new j;this.physics=new m(e,i),this.render=new M(n)},I=function(){function t(){Object(a["a"])(this,t),this.recentTickIntervals=[],this.jupiter=new x(new p(100,100),50)}return Object(d["a"])(t,[{key:"render",value:function(t){t.clearRect(0,0,t.canvas.width,t.canvas.height),g(this,t),this.writeFPS(t)}},{key:"update",value:function(t){this.pushTick(t),b(this,t)}},{key:"writeFPS",value:function(t){t.textAlign="left",t.textBaseline="top";var e=Math.round(this.fps);t.fillText("FPS: ".concat(e),0,0)}},{key:"pushTick",value:function(t){this.recentTickIntervals.push(t);while(this.recentTickIntervals.length>60)this.recentTickIntervals.shift()}},{key:"fps",get:function(){if(0==this.recentTickIntervals.length)return 0;var t=this.recentTickIntervals.reduce(function(t,e){return t+e},0);return this.recentTickIntervals.length/t}}]),t}();function _(t){return t&&"function"==typeof t.render&&"function"==typeof t.update}var L=function(t){function e(){var t;return Object(a["a"])(this,e),t=Object(s["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.lastTick=new Date,t}return Object(u["a"])(e,t),Object(d["a"])(e,[{key:"mounted",value:function(){window.addEventListener("resize",this.onResize),this.canvas.addEventListener("mousemove",this.onMouseMove),this.token=requestAnimationFrame(this.animate),this.onResize()}},{key:"beforeDestroy",value:function(){window.removeEventListener("resize",this.onResize),this.canvas.removeEventListener("mousemove",this.onMouseMove),this.token&&cancelAnimationFrame(this.token)}},{key:"onResize",value:function(){this.canvas.height=window.innerHeight-this.canvas.offsetTop,this.canvas.width=window.innerWidth,this.world.onCanvasResize&&this.world.onCanvasResize(this.canvas.height,this.canvas.width)}},{key:"onMouseMove",value:function(t){this.world.onMouseMove&&this.world.onMouseMove(t.x,t.y)}},{key:"animate",value:function(){var t=new Date,e=(t.valueOf()-this.lastTick.valueOf())/1e3;this.$props.world.update(e);var n=this.canvas.getContext("2d");this.$props.world.render(n),this.token=requestAnimationFrame(this.animate),this.lastTick=t}},{key:"canvas",get:function(){return this.$refs["canvas"]}}]),e}(l["c"]);h["a"]([Object(l["b"])({required:!0,validator:_})],L.prototype,"world",void 0),L=h["a"]([Object(l["a"])({})],L);var P=L,C=P,S=n("2877"),z=Object(S["a"])(C,f,v,!1,null,null,null),R=z.exports,F=function(t){function e(){var t;return Object(a["a"])(this,e),t=Object(s["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.world=new I,t}return Object(u["a"])(e,t),e}(l["c"]);F=h["a"]([Object(l["a"])({components:{InteractiveCanvas:R}})],F);var E=F,$=E,A=(n("034f"),Object(S["a"])($,r,o,!1,null,null,null)),D=A.exports;i["default"].config.productionTip=!1,new i["default"]({render:function(t){return t(D)}}).$mount("#app")}});
//# sourceMappingURL=app.6affe486.js.map