var kriApp = angular.module('kriapp');
// create the controller and inject Angular's $scope
kriApp.controller('loginController', ['$scope', '$state', '$compile', 'userService', 'fileUpload', 'productService', 'dataHandler',
  function($scope, $state, $compile, userService, fileUpload, productService, dataHandler)
   {
    $scope.email;
    $scope.password;

    $scope.login = function()
      {
       userService.login($scope.email, $scope.password)
          .then(function(token)
               {
                //alert('utente loggato '+token);
                $state.go('loggedHome');
               })
          .catch(function(err)
                {
                 //alert("Credenziali errate"); 
                 //angular.element(document.getElementById('error')).empty();
                 var error = '<div class="error"><a>Credenziali Errate</a></div>'
                 angular.element(document.getElementById('error')).append($compile(error)($scope));
                });
      }

    $scope.loadFile = function(){
        var file = angular.element(document.getElementById("img"))[0].files[0];
        if(file.size>2097152) alert("File troppo grande, dimensione massima 2MB");
        else fileUpload.fileReader(file);

        productService.uploadImg(dataHandler.get_nonreset(), "././public/img/upload/")
        .then(function(data) {
          console.log(data.data.urlName);
        })
        .catch(function(err) { console.log(err);})
    }  
   }]);
