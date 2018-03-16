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
    name,
    email,
    password, 
    address,
    admin 
 *  }
 */

/*
 * Promise is relatively an easy implementation for asynchronous operation. 
 * The promise object returned from the function represents an operation which
 * is not completed yet, but it guarantees to the caller of the operation that
 * the operation will be completed in future.
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
   console.log("Dati (db_user_utilities): "+user.name+" "+user.password+" "+user.email+ " "+user.address);
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
    if (!user.admin)
      { user.admin = false; }

	var saveuser = new User(user);
	saveuser.save()
    .then(function(user) {
        console.log("Utente salvato");
        //Convert a JavaScript object into a string with JSON.stringify().
      //  logger.debug('utente salvato '+JSON.stringify(user));
        /* eventuale invio email */
        deferred.resolve(user);
    })
    .catch(function(err) {
             console.error('errore salvataggio utente '+err.errmsg);
                  if (err.code == ERR_DB_DUPLICATE_KEY) {
                                        deferred.reject({code:'ERR_DB_DUPLICATE_KEY', 
                                        msg:'questo utente esiste gia'}); }
                  deferred.reject(err.errmsg);   
    });
    return deferred.promise;
}

this.getUsers = function() {
    var users = new Utente(user);
    //The find() method returns all occurrences in the selection.
    //The first parameter of the find() method is a query object.
    users.find()
        .then(function(user) {
            console.log(user);
            deferred.resolve(user);
    })
        .catch(function() {
            deferred.reject;
    });
}