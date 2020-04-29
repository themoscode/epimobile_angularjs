//app.controller('modalContactHistoryCtrl', ['$rootScope','$scope','$uibModalInstance','data','services' ,function ($rootScope, $scope, $uibModalInstance,data,services) {
app.controller('modalContactHistoryCtrl', ['$scope','$uibModalInstance','data','services' ,function ($scope, $uibModalInstance,data,services) {
    
        console.log("************************");
        console.log("module",$scope.module);
        console.dir(services.common.clientRights);

        $scope.read_only = services.common.clientRights[$scope.module].read_only;
        console.log("read_only",$scope.read_only);  

        /*
        services.api({
		method:"GET",
		data:"",
		url:localStorage.origin+localStorage.api_version+'/cchrono/'+data.primary_key
	}).then(function(result) {

                $scope.getContactHistory = result.payload[0];
              //  console.dir($scope.getContactHistory);

	})
        */

        $scope.getContactHistory = {

                "date": "2017-12-10T23:00:00.000Z",
                "time": 64437000,
                "com_type_str":"Telefonat",
                "duration":"10 min",
                "contact_partner":"george Lucas",
                "keyword":"Installation"

        }





    $scope.ok = function() {
            $uibModalInstance.close();	
            
    };

    $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
    };


}]);