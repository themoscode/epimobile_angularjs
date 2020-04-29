app.controller('modalEditKapitelOrderItemCtrl', ['$scope','$uibModalInstance','temp_obj','index','parent_index' ,function ($scope, $uibModalInstance,temp_obj,index,parent_index) {
	
  $scope.selectedProduct = temp_obj;	

  $scope.ok = function() {

        $scope.getOrder.order_items[parent_index].__chapter_items[index] = temp_obj;
		    $uibModalInstance.close();
    		
	};
    
  $scope.cancel = function() {

		    $uibModalInstance.dismiss('cancel');
    
    };
    
}]);


