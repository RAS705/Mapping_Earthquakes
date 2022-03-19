
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
    id: 'mapbox/streets-v11',
    //id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
//}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

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