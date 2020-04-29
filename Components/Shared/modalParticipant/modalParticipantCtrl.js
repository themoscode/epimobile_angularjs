//app.controller('modalParticipantCtrl', ['$rootScope','$scope','$uibModalInstance','array_temp','obj','services' ,function ($rootScope, $scope, $uibModalInstance,array_temp,obj,services) {

	app.controller('modalParticipantCtrl', ['$scope','$uibModalInstance','array_temp','obj','services' ,function ($scope, $uibModalInstance,array_temp,obj,services) {
	
	
		//$scope.epiUsers = services.common.epiUsers.entities;
		console.log("************************");
		console.log("module",$scope.module);
		console.dir(services.common.clientRights);

		$scope.read_only = services.common.clientRights[$scope.module].read_only;
		console.log("read_only",$scope.read_only);
	
		$scope.getEpiUsers = function(){
	
			$scope.epiUsers = [
				{
					"name_display":"user1",
					"user_id":2,
					"primary_key":2,
				},
				{
					"name_display":"user2",
					"user_id":3,
					"primary_key":3,
				},
				{
					"name_display":"user3",
					"user_id":4,
					"primary_key":4
				},
				
			]
	
		}
	
		$scope.array_temp = array_temp;
		
		
		//_this.tools.arrayObjectIndexOf = function(myArray, searchTerm, property)
	
		$scope.addParticipant = function(obj){
			
			var participant_to_add = {
				primary_key: obj.primary_key, 
				user_id: obj.user_id, 
				user_name: obj.name_display
			};

			console.log("participant added");
			console.dir(participant_to_add);

			if (services.tools.arrayObjectIndexOf($scope.array_temp,participant_to_add.user_id,"user_id") == -1) {
				$scope.array_temp.push(participant_to_add);

				console.log("array_temp");
				console.dir($scope.array_temp);
			}	
			
		}
	
		$scope.removeParticipant = function(obj){
			
			services.tools.removeObjectFromArray($scope.array_temp,obj,'primary_key');
		}
	
	
		$scope.ok = function() {
	
			$scope.data.participant = $scope.array_temp;
			$uibModalInstance.close();	
		};
		
		$scope.cancel = function() {
			$uibModalInstance.close();	
		};
		
	   //////////////////////////////////////////////////////////////
	   
	   $scope.getData(obj.primary_key);
	   $scope.getEpiUsers();
	   
	}]);