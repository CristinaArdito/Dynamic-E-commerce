var User        = require('../../../models/user');   // get our mongoose User model
var Q           = require('q');  // Q promise

var db_utilities_user = this;
module.exports = db_utilities_user;
// esporto db_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria


// =======================
// ERROR CODES
// =======================
// codici di errore di MongoDb
var ERR_DB_DUPLICATE_KEY = '11000';


/*
 * Example User {
	surname,
    name,
    email,
    password, 
    address,
    admin 
 *  }
 */

this.addUser = function(user) {
	/*
     * If you have to interface with asynchronous functions that are callback-based 
     * instead of promise-based, Q provides a few shortcuts (like Q.nfcall and friends). 
     * But much of the time, the solution will be to use deferreds.
     *
     * example:
     * var deferred = Q.defer();
     * FS.readFile("foo.txt", "utf-8", function (error, text) {
     * if (error) {
     *   deferred.reject(new Error(error));
     * } else {
     *   deferred.resolve(text);
     * }
     * });
     * return deferred.promise;
	 */

	var deferred = Q.defer();
	if(!user.password || user.password == "" || user.password.length < 4) {
		deferred.reject('La password non può essere vuota o inferiore a 4 caratteri.');
		return deferred.promise;
	}
	if(!user.name || user.name == "") {
		deferred.reject('Il nome non può essere vuoto.');
		return deferred.promise;		
	}
	if(!user.email || user.email == "") {
		deferred.reject('La mail non può essere vuota.');
		return deferred.promise;		
	}

	var saveuser = new User(user);
	saveuser.save()
    .then(function(user) {
        console.log("Utente salvato");
        //Convert a JavaScript object into a string with JSON.stringify().
        logger.debug('utente salvato '+JSON.stringify(user));
        /* eventuale invio email */
        deferred.resolve(user);
    })
    .catch(function(user) {
                  if (err.code == ERR_DB_DUPLICATE_KEY)
                      {deferred.reject({code:'ERR_DB_DUPLICATE_KEY', 
                                        msg:'questo utente esiste gia'}); }
                  else
                      {logger.error('[addUser] errore salvataggio utente '+err.errmsg);}
                  deferred.reject(err.errmsg);   
    });
    return deferred.promise;

}