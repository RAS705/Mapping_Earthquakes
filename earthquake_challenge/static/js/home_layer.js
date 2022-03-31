let all Houses= new L.LayerGroup();

//Add a marker for my house
var marker = L.marker([30.31289, -87.65957])
.bindPopup("<h2>Gulf Shores, AL</h2> <hr> <h3>My Current House</h3>")
.addTo(allHouses);


//Add a marker for my house
var marker = L.marker([92.43404567241667, 44.059739551641556])
.bindPopup("<h2>Rochester, MN</h2> <hr> <h3>My Old House</h3>")
.addTo(allHouses);


//Add a marker for my house
var marker = L.marker([-92.4678361415863, 44.050393446915166])
.bindPopup("<h2>Rochester, MN</h2> <hr> <h3>My Mom's Old House</h3>")
.addTo(allHouses);


//Add a marker for my house
var marker = L.marker([-118.94593901932238, 34.1831617205302])
.bindPopup("<h2>Newbury Park, CA</h2> <hr> <h3>My Childhood House</h3>")
.addTo(allHouses);


allHouses.addTo(map);