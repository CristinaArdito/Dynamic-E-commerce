// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var user_utilities = require('./user-utilities');
var adminRoutes = express.Router(); 
var userRoutes = express.Router();
module.exports = userRoutes;

/*
 * app.use(bodyParser.json()) basically tells the system that you want json to be used.
 * bodyParser.urlencoded({extended: ...}) basically tells the system whether you want to use 
 * a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep parsing 
 * that can deal with nested objects (i.e. true).
 *
 * body-parser extracts the entire body portion of an incoming (http) request 
 * stream and exposes it on req.body as something easier to interface with.
*/

userRoutes.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
userRoutes.use(bodyParser.json());
// parse application/vnd.api+json as json
userRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' }));

userRoutes.post('/authenticate', function(req, res) {
	var email = req.body.email;
	var pass = req.body.password;

	if(!email || !pass) {
		//status 400 Bad Request
		return res.return(400).json({ success: false, 
                                      code:     user_utilities.ERR_API_NOT_FOUND,
                                      message: 'Bad Request. name and password required.' });  

	}
	console.log("Dati (api_index_login): "+email+" "+psw);
	//login utente
	user_utilities.login(email,pass)
		.then(function(token) {
			return res.status(200).json({ success: true,
										  message: 'Enjoy your token!',
										  data: {'token':token[0], 'admin':token[1]}
									   });
		})
		.catch(function(err) {
 			return res.status(400).json({ success: false, 
                                          code: err.code,
                                          message: err.msg 
                                        });  
		});	
});