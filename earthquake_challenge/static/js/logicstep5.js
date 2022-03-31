let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  //id: 'mapbox/streets-v11',
  id: 'mapbox/satellite-streets-v11',
  //id: 'mapbox/dark-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  //id: 'mapbox/light-v10',
  //id: 'mapbox/satellite-streets-v11',
  //id: 'mapbox/dark-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

//console.log('APi_KEY: ', API_KEY);
//console.log('streets: ', streets);
//console.log('dark: ', dark);

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Satellite: satelliteStreets
};

//var map = L.map('map').setView([51.505, -0.09], 13);
// Create the map object with center and zoom level.
let map = L.map('map',{
  center: [
    39.5, -98.5
  ],
  zoom: 3,
  layers: [satelliteStreets]
});

//let map = L.map('map',{
//  center: [
//    30.3, -87.7
//  ],
//  zoom: 11,
//  layers: [streets]
//});

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let weekearthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data.
d3.json(weekearthquakes).then(function(data) {

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(),
    stroke: true,
    weight: 0.5
  };
}

  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
  },
  style:styleInfo,
   // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
}).addTo(earthquakes);

//Then we add earthquake layer to map
earthquakes.addTo(map);
  });


var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
  
  var div = L.DomUtil.create('div', 'info legend');

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br><br>" : "+");
  }
  return div;
};

legend.addTo(map);