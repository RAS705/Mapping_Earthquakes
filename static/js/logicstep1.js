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

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let weekearthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data.
d3.json(weekearthquakes).then(function(data) {

  L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>Place: " + feature.properties.place + "</h2> <hr> <h3>Magnitude : " + feature.properties.mag + "</h3>");
     }}) 
  .addTo(map);
  });

