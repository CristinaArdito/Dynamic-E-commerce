var Product        = require('../../../models/product');   // get our mongoose User model
var Q           = require('q');  // Q promise

var db_utilities_product = this;
module.exports = db_utilities_product;
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

this.addProduct = function(product) {
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
   console.log("Dati (db_product_utilities): "+product.name+" "+product.code);
	var deferred = Q.defer();
	if(!product.name || product.name == "") {
		deferred.reject('Inserire il nome del prodotto.');
		return deferred.promise;
	}
	if(!product.code || product == "") {
		deferred.reject('Inserire il codice del prodotto.');
		return deferred.promise;		
	}

	var saveproduct = new Product(product);
	saveproduct.save()
    .then(function(product) {
        console.log("Prodotto salvato");
        //Convert a JavaScript object into a string with JSON.stringify().
        logger.debug('prodotto salvato '+JSON.stringify(user));
        /* eventuale invio email */
        deferred.resolve(product);
    })
    .catch(function(err) {
             console.log("errore");
                  if (err.code == ERR_DB_DUPLICATE_KEY) {
                                        deferred.reject({code:'ERR_DB_DUPLICATE_KEY', 
                                        msg:'questo prodotto esiste gia'}); }
                  else
                      {logger.error('[addProduct] errore salvataggio prodotto '+err.errmsg);}
                  deferred.reject(err.errmsg);   
    });
    return deferred.promise;
}

this.getProducts = function() {
    var prodotti = new Product(product);
    //The find() method returns all occurrences in the selection.
    //The first parameter of the find() method is a query object.
    prodotti.find()
        .then(function(product) {
            console.log(product);
            deferred.resolve(product);
    })
        .catch(function() {
            deferred.reject;
    });
}