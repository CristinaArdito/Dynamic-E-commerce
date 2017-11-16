angular.module('myApp.controllers', []); 

angular.module('kriapp', ['myApp.controllers', 'ngRoute'])
.run(function(){

})
.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/front-end/home.ejs',
            });
});            