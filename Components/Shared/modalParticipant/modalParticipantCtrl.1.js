//app.controller('modalParticipantCtrl', ['$rootScope','$scope','$uibModalInstance','array_temp','obj','services' ,function ($rootScope, $scope, $uibModalInstance,array_temp,obj,services) {

app.controller('modalParticipantCtrl', ['$scope','$uibModalInstance','array_temp','obj','services' ,function ($scope, $uibModalInstance,array_temp,obj,services) {
	
	
	//$scope.epiUsers = services.common.epiUsers.entities;


	$scope.getEpiUsers = function(){

		services.common.epiUsers.entities().then(function(result) {
			
			if (result) {
				$scope.epiUsers = result.payload;
				
			}

			else {
				services.common.openMsgAutoclose("ERROR GETTING USERS");
				$uibModalInstance.dismiss('cancel');
			}
	
		})

	}

	


	$scope.array_temp = array_temp;
	
	
	//_this.tools.arrayObjectIndexOf = function(myArray, searchTerm, property)

	$scope.addParticipant = function(obj){

		if (services.tools.arrayObjectIndexOf($scope.array_temp,obj.primary_key,"primary_key") == -1) {
			$scope.array_temp.push(obj);
		}
		
	}

	$scope.removeParticipant = function(obj){
		
		services.tools.removeObjectFromArray($scope.array_temp,obj,'primary_key');
	}


    $scope.ok = function() {

		obj.participant = $scope.array_temp;
    	$uibModalInstance.close();	
	};
    
    $scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
    
   //////////////////////////////////////////////////////////////

   $scope.getEpiUsers();
   
}]);