

/*
 * Toy Algorithm - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the data to use in drawing th element
 */

ToyAlgorithm = function (_parentElement, _data){
	this.parentElement = _parentElement;
    this.data = _data;
    console.log(this.data);
    console.log(this.parentElement);
    this.initVis();
}

ToyAlgorithm.prototype.initVis=function(){
  var vis = this;

  vis.margin = { top: 40, right: 60, bottom: 60, left: 60 };

	var windowWidth= ($( window ).width())/2;

//set the height and width to be dynamic to the viewport at some point
	vis.width = windowWidth - vis.margin.left - vis.margin.right,
  vis.height = 400 - vis.margin.top - vis.margin.bottom;

  // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
          .attr("width", vis.width + vis.margin.left + vis.margin.right)
          .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
          .append("g")
          .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

      // Scales and axes
   vis.x = d3.scaleLinear()
       .range([0, vis.width])
      .domain(d3.extent(vis.data, function(d) { return d.x_position; }));

   vis.y = d3.scaleLinear()
       .range([vis.height, 0])
       .domain(d3.extent(vis.data, function(d) {return d.y_position; }));

   vis.xAxis = d3.axisBottom()
       .scale(vis.x);

   vis.yAxis = d3.axisLeft()
       .scale(vis.y);

   vis.svg.append("g")
       .attr("class", "x-axis axis")
       .attr("transform", "translate(0," + vis.height + ")");

   vis.svg.append("g")
       .attr("class", "y-axis axis");

       vis.wrangleData();
}

ToyAlgorithm.prototype.wrangleData=function(){
//currently empty function. maybe we'll use this to create the actual regression?
/*
We could create an actual regression function with coefficients and for each house factor in the variables that have been selected into the regression to generate a probability of fire and then set on fire if the probability is above a threshold
*/
 	var vis= this;
	vis.updateVis("none");
}

ToyAlgorithm.prototype.updateVis = function(id){
 var vis= this;

var houses =  vis.svg.selectAll("rect")
       .data(vis.data);

       houses.enter().append("rect")
			 .attr("class", "rect")

			 .merge(houses)
			 .transition()
			 .duration(1000)
       .attr("fill", function(){
				 if (id==="none"){
					 return "var(--main-color)";
					 }
				 else { return "red";}
			 })
       .attr("stroke", "#fff")
			 .attr("height", 40)
			 .attr("width", 40)
       .attr("x", function (d) {
           return vis.x(d.x_position);
       })
       .attr("y", function (d) {
           return vis.y(d.y_position);
       });

			 houses.exit().remove();
}
