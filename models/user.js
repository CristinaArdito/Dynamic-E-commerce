// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var User = mongoose.model('User', new Schema({ 
    surname    : { type:String , unique:true, required:true },
    name    : String,
    email   : String,
    password: String, 
    address : String,
    admin   : {type:Boolean , default:false}
}));

module.exports = User;