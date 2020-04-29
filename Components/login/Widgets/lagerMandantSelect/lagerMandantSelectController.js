//app.controller('lagerMandantSelectController', ['$scope','$uibModalInstance','$location','services' ,function ($scope, $uibModalInstance,$location,services) {
app.controller('lagerMandantSelectController', ['$scope','$uibModalInstance','$location','services' ,function ($scope, $uibModalInstance,$location,services) {

	

	$scope.setInfo = function () {
		
		$location.path('/home');

	}


    $scope.submit = function() {
        
        //alert("submit");
        
        $uibModalInstance.close();
        
        $scope.userData.selectedMandantID = $scope.selectedMandant.mandant_id;
        $scope.userData.selectedMandantName = $scope.selectedMandant.mandant_name;
        
        $scope.userData.selectedLagerID = $scope.selectedLager.Primary_Key;
        $scope.userData.selectedLagerName = $scope.selectedLager.Name;
        
	   // sessionStorage.userData = JSON.stringify($scope.userData);
	   
	    services.common.sessionStorage.set($scope.userData);
        
        console.log("sessionStorage.userData=");
        console.dir(JSON.parse(sessionStorage.userData));
		
				console.log("______selectedMandantID=");
				console.log(services.common.sessionStorage.get('selectedMandantID'));
        
        
       
				$scope.setInfo();
		
        
    };
       
   
	  $scope.cancel = function ($event) {
	  	
	     $uibModalInstance.close();
	     
	     
	  };
	  

	  $scope.on_mandant_change = function(){
		if ($scope.selectedMandant.warehouse.length == 1) {
			$scope.selectedLager = $scope.selectedMandant.warehouse[0];
		  }
	  }


	  ////////////////////////////////////////

	  if ($scope.userData.mandanten.length == 1) {
		$scope.selectedMandant = $scope.userData.mandanten[0];
	  }
	  else if ($scope.userData.mandanten.length > 1) {
		
		var selectedMandantIndex = services.tools.arrayObjectIndexOf(
			$scope.userData.mandanten,
			$scope.userData.last_mandantID,
			"mandant_id");
		
		$scope.selectedMandant = $scope.userData.mandanten[selectedMandantIndex];
	  }

	  ////

	  if ($scope.selectedMandant.warehouse.length == 1) {
		$scope.selectedLager = $scope.selectedMandant.warehouse[0];
	  }

	  else if ($scope.selectedMandant.warehouse.length > 1) {

		var selectedLagerIndex = services.tools.arrayObjectIndexOf(
			$scope.selectedMandant.warehouse,
			$scope.userData.last_warehouseID,
			"Primary_Key");
		
		$scope.selectedLager = $scope.selectedMandant.warehouse[selectedLagerIndex];


		}
		
		//////////////////////////////////////////////////


	
}]);


