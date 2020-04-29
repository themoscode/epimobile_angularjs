
//app.controller('modalMaterialCtrl', ['$rootScope','$scope','$uibModalInstance' ,function ($rootScope, $scope, $uibModalInstance) {
  app.controller('modalMaterialCtrl', ['$scope','$uibModalInstance' ,function ($scope, $uibModalInstance) {
		
    
  $scope.ok = function() {
		$uibModalInstance.close();	
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };
    
    
}]);