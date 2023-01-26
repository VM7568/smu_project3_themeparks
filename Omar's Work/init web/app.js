data=[]

d3.json("data.json").then( function(data) {
    console.log(data);
    doWork(data)
    makeBar(data)
});

//DID NOT WORK

// var xmlhttp = new XMLHttpRequest();
// var url = "http://127.0.0.1:5500/init%20web/index.html#/js/data.json";
// xmlhttp.open("GET",url,true);
// xmlhttp.send();
// xmlhttp.onreadystatechange = function(){
//   if(this.readyState == 4 && this.status == 200){
//     var data = JSON.parse(this.responseText);
//     $('#example').DataTable({
//       //ajax: 'data/objects.txt',
//       "data":data.data,
//       "columns": [
//           { data: 'acc_id' },
//           { data: 'acc_date' },
//           { data: 'acc_state' },
//           { data: 'acc_city' },
//           { data: 'device_type' },
//           { data: 'year' },
//       ],
//     });
//   }
// }



function makeBar(data){
  let year = 2007;
  let sub = data.filter(x=> x.year == year);

  let devices=[];
  let injury_num = [];
  let injury_count = [];

  sub.forEach(function(row){
    let device = row.device_category;
    let num_inj= row.num_injured;

    if(devices.includes(device)){
      let idx=devices.indexOf(device);
      injury_num[idx]+=num_inj;
      injury_count[idx]+=1;
    } else{
      devices.push(device);
      injury_num.push(num_inj);
      injury_count.push(1);
    }

  });

  let full_data = [];
  for(let i = 0; i < devices.length; i++){
    let row = [devices[i], injury_num[i], injury_count[i]];
    full_data.push(row);
  }

  full_data.sort((a,b)=>b[1]-a[1]);

  var trace1 = {
    x: full_data.map(x=>x[0]),
    y: full_data.map(x=>x[1]),
    name: 'Total Injuries',
    type: 'bar'
  };
  

  
  var traces = [trace1];
  
  var layout = {title: `Total Injuries for ${year}`};
  
  Plotly.newPlot('bar', traces, layout);
}

function doWork(data){
    let trace = {
        type: 'violin',
        x: data.map(x=>x.device_category),
        y: data.map(x=>+x.num_injured),

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


// var data = [{
//     values: [16, 15, 12, 6, 5, 4, 42],
//     labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
//     domain: {column: 0},
//     name: 'GHG Emissions',
//     hoverinfo: 'label+percent+name',
//     hole: .4,
//     type: 'pie'
//   },{
//     values: [27, 11, 25, 8, 1, 3, 25],
//     labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
//     text: 'CO2',
//     textposition: 'inside',
//     domain: {column: 1},
//     name: 'CO2 Emissions',
//     hoverinfo: 'label+percent+name',
//     hole: .4,
//     type: 'pie'
//   }];
  
//   var layout = {
//     title: 'Global Emissions 1990-2011',
//     annotations: [
//       {
//         font: {
//           size: 20
//         },
//         showarrow: false,
//         text: 'GHG',
//         x: 0.17,
//         y: 0.5
//       },
//       {
//         font: {
//           size: 20
//         },
//         showarrow: false,
//         text: 'CO2',
//         x: 0.82,
//         y: 0.5
//       }
//     ],
//     height: 400,
//     width: 600,
//     showlegend: false,
//     grid: {rows: 1, columns: 2}
//   };
  
//   Plotly.newPlot('myDiv', data, layout);