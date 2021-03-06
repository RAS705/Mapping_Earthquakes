
//var map = L.map('map').setView([51.505, -0.09], 13);
let map = L.map("map", {
    center: [
      30.3, -87.7
    ],
    zoom: 11
  });

//console.log('Key: ', API_KEY);

//Add a marker to the map
var marker = L.marker([30.313, -87.66]).addTo(map);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
//}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
