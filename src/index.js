
document.addEventListener("DOMContentLoaded", () => {

})

//everything is bundled into main.js by webpack and we just include a link to "main"

//My D3 Code here:

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

//partition
const partition = function (data) {
  const root = d3.hierarchy(data)
    .sum(function (d) {
      console.log(d);
      return d.value;
    })
    .sort(function (a, b) {
      return (b.value - a.value);
    })
  // console.log(root);
  return d3.partition()
    .size([2 * Math.PI, root.height + 1])
    (root);
}






//I already know how to get my json data into an object in this function:

var dataset = d3.json('/data/diet_data.json').then(function (data) {
  return data;
});

dataset.then(function (data) {
  // console.log(data)
  //All code to do visualization goes inside of this callback

  //color
  const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,
    data.children.length + 1));

  //generate root 
  const root = partition(data);
  //console.log(root.descendants());

  //set current attribute
  root.each(function (d) {
    d.current = d;
  });
  //console.log(root.descendants());


  const svg = d3.select("#chart")
    .style("width", "100%")
    .style("height", "auto")
    .style("font", "10px sans-serif");

  const g = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${width / 2})`);

  const path = g.append("g")
    .selectAll("path")
    .data(root.descendants())
    .join("path")
    .attr("fill", function (d) {
      while (d.depth > 1) { d = d.parent; }
      return color(d.data.name);
    })
    .attr("fill-opacity", 1)
    .attr("d", function (d) {
      return arc(d.current);
    });


  //

});
    
