data = []

d3.csv("sample_df.csv").then(function (data) {
    console.log(data);
    doWork(data)
});


function doWork(data) {
    let trace = {
        type: 'bar',
        x: data.map(x => x.device_category),
        y: data.map(x => +x.num_injured),

        box: {
            visible: true
        },
        line: {
            color: 'blue',
        },
        meanline: {
            visible: true
        }
    }

    let traces = [trace]
    var layout = {
        title: "Device Accidents",
        yaxis: {
            zeroline: false
        }
    }

    Plotly.newPlot('bubble', traces, layout);

}
//










