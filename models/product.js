// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var Product = mongoose.model('Product', new Schema({ 
    name    : { type:String , unique:true, required:true },
    desc   : String,
    price: String,
    weight: String,
    code: Number,
    url: [{type:String , default:"0"}], //for img refer
    categories : [{ type:String }],
    quantity   : {type:Number , default:"0"}
}));

module.exports = Product;