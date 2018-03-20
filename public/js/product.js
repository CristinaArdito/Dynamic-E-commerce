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

}]);
