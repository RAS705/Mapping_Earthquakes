
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  //id: 'mapbox/streets-v11',
  //id: 'mapbox/satellite-streets-v11',
  id: 'mapbox/dark-v10',
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
  Dark: dark
};

//var map = L.map('map').setView([51.505, -0.09], 13);
// Create the map object with center and zoom level.
let map = L.map('map',{
  center: [
    30, 30
  ],
  zoom: 2,
  layers: [streets]
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

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/RAS705/Mapping_Earthquakes/main/static/js/majorAirports.json";


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {

//console.log(data);

L.geoJSON(data, {
onEachFeature: function(feature, layer) {
  layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2> <hr> <h3>Airprot name: " + feature.properties.name + "</h3>");
 }})
.addTo(map)
});

//Add a marker for my house
var marker = L.marker([30.31289, -87.65957])
.bindPopup("<h2>Gulf Shores, AL</h2> <hr> <h3>My House</h3>")
.addTo(map);

L.circle([30.31289, -87.65957], {
  radius: 300,
  color:"black",
  fillColor: "yellow"
}).addTo(map);

//L.circleMarker([30.31289, -87.65957], {
//  radius: 300,
//  color:"black",
//  fillColor: "yellow"
//}).addTo(map);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h2>Airport Code: SFO</h2> <hr> <h3>Airprot name: San Fransisco International Airport</h3>");
   }
}).addTo(map);

//}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);


// Coordinates for each point to be used in the polyline.
//var line = [
//  [[37.6213, -122.3790], [30.1944, -97.67], [43.6835, -79.6149], [40.6372, -73.7788]],
//  [[33.9416, -118.4085], [37.6213, -122.3790], [40.7899, -111.9791], [47.4502, -122.3088]
//  ]
//];

// Create a polyline using the line coordinates and make the line red.
//L.polyline(line, {
//  color: "blue"
//}).addTo(map);

//Load city data from the Cities.js file
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
  //console.log(city)
  //L.marker(city.location)
  L.circleMarker(city.location, {
    radius: city.population/100000
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
  .addTo(map);
 });