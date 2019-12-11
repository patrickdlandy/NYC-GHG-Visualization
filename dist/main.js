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
  console.log(dataset);

  var renderSunBurst = function renderSunBurst(data) {
    //might need to turn this back into a callback to get it to work
    //All code to do visualization goes inside of this function
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
    // var nav_title = root.data.name;
    // document.getElementById("nav-title").innerHTML = nav_title;
  }; //dropdown code here


  var yearNavChildren = document.querySelectorAll(".nav-element-right a");

  for (var x = 0; x < yearNavChildren.length; x++) {
    yearNavChildren[x].onclick = function () {
      var yearNav = this.parentNode.getElementsByClassName("year-navigator")[0];

      if (yearNav.classList.contains("selected")) {
        yearNav.classList.remove("selected");
      } else {
        yearNav.classList.add("selected");
      }
    };
  } //render sunBurst 


  dataset.then(renderSunBurst);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb3JtYXQiLCJkMyIsIndpZHRoIiwiaGVpZ2h0IiwicmFkaXVzIiwiYXJjIiwic3RhcnRBbmdsZSIsImQiLCJ4MCIsImVuZEFuZ2xlIiwieDEiLCJwYWRBbmdsZSIsIk1hdGgiLCJtaW4iLCJwYWRSYWRpdXMiLCJpbm5lclJhZGl1cyIsInkwIiwib3V0ZXJSYWRpdXMiLCJtYXgiLCJ5MSIsInBhcnRpdGlvbiIsImRhdGEiLCJyb290IiwiaGllcmFyY2h5Iiwic3VtIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJzaXplIiwiUEkiLCJkYXRhc2V0IiwianNvbiIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVuZGVyU3VuQnVyc3QiLCJlYWNoIiwiY3VycmVudCIsImZyYWN0aW9uIiwibmFtZXMiLCJoZWlnaHRzIiwibmFtZXNfYnlfaGVpZ2h0IiwiZGVzY2VuZGFudHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwiY29sb3JzIiwiaCIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJsZW5ndGgiLCJvcGFjaXR5X2J5X2hlaWdodCIsIm9wYWNpdHlfbWluIiwib3BhY2l0eV9tYXgiLCJzdGVwcyIsIm9wYWNpdGllcyIsImRvbWFpbiIsInN2ZyIsInNlbGVjdCIsInN0eWxlIiwiZyIsImFwcGVuZCIsImF0dHIiLCJwYXRoIiwic2VsZWN0QWxsIiwiam9pbiIsInRleHQiLCJhbmNlc3RvcnMiLCJtYXAiLCJyZXZlcnNlIiwic2xpY2UiLCJjaGFydGxhYmVsIiwieWVhck5hdkNoaWxkcmVuIiwicXVlcnlTZWxlY3RvckFsbCIsIngiLCJvbmNsaWNrIiwieWVhck5hdiIsInBhcmVudE5vZGUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJhZGQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqRkE7QUFBQTtBQUFBO0FBQUE7QUFFQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRDtBQUVBO0FBRUEsTUFBTUMsTUFBTSxHQUFHQyxFQUFFLENBQUNELE1BQUgsQ0FBVSxJQUFWLENBQWYsQ0FMa0QsQ0FPbEQ7O0FBQ0EsTUFBTUUsS0FBSyxHQUFHLEdBQWQ7QUFDQSxNQUFNQyxNQUFNLEdBQUcsR0FBZjtBQUNBLE1BQU1DLE1BQU0sR0FBR0YsS0FBSyxHQUFHLENBQXZCLENBVmtELENBWWxEOztBQUVBLE1BQU1HLEdBQUcsR0FBR0osRUFBRSxDQUFDSSxHQUFILEdBQ1hDLFVBRFcsQ0FDQSxVQUFVQyxD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LENBQUMsRUFBN0MsRUFBaUQ7QUFDL0NGLG1CQUFlLENBQUNFLENBQUQsQ0FBZixDQUFtQkMsT0FBbkIsR0FBNkIsWUFBWTtBQUN2QyxVQUFJQyxPQUFPLEdBQUcsS0FBS0MsVUFBTCxDQUFnQkMsc0JBQWhCLENBQXVDLGdCQUF2QyxFQUF5RCxDQUF6RCxDQUFkOztBQUNBLFVBQUlGLE9BQU8sQ0FBQ0csU0FBUixDQUFrQkMsUUFBbEIsQ0FBMkIsVUFBM0IsQ0FBSixFQUE0QztBQUMxQ0osZUFBTyxDQUFDRyxTQUFSLENBQWtCRSxNQUFsQixDQUF5QixVQUF6QjtBQUNELE9BRkQsTUFFTztBQUNMTCxlQUFPLENBQUNHLFNBQVIsQ0FBa0JHLEdBQWxCLENBQXNCLFVBQXRCO0FBQ0Q7QUFDRixLQVBEO0FBUUQsR0E5TWlELENBZ05sRDs7O0FBRUF2RCxTQUFPLENBQUNFLElBQVIsQ0FBYUcsY0FBYjtBQUVELENBcE5ELEU7Ozs7Ozs7Ozs7O0FDSEEsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgLy9ldmVyeXRoaW5nIGlzIGJ1bmRsZWQgaW50byBtYWluLmpzIGJ5IHdlYnBhY2sgYW5kIHdlIGp1c3QgaW5jbHVkZSBhIGxpbmsgdG8gXCJtYWluXCJcbiAgXG4gIC8vTXkgRDMgQ29kZSBoZXJlOlxuICBcbiAgY29uc3QgZm9ybWF0ID0gZDMuZm9ybWF0KFwiLGRcIik7XG4gIFxuICAvL3NvbWUgY29uc3RhbnRzIGZvciBkaW1lbnNpb25zOlxuICBjb25zdCB3aWR0aCA9IDkzMjtcbiAgY29uc3QgaGVpZ2h0ID0gOTMyO1xuICBjb25zdCByYWRpdXMgPSB3aWR0aCAvIDk7XG4gIFxuICAvL2FyYyBmdW5jdGlvblxuICBcbiAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgLnN0YXJ0QW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MDtcbiAgfSlcbiAgLmVuZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDE7XG4gIH0pXG4gIC5wYWRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1pbigoZC54MSAtIGQueDApIC8gMiwgMC4wMDUpO1xuICB9KVxuICAucGFkUmFkaXVzKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmFkaXVzICogMS41O1xuICB9KVxuICAuaW5uZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICAvLyByZXR1cm4gMztcbiAgICByZXR1cm4gZC55MCAqIHJhZGl1cztcbiAgfSlcbiAgLm91dGVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KGQueTAgKiByYWRpdXMsIGQueTEgKiByYWRpdXMgLSAxKTtcbiAgfSk7XG4gIFxuICAvL3BhcnRpdGlvbiBmdW5jdGlvblxuICBcbiAgY29uc3QgcGFydGl0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zdCByb290ID0gZDMuaGllcmFyY2h5KGRhdGEpXG4gICAgLnN1bShmdW5jdGlvbiAoZCkge1xuICAgICAgLy90aGlzIG9ubHkgc3VtcyB0aGUgbGVhdmVzLCB3aGljaCBoYXZlIGEgdmFsdWUgYXR0cmlidXRlXG4gICAgICAvLyBjb25zb2xlLmxvZyhkKTtcbiAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIH0pXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiAoYi52YWx1ZSAtIGEudmFsdWUpO1xuICAgIH0pXG4gICAgLy8gY29uc29sZS5sb2cocm9vdC5kYXRhLm5hbWUpO1xuICAgIHJldHVybiBkMy5wYXJ0aXRpb24oKVxuICAgIC5zaXplKFsyICogTWF0aC5QSSwgcm9vdC5oZWlnaHQgKyAxXSlcbiAgICAocm9vdCk7XG4gIH1cblxuICBcblxuICAvL0kgZ2V0IG15IGpzb24gZGF0YSBpbnRvIGFuIG9iamVjdCBpbiB0aGlzIGZ1bmN0aW9uOlxuXG4gIHZhciBkYXRhc2V0ID0gZDMuanNvbignLi9kYXRhL2RpZXRfZGF0YS5qc29uJykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9KTtcblxuICBjb25zb2xlLmxvZyhkYXRhc2V0KTtcblxuXG4gIFxuICBjb25zdCByZW5kZXJTdW5CdXJzdCA9ICBmdW5jdGlvbihkYXRhKSB7XG4gIC8vbWlnaHQgbmVlZCB0byB0dXJuIHRoaXMgYmFjayBpbnRvIGEgY2FsbGJhY2sgdG8gZ2V0IGl0IHRvIHdvcmtcblxuXG5cbiAgLy9BbGwgY29kZSB0byBkbyB2aXN1YWxpemF0aW9uIGdvZXMgaW5zaWRlIG9mIHRoaXMgZnVuY3Rpb25cbiAgXG4gIC8vZ2VuZXJhdGUgcm9vdCBcbiAgY29uc3Qgcm9vdCA9IHBhcnRpdGlvbihkYXRhKTtcbiAgY29uc29sZS5sb2cocm9vdCk7XG4gIFxuICAvL3NldCBjdXJyZW50IGF0dHJpYnV0ZVxuICByb290LmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBkLmN1cnJlbnQgPSBkO1xuICAgIGQuZnJhY3Rpb24gPSBkLnZhbHVlIC8gcm9vdC52YWx1ZTtcbiAgfSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcbiAgXG4gIC8vY29sb3IgKE9MRClcbiAgXG4gIC8vIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LFxuICAvLyAgIGRhdGEuY2hpbGRyZW4ubGVuZ3RoICsgMSkpO1xuICBcbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgbmFtZXMubGVuZ3RoKSk7XG4gIFxuICAvL3JlZmFjdG9yaW5nIHRoZSBjb2xvciBtZXRob2RcbiAgXG4gIGNvbnN0IG5hbWVzID0gW107XG4gIGNvbnN0IGhlaWdodHMgPSBbXTtcbiAgY29uc3QgbmFtZXNfYnlfaGVpZ2h0ID0ge307XG4gIFxuICByb290LmRlc2NlbmRhbnRzKCkuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgaWYgKGhlaWdodHMuaW5kZXhPZihkLmhlaWdodCkgPT09IC0xICkge1xuICAgICAgaGVpZ2h0cy5wdXNoKGQuaGVpZ2h0KTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0gPSBbXTtcbiAgICB9XG4gICAgaWYgKG5hbWVzLmluZGV4T2YoZC5kYXRhLm5hbWUpID09PSAtMSkge1xuICAgICAgbmFtZXMucHVzaChkLmRhdGEubmFtZSk7XG4gICAgICBuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLnB1c2goZC5kYXRhLm5hbWUpO1xuICAgIH1cbiAgfSk7XG4gIFxuICAvLyBjb25zb2xlLmxvZyhuYW1lcyk7XG4gIC8vIGNvbnNvbGUubG9nKGhlaWdodHMpO1xuICAvLyBjb25zb2xlLmxvZyhuYW1lc19ieV9oZWlnaHQpO1xuICBcbiAgLy9JbnRlcnBvbGF0ZSB0aGUgd2hvbGUgcmFpbmJvdyBhdCBlYWNoIGhlaWdodCBpbiB0aGUgaGVpcmFyY2h5XG4gIFxuICBjb25zdCBjb2xvcnMgPSB7fTtcbiAgXG4gIGhlaWdodHMuZm9yRWFjaCggZnVuY3Rpb24oaCkge1xuICAgIGNvbG9yc1toXSA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtoXS5sZW5ndGggKyAxKSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9JIGFsc28gd2FudCB0byB2YXJ5IG9wYWNpdHkgYnkgaGVpZ2h0XG4gICAgXG4gICAgY29uc3Qgb3BhY2l0eV9ieV9oZWlnaHQgPSB7fVxuICAgIGNvbnN0IG9wYWNpdHlfbWluID0gLjQ7XG4gICAgY29uc3Qgb3BhY2l0eV9tYXggPSAxO1xuICAgIGNvbnN0IHN0ZXBzID0gaGVpZ2h0cy5sZW5ndGg7XG4gICAgXG4gICAgLy8gY29uc3Qgb3BhY2l0aWVzID0gZDMuaW50ZXJwb2xhdGVOdW1iZXIob3BhY2l0eV9tYXgsIG9wYWNpdHlfbWluKTtcbiAgICBcbiAgICBjb25zdCBvcGFjaXRpZXMgPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgIC5kb21haW4oaGVpZ2h0cylcbiAgICAgIC5yYW5nZShkMy5yYW5nZShvcGFjaXR5X21heCwgb3BhY2l0eV9taW4sIC0xICogKG9wYWNpdHlfbWF4IC0gb3BhY2l0eV9taW4pL3N0ZXBzKSk7XG5cbiAgICAgIFxuICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI2NoYXJ0XCIpXG4gICAgICAvLyAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgIC5zdHlsZShcImZvbnRcIiwgXCIxMHB4IHNhbnMtc2VyaWZcIik7XG4gICAgICBcbiAgICAgIGNvbnN0IGcgPSBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3dpZHRoIC8gMn0sICR7d2lkdGggLyAyfSlgKTtcbiAgICAgIFxuICAgICAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKSlcbiAgICAgIC5qb2luKFwicGF0aFwiKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIHdoaWxlIChkLmRlcHRoID4gMSkgeyBkID0gZC5wYXJlbnQ7IH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coZC5kYXRhKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGQuaGVpZ2h0KTtcbiAgICAgIHJldHVybiBjb2xvcnNbZC5oZWlnaHRdKG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0uaW5kZXhPZihkLmRhdGEubmFtZSkpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgaWYgKGQuaGVpZ2h0ID09PSBNYXRoLm1heCguLi5oZWlnaHRzKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7IFxuICAgICAgICByZXR1cm4gb3BhY2l0aWVzKGQuaGVpZ2h0KVxuICAgICAgfTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGFyYyhkLmN1cnJlbnQpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vQWRkIHRpdGxlIGVsZW1lbnRzIHRvIGVhY2ggcGF0aFxuICAgIFxuICAgIHBhdGguYXBwZW5kKFwidGl0bGVcIilcbiAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gYCR7XG4gICAgICAgIGQuYW5jZXN0b3JzKClcbiAgICAgICAgLm1hcChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuZGF0YS5uYW1lO1xuICAgICAgICB9KVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5zbGljZSgxKVxuICAgICAgICAuam9pbihcIjogXCIpXG4gICAgICB9IFxcbiAke1xuICAgICAgICBmb3JtYXQoZC52YWx1ZSlcbiAgICAgIH0gdENPMmUgXFxuICR7XG4gICAgICAgIGQzLmZvcm1hdChcIi4xJVwiKShkLmZyYWN0aW9uKVxuICAgICAgICB9YDtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgY29uc3QgY2hhcnRsYWJlbCA9IGcuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgIC50ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGAke3Jvb3QuZGF0YS5uYW1lfSBcXG4gJHtmb3JtYXQocm9vdC52YWx1ZSl9IHRDTzJlYDtcbiAgICB9KTtcbiAgICBcbiAgICAvL2FkZCBkYXRhc2V0IHRpdGxlIHRvIG5hdiBiYXJcbiAgICAvLyB2YXIgbmF2X3RpdGxlID0gcm9vdC5kYXRhLm5hbWU7XG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtdGl0bGVcIikuaW5uZXJIVE1MID0gbmF2X3RpdGxlO1xuICB9O1xuXG4gIC8vZHJvcGRvd24gY29kZSBoZXJlXG4gIHZhciB5ZWFyTmF2Q2hpbGRyZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdi1lbGVtZW50LXJpZ2h0IGFcIik7XG4gIGZvciAodmFyIHggPSAwOyB4IDwgeWVhck5hdkNoaWxkcmVuLmxlbmd0aDsgeCsrKSB7XG4gICAgeWVhck5hdkNoaWxkcmVuW3hdLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgeWVhck5hdiA9IHRoaXMucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwieWVhci1uYXZpZ2F0b3JcIilbMF07XG4gICAgICBpZiAoeWVhck5hdi5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgICB5ZWFyTmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHllYXJOYXYuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vcmVuZGVyIHN1bkJ1cnN0IFxuXG4gIGRhdGFzZXQudGhlbihyZW5kZXJTdW5CdXJzdCk7XG4gIFxufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==