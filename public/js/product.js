var kriApp = angular.module('kriapp');
// create the controller and inject Angular's $scope
kriApp.controller('productController', ['$scope', '$compile', 'fileUpload', 'productService', 'dataHandler',
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
