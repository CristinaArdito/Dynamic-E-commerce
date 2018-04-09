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

kriApp.factory("cartStorage", function() {

    var savedData = [];
    
    function set(data) {
      savedData = data;
    }

    function get() {
     return savedData;
    }

    function reset() {
      savedData = [];
    }

    function add(item) {
      if(savedData.length == 0) {
        savedData[0] = item;
      }
      else {
        savedData[savedData.length] = item;
      }
    }

    function isEmpty() {
      if(savedData.length == 0) return true;
      else return false;
    }

    function remove(index) {
      j = 0;
      newData = [];
      for(i = 0; i < savedData.length; i++) {
        if(i != index) {
          newData[j] = savedData[i];
          j++;
        }
      }
      savedData = newData;
    }

    function setQuantity(index, qta) {
      savedData[index][3] = qta;
    }

    function getQuantity(index) {
      if(index >= savedData.length) return -1;
      else return savedData[index][3];
    }

    function getItem(name, desc) {
      for(i = 0; i<savedData.length; i++) {
        if(savedData[i][0] == name) {
          if(savedData[i][1] == desc) {
            return i;
          }
        }
      }
      return -1;
    }

    return {
     set: set,
     get: get,
     reset : reset,
     add : add,
     isEmpty : isEmpty,
     remove : remove,
     setQuantity : setQuantity,
     getQuantity : getQuantity,
     getItem : getItem,
    }
   
   })
   .run(function(cartStorage) {});
