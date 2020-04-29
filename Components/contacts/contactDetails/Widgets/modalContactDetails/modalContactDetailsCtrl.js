//app.controller('modalContactDetailsCtrl', ['$rootScope','$scope','$uibModalInstance','services' ,function ($rootScope, $scope, $uibModalInstance,services) {
  app.controller('modalContactDetailsCtrl', ['$scope','$uibModalInstance','services' ,function ($scope, $uibModalInstance,services) {

  $scope.communicationTypes = services.common.types.communication;

  $scope.ok = function() {
			$uibModalInstance.close();	
	};

  $scope.cancel = function() {
       $uibModalInstance.dismiss('cancel');
	};
    
   
       
   
}]);