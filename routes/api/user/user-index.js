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
	console.log("Dati (api_index_login): "+email+" "+pass);
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

userRoutes.post('/signup', function(req, res) {
	//debug
	console.log("Body: ");
    console.log(req.body);

	var email = req.body.email;
	var pass = req.body.password;
	var name = req.body.name;
	var address = req.body.address;

	if(!email || !pass) {
		console.log("Body error");
        return res.status(400).json({ success: false, 
                                      code:user_utilities.ERR_MISSING_DATA,
                                      message: 'Bad Request. email and password required.' });  		
	}
	user_utilities.addUser(name, pass, email, address)
	.then(function(user) {
        Console.log("In teoria è salvato");
        res.status(201).json({ success: true , msg:"utente salvato", data:user});
    })
    .catch(function(err) {
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""}); 
    });
});

userRoutes.post('/all', function(req, res){
  user_utilities.getUsers()
    .then(function(user){
      console.log("\n\nUser: "+user);
      res.status(200).json({
        success: true,
        msg: "Lista di tutti gli utenti",
        data : user
      });
    })
    .catch(function(err){
      res.status(400).json({
        success: false,
        msg:err,
        data:""
      });
    });
});