//app.controller('modalMaterialCtrl', ['$rootScope','$scope','$uibModalInstance','id','services' ,function ($rootScope, $scope, $uibModalInstance,id,services) {
app.controller('modalMaterialCtrl', ['$scope','$uibModalInstance','id','services' ,function ($scope, $uibModalInstance,id,services) {
	
  
    $scope.id = id;
  
  ///////////////////////
  $scope.getProductImage = function(productID){
    
        services.api({
            method:"GET",
            data:"",
            url:localStorage.origin+localStorage.api_version+'/product/image/'+productID
        }).then(function(result) {

           // console.log("IMAGE:");
            //console.dir(result);

            if (result.payload_length > 0) {
                
                var codec = result.payload[0].codec;
                var image_data =  result.payload[0].image_data;
                $scope.getProduct.__image = "data:image/"+codec+";base64,"+image_data;
              //  console.log("image="+$scope.getProduct.__image);
               // alert("image="+$scope.getProduct.__image);
            
            }else {
                
                $scope.getProduct.__image = "./Assets/img/image_128x128.png";

            }

        })
    
    }


    


    $scope.getProductData = function(productID){
        
        services.api({
            method:"GET",
            data:"",
            url:localStorage.origin+localStorage.api_version+'/product/'+productID
        }).then(function(result) {

            $scope.getProduct = result.payload[0];
            
            //get description
            var index_descr = services.tools.arrayObjectIndexOf($scope.getProduct.mlang_description, "Deutsch", "lang_str");

            $scope.getProduct.__description = $scope.getProduct.mlang_description[index_descr].description_short;

            $scope.getProductImage(productID);

           // console.dir($scope.getProduct);

        })
    
    }

////////////////////////////////////


  $scope.getProductData(id); 



  $scope.ok = function() {
		$uibModalInstance.close();	
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };
    
    
}]);