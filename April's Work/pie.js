// @ADD YOUR CODE HERE

d3.select("#Year").on("change", function() {
    let Year = d3.select("#Year").node().value;
    console.log(Year);
    makePlot(Year);
});

function makePlot(Year) {
    let ugh = data[Year];
    let values = Object.values(ugh);
    let labels = Object.keys(ugh);

    let trace = {
        values: values,
        labels: labels,
        hole: 0.4,
        type: 'pie'
    }

    let layout = {
        title: `Donut Chart for ${Year}`,
        height: 400,
        width: 400,
        showlegend: false
    }

    let traces = [trace];

    Plotly.newPlot('pie', traces, layout);
}

// on page load
makePlot("australia");