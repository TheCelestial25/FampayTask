// mongoose connection requirements
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// replace with "<your-connection-string/db-name"
mongoose.connect("mongodb://localhost:27017/fampay-demo").catch(console.error);
const express = require('express');
const app = express();


const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    published: Date,
    thumbnail: String,
});

const Video = mongoose.model("Videos", videoSchema);

async function saveInDB (video_array) {
	video_array.forEach(vid => {
		var data = new Video({
			title: vid.snippet.title,
			description: vid.snippet.description,
			published: vid.snippet.publishedAt,
			thumbnail: vid.snippet.thumbnails.url,
		});
		data.save().then(item => {
			console.log("Save in DB successful!");
		}).catch(e => {
			Console.log(e);
		});
	});
}

app.listen(8000, function() {
  console.log('listening on 8000')
});

app.get('/', function (req, res) {
	const { page = 1, limit = 10 } = req.query;
	var records = mongoose.model('Videos', videoSchema);
	records.find({ }).limit(limit * 1).skip((page - 1) * limit)
	.sort('-published').exec(function (err, result) {
		if (err) return handleError(err);
		console.log(result);
		res.json(result);
	})
});

module.exports = saveInDB;