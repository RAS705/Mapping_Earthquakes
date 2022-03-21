
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
  Satellite Streets: satelliteStreets
};

//var map = L.map('map').setView([51.505, -0.09], 13);
// Create the map object with center and zoom level.
let map = L.map('map',{
  center: [
    43.7, -79.3
  ],
  zoom: 11,
  layers: [satelliteStreets]
});

//let map = L.map('map',{
//  center: [
//    30.3, -87.7
//  ],
//  zoom: 11,
//  layers: [streets]
//});


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/RAS705/Mapping_Earthquakes/main/static/js/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
//  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h2>Airline Code: " + feature.properties.airline + "</h2> <hr> <h3>Destination : " + feature.properties.dst + "</h3>");
   }}) 
.addTo(map);
});


