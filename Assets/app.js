// alert("Javascriopt Working");



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
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=barber&location=orlando&limit=10";

$.ajax({
    url: queryURL,
    headers: { 'Authorization': 'Bearer TCiwvMm97n-s02wZrMf_VYRLuSz7WJ0gG432s16cNVJDzBA4KdpJItFoQL5NXG-F6e8gvJXLQ656-tzz7hbPBHnClHDGK03wp9yezR7Y4S1RuB1xE2ZiLtm58JC3XXYx', },
    method: "GET",
}).then(function(response) {
    console.log(response);
    console.log(response.businesses[0].name)

    var locations = [];
    var names = [];
    var phones = [];
    var ratings = [];
    var prices = [];


    for (i = 0; i < response.businesses.length; i++) {
        var name = response.businesses[i].name;
        var locationLat = response.businesses[i].coordinates.latitude;
        var locationLon = response.businesses[i].coordinates.longitude;
        var phone = response.businesses[i].phone;
        var phoneSlice = phone.slice(2);
        var rating = response.businesses[i].rating;
        var price = response.businesses[i].price;
        console.log(name, "Lat: " + locationLat, "Lon: " + locationLon, "Phone: " + phone, "Rating: " + rating, "Price: " + price);


        locations.push([locationLon, locationLat]);
        names.push(name);
        phones.push(phoneSlice);
        ratings.push(rating);
        prices.push(price);



        // function createFeatureArray(locations) {
        //     const features = locations.map(location => {
        //         let lon = location[0];
        //         let lat = location[1];
        //         return (locationObject = {
        //             type: "Feature",
        //             geometry: {
        //                 type: "Point",
        //                 coordinates: [lon, lat]
        //             }
        //         });
        //     });
        //     return features;
        // }
        // const newFeatures = createFeatureArray(locations);
        // const GeoJson = { type: "FeatureCollection", features: newFeatures };
        // console.log(GeoJson);


    };
    console.log("location array of arrays: " + locations);




    //populates the list on html2 with the names of barbershops
    $("#list-1").text(`${names[0]} Phone:  ${phones[0]} Rating:  ${ratings[0]} Price:  ${prices[0]}`);
    $("#list-2").text(`${names[1]} Phone:  ${phones[1]} Rating:  ${ratings[1]} Price:  ${prices[1]}`);
    $("#list-3").text(`${names[2]} Phone:  ${phones[2]} Rating:  ${ratings[2]} Price:  ${prices[2]}`);
    $("#list-4").text(`${names[3]} Phone:  ${phones[3]} Rating:  ${ratings[3]} Price:  ${prices[3]}`);
    $("#list-5").text(`${names[4]} Phone:  ${phones[4]} Rating:  ${ratings[4]} Price:  ${prices[4]}`);
    $("#list-6").text(`${names[5]} Phone:  ${phones[5]} Rating:  ${ratings[5]} Price:  ${prices[5]}`);
    $("#list-7").text(`${names[6]} Phone:  ${phones[6]} Rating:  ${ratings[6]} Price:  ${prices[6]}`);
    $("#list-8").text(`${names[7]} Phone:  ${phones[7]} Rating:  ${ratings[7]} Price:  ${prices[7]}`);
    $("#list-9").text(`${names[8]} Phone:  ${phones[8]} Rating:  ${ratings[8]} Price:  ${prices[8]}`);
    $("#list-10").text(`${names[9]} Phone:  ${phones[9]} Rating:  ${ratings[9]} Price:  ${prices[9]}`);





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
                        "coordinates": [locations[0, 0]]
                    },

                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[1, 1]]
                    },

                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[2, 2]]
                    },

                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[3, 3]]
                    },

                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[4, 4]]
                    },

                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[5, 5]]
                    },

                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[6, 6]]
                    },

                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[7, 7]]
                    },

                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[8, 8]]
                    },

                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [locations[9, 9]]
                    },

                },

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
           // Layer for the User location marked with a "embassy flag"
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



});

function myButton1() {
    location.replace("https://www.yelp.com/biz/jusincredible-cutz-orlando?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton2() {
    location.replace("https://www.yelp.com/biz/uptown-13-barber-shop-orlando-4?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton3() {
    location.replace("https://www.yelp.com/biz/nicks-barber-shop-orlando?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton4() {
    location.replace("https://www.yelp.com/biz/floyds-99-barbershop-orlando?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton5() {
    location.replace("https://www.yelp.com/biz/euro-cuts-barbershop-orlando?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton6() {
    location.replace("https://www.yelp.com/biz/melos-barber-shop-orlando-2?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton7() {
    location.replace("https://www.yelp.com/biz/old-stars-52-barbershop-orlando?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton8() {
    location.replace("https://www.yelp.com/biz/atomic-barber-co-winter-park-2?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton9() {
    location.replace("https://www.yelp.com/biz/liberty-barber-shop-orlando?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}

function myButton10() {
    location.replace("https://www.yelp.com/biz/j-christine-barber-shop-orlando?adjust_creative=KRq3S2MKbiOX0csVIwcRAw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=KRq3S2MKbiOX0csVIwcRAw")
}