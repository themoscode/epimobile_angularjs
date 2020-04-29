app.controller('modalAvailabilityCtrl', ['$rootScope','$scope','$uibModalInstance','services','obj' ,function ($rootScope, $scope, $uibModalInstance,services,obj) {
  
  $scope.obj = obj;  
  
  
  $scope.ok = function() {
        $uibModalInstance.close();	
  };
  

  $scope.getResult = function(){
    

    var filterStr=obj.primary_key+'?';

    if ($scope.searchFilters.dateFrom!="") {
        
        filterStr=filterStr+'ds='+services.tools.dateYMDorDMY($scope.searchFilters.dateFrom).replace(/\./g, "-")+'&';
       
    }

    if ($scope.searchFilters.dateTo!="") {
        
        filterStr=filterStr+'de='+services.tools.dateYMDorDMY($scope.searchFilters.dateTo).replace(/\./g, "-")+'&';
        
    }

    if ($scope.searchFilters.isRent) {
        filterStr=filterStr+'ir=t&';
    }
    if ($scope.searchFilters.isSell) {
        filterStr=filterStr+'is=t&';
    }

    filterStr = filterStr.slice(0, -1);
    
  //  console.log("filterStr="+filterStr);

    services.api({
        method:"GET",
        data:"",
        url:localStorage.origin+localStorage.api_version+'/product/mrp/'+filterStr
    }).then(function(result) {
    
        
        if (result) {
            $scope.result = result.payload[0].summary[0];
            $scope.result.warehouse_name = services.common.sessionStorage.get('selectedLagerName');

           // console.log("result=");
           // console.dir(result);
            
        }
    
    })


  }

///////////////////////////////////

$scope.getResult(); 
 
	   
   
}]);