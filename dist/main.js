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
    console.log(d);
    return d.value;
  }).sort(function (a, b) {
    return b.value - a.value;
  }); // console.log(root);

  return d3.partition().size([2 * Math.PI, root.height + 1])(root);
}; //I get my json data into an object in this function:


var dataset = d3.json('/data/diet_data.json').then(function (data) {
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
  //color
  // const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,
  //   data.children.length + 1));
  //refactoring the color method
  //I want the color to be interpolated using a list of unique names.
  //Here I will make a list of unique names:

  var names = [];
  root.descendants().forEach(function (d) {
    if (names.indexOf(d.data.name) === -1) {
      names.push(d.data.name);
    }
  });
  var color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, names.length));
  console.log(names); //I want to interpolate the whole rainbow at each height in the heirarchy
  //I also want 

  var svg = d3.select("#chart").style("width", "100%").style("height", "auto").style("font", "10px sans-serif");
  var g = svg.append("g").attr("transform", "translate(".concat(width / 2, ", ").concat(width / 2, ")"));
  var path = g.append("g").selectAll("path").data(root.descendants()).join("path").attr("fill", function (d) {
    // while (d.depth > 1) { d = d.parent; }
    console.log(d.data.name);
    return color(names.indexOf(d.data.name));
  }).attr("fill-opacity", 1).attr("d", function (d) {
    return arc(d.current);
  }); //
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpZHRoIiwiaGVpZ2h0IiwicmFkaXVzIiwiYXJjIiwiZDMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJjb25zb2xlIiwibG9nIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJzaXplIiwiUEkiLCJkYXRhc2V0IiwianNvbiIsInRoZW4iLCJlYWNoIiwiY3VycmVudCIsIm5hbWVzIiwiZGVzY2VuZGFudHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsIm5hbWUiLCJwdXNoIiwiY29sb3IiLCJzY2FsZU9yZGluYWwiLCJyYW5nZSIsInF1YW50aXplIiwiaW50ZXJwb2xhdGVSYWluYm93IiwibGVuZ3RoIiwic3ZnIiwic2VsZWN0Iiwic3R5bGUiLCJnIiwiYXBwZW5kIiwiYXR0ciIsInBhdGgiLCJzZWxlY3RBbGwiLCJqb2luIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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QUFDaUIsV0FBTCxFQUZLLEVBR1ZtQixJQUhVLENBR0wsTUFISyxFQUlWSCxJQUpVLENBSUwsTUFKSyxFQUlHLFVBQVVoRCxDQUFWLEVBQWE7QUFDekI7QUFDQWtCLFdBQU8sQ0FBQ0MsR0FBUixDQUFZbkIsQ0FBQyxDQUFDYyxJQUFGLENBQU9xQixJQUFuQjtBQUNBLFdBQU9FLEtBQUssQ0FBQ04sS0FBSyxDQUFDRyxPQUFOLENBQWNsQyxDQUFDLENBQUNjLElBQUYsQ0FBT3FCLElBQXJCLENBQUQsQ0FBWjtBQUNELEdBUlUsRUFTVmEsSUFUVSxDQVNMLGNBVEssRUFTVyxDQVRYLEVBVVZBLElBVlUsQ0FVTCxHQVZLLEVBVUEsVUFBVWhELENBQVYsRUFBYTtBQUN0QixXQUFPSCxHQUFHLENBQUNHLENBQUMsQ0FBQzhCLE9BQUgsQ0FBVjtBQUNELEdBWlUsQ0FBYixDQXBEMkIsQ0FtRTNCO0FBRUQsQ0FyRUQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxufSlcblxuLy9ldmVyeXRoaW5nIGlzIGJ1bmRsZWQgaW50byBtYWluLmpzIGJ5IHdlYnBhY2sgYW5kIHdlIGp1c3QgaW5jbHVkZSBhIGxpbmsgdG8gXCJtYWluXCJcblxuLy9NeSBEMyBDb2RlIGhlcmU6XG5cbi8vc29tZSBjb25zdGFudHMgZm9yIGRpbWVuc2lvbnM6XG5jb25zdCB3aWR0aCA9IDkzMjtcbmNvbnN0IGhlaWdodCA9IDkzMjtcbmNvbnN0IHJhZGl1cyA9IHdpZHRoIC8gOTtcblxuLy9hcmMgZnVuY3Rpb25cblxuY29uc3QgYXJjID0gZDMuYXJjKClcbiAgLnN0YXJ0QW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MDtcbiAgfSlcbiAgLmVuZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDE7XG4gIH0pXG4gIC5wYWRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1pbigoZC54MSAtIGQueDApIC8gMiwgMC4wMDUpO1xuICB9KVxuICAucGFkUmFkaXVzKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmFkaXVzICogMS41O1xuICB9KVxuICAuaW5uZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICAvLyByZXR1cm4gMztcbiAgICByZXR1cm4gZC55MCAqIHJhZGl1cztcbiAgfSlcbiAgLm91dGVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KGQueTAgKiByYWRpdXMsIGQueTEgKiByYWRpdXMgLSAxKTtcbiAgfSk7XG5cbi8vcGFydGl0aW9uIGZ1bmN0aW9uXG5cbmNvbnN0IHBhcnRpdGlvbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGNvbnN0IHJvb3QgPSBkMy5oaWVyYXJjaHkoZGF0YSlcbiAgICAuc3VtKGZ1bmN0aW9uIChkKSB7XG4gICAgICAvL3RoaXMgb25seSBzdW1zIHRoZSBsZWF2ZXMsIHdoaWNoIGhhdmUgYSB2YWx1ZSBhdHRyaWJ1dGVcbiAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgfSlcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIChiLnZhbHVlIC0gYS52YWx1ZSk7XG4gICAgfSlcbiAgLy8gY29uc29sZS5sb2cocm9vdCk7XG4gIHJldHVybiBkMy5wYXJ0aXRpb24oKVxuICAgIC5zaXplKFsyICogTWF0aC5QSSwgcm9vdC5oZWlnaHQgKyAxXSlcbiAgICAocm9vdCk7XG59XG5cblxuLy9JIGdldCBteSBqc29uIGRhdGEgaW50byBhbiBvYmplY3QgaW4gdGhpcyBmdW5jdGlvbjpcblxudmFyIGRhdGFzZXQgPSBkMy5qc29uKCcvZGF0YS9kaWV0X2RhdGEuanNvbicpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGE7XG59KTtcblxuZGF0YXNldC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgLy9BbGwgY29kZSB0byBkbyB2aXN1YWxpemF0aW9uIGdvZXMgaW5zaWRlIG9mIHRoaXMgY2FsbGJhY2tcblxuICAvL2dlbmVyYXRlIHJvb3QgXG4gIGNvbnN0IHJvb3QgPSBwYXJ0aXRpb24oZGF0YSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcblxuICAvL3NldCBjdXJyZW50IGF0dHJpYnV0ZVxuICByb290LmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBkLmN1cnJlbnQgPSBkO1xuICB9KTtcbiAgLy9jb25zb2xlLmxvZyhyb290LmRlc2NlbmRhbnRzKCkpO1xuXG4gIC8vY29sb3JcblxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBkYXRhLmNoaWxkcmVuLmxlbmd0aCArIDEpKTtcblxuICAvL3JlZmFjdG9yaW5nIHRoZSBjb2xvciBtZXRob2RcblxuICAvL0kgd2FudCB0aGUgY29sb3IgdG8gYmUgaW50ZXJwb2xhdGVkIHVzaW5nIGEgbGlzdCBvZiB1bmlxdWUgbmFtZXMuXG5cbiAgLy9IZXJlIEkgd2lsbCBtYWtlIGEgbGlzdCBvZiB1bmlxdWUgbmFtZXM6XG5cbiAgY29uc3QgbmFtZXMgPSBbXTtcblxuICByb290LmRlc2NlbmRhbnRzKCkuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgaWYgKG5hbWVzLmluZGV4T2YoZC5kYXRhLm5hbWUpID09PSAtMSkge1xuICAgICAgbmFtZXMucHVzaChkLmRhdGEubmFtZSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgICBuYW1lcy5sZW5ndGgpKTtcblxuICBjb25zb2xlLmxvZyhuYW1lcyk7XG5cbiAgLy9JIHdhbnQgdG8gaW50ZXJwb2xhdGUgdGhlIHdob2xlIHJhaW5ib3cgYXQgZWFjaCBoZWlnaHQgaW4gdGhlIGhlaXJhcmNoeVxuXG4gIC8vSSBhbHNvIHdhbnQgXG5cblxuICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjY2hhcnRcIilcbiAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG4gICAgLnN0eWxlKFwiZm9udFwiLCBcIjEwcHggc2Fucy1zZXJpZlwiKTtcblxuICBjb25zdCBnID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHt3aWR0aCAvIDJ9KWApO1xuXG4gIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcImdcIilcbiAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKSlcbiAgICAuam9pbihcInBhdGhcIilcbiAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vIHdoaWxlIChkLmRlcHRoID4gMSkgeyBkID0gZC5wYXJlbnQ7IH1cbiAgICAgIGNvbnNvbGUubG9nKGQuZGF0YS5uYW1lKTtcbiAgICAgIHJldHVybiBjb2xvcihuYW1lcy5pbmRleE9mKGQuZGF0YS5uYW1lKSk7XG4gICAgfSlcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGFyYyhkLmN1cnJlbnQpO1xuICAgIH0pO1xuXG5cbiAgLy9cblxufSk7XG4gICAgXG4iXSwic291cmNlUm9vdCI6IiJ9