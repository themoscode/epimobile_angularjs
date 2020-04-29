//app.controller('modalContactPersonCtrl', ['$rootScope','$scope','$uibModalInstance','cp_obj','cp_index','services' ,function ($rootScope, $scope, $uibModalInstance,cp_obj,cp_index,services) {

	app.controller('modalContactPersonCtrl', ['$scope','$uibModalInstance','cp_obj','cp_index','services','$confirm' ,function ($scope, $uibModalInstance,cp_obj,cp_index,services,$confirm) {
	
	
	
	$scope.communicationTypes = services.common.types.communication;
	
	    console.log("************************");
		console.log("module",$scope.module);
		console.dir(services.common.clientRights);

		$scope.read_only = services.common.clientRights[$scope.module].read_only;
		console.log("read_only",$scope.read_only);

	
	$scope.cp_obj = cp_obj;

    $scope.ok = function() {
			$uibModalInstance.close();	
			$scope.getContact.contact_person[cp_index] = cp_obj;
			//console.dir($scope.getContact.contact_person[cp_index]);
	  };

    $scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
	  };
	
	
	$scope.ooogetCPImage = function(id){
        
        services.api({
            method:"GET",
            data:"",
			url:localStorage.origin+localStorage.api_version+'/cperson/image/'+id
        }).then(function(result) {

			//console.log("cp image");
			//console.log(result);

            if (result.payload_length > 0) {
                
                var codec = result.payload[0].codec;
                var image_data =  result.payload[0].image_data;
                $scope.getCP_data.__image = "data:image/"+codec+";base64,"+image_data;
            
            }else {
                
                $scope.getCP_data.__image = "./Assets/img/image_128x128.png";

            }

        })

	} 

	$scope.getCPImage = function(id){
        
        $scope.getCP_data.__image = "./Assets/img/image_128x128.png";
      

	} 
	

	$scope.oooogetContactPerson_data = function(id){

			//get contact person communication data
		
		
		services.api({
			method:"GET",
			data:"",
			url:localStorage.origin+localStorage.api_version+'/cperson/'+id
		}).then(function(result) {

			$scope.getCP_data = result.payload[0];

			

			//Communication data , delete array elements with uplink=""
			var index_del = []; //hold indexes to be deleted
			
			angular.forEach($scope.getCP_data.communication, function(item, index) {
				
				if (item.uplink == "") index_del.push(index);
					
			});

				// delete elements that do not have data
				angular.forEach(index_del.reverse(), function(index) {
				
				$scope.getCP_data.communication.splice(index,1);
				
				});

				index_del = [];

				console.dir($scope.getCP_data.communication);
			//////////////////////////////////
			//get cp image	


			$scope.getCPImage(id);
			console.log("CP DATA");
			console.log($scope.getCP_data);

		})

	}

	$scope.getContactPerson_data = function(id){
		
					//get contact person communication data
				
					$scope.getCP_data = {

						communication : [
							{
								type:0,
								phone_match_number:"46463738282",
								uplink:"5646456456"
							},
							{
								type:1,
								uplink:"5646456456"
							}
						]	

					}
					$scope.getCPImage(id);
		
			}

	$scope.addCommunicationData = function(obj){

        console.dir(obj);

        var obj_to_add = {
            
            $$hashKey: "", 
            contact_person_pk:0,
            contact_pk:76,
            description:"",
            is_invoice:false,
            is_newsletter:false,
            phone_match_number:"",
            position:0,
            primary_key:382,
            type:obj.type,
            uplink:""
        };

        $scope.getCP_data.communication.push(obj_to_add);

	}
	
	$scope.deleteCommunicationData = function(obj){
      
        console.dir(obj);
        //communicationTypes[row.type].title
        $confirm({text: 'Sind Sie sicher?', title: $scope.communicationTypes[obj.type].title+' löschen', ok: 'Ja', cancel: 'Nein'})
        .then(function() {
          
        services.tools.removeObjectFromArray($scope.getCP_data.communication,obj,'primary_key');  
         
        });
  
      }


	$scope.getContactPerson_data(cp_obj.primary_key);


   
}]);