alert("Javascriopt Working");



var firebaseConfig = {
    apiKey: "AIzaSyAv9P8U6A22qsh0XSuuPv1hdVak-c_RShE",
    authDomain: "barberstopdatabase.firebaseapp.com",
    databaseURL: "https://barberstopdatabase.firebaseio.com",
    projectId: "barberstopdatabase",
    storageBucket: "barberstopdatabase.appspot.com",
    messagingSenderId: "33031672463",
    appId: "1:33031672463:web:0782c22809d7ddce1856fa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database()

// Login variables
var firstName = "";
var lastName = "";
var userName = "";

//Sign up page on click
$("#sign-up-submit").on("click", function() {
    event.preventDefault();

    firstName = $("#sign-up-first-name").val().trim();
    lastName = $("#sign-up-last-name").val().trim();
    userName = $("#sign-up-username").val().trim();

    var person = {
        name: firstName + " " + lastName,
        user: userName
    };

    database.ref().push(person);
    console.log("Did string con work? " + person.name);

});



///Yelp API
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=barber&location=orlando&limit=10";

$.ajax({
    url: queryURL,
    headers: { 'Authorization': 'Bearer TCiwvMm97n-s02wZrMf_VYRLuSz7WJ0gG432s16cNVJDzBA4KdpJItFoQL5NXG-F6e8gvJXLQ656-tzz7hbPBHnClHDGK03wp9yezR7Y4S1RuB1xE2ZiLtm58JC3XXYx', },
    method: "GET",
}).then(function(response) {
    console.log(response);
    console.log(response.businesses[0].name)

    var locations = [];

    for (i = 0; i < response.businesses.length; i++) {
        var name = response.businesses[i].name;
        var locationLat = response.businesses[i].coordinates.latitude;
        var locationLon = response.businesses[i].coordinates.longitude;
        var phone = response.businesses[i].phone;
        var rating = response.businesses[i].rating;
        var price = response.businesses[i].price;
        console.log(name, "Lat: " + locationLat, "Lon: " + locationLon, "Phone: " + phone, "Rating: " + rating, "Price: " + price);
        // var location = [];
        // location.push(locationLat, locationLon);
        // locations.push(location);
        locations.push([locationLon, LocationLat])
    }

    console.log("location: " + locations);
    createFeatureArray(locations)
});

//jed map jaavascript
getLocation();
var lat;
var lon;
var zoomSet = 11;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // console.log(navigator.geolocation.getCurrentPosition)
    } else {
        Alert("Geolocation is not supported by this browser.");
    }

}

function showPosition(position) {
    lat = position.coords.latitude
    lon = position.coords.longitude
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);





    mapboxgl.accessToken = 'pk.eyJ1IjoiamVkbWlrZSIsImEiOiJjazJsMTA4eHowMjlhM210NTV0NjRxZ2toIn0.xs3l-153TcEwOsjoJu7ArQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        // center: [-77.034084, 38.909671],
        zoom: zoomSet
    });
    //data from device location "user location"
    var userLoc = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat]
            }
        }]
    };
    console.log(userLoc);

    // location arrays are in lat, lon format
    const locations = [locationLon, LocationLat];
    // const locations = [
    //     [28.617, -81.22565],
    //     [28.65619, -81.22565],
    //     [28.618, -81.22565],

    // ];


    function createFeatureArray(locations) {
        const features = locations.map(location => {
            let lon = location[1];
            let lat = location[0];
            console.log(location[0]);
            console.log(location[1]);
            return (locationObject = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [lon, lat]
                }
            });
        });
        return features;
        // console.log(features);
    }
    const newFeatures = createFeatureArray(locations);
    console.log(newFeatures);
    const Geoson = { type: "FeatureCollection", features: newFeatures };
    console.log(Geoson);



    map.on('load', function(e) {
        // Add the data to your map as a layer

        //Layer for the User location marked with a "hospital cross"
        map.addLayer({
            id: 'user',
            type: 'symbol',
            // Add a GeoJSON source containing place coordinates and information.
            source: {
                type: 'geojson',
                data: userLoc
            },
            layout: {
                'icon-image': 'hospital-15',
                'icon-allow-overlap': true,
            }
        });

        //Layer for the User location marked with a "embassy flag"
        map.addLayer({
            id: 'locations',
            type: 'symbol',
            // Add a GeoJSON source containing place coordinates and information.
            source: {
                type: 'geojson',
                data: Geoson
            },
            layout: {
                'icon-image': 'embassy-15',
                'icon-allow-overlap': true,
            }
        });
    });
}