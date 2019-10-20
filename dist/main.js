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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz9kYzJhIl0sIm5hbWVzIjpbImZvcm1hdCIsImQzIiwid2lkdGgiLCJoZWlnaHQiLCJyYWRpdXMiLCJhcmMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsInNpemUiLCJQSSIsImRhdGFzZXQiLCJqc29uIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlYWNoIiwiY3VycmVudCIsImZyYWN0aW9uIiwibmFtZXMiLCJoZWlnaHRzIiwibmFtZXNfYnlfaGVpZ2h0IiwiZGVzY2VuZGFudHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwiY29sb3JzIiwiaCIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJsZW5ndGgiLCJvcGFjaXR5X2J5X2hlaWdodCIsIm9wYWNpdHlfbWluIiwib3BhY2l0eV9tYXgiLCJzdGVwcyIsIm9wYWNpdGllcyIsImRvbWFpbiIsInN2ZyIsInNlbGVjdCIsInN0eWxlIiwiZyIsImFwcGVuZCIsImF0dHIiLCJwYXRoIiwic2VsZWN0QWxsIiwiam9pbiIsInRleHQiLCJhbmNlc3RvcnMiLCJtYXAiLCJyZXZlcnNlIiwic2xpY2UiLCJjaGFydGxhYmVsIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBO0FBQUE7QUFBQTtDQUVBO0FBRUE7QUFFQTtBQUVBOztBQUVBLElBQU1BLE1BQU0sR0FBR0MsRUFBRSxDQUFDRCxNQUFILENBQVUsSUFBVixDQUFmLEMsQ0FFQTs7QUFDQSxJQUFNRSxLQUFLLEdBQUcsR0FBZDtBQUNBLElBQU1DLE1BQU0sR0FBRyxHQUFmO0FBQ0EsSUFBTUMsTUFBTSxHQUFHRixLQUFLLEdBQUcsQ0FBdkIsQyxDQUVBOztBQUVBLElBQU1HLEdBQUcsR0FBR0osRUFBRSxDQUFDSSxHQUFILEdBQ1RDLFVBRFMsQ0FDRSxVQUFVQyxDQUFWLEVBQWE7QUFDdkIsU0FBT0EsQ0FBQyxDQUFDQyxFQUFUO0FBQ0QsQ0FIUyxFQUlUQyxRQUpTLENBSUEsVUFBVUYsQ0FBVixFQUFhO0FBQ3JCLFNBQU9BLENBQUMsQ0FBQ0csRUFBVDtBQUNELENBTlMsRUFPVEMsUUFQUyxDQU9BLFVBQVVKLENBQVYsRUFBYTtBQUNyQixTQUFPSyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxDQUFDTixDQUFDLENBQUNHLEVBQUYsR0FBT0gsQ0FBQyxDQUFDQyxFQUFWLElBQWdCLENBQXpCLEVBQTRCLEtBQTVCLENBQVA7QUFDRCxDQVRTLEVBVVRNLFNBVlMsQ0FVQyxZQUFZO0FBQ3JCLFNBQU9WLE1BQU0sR0FBRyxHQUFoQjtBQUNELENBWlMsRUFhVFcsV0FiUyxDQWFHLFVBQVVSLENBQVYsRUFBYTtBQUN4QjtBQUNBLFNBQU9BLENBQUMsQ0FBQ1MsRUFBRixHQUFPWixNQUFkO0FBQ0QsQ0FoQlMsRUFpQlRhLFdBakJTLENBaUJHLFVBQVVWLENBQVYsRUFBYTtBQUN4QixTQUFPSyxJQUFJLENBQUNNLEdBQUwsQ0FBU1gsQ0FBQyxDQUFDUyxFQUFGLEdBQU9aLE1BQWhCLEVBQXdCRyxDQUFDLENBQUNZLEVBQUYsR0FBT2YsTUFBUCxHQUFnQixDQUF4QyxDQUFQO0FBQ0QsQ0FuQlMsQ0FBWixDLENBcUJBOztBQUVBLElBQU1nQixTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFVQyxJQUFWLEVBQWdCO0FBQ2hDLE1BQU1DLElBQUksR0FBR3JCLEVBQUUsQ0FBQ3NCLFNBQUgsQ0FBYUYsSUFBYixFQUNWRyxHQURVLENBQ04sVUFBVWpCLENBQVYsRUFBYTtBQUNoQjtBQUNBO0FBQ0EsV0FBT0EsQ0FBQyxDQUFDa0IsS0FBVDtBQUNELEdBTFUsRUFNVkMsSUFOVSxDQU1MLFVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNwQixXQUFRQSxDQUFDLENBQUNILEtBQUYsR0FBVUUsQ0FBQyxDQUFDRixLQUFwQjtBQUNELEdBUlUsQ0FBYixDQURnQyxDQVVoQzs7QUFDQSxTQUFPeEIsRUFBRSxDQUFDbUIsU0FBSCxHQUNKUyxJQURJLENBQ0MsQ0FBQyxJQUFJakIsSUFBSSxDQUFDa0IsRUFBVixFQUFjUixJQUFJLENBQUNuQixNQUFMLEdBQWMsQ0FBNUIsQ0FERCxFQUVKbUIsSUFGSSxDQUFQO0FBR0QsQ0FkRCxDLENBaUJBOzs7QUFFQSxJQUFJUyxPQUFPLEdBQUc5QixFQUFFLENBQUMrQixJQUFILENBQVEsdUJBQVIsRUFBaUNDLElBQWpDLENBQXNDLFVBQVVaLElBQVYsRUFBZ0I7QUFDbEUsU0FBT0EsSUFBUDtBQUNELENBRmEsQ0FBZDtBQUlBVSxPQUFPLENBQUNFLElBQVIsQ0FBYSxVQUFVWixJQUFWLEVBQWdCO0FBQzNCO0FBRUE7QUFFQTtBQUNBLE1BQU1DLElBQUksR0FBR0YsU0FBUyxDQUFDQyxJQUFELENBQXRCO0FBQ0FhLFNBQU8sQ0FBQ0MsR0FBUixDQUFZYixJQUFaLEVBUDJCLENBUzNCOztBQUNBQSxNQUFJLENBQUNjLElBQUwsQ0FBVSxVQUFVN0IsQ0FBVixFQUFhO0FBQ3JCQSxLQUFDLENBQUM4QixPQUFGLEdBQVk5QixDQUFaO0FBQ0FBLEtBQUMsQ0FBQytCLFFBQUYsR0FBYS9CLENBQUMsQ0FBQ2tCLEtBQUYsR0FBVUgsSUFBSSxDQUFDRyxLQUE1QjtBQUNELEdBSEQsRUFWMkIsQ0FjM0I7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBRUEsTUFBTWMsS0FBSyxHQUFHLEVBQWQ7QUFDQSxNQUFNQyxPQUFPLEdBQUcsRUFBaEI7QUFDQSxNQUFNQyxlQUFlLEdBQUcsRUFBeEI7QUFFQW5CLE1BQUksQ0FBQ29CLFdBQUwsR0FBbUJDLE9BQW5CLENBQTJCLFVBQVNwQyxDQUFULEVBQVk7QUFDckMsUUFBSWlDLE9BQU8sQ0FBQ0ksT0FBUixDQUFnQnJDLENBQUMsQ0FBQ0osTUFBbEIsTUFBOEIsQ0FBQyxDQUFuQyxFQUF1QztBQUNyQ3FDLGFBQU8sQ0FBQ0ssSUFBUixDQUFhdEMsQ0FBQyxDQUFDSixNQUFmO0FBQ0FzQyxxQkFBZSxDQUFDbEMsQ0FBQyxDQUFDSixNQUFILENBQWYsR0FBNEIsRUFBNUI7QUFDRDs7QUFDRCxRQUFJb0MsS0FBSyxDQUFDSyxPQUFOLENBQWNyQyxDQUFDLENBQUNjLElBQUYsQ0FBT3lCLElBQXJCLE1BQStCLENBQUMsQ0FBcEMsRUFBdUM7QUFDckNQLFdBQUssQ0FBQ00sSUFBTixDQUFXdEMsQ0FBQyxDQUFDYyxJQUFGLENBQU95QixJQUFsQjtBQUNBTCxxQkFBZSxDQUFDbEMsQ0FBQyxDQUFDSixNQUFILENBQWYsQ0FBMEIwQyxJQUExQixDQUErQnRDLENBQUMsQ0FBQ2MsSUFBRixDQUFPeUIsSUFBdEM7QUFDRDtBQUNGLEdBVEQsRUE5QjJCLENBeUMzQjtBQUNBO0FBQ0E7QUFFQTs7QUFFQSxNQUFNQyxNQUFNLEdBQUcsRUFBZjtBQUVBUCxTQUFPLENBQUNHLE9BQVIsQ0FBaUIsVUFBU0ssQ0FBVCxFQUFZO0FBQzNCRCxVQUFNLENBQUNDLENBQUQsQ0FBTixHQUFZL0MsRUFBRSxDQUFDZ0QsWUFBSCxHQUFrQkMsS0FBbEIsQ0FBd0JqRCxFQUFFLENBQUNrRCxRQUFILENBQVlsRCxFQUFFLENBQUNtRCxrQkFBZixFQUNsQ1gsZUFBZSxDQUFDTyxDQUFELENBQWYsQ0FBbUJLLE1BQW5CLEdBQTRCLENBRE0sQ0FBeEIsQ0FBWjtBQUVELEdBSEQsRUFqRDJCLENBc0QzQjs7QUFFQSxNQUFNQyxpQkFBaUIsR0FBRyxFQUExQjtBQUNBLE1BQU1DLFdBQVcsR0FBRyxFQUFwQjtBQUNBLE1BQU1DLFdBQVcsR0FBRyxDQUFwQjtBQUNBLE1BQU1DLEtBQUssR0FBR2pCLE9BQU8sQ0FBQ2EsTUFBdEIsQ0EzRDJCLENBNkQzQjs7QUFFQSxNQUFNSyxTQUFTLEdBQUd6RCxFQUFFLENBQUNnRCxZQUFILEdBQ2JVLE1BRGEsQ0FDTm5CLE9BRE0sRUFFYlUsS0FGYSxDQUVQakQsRUFBRSxDQUFDaUQsS0FBSCxDQUFTTSxXQUFULEVBQXNCRCxXQUF0QixFQUFtQyxDQUFDLENBQUQsSUFBTUMsV0FBVyxHQUFHRCxXQUFwQixJQUFpQ0UsS0FBcEUsQ0FGTyxDQUFsQjtBQUtBLE1BQU1HLEdBQUcsR0FBRzNELEVBQUUsQ0FBQzRELE1BQUgsQ0FBVSxRQUFWLEVBQ1Y7QUFEVSxHQUVUQyxLQUZTLENBRUgsUUFGRyxFQUVPLE1BRlAsRUFHVEEsS0FIUyxDQUdILE1BSEcsRUFHSyxpQkFITCxDQUFaO0FBS0EsTUFBTUMsQ0FBQyxHQUFHSCxHQUFHLENBQUNJLE1BQUosQ0FBVyxHQUFYLEVBQ1BDLElBRE8sQ0FDRixXQURFLHNCQUN3Qi9ELEtBQUssR0FBRyxDQURoQyxlQUNzQ0EsS0FBSyxHQUFHLENBRDlDLE9BQVY7QUFHQSxNQUFNZ0UsSUFBSSxHQUFHSCxDQUFDLENBQUNDLE1BQUYsQ0FBUyxHQUFULEVBQ1ZHLFNBRFUsQ0FDQSxNQURBLEVBRVY5QyxJQUZVLENBRUxDLElBQUksQ0FBQ29CLFdBQUwsRUFGSyxFQUdWMEIsSUFIVSxDQUdMLE1BSEssRUFJVkgsSUFKVSxDQUlMLE1BSkssRUFJRyxVQUFVMUQsQ0FBVixFQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFdBQU93QyxNQUFNLENBQUN4QyxDQUFDLENBQUNKLE1BQUgsQ0FBTixDQUFpQnNDLGVBQWUsQ0FBQ2xDLENBQUMsQ0FBQ0osTUFBSCxDQUFmLENBQTBCeUMsT0FBMUIsQ0FBa0NyQyxDQUFDLENBQUNjLElBQUYsQ0FBT3lCLElBQXpDLENBQWpCLENBQVA7QUFDRCxHQVRVLEVBVVZtQixJQVZVLENBVUwsY0FWSyxFQVVXLFVBQVMxRCxDQUFULEVBQVk7QUFDaEMsUUFBSUEsQ0FBQyxDQUFDSixNQUFGLEtBQWFTLElBQUksQ0FBQ00sR0FBTCxPQUFBTixJQUFJLEVBQVE0QixPQUFSLENBQXJCLEVBQXVDO0FBQ3JDLGFBQU8sQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU9rQixTQUFTLENBQUNuRCxDQUFDLENBQUNKLE1BQUgsQ0FBaEI7QUFDRDs7QUFBQTtBQUNGLEdBaEJVLEVBaUJWOEQsSUFqQlUsQ0FpQkwsR0FqQkssRUFpQkEsVUFBVTFELENBQVYsRUFBYTtBQUN0QixXQUFPRixHQUFHLENBQUNFLENBQUMsQ0FBQzhCLE9BQUgsQ0FBVjtBQUNELEdBbkJVLENBQWIsQ0E1RTJCLENBaUczQjs7QUFFQTZCLE1BQUksQ0FBQ0YsTUFBTCxDQUFZLE9BQVosRUFDR0ssSUFESCxDQUNRLFVBQVM5RCxDQUFULEVBQVk7QUFDaEIscUJBQ0VBLENBQUMsQ0FBQytELFNBQUYsR0FDQ0MsR0FERCxDQUNLLFVBQVNoRSxDQUFULEVBQVk7QUFDZixhQUFPQSxDQUFDLENBQUNjLElBQUYsQ0FBT3lCLElBQWQ7QUFDRCxLQUhELEVBSUMwQixPQUpELEdBS0NDLEtBTEQsQ0FLTyxDQUxQLEVBTUNMLElBTkQsQ0FNTSxJQU5OLENBREYsaUJBU0VwRSxNQUFNLENBQUNPLENBQUMsQ0FBQ2tCLEtBQUgsQ0FUUix1QkFXRXhCLEVBQUUsQ0FBQ0QsTUFBSCxDQUFVLEtBQVYsRUFBaUJPLENBQUMsQ0FBQytCLFFBQW5CLENBWEY7QUFhRCxHQWZIO0FBaUJBLE1BQU1vQyxVQUFVLEdBQUdYLENBQUMsQ0FBQ0MsTUFBRixDQUFTLE1BQVQsRUFDaEJDLElBRGdCLENBQ1gsYUFEVyxFQUNJLFFBREosRUFFaEJBLElBRmdCLENBRVgsY0FGVyxFQUVLLENBRkwsRUFHaEJJLElBSGdCLENBR1gsWUFBVztBQUNmLHFCQUFVL0MsSUFBSSxDQUFDRCxJQUFMLENBQVV5QixJQUFwQixpQkFBK0I5QyxNQUFNLENBQUNzQixJQUFJLENBQUNHLEtBQU4sQ0FBckM7QUFDQyxHQUxjLENBQW5CO0FBU0QsQ0E3SEQsRTs7Ozs7Ozs7Ozs7QUNsRUEsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuLy8gfSlcblxuLy9ldmVyeXRoaW5nIGlzIGJ1bmRsZWQgaW50byBtYWluLmpzIGJ5IHdlYnBhY2sgYW5kIHdlIGp1c3QgaW5jbHVkZSBhIGxpbmsgdG8gXCJtYWluXCJcblxuLy9NeSBEMyBDb2RlIGhlcmU6XG5cbmNvbnN0IGZvcm1hdCA9IGQzLmZvcm1hdChcIixkXCIpO1xuXG4vL3NvbWUgY29uc3RhbnRzIGZvciBkaW1lbnNpb25zOlxuY29uc3Qgd2lkdGggPSA5MzI7XG5jb25zdCBoZWlnaHQgPSA5MzI7XG5jb25zdCByYWRpdXMgPSB3aWR0aCAvIDk7XG5cbi8vYXJjIGZ1bmN0aW9uXG5cbmNvbnN0IGFyYyA9IGQzLmFyYygpXG4gIC5zdGFydEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIGQueDA7XG4gIH0pXG4gIC5lbmRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngxO1xuICB9KVxuICAucGFkQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oKGQueDEgLSBkLngwKSAvIDIsIDAuMDA1KTtcbiAgfSlcbiAgLnBhZFJhZGl1cyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJhZGl1cyAqIDEuNTtcbiAgfSlcbiAgLmlubmVyUmFkaXVzKGZ1bmN0aW9uIChkKSB7XG4gICAgLy8gcmV0dXJuIDM7XG4gICAgcmV0dXJuIGQueTAgKiByYWRpdXM7XG4gIH0pXG4gIC5vdXRlclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBNYXRoLm1heChkLnkwICogcmFkaXVzLCBkLnkxICogcmFkaXVzIC0gMSk7XG4gIH0pO1xuXG4vL3BhcnRpdGlvbiBmdW5jdGlvblxuXG5jb25zdCBwYXJ0aXRpb24gPSBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25zdCByb290ID0gZDMuaGllcmFyY2h5KGRhdGEpXG4gICAgLnN1bShmdW5jdGlvbiAoZCkge1xuICAgICAgLy90aGlzIG9ubHkgc3VtcyB0aGUgbGVhdmVzLCB3aGljaCBoYXZlIGEgdmFsdWUgYXR0cmlidXRlXG4gICAgICAvLyBjb25zb2xlLmxvZyhkKTtcbiAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIH0pXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiAoYi52YWx1ZSAtIGEudmFsdWUpO1xuICAgIH0pXG4gIC8vIGNvbnNvbGUubG9nKHJvb3QuZGF0YS5uYW1lKTtcbiAgcmV0dXJuIGQzLnBhcnRpdGlvbigpXG4gICAgLnNpemUoWzIgKiBNYXRoLlBJLCByb290LmhlaWdodCArIDFdKVxuICAgIChyb290KTtcbn1cblxuXG4vL0kgZ2V0IG15IGpzb24gZGF0YSBpbnRvIGFuIG9iamVjdCBpbiB0aGlzIGZ1bmN0aW9uOlxuXG52YXIgZGF0YXNldCA9IGQzLmpzb24oJy4vZGF0YS9kaWV0X2RhdGEuanNvbicpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGE7XG59KTtcblxuZGF0YXNldC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgLy9BbGwgY29kZSB0byBkbyB2aXN1YWxpemF0aW9uIGdvZXMgaW5zaWRlIG9mIHRoaXMgY2FsbGJhY2tcblxuICAvL2dlbmVyYXRlIHJvb3QgXG4gIGNvbnN0IHJvb3QgPSBwYXJ0aXRpb24oZGF0YSk7XG4gIGNvbnNvbGUubG9nKHJvb3QpO1xuXG4gIC8vc2V0IGN1cnJlbnQgYXR0cmlidXRlXG4gIHJvb3QuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgIGQuY3VycmVudCA9IGQ7XG4gICAgZC5mcmFjdGlvbiA9IGQudmFsdWUgLyByb290LnZhbHVlO1xuICB9KTtcbiAgLy9jb25zb2xlLmxvZyhyb290LmRlc2NlbmRhbnRzKCkpO1xuXG4gIC8vY29sb3IgKE9MRClcblxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBkYXRhLmNoaWxkcmVuLmxlbmd0aCArIDEpKTtcblxuICAvLyBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgLy8gICBuYW1lcy5sZW5ndGgpKTtcblxuICAvL3JlZmFjdG9yaW5nIHRoZSBjb2xvciBtZXRob2RcblxuICBjb25zdCBuYW1lcyA9IFtdO1xuICBjb25zdCBoZWlnaHRzID0gW107XG4gIGNvbnN0IG5hbWVzX2J5X2hlaWdodCA9IHt9O1xuXG4gIHJvb3QuZGVzY2VuZGFudHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICBpZiAoaGVpZ2h0cy5pbmRleE9mKGQuaGVpZ2h0KSA9PT0gLTEgKSB7XG4gICAgICBoZWlnaHRzLnB1c2goZC5oZWlnaHQpO1xuICAgICAgbmFtZXNfYnlfaGVpZ2h0W2QuaGVpZ2h0XSA9IFtdO1xuICAgIH1cbiAgICBpZiAobmFtZXMuaW5kZXhPZihkLmRhdGEubmFtZSkgPT09IC0xKSB7XG4gICAgICBuYW1lcy5wdXNoKGQuZGF0YS5uYW1lKTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0ucHVzaChkLmRhdGEubmFtZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBjb25zb2xlLmxvZyhuYW1lcyk7XG4gIC8vIGNvbnNvbGUubG9nKGhlaWdodHMpO1xuICAvLyBjb25zb2xlLmxvZyhuYW1lc19ieV9oZWlnaHQpO1xuXG4gIC8vSW50ZXJwb2xhdGUgdGhlIHdob2xlIHJhaW5ib3cgYXQgZWFjaCBoZWlnaHQgaW4gdGhlIGhlaXJhcmNoeVxuXG4gIGNvbnN0IGNvbG9ycyA9IHt9O1xuXG4gIGhlaWdodHMuZm9yRWFjaCggZnVuY3Rpb24oaCkge1xuICAgIGNvbG9yc1toXSA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdyxcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtoXS5sZW5ndGggKyAxKSk7XG4gIH0pO1xuXG4gIC8vSSBhbHNvIHdhbnQgdG8gdmFyeSBvcGFjaXR5IGJ5IGhlaWdodFxuXG4gIGNvbnN0IG9wYWNpdHlfYnlfaGVpZ2h0ID0ge31cbiAgY29uc3Qgb3BhY2l0eV9taW4gPSAuNDtcbiAgY29uc3Qgb3BhY2l0eV9tYXggPSAxO1xuICBjb25zdCBzdGVwcyA9IGhlaWdodHMubGVuZ3RoO1xuXG4gIC8vIGNvbnN0IG9wYWNpdGllcyA9IGQzLmludGVycG9sYXRlTnVtYmVyKG9wYWNpdHlfbWF4LCBvcGFjaXR5X21pbik7XG4gIFxuICBjb25zdCBvcGFjaXRpZXMgPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgLmRvbWFpbihoZWlnaHRzKVxuICAgICAgLnJhbmdlKGQzLnJhbmdlKG9wYWNpdHlfbWF4LCBvcGFjaXR5X21pbiwgLTEgKiAob3BhY2l0eV9tYXggLSBvcGFjaXR5X21pbikvc3RlcHMpKTtcblxuXG4gIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNjaGFydFwiKVxuICAgIC8vIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAuc3R5bGUoXCJmb250XCIsIFwiMTBweCBzYW5zLXNlcmlmXCIpO1xuXG4gIGNvbnN0IGcgPSBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt3aWR0aCAvIDJ9LCAke3dpZHRoIC8gMn0pYCk7XG5cbiAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgLmRhdGEocm9vdC5kZXNjZW5kYW50cygpKVxuICAgIC5qb2luKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgLy8gd2hpbGUgKGQuZGVwdGggPiAxKSB7IGQgPSBkLnBhcmVudDsgfVxuICAgICAgLy8gY29uc29sZS5sb2coZC5kYXRhKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGQuaGVpZ2h0KTtcbiAgICAgIHJldHVybiBjb2xvcnNbZC5oZWlnaHRdKG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0uaW5kZXhPZihkLmRhdGEubmFtZSkpO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgaWYgKGQuaGVpZ2h0ID09PSBNYXRoLm1heCguLi5oZWlnaHRzKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7IFxuICAgICAgICByZXR1cm4gb3BhY2l0aWVzKGQuaGVpZ2h0KVxuICAgICAgfTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGFyYyhkLmN1cnJlbnQpO1xuICAgIH0pO1xuXG4gIC8vQWRkIHRpdGxlIGVsZW1lbnRzIHRvIGVhY2ggcGF0aFxuXG4gIHBhdGguYXBwZW5kKFwidGl0bGVcIilcbiAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gYCR7XG4gICAgICAgIGQuYW5jZXN0b3JzKClcbiAgICAgICAgLm1hcChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuZGF0YS5uYW1lO1xuICAgICAgICB9KVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5zbGljZSgxKVxuICAgICAgICAuam9pbihcIjogXCIpXG4gICAgICAgIH0gXFxuICR7XG4gICAgICAgIGZvcm1hdChkLnZhbHVlKVxuICAgICAgICB9IHRDTzJlIFxcbiAke1xuICAgICAgICBkMy5mb3JtYXQoXCIuMSVcIikoZC5mcmFjdGlvbilcbiAgICAgICAgfWA7XG4gICAgfSk7XG5cbiAgY29uc3QgY2hhcnRsYWJlbCA9IGcuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgIC50ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGAke3Jvb3QuZGF0YS5uYW1lfSBcXG4gJHtmb3JtYXQocm9vdC52YWx1ZSl9IHRDTzJlYDtcbiAgICAgIH0pO1xuXG4gIFxuXG59KTtcbiAgICBcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=