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



//Yelp API
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=barber&location=orlando";

$.ajax({
    url: queryURL,
    headers: { 'Authorization': 'Bearer TCiwvMm97n-s02wZrMf_VYRLuSz7WJ0gG432s16cNVJDzBA4KdpJItFoQL5NXG-F6e8gvJXLQ656-tzz7hbPBHnClHDGK03wp9yezR7Y4S1RuB1xE2ZiLtm58JC3XXYx', },
    method: "GET",
}).then(function(response) {
    console.log(response);
    console.log(response.businesses[0].name)

    var location = [];

    for(i = 0; i < response.businesses.length; i++){
        var name = response.businesses[i].name;
        var locationLat = response.businesses[i].coordinates.latitude;
        var locationLon = response.businesses[i].coordinates.longitude;
        var phone = response.businesses[i].phone;
        var rating = response.businesses[i].rating;
        var price = response.businesses[i].price;
        console.log(name, "Lat: " + locationLat, "Lon: " + locationLon, "Phone: " + phone, "Rating: " + rating, "Price: " + price);
        
    }
  
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
    0
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
    // Data from Yelp barber shop list .
    var barberShops = {
        "type": "FeatureCollection",
        "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.2081, 28.6700]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.2000, 28.6550]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.2400, 28.6000]
                },

            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.15004, 28.5500]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.2000, 27.6550]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.3000, 29.4000]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-82.0000, 28.9000]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.0195, 28.0056]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.8520, 28.9999]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.1515, 28.4222]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.1616, 28.6161]
                },

            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-81.0101, 28.0033]
                },

            }
        ]
    };


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
        console.log("A");
        console.log(userLoc);
        console.log(barberShops);
        //Layer for the User location marked with a "embassy flag"
        map.addLayer({
            id: 'locations',
            type: 'symbol',
            // Add a GeoJSON source containing place coordinates and information.
            source: {
                type: 'geojson',
                data: barberShops
            },
            layout: {
                'icon-image': 'embassy-15',
                'icon-allow-overlap': true,
            }
        });
    });
}