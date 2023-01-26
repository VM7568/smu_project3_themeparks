data=[]

d3.json("data.json").then( function(data) {
    console.log(data);
    doWork(data)
    makeBar(data)
});

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
