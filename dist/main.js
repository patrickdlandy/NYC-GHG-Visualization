!function(t){var n={};function e(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(r,a,function(n){return t[n]}.bind(null,a));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/dist/",e(e.s=0)}([function(t,n){document.addEventListener("DOMContentLoaded",(function(){}));var e=d3.arc().startAngle((function(t){return t.x0})).endAngle((function(t){return t.x1})).padAngle((function(t){return Math.min((t.x1-t.x0)/2,.005)})).padRadius((function(){return 932/9*1.5})).innerRadius((function(t){return t.y0*(932/9)})).outerRadius((function(t){return Math.max(t.y0*(932/9),t.y1*(932/9)-1)}));d3.json("/data/diet_data.json").then((function(t){return t})).then((function(t){var n=function(t){var n=d3.hierarchy(t).sum((function(t){return console.log(t),t.value})).sort((function(t,n){return n.value-t.value}));return d3.partition().size([2*Math.PI,n.height+1])(n)}(t);n.each((function(t){t.current=t}));var r=[],a=[],u={};n.descendants().forEach((function(t){-1===a.indexOf(t.height)&&(a.push(t.height),u[t.height]=[]),-1===r.indexOf(t.data.name)&&(r.push(t.data.name),u[t.height].push(t.data.name))}));var o={};a.forEach((function(t){o[t]=d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,u[t].length+1))}));a.forEach((function(t){}));d3.select("#chart").style("width","100%").style("height","auto").style("font","10px sans-serif").append("g").attr("transform","translate(".concat(466,", ").concat(466,")")).append("g").selectAll("path").data(n.descendants()).join("path").attr("fill",(function(t){return o[t.height](u[t.height].indexOf(t.data.name))})).attr("fill-opacity",1).attr("d",(function(t){return e(t.current)}))}))}]);
//# sourceMappingURL=main.js.map