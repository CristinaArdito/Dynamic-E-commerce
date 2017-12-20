angular.module('myApp.controllers', []); 

angular.module('kriapp', ['myApp.controllers', 'ngRoute', 'ui.router'])
.run(function(){

})
.config(function($routeProvider, $stateProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/front-end/home.ejs',
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

    .controller('MyCtrl', ['$state', function($state) {
    }])

    //Silenzia errori di codice del router delle view, non è influente per il funzionamento
    .config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);    