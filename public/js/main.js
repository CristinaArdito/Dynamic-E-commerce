angular.module('myApp.controllers', ['ngAnimate', 'ngTouch', 'ngFader'])
.controller('mainController', ['$scope','userService', '$location', '$state',
function($scope, userService, $location, $state) {
    
    isLogged = false;
    

    $scope.logout = function(){
        userService.logout();
        $state.go('home');
    }

    if(isLogged == false) {
    	if(userService.isLogged() == true) {
    		$state.go('loggedHome');
    	}
    	else {
    		$state.go('home');
    	}
    }
   
}]);