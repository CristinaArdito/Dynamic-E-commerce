angular.module('myApp.controllers', ['ngAnimate', 'ngTouch', 'ngFader', 'ngCookies'])
.controller('mainController', ['$scope','userService', '$location', '$state', '$http', '$cookieStore', '$rootScope', 'dataHandler',
function($scope, userService, $location, $state, $http, $cookieStore, $rootScope, dataHandler) {
    
    isLogged = false;
    

    $scope.logout = function(){
        userService.logout();
        $state.go('home');
    }

    $rootScope.globals = $cookieStore.get('globals') || {};
    //console.log($rootScope.globals.currentUser);
    if($rootScope.globals.currentUser != null) {
        if($rootScope.globals.currentUser.isAdmin == true) {
             $state.go('loggedHomeAdmin');
        }    
        else {
            $state.go('loggedHome');
        }
    }

    $scope.initCategory = function(data){
        dataHandler.set(data);
    }

 /*productService.getProductsByCat("Monitor")
 .then(function(data) {
               for(i=0;i<data.length;i++){
                console.log(data[i].name);
            }
});*/
    
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