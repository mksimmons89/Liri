
// require.dotenv.config();
var fs = require("fs");
// var keys = require("./keys.js");
var Twitter = require("twitter");
var somethingFun = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

// console.log(somethingFun);

var myTweet = function(newTweet){
    var client = new Twitter(somethingFun.twitter);
    var params = {screen_name: 'cnn', count: 20};


    if(newTweet){
    // console.log("you are trying to run" + newTweet);
  }
  else{
  // console.log("tweet tweet")
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
      var tweetCount = (tweets.length >= 20) ? 20 : tweets.length;

    for (var i = 0; i < tweetCount; i++) {
      console.log(tweets[i].text);
      console.log("-----------------------------------")
    }

   // console.log(tweets);
 }

});
}
}



var mySong = function(newSong){
//   console.log("my music taste is better than yours")
if (!newSong){
  newSong = "The Sign Ace of Base";
}
  var spotify = new Spotify({
    id: "97fbee0847864bd082d791c1da31fab0",
    secret: "e253b98be23d4204ba1462f40bc2cb47"
  });

  spotify.search({ type: 'track', query: newSong}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log(data.tracks.items[0].album.artists[0].name);
  console.log(data.tracks.items[0].preview_url);// prrew url)
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].album.name);
  // console.log()
  });
}


var myMovie = function(newMovie){
  if (!newMovie){
    newMovie = "The Matrix";
  }
// /var/ console.log("I heard I-Tonya is the shit")

request("http://www.omdbapi.com/?t=" + newMovie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {

    var movie = JSON.parse(body);

    console.log(movie);

    console.log("-------------------------------");

    console.log("The movie's rating is: " + movie.imdbRating);
    console.log("The year the movie came out is: " + movie.Year);
    // console.log("The movie's rotten tomato rating is: " + movie.Ratings[1].Value);
    if(!JSON.parse(body).Ratings[1]){
      console.log("no rotten tomato reviews found");
    }  else{
      console.log("The movie's rotten tomato rating is: " + JSON.parse(body).Ratings[1].Value);
    }
    console.log("Country where the movie was produced: " + movie.Country);
    console.log("Language of the movie: " + movie.Language);
    console.log("Plot of the movie: " + movie.Plot);
    console.log("Actors of the movie: " + movie.Actors);


      console.log("-------------------------------");

  }
});

}


var myDo = function(newDo){

fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  console.log(data);
  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
  // We will then re-display the content as an array for later use.
  console.log(dataArr);

liriMagic(dataArr[0],dataArr[1]);
});
}



var liriMagic = function(mediaType, content){
  switch(mediaType){
    case "my-tweets":
    myTweet(content);
// console.log("tweet tweet")
    break;

    case "spotify-this-song":
    mySong(content);
    break;

    case "movie-this":
    myMovie(content);
    break;

    case "do-what-it-says":
    myDo(content);
    break;

    default:
    console.log("incorrecto joe!")

    // console.log("wrongo")
  };

  // We then store the textfile filename given to us from the command line
  // below is how we log our commands to the log.txt file:
	var newCommand = process.argv[2];

	if (process.argv[3]) {
		newCommand = newCommand + ",'" + process.argv[3] + "',";
	}

	fs.appendFile("log.txt", newCommand, function(err) {
		if (err) {
		  console.log(err);
		}

  });


};

liriMagic(process.argv[2], process.argv[3]);
