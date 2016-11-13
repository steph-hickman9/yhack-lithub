// var data = require(['events.json']);
// function load() {
// 	var mydata = JSON.parse(data);
// 	alert(mydata);
// 	// alert(mydata[0].age);
// }

// load();

// alert('failed');



events = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Toad's Place",
        "time": "11:00 PM -1:00 AM",
        "address": "300 York St, New Haven, CT 06511",
        "party": true
      },
      "geometry": {
        "type": "Point",
        "coordinates": [41.3115,-72.9296]}
      },
    {
      "type": "Feature",
      "properties": {
        "title": "Sigma Chi",
        "time": "11:00 PM -12:00 AM",
        "address": "33 Lynwood Pl, New Haven, CT 06511",
        "party": true
      },
      "geometry": {
        "type": "Point",
        "coordinates": [41.3110,-72.9329]}
      },
    {
      "type": "Feature",
      "properties": {
        "title": "Woolsey Hall",
        "time": "8:00 PM -9:00 PM",
        "address": "500 College St, New Haven, CT 06511",
        "party": false
      },
      "geometry": {
        "type": "Point",
        "coordinates": [41.30666544,-72.922162978]}
      },
    {
      "type": "Feature",
      "properties": {
        "title": "Alpha Epsilon Pi",
        "time": "8:00 PM -9:00 PM",
        "address": "395 Crown St., New Haven, CT 06511",
        "party": false
      },
      "geometry": {
        "type": "Point",
        "coordinates": [41.30845,-72.93503]}
      }  
    ]
}

console.log(events);




// $.getJSON( "events.json", function( data ) {  
//     console.log( "JSON Data: " + data);
//     $.each( data, function( key, val ) {
//         console.log(key + "value:: " + val );
//     });
// });

// var json = require(['events.json'], 'async': false);
// console.log(['json', json]);
// alert(json);
// alert('hello')


function initMap() {
var NHCT = {lat: 41.3083, lng: -72.9279};
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 16,
  center: NHCT
});

var infoWindow = new google.maps.InfoWindow({map: map});

// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
}

var map;
function initMap() {
var NHCT = {lat: 41.3083, lng: -72.9279};
map = new google.maps.Map(document.getElementById('map'), {
  zoom: 16,
  center: NHCT
});

var infoWindow = new google.maps.InfoWindow({map: map});

// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}

 // Create a <script> tag and set the USGS URL as the source.
var script = document.createElement('script');
// This example uses a local copy of the GeoJSON stored at
// http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
document.getElementsByTagName('head')[0].appendChild(script);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
}

window.eqfeed_callback = function(results) {
for (var i = 0; i < results.features.length; i++) {
  var coords = results.features[i].geometry.coordinates;
  var latLng = new google.maps.LatLng(coords[1],coords[0]);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
}
}