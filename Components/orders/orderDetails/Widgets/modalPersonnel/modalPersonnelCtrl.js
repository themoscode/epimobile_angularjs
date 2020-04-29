//app.controller('modalPersonnelCtrl', ['$rootScope','$scope','$uibModalInstance' ,function ($rootScope, $scope, $uibModalInstance) {
  app.controller('modalPersonnelCtrl', ['$scope','$uibModalInstance' ,function ($scope, $uibModalInstance) {
		
    
    $scope.ok = function() {
		$uibModalInstance.close();	
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
      };
    
    
}]);