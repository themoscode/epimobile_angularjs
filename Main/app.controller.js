
//app.controller('rootController',['$scope','$rootScope','$routeParams','$window','$timeout','$location','$http','deviceDetector','services','$filter',function($scope, $rootScope,$routeParams,$window,$timeout,$location,$http,deviceDetector,services,$filter){  

	app.controller('rootController',['$scope','deviceDetector','services',function($scope,deviceDetector,services){  
  	
		  //services//
			  $scope.services = services; // for to able to call some services from html
		 //services	
		 
		 
		  ///////////////////DETECT BROWSER//////////////////
		  $scope.deviceDetector=deviceDetector;
		  ///////////////////DETECT BROWSER END//////////////////
		  
		  /*
		   $scope.readOnly = false;///readOnly
		   $scope.changeEditMode = function(){
			   $scope.readOnly = !$scope.readOnly;
		   }
		   */

		   $scope.changeViewMode = function(module){
			
			if (services.common.clientRights[module].can_update) {
				services.common.clientRights[module].read_only = !services.common.clientRights[module].read_only;
			}
			
		}
		  
		

		   //////////sessionStorage////////
		  
		 //  console.log("start--sessionStorage.userData=");
		 //  console.dir(sessionStorage.userData);
		   
		   ////////localStorage//////////////

		   services.common.localStorage.set();

		   
  }]);