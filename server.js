//Set up mongoose connection
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
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

/*	
 * in order to read HTTP POST data , we have to use "body-parser" node module. 
 * body-parser is a piece of express middleware that reads a form's input and stores it 
 * as a javascript object accessible through req.body
*/
app.use(bodyParser.json({limit: '3mb'}));
/* it uses the qs module to parse the body which allows for a nested array like 
 * syntax to be parsed such as test[foo][bar]=baz (which becomes 
 * {'test': {'foo': {'bar': 'baz'}}} 
 */
app.use(bodyParser.urlencoded({extended: true, limit: '3mb'}));

// =======================
// API ROUTES 
// =======================
var userRoutes = require('./routes/api/user/user-index');
app.use('/api/user', userRoutes);  

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});