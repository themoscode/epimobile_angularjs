//app.controller('modalSalutationCtrl', ['$rootScope','$scope','$uibModalInstance' ,function ($rootScope, $scope, $uibModalInstance) {
app.controller('modalSalutationCtrl', ['$scope','$uibModalInstance' ,function ($scope, $uibModalInstance) {
    
    var oldSalutation = $scope.getContact.salutation;

    $scope.ok = function() {
		$uibModalInstance.close();	
	};

    $scope.cancel = function() {
        $scope.getContact.salutation = oldSalutation;
		$uibModalInstance.dismiss('cancel');
	};
    
    $scope.setSalutation= function(x){
        $scope.getContact.salutation = x;
    }
       
   
}]);