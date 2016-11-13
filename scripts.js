
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