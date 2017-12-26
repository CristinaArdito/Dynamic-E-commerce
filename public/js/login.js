var kriApp = angular.module('kriapp');
// create the controller and inject Angular's $scope
kriApp.controller('loginController', ['$scope', '$state', 'userService', function($scope, $state, userService)
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
                 alert("Credenziali errate"); 
                });
      }
   }]);
