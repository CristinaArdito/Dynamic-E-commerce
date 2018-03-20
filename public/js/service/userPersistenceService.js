var kriApp = angular.module('kriapp');

kriApp.factory("userPersistenceService", function() {

    var savedData = null;
    var indice = -1;
    
    function set(data) {
      savedData = data;
    }

    function get() {
     var ret = savedData;
     savedData = null;
     return ret;
    }

    function get_nonreset() {
      var ret = savedData;
      return ret;
    }

    return {
     set: set,
     get: get,
     get_nonreset: get_nonreset,
    }
   
   })
   .run(function(userPersistenceService) {});
