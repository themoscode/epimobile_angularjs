app.controller('modalPrefCtrl',['$scope','$routeParams','$uibModal','services',function($scope,$routeParams,$uibModal,services){
	

  

  $scope.open = function (text) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'Components/Shared/modalPreferences/index.html',
      controller: 'modalPrefCtrlInstance',
      scope:$scope
    }).result.catch(function(){
      
      if (localStorage.globalSearch == "")  services.tools.navigateTo('/home');
  });
  

  
  };
  
  
}]);


// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('modalPrefCtrlInstance', ['$rootScope','$scope','$uibModalInstance','services' ,function ($rootScope, $scope, $uibModalInstance,services) {
   
  
   
  $scope.$on('switchChanged', function(scope, val, id)
  {
   
    if (val == false) {
      localStorage.globalSearch = "";
      $scope.autocomplete.showXbutton = false; 
      angular.element('#ac_value')[0].value="";
    }

   

  })

    
    $scope.ok = function() {

     if (localStorage.globalSearch == "")  services.tools.navigateTo('/home');
    
		 $uibModalInstance.close();	
	};
    
      $scope.cancel = function() {
		  $uibModalInstance.dismiss('cancel');
	};
    
   
       
   
}]);