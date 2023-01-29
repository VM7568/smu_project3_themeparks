data = []

d3.json("data_group_average.json").then(function (data) {
    console.log(data);
    doWork(data);
});

(data).ready( function () {
    $("dataT").DataTable();
} );


