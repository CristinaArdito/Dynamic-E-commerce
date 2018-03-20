angular.module('myApp.controllers')
.controller("werehouseController", ['$scope', '$compile', '$location',
function ($scope, $compile, $location) {
}])
.controller("dashController", ['$scope', 'dataHandler' , function($scope, dataHandler){
    
    $scope.resetData = function(){
      dataHandler.reset();
    }
}]);