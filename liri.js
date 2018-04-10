require("dotenv").config();

var keys = require("./keys.js");
var request = require("request"); //Used for OMDB
var client = require("twitter");
var dotenv = require("dotenv");
var fs = require("fs")
var spotify = require("node-spotify-api");
var twitKey = new client(keys.twitter);
// console.log(keys.twitter)
var spotKey = new spotify(keys.spotify);
var command = process.argv[2];

var value = process.argv[3];


//

//end of change

if (command === 'my-tweets') {
    getTweets();
    hold();
}


//-----------------------------------------------------
if (command === 'spotify-this-song') {
    getSpotify(value);
    hold();
}
//-------------------------------------------------------
if (command == 'movie-this') {
    getOmdb();
    hold();
}
//-----------------------------------------------------

if (command == 'do-what-it-says') {
 doIt();

    

}
// getTweets()
// getSpotify(value)
// getOmdb()

function getTweets() {

    var params = {
        q: 'WayneWr31099518',
        count: 20,
    }
    twitKey.get('search/tweets', params, gotData);


    function gotData(error, tweets, response) {
        if (error) {
            console.log(error)
        }
        // var tweets = data.statuses;
        else {
            for (let i = 0; i < tweets.statuses.length; i++) {
                // const element = array[i];
                
                console.log('\nPosted: ' + tweets.statuses[i].created_at);
                console.log(tweets.statuses[i].text);
         
            // console.log((response));
            // for (var i = 0; i < data.statuses; i++) {
            // console.log(JSONparse(data.statuses[i]).text);
            // console.log(JSONparse(data.statuses[i]).created_at);
            // console.log(data)   
        }
    }
    }
}
function getSpotify(value) {
    if (value == undefined) {
        value = "The Sign Ace of Base";
        limit: 1;
    }
    spotKey.search({ type: 'track', query: value, }, function (err, data) {

        if (err) {
            return console.log(err)
        }
        else {

            for (var i = 0; i < data.tracks.items.length; i++) {

                console.log("\nArtist(s): " + (data.tracks.items[i].artists[0].name));
                console.log("Song Title: " + data.tracks.items[i].name);
                console.log("Album: " + data.tracks.items[i].album.name);
                if (data.tracks.items[i].preview_url === null) {
                    console.log("No Preview for this song")
                }
                else {
                    console.log("Preview: " + data.tracks.items[i].preview_url);
                }
            }
            var artistName = [];
            
            for (let i = 0; i < data.tracks.items[i].artists.length; i++) {
                // const element = array[i];
                artistName.push()
            }
        }


    })
}

function getOmdb(){
    if (value == undefined) {
        value = "Mr. Nobody";

    }
    else {
        console.log("movie title defined" + value + "...");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=3e35db16";

    request(queryUrl, function (err, response, body) {

        if (err) {
            return console.log(err)
        }

        // if(!error && response.statusCode === 200){
        //     console.log(movieName + " was released " + JSON.parse(body).Released)
        // }
        // if (value == '') {
        //     value = 'Mr. Nobody';
        //     return console.log('no movie picked.')
        // }

        else {
            console.log("Title: " + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
            // console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
            console.log('Country ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Actors: ' + JSON.parse(body).Actors);
            console.log('Plot: ' + JSON.parse(body).Plot);

        }
        if (JSON.parse(body).Ratings[1] === "Rotten Tomatoes") {
            console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
        }
        else {
            console.log("Rotten Tomatoes Rating: N/A");
        }


    })

}

function doIt() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        var dataArr = data.split(', ');
        var command = dataArr[0];
        var value = dataArr[1];
        console.log('working');

        if (err) {
            console.log(err)
        }
        else if(command === "spotify-this-song") {
            getSpotify(value)
        }
        
    })
}


function hold(){
    fs.appendFile('log.txt', console.log(''), function(err){
        if (err) {
            console.log(err)
        }
        else {

            console.log('data saved')
        }
    })
}