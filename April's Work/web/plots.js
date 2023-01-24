// @ADD YOUR CODE HERE

d3.select("#country").on("change", function() {
    let country = d3.select("#country").node().value;
    console.log(country);
    makePlot(country);
});

function makePlot(country) {
    let ugh = data[country];
    let values = Object.values(ugh);
    let labels = Object.keys(ugh);

    let trace = {
        values: values,
        labels: labels,
        hole: 0.4,
        type: 'pie'
    }

    let layout = {
        title: `Donut Chart for ${country}`,
        height: 400,
        width: 400,
        showlegend: false
    }

    let traces = [trace];

    Plotly.newPlot('pie', traces, layout);
}

// on page load
makePlot("australia");