var User        = require('../../../models/user');   // get our mongoose User model
var Q           = require('q');  // Q promise
var jwt         = require('jsonwebtoken');    // used to create, sign, and verify tokens

var db_utilities=require('./db-utilities-user');

var user_utilities = this;
// esporto api_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria
module.exports = user_utilities;


// =======================
// ERROR CODES
// =======================
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';

this.addUser = function(name, password, email) {
	return db_utilities.addUser({ name: name,
								  password: password,
								  email: email,
								  admin: false

	});
}

this.login = function(email, pass) {
	
}