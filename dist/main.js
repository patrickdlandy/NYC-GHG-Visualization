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

document.addEventListener("DOMContentLoaded", function () {}); //everything is bundled into main.js by webpack and we just include a link to "main"
//My D3 Code here:
//some constants for dimensions:

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
  var opacity_min = .3;
  var opacity_max = 1;
  heights.forEach(function (h) {});
  var svg = d3.select("#chart").style("width", "100%").style("height", "auto").style("font", "10px sans-serif");
  var g = svg.append("g").attr("transform", "translate(".concat(width / 2, ", ").concat(width / 2, ")"));
  var path = g.append("g").selectAll("path").data(root.descendants()).join("path").attr("fill", function (d) {
    // while (d.depth > 1) { d = d.parent; }
    // console.log(d.height);
    return colors[d.height](names_by_height[d.height].indexOf(d.data.name));
  }).attr("fill-opacity", 1).attr("d", function (d) {
    return arc(d.current);
  }); //
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpZHRoIiwiaGVpZ2h0IiwicmFkaXVzIiwiYXJjIiwiZDMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsInNpemUiLCJQSSIsImRhdGFzZXQiLCJqc29uIiwidGhlbiIsImVhY2giLCJjdXJyZW50IiwibmFtZXMiLCJoZWlnaHRzIiwibmFtZXNfYnlfaGVpZ2h0IiwiZGVzY2VuZGFudHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwiY29sb3JzIiwiaCIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJsZW5ndGgiLCJvcGFjaXR5X2J5X2hlaWdodCIsIm9wYWNpdHlfbWluIiwib3BhY2l0eV9tYXgiLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsImciLCJhcHBlbmQiLCJhdHRyIiwicGF0aCIsInNlbGVjdEFsbCIsImpvaW4iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JB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SUFWVSxDQVVMLEdBVkssRUFVQSxVQUFVcEQsQ0FBVixFQUFhO0FBQ3RCLFdBQU9ILEdBQUcsQ0FBQ0csQ0FBQyxDQUFDNEIsT0FBSCxDQUFWO0FBQ0QsR0FaVSxDQUFiLENBdkUyQixDQXNGM0I7QUFFRCxDQXhGRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG59KVxuXG4vL2V2ZXJ5dGhpbmcgaXMgYnVuZGxlZCBpbnRvIG1haW4uanMgYnkgd2VicGFjayBhbmQgd2UganVzdCBpbmNsdWRlIGEgbGluayB0byBcIm1haW5cIlxuXG4vL015IEQzIENvZGUgaGVyZTpcblxuLy9zb21lIGNvbnN0YW50cyBmb3IgZGltZW5zaW9uczpcbmNvbnN0IHdpZHRoID0gOTMyO1xuY29uc3QgaGVpZ2h0ID0gOTMyO1xuY29uc3QgcmFkaXVzID0gd2lkdGggLyA5O1xuXG4vL2FyYyBmdW5jdGlvblxuXG5jb25zdCBhcmMgPSBkMy5hcmMoKVxuICAuc3RhcnRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngwO1xuICB9KVxuICAuZW5kQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MTtcbiAgfSlcbiAgLnBhZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKChkLngxIC0gZC54MCkgLyAyLCAwLjAwNSk7XG4gIH0pXG4gIC5wYWRSYWRpdXMoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByYWRpdXMgKiAxLjU7XG4gIH0pXG4gIC5pbm5lclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIC8vIHJldHVybiAzO1xuICAgIHJldHVybiBkLnkwICogcmFkaXVzO1xuICB9KVxuICAub3V0ZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoZC55MCAqIHJhZGl1cywgZC55MSAqIHJhZGl1cyAtIDEpO1xuICB9KTtcblxuLy9wYXJ0aXRpb24gZnVuY3Rpb25cblxuY29uc3QgcGFydGl0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc3Qgcm9vdCA9IGQzLmhpZXJhcmNoeShkYXRhKVxuICAgIC5zdW0oZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vdGhpcyBvbmx5IHN1bXMgdGhlIGxlYXZlcywgd2hpY2ggaGF2ZSBhIHZhbHVlIGF0dHJpYnV0ZVxuICAgICAgLy8gY29uc29sZS5sb2coZCk7XG4gICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICB9KVxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gKGIudmFsdWUgLSBhLnZhbHVlKTtcbiAgICB9KVxuICAvLyBjb25zb2xlLmxvZyhyb290KTtcbiAgcmV0dXJuIGQzLnBhcnRpdGlvbigpXG4gICAgLnNpemUoWzIgKiBNYXRoLlBJLCByb290LmhlaWdodCArIDFdKVxuICAgIChyb290KTtcbn1cblxuXG4vL0kgZ2V0IG15IGpzb24gZGF0YSBpbnRvIGFuIG9iamVjdCBpbiB0aGlzIGZ1bmN0aW9uOlxuXG52YXIgZGF0YXNldCA9IGQzLmpzb24oJy4vZGF0YS9kaWV0X2RhdGEuanNvbicpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGE7XG59KTtcblxuZGF0YXNldC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgLy9BbGwgY29kZSB0byBkbyB2aXN1YWxpemF0aW9uIGdvZXMgaW5zaWRlIG9mIHRoaXMgY2FsbGJhY2tcblxuICAvL2dlbmVyYXRlIHJvb3QgXG4gIGNvbnN0IHJvb3QgPSBwYXJ0aXRpb24oZGF0YSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcblxuICAvL3NldCBjdXJyZW50IGF0dHJpYnV0ZVxuICByb290LmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBkLmN1cnJlbnQgPSBkO1xuICB9KTtcbiAgLy9jb25zb2xlLmxvZyhyb290LmRlc2NlbmRhbnRzKCkpO1xuXG4gIC8vY29sb3IgKE9MRClcblxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBkYXRhLmNoaWxkcmVuLmxlbmd0aCArIDEpKTtcblxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBuYW1lcy5sZW5ndGgpKTtcblxuICAvL3JlZmFjdG9yaW5nIHRoZSBjb2xvciBtZXRob2RcblxuICBjb25zdCBuYW1lcyA9IFtdO1xuICBjb25zdCBoZWlnaHRzID0gW107XG4gIGNvbnN0IG5hbWVzX2J5X2hlaWdodCA9IHt9O1xuXG4gIHJvb3QuZGVzY2VuZGFudHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICBpZiAoaGVpZ2h0cy5pbmRleE9mKGQuaGVpZ2h0KSA9PT0gLTEgKSB7XG4gICAgICBoZWlnaHRzLnB1c2goZC5oZWlnaHQpO1xuICAgICAgbmFtZXNfYnlfaGVpZ2h0W2QuaGVpZ2h0XSA9IFtdO1xuICAgIH1cbiAgICBpZiAobmFtZXMuaW5kZXhPZihkLmRhdGEubmFtZSkgPT09IC0xKSB7XG4gICAgICBuYW1lcy5wdXNoKGQuZGF0YS5uYW1lKTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0ucHVzaChkLmRhdGEubmFtZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBjb25zb2xlLmxvZyhuYW1lcyk7XG4gIC8vIGNvbnNvbGUubG9nKGhlaWdodHMpO1xuICAvLyBjb25zb2xlLmxvZyhuYW1lc19ieV9oZWlnaHQpO1xuXG4gIC8vSW50ZXJwb2xhdGUgdGhlIHdob2xlIHJhaW5ib3cgYXQgZWFjaCBoZWlnaHQgaW4gdGhlIGhlaXJhcmNoeVxuXG4gIGNvbnN0IGNvbG9ycyA9IHt9O1xuXG4gIGhlaWdodHMuZm9yRWFjaCggZnVuY3Rpb24oaCkge1xuICAgIGNvbG9yc1toXSA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtoXS5sZW5ndGggKyAxKSk7XG4gIH0pO1xuXG4gIC8vSSBhbHNvIHdhbnQgdG8gdmFyeSBvcGFjaXR5IGJ5IGhlaWdodFxuXG4gIGNvbnN0IG9wYWNpdHlfYnlfaGVpZ2h0ID0ge31cbiAgY29uc3Qgb3BhY2l0eV9taW4gPSAuMztcbiAgY29uc3Qgb3BhY2l0eV9tYXggPSAxO1xuXG4gIGhlaWdodHMuZm9yRWFjaChmdW5jdGlvbihoKSB7XG5cbiAgfSk7XG5cbiAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI2NoYXJ0XCIpXG4gICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgIC5zdHlsZShcImZvbnRcIiwgXCIxMHB4IHNhbnMtc2VyaWZcIik7XG5cbiAgY29uc3QgZyA9IHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3dpZHRoIC8gMn0sICR7d2lkdGggLyAyfSlgKTtcblxuICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAuZGF0YShyb290LmRlc2NlbmRhbnRzKCkpXG4gICAgLmpvaW4oXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAvLyB3aGlsZSAoZC5kZXB0aCA+IDEpIHsgZCA9IGQucGFyZW50OyB9XG4gICAgICAvLyBjb25zb2xlLmxvZyhkLmhlaWdodCk7XG4gICAgICByZXR1cm4gY29sb3JzW2QuaGVpZ2h0XShuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLmluZGV4T2YoZC5kYXRhLm5hbWUpKTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIDEpXG4gICAgLmF0dHIoXCJkXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gYXJjKGQuY3VycmVudCk7XG4gICAgfSk7XG5cblxuICAvL1xuXG59KTtcbiAgICBcbiJdLCJzb3VyY2VSb290IjoiIn0=