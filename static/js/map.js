
//var map = L.map('map').setView([51.505, -0.09], 13);
let map = L.map("map", {
    center: [
      30.3, -87.7
    ],
    zoom: 10
  });

console.log('Key: ', API_KEY);

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

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //id: 'mapbox/streets-v11',
    id: 'mapbox/satellite-streets-v11',
    //id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
//}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Coordinates for each point to be used in the polyline.
var line = [
  [[37.6213, -122.3790], [30.1944, -97.67], [43.6835, -79.6149], [40.6372, -73.7788]],
  [[33.9416, -118.4085], [37.6213, -122.3790], [40.7899, -111.9791], [47.4502, -122.3088]
  ]
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "blue"
}).addTo(map);

//Load city data from the Cities.js file
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
  console.log(city)
  //L.marker(city.location)
  L.circleMarker(city.location, {
    radius: city.population/100000
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
  .addTo(map);
 });