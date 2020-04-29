//app.controller('popupContactSearchResultController', ['$rootScope','$scope','$uibModalInstance','commonServices','filter_text',function ($rootScope, $scope, $uibModalInstance,commonServices,filter_text) {

app.controller('popupContactSearchResultController', ['$scope','$uibModalInstance','filter_text',function ($scope, $uibModalInstance,filter_text) {
    
  
  $scope.externalCall = {
  	
  	caller:"tasks",
  	filter_text:filter_text
  };
  
  $scope.deliverContactToTask = function(contact){
  	
  //	console.log("0="+contact.Name1);
  	
  	$uibModalInstance.close(contact);
  
  }
  
  
   
  $scope.cancel = function () {
     $uibModalInstance.dismiss();
  };

 

}]);