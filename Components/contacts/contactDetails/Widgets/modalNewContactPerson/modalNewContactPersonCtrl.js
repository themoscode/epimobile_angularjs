//app.controller('modalNewContactPersonCtrl', ['$rootScope','$scope','$uibModalInstance','cp_obj' ,function ($rootScope, $scope, $uibModalInstance,cp_obj) {

  app.controller('modalNewContactPersonCtrl', ['$scope','$uibModalInstance','cp_obj' ,function ($scope, $uibModalInstance,cp_obj) {
    
  
$scope.cp_obj = cp_obj;

$scope.ok = function() {
        $uibModalInstance.close();	
       
  };

$scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
  };


}]);