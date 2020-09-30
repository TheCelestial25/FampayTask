'use strict';
const saveInDB = require('./db.js');

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
 
async function saveSearch() {
	var done = false;
	await youtube.search.list({
		part: 'id,snippet',
		q: 'dogs',
		type: 'video',
		maxResults: 5,
	}).then( result => {
		console.log("Got the results, now trying to save in db.");
		saveInDB(result.data.items);
		done = true;
	}).catch(e => {
		console.log(e);
	});

	if(done)
		setTimeout(saveSearch, 10000);
}

runServer().catch(console.error);