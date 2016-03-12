var express = require("express");
var fs = require('fs');
var app = express();

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

require('powr-dev')(app, {app: __dirname+'/src/app.js'});
app.get("/", function(req, res, next) {
	fs.readdir('./public/assets',function(error, files) {
		//console.log(typeof files, files)
		res.render('index', {files: JSON.stringify(files)});
	});
});

app.use("/", express.static("./public"));
app.listen(3020, function() {
	console.log("Listening: ", 3020);
});