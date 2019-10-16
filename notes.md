Code Snippets, Notes, Bugs, Useful commands

<!-- Page elements and content go here. -->
    <!-- old svg -->

    <!--
    <svg width="160" height="180">
        <rect x="30" width="20" height="40" fill="steelblue"></rect>
        <rect x="55" width="20" height="90" fill="steelblue"></rect>
        <rect x="80" width="20" height="30" fill="steelblue"></rect>
        <rect x="105" width="20" height="60" fill="steelblue"></rect>
    </svg>
    -->

    <!-- new svg -->
    <svg width="160" height="180">
        <rect x="30" width="20" fill="steelblue"></rect>
        <rect x="55" width="20" fill="steelblue"></rect>
        <rect x="80" width="20" fill="steelblue"></rect>
        <rect x="105" width="20" fill="steelblue"></rect>
    </svg>


       d3.selectAll( "rect" )
            .data( ratData )
            .attr( "height", function(d) {
                console.log(d);
                return d;
            } );

Check Scrimba for D3 tutorials

 //BAR CHART EXAMPLE:

        var ratData = [ 50, 90, 30, 60 ]; //Rat data

        //width and height of SVG
        var w = 150;
        var h = 175;

        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        //Select and generate rectange elements
        svg.selectAll( "rect" )
            .data( ratData ) //when we bind the data to our empty selection with 
            //the data() method, it will return the four data values in our dataset
            .enter() //when we load data, it will iterate through the dataset and 
            //apply all methods that follow to each of the values of our dataset:
            .append("rect") //this will insert a rectangle into each of the 
            //placeholders that do not have a "rect" element, which is all of them.
            //.attr( "x", 30 ) //iteratively sets attributes, such as (x, y) location,
            //width, and height for each of the rectangle elements. 
            .attr( "x", function(d, i){
                return i*25 + 30; // Set x coordinate of rectangle to index of 
                //data value and add 30 to account for left margin.
            })
            .attr( "y", function(d) {
                return h - d; // Set y coordinate for each bar to height minus 
                //the data value
            } )
            .attr( "width", 20 )
            .attr( "height", function(d) {
                return d; //set height of rectangle to data value
            } )
            .attr( "fill", "steelblue");

            //Create y-axis
            svg.append("line")
                .attr("x1", 30)
                .attr("y1", 75)
                .attr("x2", 30)
                .attr("y2", 175)
                .attr("stroke-width", 2)
                .attr("stroke", "black");

            //Create x-axis
            svg.append("line")
                .attr("x1", 30)
                .attr("y1", 175)
                .attr("x2", 130)
                .attr("y2", 175)
                .attr("stroke-width", 2)
                .attr("stroke", "black");

            //Add a label
            //y axis label
            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .text("No. of Rats")
                .attr("transform", "translate(20, 80) rotate(-90)");

{"GHG Inventory"=>{
    "CY 2005"=>{
        "Stationary Energy"=>{
            "Commercial and Institutional"=>{
                "#2 fuel oil"=>"855215", 
                "#4 fuel oil"=>"153274", 
                "#6 fuel oil"=>"270277", 
                "Biofuel"=>"1", 
                "Electricity"=>"11253009", 
                "Natural gas"=>"3039660", 
                "Steam"=>"1239372"
            }, 
            "Fugitive"=>{
                "Fugitive CH4"=>"207589"
            }, 
            "Manufacturing and Construction"=>{
                "#2 fuel oil"=>"196673", 
                "#4 fuel oil"=>"32943", 
                "#6 fuel oil"=>"20819", 
                "Biofuel"=>"0", 
                "Electricity"=>"3767250", 
                "Natural gas"=>"910089", 
                "Steam"=>"371812"
                }, 
            "Residential"=>{
                "#2 fuel oil"=>"1509205", 
                "#4 fuel oil"=>"858782", 
                "#6 fuel oil"=>"2202564", 
                "Biofuel"=>"5", 
                "Electricity"=>"6079321", 
                "Natural gas"=>"9088939", 
                "Steam"=>"332201"
                }
            }, 
        

        //D3 Example Pie Chart Code goes here.
        
        var data = [
        {"platform": "Android", "percentage" : 40.11},
        {"platform": "Windows", "percentage" : 36.69},
        {"platform": "iOS", "percentage": 13.06}
        ];
        
        var svgWidth = 500, svgHeight = 300, radius = Math.min(svgWidth, svgHeight) / 2;
        var svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);
        
        //Create group element to hold pie chart
        var g = svg.append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");
        
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        var pie = d3.pie().value(function(d) {
        return d.percentage;
        });
        
        var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius * 1 / 3);
        
        var arc = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");
        
        arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) {
        return color(d.data.percentage);
        });
        
        var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);
        
        arc.append("text")
        .attr("transform", function(d) {
        return "translate(" + label.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.platform+":"+d.data.percentage+"%"; });

        backup of first sunburst attampe based on Observable:


            console.log(data);

            //root hierarchy
            var firstRoot = d3.hierarchy(data);
            console.log(firstRoot);
            // console.log(firstRoot);

            //partition function
            const partition = function(data) {
                return d3.partition()
                .size([2 * Math.PI, newRadius])
                (d3.hierarchy(data).sum(function(d) {
                    return d.value;
                })
                .sort(function(a, b) {
                    return (b.value - a.value)
                }));
            }

            //arc function
            const arc = d3.arc()
                .startAngle(function(d) { 
                    return d.x0;
                })
                .endAngle(function(d) {
                    return d.x1;
                })
                .padAngle(function(d) {
                    return Math.min((d.x1 - d.x0) / 2, 0.005);
                })
                .padRadius( newRadius / 2 )
                .innerRadius(function(d) {
                    return d.y0;
                })
                .outerRadius(function(d) {
                    return d.y1 - 1;
                });

            //color function
            const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

            const root = partition(data);
            // console.log(root);

            const svg = d3.create("svg")
                .style("max-width", "100%")
                .style("height","auto")
                .style("font", "10px sans-serif")
                .style("margin", "5px");

            svg.append("g")
                .attr("fill-opacity", 0.6)
                .selectAll("path")
                .data(root.descendants().filter(function(d) {
                    return d.depth;
                }))
                .enter().append("path")
                .attr("fill", function(d) {
                    while (d.depth > 1) {
                        d = d.parent;
                        return color(d.data.name);
                    }
                })
                .attr("d", arc)
                .append("title")
                .text();

            
          