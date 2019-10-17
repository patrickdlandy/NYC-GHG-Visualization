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

  var color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1)); //refactoring the color method

  console.log(names); //I want the color to be interpolated using a list of unique names.
  //Here I will make a list of unique names:

  var names = [];
  var svg = d3.select("#chart").style("width", "100%").style("height", "auto").style("font", "10px sans-serif");
  var g = svg.append("g").attr("transform", "translate(".concat(width / 2, ", ").concat(width / 2, ")"));
  var path = g.append("g").selectAll("path").data(root.descendants()).join("path").attr("fill", function (d) {
    while (d.depth > 1) {
      d = d.parent;
    }

    return color(d.data.name);
  }).attr("fill-opacity", 1).attr("d", function (d) {
    return arc(d.current);
  }); //
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpZHRoIiwiaGVpZ2h0IiwicmFkaXVzIiwiYXJjIiwiZDMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJjb25zb2xlIiwibG9nIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJzaXplIiwiUEkiLCJkYXRhc2V0IiwianNvbiIsInRoZW4iLCJlYWNoIiwiY3VycmVudCIsImNvbG9yIiwic2NhbGVPcmRpbmFsIiwicmFuZ2UiLCJxdWFudGl6ZSIsImludGVycG9sYXRlUmFpbmJvdyIsImNoaWxkcmVuIiwibGVuZ3RoIiwibmFtZXMiLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsImciLCJhcHBlbmQiLCJhdHRyIiwicGF0aCIsInNlbGVjdEFsbCIsImRlc2NlbmRhbnRzIiwiam9pbiIsImRlcHRoIiwicGFyZW50IiwibmFtZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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LENBQU9xQyxJQUFSLENBQVo7QUFDRCxHQVBVLEVBUVZQLElBUlUsQ0FRTCxjQVJLLEVBUVcsQ0FSWCxFQVNWQSxJQVRVLENBU0wsR0FUSyxFQVNBLFVBQVU1QyxDQUFWLEVBQWE7QUFDdEIsV0FBT0gsR0FBRyxDQUFDRyxDQUFDLENBQUM4QixPQUFILENBQVY7QUFDRCxHQVhVLENBQWIsQ0F2QzJCLENBcUQzQjtBQUVELENBdkRELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbn0pXG5cbi8vZXZlcnl0aGluZyBpcyBidW5kbGVkIGludG8gbWFpbi5qcyBieSB3ZWJwYWNrIGFuZCB3ZSBqdXN0IGluY2x1ZGUgYSBsaW5rIHRvIFwibWFpblwiXG5cbi8vTXkgRDMgQ29kZSBoZXJlOlxuXG4vL3NvbWUgY29uc3RhbnRzIGZvciBkaW1lbnNpb25zOlxuY29uc3Qgd2lkdGggPSA5MzI7XG5jb25zdCBoZWlnaHQgPSA5MzI7XG5jb25zdCByYWRpdXMgPSB3aWR0aCAvIDk7XG5cbi8vYXJjIGZ1bmN0aW9uXG5cbmNvbnN0IGFyYyA9IGQzLmFyYygpXG4gIC5zdGFydEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDA7XG4gIH0pXG4gIC5lbmRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngxO1xuICB9KVxuICAucGFkQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oKGQueDEgLSBkLngwKSAvIDIsIDAuMDA1KTtcbiAgfSlcbiAgLnBhZFJhZGl1cyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJhZGl1cyAqIDEuNTtcbiAgfSlcbiAgLmlubmVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgLy8gcmV0dXJuIDM7XG4gICAgcmV0dXJuIGQueTAgKiByYWRpdXM7XG4gIH0pXG4gIC5vdXRlclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1heChkLnkwICogcmFkaXVzLCBkLnkxICogcmFkaXVzIC0gMSk7XG4gIH0pO1xuXG4vL3BhcnRpdGlvbiBmdW5jdGlvblxuXG5jb25zdCBwYXJ0aXRpb24gPSBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25zdCByb290ID0gZDMuaGllcmFyY2h5KGRhdGEpXG4gICAgLnN1bShmdW5jdGlvbiAoZCkge1xuICAgICAgLy90aGlzIG9ubHkgc3VtcyB0aGUgbGVhdmVzLCB3aGljaCBoYXZlIGEgdmFsdWUgYXR0cmlidXRlXG4gICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIH0pXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiAoYi52YWx1ZSAtIGEudmFsdWUpO1xuICAgIH0pXG4gIC8vIGNvbnNvbGUubG9nKHJvb3QpO1xuICByZXR1cm4gZDMucGFydGl0aW9uKClcbiAgICAuc2l6ZShbMiAqIE1hdGguUEksIHJvb3QuaGVpZ2h0ICsgMV0pXG4gICAgKHJvb3QpO1xufVxuXG5cbi8vSSBnZXQgbXkganNvbiBkYXRhIGludG8gYW4gb2JqZWN0IGluIHRoaXMgZnVuY3Rpb246XG5cbnZhciBkYXRhc2V0ID0gZDMuanNvbignL2RhdGEvZGlldF9kYXRhLmpzb24nKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIHJldHVybiBkYXRhO1xufSk7XG5cbmRhdGFzZXQudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAvLyBjb25zb2xlLmxvZyhkYXRhKVxuXG4gIC8vQWxsIGNvZGUgdG8gZG8gdmlzdWFsaXphdGlvbiBnb2VzIGluc2lkZSBvZiB0aGlzIGNhbGxiYWNrXG5cbiAgLy9nZW5lcmF0ZSByb290IFxuICBjb25zdCByb290ID0gcGFydGl0aW9uKGRhdGEpO1xuICAvL2NvbnNvbGUubG9nKHJvb3QuZGVzY2VuZGFudHMoKSk7XG5cbiAgLy9zZXQgY3VycmVudCBhdHRyaWJ1dGVcbiAgcm9vdC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgZC5jdXJyZW50ID0gZDtcbiAgfSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcblxuICAvL2NvbG9yXG5cbiAgY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gICAgZGF0YS5jaGlsZHJlbi5sZW5ndGggKyAxKSk7XG5cbiAgLy9yZWZhY3RvcmluZyB0aGUgY29sb3IgbWV0aG9kXG5cbiAgY29uc29sZS5sb2cobmFtZXMpO1xuXG4gIC8vSSB3YW50IHRoZSBjb2xvciB0byBiZSBpbnRlcnBvbGF0ZWQgdXNpbmcgYSBsaXN0IG9mIHVuaXF1ZSBuYW1lcy5cblxuICAvL0hlcmUgSSB3aWxsIG1ha2UgYSBsaXN0IG9mIHVuaXF1ZSBuYW1lczpcblxuICBjb25zdCBuYW1lcyA9IFtdO1xuXG5cbiAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI2NoYXJ0XCIpXG4gICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgIC5zdHlsZShcImZvbnRcIiwgXCIxMHB4IHNhbnMtc2VyaWZcIik7XG5cbiAgY29uc3QgZyA9IHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3dpZHRoIC8gMn0sICR7d2lkdGggLyAyfSlgKTtcblxuICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAuZGF0YShyb290LmRlc2NlbmRhbnRzKCkpXG4gICAgLmpvaW4oXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICB3aGlsZSAoZC5kZXB0aCA+IDEpIHsgZCA9IGQucGFyZW50OyB9XG4gICAgICByZXR1cm4gY29sb3IoZC5kYXRhLm5hbWUpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgICAuYXR0cihcImRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBhcmMoZC5jdXJyZW50KTtcbiAgICB9KTtcblxuXG4gIC8vXG5cbn0pO1xuICAgIFxuIl0sInNvdXJjZVJvb3QiOiIifQ==