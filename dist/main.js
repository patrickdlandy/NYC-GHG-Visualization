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
      }

      if (this.innerHTML !== "Year") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb3JtYXQiLCJkMyIsIndpZHRoIiwiaGVpZ2h0IiwicmFkaXVzIiwiYXJjIiwic3RhcnRBbmdsZSIsImQiLCJ4MCIsImVuZEFuZ2xlIiwieDEiLCJwYWRBbmdsZSIsIk1hdGgiLCJtaW4iLCJwYWRSYWRpdXMiLCJpbm5lclJhZGl1cyIsInkwIiwib3V0ZXJSYWRpdXMiLCJtYXgiLCJ5MSIsInBhcnRpdGlvbiIsImRhdGEiLCJyb290IiwiaGllcmFyY2h5Iiwic3VtIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJzaXplIiwiUEkiLCJsb2NhbERhdGEiLCJkYXRhc2V0IiwianNvbiIsInRoZW4iLCJyZW5kZXJTdW5CdXJzdCIsImVhY2giLCJjdXJyZW50IiwiZnJhY3Rpb24iLCJuYW1lcyIsImhlaWdodHMiLCJuYW1lc19ieV9oZWlnaHQiLCJkZXNjZW5kYW50cyIsImZvckVhY2giLCJpbmRleE9mIiwicHVzaCIsIm5hbWUiLCJjb2xvcnMiLCJoIiwic2NhbGVPcmRpbmFsIiwicmFuZ2UiLCJxdWFudGl6ZSIsImludGVycG9sYXRlUmFpbmJvdyIsImxlbmd0aCIsIm9wYWNpdHlfYnlfaGVpZ2h0Iiwib3BhY2l0eV9taW4iLCJvcGFjaXR5X21heCIsInN0ZXBzIiwib3BhY2l0aWVzIiwiZG9tYWluIiwic3ZnIiwic2VsZWN0Iiwic3R5bGUiLCJnIiwiYXBwZW5kIiwiYXR0ciIsInBhdGgiLCJzZWxlY3RBbGwiLCJqb2luIiwidGV4dCIsImFuY2VzdG9ycyIsIm1hcCIsInJldmVyc2UiLCJzbGljZSIsImNoYXJ0bGFiZWwiLCJ5ZWFyTmF2Q2hpbGRyZW4iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29uc29sZSIsImxvZyIsIngiLCJvbmNsaWNrIiwieWVhck5hdiIsInBhcmVudE5vZGUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJhZGQiLCJpbm5lckhUTUwiLCJyZW5kZXJDaGFydCIsInBhcnNlSW50IiwiY2xlYXJDaGFydCIsInllYXIiLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUFBO0FBQUE7QUFBQTtBQUVBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xEO0FBRUE7QUFFQSxNQUFNQyxNQUFNLEdBQUdDLEVBQUUsQ0FBQ0QsTUFBSCxDQUFVLElBQVYsQ0FBZixDQUxrRCxDQU9sRDs7QUFDQSxNQUFNRSxLQUFLLEdBQUcsR0FBZDtBQUNBLE1BQU1DLE1BQU0sR0FBRyxHQUFmO0FBQ0EsTUFBTUMsTUFBTSxHQUFHRixLQUFLLEdBQUcs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QU8sQ0FBQ0MsR0FBUixDQUFZL0MsU0FBUyxDQUFDOEQsUUFBVixDQUFtQkQsSUFBSSxHQUFHLElBQTFCLENBQVo7QUFDQXpELGtCQUFjLENBQUNKLFNBQVMsQ0FBQzhELFFBQVYsQ0FBbUJELElBQUksR0FBRyxJQUExQixDQUFELENBQWQ7QUFDRCxHQUpELENBN05rRCxDQW1PbEQ7OztBQUVBNUQsU0FBTyxDQUFDRSxJQUFSLENBQWEsWUFBVztBQUN0QnVELGVBQVcsQ0FBQyxJQUFELENBQVg7QUFDRCxHQUZEO0FBS0QsQ0ExT0QsRTs7Ozs7Ozs7Ozs7QUNIQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAvL2V2ZXJ5dGhpbmcgaXMgYnVuZGxlZCBpbnRvIG1haW4uanMgYnkgd2VicGFjayBhbmQgd2UganVzdCBpbmNsdWRlIGEgbGluayB0byBcIm1haW5cIlxuICBcbiAgLy9NeSBEMyBDb2RlIGhlcmU6XG4gIFxuICBjb25zdCBmb3JtYXQgPSBkMy5mb3JtYXQoXCIsZFwiKTtcbiAgXG4gIC8vc29tZSBjb25zdGFudHMgZm9yIGRpbWVuc2lvbnM6XG4gIGNvbnN0IHdpZHRoID0gOTMyO1xuICBjb25zdCBoZWlnaHQgPSA5MzI7XG4gIGNvbnN0IHJhZGl1cyA9IHdpZHRoIC8gOTtcbiAgXG4gIC8vYXJjIGZ1bmN0aW9uXG4gIFxuICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAuc3RhcnRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngwO1xuICB9KVxuICAuZW5kQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MTtcbiAgfSlcbiAgLnBhZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKChkLngxIC0gZC54MCkgLyAyLCAwLjAwNSk7XG4gIH0pXG4gIC5wYWRSYWRpdXMoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByYWRpdXMgKiAxLjU7XG4gIH0pXG4gIC5pbm5lclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIC8vIHJldHVybiAzO1xuICAgIHJldHVybiBkLnkwICogcmFkaXVzO1xuICB9KVxuICAub3V0ZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoZC55MCAqIHJhZGl1cywgZC55MSAqIHJhZGl1cyAtIDEpO1xuICB9KTtcbiAgXG4gIC8vcGFydGl0aW9uIGZ1bmN0aW9uXG4gIFxuICBjb25zdCBwYXJ0aXRpb24gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbnN0IHJvb3QgPSBkMy5oaWVyYXJjaHkoZGF0YSlcbiAgICAuc3VtKGZ1bmN0aW9uIChkKSB7XG4gICAgICAvL3RoaXMgb25seSBzdW1zIHRoZSBsZWF2ZXMsIHdoaWNoIGhhdmUgYSB2YWx1ZSBhdHRyaWJ1dGVcbiAgICAgIC8vIGNvbnNvbGUubG9nKGQpO1xuICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgfSlcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIChiLnZhbHVlIC0gYS52YWx1ZSk7XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmxvZyhyb290LmRhdGEubmFtZSk7XG4gICAgcmV0dXJuIGQzLnBhcnRpdGlvbigpXG4gICAgLnNpemUoWzIgKiBNYXRoLlBJLCByb290LmhlaWdodCArIDFdKVxuICAgIChyb290KTtcbiAgfVxuXG4gIGxldCBsb2NhbERhdGEgPSB7fTtcblxuICAvL0kgZ2V0IG15IGpzb24gZGF0YSBpbnRvIGFuIG9iamVjdCBpbiB0aGlzIGZ1bmN0aW9uOlxuXG4gIHZhciBkYXRhc2V0ID0gZDMuanNvbignLi9kYXRhL2RhdGEuanNvbicpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBsb2NhbERhdGEgPSBkYXRhO1xuICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsRGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0pO1xuXG4gIC8vIGNvbnNvbGUubG9nKGRhdGFzZXQpOyAvL3RoaXMgaXMgYSBwcm9taXNlIG9iamVjdFxuXG5cbiAgXG4gIGNvbnN0IHJlbmRlclN1bkJ1cnN0ID0gIGZ1bmN0aW9uKGRhdGEpIHtcbiAgLy9taWdodCBuZWVkIHRvIHR1cm4gdGhpcyBiYWNrIGludG8gYSBjYWxsYmFjayB0byBnZXQgaXQgdG8gd29ya1xuXG5cblxuICAvL0FsbCBjb2RlIHRvIGRvIHZpc3VhbGl6YXRpb24gZ29lcyBpbnNpZGUgb2YgdGhpcyBmdW5jdGlvblxuICBcbiAgLy9nZW5lcmF0ZSByb290IFxuICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgY29uc3Qgcm9vdCA9IHBhcnRpdGlvbihkYXRhKTtcbiAgLy8gY29uc29sZS5sb2cocm9vdCk7XG4gIFxuICAvL3NldCBjdXJyZW50IGF0dHJpYnV0ZVxuICByb290LmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBkLmN1cnJlbnQgPSBkO1xuICAgIGQuZnJhY3Rpb24gPSBkLnZhbHVlIC8gcm9vdC52YWx1ZTtcbiAgfSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcbiAgXG4gIC8vY29sb3IgKE9MRClcbiAgXG4gIC8vIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LFxuICAvLyAgIGRhdGEuY2hpbGRyZW4ubGVuZ3RoICsgMSkpO1xuICBcbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgbmFtZXMubGVuZ3RoKSk7XG4gIFxuICAvL3JlZmFjdG9yaW5nIHRoZSBjb2xvciBtZXRob2RcbiAgXG4gIGNvbnN0IG5hbWVzID0gW107XG4gIGNvbnN0IGhlaWdodHMgPSBbXTtcbiAgY29uc3QgbmFtZXNfYnlfaGVpZ2h0ID0ge307XG4gIFxuICByb290LmRlc2NlbmRhbnRzKCkuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgaWYgKGhlaWdodHMuaW5kZXhPZihkLmhlaWdodCkgPT09IC0xICkge1xuICAgICAgaGVpZ2h0cy5wdXNoKGQuaGVpZ2h0KTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0gPSBbXTtcbiAgICB9XG4gICAgaWYgKG5hbWVzLmluZGV4T2YoZC5kYXRhLm5hbWUpID09PSAtMSkge1xuICAgICAgbmFtZXMucHVzaChkLmRhdGEubmFtZSk7XG4gICAgICBuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLnB1c2goZC5kYXRhLm5hbWUpO1xuICAgIH1cbiAgfSk7XG4gIFxuICAvLyBjb25zb2xlLmxvZyhuYW1lcyk7XG4gIC8vIGNvbnNvbGUubG9nKGhlaWdodHMpO1xuICAvLyBjb25zb2xlLmxvZyhuYW1lc19ieV9oZWlnaHQpO1xuICBcbiAgLy9JbnRlcnBvbGF0ZSB0aGUgd2hvbGUgcmFpbmJvdyBhdCBlYWNoIGhlaWdodCBpbiB0aGUgaGVpcmFyY2h5XG4gIFxuICBjb25zdCBjb2xvcnMgPSB7fTtcbiAgXG4gIGhlaWdodHMuZm9yRWFjaCggZnVuY3Rpb24oaCkge1xuICAgIGNvbG9yc1toXSA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtoXS5sZW5ndGggKyAxKSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9JIGFsc28gd2FudCB0byB2YXJ5IG9wYWNpdHkgYnkgaGVpZ2h0XG4gICAgXG4gICAgY29uc3Qgb3BhY2l0eV9ieV9oZWlnaHQgPSB7fVxuICAgIGNvbnN0IG9wYWNpdHlfbWluID0gLjQ7XG4gICAgY29uc3Qgb3BhY2l0eV9tYXggPSAxO1xuICAgIGNvbnN0IHN0ZXBzID0gaGVpZ2h0cy5sZW5ndGg7XG4gICAgXG4gICAgLy8gY29uc3Qgb3BhY2l0aWVzID0gZDMuaW50ZXJwb2xhdGVOdW1iZXIob3BhY2l0eV9tYXgsIG9wYWNpdHlfbWluKTtcbiAgICBcbiAgICBjb25zdCBvcGFjaXRpZXMgPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgIC5kb21haW4oaGVpZ2h0cylcbiAgICAgIC5yYW5nZShkMy5yYW5nZShvcGFjaXR5X21heCwgb3BhY2l0eV9taW4sIC0xICogKG9wYWNpdHlfbWF4IC0gb3BhY2l0eV9taW4pL3N0ZXBzKSk7XG5cbiAgICAgIFxuICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI2NoYXJ0XCIpXG4gICAgICAvLyAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgIC5zdHlsZShcImZvbnRcIiwgXCIxMHB4IHNhbnMtc2VyaWZcIik7XG4gICAgICBcbiAgICAgIGNvbnN0IGcgPSBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3dpZHRoIC8gMn0sICR7d2lkdGggLyAyfSlgKTtcbiAgICAgIFxuICAgICAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKSlcbiAgICAgIC5qb2luKFwicGF0aFwiKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIHdoaWxlIChkLmRlcHRoID4gMSkgeyBkID0gZC5wYXJlbnQ7IH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coZC5kYXRhKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGQuaGVpZ2h0KTtcbiAgICAgIHJldHVybiBjb2xvcnNbZC5oZWlnaHRdKG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0uaW5kZXhPZihkLmRhdGEubmFtZSkpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgaWYgKGQuaGVpZ2h0ID09PSBNYXRoLm1heCguLi5oZWlnaHRzKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7IFxuICAgICAgICByZXR1cm4gb3BhY2l0aWVzKGQuaGVpZ2h0KVxuICAgICAgfTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGFyYyhkLmN1cnJlbnQpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vQWRkIHRpdGxlIGVsZW1lbnRzIHRvIGVhY2ggcGF0aFxuICAgIFxuICAgIHBhdGguYXBwZW5kKFwidGl0bGVcIilcbiAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gYCR7XG4gICAgICAgIGQuYW5jZXN0b3JzKClcbiAgICAgICAgLm1hcChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuZGF0YS5uYW1lO1xuICAgICAgICB9KVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5zbGljZSgxKVxuICAgICAgICAuam9pbihcIjogXCIpXG4gICAgICB9IFxcbiAke1xuICAgICAgICBmb3JtYXQoZC52YWx1ZSlcbiAgICAgIH0gdENPMmUgXFxuICR7XG4gICAgICAgIGQzLmZvcm1hdChcIi4xJVwiKShkLmZyYWN0aW9uKVxuICAgICAgICB9YDtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgY29uc3QgY2hhcnRsYWJlbCA9IGcuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgIC50ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGAke3Jvb3QuZGF0YS5uYW1lfSBcXG4gJHtmb3JtYXQocm9vdC52YWx1ZSl9IHRDTzJlYDtcbiAgICB9KTtcbiAgICBcbiAgICAvL2FkZCBkYXRhc2V0IHRpdGxlIHRvIG5hdiBiYXJcbiAgICAvLyB2YXIgbmF2X3RpdGxlID0gcm9vdC5kYXRhLm5hbWU7XG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtdGl0bGVcIikuaW5uZXJIVE1MID0gbmF2X3RpdGxlO1xuICB9O1xuXG4gIC8vZHJvcGRvd24gY29kZSBoZXJlXG4gIHZhciB5ZWFyTmF2Q2hpbGRyZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdi1lbGVtZW50LXJpZ2h0IGFcIik7XG4gIGNvbnNvbGUubG9nKHllYXJOYXZDaGlsZHJlbik7XG4gIGZvciAodmFyIHggPSAwOyB4IDwgeWVhck5hdkNoaWxkcmVuLmxlbmd0aDsgeCsrKSB7XG4gICAgY29uc29sZS5sb2coeWVhck5hdkNoaWxkcmVuW3hdKTtcbiAgICBjb25zb2xlLmxvZyh4KTtcbiAgICB5ZWFyTmF2Q2hpbGRyZW5beF0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB5ZWFyTmF2ID0gdGhpcy5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ5ZWFyLW5hdmlnYXRvclwiKVswXTtcbiAgICAgIGlmICh5ZWFyTmF2ICYmIHllYXJOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgICAgeWVhck5hdi5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICB9IGVsc2UgaWYgKHllYXJOYXYpIHtcbiAgICAgICAgeWVhck5hdi5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pbm5lckhUTUwgIT09IFwiWWVhclwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5uZXJIVE1MKTtcbiAgICAgICAgcmVuZGVyQ2hhcnQocGFyc2VJbnQodGhpcy5pbm5lckhUTUwpLCAxMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IGNsZWFyQ2hhcnQgPSBmdW5jdGlvbigpIHtcbiAgICBkMy5zZWxlY3RBbGwoXCJzdmcgPiAqXCIpLnJlbW92ZSgpO1xuICB9XG5cbiAgY29uc3QgcmVuZGVyQ2hhcnQgPSBmdW5jdGlvbih5ZWFyKSB7XG4gICAgY2xlYXJDaGFydCgpO1xuICAgIGNvbnNvbGUubG9nKGxvY2FsRGF0YS5jaGlsZHJlblt5ZWFyIC0gMjAwNV0pO1xuICAgIHJlbmRlclN1bkJ1cnN0KGxvY2FsRGF0YS5jaGlsZHJlblt5ZWFyIC0gMjAwNV0pO1xuICB9XG5cbiAgLy9yZW5kZXIgc3VuQnVyc3QgXG5cbiAgZGF0YXNldC50aGVuKGZ1bmN0aW9uKCkge1xuICAgIHJlbmRlckNoYXJ0KDIwMTcpO1xuICB9KTtcbiAgXG4gIFxufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==