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
database.ref().push({
    message: "Hello World"

})
alert("database Working")


var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=barber&location=orlando";

$.ajax({
    url: queryURL,
    headers: { 'Authorization': 'Bearer TCiwvMm97n-s02wZrMf_VYRLuSz7WJ0gG432s16cNVJDzBA4KdpJItFoQL5NXG-F6e8gvJXLQ656-tzz7hbPBHnClHDGK03wp9yezR7Y4S1RuB1xE2ZiLtm58JC3XXYx', },
    method: "GET",
}).then(function(response) {
    console.log(response);
});