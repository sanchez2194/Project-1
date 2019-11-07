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
$("#sign-up-submit").on("click", function(){
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
    for(i = 0; i < response.businesses.length; i++){
        var name = response.businesses[i].name;
        var locationLat = response.businesses[i].coordinates.latitude;
        var locationLon = response.businesses[i].coordinates.longitude;
        console.log(name, "Lat: " + locationLat, "Lon: " + locationLon);
    }
  
});

