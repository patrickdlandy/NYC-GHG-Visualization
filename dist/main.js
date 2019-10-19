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
  });
  console.log(root.data.name);
  return d3.partition().size([2 * Math.PI, root.height + 1])(root);
}; //I get my json data into an object in this function:


var dataset = d3.json('./data/data.json').then(function (data) {
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
  var svg = d3.select("#chart") // .style("width", "100%")
  .style("height", "auto").style("font", "10px sans-serif");
  var g = svg.append("g").attr("transform", "translate(".concat(width / 2, ", ").concat(width / 2, ")"));
  var path = g.append("g").selectAll("path").data(root.descendants()).join("path").attr("fill", function (d) {
    // while (d.depth > 1) { d = d.parent; }
    // console.log(d.data);
    // console.log(d.height);
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
  });
  var chartlabel = g.append("text") // .attr("pointer-events", "none")
  .attr("text-anchor", "middle") // .selectAll("text")
  // .data(root)
  // .join("text")
  .attr("fill-opacity", 1).text(root.data.name);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImZvcm1hdCIsImQzIiwid2lkdGgiLCJoZWlnaHQiLCJyYWRpdXMiLCJhcmMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwic2l6ZSIsIlBJIiwiZGF0YXNldCIsImpzb24iLCJ0aGVuIiwiZWFjaCIsImN1cnJlbnQiLCJuYW1lcyIsImhlaWdodHMiLCJuYW1lc19ieV9oZWlnaHQiLCJkZXNjZW5kYW50cyIsImZvckVhY2giLCJpbmRleE9mIiwicHVzaCIsImNvbG9ycyIsImgiLCJzY2FsZU9yZGluYWwiLCJyYW5nZSIsInF1YW50aXplIiwiaW50ZXJwb2xhdGVSYWluYm93IiwibGVuZ3RoIiwib3BhY2l0eV9ieV9oZWlnaHQiLCJvcGFjaXR5X21pbiIsIm9wYWNpdHlfbWF4Iiwic3RlcHMiLCJvcGFjaXRpZXMiLCJkb21haW4iLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsImciLCJhcHBlbmQiLCJhdHRyIiwicGF0aCIsInNlbGVjdEFsbCIsImpvaW4iLCJ0ZXh0IiwiYW5jZXN0b3JzIiwibWFwIiwicmV2ZXJzZSIsImNoYXJ0bGFiZWwiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVB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LE1BQUYsQ0FBUyxNQUFULEVBQ2pCO0FBRGlCLEdBRWhCQyxJQUZnQixDQUVYLGFBRlcsRUFFSSxRQUZKLEVBR2pCO0FBQ0E7QUFDQTtBQUxpQixHQU1oQkEsSUFOZ0IsQ0FNWCxjQU5XLEVBTUssQ0FOTCxFQU9oQkksSUFQZ0IsQ0FPWDlDLElBQUksQ0FBQ0QsSUFBTCxDQUFVVSxJQVBDLENBQW5CO0FBV0QsQ0FySEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuLy8gfSlcblxuLy9ldmVyeXRoaW5nIGlzIGJ1bmRsZWQgaW50byBtYWluLmpzIGJ5IHdlYnBhY2sgYW5kIHdlIGp1c3QgaW5jbHVkZSBhIGxpbmsgdG8gXCJtYWluXCJcblxuLy9NeSBEMyBDb2RlIGhlcmU6XG5cbmNvbnN0IGZvcm1hdCA9IGQzLmZvcm1hdChcIixkXCIpO1xuXG4vL3NvbWUgY29uc3RhbnRzIGZvciBkaW1lbnNpb25zOlxuY29uc3Qgd2lkdGggPSA5MzI7XG5jb25zdCBoZWlnaHQgPSA5MzI7XG5jb25zdCByYWRpdXMgPSB3aWR0aCAvIDk7XG5cbi8vYXJjIGZ1bmN0aW9uXG5cbmNvbnN0IGFyYyA9IGQzLmFyYygpXG4gIC5zdGFydEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDA7XG4gIH0pXG4gIC5lbmRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngxO1xuICB9KVxuICAucGFkQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oKGQueDEgLSBkLngwKSAvIDIsIDAuMDA1KTtcbiAgfSlcbiAgLnBhZFJhZGl1cyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJhZGl1cyAqIDEuNTtcbiAgfSlcbiAgLmlubmVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgLy8gcmV0dXJuIDM7XG4gICAgcmV0dXJuIGQueTAgKiByYWRpdXM7XG4gIH0pXG4gIC5vdXRlclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1heChkLnkwICogcmFkaXVzLCBkLnkxICogcmFkaXVzIC0gMSk7XG4gIH0pO1xuXG4vL3BhcnRpdGlvbiBmdW5jdGlvblxuXG5jb25zdCBwYXJ0aXRpb24gPSBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25zdCByb290ID0gZDMuaGllcmFyY2h5KGRhdGEpXG4gICAgLnN1bShmdW5jdGlvbiAoZCkge1xuICAgICAgLy90aGlzIG9ubHkgc3VtcyB0aGUgbGVhdmVzLCB3aGljaCBoYXZlIGEgdmFsdWUgYXR0cmlidXRlXG4gICAgICAvLyBjb25zb2xlLmxvZyhkKTtcbiAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIH0pXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiAoYi52YWx1ZSAtIGEudmFsdWUpO1xuICAgIH0pXG4gIGNvbnNvbGUubG9nKHJvb3QuZGF0YS5uYW1lKTtcbiAgcmV0dXJuIGQzLnBhcnRpdGlvbigpXG4gICAgLnNpemUoWzIgKiBNYXRoLlBJLCByb290LmhlaWdodCArIDFdKVxuICAgIChyb290KTtcbn1cblxuXG4vL0kgZ2V0IG15IGpzb24gZGF0YSBpbnRvIGFuIG9iamVjdCBpbiB0aGlzIGZ1bmN0aW9uOlxuXG52YXIgZGF0YXNldCA9IGQzLmpzb24oJy4vZGF0YS9kYXRhLmpzb24nKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIHJldHVybiBkYXRhO1xufSk7XG5cbmRhdGFzZXQudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAvLyBjb25zb2xlLmxvZyhkYXRhKVxuXG4gIC8vQWxsIGNvZGUgdG8gZG8gdmlzdWFsaXphdGlvbiBnb2VzIGluc2lkZSBvZiB0aGlzIGNhbGxiYWNrXG5cbiAgLy9nZW5lcmF0ZSByb290IFxuICBjb25zdCByb290ID0gcGFydGl0aW9uKGRhdGEpO1xuICAvL2NvbnNvbGUubG9nKHJvb3QuZGVzY2VuZGFudHMoKSk7XG5cbiAgLy9zZXQgY3VycmVudCBhdHRyaWJ1dGVcbiAgcm9vdC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgZC5jdXJyZW50ID0gZDtcbiAgfSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcblxuICAvL2NvbG9yIChPTEQpXG5cbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgZGF0YS5jaGlsZHJlbi5sZW5ndGggKyAxKSk7XG5cbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgbmFtZXMubGVuZ3RoKSk7XG5cbiAgLy9yZWZhY3RvcmluZyB0aGUgY29sb3IgbWV0aG9kXG5cbiAgY29uc3QgbmFtZXMgPSBbXTtcbiAgY29uc3QgaGVpZ2h0cyA9IFtdO1xuICBjb25zdCBuYW1lc19ieV9oZWlnaHQgPSB7fTtcblxuICByb290LmRlc2NlbmRhbnRzKCkuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgaWYgKGhlaWdodHMuaW5kZXhPZihkLmhlaWdodCkgPT09IC0xICkge1xuICAgICAgaGVpZ2h0cy5wdXNoKGQuaGVpZ2h0KTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0gPSBbXTtcbiAgICB9XG4gICAgaWYgKG5hbWVzLmluZGV4T2YoZC5kYXRhLm5hbWUpID09PSAtMSkge1xuICAgICAgbmFtZXMucHVzaChkLmRhdGEubmFtZSk7XG4gICAgICBuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLnB1c2goZC5kYXRhLm5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gY29uc29sZS5sb2cobmFtZXMpO1xuICAvLyBjb25zb2xlLmxvZyhoZWlnaHRzKTtcbiAgLy8gY29uc29sZS5sb2cobmFtZXNfYnlfaGVpZ2h0KTtcblxuICAvL0ludGVycG9sYXRlIHRoZSB3aG9sZSByYWluYm93IGF0IGVhY2ggaGVpZ2h0IGluIHRoZSBoZWlyYXJjaHlcblxuICBjb25zdCBjb2xvcnMgPSB7fTtcblxuICBoZWlnaHRzLmZvckVhY2goIGZ1bmN0aW9uKGgpIHtcbiAgICBjb2xvcnNbaF0gPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gICAgICBuYW1lc19ieV9oZWlnaHRbaF0ubGVuZ3RoICsgMSkpO1xuICB9KTtcblxuICAvL0kgYWxzbyB3YW50IHRvIHZhcnkgb3BhY2l0eSBieSBoZWlnaHRcblxuICBjb25zdCBvcGFjaXR5X2J5X2hlaWdodCA9IHt9XG4gIGNvbnN0IG9wYWNpdHlfbWluID0gLjQ7XG4gIGNvbnN0IG9wYWNpdHlfbWF4ID0gMTtcbiAgY29uc3Qgc3RlcHMgPSBoZWlnaHRzLmxlbmd0aDtcblxuICAvLyBjb25zdCBvcGFjaXRpZXMgPSBkMy5pbnRlcnBvbGF0ZU51bWJlcihvcGFjaXR5X21heCwgb3BhY2l0eV9taW4pO1xuICBcbiAgY29uc3Qgb3BhY2l0aWVzID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgIC5kb21haW4oaGVpZ2h0cylcbiAgICAgIC5yYW5nZShkMy5yYW5nZShvcGFjaXR5X21heCwgb3BhY2l0eV9taW4sIC0xICogKG9wYWNpdHlfbWF4IC0gb3BhY2l0eV9taW4pL3N0ZXBzKSk7XG5cblxuICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjY2hhcnRcIilcbiAgICAvLyAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG4gICAgLnN0eWxlKFwiZm9udFwiLCBcIjEwcHggc2Fucy1zZXJpZlwiKTtcblxuICBjb25zdCBnID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHt3aWR0aCAvIDJ9KWApO1xuXG4gIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcImdcIilcbiAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKSlcbiAgICAuam9pbihcInBhdGhcIilcbiAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vIHdoaWxlIChkLmRlcHRoID4gMSkgeyBkID0gZC5wYXJlbnQ7IH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKGQuZGF0YSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkLmhlaWdodCk7XG4gICAgICByZXR1cm4gY29sb3JzW2QuaGVpZ2h0XShuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLmluZGV4T2YoZC5kYXRhLm5hbWUpKTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIGlmIChkLmhlaWdodCA9PT0gTWF0aC5tYXgoLi4uaGVpZ2h0cykpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9IGVsc2UgeyBcbiAgICAgICAgcmV0dXJuIG9wYWNpdGllcyhkLmhlaWdodClcbiAgICAgIH07XG4gICAgfSlcbiAgICAuYXR0cihcImRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBhcmMoZC5jdXJyZW50KTtcbiAgICB9KTtcblxuICAvL0FkZCB0aXRsZSBlbGVtZW50cyB0byBlYWNoIHBhdGhcblxuICBwYXRoLmFwcGVuZChcInRpdGxlXCIpXG4gICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGAke2QuYW5jZXN0b3JzKCkubWFwKGZ1bmN0aW9uKGQpe1xuICAgICAgICByZXR1cm4gZC5kYXRhLm5hbWU7XG4gICAgICB9KS5yZXZlcnNlKClcbiAgICAgIC5qb2luKFwiL1wiKX1cXG4ke2Zvcm1hdChkLnZhbHVlKX1gO1xuICAgIH0pO1xuXG4gIGNvbnN0IGNoYXJ0bGFiZWwgPSBnLmFwcGVuZChcInRleHRcIilcbiAgICAvLyAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwibm9uZVwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAvLyAuc2VsZWN0QWxsKFwidGV4dFwiKVxuICAgIC8vIC5kYXRhKHJvb3QpXG4gICAgLy8gLmpvaW4oXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgICAudGV4dChyb290LmRhdGEubmFtZSk7XG5cbiAgXG5cbn0pO1xuICAgIFxuIl0sInNvdXJjZVJvb3QiOiIifQ==