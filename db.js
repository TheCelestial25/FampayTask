// mongoose connection requirements
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// replace with "<your-connection-string/db-name"
mongoose.connect("mongodb://localhost:27017/fampay-demo");


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

module.exports = saveInDB;