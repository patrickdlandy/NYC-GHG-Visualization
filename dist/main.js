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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImZvcm1hdCIsImQzIiwid2lkdGgiLCJoZWlnaHQiLCJyYWRpdXMiLCJhcmMiLCJzdGFydEFuZ2xlIiwiZCIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwiTWF0aCIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwicGFydGl0aW9uIiwiZGF0YSIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsInNpemUiLCJQSSIsImRhdGFzZXQiLCJqc29uIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlYWNoIiwiY3VycmVudCIsImZyYWN0aW9uIiwibmFtZXMiLCJoZWlnaHRzIiwibmFtZXNfYnlfaGVpZ2h0IiwiZGVzY2VuZGFudHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwiY29sb3JzIiwiaCIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJsZW5ndGgiLCJvcGFjaXR5X2J5X2hlaWdodCIsIm9wYWNpdHlfbWluIiwib3BhY2l0eV9tYXgiLCJzdGVwcyIsIm9wYWNpdGllcyIsImRvbWFpbiIsInN2ZyIsInNlbGVjdCIsInN0eWxlIiwiZyIsImFwcGVuZCIsImF0dHIiLCJwYXRoIiwic2VsZWN0QWxsIiwiam9pbiIsInRleHQiLCJhbmNlc3RvcnMiLCJtYXAiLCJyZXZlcnNlIiwic2xpY2UiLCJjaGFydGxhYmVsIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FB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TU0sSUFOTixDQURGLGlCQVNFcEUsTUFBTSxDQUFDTyxDQUFDLENBQUNrQixLQUFILENBVFIsdUJBV0V4QixFQUFFLENBQUNELE1BQUgsQ0FBVSxLQUFWLEVBQWlCTyxDQUFDLENBQUMrQixRQUFuQixDQVhGO0FBYUQsR0FmSDtBQWlCQSxNQUFNb0MsVUFBVSxHQUFHWCxDQUFDLENBQUNDLE1BQUYsQ0FBUyxNQUFULEVBQ2hCQyxJQURnQixDQUNYLGFBRFcsRUFDSSxRQURKLEVBRWhCQSxJQUZnQixDQUVYLGNBRlcsRUFFSyxDQUZMLEVBR2hCSSxJQUhnQixDQUdYLFlBQVc7QUFDZixxQkFBVS9DLElBQUksQ0FBQ0QsSUFBTCxDQUFVeUIsSUFBcEIsaUJBQStCOUMsTUFBTSxDQUFDc0IsSUFBSSxDQUFDRyxLQUFOLENBQXJDO0FBQ0MsR0FMYyxDQUFuQjtBQVNELENBN0hELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbi8vIH0pXG5cbi8vZXZlcnl0aGluZyBpcyBidW5kbGVkIGludG8gbWFpbi5qcyBieSB3ZWJwYWNrIGFuZCB3ZSBqdXN0IGluY2x1ZGUgYSBsaW5rIHRvIFwibWFpblwiXG5cbi8vTXkgRDMgQ29kZSBoZXJlOlxuXG5jb25zdCBmb3JtYXQgPSBkMy5mb3JtYXQoXCIsZFwiKTtcblxuLy9zb21lIGNvbnN0YW50cyBmb3IgZGltZW5zaW9uczpcbmNvbnN0IHdpZHRoID0gOTMyO1xuY29uc3QgaGVpZ2h0ID0gOTMyO1xuY29uc3QgcmFkaXVzID0gd2lkdGggLyA5O1xuXG4vL2FyYyBmdW5jdGlvblxuXG5jb25zdCBhcmMgPSBkMy5hcmMoKVxuICAuc3RhcnRBbmdsZShmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkLngwO1xuICB9KVxuICAuZW5kQW5nbGUoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC54MTtcbiAgfSlcbiAgLnBhZEFuZ2xlKGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKChkLngxIC0gZC54MCkgLyAyLCAwLjAwNSk7XG4gIH0pXG4gIC5wYWRSYWRpdXMoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByYWRpdXMgKiAxLjU7XG4gIH0pXG4gIC5pbm5lclJhZGl1cyhmdW5jdGlvbiAoZCkge1xuICAgIC8vIHJldHVybiAzO1xuICAgIHJldHVybiBkLnkwICogcmFkaXVzO1xuICB9KVxuICAub3V0ZXJSYWRpdXMoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoZC55MCAqIHJhZGl1cywgZC55MSAqIHJhZGl1cyAtIDEpO1xuICB9KTtcblxuLy9wYXJ0aXRpb24gZnVuY3Rpb25cblxuY29uc3QgcGFydGl0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc3Qgcm9vdCA9IGQzLmhpZXJhcmNoeShkYXRhKVxuICAgIC5zdW0oZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vdGhpcyBvbmx5IHN1bXMgdGhlIGxlYXZlcywgd2hpY2ggaGF2ZSBhIHZhbHVlIGF0dHJpYnV0ZVxuICAgICAgLy8gY29uc29sZS5sb2coZCk7XG4gICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICB9KVxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gKGIudmFsdWUgLSBhLnZhbHVlKTtcbiAgICB9KVxuICAvLyBjb25zb2xlLmxvZyhyb290LmRhdGEubmFtZSk7XG4gIHJldHVybiBkMy5wYXJ0aXRpb24oKVxuICAgIC5zaXplKFsyICogTWF0aC5QSSwgcm9vdC5oZWlnaHQgKyAxXSlcbiAgICAocm9vdCk7XG59XG5cblxuLy9JIGdldCBteSBqc29uIGRhdGEgaW50byBhbiBvYmplY3QgaW4gdGhpcyBmdW5jdGlvbjpcblxudmFyIGRhdGFzZXQgPSBkMy5qc29uKCcuL2RhdGEvZGlldF9kYXRhLmpzb24nKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gIHJldHVybiBkYXRhO1xufSk7XG5cbmRhdGFzZXQudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAvLyBjb25zb2xlLmxvZyhkYXRhKVxuXG4gIC8vQWxsIGNvZGUgdG8gZG8gdmlzdWFsaXphdGlvbiBnb2VzIGluc2lkZSBvZiB0aGlzIGNhbGxiYWNrXG5cbiAgLy9nZW5lcmF0ZSByb290IFxuICBjb25zdCByb290ID0gcGFydGl0aW9uKGRhdGEpO1xuICBjb25zb2xlLmxvZyhyb290KTtcblxuICAvL3NldCBjdXJyZW50IGF0dHJpYnV0ZVxuICByb290LmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBkLmN1cnJlbnQgPSBkO1xuICAgIGQuZnJhY3Rpb24gPSBkLnZhbHVlIC8gcm9vdC52YWx1ZTtcbiAgfSk7XG4gIC8vY29uc29sZS5sb2cocm9vdC5kZXNjZW5kYW50cygpKTtcblxuICAvL2NvbG9yIChPTEQpXG5cbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgZGF0YS5jaGlsZHJlbi5sZW5ndGggKyAxKSk7XG5cbiAgLy8gY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gIC8vICAgbmFtZXMubGVuZ3RoKSk7XG5cbiAgLy9yZWZhY3RvcmluZyB0aGUgY29sb3IgbWV0aG9kXG5cbiAgY29uc3QgbmFtZXMgPSBbXTtcbiAgY29uc3QgaGVpZ2h0cyA9IFtdO1xuICBjb25zdCBuYW1lc19ieV9oZWlnaHQgPSB7fTtcblxuICByb290LmRlc2NlbmRhbnRzKCkuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgaWYgKGhlaWdodHMuaW5kZXhPZihkLmhlaWdodCkgPT09IC0xICkge1xuICAgICAgaGVpZ2h0cy5wdXNoKGQuaGVpZ2h0KTtcbiAgICAgIG5hbWVzX2J5X2hlaWdodFtkLmhlaWdodF0gPSBbXTtcbiAgICB9XG4gICAgaWYgKG5hbWVzLmluZGV4T2YoZC5kYXRhLm5hbWUpID09PSAtMSkge1xuICAgICAgbmFtZXMucHVzaChkLmRhdGEubmFtZSk7XG4gICAgICBuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLnB1c2goZC5kYXRhLm5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gY29uc29sZS5sb2cobmFtZXMpO1xuICAvLyBjb25zb2xlLmxvZyhoZWlnaHRzKTtcbiAgLy8gY29uc29sZS5sb2cobmFtZXNfYnlfaGVpZ2h0KTtcblxuICAvL0ludGVycG9sYXRlIHRoZSB3aG9sZSByYWluYm93IGF0IGVhY2ggaGVpZ2h0IGluIHRoZSBoZWlyYXJjaHlcblxuICBjb25zdCBjb2xvcnMgPSB7fTtcblxuICBoZWlnaHRzLmZvckVhY2goIGZ1bmN0aW9uKGgpIHtcbiAgICBjb2xvcnNbaF0gPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csXG4gICAgICBuYW1lc19ieV9oZWlnaHRbaF0ubGVuZ3RoICsgMSkpO1xuICB9KTtcblxuICAvL0kgYWxzbyB3YW50IHRvIHZhcnkgb3BhY2l0eSBieSBoZWlnaHRcblxuICBjb25zdCBvcGFjaXR5X2J5X2hlaWdodCA9IHt9XG4gIGNvbnN0IG9wYWNpdHlfbWluID0gLjQ7XG4gIGNvbnN0IG9wYWNpdHlfbWF4ID0gMTtcbiAgY29uc3Qgc3RlcHMgPSBoZWlnaHRzLmxlbmd0aDtcblxuICAvLyBjb25zdCBvcGFjaXRpZXMgPSBkMy5pbnRlcnBvbGF0ZU51bWJlcihvcGFjaXR5X21heCwgb3BhY2l0eV9taW4pO1xuICBcbiAgY29uc3Qgb3BhY2l0aWVzID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgIC5kb21haW4oaGVpZ2h0cylcbiAgICAgIC5yYW5nZShkMy5yYW5nZShvcGFjaXR5X21heCwgb3BhY2l0eV9taW4sIC0xICogKG9wYWNpdHlfbWF4IC0gb3BhY2l0eV9taW4pL3N0ZXBzKSk7XG5cblxuICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjY2hhcnRcIilcbiAgICAvLyAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG4gICAgLnN0eWxlKFwiZm9udFwiLCBcIjEwcHggc2Fucy1zZXJpZlwiKTtcblxuICBjb25zdCBnID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHt3aWR0aCAvIDJ9KWApO1xuXG4gIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcImdcIilcbiAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKSlcbiAgICAuam9pbihcInBhdGhcIilcbiAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIC8vIHdoaWxlIChkLmRlcHRoID4gMSkgeyBkID0gZC5wYXJlbnQ7IH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKGQuZGF0YSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkLmhlaWdodCk7XG4gICAgICByZXR1cm4gY29sb3JzW2QuaGVpZ2h0XShuYW1lc19ieV9oZWlnaHRbZC5oZWlnaHRdLmluZGV4T2YoZC5kYXRhLm5hbWUpKTtcbiAgICB9KVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIGlmIChkLmhlaWdodCA9PT0gTWF0aC5tYXgoLi4uaGVpZ2h0cykpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9IGVsc2UgeyBcbiAgICAgICAgcmV0dXJuIG9wYWNpdGllcyhkLmhlaWdodClcbiAgICAgIH07XG4gICAgfSlcbiAgICAuYXR0cihcImRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBhcmMoZC5jdXJyZW50KTtcbiAgICB9KTtcblxuICAvL0FkZCB0aXRsZSBlbGVtZW50cyB0byBlYWNoIHBhdGhcblxuICBwYXRoLmFwcGVuZChcInRpdGxlXCIpXG4gICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGAke1xuICAgICAgICBkLmFuY2VzdG9ycygpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmRhdGEubmFtZTtcbiAgICAgICAgfSlcbiAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAuc2xpY2UoMSlcbiAgICAgICAgLmpvaW4oXCI6IFwiKVxuICAgICAgICB9IFxcbiAke1xuICAgICAgICBmb3JtYXQoZC52YWx1ZSlcbiAgICAgICAgfSB0Q08yZSBcXG4gJHtcbiAgICAgICAgZDMuZm9ybWF0KFwiLjElXCIpKGQuZnJhY3Rpb24pXG4gICAgICAgIH1gO1xuICAgIH0pO1xuXG4gIGNvbnN0IGNoYXJ0bGFiZWwgPSBnLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgICAudGV4dChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBgJHtyb290LmRhdGEubmFtZX0gXFxuICR7Zm9ybWF0KHJvb3QudmFsdWUpfSB0Q08yZWA7XG4gICAgICB9KTtcblxuICBcblxufSk7XG4gICAgXG4iXSwic291cmNlUm9vdCI6IiJ9