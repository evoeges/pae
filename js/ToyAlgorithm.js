/*
 * Toy Algorithm - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the data to use in drawing th element
 */

ToyAlgorithm = function(_parentElement, _data, _selections) {
  this.parentElement = _parentElement;
  this.data = _data;
  this.selections = _selections;
  this.initVis();
}

ToyAlgorithm.prototype.initVis = function() {
  var vis = this;

  vis.margin = {
    top: 40,
    right: 60,
    bottom: 60,
    left: 60
  };

  var windowWidth = ($(window).width()) / 2;

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
    .domain(d3.extent(vis.data, function(d) {
      return d.x_position;
    }));

  vis.y = d3.scaleLinear()
    .range([vis.height, 0])
    .domain(d3.extent(vis.data, function(d) {
      return d.y_position;
    }));

  vis.xAxis = d3.axisBottom()
    .scale(vis.x);

  vis.yAxis = d3.axisLeft()
    .scale(vis.y);

  vis.svg.append("g")
    .attr("class", "x-axis axis")
    .attr("transform", "translate(0," + vis.height + ")");

  vis.svg.append("g")
    .attr("class", "y-axis axis");

  vis.wrangleData(vis.selections);
}

ToyAlgorithm.prototype.wrangleData = function(selections) {
  //currently empty function. maybe we'll use this to create the actual regression?
  /*
  We could create an actual regression function with coefficients and for each house factor in the variables that have been selected into the regression to generate a probability of fire and then set on fire if the probability is above a threshold
  */
  var vis = this;

  regressionEq();

  function regressionEq() {
    /* for (var i=0; i<vis.data.length; i++) {
 			vis.data[i].Fire=	(
				(.01 * vis.data[i].Building_Age)*selections.age +
				(.01 * vis.data[i].Architectural_Style)*selections.style +
				(.01*vis.data[i].Square_Footage)*selections.sq_footage +
				(.01*vis.data[i].Neighborhood)*selections.neighborhood +
				(.008* vis.data[i].Proximity_Prev_Fires)*selections.prev_fire +
				(.01*vis.data[i].Height)*selections.height+
				(.025*vis.data[i].Number_Occupants)*selections.no_occupants+
				(.03*vis.data[i].Business)*selections.business -
				(.02*vis.data[i].Last_Inspection)*selections.last_inspection +
				(0*vis.data[i].Number_Windows)*selections.no_windows);

		} */

    for (var i = 0; i < vis.data.length; i++) {
      vis.data[i].Fire = (
        (.000002782 * vis.data[i].Building_Age) * selections.age +
        (.00000001143 * vis.data[i].Square_Footage) * selections.sq_footage +
        (.004761 * vis.data[i].boroughBX) * selections.neighborhood +
        (.0003790 * vis.data[i].boroughMN) * selections.neighborhood +
        (.0003136 * vis.data[i].boroughQN) * selections.neighborhood +
        (.0001211 * vis.data[i].boroughSI) * selections.neighborhood +
        (.0006597 * vis.data[i].Height) * selections.height +
        (.000009939 * vis.data[i].Number_Occupants) * selections.no_occupants +
        (.006791 * vis.data[i].landuse4) * selections.business +
        (-.0007427 * vis.data[i].landuse5) * selections.business +
        (-.0000000009511 * vis.data[i].assesstot) * selections.dollar_value) * 100;
      if (vis.data[i].Fire >= 1) {
        vis.data[i].Fire = .99;
      }
      if (vis.data[i].Fire <= 0) {
        vis.data[i].Fire = 0;
      }
    }
  }



  var vis = this;
  vis.updateVis();
}

ToyAlgorithm.prototype.updateVis = function() {
  var vis = this;

  var formatPercent = d3.format(".000%");
  var formatMoney = d3.format("($.2s");
  var formatArea = d3.format(",.2r");

  vis.tip = d3.tip()
    .attr('class', 'd3-tip popover toy_algo_tip')
    .html(function(d) {
      return d.Address + "<br>" +
        d.borough + "<br>" +
        d.Building_Age + " years old" + "<br>" +
        formatArea(d.Square_Footage) + " sq ft" + "<br>" +
        d.Number_Occupants + " occupants" + "<br>" +
        formatMoney(d.assesstot) + " value" + "<br>" +
        d.Height + " floors" + "<br>" +
        "<strong>" + "Fire Risk: " + formatPercent(d.Fire) + "</strong>";

    });

  vis.svg.call(vis.tip);

  var houses = vis.svg.selectAll("rect")
    .data(vis.data);

  houses.enter().append("rect")
    .attr("class", "rect")
    .on("mouseover", vis.tip.show)
    .on("mouseout", vis.tip.hide)


    .merge(houses)
    .transition()
    .duration(1000)
    .attr("fill", "var(--houses-color)")
    /*.attr("fill", "#fff")
			 .attr("stroke-width", "4")*/
    .attr("height", 40)
    .attr("width", 40)
    .attr("x", function(d) {
      return vis.x(d.x_position);
    })
    .attr("y", function(d) {
      return vis.y(d.y_position);
    });

  houses.exit().remove();

  var fires = vis.svg.selectAll("text")
    .data(vis.data);

  fires.enter().append("text")
    .merge(fires)
    .transition()
    .duration(1000)
    .attr("class", "fa")
    .text(function(d) {
      if (d.Fire > .3) {
        return '\uf06d';
      }
    })
    .attr("fill", "#EF6C00")
    .attr('font-size', function(d) {
      return '40px'
    })
    .attr("x", function(d) {
      return vis.x(d.x_position) + 20;
    })
    .attr("y", function(d) {
      return vis.y(d.y_position) + 20;
    });

  fires.exit().remove();

  /* 		svg.append('text')
  .attr('x', 15)
   .attr('y', -17)
   .attr('fill', 'black')
   .attr("class", "fa")
   .attr('font-size', function (d) { return '20px' })
   .text(function (d) { return '\uf2b9' }); */



}
