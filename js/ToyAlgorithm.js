

/*
 * Toy Algorithm - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the data to use in drawing th element
 */

ToyAlgorithm = function(_parentElement, _data){
	this.parentElement = _parentElement;
    this.data = _data;
    console.log(this.data);
    this.initVis();
}

ToyAlgorithm.prototype.initVis=function(){
  var vis = this;

  vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

	vis.width = 500 - vis.margin.left - vis.margin.right,
  vis.height = 400 - vis.margin.top - vis.margin.bottom;

  // SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
	    .attr("width", vis.width + vis.margin.left + vis.margin.right)
	    .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
	    .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");
}
