var Product        = require('../../../models/product');   // get our mongoose User model
var Q           = require('q');  // Q promise
var jwt         = require('jsonwebtoken');    // used to create, sign, and verify tokens

var db_utilities=require('./db-utilities-product');

var product_utilities = this;
// esporto api_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria
module.exports = product_utilities;


// =======================
// ERROR CODES
// =======================
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';

this.addProduct = function(name, desc, price, categories, code, url, weight, quantity) {
   console.log("Dati (product_utilities): "+name+" "+code+ " "+url);
	return db_utilities.addProduct({name: name,
	                               desc:desc,
	                               price:price,
	                               categories: categories,
	                               url:url,
	                               code:code,
	                               weight:weight,
	                               quantity:quantity
								  });
}

this.getProducts = function(){
  var deferred = Q.defer();
  Product.find({})
    .then(function(product){
      //console.log("\n\ngetAllUser" + JSON.stringify(user));
      deferred.resolve(product);
    })
    .catch(function(err){
      logger.error('[getProducts]' +err);
      deferred.reject({code:"",msg:err});
    });
  return deferred.promise;
}

this.getProductsByCat = function(category){
  var deferred = Q.defer();
  Product.find({"categories" : category})
    .then(function(product){
      //console.log("\n\ngetAllUser" + JSON.stringify(user));
      deferred.resolve(product);
    })
    .catch(function(err){
      logger.error('[getProducts]' +err);
      deferred.reject({code:"",msg:err});
    });
  return deferred.promise;
}

this.searchProduct = function(q){
    var deferred = Q.defer();
    Product.findOne({"name":q})
        .then(function(product)
            {
                if(product!=null){
                    console.log("get product by name (single) "+JSON.stringify(product));
                    deferred.resolve(product);
                }else{
                    Product.find({ "name" : {$regex : q}})
                        .then(function(product) 
                            { 
                                if(product.length!=0){
                                    console.log("get product by name "+JSON.stringify(product));
                                    deferred.resolve(product); 
                                }else{
                                    console.log("entro in categories");
                                    Product.find({ "categories" : q})
                                        .then(function(product) 
                                        { 
                                            console.log("get product by categories "+JSON.stringify(product));
                                            deferred.resolve(product); 
                                        });
                                }
                            });
                }
            })
            .catch(function(err)
            {
                logger.error('[getAllProducts] '+err);
                deferred.reject({code:"", msg:err});  
            });
    return deferred.promise;
}

this.searchProductByIndex = function(c){
    var deferred = Q.defer();
    Product.findOne({"code":c})
        .then(function(product){
            deferred.resolve(product);
        })
        .catch(function(err){
            deferred.reject(err);
        });
    return deferred.promise;
}