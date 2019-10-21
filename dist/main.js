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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);

document.addEventListener("DOMContentLoaded", function () {
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
    }); // console.log(root.data.name);

    return d3.partition().size([2 * Math.PI, root.height + 1])(root);
  }; //I get my json data into an object in this function:


  var dataset = d3.json('./data/diet_data.json').then(function (data) {
    return data;
  });
  dataset.then(function (data) {
    // console.log(data)
    //All code to do visualization goes inside of this callback
    //generate root 
    var root = partition(data);
    console.log(root); //set current attribute

    root.each(function (d) {
      d.current = d;
      d.fraction = d.value / root.value;
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
      }).reverse().slice(1).join(": "), " \n ").concat(format(d.value), " tCO2e \n ").concat(d3.format(".1%")(d.fraction));
    });
    var chartlabel = g.append("text").attr("text-anchor", "middle").attr("fill-opacity", 1).text(function () {
      return "".concat(root.data.name, " \n ").concat(format(root.value), " tCO2e");
    }); //add dataset title to nav bar

    var nav_title = root.data.name;
    document.getElementById("nav-title").innerHTML = nav_title;
  });
});

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb3JtYXQiLCJkMyIsIndpZHRoIiwiaGVpZ2h0IiwicmFkaXVzIiwiYXJjIiwic3RhcnRBbmdsZSIsImQiLCJ4MCIsImVuZEFuZ2xlIiwieDEiLCJwYWRBbmdsZSIsIk1hdGgiLCJtaW4iLCJwYWRSYWRpdXMiLCJpbm5lclJhZGl1cyIsInkwIiwib3V0ZXJSYWRpdXMiLCJtYXgiLCJ5MSIsInBhcnRpdGlvbiIsImRhdGEiLCJyb290IiwiaGllcmFyY2h5Iiwic3VtIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJzaXplIiwiUEkiLCJkYXRhc2V0IiwianNvbiIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZWFjaCIsImN1cnJlbnQiLCJmcmFjdGlvbiIsIm5hbWVzIiwiaGVpZ2h0cyIsIm5hbWVzX2J5X2hlaWdodCIsImRlc2NlbmRhbnRzIiwiZm9yRWFjaCIsImluZGV4T2YiLCJwdXNoIiwibmFtZSIsImNvbG9ycyIsImgiLCJzY2FsZU9yZGluYWwiLCJyYW5nZSIsInF1YW50aXplIiwiaW50ZXJwb2xhdGVSYWluYm93IiwibGVuZ3RoIiwib3BhY2l0eV9ieV9oZWlnaHQiLCJvcGFjaXR5X21pbiIsIm9wYWNpdHlfbWF4Iiwic3RlcHMiLCJvcGFjaXRpZXMiLCJkb21haW4iLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsImciLCJhcHBlbmQiLCJhdHRyIiwicGF0aCIsInNlbGVjdEFsbCIsImpvaW4iLCJ0ZXh0IiwiYW5jZXN0b3JzIiwibWFwIiwicmV2ZXJzZSIsInNsaWNlIiwiY2hhcnRsYWJlbCIsIm5hdl90aXRsZSIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7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RUFDQ0ssSUFERCxDQUNNLFVBQVM5RCxDQUFULEVBQVk7QUFDaEIsdUJBQ0VBLENBQUMsQ0FBQytELFNBQUYsR0FDQ0MsR0FERCxDQUNLLFVBQVNoRSxDQUFULEVBQVk7QUFDZixlQUFPQSxDQUFDLENBQUNjLElBQUYsQ0FBT3lCLElBQWQ7QUFDRCxPQUhELEVBSUMwQixPQUpELEdBS0NDLEtBTEQsQ0FLTyxDQUxQLEVBTUNMLElBTkQsQ0FNTSxJQU5OLENBREYsaUJBU0VwRSxNQUFNLENBQUNPLENBQUMsQ0FBQ2tCLEtBQUgsQ0FUUix1QkFXRXhCLEVBQUUsQ0FBQ0QsTUFBSCxDQUFVLEtBQVYsRUFBaUJPLENBQUMsQ0FBQytCLFFBQW5CLENBWEY7QUFhQyxLQWZIO0FBaUJBLFFBQU1vQyxVQUFVLEdBQUdYLENBQUMsQ0FBQ0MsTUFBRixDQUFTLE1BQVQsRUFDbEJDLElBRGtCLENBQ2IsYUFEYSxFQUNFLFFBREYsRUFFbEJBLElBRmtCLENBRWIsY0FGYSxFQUVHLENBRkgsRUFHbEJJLElBSGtCLENBR2IsWUFBVztBQUNmLHVCQUFVL0MsSUFBSSxDQUFDRCxJQUFMLENBQVV5QixJQUFwQixpQkFBK0I5QyxNQUFNLENBQUNzQixJQUFJLENBQUNHLEtBQU4sQ0FBckM7QUFDRCxLQUxrQixDQUFuQixDQXBIMkIsQ0EySDNCOztBQUNBLFFBQUlrRCxTQUFTLEdBQUdyRCxJQUFJLENBQUNELElBQUwsQ0FBVXlCLElBQTFCO0FBQ0FoRCxZQUFRLENBQUM4RSxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxTQUFyQyxHQUFpREYsU0FBakQ7QUFDRCxHQTlIRDtBQWdJRCxDQS9MRCxFOzs7Ozs7Ozs7OztBQ0hBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgXG4gIC8vZXZlcnl0aGluZyBpcyBidW5kbGVkIGludG8gbWFpbi5qcyBieSB3ZWJwYWNrIGFuZCB3ZSBqdXN0IGluY2x1ZGUgYSBsaW5rIHRvIFwibWFpblwiXG4gIFxuICAvL015IEQzIENvZGUgaGVyZTpcbiAgXG4gIGNvbnN0IGZvcm1hdCA9IGQzLmZvcm1hdChcIixkXCIpO1xuICBcbiAgLy9zb21lIGNvbnN0YW50cyBmb3IgZGltZW5zaW9uczpcbiAgY29uc3Qgd2lkdGggPSA5MzI7XG4gIGNvbnN0IGhlaWdodCA9IDkzMjtcbiAgY29uc3QgcmFkaXVzID0gd2lkdGggLyA5O1xuICBcbiAgLy9hcmMgZnVuY3Rpb25cbiAgXG4gIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gIC5zdGFydEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDA7XG4gIH0pXG4gIC5lbmRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngxO1xuICB9KVxuICAucGFkQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oKGQueDEgLSBkLngwKSAvIDIsIDAuMDA1KTtcbiAgfSlcbiAgLnBhZFJhZGl1cyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJhZGl1cyAqIDEuNTtcbiAgfSlcbiAgLmlubmVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgLy8gcmV0dXJuIDM7XG4gICAgcmV0dXJuIGQueTAgKiByYWRpdXM7XG4gIH0pXG4gIC5vdXRlclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1heChkLnkwICogcmFkaXVzLCBkLnkxICogcmFkaXVzIC0gMSk7XG4gIH0pO1xuICBcbiAgLy9wYXJ0aXRpb24gZnVuY3Rpb25cbiAgXG4gIGNvbnN0IHBhcnRpdGlvbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgY29uc3Qgcm9vdCA9IGQzLmhpZXJhcmNoeShkYXRhKVxuICAgIC5zdW0oZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vdGhpcyBvbmx5IHN1bXMgdGhlIGxlYXZlcywgd2hpY2ggaGF2ZSBhIHZhbHVlIGF0dHJpYnV0ZVxuICAgICAgLy8gY29uc29sZS5sb2coZCk7XG4gICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICB9KVxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gKGIudmFsdWUgLSBhLnZhbHVlKTtcbiAgICB9KVxuICAgIC8vIGNvbnNvbGUubG9nKHJvb3QuZGF0YS5uYW1lKTtcbiAgICByZXR1cm4gZDMucGFydGl0aW9uKClcbiAgICAuc2l6ZShbMiAqIE1hdGguUEksIHJvb3QuaGVpZ2h0ICsgMV0pXG4gICAgKHJvb3QpO1xuICB9XG5cbiAgXG5cbiAgLy9JIGdldCBteSBqc29uIGRhdGEgaW50byBhbiBvYmplY3QgaW4gdGhpcyBmdW5jdGlvbjpcblxuICB2YXIgZGF0YXNldCA9IGQzLmpzb24oJy4vZGF0YS9kaWV0X2RhdGEuanNvbicpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSk7XG5cbiAgZGF0YXNldC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpXG4gIFxuICAvL0FsbCBjb2RlIHRvIGRvIHZpc3VhbGl6YXRpb24gZ29lcyBpbnNpZGUgb2YgdGhpcyBjYWxsYmFja1xuICBcbiAgLy9nZW5lcmF0ZSByb290IFxuICBjb25zdCByb290ID0gcGFydGl0aW9uKGRhdGEpO1xuICBjb25zb2xlLmxvZyhyb290KTtcbiAgXG4gIC8vc2V0IGN1cnJlbnQgYXR0cmlidXRlXG4gIHJvb3QuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgIGQuY3VycmVudCA9IGQ7XG4gICAgZC5mcmFjdGlvbiA9IGQudmFsdWUgLyByb290LnZhbHVlO1xuICB9KTtcbiAgLy9jb25zb2xlLmxvZyhyb290LmRlc2NlbmRhbnRzKCkpO1xuICBcbiAgLy9jb2xvciAoT0xEKVxuICBcbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgZGF0YS5jaGlsZHJlbi5sZW5ndGggKyAxKSk7XG4gIFxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBuYW1lcy5sZW5ndGgpKTtcbiAgXG4gIC8vcmVmYWN0b3JpbmcgdGhlIGNvbG9yIG1ldGhvZFxuICBcbiAgY29uc3QgbmFtZXMgPSBbXTtcbiAgY29uc3QgaGVpZ2h0cyA9IFtdO1xuICBjb25zdCBuYW1lc19ieV9oZWlnaHQgPSB7fTtcbiAgXG4gIHJvb3QuZGVzY2VuZGFudHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICBpZiAoaGVpZ2h0cy5pbmRleE9mKGQuaGVpZ2h0KSA9PT0gLTEgKSB7XG4gICAgICBoZWlnaHRzLnB1c2goZC5oZWlnaHQpO1xuICAgICAgbmFtZXNfYnlfaGVpZ2h0W2QuaGVpZ2h0XSA9IFtdO1xuICAgIH1cbiAgICBpZiAobmFtZXMuaW5kZXhPZihkLmRhdGEubmFtZSkgPT09IC0xKSB7XG4gICAgICBuYW1lcy5wdXNoKGQuZGF0YS5uYW1lKTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0ucHVzaChkLmRhdGEubmFtZSk7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIGNvbnNvbGUubG9nKG5hbWVzKTtcbiAgLy8gY29uc29sZS5sb2coaGVpZ2h0cyk7XG4gIC8vIGNvbnNvbGUubG9nKG5hbWVzX2J5X2hlaWdodCk7XG4gIFxuICAvL0ludGVycG9sYXRlIHRoZSB3aG9sZSByYWluYm93IGF0IGVhY2ggaGVpZ2h0IGluIHRoZSBoZWlyYXJjaHlcbiAgXG4gIGNvbnN0IGNvbG9ycyA9IHt9O1xuICBcbiAgaGVpZ2h0cy5mb3JFYWNoKCBmdW5jdGlvbihoKSB7XG4gICAgY29sb3JzW2hdID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LFxuICAgICAgbmFtZXNfYnlfaGVpZ2h0W2hdLmxlbmd0aCArIDEpKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0kgYWxzbyB3YW50IHRvIHZhcnkgb3BhY2l0eSBieSBoZWlnaHRcbiAgICBcbiAgICBjb25zdCBvcGFjaXR5X2J5X2hlaWdodCA9IHt9XG4gICAgY29uc3Qgb3BhY2l0eV9taW4gPSAuNDtcbiAgICBjb25zdCBvcGFjaXR5X21heCA9IDE7XG4gICAgY29uc3Qgc3RlcHMgPSBoZWlnaHRzLmxlbmd0aDtcbiAgICBcbiAgICAvLyBjb25zdCBvcGFjaXRpZXMgPSBkMy5pbnRlcnBvbGF0ZU51bWJlcihvcGFjaXR5X21heCwgb3BhY2l0eV9taW4pO1xuICAgIFxuICAgIGNvbnN0IG9wYWNpdGllcyA9IGQzLnNjYWxlT3JkaW5hbCgpXG4gICAgLmRvbWFpbihoZWlnaHRzKVxuICAgICAgLnJhbmdlKGQzLnJhbmdlKG9wYWNpdHlfbWF4LCBvcGFjaXR5X21pbiwgLTEgKiAob3BhY2l0eV9tYXggLSBvcGFjaXR5X21pbikvc3RlcHMpKTtcblxuICAgICAgXG4gICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjY2hhcnRcIilcbiAgICAgIC8vIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgICAgLnN0eWxlKFwiZm9udFwiLCBcIjEwcHggc2Fucy1zZXJpZlwiKTtcbiAgICAgIFxuICAgICAgY29uc3QgZyA9IHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHt3aWR0aCAvIDJ9KWApO1xuICAgICAgXG4gICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgLmRhdGEocm9vdC5kZXNjZW5kYW50cygpKVxuICAgICAgLmpvaW4oXCJwYXRoXCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gd2hpbGUgKGQuZGVwdGggPiAxKSB7IGQgPSBkLnBhcmVudDsgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkLmRhdGEpO1xuICAgICAgLy8gY29uc29sZS5sb2coZC5oZWlnaHQpO1xuICAgICAgcmV0dXJuIGNvbG9yc1tkLmhlaWdodF0obmFtZXNfYnlfaGVpZ2h0W2QuaGVpZ2h0XS5pbmRleE9mKGQuZGF0YS5uYW1lKSk7XG4gICAgfSlcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICBpZiAoZC5oZWlnaHQgPT09IE1hdGgubWF4KC4uLmhlaWdodHMpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHsgXG4gICAgICAgIHJldHVybiBvcGFjaXRpZXMoZC5oZWlnaHQpXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmF0dHIoXCJkXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gYXJjKGQuY3VycmVudCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9BZGQgdGl0bGUgZWxlbWVudHMgdG8gZWFjaCBwYXRoXG4gICAgXG4gICAgcGF0aC5hcHBlbmQoXCJ0aXRsZVwiKVxuICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBgJHtcbiAgICAgICAgZC5hbmNlc3RvcnMoKVxuICAgICAgICAubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5kYXRhLm5hbWU7XG4gICAgICAgIH0pXG4gICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgLnNsaWNlKDEpXG4gICAgICAgIC5qb2luKFwiOiBcIilcbiAgICAgIH0gXFxuICR7XG4gICAgICAgIGZvcm1hdChkLnZhbHVlKVxuICAgICAgfSB0Q08yZSBcXG4gJHtcbiAgICAgICAgZDMuZm9ybWF0KFwiLjElXCIpKGQuZnJhY3Rpb24pXG4gICAgICAgIH1gO1xuICAgICAgfSk7XG4gICAgICBcbiAgICBjb25zdCBjaGFydGxhYmVsID0gZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIDEpXG4gICAgLnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYCR7cm9vdC5kYXRhLm5hbWV9IFxcbiAke2Zvcm1hdChyb290LnZhbHVlKX0gdENPMmVgO1xuICAgIH0pO1xuICAgIFxuICAgIC8vYWRkIGRhdGFzZXQgdGl0bGUgdG8gbmF2IGJhclxuICAgIHZhciBuYXZfdGl0bGUgPSByb290LmRhdGEubmFtZTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10aXRsZVwiKS5pbm5lckhUTUwgPSBuYXZfdGl0bGU7XG4gIH0pO1xuICBcbn0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=