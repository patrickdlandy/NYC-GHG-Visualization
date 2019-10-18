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


var dataset = d3.json('/data/data.json').then(function (data) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpZHRoIiwiaGVpZ2h0IiwicmFkaXVzIiwiYXJjIiwiZDMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJjb25zb2xlIiwibG9nIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJzaXplIiwiUEkiLCJkYXRhc2V0IiwianNvbiIsInRoZW4iLCJlYWNoIiwiY3VycmVudCIsIm5hbWVzIiwiaGVpZ2h0cyIsIm5hbWVzX2J5X2hlaWdodCIsImRlc2NlbmRhbnRzIiwiZm9yRWFjaCIsImluZGV4T2YiLCJwdXNoIiwibmFtZSIsImNvbG9ycyIsImgiLCJzY2FsZU9yZGluYWwiLCJyYW5nZSIsInF1YW50aXplIiwiaW50ZXJwb2xhdGVSYWluYm93IiwibGVuZ3RoIiwib3BhY2l0eV9ieV9oZWlnaHQiLCJvcGFjaXR5X21pbiIsIm9wYWNpdHlfbWF4Iiwic3ZnIiwic2VsZWN0Iiwic3R5bGUiLCJnIiwiYXBwZW5kIiwiYXR0ciIsInBhdGgiLCJzZWxlY3RBbGwiLCJqb2luIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNB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R0FWSyxFQVVBLFVBQVV0RCxDQUFWLEVBQWE7QUFDdEIsV0FBT0gsR0FBRyxDQUFDRyxDQUFDLENBQUM4QixPQUFILENBQVY7QUFDRCxHQVpVLENBQWIsQ0F2RTJCLENBc0YzQjtBQUVELENBeEZELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbn0pXG5cbi8vZXZlcnl0aGluZyBpcyBidW5kbGVkIGludG8gbWFpbi5qcyBieSB3ZWJwYWNrIGFuZCB3ZSBqdXN0IGluY2x1ZGUgYSBsaW5rIHRvIFwibWFpblwiXG5cbi8vTXkgRDMgQ29kZSBoZXJlOlxuXG4vL3NvbWUgY29uc3RhbnRzIGZvciBkaW1lbnNpb25zOlxuY29uc3Qgd2lkdGggPSA5MzI7XG5jb25zdCBoZWlnaHQgPSA5MzI7XG5jb25zdCByYWRpdXMgPSB3aWR0aCAvIDk7XG5cbi8vYXJjIGZ1bmN0aW9uXG5cbmNvbnN0IGFyYyA9IGQzLmFyYygpXG4gIC5zdGFydEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDA7XG4gIH0pXG4gIC5lbmRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngxO1xuICB9KVxuICAucGFkQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oKGQueDEgLSBkLngwKSAvIDIsIDAuMDA1KTtcbiAgfSlcbiAgLnBhZFJhZGl1cyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJhZGl1cyAqIDEuNTtcbiAgfSlcbiAgLmlubmVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgLy8gcmV0dXJuIDM7XG4gICAgcmV0dXJuIGQueTAgKiByYWRpdXM7XG4gIH0pXG4gIC5vdXRlclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1heChkLnkwICogcmFkaXVzLCBkLnkxICogcmFkaXVzIC0gMSk7XG4gIH0pO1xuXG4vL3BhcnRpdGlvbiBmdW5jdGlvblxuXG5jb25zdCBwYXJ0aXRpb24gPSBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25zdCByb290ID0gZDMuaGllcmFyY2h5KGRhdGEpXG4gICAgLnN1bShmdW5jdGlvbiAoZCkge1xuICAgICAgLy90aGlzIG9ubHkgc3VtcyB0aGUgbGVhdmVzLCB3aGljaCBoYXZlIGEgdmFsdWUgYXR0cmlidXRlXG4gICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIH0pXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiAoYi52YWx1ZSAtIGEudmFsdWUpO1xuICAgIH0pXG4gIC8vIGNvbnNvbGUubG9nKHJvb3QpO1xuICByZXR1cm4gZDMucGFydGl0aW9uKClcbiAgICAuc2l6ZShbMiAqIE1hdGguUEksIHJvb3QuaGVpZ2h0ICsgMV0pXG4gICAgKHJvb3QpO1xufVxuXG5cbi8vSSBnZXQgbXkganNvbiBkYXRhIGludG8gYW4gb2JqZWN0IGluIHRoaXMgZnVuY3Rpb246XG5cbnZhciBkYXRhc2V0ID0gZDMuanNvbignL2RhdGEvZGF0YS5qc29uJykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICByZXR1cm4gZGF0YTtcbn0pO1xuXG5kYXRhc2V0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgLy8gY29uc29sZS5sb2coZGF0YSlcblxuICAvL0FsbCBjb2RlIHRvIGRvIHZpc3VhbGl6YXRpb24gZ29lcyBpbnNpZGUgb2YgdGhpcyBjYWxsYmFja1xuXG4gIC8vZ2VuZXJhdGUgcm9vdCBcbiAgY29uc3Qgcm9vdCA9IHBhcnRpdGlvbihkYXRhKTtcbiAgLy9jb25zb2xlLmxvZyhyb290LmRlc2NlbmRhbnRzKCkpO1xuXG4gIC8vc2V0IGN1cnJlbnQgYXR0cmlidXRlXG4gIHJvb3QuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgIGQuY3VycmVudCA9IGQ7XG4gIH0pO1xuICAvL2NvbnNvbGUubG9nKHJvb3QuZGVzY2VuZGFudHMoKSk7XG5cbiAgLy9jb2xvciAoT0xEKVxuXG4gIC8vIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LFxuICAvLyAgIGRhdGEuY2hpbGRyZW4ubGVuZ3RoICsgMSkpO1xuXG4gIC8vIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LFxuICAvLyAgIG5hbWVzLmxlbmd0aCkpO1xuXG4gIC8vcmVmYWN0b3JpbmcgdGhlIGNvbG9yIG1ldGhvZFxuXG4gIGNvbnN0IG5hbWVzID0gW107XG4gIGNvbnN0IGhlaWdodHMgPSBbXTtcbiAgY29uc3QgbmFtZXNfYnlfaGVpZ2h0ID0ge307XG5cbiAgcm9vdC5kZXNjZW5kYW50cygpLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgIGlmIChoZWlnaHRzLmluZGV4T2YoZC5oZWlnaHQpID09PSAtMSApIHtcbiAgICAgIGhlaWdodHMucHVzaChkLmhlaWdodCk7XG4gICAgICBuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdID0gW107XG4gICAgfVxuICAgIGlmIChuYW1lcy5pbmRleE9mKGQuZGF0YS5uYW1lKSA9PT0gLTEpIHtcbiAgICAgIG5hbWVzLnB1c2goZC5kYXRhLm5hbWUpO1xuICAgICAgbmFtZXNfYnlfaGVpZ2h0W2QuaGVpZ2h0XS5wdXNoKGQuZGF0YS5uYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGNvbnNvbGUubG9nKG5hbWVzKTtcbiAgLy8gY29uc29sZS5sb2coaGVpZ2h0cyk7XG4gIC8vIGNvbnNvbGUubG9nKG5hbWVzX2J5X2hlaWdodCk7XG5cbiAgLy9JbnRlcnBvbGF0ZSB0aGUgd2hvbGUgcmFpbmJvdyBhdCBlYWNoIGhlaWdodCBpbiB0aGUgaGVpcmFyY2h5XG5cbiAgY29uc3QgY29sb3JzID0ge307XG5cbiAgaGVpZ2h0cy5mb3JFYWNoKCBmdW5jdGlvbihoKSB7XG4gICAgY29sb3JzW2hdID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LFxuICAgICAgbmFtZXNfYnlfaGVpZ2h0W2hdLmxlbmd0aCArIDEpKTtcbiAgfSk7XG5cbiAgLy9JIGFsc28gd2FudCB0byB2YXJ5IG9wYWNpdHkgYnkgaGVpZ2h0XG5cbiAgY29uc3Qgb3BhY2l0eV9ieV9oZWlnaHQgPSB7fVxuICBjb25zdCBvcGFjaXR5X21pbiA9IC4zO1xuICBjb25zdCBvcGFjaXR5X21heCA9IDE7XG5cblxuXG5cblxuICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjY2hhcnRcIilcbiAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG4gICAgLnN0eWxlKFwiZm9udFwiLCBcIjEwcHggc2Fucy1zZXJpZlwiKTtcblxuICBjb25zdCBnID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHt3aWR0aCAvIDJ9KWApO1xuXG4gIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcImdcIilcbiAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKSlcbiAgICAuam9pbihcInBhdGhcIilcbiAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vIHdoaWxlIChkLmRlcHRoID4gMSkgeyBkID0gZC5wYXJlbnQ7IH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKGQuaGVpZ2h0KTtcbiAgICAgIHJldHVybiBjb2xvcnNbZC5oZWlnaHRdKG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0uaW5kZXhPZihkLmRhdGEubmFtZSkpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgICAuYXR0cihcImRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBhcmMoZC5jdXJyZW50KTtcbiAgICB9KTtcblxuXG4gIC8vXG5cbn0pO1xuICAgIFxuIl0sInNvdXJjZVJvb3QiOiIifQ==