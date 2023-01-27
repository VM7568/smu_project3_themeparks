
// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1260 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initialize the X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .padding(1);
const xAxis = svg.append("g")
  .attr("transform", `translate(0, ${height})`)

// Initialize the Y axis
const y = d3.scaleLinear()
  .range([ height, 0]);
const yAxis = svg.append("g")
  .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("dfgp3.csv").then( function(data) {

    // X axis
    x.domain(data.map(function(d) { return d.device_category; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing circle
    const j = svg.selectAll(".myLine")
      .data(data)
    // update lines
    j
      .join("line")
      .attr("class", "myLine")
      .transition()
      .duration(1000)
        .attr("x1", function(d) { return x(d.device_category); })
        .attr("x2", function(d) { return x(d.device_category); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d[selectedVar]); })
        .attr("stroke", "grey")


    // variable u: map data to existing circle
    const u = svg.selectAll("circle")
      .data(data)
    // update bars
    u
      .join("circle")
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.device_category); })
        .attr("cy", function(d) { return y(d[selectedVar]); })
        .attr('fill-opacity', 0.6)
        .attr("r", 16)
        .attr("fill", "#4633ff");


  })

}

// Initialize plot
update('var1')










  // https://d3-graph-gallery.com/graph/lollipop_basic.html