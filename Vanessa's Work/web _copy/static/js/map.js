$(document).ready(function () {

    // Perform a GET request to the query URL.
    d3.json(map.json).then(function (data) {
      console.log(data.features);
      makeMap(data)   // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.
    });
});

// helper function
function onEachFeature(feature, layer) {
  layer.bindPopup(`<h3>${feature.properties.neighborhood}</h3>`);
}

// make map
function makeMap(data) {

  // STEP 1: CREATE THE BASE LAYERS

  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });



  // STEP 2: CREATE THE OVERLAY/DATA LAYERS
  let geoLayer = L.geoJSON(data.features, {
    onEachFeature: onEachFeature
  });


  // STEP 3: CREATE THE LAYER CONTROL OBJECTS

  let baseMaps = {
    Street: street,
    Topography: topo
  };

  // Overlays that can be toggled on or off
  let overlayMaps = {
    Earthquakes: geoLayer
  };


  // STEP 4: INITIALIZE MAP
  let myMap = L.map("map", {
    center: [32.6400541, -117.0841955],
    zoom: 11,
    layers: [street, geoLayer]
  });

  // STEP 5: ADD LAYER CONTROL TO MAP

  // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

}
