
app.controller('modalEpiInfoCtrl', ['$rootScope','$scope','$uibModalInstance' ,function ($rootScope, $scope, $uibModalInstance) {
	
    
    $scope.ok = function() {
		$uibModalInstance.close();	
  
  };
    
    
}]);