angular.module('myApp.controllers', []); 
angular.module('myApp.services', []);

angular.module('kriapp', ['myApp.services', 'myApp.controllers', 'ngRoute', 'ui.router'])
.run(function(){

})
.config(function($routeProvider, $stateProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/front-end/home.ejs',
                controller: 'mainController'
            })     
            .when('/login', {
                templateUrl : 'views/front-end/login.ejs',
                controller: 'loginController'
            })  
            .when('/signup', {
                templateUrl : 'views/front-end/signup.ejs',
                controller: 'signupController'
            })  



/***** ROUTE VIEW UI *****/
		$stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'views/indexLogout.ejs',
            controller: 'mainController'
        })
        .state('loggedHome', {
            url: '/',
            templateUrl: 'views/indexLogin.ejs',
            controller: 'mainController'
        });
	})        

    .controller('MyCtrl', ['$state', 'userService', function($state, userService) {
        if(userService.isLogged() == true) {
            $state.go('loggedHome');
        }
        else {
            $state.go('home');
        }
    }])

    //Silenzia errori di codice del router delle view, non è influente per il funzionamento
    .config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);    