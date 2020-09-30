'use strict';
const saveInDB = require('./server.js');
const config = require('./config.js');

// YouTubeAPI requirements
const {google} = require('googleapis');
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const youtube = google.youtube('v3');

async function runServer() {
	// Google oauth
	const auth = await authenticate({
		keyfilePath: path.join(__dirname, '/oauth2.keys.json'),
		scopes: ['https://www.googleapis.com/auth/youtube'],
	});
	google.options({auth});

	// call main function after oauth
	saveSearch().catch(console.error);
}

// Just to convert dates into ISO format for google-api and also prevent duplicates
function updateDate(latestPublished) {
	var tempDate = new Date(latestPublished);
	tempDate.setMinutes(tempDate.getMinutes() + 1);
	latestPublished = tempDate.toISOString();
	return latestPublished;
}

var latestPublished = new Date();
latestPublished.setMinutes(latestPublished.getMinutes() - 30);
latestPublished = latestPublished.toISOString();


// Fetch videos from YouTube and store in db
async function saveSearch() {
	var done = false;
	await youtube.search.list({
		part: 'id,snippet',
		q: config.searchTerm,
		maxResults: 5,
		type: 'video',
		order: 'date',
		publishedAfter: latestPublished,
	}).then( result => {
		if(result.data.items[0]) {
			// Uncomment for debugging
			// console.log("Got the results, now trying to save in db.");
			// console.log(result.data.items);
			latestPublished = updateDate(result.data.items[0].snippet.publishedAt);
			saveInDB(result.data.items);
		}
		else {
			console.log("No new videos found.");
		}
		done = true;
	}).catch(e => {
		console.log(e);
	});

	// Setting delay
	if(done) {
		setTimeout(saveSearch, config.timeDelay*1000);
	}
}

runServer().catch(console.error);