//app.controller('modalNewContactHistoryCtrl', ['$rootScope','$scope','$uibModalInstance' ,function ($rootScope, $scope, $uibModalInstance) 
app.controller('modalNewContactHistoryCtrl', ['$scope','$uibModalInstance' ,function ($scope, $uibModalInstance) {

    
    $scope.ok = function() {
            $uibModalInstance.close();	
            
    };

    $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
    };


}]);