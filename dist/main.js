/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// document.addEventListener("DOMContentLoaded", () => {
// })
//everything is bundled into main.js by webpack and we just include a link to "main"
//My D3 Code here:
var format = d3.format(",d"); //some constants for dimensions:

var width = 932;
var height = 932;
var radius = width / 9; //arc function

var arc = d3.arc().startAngle(function (d) {
  return d.x0;
}).endAngle(function (d) {
  return d.x1;
}).padAngle(function (d) {
  return Math.min((d.x1 - d.x0) / 2, 0.005);
}).padRadius(function () {
  return radius * 1.5;
}).innerRadius(function (d) {
  // return 3;
  return d.y0 * radius;
}).outerRadius(function (d) {
  return Math.max(d.y0 * radius, d.y1 * radius - 1);
}); //partition function

var partition = function partition(data) {
  var root = d3.hierarchy(data).sum(function (d) {
    //this only sums the leaves, which have a value attribute
    // console.log(d);
    return d.value;
  }).sort(function (a, b) {
    return b.value - a.value;
  }); // console.log(root);

  return d3.partition().size([2 * Math.PI, root.height + 1])(root);
}; //I get my json data into an object in this function:


var dataset = d3.json('./data/diet_data.json').then(function (data) {
  return data;
});
dataset.then(function (data) {
  // console.log(data)
  //All code to do visualization goes inside of this callback
  //generate root 
  var root = partition(data); //console.log(root.descendants());
  //set current attribute

  root.each(function (d) {
    d.current = d;
  }); //console.log(root.descendants());
  //color (OLD)
  // const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,
  //   data.children.length + 1));
  // const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,
  //   names.length));
  //refactoring the color method

  var names = [];
  var heights = [];
  var names_by_height = {};
  root.descendants().forEach(function (d) {
    if (heights.indexOf(d.height) === -1) {
      heights.push(d.height);
      names_by_height[d.height] = [];
    }

    if (names.indexOf(d.data.name) === -1) {
      names.push(d.data.name);
      names_by_height[d.height].push(d.data.name);
    }
  }); // console.log(names);
  // console.log(heights);
  // console.log(names_by_height);
  //Interpolate the whole rainbow at each height in the heirarchy

  var colors = {};
  heights.forEach(function (h) {
    colors[h] = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, names_by_height[h].length + 1));
  }); //I also want to vary opacity by height

  var opacity_by_height = {};
  var opacity_min = .4;
  var opacity_max = 1;
  var steps = heights.length; // const opacities = d3.interpolateNumber(opacity_max, opacity_min);

  var opacities = d3.scaleOrdinal().domain(heights).range(d3.range(opacity_max, opacity_min, -1 * (opacity_max - opacity_min) / steps));
  var svg = d3.select("#chart").style("width", "100%").style("height", "auto").style("font", "10px sans-serif");
  var g = svg.append("g").attr("transform", "translate(".concat(width / 2, ", ").concat(width / 2, ")"));
  var path = g.append("g").selectAll("path").data(root.descendants()).join("path").attr("fill", function (d) {
    // while (d.depth > 1) { d = d.parent; }
    console.log(d.data);
    console.log(d.height);
    return colors[d.height](names_by_height[d.height].indexOf(d.data.name));
  }).attr("fill-opacity", function (d) {
    if (d.height === Math.max.apply(Math, heights)) {
      return 0;
    } else {
      return opacities(d.height);
    }

    ;
  }).attr("d", function (d) {
    return arc(d.current);
  }); //Add title elements to each path

  path.append("title").text(function (d) {
    return "".concat(d.ancestors().map(function (d) {
      return d.data.name;
    }).reverse().join("/"), "\n").concat(format(d.value));
  }); // const label = g.append("g")
  //   .attr("pointer-events", "none")
  //   .attr("text-anchor")
  //   .selectAll("text")
  //   .data(root.descendants().slice(1))
  //   .join("text")
  //   .attr("fill-opacity", 1)
  //   .text(function(d) {
  //     return d.data.name;
  //   });
  //
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImZvcm1hdCIsImQzIiwid2lkdGgiLCJoZWlnaHQiLCJyYWRpdXMiLCJhcmMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsInNpemUiLCJQSSIsImRhdGFzZXQiLCJqc29uIiwidGhlbiIsImVhY2giLCJjdXJyZW50IiwibmFtZXMiLCJoZWlnaHRzIiwibmFtZXNfYnlfaGVpZ2h0IiwiZGVzY2VuZGFudHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwiY29sb3JzIiwiaCIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJsZW5ndGgiLCJvcGFjaXR5X2J5X2hlaWdodCIsIm9wYWNpdHlfbWluIiwib3BhY2l0eV9tYXgiLCJzdGVwcyIsIm9wYWNpdGllcyIsImRvbWFpbiIsInN2ZyIsInNlbGVjdCIsInN0eWxlIiwiZyIsImFwcGVuZCIsImF0dHIiLCJwYXRoIiwic2VsZWN0QWxsIiwiam9pbiIsImNvbnNvbGUiLCJsb2ciLCJ0ZXh0IiwiYW5jZXN0b3JzIiwibWFwIiwicmV2ZXJzZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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QUgsQ0FIckI7QUFJRCxHQU5ILEVBbEcyQixDQTBHM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVELENBdkhELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbi8vIH0pXG5cbi8vZXZlcnl0aGluZyBpcyBidW5kbGVkIGludG8gbWFpbi5qcyBieSB3ZWJwYWNrIGFuZCB3ZSBqdXN0IGluY2x1ZGUgYSBsaW5rIHRvIFwibWFpblwiXG5cbi8vTXkgRDMgQ29kZSBoZXJlOlxuXG5jb25zdCBmb3JtYXQgPSBkMy5mb3JtYXQoXCIsZFwiKTtcblxuLy9zb21lIGNvbnN0YW50cyBmb3IgZGltZW5zaW9uczpcbmNvbnN0IHdpZHRoID0gOTMyO1xuY29uc3QgaGVpZ2h0ID0gOTMyO1xuY29uc3QgcmFkaXVzID0gd2lkdGggLyA5O1xuXG4vL2FyYyBmdW5jdGlvblxuXG5jb25zdCBhcmMgPSBkMy5hcmMoKVxuICAuc3RhcnRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngwO1xuICB9KVxuICAuZW5kQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MTtcbiAgfSlcbiAgLnBhZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKChkLngxIC0gZC54MCkgLyAyLCAwLjAwNSk7XG4gIH0pXG4gIC5wYWRSYWRpdXMoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByYWRpdXMgKiAxLjU7XG4gIH0pXG4gIC5pbm5lclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIC8vIHJldHVybiAzO1xuICAgIHJldHVybiBkLnkwICogcmFkaXVzO1xuICB9KVxuICAub3V0ZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoZC55MCAqIHJhZGl1cywgZC55MSAqIHJhZGl1cyAtIDEpO1xuICB9KTtcblxuLy9wYXJ0aXRpb24gZnVuY3Rpb25cblxuY29uc3QgcGFydGl0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc3Qgcm9vdCA9IGQzLmhpZXJhcmNoeShkYXRhKVxuICAgIC5zdW0oZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vdGhpcyBvbmx5IHN1bXMgdGhlIGxlYXZlcywgd2hpY2ggaGF2ZSBhIHZhbHVlIGF0dHJpYnV0ZVxuICAgICAgLy8gY29uc29sZS5sb2coZCk7XG4gICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICB9KVxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gKGIudmFsdWUgLSBhLnZhbHVlKTtcbiAgICB9KVxuICAvLyBjb25zb2xlLmxvZyhyb290KTtcbiAgcmV0dXJuIGQzLnBhcnRpdGlvbigpXG4gICAgLnNpemUoWzIgKiBNYXRoLlBJLCByb290LmhlaWdodCArIDFdKVxuICAgIChyb290KTtcbn1cblxuXG4vL0kgZ2V0IG15IGpzb24gZGF0YSBpbnRvIGFuIG9iamVjdCBpbiB0aGlzIGZ1bmN0aW9uOlxuXG52YXIgZGF0YXNldCA9IGQzLmpzb24oJy4vZGF0YS9kaWV0X2RhdGEuanNvbicpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGE7XG59KTtcblxuZGF0YXNldC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgLy9BbGwgY29kZSB0byBkbyB2aXN1YWxpemF0aW9uIGdvZXMgaW5zaWRlIG9mIHRoaXMgY2FsbGJhY2tcblxuICAvL2dlbmVyYXRlIHJvb3QgXG4gIGNvbnN0IHJvb3QgPSBwYXJ0aXRpb24oZGF0YSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcblxuICAvL3NldCBjdXJyZW50IGF0dHJpYnV0ZVxuICByb290LmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBkLmN1cnJlbnQgPSBkO1xuICB9KTtcbiAgLy9jb25zb2xlLmxvZyhyb290LmRlc2NlbmRhbnRzKCkpO1xuXG4gIC8vY29sb3IgKE9MRClcblxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBkYXRhLmNoaWxkcmVuLmxlbmd0aCArIDEpKTtcblxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBuYW1lcy5sZW5ndGgpKTtcblxuICAvL3JlZmFjdG9yaW5nIHRoZSBjb2xvciBtZXRob2RcblxuICBjb25zdCBuYW1lcyA9IFtdO1xuICBjb25zdCBoZWlnaHRzID0gW107XG4gIGNvbnN0IG5hbWVzX2J5X2hlaWdodCA9IHt9O1xuXG4gIHJvb3QuZGVzY2VuZGFudHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICBpZiAoaGVpZ2h0cy5pbmRleE9mKGQuaGVpZ2h0KSA9PT0gLTEgKSB7XG4gICAgICBoZWlnaHRzLnB1c2goZC5oZWlnaHQpO1xuICAgICAgbmFtZXNfYnlfaGVpZ2h0W2QuaGVpZ2h0XSA9IFtdO1xuICAgIH1cbiAgICBpZiAobmFtZXMuaW5kZXhPZihkLmRhdGEubmFtZSkgPT09IC0xKSB7XG4gICAgICBuYW1lcy5wdXNoKGQuZGF0YS5uYW1lKTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0ucHVzaChkLmRhdGEubmFtZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBjb25zb2xlLmxvZyhuYW1lcyk7XG4gIC8vIGNvbnNvbGUubG9nKGhlaWdodHMpO1xuICAvLyBjb25zb2xlLmxvZyhuYW1lc19ieV9oZWlnaHQpO1xuXG4gIC8vSW50ZXJwb2xhdGUgdGhlIHdob2xlIHJhaW5ib3cgYXQgZWFjaCBoZWlnaHQgaW4gdGhlIGhlaXJhcmNoeVxuXG4gIGNvbnN0IGNvbG9ycyA9IHt9O1xuXG4gIGhlaWdodHMuZm9yRWFjaCggZnVuY3Rpb24oaCkge1xuICAgIGNvbG9yc1toXSA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtoXS5sZW5ndGggKyAxKSk7XG4gIH0pO1xuXG4gIC8vSSBhbHNvIHdhbnQgdG8gdmFyeSBvcGFjaXR5IGJ5IGhlaWdodFxuXG4gIGNvbnN0IG9wYWNpdHlfYnlfaGVpZ2h0ID0ge31cbiAgY29uc3Qgb3BhY2l0eV9taW4gPSAuNDtcbiAgY29uc3Qgb3BhY2l0eV9tYXggPSAxO1xuICBjb25zdCBzdGVwcyA9IGhlaWdodHMubGVuZ3RoO1xuXG4gIC8vIGNvbnN0IG9wYWNpdGllcyA9IGQzLmludGVycG9sYXRlTnVtYmVyKG9wYWNpdHlfbWF4LCBvcGFjaXR5X21pbik7XG4gIFxuICBjb25zdCBvcGFjaXRpZXMgPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgLmRvbWFpbihoZWlnaHRzKVxuICAgICAgLnJhbmdlKGQzLnJhbmdlKG9wYWNpdHlfbWF4LCBvcGFjaXR5X21pbiwgLTEgKiAob3BhY2l0eV9tYXggLSBvcGFjaXR5X21pbikvc3RlcHMpKTtcblxuXG4gIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNjaGFydFwiKVxuICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAuc3R5bGUoXCJmb250XCIsIFwiMTBweCBzYW5zLXNlcmlmXCIpO1xuXG4gIGNvbnN0IGcgPSBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt3aWR0aCAvIDJ9LCAke3dpZHRoIC8gMn0pYCk7XG5cbiAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgLmRhdGEocm9vdC5kZXNjZW5kYW50cygpKVxuICAgIC5qb2luKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgLy8gd2hpbGUgKGQuZGVwdGggPiAxKSB7IGQgPSBkLnBhcmVudDsgfVxuICAgICAgY29uc29sZS5sb2coZC5kYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKGQuaGVpZ2h0KTtcbiAgICAgIHJldHVybiBjb2xvcnNbZC5oZWlnaHRdKG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0uaW5kZXhPZihkLmRhdGEubmFtZSkpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgaWYgKGQuaGVpZ2h0ID09PSBNYXRoLm1heCguLi5oZWlnaHRzKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7IFxuICAgICAgICByZXR1cm4gb3BhY2l0aWVzKGQuaGVpZ2h0KVxuICAgICAgfTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGFyYyhkLmN1cnJlbnQpO1xuICAgIH0pO1xuXG4gIC8vQWRkIHRpdGxlIGVsZW1lbnRzIHRvIGVhY2ggcGF0aFxuXG4gIHBhdGguYXBwZW5kKFwidGl0bGVcIilcbiAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gYCR7ZC5hbmNlc3RvcnMoKS5tYXAoZnVuY3Rpb24oZCl7XG4gICAgICAgIHJldHVybiBkLmRhdGEubmFtZTtcbiAgICAgIH0pLnJldmVyc2UoKVxuICAgICAgLmpvaW4oXCIvXCIpfVxcbiR7Zm9ybWF0KGQudmFsdWUpfWA7XG4gICAgfSk7XG5cbiAgLy8gY29uc3QgbGFiZWwgPSBnLmFwcGVuZChcImdcIilcbiAgLy8gICAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwibm9uZVwiKVxuICAvLyAgIC5hdHRyKFwidGV4dC1hbmNob3JcIilcbiAgLy8gICAuc2VsZWN0QWxsKFwidGV4dFwiKVxuICAvLyAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKS5zbGljZSgxKSlcbiAgLy8gICAuam9pbihcInRleHRcIilcbiAgLy8gICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAvLyAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcbiAgLy8gICAgIHJldHVybiBkLmRhdGEubmFtZTtcbiAgLy8gICB9KTtcblxuICAvL1xuXG59KTtcbiAgICBcbiJdLCJzb3VyY2VSb290IjoiIn0=