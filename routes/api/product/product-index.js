// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var product_utilities = require('./product-utilities');
var fs = require('fs');
var productRoutes = express.Router();
module.exports = productRoutes;

productRoutes.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
productRoutes.use(bodyParser.json());
// parse application/vnd.api+json as json
productRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' }));


productRoutes.post('/add', function(req,res){
  
  //console.log("Body: ");
  //console.log(req.body);
  
  var name = req.body.data[0];
  var code = parseInt(fs.readFileSync("././public/img/product_2 (TEST)/index.txt"));
  var categories = req.body.data[1].split(",");
  var weight = req.body.data[2];
  var price = req.body.data[3];
  var quantity =  req.body.data[4];
  var url = req.body.data[5];
  var desc  = req.body.data[6];

  //console.log(name);

  // controllo parametri
  if (!name || !desc || !categories)
      {
        console.log("Body error");
        return res.status(400).json({ success: false, 
                                      code:product_utilities.ERR_MISSING_DATA,
                                      message: 'Bad Request name desc or categories missing' });  
      } 
   // esecuzione funzione    
  //console.log("Dati (api_index): "+desc+" "+name+" "+price+" "+categories);
  product_utilities.addProduct(name, desc, price, categories, code, url, weight, quantity)
        .then(function(product)
          {
           res.status(201).json({ success: true , msg:"prodotto salvato", data:product});
          })
        .catch(function(err)
          {
             res.status(400).json({ success: false , 
                                    code:err.code,
                                    msg:err.msg, 
                                    data:""}); 
          });
})

productRoutes.post('/all', function(req, res){
  product_utilities.getProducts()
    .then(function(products)
      {
        res.status(200).json({ success: true , 
                               msg: "lista di tutti i prodotti", 
                               data: products});
      })
      .catch(function(err)
      {
        res.status(400).json({ success: false , 
        msg:err, 
        data:""}); 
      });
});
