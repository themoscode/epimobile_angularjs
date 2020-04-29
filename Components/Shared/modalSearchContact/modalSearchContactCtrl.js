

app.controller('modalSearchContactCtrl', ['$rootScope','$scope','$uibModalInstance','services','obj' ,function ($rootScope, $scope, $uibModalInstance,services,obj) {
	
	//TERMINE, AUFGABEN
	
	$scope.currentPage = 1;
	$scope.pageSize = 10;

  $scope.ok = function() {

		obj.contact_pk = $scope.modalSelectedContact.contact_pk;
		obj.contact_name = $scope.modalSelectedContact.contact_name;
		//obj.contact = $scope.modalSelectedContact.contact;

		$uibModalInstance.close();	
	};
    
  $scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
    
	$scope.modalSelectedContact = {
		contact_pk:obj.contact_pk,
		contact_name:obj.contact_name,
		//contact:obj.contact
	}
  

	$scope.selectContact = function(row){
		$scope.modalSelectedContact.contact_pk = row.primary_key;
		$scope.modalSelectedContact.contact_name = row.name;
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


