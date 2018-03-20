angular.module('myApp.controllers', ['ngAnimate', 'ngTouch', 'ngFader', 'ngCookies'])
.controller('mainController', ['$scope','userService', '$location', '$state', '$http', '$cookieStore', '$rootScope',
function($scope, userService, $location, $state, $http, $cookieStore, $rootScope) {
    
    isLogged = false;
    

    $scope.logout = function(){
        userService.logout();
        $state.go('home');
    }

    $rootScope.globals = $cookieStore.get('globals') || {};
    console.log($rootScope.globals.currentUser);
    if($rootScope.globals.currentUser != null) {
        if($rootScope.globals.currentUser.isAdmin == true) {
             $state.go('loggedHomeAdmin');
        }    
        else {
            $state.go('loggedHome');
        }
    }

  /*  if(isLogged == false) {
    	if(userService.isLogged() == true) {
    		if(userService.isAdmin() == true) {
                $state.go('loggedHomeAdmin');
            }
            else {
                $state.go('loggedHome');
            }
    	}
    	else {
    		$state.go('home');
    	}
    }*/
   
}]);