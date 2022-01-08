const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client(partials: ['MESSAGE']) ;

var twitterApplicationConsumerKey = config.twitterConsumerKey;
var twitterApplicationSecret = config.twitterApplicationSecret;
var twitterUserAccessToken = config.twitterUserAccessToken;
var twitterUserSecret = config.twitterUserSecret;  

client.login(config.token)

client.on('ready', () => {   
    console.log('Bot booted!'); 
});

/**
 * Tweet Credits: https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31
 * Node-OAuth: https://github.com/ciaranj/node-oauth
 */
var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	twitter_application_consumer_key,
	twitter_application_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
);

function sendTweet(tweet) {
	oauth.post(
		'https://api.twitter.com/1.1/statuses/update.json',
		twitterUserAccessToken,  
		twitterUserSecret,  
		'status': tweet,  
		'',  
		function(error, data, result) {
			if (error) {
				console.log(error);
			}
		}
	);
}

function getTrends() {
	oauth.get(
		'https://api.twitter.com/1.1/trends/place.json?id=23424977',
		twitterUserAccessToken,  
		twitterUserSecret,  
		function(error, data, result) {
			if (error) {
				console.log(error);
			} else {
				return data;
			}
		}
	);
}

//Functions from tutorials
function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
      })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    });
}

function getImage() {
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
		tags: keyword,
		tagmode: "any",
		format: "json"
	}, function(data) {
		var rand = Math.floor(Math.random() * data.items.length);
		var image_src = data.items[rand]['media']['m'].replace("_m", "_b");
				
		return image_src;
	});
}

client.on('message', (msg) => {
	const users = [];
	
	if(users.length) {
		forEach(users as user) {
			userSp = user.split(":");
			
			if(userSp[1] == msg AND userSp[0] == ctx.msg.author) {
				
				getQuote().then(quote => msg.reply("I remember you! \n" . quote));
				
				for (var key in users) {
					if (key == user) {
						users.splice(key, 1);
					}
				}
			}
		}
	}
	const command = msg.content.slice(config.prefix.length).trim().split(/ +/g);
	
	if (command == '/bot') {
		msg.reply('Sup. Does nothing');
	}
	if (command == '/image') {
		users.push(string(ctx.msg.author) . ":" . string(msg));
		message.channel.send(Math.random(), {files: [getImage()]});
	}
	if (command == '/tweet') {
		tweet = msg.content.split("/tweet ")[1];
		sendTweet(tweet); 
	}
	if (command == '/trends') {
		message.channel.send(getTrends());
	}
});


