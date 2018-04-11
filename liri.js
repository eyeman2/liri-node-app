require("dotenv").config();

var keys = require("./keys.js");
var request = require("request"); //Used for OMDB
var client = require("twitter");
var dotenv = require("dotenv");
var fs = require("fs")
var spotify = require("node-spotify-api");
var twitKey = new client(keys.twitter);
var spotKey = new spotify(keys.spotify);
var command = process.argv[2];

var value = process.argv[3];

if (command === 'my-tweets') {
    getTweets();
    // hold();
}


//-----------------------------------------------------
if (command === 'spotify-this-song') {
    getSpotify(value);
    // hold();
}
//-------------------------------------------------------
if (command == 'movie-this') {
    getOmdb();
    // hold();
}
//-----------------------------------------------------

if (command == 'do-what-it-says') {
 doIt();

    

}

function getTweets() {

    var params = {
        q: 'WayneWr31099518',
        count: 20,
    }
    twitKey.get('search/tweets', params, gotData);
    

    function gotData(error, tweets, response) {
        fs.appendFile('log.txt', '\r\n\r\n      TWEETS!!!  TWEETS!!!   TWEETS!!!\r\n', function(err){
            if (err) {
                console.log(err)
            }
    
        })
        if (error) {
            console.log(error)
        }

        else {
            for (let i = 0; i < tweets.statuses.length; i++) {
                var logTxt = '\nPosted: ' + tweets.statuses[i].created_at + '\n' + tweets.statuses[i].text + '\n-----------------------------------------------------';
                console.log('\nPosted: ' + tweets.statuses[i].created_at);
                console.log(tweets.statuses[i].text);
                console.log('-----------------------------------------------------');
                
                hold(logTxt);

        }

    }
    }
}
function getSpotify(value) {
    fs.appendFile('log.txt', '\r\n \r\n\r\n                                    *********************SPOTIFY!!!***********************', function(err){
        if (err) {
            console.log(err)
        }

    })
    if (value == undefined) {
        value = "The Sign Ace of Base";
        
    }
    spotKey.search({ type: 'track', query: value, }, function (err, data) {
        
        if (err) {
            return console.log(err)
        }
        else {

            for (var i = 0; i < data.tracks.items.length; i++) {
                
                var log = data.tracks.items.length
                var logTxt = "\nArtist(s): " + (data.tracks.items[i].artists[0].name) + "\nSong Title: " +  data.tracks.items[i].name + 
                "\nAlbum: " + data.tracks.items[i].album.name + "\nPreview: " + data.tracks.items[i].preview_url + "\n";
                
                console.log("\nArtist(s): " + (data.tracks.items[i].artists[0].name));
                console.log("Song Title: " + data.tracks.items[i].name);
                console.log("Album: " + data.tracks.items[i].album.name);
                if (data.tracks.items[i].preview_url === null) {
                    console.log("No Preview for this song")
                }
                else {
                    console.log("Preview: " + data.tracks.items[i].preview_url);
                }
                hold(logTxt)
            }
            // var artistName = [];
            
            // for (let i = 0; i < data.tracks.items[i].artists.length; i++) {

            //     artistName.push()
            // }
        }


    })
}

function getOmdb() {
    if (value == undefined) {
        value = "Mr. Nobody";

    }
    else {
        console.log("movie title defined" + value + "...");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=3e35db16";
    fs.appendFile('log.txt', '\r\n\r\n MOVIES PICTURES FILMS FEATURES FLICKS TALKIES\r\n', function(err){
        if (err) {
            console.log(err)
        }

    })

    request(queryUrl, function (err, response, body) {
        var logTxt = "\nTitle: " + JSON.parse(body).Title + '\nYear: ' + JSON.parse(body).Year + '\nIMDB Rating: ' + JSON.parse(body).imdbRating + '\nCountry ' + JSON.parse(body).Country + '\nLanguage: ' + JSON.parse(body).Language + '\nActors: ' + JSON.parse(body).Actors + '\nPlot: ' + JSON.parse(body).Plot + '\n';
        if (err) {
            return console.log(err)
        }

        else {
            console.log("Title: " + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
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

        hold(logTxt);

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
        else if (command === "spotify-this-song") {
            getSpotify(value)
        }
        
    })
}

function hold(logTxt){
    fs.appendFile('log.txt', logTxt, function(err){
        if (err) {
            console.log(err)
        }

    })
}