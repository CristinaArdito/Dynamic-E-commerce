//Set up mongoose connection
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser', {limit: '3mb'});
var mongoDB = 'mongodb://kri-db:progetto-kri@ds261755.mlab.com:61755/kri-db';

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {

// html render automatically looks in the views folder
res.render('index');
	
});

app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({limit: '3mb'}));

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});