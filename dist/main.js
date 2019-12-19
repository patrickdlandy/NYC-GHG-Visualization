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
  };

  var localData = {}; //I get my json data into an object in this function:

  var dataset = d3.json('./data/data.json').then(function (data) {
    localData = data; // console.log(localData);

    return data;
  }); // console.log(dataset); //this is a promise object

  var renderSunBurst = function renderSunBurst(data) {
    //might need to turn this back into a callback to get it to work
    //All code to do visualization goes inside of this function
    //generate root 
    // console.log(data);
    var root = partition(data); // console.log(root);
    //set current attribute

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
    // var nav_title = root.data.name;
    // document.getElementById("nav-title").innerHTML = nav_title;
  }; //dropdown code here


  var yearNavChildren = document.querySelectorAll(".nav-element-right a");
  console.log(yearNavChildren);

  for (var x = 0; x < yearNavChildren.length; x++) {
    console.log(yearNavChildren[x]);
    console.log(x);

    yearNavChildren[x].onclick = function () {
      var yearNav = this.parentNode.getElementsByClassName("year-navigator")[0];

      if (yearNav && yearNav.classList.contains("selected")) {
        yearNav.classList.remove("selected");
      } else if (yearNav) {
        yearNav.classList.add("selected");
      } else {
        this.parentNode.parentNode.classList.remove("selected");
      }

      if (this.innerHTML !== "Year ⌄") {
        console.log(this.innerHTML);
        renderChart(parseInt(this.innerHTML), 10);
      }
    };
  }

  var clearChart = function clearChart() {
    d3.selectAll("svg > *").remove();
  };

  var renderChart = function renderChart(year) {
    clearChart();
    console.log(localData.children[year - 2005]);
    renderSunBurst(localData.children[year - 2005]);
  }; //render sunBurst 


  dataset.then(function () {
    renderChart(2017);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz9kYzJhIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvcm1hdCIsImQzIiwid2lkdGgiLCJoZWlnaHQiLCJyYWRpdXMiLCJhcmMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsInNpemUiLCJQSSIsImxvY2FsRGF0YSIsImRhdGFzZXQiLCJqc29uIiwidGhlbiIsInJlbmRlclN1bkJ1cnN0IiwiZWFjaCIsImN1cnJlbnQiLCJmcmFjdGlvbiIsIm5hbWVzIiwiaGVpZ2h0cyIsIm5hbWVzX2J5X2hlaWdodCIsImRlc2NlbmRhbnRzIiwiZm9yRWFjaCIsImluZGV4T2YiLCJwdXNoIiwibmFtZSIsImNvbG9ycyIsImgiLCJzY2FsZU9yZGluYWwiLCJyYW5nZSIsInF1YW50aXplIiwiaW50ZXJwb2xhdGVSYWluYm93IiwibGVuZ3RoIiwib3BhY2l0eV9ieV9oZWlnaHQiLCJvcGFjaXR5X21pbiIsIm9wYWNpdHlfbWF4Iiwic3RlcHMiLCJvcGFjaXRpZXMiLCJkb21haW4iLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsImciLCJhcHBlbmQiLCJhdHRyIiwicGF0aCIsInNlbGVjdEFsbCIsImpvaW4iLCJ0ZXh0IiwiYW5jZXN0b3JzIiwibWFwIiwicmV2ZXJzZSIsInNsaWNlIiwiY2hhcnRsYWJlbCIsInllYXJOYXZDaGlsZHJlbiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb25zb2xlIiwibG9nIiwieCIsIm9uY2xpY2siLCJ5ZWFyTmF2IiwicGFyZW50Tm9kZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsImlubmVySFRNTCIsInJlbmRlckNoYXJ0IiwicGFyc2VJbnQiLCJjbGVhckNoYXJ0IiwieWVhciIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBO0FBQUE7QUFBQTtBQUFBO0FBRUFBLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQ7QUFFQTtBQUVBLE1BQU1DLE1BQU0sR0FBR0MsRUFBRSxDQUFDRCxNQUFILENBQVUsSUFBVixDQUFmLENBTGtELENBT2xEOztBQUNBLE1BQU1FLEtBQUssR0FBRyxHQUFkO0FBQ0EsTUFBTUMsTUFBTSxHQUFHLEdBQWY7QUFDQSxNQUFNQyxNQUFNLEdBQUdGLEtBQUss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QixNQUF4QjtBQUNELEdBRkQ7O0FBSUEsTUFBTUcsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBU0csSUFBVCxFQUFlO0FBQ2pDRCxjQUFVO0FBQ1ZkLFdBQU8sQ0FBQ0MsR0FBUixDQUFZL0MsU0FBUyxDQUFDOEQsUUFBVixDQUFtQkQsSUFBSSxHQUFHLElBQTFCLENBQVo7QUFDQXpELGtCQUFjLENBQUNKLFNBQVMsQ0FBQzhELFFBQVYsQ0FBbUJELElBQUksR0FBRyxJQUExQixDQUFELENBQWQ7QUFDRCxHQUpELENBL05rRCxDQXFPbEQ7OztBQUVBNUQsU0FBTyxDQUFDRSxJQUFSLENBQWEsWUFBVztBQUN0QnVELGVBQVcsQ0FBQyxJQUFELENBQVg7QUFDRCxHQUZEO0FBS0QsQ0E1T0QsRTs7Ozs7Ozs7Ozs7QUNIQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAvL2V2ZXJ5dGhpbmcgaXMgYnVuZGxlZCBpbnRvIG1haW4uanMgYnkgd2VicGFjayBhbmQgd2UganVzdCBpbmNsdWRlIGEgbGluayB0byBcIm1haW5cIlxuICBcbiAgLy9NeSBEMyBDb2RlIGhlcmU6XG4gIFxuICBjb25zdCBmb3JtYXQgPSBkMy5mb3JtYXQoXCIsZFwiKTtcbiAgXG4gIC8vc29tZSBjb25zdGFudHMgZm9yIGRpbWVuc2lvbnM6XG4gIGNvbnN0IHdpZHRoID0gOTMyO1xuICBjb25zdCBoZWlnaHQgPSA5MzI7XG4gIGNvbnN0IHJhZGl1cyA9IHdpZHRoIC8gOTtcbiAgXG4gIC8vYXJjIGZ1bmN0aW9uXG4gIFxuICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAuc3RhcnRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngwO1xuICB9KVxuICAuZW5kQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MTtcbiAgfSlcbiAgLnBhZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKChkLngxIC0gZC54MCkgLyAyLCAwLjAwNSk7XG4gIH0pXG4gIC5wYWRSYWRpdXMoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByYWRpdXMgKiAxLjU7XG4gIH0pXG4gIC5pbm5lclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIC8vIHJldHVybiAzO1xuICAgIHJldHVybiBkLnkwICogcmFkaXVzO1xuICB9KVxuICAub3V0ZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoZC55MCAqIHJhZGl1cywgZC55MSAqIHJhZGl1cyAtIDEpO1xuICB9KTtcbiAgXG4gIC8vcGFydGl0aW9uIGZ1bmN0aW9uXG4gIFxuICBjb25zdCBwYXJ0aXRpb24gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbnN0IHJvb3QgPSBkMy5oaWVyYXJjaHkoZGF0YSlcbiAgICAuc3VtKGZ1bmN0aW9uIChkKSB7XG4gICAgICAvL3RoaXMgb25seSBzdW1zIHRoZSBsZWF2ZXMsIHdoaWNoIGhhdmUgYSB2YWx1ZSBhdHRyaWJ1dGVcbiAgICAgIC8vIGNvbnNvbGUubG9nKGQpO1xuICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgfSlcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIChiLnZhbHVlIC0gYS52YWx1ZSk7XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmxvZyhyb290LmRhdGEubmFtZSk7XG4gICAgcmV0dXJuIGQzLnBhcnRpdGlvbigpXG4gICAgLnNpemUoWzIgKiBNYXRoLlBJLCByb290LmhlaWdodCArIDFdKVxuICAgIChyb290KTtcbiAgfVxuXG4gIGxldCBsb2NhbERhdGEgPSB7fTtcblxuICAvL0kgZ2V0IG15IGpzb24gZGF0YSBpbnRvIGFuIG9iamVjdCBpbiB0aGlzIGZ1bmN0aW9uOlxuXG4gIHZhciBkYXRhc2V0ID0gZDMuanNvbignLi9kYXRhL2RhdGEuanNvbicpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBsb2NhbERhdGEgPSBkYXRhO1xuICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsRGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0pO1xuXG4gIC8vIGNvbnNvbGUubG9nKGRhdGFzZXQpOyAvL3RoaXMgaXMgYSBwcm9taXNlIG9iamVjdFxuXG5cbiAgXG4gIGNvbnN0IHJlbmRlclN1bkJ1cnN0ID0gIGZ1bmN0aW9uKGRhdGEpIHtcbiAgLy9taWdodCBuZWVkIHRvIHR1cm4gdGhpcyBiYWNrIGludG8gYSBjYWxsYmFjayB0byBnZXQgaXQgdG8gd29ya1xuXG5cblxuICAvL0FsbCBjb2RlIHRvIGRvIHZpc3VhbGl6YXRpb24gZ29lcyBpbnNpZGUgb2YgdGhpcyBmdW5jdGlvblxuICBcbiAgLy9nZW5lcmF0ZSByb290IFxuICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgY29uc3Qgcm9vdCA9IHBhcnRpdGlvbihkYXRhKTtcbiAgLy8gY29uc29sZS5sb2cocm9vdCk7XG4gIFxuICAvL3NldCBjdXJyZW50IGF0dHJpYnV0ZVxuICByb290LmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBkLmN1cnJlbnQgPSBkO1xuICAgIGQuZnJhY3Rpb24gPSBkLnZhbHVlIC8gcm9vdC52YWx1ZTtcbiAgfSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcbiAgXG4gIC8vY29sb3IgKE9MRClcbiAgXG4gIC8vIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LFxuICAvLyAgIGRhdGEuY2hpbGRyZW4ubGVuZ3RoICsgMSkpO1xuICBcbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgbmFtZXMubGVuZ3RoKSk7XG4gIFxuICAvL3JlZmFjdG9yaW5nIHRoZSBjb2xvciBtZXRob2RcbiAgXG4gIGNvbnN0IG5hbWVzID0gW107XG4gIGNvbnN0IGhlaWdodHMgPSBbXTtcbiAgY29uc3QgbmFtZXNfYnlfaGVpZ2h0ID0ge307XG4gIFxuICByb290LmRlc2NlbmRhbnRzKCkuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgaWYgKGhlaWdodHMuaW5kZXhPZihkLmhlaWdodCkgPT09IC0xICkge1xuICAgICAgaGVpZ2h0cy5wdXNoKGQuaGVpZ2h0KTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0gPSBbXTtcbiAgICB9XG4gICAgaWYgKG5hbWVzLmluZGV4T2YoZC5kYXRhLm5hbWUpID09PSAtMSkge1xuICAgICAgbmFtZXMucHVzaChkLmRhdGEubmFtZSk7XG4gICAgICBuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLnB1c2goZC5kYXRhLm5hbWUpO1xuICAgIH1cbiAgfSk7XG4gIFxuICAvLyBjb25zb2xlLmxvZyhuYW1lcyk7XG4gIC8vIGNvbnNvbGUubG9nKGhlaWdodHMpO1xuICAvLyBjb25zb2xlLmxvZyhuYW1lc19ieV9oZWlnaHQpO1xuICBcbiAgLy9JbnRlcnBvbGF0ZSB0aGUgd2hvbGUgcmFpbmJvdyBhdCBlYWNoIGhlaWdodCBpbiB0aGUgaGVpcmFyY2h5XG4gIFxuICBjb25zdCBjb2xvcnMgPSB7fTtcbiAgXG4gIGhlaWdodHMuZm9yRWFjaCggZnVuY3Rpb24oaCkge1xuICAgIGNvbG9yc1toXSA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtoXS5sZW5ndGggKyAxKSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9JIGFsc28gd2FudCB0byB2YXJ5IG9wYWNpdHkgYnkgaGVpZ2h0XG4gICAgXG4gICAgY29uc3Qgb3BhY2l0eV9ieV9oZWlnaHQgPSB7fVxuICAgIGNvbnN0IG9wYWNpdHlfbWluID0gLjQ7XG4gICAgY29uc3Qgb3BhY2l0eV9tYXggPSAxO1xuICAgIGNvbnN0IHN0ZXBzID0gaGVpZ2h0cy5sZW5ndGg7XG4gICAgXG4gICAgLy8gY29uc3Qgb3BhY2l0aWVzID0gZDMuaW50ZXJwb2xhdGVOdW1iZXIob3BhY2l0eV9tYXgsIG9wYWNpdHlfbWluKTtcbiAgICBcbiAgICBjb25zdCBvcGFjaXRpZXMgPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgIC5kb21haW4oaGVpZ2h0cylcbiAgICAgIC5yYW5nZShkMy5yYW5nZShvcGFjaXR5X21heCwgb3BhY2l0eV9taW4sIC0xICogKG9wYWNpdHlfbWF4IC0gb3BhY2l0eV9taW4pL3N0ZXBzKSk7XG5cbiAgICAgIFxuICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI2NoYXJ0XCIpXG4gICAgICAvLyAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgIC5zdHlsZShcImZvbnRcIiwgXCIxMHB4IHNhbnMtc2VyaWZcIik7XG4gICAgICBcbiAgICAgIGNvbnN0IGcgPSBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3dpZHRoIC8gMn0sICR7d2lkdGggLyAyfSlgKTtcbiAgICAgIFxuICAgICAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKSlcbiAgICAgIC5qb2luKFwicGF0aFwiKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIHdoaWxlIChkLmRlcHRoID4gMSkgeyBkID0gZC5wYXJlbnQ7IH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coZC5kYXRhKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGQuaGVpZ2h0KTtcbiAgICAgIHJldHVybiBjb2xvcnNbZC5oZWlnaHRdKG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0uaW5kZXhPZihkLmRhdGEubmFtZSkpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgaWYgKGQuaGVpZ2h0ID09PSBNYXRoLm1heCguLi5oZWlnaHRzKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7IFxuICAgICAgICByZXR1cm4gb3BhY2l0aWVzKGQuaGVpZ2h0KVxuICAgICAgfTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGFyYyhkLmN1cnJlbnQpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vQWRkIHRpdGxlIGVsZW1lbnRzIHRvIGVhY2ggcGF0aFxuICAgIFxuICAgIHBhdGguYXBwZW5kKFwidGl0bGVcIilcbiAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gYCR7XG4gICAgICAgIGQuYW5jZXN0b3JzKClcbiAgICAgICAgLm1hcChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuZGF0YS5uYW1lO1xuICAgICAgICB9KVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5zbGljZSgxKVxuICAgICAgICAuam9pbihcIjogXCIpXG4gICAgICB9IFxcbiAke1xuICAgICAgICBmb3JtYXQoZC52YWx1ZSlcbiAgICAgIH0gdENPMmUgXFxuICR7XG4gICAgICAgIGQzLmZvcm1hdChcIi4xJVwiKShkLmZyYWN0aW9uKVxuICAgICAgICB9YDtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgY29uc3QgY2hhcnRsYWJlbCA9IGcuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgIC50ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGAke3Jvb3QuZGF0YS5uYW1lfSBcXG4gJHtmb3JtYXQocm9vdC52YWx1ZSl9IHRDTzJlYDtcbiAgICB9KTtcbiAgICBcbiAgICAvL2FkZCBkYXRhc2V0IHRpdGxlIHRvIG5hdiBiYXJcbiAgICAvLyB2YXIgbmF2X3RpdGxlID0gcm9vdC5kYXRhLm5hbWU7XG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtdGl0bGVcIikuaW5uZXJIVE1MID0gbmF2X3RpdGxlO1xuICB9O1xuXG4gIC8vZHJvcGRvd24gY29kZSBoZXJlXG4gIHZhciB5ZWFyTmF2Q2hpbGRyZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdi1lbGVtZW50LXJpZ2h0IGFcIik7XG4gIGNvbnNvbGUubG9nKHllYXJOYXZDaGlsZHJlbik7XG4gIGZvciAodmFyIHggPSAwOyB4IDwgeWVhck5hdkNoaWxkcmVuLmxlbmd0aDsgeCsrKSB7XG4gICAgY29uc29sZS5sb2coeWVhck5hdkNoaWxkcmVuW3hdKTtcbiAgICBjb25zb2xlLmxvZyh4KTtcbiAgICB5ZWFyTmF2Q2hpbGRyZW5beF0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB5ZWFyTmF2ID0gdGhpcy5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ5ZWFyLW5hdmlnYXRvclwiKVswXTtcbiAgICAgIGlmICh5ZWFyTmF2ICYmIHllYXJOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgICAgeWVhck5hdi5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICB9IGVsc2UgaWYgKHllYXJOYXYpIHtcbiAgICAgICAgeWVhck5hdi5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pbm5lckhUTUwgIT09IFwiWWVhciDijIRcIikge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlubmVySFRNTCk7XG4gICAgICAgIHJlbmRlckNoYXJ0KHBhcnNlSW50KHRoaXMuaW5uZXJIVE1MKSwgMTApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zdCBjbGVhckNoYXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgZDMuc2VsZWN0QWxsKFwic3ZnID4gKlwiKS5yZW1vdmUoKTtcbiAgfVxuXG4gIGNvbnN0IHJlbmRlckNoYXJ0ID0gZnVuY3Rpb24oeWVhcikge1xuICAgIGNsZWFyQ2hhcnQoKTtcbiAgICBjb25zb2xlLmxvZyhsb2NhbERhdGEuY2hpbGRyZW5beWVhciAtIDIwMDVdKTtcbiAgICByZW5kZXJTdW5CdXJzdChsb2NhbERhdGEuY2hpbGRyZW5beWVhciAtIDIwMDVdKTtcbiAgfVxuXG4gIC8vcmVuZGVyIHN1bkJ1cnN0IFxuXG4gIGRhdGFzZXQudGhlbihmdW5jdGlvbigpIHtcbiAgICByZW5kZXJDaGFydCgyMDE3KTtcbiAgfSk7XG4gIFxuICBcbn0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=