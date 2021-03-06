var kriApp = angular.module('kriapp');
// create the controller and inject Angular's $scope
kriApp.controller('loginController', ['$scope', '$state', '$compile', 'userService',
  function($scope, $state, $compile, userService)
   {
    $scope.email;
    $scope.password;

    $scope.login = function()
      {
       userService.login($scope.email, $scope.password)
          .then(function(token)
               {                
                $state.go('loggedHome');
               })
          .catch(function(err)
                {
                 //alert("Credenziali errate"); 
                 //angular.element(document.getElementById('error')).empty();
                 var error = '<div class="error"><a>Credenziali Errate</a></div>'
                 angular.element(document.getElementById('error')).append($compile(error)($scope));
                });
       //   userService.SetCredentials($scope.email, $scope.password);
      }

}]);
