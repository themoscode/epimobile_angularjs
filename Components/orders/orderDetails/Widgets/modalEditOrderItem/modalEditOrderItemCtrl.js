app.controller('modalEditOrderItemCtrl', ['$scope','$uibModalInstance','temp_obj','index' ,function ($scope, $uibModalInstance,temp_obj,index) {
	
	
  $scope.selectedProduct = temp_obj;	

  $scope.ok = function() {

    $scope.getOrder.order_items[index] = temp_obj;
		$uibModalInstance.close();
    		
	};
    
  $scope.cancel = function() {

		$uibModalInstance.dismiss('cancel');
    
    };
    
}]);


