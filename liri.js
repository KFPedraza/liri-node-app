//require file system
var fs = require('fs');

//require Twitter package
var twitter = require('twitter');

//require keys.js file data
var keyData = require('./keys.js');
var consumerKey = keyData.twitterKeys.consumer_key;
var consumerSecret = keyData.twitterKeys.consumer_secret;
var accessKey = keyData.twitterKeys.access_token_key;
var accessSecret = keyData.twitterKeys.access_token_secret;

//store key data in client variable
var client = new twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessKey,
  access_token_secret: accessSecret
});

//twitter documentation for retrieving statuses
function myTweets () {
    var params = {  screen_name: 'krishapedraza',
                    count: 20
                };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweetInfo = tweets[i].text;
                console.log(tweetInfo);
                console.log("----");
                    //append tweets to log.txt
                    fs.appendFile('log.txt', tweetInfo, (err) => {
                     if (err) throw err;
                    });
            }
        }
    });
}

//LIRI takes my-tweets command
var command = process.argv[2];

//performs myTweets function
if (command == "my-tweets") {
    myTweets();
};



