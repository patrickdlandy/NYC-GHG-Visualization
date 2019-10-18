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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImZvcm1hdCIsImQzIiwid2lkdGgiLCJoZWlnaHQiLCJyYWRpdXMiLCJhcmMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsInNpemUiLCJQSSIsImRhdGFzZXQiLCJqc29uIiwidGhlbiIsImVhY2giLCJjdXJyZW50IiwibmFtZXMiLCJoZWlnaHRzIiwibmFtZXNfYnlfaGVpZ2h0IiwiZGVzY2VuZGFudHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwiY29sb3JzIiwiaCIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJsZW5ndGgiLCJvcGFjaXR5X2J5X2hlaWdodCIsIm9wYWNpdHlfbWluIiwib3BhY2l0eV9tYXgiLCJzdGVwcyIsIm9wYWNpdGllcyIsImRvbWFpbiIsInN2ZyIsInNlbGVjdCIsInN0eWxlIiwiZyIsImFwcGVuZCIsImF0dHIiLCJwYXRoIiwic2VsZWN0QWxsIiwiam9pbiIsInRleHQiLCJhbmNlc3RvcnMiLCJtYXAiLCJyZXZlcnNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdD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Y2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4vLyB9KVxuXG4vL2V2ZXJ5dGhpbmcgaXMgYnVuZGxlZCBpbnRvIG1haW4uanMgYnkgd2VicGFjayBhbmQgd2UganVzdCBpbmNsdWRlIGEgbGluayB0byBcIm1haW5cIlxuXG4vL015IEQzIENvZGUgaGVyZTpcblxuY29uc3QgZm9ybWF0ID0gZDMuZm9ybWF0KFwiLGRcIik7XG5cbi8vc29tZSBjb25zdGFudHMgZm9yIGRpbWVuc2lvbnM6XG5jb25zdCB3aWR0aCA9IDkzMjtcbmNvbnN0IGhlaWdodCA9IDkzMjtcbmNvbnN0IHJhZGl1cyA9IHdpZHRoIC8gOTtcblxuLy9hcmMgZnVuY3Rpb25cblxuY29uc3QgYXJjID0gZDMuYXJjKClcbiAgLnN0YXJ0QW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MDtcbiAgfSlcbiAgLmVuZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDE7XG4gIH0pXG4gIC5wYWRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1pbigoZC54MSAtIGQueDApIC8gMiwgMC4wMDUpO1xuICB9KVxuICAucGFkUmFkaXVzKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmFkaXVzICogMS41O1xuICB9KVxuICAuaW5uZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICAvLyByZXR1cm4gMztcbiAgICByZXR1cm4gZC55MCAqIHJhZGl1cztcbiAgfSlcbiAgLm91dGVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KGQueTAgKiByYWRpdXMsIGQueTEgKiByYWRpdXMgLSAxKTtcbiAgfSk7XG5cbi8vcGFydGl0aW9uIGZ1bmN0aW9uXG5cbmNvbnN0IHBhcnRpdGlvbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGNvbnN0IHJvb3QgPSBkMy5oaWVyYXJjaHkoZGF0YSlcbiAgICAuc3VtKGZ1bmN0aW9uIChkKSB7XG4gICAgICAvL3RoaXMgb25seSBzdW1zIHRoZSBsZWF2ZXMsIHdoaWNoIGhhdmUgYSB2YWx1ZSBhdHRyaWJ1dGVcbiAgICAgIC8vIGNvbnNvbGUubG9nKGQpO1xuICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgfSlcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIChiLnZhbHVlIC0gYS52YWx1ZSk7XG4gICAgfSlcbiAgLy8gY29uc29sZS5sb2cocm9vdCk7XG4gIHJldHVybiBkMy5wYXJ0aXRpb24oKVxuICAgIC5zaXplKFsyICogTWF0aC5QSSwgcm9vdC5oZWlnaHQgKyAxXSlcbiAgICAocm9vdCk7XG59XG5cblxuLy9JIGdldCBteSBqc29uIGRhdGEgaW50byBhbiBvYmplY3QgaW4gdGhpcyBmdW5jdGlvbjpcblxudmFyIGRhdGFzZXQgPSBkMy5qc29uKCcuL2RhdGEvZGlldF9kYXRhLmpzb24nKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIHJldHVybiBkYXRhO1xufSk7XG5cbmRhdGFzZXQudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAvLyBjb25zb2xlLmxvZyhkYXRhKVxuXG4gIC8vQWxsIGNvZGUgdG8gZG8gdmlzdWFsaXphdGlvbiBnb2VzIGluc2lkZSBvZiB0aGlzIGNhbGxiYWNrXG5cbiAgLy9nZW5lcmF0ZSByb290IFxuICBjb25zdCByb290ID0gcGFydGl0aW9uKGRhdGEpO1xuICAvL2NvbnNvbGUubG9nKHJvb3QuZGVzY2VuZGFudHMoKSk7XG5cbiAgLy9zZXQgY3VycmVudCBhdHRyaWJ1dGVcbiAgcm9vdC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgZC5jdXJyZW50ID0gZDtcbiAgfSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcblxuICAvL2NvbG9yIChPTEQpXG5cbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgZGF0YS5jaGlsZHJlbi5sZW5ndGggKyAxKSk7XG5cbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgbmFtZXMubGVuZ3RoKSk7XG5cbiAgLy9yZWZhY3RvcmluZyB0aGUgY29sb3IgbWV0aG9kXG5cbiAgY29uc3QgbmFtZXMgPSBbXTtcbiAgY29uc3QgaGVpZ2h0cyA9IFtdO1xuICBjb25zdCBuYW1lc19ieV9oZWlnaHQgPSB7fTtcblxuICByb290LmRlc2NlbmRhbnRzKCkuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgaWYgKGhlaWdodHMuaW5kZXhPZihkLmhlaWdodCkgPT09IC0xICkge1xuICAgICAgaGVpZ2h0cy5wdXNoKGQuaGVpZ2h0KTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0gPSBbXTtcbiAgICB9XG4gICAgaWYgKG5hbWVzLmluZGV4T2YoZC5kYXRhLm5hbWUpID09PSAtMSkge1xuICAgICAgbmFtZXMucHVzaChkLmRhdGEubmFtZSk7XG4gICAgICBuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLnB1c2goZC5kYXRhLm5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gY29uc29sZS5sb2cobmFtZXMpO1xuICAvLyBjb25zb2xlLmxvZyhoZWlnaHRzKTtcbiAgLy8gY29uc29sZS5sb2cobmFtZXNfYnlfaGVpZ2h0KTtcblxuICAvL0ludGVycG9sYXRlIHRoZSB3aG9sZSByYWluYm93IGF0IGVhY2ggaGVpZ2h0IGluIHRoZSBoZWlyYXJjaHlcblxuICBjb25zdCBjb2xvcnMgPSB7fTtcblxuICBoZWlnaHRzLmZvckVhY2goIGZ1bmN0aW9uKGgpIHtcbiAgICBjb2xvcnNbaF0gPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gICAgICBuYW1lc19ieV9oZWlnaHRbaF0ubGVuZ3RoICsgMSkpO1xuICB9KTtcblxuICAvL0kgYWxzbyB3YW50IHRvIHZhcnkgb3BhY2l0eSBieSBoZWlnaHRcblxuICBjb25zdCBvcGFjaXR5X2J5X2hlaWdodCA9IHt9XG4gIGNvbnN0IG9wYWNpdHlfbWluID0gLjQ7XG4gIGNvbnN0IG9wYWNpdHlfbWF4ID0gMTtcbiAgY29uc3Qgc3RlcHMgPSBoZWlnaHRzLmxlbmd0aDtcblxuICAvLyBjb25zdCBvcGFjaXRpZXMgPSBkMy5pbnRlcnBvbGF0ZU51bWJlcihvcGFjaXR5X21heCwgb3BhY2l0eV9taW4pO1xuICBcbiAgY29uc3Qgb3BhY2l0aWVzID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgIC5kb21haW4oaGVpZ2h0cylcbiAgICAgIC5yYW5nZShkMy5yYW5nZShvcGFjaXR5X21heCwgb3BhY2l0eV9taW4sIC0xICogKG9wYWNpdHlfbWF4IC0gb3BhY2l0eV9taW4pL3N0ZXBzKSk7XG5cblxuICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjY2hhcnRcIilcbiAgICAvLyAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG4gICAgLnN0eWxlKFwiZm9udFwiLCBcIjEwcHggc2Fucy1zZXJpZlwiKTtcblxuICBjb25zdCBnID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHt3aWR0aCAvIDJ9KWApO1xuXG4gIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcImdcIilcbiAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKSlcbiAgICAuam9pbihcInBhdGhcIilcbiAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vIHdoaWxlIChkLmRlcHRoID4gMSkgeyBkID0gZC5wYXJlbnQ7IH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKGQuZGF0YSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkLmhlaWdodCk7XG4gICAgICByZXR1cm4gY29sb3JzW2QuaGVpZ2h0XShuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLmluZGV4T2YoZC5kYXRhLm5hbWUpKTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIGlmIChkLmhlaWdodCA9PT0gTWF0aC5tYXgoLi4uaGVpZ2h0cykpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9IGVsc2UgeyBcbiAgICAgICAgcmV0dXJuIG9wYWNpdGllcyhkLmhlaWdodClcbiAgICAgIH07XG4gICAgfSlcbiAgICAuYXR0cihcImRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBhcmMoZC5jdXJyZW50KTtcbiAgICB9KTtcblxuICAvL0FkZCB0aXRsZSBlbGVtZW50cyB0byBlYWNoIHBhdGhcblxuICBwYXRoLmFwcGVuZChcInRpdGxlXCIpXG4gICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGAke2QuYW5jZXN0b3JzKCkubWFwKGZ1bmN0aW9uKGQpe1xuICAgICAgICByZXR1cm4gZC5kYXRhLm5hbWU7XG4gICAgICB9KS5yZXZlcnNlKClcbiAgICAgIC5qb2luKFwiL1wiKX1cXG4ke2Zvcm1hdChkLnZhbHVlKX1gO1xuICAgIH0pO1xuXG4gIC8vIGNvbnN0IGxhYmVsID0gZy5hcHBlbmQoXCJnXCIpXG4gIC8vICAgLmF0dHIoXCJwb2ludGVyLWV2ZW50c1wiLCBcIm5vbmVcIilcbiAgLy8gICAuYXR0cihcInRleHQtYW5jaG9yXCIpXG4gIC8vICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgLy8gICAuZGF0YShyb290LmRlc2NlbmRhbnRzKCkuc2xpY2UoMSkpXG4gIC8vICAgLmpvaW4oXCJ0ZXh0XCIpXG4gIC8vICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgLy8gICAudGV4dChmdW5jdGlvbihkKSB7XG4gIC8vICAgICByZXR1cm4gZC5kYXRhLm5hbWU7XG4gIC8vICAgfSk7XG5cbiAgLy9cblxufSk7XG4gICAgXG4iXSwic291cmNlUm9vdCI6IiJ9