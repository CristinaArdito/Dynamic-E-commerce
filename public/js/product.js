var kriApp = angular.module('kriapp');
// create the controller and inject Angular's $scope
kriApp.controller('addProductController', ['$scope', '$compile', 'fileUpload', 'productService', 'dataHandler',
  function($scope, $compile, fileUpload, productService, dataHandler)
   {

    $scope.loadFile = function(){
        var file = angular.element(document.getElementById("img"))[0].files[0];
        if(file != null) {
          if(file.size>2097152) alert("File troppo grande, dimensione massima 2MB");
          else fileUpload.fileReader(file);
                                var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", uploadProgress, false);
            xhr.open("POST", "/fileupload");
            angular.element(document.getElementById("percentVisible")).empty();
            $scope.progressVisible = true;
        }
        else {
          var error = '<div class="error"><a>Selezionare un file</a></div>'
          angular.element(document.getElementById('error')).append($compile(error)($scope));
        }
    } 

    $scope.addProduct = function($scope) {
        var data = [];
        data[0] = angular.element(document.getElementById("name"))[0].value;
        angular.element(document.getElementById("name"))[0].value = "";
        data[0] = data[0].charAt(0).toUpperCase() + data[0].slice(1);
        data[1] = angular.element(document.getElementById("selectionForm"))[0].value;
        if(data[1].includes(",") == false) data[1] = data[1]+",";
        angular.element(document.getElementById("selectionForm"))[0].value = "Hardware";
        data[2] = angular.element(document.getElementById("peso"))[0].value;
        angular.element(document.getElementById("peso"))[0].value = "";
        data[3] = angular.element(document.getElementById("price"))[0].value;
        angular.element(document.getElementById("price"))[0].value = "";
        data[4] = angular.element(document.getElementById("q"))[0].value;
        angular.element(document.getElementById("q"))[0].value = 0;
        data[5] = angular.element(document.getElementById("img"))[0].files[0];
        angular.element(document.getElementById("img"))[0].files[0] = null;
        data[6] = angular.element(document.getElementById("desc"))[0].value;
        angular.element(document.getElementById("desc"))[0].value = "";

        if(data[5] == null){
            alert("Dati non completi");
        }
        else {
          productService.uploadImg(dataHandler.get_nonreset(), null)
          .then(function(urlValue) {
            //console.log("url product.js:"+urlValue.data.urlName);
            var string = urlValue.data.urlName;
            data[5] = string;
           // console.log("data5"+data[5]);

            productService.addProduct(data);
          })
          .catch(function(err) {
           console.log(err);
          });

        }
    } 

    function uploadProgress(evt) {
        scope.$apply(function(){
            if (evt.lengthComputable) {
                scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

}]).controller('productsController', ['$scope', '$compile', '$location', 'productService', 'dataHandler',
  function($scope, $compile, $location, productService, dataHandler)
   {

    $scope.showMonitors = function(n) {
        
        productService.getProducts()
        .then(function(data) {
            var html = "";
            var x;
            var index = 0;
            var monitors = [];
            for(i=0;i<data.length;i++){
                monitors[i] = false;
            }

            while(index<4) {
            for(i=0; i<data.length; i++) {
              //  if(i >= data.length) break;
                x = Math.floor(Math.random() * data.length);
                if(monitors[x] == false) {
                    if(data[x].categories[0] == "Monitor") {
                    monitors[x] = true;
                    index++;
                background = "'"+data[x].url+"'";
                html += '<div class="product">'+
                        '<div class="nome">'+data[x].name+'</div>'+
                        '<ul><li ng-click="Details('+x+')" style="background: url('+background+') no-repeat;  background-size: 68%;'+
                        'height: 160px; margin-left: 25%;"></li>'+
                        '<li><div class="prezzo">&euro;'+data[x].price+'</div></li>'+
                        '</ul></a></div>';
                }
            }
            }
        }
            angular.element(document.getElementById('vetrina')).append($compile(html)($scope));
        })    
    }  

    $scope.showMotherboards = function(n) {
        productService.getProducts()
        .then(function(data) {
            var html = "";
            var x;
            var index = 0;
            dataHandler.set(data);
            var motherboard = [];

            for(i=0;i<data.length;i++){
                motherboard[i] = false;
            }

            while(index<4) {
            for(i=0; i<data.length; i++) {
               // if(i >= data.length) break;
                x = Math.floor(Math.random() * data.length);
                if(motherboard[x] == false) {                   
                   if(data[x].categories[0] == "Motherboard") {
                    
                        console.log(index);
                        index++;
                    motherboard[x] = true;
                    background = "'"+data[x].url+"'";
                    html += '<div class="product">'+
                            '<div class="nome">'+data[x].name+'</div>'+
                            '<ul><li ng-click="Details('+x+')" style="background: url('+background+') no-repeat;  background-size: 68%;'+
                            'height: 160px; margin-left: 25%;"></li>'+
                            '<li><div class="prezzo">&euro;'+data[x].price+'</div></li>'+
                            '</ul></a></div>';
                        }
                           
                }
            }
        }
            angular.element(document.getElementById('motherboard')).append($compile(html)($scope));
        })    
    }   

    $scope.showVideoCards = function(n) {
        productService.getProducts()
        .then(function(data) {
            var html = "";
            var x;
            var index = 0;

            var videocard = [];
            for(i=0;i<data.length;i++){
                videocard[i] = false;
            }

            while(index<4) {
            for(i=0; i<data.length; i++) {
                //if(i >= data.length) break;
                x = Math.floor(Math.random() * data.length);
                if(videocard[x] == false) {
                    if(data[x].categories[0] == "Videocard") {
                    videocard[x] = true;
                    index++;
                background = "'"+data[x].url+"'";
                html += '<div class="product">'+
                        '<div class="nome">'+data[x].name+'</div>'+
                        '<ul><li ng-click="Details('+x+')" style="background: url('+background+') no-repeat;  background-size: 68%;'+
                        'height: 160px; margin-left: 25%;"></li>'+
                        '<li><div class="prezzo">&euro;'+data[x].price+'</div></li>'+
                        '</ul></a></div>';
                }
            }
            }
        }
            angular.element(document.getElementById('videocard')).append($compile(html)($scope));
        })    
    }

    $scope.Details = function(n){

        dataHandler.setIndice(n);
        $location.path("/singleproduct");
    }
    
}]).controller('singleController', ['$scope', '$compile', '$location', 'dataHandler', 'userService', 'productService',
function($scope, $compile, $location, dataHandler, userService, productService) {

 $scope.showSingleProduct = function(){

        var indice = dataHandler.getIndice();
        var data = dataHandler.getIndex(indice);

            background = "'"+data.url+"'";
            item = data;

            html = '<div class="nomeprod">'+data.name+'</div>'+
                   '<div class="img" style="background: url('+background+') no-repeat; margin-left: 20%; width: 20%;'+
                                           'height: 380px; margin-left: 15%; background-size: 100%;'+
                                           'position: relative"></div>'+
                   '<div class="titolodesc">DESCRIZIONE: </div>'+
                   '<div style="visibility:hidden;" id="productCode">'+data.code+'</div>'+
                   '<div class="descr">'+data.desc+'</div>'+
                   '<div class="titolocat">CATEGORIA: </div><div class="cat">'+data.categories[0]+'</div>'+
                   '<div class="titolopeso">PESO: </div> <div class="peso">'+data.weight+'kg</div>'+
                   '<div class="titoloprez">PREZZO: </div><div class="prezzoprod">'+data.price+'&euro;<span class="tasse">iva incl.</span></div>';
                   if(data.quantity > 5)
                        html += '<div class="titoloprez">Disponibile</div><div hidden="true" class="prezzoprod">'+data.quantity+'</div>'+
                                '<div class="addtitolo">Aggiungi al carrello:</div>'+
                                '<div class="addproduct"><input id="addproduct" class="inputprod" type="number" min="1" value="1"></input></div>'+
                                '<div class="but"><button type="submit" id="submitbutton" class="idbutton" ng-click="addToCart('+indice+')"></button></div>';
                   else if(data.quantity<=5 && data.quantity>0)
                        html += '<div class="titoloprez">QUANTIT&#193;:</div><div class="qtaprod">'+data.quantity+'</div>'+
                                '<div class="addtitolo">Aggiungi al carrello:</div>'+
                                '<div class="addproduct"><input id="addproduct" class="inputprod" type="number" min="1" value="1"></input></div>'+
                                '<div class="but"><button type="submit" id="submitbutton" class="idbutton" ng-click="addToCart('+indice+')"></button></div>';
                   else if(data.quantity== 0) 
                        html += '<div class="iconavv" ng-click="reminder()"></div><div class="avviso" ng-click="reminder()">Avvisami quando ritornerà disponibile</div>';
                   html+= '<div class="pagamenti"> <h4>Pagamenti sicuri con:</h4><div><span>'+
                          '<div class="picture"><picture><img height="50" width="50" src="././public/img/paypal.png"></img></picture>'+
                          '<picture><img src="././public/img/mastercard.png"></img></picture>'+
                          '<picture><img height="50" width="50" src="././public/img/postepay.png"></img></picture>'+
                          '<picture><img height="50" width="50" src="././public/img/visa.png"></img></picture>'+
                          '<picture><img height="50" width="50" src="././public/img/american-express2.png"></img></picture>'+
                          '</span></div></div></div>';
                   html+= '<div class="freedelivery"> <span class="deliverytext">Per un ordine di importo superiore a 150,00€ la spedizione è GRATUITA!</span></div>'       
                   angular.element(document.getElementById('singleProduct')).append($compile(html)($scope));
          

    }








}]);