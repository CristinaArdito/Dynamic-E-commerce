var kriApp = angular.module('kriapp');
// create the controller and inject Angular's $scope
kriApp.controller('signupController', ['$scope', '$state', '$location', 'userService', 
  function($scope, $state, $location, userService) {
    $scope.username;
    $scope.email;
    $scope.password;
    $scope.address;

    $scope.signup = function() {
      userService.getUsers()
      .then(function(data) {
          data = data.data;
          flag = 0;

          for(i = 0; i < data.length; i++) {
            if(data[i].email == $scope.email) {
              flag = 1;
            }
          }
          if(flag == 0) {
            userService.signup($scope.username, $scope.password, $scope.email, $scope.address)
            .then(function(data) {
                console.log("signup");
                $location.path("/");
                $state.go('loggedHome');
            })
            .catch(function(err) { 
                 var error = '<div class="error"><a>Errore durante la creazione dell\' account</a></div>'
                 angular.element(document.getElementById('error')).append($compile(error)($scope));
            });
          }
      })
    }



}]);
