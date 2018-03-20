var kriApp = angular.module('kriapp');

kriApp.service('userService', ['$q', '$http', '$cookieStore', '$rootScope', function($q, $http, $cookieStore, $rootScope) {

    var self = null;
    var mail = "";
    var isAdmin = false;

    this.login = function(email, psw) {
         var deferred = $q.defer();

        $http.post('././api/user/authenticate',
                    {'email':email, 'password':psw})
             .then(function(data) 
                 {
                  //data.data.message -> returns 'Enjoy your token!'
                  //data.data.data.token -> returns user token
                  self = data.data.data.token;      // mi salvo l'utente corrente
                  mail = email;
                  isAdmin = data.data.data.admin;
                  SetCredentials(mail, psw, isAdmin); 
                  deferred.resolve(self);
                 })
             .catch(function(err, code) 
                 { 
                  self = null; // resetto l'utente
                  deferred.reject(err.messaggio);
                 });  
        return deferred.promise; 
    }  

    function SetCredentials(email, password, isAdmin) {
            $rootScope.globals = {
                currentUser: {
                    email: email,
                    password: password,
                    isAdmin: isAdmin
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
    }
    
   this.logout = function(){
        self=null;
        ClearCredentials();
    }

    function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        };        


    this.isLogged = function() {
      if(self == null) return false;
      else return true;
    }

    this.signup = function(name, psw, email, address) {
         var deferred = $q.defer(); 
         $http.post('././api/user/signup',
                    {'name':name, 'password':psw, 'email':email, 'address': address})
             .then(function(data) 
                 {
                  deferred.resolve(data);
                 })
             .catch(function(err, code) 
                 {  
                  self.utenteLoggato = undefined; // resetto l'utente
                  deferred.reject(err);
                 });
        return deferred.promise; 
    }  

    this.getUsers = function(){
        var deferred = $q.defer();

        $http.post("././api/user/all")
        .then(function(data){
          //data.data returns all the object
          //data.data.msg returns the message
          //data.data.data return user's list
            deferred.resolve(data.data);
        })
        return deferred.promise;
    }  

    this.isAdmin = function() {
      if(isAdmin == true) return true;
      else return false;
    }



}]).run(function(userService) {});