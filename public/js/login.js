var kriApp = angular.module('kriapp');
// create the controller and inject Angular's $scope
kriApp.controller('loginController', ['$scope', '$state', function($scope, $state)
   {
    $scope.email;
    $scope.password;

    $scope.login = function()
      {
       CurrentUserService.login($scope.email, $scope.password)
          .then(function(token)
               {
                //alert('utente loggato '+token);
                $state.go('loggedHome');
               })
          .catch(function(err)
                {
                 alert("Credenziali errate"); 
                });
      }
   }]);
