

app.controller('modalSearchContactCtrl2', ['$rootScope','$scope','$uibModalInstance','services','obj' ,function ($rootScope, $scope, $uibModalInstance,services,obj) {
	
	//AUFTRAG (KUNDE)
	
	$scope.currentPage = 1;
	$scope.pageSize = 10;

  $scope.ok = function() {

	obj.primary_key = $scope.modalSelectedContact.primary_key;
	obj.name = $scope.modalSelectedContact.name;
	$scope.getContactData(obj.primary_key);
	
	$uibModalInstance.close();		

			
	};
    
  $scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
    
	$scope.modalSelectedContact = {
		primary_key:obj.primary_key,
		name:obj.name,
		//contact:obj.contact
	}
  

	$scope.selectContact = function(row){

		console.dir(row);
		$scope.modalSelectedContact.primary_key = row.primary_key;
		$scope.modalSelectedContact.name = row.name;
}
	

	

	$scope.getContactsData = function(searchText){

		$scope.searchDone = false;

		services.common.loading.contacts = true;
		$scope.getContacts = [];

			services.api({
				method:"GET",
				data:"",
				url:localStorage.origin+localStorage.api_version+'/contact/filter/?q='+searchText
			}).then(function(result) {

				$scope.searchDone = true;
				services.common.loading.contacts = false;

			if (result) {
				$scope.getContacts = result.payload;
				
			}
			else {
				$uibModalInstance.close();	
			}

	})

}
       
   
}]);