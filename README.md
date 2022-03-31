# Mapping_Earthquakes
## Introduction

You have been hired by the Disaster Reporting Networking to help build a website which reports earthquakes from around the world for the last week.

You're new boss, Bsail, has teamed you with Sadhana.

Basil has asked that you and Sadhana get the latest earthquake data from the US Geological Survey office.

The website should show the following:

<ul>
	<li>Be able to show different maps to visualize the data differently</li>
	<li>Show an earthquake occurred in the last week	</li>
	<li>Show the magnitude of the quake</li>
	<li>Identify the location of the earthquake</li>
	<li>Show the tectonic fault lines for comparison</li>
	<li>Have the capabiity to just show the major earthquakes in the last week. Those earthquakes with a magnitude of 4.5 or greater.</li>
</ul>

## Analysis

The first thing that needs to occurr is to look at the data for an earthquake that the US Geological Service's feed produces. The data comes in GeoJSON format. 

GeoJSON is an open standard format designed for representing simple geographical features, along with their non-spatial attributes. It is based on the JSON format.

The features include points (therefore addresses and locations), line strings (therefore streets, highways and boundaries), polygons (countries, provinces, tracts of land), and multi-part collections of these types. GeoJSON features need not represent entities of the physical world only; mobile routing and navigation apps, for example, might describe their service coverage using GeoJSON.

An example datapoint from the US Geological Service's earthquake feed is:

<pre>
{"type":"Feature",
"properties":{
	"mag":4.9,
	"place":"56 km ESE of Taltal, Chile", 
	"time":1648657807243, 
	"updated":1648670504349, 
	"tz":null, 
	"url":"https://earthquake.usgs.gov/earthquakes/eventpage/us7000gyfe","detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000gyfe.geojson", 
	"felt":2, 
	"cdi":3.8, 
	"mmi":null, 
	"alert":null, 
	"status":"reviewed", 
	"tsunami":0, 
	"sig":370, 
	"net":"us", 
	"code":"7000gyfe", 
	"ids":",us7000gyfe,", 
	"sources":",us,", 
	"types":",dyfi,origin,phase-data,", 
	"nst":null, 
	"dmin":0.721, 
	"rms":0.68, 
	"gap":94, 
	"magType":"mb", 
	"type":"earthquake", 
	"title":"M 4.9 - 56 km ESE of Taltal, Chile"}, 
	"geometry":{"type":"Point","coordinates":[-70.0004,-25.6655,71.59]}, 
	"id":"us7000gyfe"},
</pre>

## Functionality Review
### Basemaps

The first request from Basil for the website was to setup the capability to utlize differnt styles of maps to help visualize the data. The different map styles we will utilize to visualize the data will be from <a name="https://www.mapbox.com/">MapBox</a>. The styles we have selected to implement on our website is:

<ul>
	<li><a name="https://www.mapbox.com/maps/streets">A Street Map</a></li>
	<li><a name="https://www.mapbox.com/maps/dark">A Street Map at Night</a></li>
	<li><a name="https://www.mapbox.com/maps/satellite">A Satellite View</a></li>
</ul>

### Map Overlays

The next major request from Basil is to make a map overlay which reads the US Geological services Earthquake feed. The feed <a name="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">USGS GeoJSON Earthquake Feed</a> can provide a number of different feeds:

<ul>
	<li>Multiple options for data for the past hour</li>
	<li>Multiple options for data for the past day</li>
	<li>Multiple options for data for the past 7 days</li>
	<li>Multiple options for data for the past 30 days</li>	
</ul>

After reviewing all of the different options we determine that to meet the reuirements request from Basil, we should review the optons for the past 7 days of data. The first feed we will read is for all earthquakes around the world in the past 7 days. This feed will be utilized to produce a map overlay showing all of the earthquakes and all of the details about each earthquake.

<img src="earthquake_challenge\static\Resources\all_quakes.png" width="400" height="250">

The second feed we will utilize to produce a map overlay shows just the major earthquakes, magnitude greater than 4.5, for the past week. This feed will give us all of the details about each major earthquake.

<img src="earthquake_challenge\static\Resources\major_quakes.png" width="400" height="250">
	
The last data source we will utilize for building a map overlay is from GitHub, <a namee="https://github.com/fraxen/tectonicplates/tree/master/GeoJSON">Tectonic Plates</a>. This data set allows us to build an overlay on the map to show the Tectonic lines.

<img src="earthquake_challenge\static\Resources\tectonic_lines.png" width="400" height="250">



