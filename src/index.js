
import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  //everything is bundled into main.js by webpack and we just include a link to "main"
  
  //My D3 Code here:
  
  const format = d3.format(",d");
  
  //some constants for dimensions:
  const width = 932;
  const height = 932;
  const radius = width / 9;
  
  //arc function
  
  const arc = d3.arc()
  .startAngle(function (d) {
    return d.x0;
  })
  .endAngle(function (d) {
    return d.x1;
  })
  .padAngle(function (d) {
    return Math.min((d.x1 - d.x0) / 2, 0.005);
  })
  .padRadius(function () {
    return radius * 1.5;
  })
  .innerRadius(function (d) {
    // return 3;
    return d.y0 * radius;
  })
  .outerRadius(function (d) {
    return Math.max(d.y0 * radius, d.y1 * radius - 1);
  });
  
  //partition function
  
  const partition = function (data) {
    const root = d3.hierarchy(data)
    .sum(function (d) {
      //this only sums the leaves, which have a value attribute
      // console.log(d);
      return d.value;
    })
    .sort(function (a, b) {
      return (b.value - a.value);
    })
    // console.log(root.data.name);
    return d3.partition()
    .size([2 * Math.PI, root.height + 1])
    (root);
  }

  

  //I get my json data into an object in this function:

  var dataset = d3.json('./data/diet_data.json').then(function (data) {
    return data;
  });

  console.log(dataset);

  dataset.then(function (data) {
  // console.log(data)
  
  //All code to do visualization goes inside of this callback
  
  //generate root 
  const root = partition(data);
  console.log(root);
  
  //set current attribute
  root.each(function (d) {
    d.current = d;
    d.fraction = d.value / root.value;
  });
  //console.log(root.descendants());
  
  //color (OLD)
  
  // const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,
  //   data.children.length + 1));
  
  // const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,
  //   names.length));
  
  //refactoring the color method
  
  const names = [];
  const heights = [];
  const names_by_height = {};
  
  root.descendants().forEach(function(d) {
    if (heights.indexOf(d.height) === -1 ) {
      heights.push(d.height);
      names_by_height[d.height] = [];
    }
    if (names.indexOf(d.data.name) === -1) {
      names.push(d.data.name);
      names_by_height[d.height].push(d.data.name);
    }
  });
  
  // console.log(names);
  // console.log(heights);
  // console.log(names_by_height);
  
  //Interpolate the whole rainbow at each height in the heirarchy
  
  const colors = {};
  
  heights.forEach( function(h) {
    colors[h] = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,
      names_by_height[h].length + 1));
    });
    
    //I also want to vary opacity by height
    
    const opacity_by_height = {}
    const opacity_min = .4;
    const opacity_max = 1;
    const steps = heights.length;
    
    // const opacities = d3.interpolateNumber(opacity_max, opacity_min);
    
    const opacities = d3.scaleOrdinal()
    .domain(heights)
      .range(d3.range(opacity_max, opacity_min, -1 * (opacity_max - opacity_min)/steps));

      
      const svg = d3.select("#chart")
      // .style("width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif");
      
      const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${width / 2})`);
      
      const path = g.append("g")
      .selectAll("path")
      .data(root.descendants())
      .join("path")
      .attr("fill", function (d) {
        // while (d.depth > 1) { d = d.parent; }
        // console.log(d.data);
      // console.log(d.height);
      return colors[d.height](names_by_height[d.height].indexOf(d.data.name));
    })
    .attr("fill-opacity", function(d) {
      if (d.height === Math.max(...heights)) {
        return 0;
      } else { 
        return opacities(d.height)
      };
    })
    .attr("d", function (d) {
      return arc(d.current);
    });
    
    //Add title elements to each path
    
    path.append("title")
    .text(function(d) {
      return `${
        d.ancestors()
        .map(function(d) {
          return d.data.name;
        })
        .reverse()
        .slice(1)
        .join(": ")
      } \n ${
        format(d.value)
      } tCO2e \n ${
        d3.format(".1%")(d.fraction)
        }`;
      });
      
    const chartlabel = g.append("text")
    .attr("text-anchor", "middle")
    .attr("fill-opacity", 1)
    .text(function() {
      return `${root.data.name} \n ${format(root.value)} tCO2e`;
    });
    
    //add dataset title to nav bar
    // var nav_title = root.data.name;
    // document.getElementById("nav-title").innerHTML = nav_title;

    //dropdown code here
    var yearNavChildren = document.querySelectorAll(".nav-element-right a");
    for (var x = 0; x < yearNavChildren.length; x++) {
      yearNavChildren[x].onclick = function() {
        var yearNav = this.parentNode.getElementsByClassName("year-navigator")[0];
        if (yearNav.classList.contains("selected")) {
          yearNav.classList.remove("selected");
        } else {
          yearNav.classList.add("selected");
        }
      }
    }

  });
  
});