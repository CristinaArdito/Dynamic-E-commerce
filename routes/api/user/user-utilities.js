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
