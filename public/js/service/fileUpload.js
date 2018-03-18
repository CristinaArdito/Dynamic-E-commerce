var kriApp = angular.module('kriapp');

kriApp.service('fileUpload', ['$q','dataHandler',function ($q, dataHandler) 
  {

    this.fileReader = function (file) {

            var reader = new FileReader();
            var result = null;

            reader.readAsDataURL(file);

            reader.onload = function(event) {
                dataHandler.set(event.target.result);
                alert("Caricamento completato");
            };
    }
  }])
  .run(function(fileUpload) {});