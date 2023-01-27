data=[]

d3.json("data2.json").then( function(data) {
    console.log(data);
    doWork(data)
    makes(data)
});


var trace1 = {
    x: ['South Korea', 'China', 'Canada'],
    y: [24, 10, 9],
    name: 'Gold',
    type: 'scatter',
    mode: 'markers'
  };
  
  var trace2 = {
    x: ['South Korea', 'China', 'Canada'],
    y: [13, 15, 12],
    name: 'Silver',
    type: 'scatter',
    mode: 'markers'
  };
  
  var trace3 = {
    x: ['South Korea', 'China', 'Canada'],
    y: [11, 8, 12],
    name: 'Bronze',
    type: 'scatter',
    mode: 'markers'
  };
  
  var data = [trace1, trace2, trace3];
  
  var layout = {
    scattermode: 'group',
    title: 'Grouped by Country',
    xaxis: {title: 'Country'},
    yaxis: {title: 'Medals'}
  };
  
  Plotly.newPlot('myDiv', data, layout);