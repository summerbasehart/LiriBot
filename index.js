require("dotenv").config();
var axios = require("axios")
var Spotify = require("node-spotify-api")
var moment = require("moment")
var fs = require("fs")
var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify)
var command = process.argv[2]
var search = process.argv[3]


function concertThis(artist) {
    console.log("looking for concerts", artist)
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
    .then(function(response){
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i].venue.name)
            console.log(response.data[i].venue.city)
            console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"))
            console.log("-------------")
        }
    }) 
    fs.appendFile(concertThis(artist))
}

function spotifyThisSong(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var song = data.tracks.items[0, 1, 2, 3, 4];
        for(i=0; i<song.artists.length; i++){
            console.log("-------------")
            console.log(song.artists[i].name);
            console.log(song.name);
            console.log(song.preview_url);
            console.log(song.album.name);
            console.log("-------------")
        }    
    })
    fs.appendFile(spotifyThisSong(song))
}

function movieThis(movie) {
    if (movie === "") {
        movie === "Mr. Nobody"
    } else {
        console.log("Searching Movies", movie) 
        axios.get(`http://www.omdbapi.com/?apikey=a962af11&t=${movie}`)
        .then(function(response){
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                console.log("-------------")
                // * Title of the movie.
                console.log(response.data.Title)
                // * Year the movie came out.
                console.log(response.data.Year)
                // * IMDB Rating of the movie.
                console.log(response.data.imdbRating)
                // * Rotten Tomatoes Rating of the movie.
                console.log(response.data.Ratings)
                // * Country where the movie was produced.
                console.log(response.data.Country)
                // * Language of the movie.
                console.log(response.data.Language)
                // * Plot of the movie.
                console.log(response.data.Plot)
                // * Actors in the movie.
                console.log(response.data.Actors)
                console.log("-------------")
            }
        })
    }
    fs.appendFile(movieThis(movie))
}

function itSays() {

}

switch (command) {
    case "concert-this":
        concertThis(search)
    case "spotify-this-song":
        spotifyThisSong(search)   
    case "movie-this":
        movieThis(search)
    case "do-what-it-says":
        itSays(search)    
}