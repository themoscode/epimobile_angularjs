

//app.controller('modalNewMaterialCtrl', ['$rootScope','$scope','$uibModalInstance' ,function ($rootScope, $scope, $uibModalInstance) {
	app.controller('modalNewMaterialCtrl', ['$scope','$uibModalInstance' ,function ($scope, $uibModalInstance) {
    
      $scope.ok = function() {
        $uibModalInstance.close();	
      };
    
    
}]);