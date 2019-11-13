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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz9kYzJhIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvcm1hdCIsImQzIiwid2lkdGgiLCJoZWlnaHQiLCJyYWRpdXMiLCJhcmMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsInNpemUiLCJQSSIsImRhdGFzZXQiLCJqc29uIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlYWNoIiwiY3VycmVudCIsImZyYWN0aW9uIiwibmFtZXMiLCJoZWlnaHRzIiwibmFtZXNfYnlfaGVpZ2h0IiwiZGVzY2VuZGFudHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwiY29sb3JzIiwiaCIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJsZW5ndGgiLCJvcGFjaXR5X2J5X2hlaWdodCIsIm9wYWNpdHlfbWluIiwib3BhY2l0eV9tYXgiLCJzdGVwcyIsIm9wYWNpdGllcyIsImRvbWFpbiIsInN2ZyIsInNlbGVjdCIsInN0eWxlIiwiZyIsImFwcGVuZCIsImF0dHIiLCJwYXRoIiwic2VsZWN0QWxsIiwiam9pbiIsInRleHQiLCJhbmNlc3RvcnMiLCJtYXAiLCJyZXZlcnNlIiwic2xpY2UiLCJjaGFydGxhYmVsIiwibmF2X3RpdGxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiI7UUFBQTtR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T0FBWixFQUNDSyxJQURELENBQ00sVUFBUzlELENBQVQsRUFBWTtBQUNoQix1QkFDRUEsQ0FBQyxDQUFDK0QsU0FBRixHQUNDQyxHQURELENBQ0ssVUFBU2hFLENBQVQsRUFBWTtBQUNmLGVBQU9BLENBQUMsQ0FBQ2MsSUFBRixDQUFPeUIsSUFBZDtBQUNELE9BSEQsRUFJQzBCLE9BSkQsR0FLQ0MsS0FMRCxDQUtPLENBTFAsRUFNQ0wsSUFORCxDQU1NLElBTk4sQ0FERixpQkFTRXBFLE1BQU0sQ0FBQ08sQ0FBQyxDQUFDa0IsS0FBSCxDQVRSLHVCQVdFeEIsRUFBRSxDQUFDRCxNQUFILENBQVUsS0FBVixFQUFpQk8sQ0FBQyxDQUFDK0IsUUFBbkIsQ0FYRjtBQWFDLEtBZkg7QUFpQkEsUUFBTW9DLFVBQVUsR0FBR1gsQ0FBQyxDQUFDQyxNQUFGLENBQVMsTUFBVCxFQUNsQkMsSUFEa0IsQ0FDYixhQURhLEVBQ0UsUUFERixFQUVsQkEsSUFGa0IsQ0FFYixjQUZhLEVBRUcsQ0FGSCxFQUdsQkksSUFIa0IsQ0FHYixZQUFXO0FBQ2YsdUJBQVUvQyxJQUFJLENBQUNELElBQUwsQ0FBVXlCLElBQXBCLGlCQUErQjlDLE1BQU0sQ0FBQ3NCLElBQUksQ0FBQ0csS0FBTixDQUFyQztBQUNELEtBTGtCLENBQW5CLENBcEgyQixDQTJIM0I7O0FBQ0EsUUFBSWtELFNBQVMsR0FBR3JELElBQUksQ0FBQ0QsSUFBTCxDQUFVeUIsSUFBMUI7QUFDQWhELFlBQVEsQ0FBQzhFLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNDLFNBQXJDLEdBQWlERixTQUFqRDtBQUNELEdBOUhEO0FBZ0lELENBL0xELEU7Ozs7Ozs7Ozs7O0FDSEEsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICBcbiAgLy9ldmVyeXRoaW5nIGlzIGJ1bmRsZWQgaW50byBtYWluLmpzIGJ5IHdlYnBhY2sgYW5kIHdlIGp1c3QgaW5jbHVkZSBhIGxpbmsgdG8gXCJtYWluXCJcbiAgXG4gIC8vTXkgRDMgQ29kZSBoZXJlOlxuICBcbiAgY29uc3QgZm9ybWF0ID0gZDMuZm9ybWF0KFwiLGRcIik7XG4gIFxuICAvL3NvbWUgY29uc3RhbnRzIGZvciBkaW1lbnNpb25zOlxuICBjb25zdCB3aWR0aCA9IDkzMjtcbiAgY29uc3QgaGVpZ2h0ID0gOTMyO1xuICBjb25zdCByYWRpdXMgPSB3aWR0aCAvIDk7XG4gIFxuICAvL2FyYyBmdW5jdGlvblxuICBcbiAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgLnN0YXJ0QW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MDtcbiAgfSlcbiAgLmVuZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDE7XG4gIH0pXG4gIC5wYWRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1pbigoZC54MSAtIGQueDApIC8gMiwgMC4wMDUpO1xuICB9KVxuICAucGFkUmFkaXVzKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmFkaXVzICogMS41O1xuICB9KVxuICAuaW5uZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICAvLyByZXR1cm4gMztcbiAgICByZXR1cm4gZC55MCAqIHJhZGl1cztcbiAgfSlcbiAgLm91dGVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KGQueTAgKiByYWRpdXMsIGQueTEgKiByYWRpdXMgLSAxKTtcbiAgfSk7XG4gIFxuICAvL3BhcnRpdGlvbiBmdW5jdGlvblxuICBcbiAgY29uc3QgcGFydGl0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zdCByb290ID0gZDMuaGllcmFyY2h5KGRhdGEpXG4gICAgLnN1bShmdW5jdGlvbiAoZCkge1xuICAgICAgLy90aGlzIG9ubHkgc3VtcyB0aGUgbGVhdmVzLCB3aGljaCBoYXZlIGEgdmFsdWUgYXR0cmlidXRlXG4gICAgICAvLyBjb25zb2xlLmxvZyhkKTtcbiAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIH0pXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiAoYi52YWx1ZSAtIGEudmFsdWUpO1xuICAgIH0pXG4gICAgLy8gY29uc29sZS5sb2cocm9vdC5kYXRhLm5hbWUpO1xuICAgIHJldHVybiBkMy5wYXJ0aXRpb24oKVxuICAgIC5zaXplKFsyICogTWF0aC5QSSwgcm9vdC5oZWlnaHQgKyAxXSlcbiAgICAocm9vdCk7XG4gIH1cblxuICBcblxuICAvL0kgZ2V0IG15IGpzb24gZGF0YSBpbnRvIGFuIG9iamVjdCBpbiB0aGlzIGZ1bmN0aW9uOlxuXG4gIHZhciBkYXRhc2V0ID0gZDMuanNvbignLi9kYXRhL2RpZXRfZGF0YS5qc29uJykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9KTtcblxuICBkYXRhc2V0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgLy8gY29uc29sZS5sb2coZGF0YSlcbiAgXG4gIC8vQWxsIGNvZGUgdG8gZG8gdmlzdWFsaXphdGlvbiBnb2VzIGluc2lkZSBvZiB0aGlzIGNhbGxiYWNrXG4gIFxuICAvL2dlbmVyYXRlIHJvb3QgXG4gIGNvbnN0IHJvb3QgPSBwYXJ0aXRpb24oZGF0YSk7XG4gIGNvbnNvbGUubG9nKHJvb3QpO1xuICBcbiAgLy9zZXQgY3VycmVudCBhdHRyaWJ1dGVcbiAgcm9vdC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgZC5jdXJyZW50ID0gZDtcbiAgICBkLmZyYWN0aW9uID0gZC52YWx1ZSAvIHJvb3QudmFsdWU7XG4gIH0pO1xuICAvL2NvbnNvbGUubG9nKHJvb3QuZGVzY2VuZGFudHMoKSk7XG4gIFxuICAvL2NvbG9yIChPTEQpXG4gIFxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBkYXRhLmNoaWxkcmVuLmxlbmd0aCArIDEpKTtcbiAgXG4gIC8vIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LFxuICAvLyAgIG5hbWVzLmxlbmd0aCkpO1xuICBcbiAgLy9yZWZhY3RvcmluZyB0aGUgY29sb3IgbWV0aG9kXG4gIFxuICBjb25zdCBuYW1lcyA9IFtdO1xuICBjb25zdCBoZWlnaHRzID0gW107XG4gIGNvbnN0IG5hbWVzX2J5X2hlaWdodCA9IHt9O1xuICBcbiAgcm9vdC5kZXNjZW5kYW50cygpLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgIGlmIChoZWlnaHRzLmluZGV4T2YoZC5oZWlnaHQpID09PSAtMSApIHtcbiAgICAgIGhlaWdodHMucHVzaChkLmhlaWdodCk7XG4gICAgICBuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdID0gW107XG4gICAgfVxuICAgIGlmIChuYW1lcy5pbmRleE9mKGQuZGF0YS5uYW1lKSA9PT0gLTEpIHtcbiAgICAgIG5hbWVzLnB1c2goZC5kYXRhLm5hbWUpO1xuICAgICAgbmFtZXNfYnlfaGVpZ2h0W2QuaGVpZ2h0XS5wdXNoKGQuZGF0YS5uYW1lKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgLy8gY29uc29sZS5sb2cobmFtZXMpO1xuICAvLyBjb25zb2xlLmxvZyhoZWlnaHRzKTtcbiAgLy8gY29uc29sZS5sb2cobmFtZXNfYnlfaGVpZ2h0KTtcbiAgXG4gIC8vSW50ZXJwb2xhdGUgdGhlIHdob2xlIHJhaW5ib3cgYXQgZWFjaCBoZWlnaHQgaW4gdGhlIGhlaXJhcmNoeVxuICBcbiAgY29uc3QgY29sb3JzID0ge307XG4gIFxuICBoZWlnaHRzLmZvckVhY2goIGZ1bmN0aW9uKGgpIHtcbiAgICBjb2xvcnNbaF0gPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gICAgICBuYW1lc19ieV9oZWlnaHRbaF0ubGVuZ3RoICsgMSkpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vSSBhbHNvIHdhbnQgdG8gdmFyeSBvcGFjaXR5IGJ5IGhlaWdodFxuICAgIFxuICAgIGNvbnN0IG9wYWNpdHlfYnlfaGVpZ2h0ID0ge31cbiAgICBjb25zdCBvcGFjaXR5X21pbiA9IC40O1xuICAgIGNvbnN0IG9wYWNpdHlfbWF4ID0gMTtcbiAgICBjb25zdCBzdGVwcyA9IGhlaWdodHMubGVuZ3RoO1xuICAgIFxuICAgIC8vIGNvbnN0IG9wYWNpdGllcyA9IGQzLmludGVycG9sYXRlTnVtYmVyKG9wYWNpdHlfbWF4LCBvcGFjaXR5X21pbik7XG4gICAgXG4gICAgY29uc3Qgb3BhY2l0aWVzID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAuZG9tYWluKGhlaWdodHMpXG4gICAgICAucmFuZ2UoZDMucmFuZ2Uob3BhY2l0eV9tYXgsIG9wYWNpdHlfbWluLCAtMSAqIChvcGFjaXR5X21heCAtIG9wYWNpdHlfbWluKS9zdGVwcykpO1xuXG4gICAgICBcbiAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNjaGFydFwiKVxuICAgICAgLy8gLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG4gICAgICAuc3R5bGUoXCJmb250XCIsIFwiMTBweCBzYW5zLXNlcmlmXCIpO1xuICAgICAgXG4gICAgICBjb25zdCBnID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt3aWR0aCAvIDJ9LCAke3dpZHRoIC8gMn0pYCk7XG4gICAgICBcbiAgICAgIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcImdcIilcbiAgICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAuZGF0YShyb290LmRlc2NlbmRhbnRzKCkpXG4gICAgICAuam9pbihcInBhdGhcIilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAvLyB3aGlsZSAoZC5kZXB0aCA+IDEpIHsgZCA9IGQucGFyZW50OyB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGQuZGF0YSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkLmhlaWdodCk7XG4gICAgICByZXR1cm4gY29sb3JzW2QuaGVpZ2h0XShuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLmluZGV4T2YoZC5kYXRhLm5hbWUpKTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIGlmIChkLmhlaWdodCA9PT0gTWF0aC5tYXgoLi4uaGVpZ2h0cykpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9IGVsc2UgeyBcbiAgICAgICAgcmV0dXJuIG9wYWNpdGllcyhkLmhlaWdodClcbiAgICAgIH07XG4gICAgfSlcbiAgICAuYXR0cihcImRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBhcmMoZC5jdXJyZW50KTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0FkZCB0aXRsZSBlbGVtZW50cyB0byBlYWNoIHBhdGhcbiAgICBcbiAgICBwYXRoLmFwcGVuZChcInRpdGxlXCIpXG4gICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGAke1xuICAgICAgICBkLmFuY2VzdG9ycygpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmRhdGEubmFtZTtcbiAgICAgICAgfSlcbiAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAuc2xpY2UoMSlcbiAgICAgICAgLmpvaW4oXCI6IFwiKVxuICAgICAgfSBcXG4gJHtcbiAgICAgICAgZm9ybWF0KGQudmFsdWUpXG4gICAgICB9IHRDTzJlIFxcbiAke1xuICAgICAgICBkMy5mb3JtYXQoXCIuMSVcIikoZC5mcmFjdGlvbilcbiAgICAgICAgfWA7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIGNvbnN0IGNoYXJ0bGFiZWwgPSBnLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgICAudGV4dChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBgJHtyb290LmRhdGEubmFtZX0gXFxuICR7Zm9ybWF0KHJvb3QudmFsdWUpfSB0Q08yZWA7XG4gICAgfSk7XG4gICAgXG4gICAgLy9hZGQgZGF0YXNldCB0aXRsZSB0byBuYXYgYmFyXG4gICAgdmFyIG5hdl90aXRsZSA9IHJvb3QuZGF0YS5uYW1lO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LXRpdGxlXCIpLmlubmVySFRNTCA9IG5hdl90aXRsZTtcbiAgfSk7XG4gIFxufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==