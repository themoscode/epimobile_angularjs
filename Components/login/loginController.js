
//app.controller('loginController', ['$scope',  '$location', '$uibModal','services', function ($scope,  $location, $uibModal, services) {
app.controller('loginController', ['$scope',  '$location', '$uibModal','services','focus','$confirm', function ($scope,  $location, $uibModal, services,focus,$confirm) {
	
	
	$scope.username = "";
	$scope.password = "";
	$scope.credentials = "";
	
	
	
	$scope.openLagerMandantSelectModal = function () {
		$uibModal.open({
			animation: true,
			templateUrl: 'Components/login/Widgets/lagerMandantSelect/index.html',
			controller: 'lagerMandantSelectController',
			scope: $scope,
			size: ''
		});
	}


	$scope.setInfo = function () {
		
		services.common.setInfo($scope.userData).then(function(result) {
			
			if (result) {
				
				$location.path('/home');

			}

		})

	}
	
	$scope.logIn = function () {
		
		
		$location.path('/home');
		
	}
	


	$scope.logOut = function () {
		
		$confirm({text: 'Sind Sie sicher?', title: 'Abmelden', ok: 'Jetzt abmelden', cancel: 'Nein'})
		.then(function() {
		 
			$location.path('/login');
		  
		});
		
		
	}

/////focus username//////
focus("username");
/////focus searchbox//////
	
}]) // controller


