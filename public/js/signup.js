var kriApp = angular.module('kriapp');
// create the controller and inject Angular's $scope
kriApp.controller('signupController', ['$scope', '$state', 'userService', '$location', 
  function($scope, $state, userService)
   {
    $scope.username;
    $scope.email;
    $scope.password;


   }]);
