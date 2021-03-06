// Google Map
var map;

// markers for map
var markers = [];

// info window
var info = new google.maps.InfoWindow();

// execute when the DOM is fully loaded
$(function() {

    // styles for map
    // https://developers.google.com/maps/documentation/javascript/styling
    var styles = [

        // hide Google's labels
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        },

        // hide roads
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {visibility: "off"}
            ]
        }

    ];

    // options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var options = {
        center: {lat: 38.8121, lng: -77.6364}, // New Haven, CT
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 14,
        panControl: true,
        styles: styles,
        zoom: 13,
        zoomControl: true
    };

    // get DOM node in which map will be instantiated
    var canvas = $("#map-canvas").get(0);

    // instantiate map
    map = new google.maps.Map(canvas, options);

    // configure UI once Google Map is idle (i.e., loaded)
    google.maps.event.addListenerOnce(map, "idle", configure);

});

/**
 * Adds marker for place to map.
 */
function addMarker(place)
{
    console.log(place);
    // TODO
    var latlng = new google.maps.LatLng(place.latitude, place.longitude);
    
    //make a marker
    var marker = new google.maps.Marker({
        position: latlng,
        icon: "http://maps.google.com/mapfiles/ms/micons/pink.png",
        title: place.place_name + ' ,' + place.admin_name1,
        map: map,
        label: place.place_name + ' ,' + place.admin_name1
        //labelContent: place.place_name + ' ,' + place.admin_name1,
        //labelAnchor: new google.maps.Point(22, 0),
        //labelClass: "label",
        //labelStyle: {opacity: 0.75}, 
    });
    
  
    markers.push(marker);
    
    
    //mark favorite when you double click
   /* google.maps.event.addListener(marker, "dblclick", function (e) {
        
        console.log("dblclick");
        
        //if the marker is a push pin, change to star
        if (marker.icon == "http://maps.google.com/mapfiles/ms/micons/pink-pushpin.png")
        {
            marker.setIcon("http://maps.google.com/mapfiles/kml/pal4/icon47.png");
            console.log("changed to star");
        }
        
        //if the marker is a star, change back
        else if (marker.icon == "http://maps.google.com/mapfiles/kml/pal4/icon47.png")
        {
            marker.setIcon("http://maps.google.com/mapfiles/ms/micons/pink-pushpin.png");
            console.log("changed back");
        }
    }); */
    
    
    marker.addListener('click', function() {
        $.getJSON( "/articles", {geo: place.postal_code} )
        .done (function(data)
        {
            var div1 = '<div class = "articles">';
            div1 += '<ul>'
            
            //add list items
            for (var c = 0, n = data.length; c < n; c++)
            {
                div1 += '<li><a href=\"' + data[c].link + '\">' + data[c].title + '</a></li>';
            }
            
            if (div1 == '<div class = "articles"><ul>')
            {
                div1 += 'Sorry, no news here today!';
            }
            
            // end unordered list
            div1 += '</ul>';
            
            // end div
            div1 += '</div>';
            
            var infowindow = new google.maps.InfoWindow({
                content: div1
            });
            
            infowindow.open(map, marker);
        })
        
        .fail(function(jqXHR, textStatus, errorThrown) 
        {
    
            // log error to browser's console
            console.log(errorThrown.toString());
        })
        
    });
    
    
}

/**
 * Configures application.
 */
function configure()
{
    // update UI after map has been dragged
    google.maps.event.addListener(map, "dragend", function() {

        // if info window isn't open
        // http://stackoverflow.com/a/12410385
        if (!info.getMap || !info.getMap())
        {
            update();
        }
    });

    // update UI after zoom level changes
    google.maps.event.addListener(map, "zoom_changed", function() {
        update();
    });

    // configure typeahead
    $("#q").typeahead({
        highlight: false,
        minLength: 1
    },
    {
        display: function(suggestion) { return null; },
        limit: 10,
        source: search,
        templates: {
            suggestion: Handlebars.compile(
                "<div>" +
                "{{place_name}}, {{admin_name1}}, {{postal_code}}" +
                "</div>"
            )
        }
    });

    // re-center map after place is selected from drop-down
    $("#q").on("typeahead:selected", function(eventObject, suggestion, name) {

        // set map's center
        map.setCenter({lat: parseFloat(suggestion.latitude), lng: parseFloat(suggestion.longitude)});

        // update UI
        update();
    });

    // hide info window when text box has focus
    $("#q").focus(function(eventData) {
        info.close();
    });

    // re-enable ctrl- and right-clicking (and thus Inspect Element) on Google Map
    // https://chrome.google.com/webstore/detail/allow-right-click/hompjdfbfmmmgflfjdlnkohcplmboaeo?hl=en
    document.addEventListener("contextmenu", function(event) {
        event.returnValue = true; 
        event.stopPropagation && event.stopPropagation(); 
        event.cancelBubble && event.cancelBubble();
    }, true);

    // update UI
    update();

    // give focus to text box
    $("#q").focus();
}

/**
 * Removes markers from map.
 */
function removeMarkers()
{
    //iterate through the markers array and set everything to null
    for (var c = 0, n = markers.length; c < n; c++)
    {
        markers[c].setMap(null);
    }
}

/**
 * Searches database for typeahead's suggestions.
 */
function search(query, syncResults, asyncResults)
{
    // get places matching query (asynchronously)
    var parameters = {
        q: query
    };
    $.getJSON(Flask.url_for("search"), parameters)
    .done(function(data, textStatus, jqXHR) {
     
        // call typeahead's callback with search results (i.e., places)
        asyncResults(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {

        // log error to browser's console
        console.log(errorThrown.toString());

        // call typeahead's callback with no results
        asyncResults([]);
    });
}

/**
 * Shows info window at marker with content.
 */
function showInfo(marker, content)
{
    // start div
    var div = "<div id='info'>";
    if (typeof(content) == "undefined")
    {
        // http://www.ajaxload.info/
        div += "<img alt='loading' src='/static/ajax-loader.gif'/>";
    }
    else
    {
        div += content;
    }

    // end div
    div += "</div>";

    // set info window's content
    info.setContent(div);

    // open info window (if not already open)
    info.open(map, marker);
}

/**
 * Updates UI's markers.
 */
function update() 
{
    // get map's bounds
    var bounds = map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    // get places within bounds (asynchronously)
    var parameters = {
        ne: ne.lat() + "," + ne.lng(),
        q: $("#q").val(),
        sw: sw.lat() + "," + sw.lng()
    };
    $.getJSON(Flask.url_for("update"), parameters)
    .done(function(data, textStatus, jqXHR) {

       // remove old markers from map
       removeMarkers();

       // add new markers to map
       for (var i = 0; i < data.length; i++)
       {
           addMarker(data[i]);
       }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {

        // log error to browser's console
        console.log(errorThrown.toString());
    });
};
