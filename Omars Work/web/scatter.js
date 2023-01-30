data = []

d3.json("data_group_average.json").then(function (data) {
    console.log(data);
    doWork(data);
});



var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  };

var traces = [trace1];

Plotly.newPlot('scatter', traces);

