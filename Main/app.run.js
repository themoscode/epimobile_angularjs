app.run(['$rootScope', '$location', function ($rootScope, $location) {
    
    $rootScope.$on('$routeChangeStart', function (event) {
		
			
		if (sessionStorage.userData === undefined){
			//$location.path('/login');
		}
		

    });

}]);