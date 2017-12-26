var kriApp = angular.module('kriapp');

kriApp.service('userService', ['$q', '$http', function($q, $http) {

    var self = null;
    var mail = "";
    var isAdmin = false;

    this.login = function(email, psw) {
         var deferred = $q.defer();

        $http.post('././api/user/authenticate',
                    {'email':email, 'password':psw})
             .then(function(data) 
                 {
                  self = data.data.data.token;      // mi salvo l'utente corrente
                  mail = email;
                  isAdmin = data.data.data.admin;
                  deferred.resolve(self);
                 })
             .catch(function(err, code) 
                 { 
                  self = null; // resetto l'utente
                  deferred.reject(err.messaggio);
                 });
        return deferred.promise; 
    }  




	}]).run(function(userService) {});