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

this.addUser = function(name, password, email, address) {
   console.log("Dati (user_utilities): "+name+" "+password+" "+email+ " "+address);
	return db_utilities.addUser({name: name,
								 password: password,
								 email: email,
								 address : address,
								 admin: false
								});
}

/*
For work that doesn't return immediately (asynchronous) you may create deferred object. 
Deferred holds both resolve and promise objects. Observers interested in value are 
attached to promise object, with resolve we resolve promise with an actual value. 
In common usage promise is returned to the world and resolve is kept internally
*/
this.login = function(email, pass) {
	console.log("Dati (user_utilities login): "+email+" "+pass);

	var deferred = Q.defer();
	//The findOne() method returns the first occurrence in the selection.
	//The parameter of the findOne() method is a query object.
	User.findOne({ email : email})
		.then(function(User) {
			if(!User) {
				deferred.reject({ code: this.ERR_API_NOT_FOUND,
								  msg: 'Utente non trovato.'});
			}
			else {
				if(User.password != pass) {
				deferred.reject({ code: this.ERR_API_WRONG_PSW,
								  msg: 'Password errata.'});
				}
				else {
					 // if user is found and password is right
              		 // create a token
					var token = jwt.sign(User, 
                                    '!La|R5Rb1sp^V8VKrWqiQw£z\cb&/WJ#7FUSvC8rvyLtY\ZTwrF4bstRt@x!XN&', 
                                    {expiresIn: 1440}						
                                    );
					var admin = User.admin;
              		// return the information including token as JSON
               		deferred.resolve([token,admin]);					
				}
			}
		})
		.catch(function(err) {
			deferred.reject({ code :"", msg:err});
		});
	return deferred.promise;
}

this.getUsers = function(){
  var deferred = Q.defer();
  User.find({})
    .then(function(user){
      //console.log("\n\ngetAllUser" + JSON.stringify(user));
      deferred.resolve(user);
    })
    .catch(function(err){
      logger.error('[getAllProducts]' +err);
      deferred.reject({code:"",msg:err});
    });
  return deferred.promise;
}