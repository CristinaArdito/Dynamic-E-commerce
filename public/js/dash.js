angular.module('myApp.controllers')
.controller("werehouseController", ['$scope', '$compile', '$location', 'productService',
function ($scope, $compile, $location, productService) {

	$scope.showProducts = function() {




	}

















}])
.controller("dashController", ['$scope', 'dataHandler' , function($scope, dataHandler){
    
    $scope.resetData = function(){
      dataHandler.reset();
    }
}]);