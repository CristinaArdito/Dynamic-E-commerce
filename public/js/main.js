angular.module('myApp.controllers', ['ngAnimate', 'ngTouch', 'ngFader'])
.controller('mainController', ['$scope','userService', '$location',
function($scope, userService, $location) {
    
    isLogged = false;
    

    $scope.logout = function(){
        userService.logout();
        $state.go('home');
    }

   
}]);