app.controller('modalMsgAutoCloseCtrl', ['$scope','$uibModalInstance','dataToModal' ,function ($scope, $uibModalInstance,dataToModal) {
	
	$scope.dataToModal = dataToModal;
    
    $scope.text = dataToModal.text;
	
	if (dataToModal.autoClose) setTimeout(function(){ $uibModalInstance.close(); }, 2000);
	
	$scope.ok = function() {
		$uibModalInstance.close();	
	};
	
	
	   
   
}]);