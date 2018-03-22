var kriApp = angular.module('kriapp');

/*
when we call service() it actually calls factory(). But it doesn’t just pass our service 
constructor function to the factory as it is. It passes a function that asks the injector 
to instantiate and object by the given constructor. In other words: a service calls a 
predefined factory, which ends up as $get() method on the corresponding provider. 

a factory creates a provider for our service.

quando utilizziamo un servizio definito tramite il metodo service(), 
Angular ci fornisce un’istanza della funzione associata al servizio. 
Quando utilizziamo un servizio definito tramite il metodo factory(), 
Angular ci fornisce il valore restituito dall’esecuzione della funzione associata.
*/

kriApp.factory("dataHandler", function() {

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

    function reset() {
      var savedData = null;
      var indice = -1;
    }

    function getIndex(index) {
      return savedData[index];
    }

    function setIndice(i) {
      indice = i;
    }

    function getIndice() {
      return indice;
    }
    return {
     set: set,
     get: get,
     get_nonreset: get_nonreset,
     reset : reset,
     getIndex : getIndex,
     setIndice : setIndice,
     getIndice : getIndice,
    }
   
   })
   .run(function(dataHandler) {});
