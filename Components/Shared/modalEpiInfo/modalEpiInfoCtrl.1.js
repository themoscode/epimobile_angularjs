//app.controller('modalEpiInfoCtrl',['$scope','$routeParams','$uibModal',function($scope,$routeParams,$uibModal){
  app.controller('modalEpiInfoCtrl',['$scope','$uibModal',function($scope,$uibModal){
		

  

  $scope.open = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'Components/Shared/modalEpiInfo/index.html',
      controller: 'modalEpiInfoCtrlInstance'
      
    });
  
  
  };
  
  
}]);


app.controller('modalEpiInfoCtrlInstance', ['$rootScope','$scope','$uibModalInstance' ,function ($rootScope, $scope, $uibModalInstance) {
	
    
    $scope.ok = function() {
		$uibModalInstance.close();	
  
  };
    
    
}]);