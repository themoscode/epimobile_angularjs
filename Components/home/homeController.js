app.controller('homeController', [ '$scope','focus','services','$routeParams','$uibModal',function ($scope,focus,services,$routeParams,$uibModal) {

   
//---------panelHeader preferences--------------------
$scope.showPreferences = true;
//----------------------------------------------------

//alert(services.common.sessionStorage.get('selectedMandantName'),services.common.sessionStorage.get('selectedLagerName'));

//$scope.today = moment().lang("de").format('dddd')+", "+moment().lang("de").format('DD')+". "+moment().lang("de").format('MMMM')+" "+moment().lang("de").format('YYYY');
$scope.today = moment().locale("de").format('dddd')+", "+moment().locale("de").format('DD')+". "+moment().locale("de").format('MMMM')+" "+moment().locale("de").format('YYYY');



$scope.loggedUserData={
    "selectedMandantName":"Tom James",
    "selectedLagerName":"Lager1",
    "fullname":"Tom James"
}

$scope.openModalEpiInfo = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'Components/Shared/modalEpiInfo/index.html',
      controller: 'modalEpiInfoCtrl'
      
    });
  
  
  };


/////////////////////////////////////////////////////////////////////////////////

$scope.searchFilters = {
    searchText:""
}

$scope.meetingsLength="10";
$scope.tasksLength="11";
$scope.contactsLength="12";
$scope.productsLength="13";
$scope.ordersLength="14";
$scope.invoicesLength="15";

$scope.searchNavigate = function(searchFilters){
	//alert("2");	
    var url='/home/text/'+searchFilters.searchText;

   // console.log(url);

    services.tools.navigateTo(url);

}

//////////////////////////autocomplete///////////////////////
var searchArrayString = 'global';
$scope.autocomplete = {

    getSelectedValue : function(selected){ //value from  autocomplete list when selected
        if (selected) {
            var searchText = selected.title;

            $scope.searchFilters.searchText = searchText;
            $scope.searchNavigate($scope.searchFilters);
        }
    },

    getTextValue : function(){ // value from autocomplete text box when submit
        //console.log("getTextValue");
        var searchText = angular.element('#ac_value')[0].value;
        services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,searchArrayString);
        
        $scope.searchFilters.searchText = searchText;
        $scope.searchNavigate($scope.searchFilters);
    },


    inputChanged:function(searchText){
        
        if ($scope.searchFilters) $scope.searchFilters.searchText = searchText;

        if (searchText!="") 
            $scope.autocomplete.showXbutton = true;
        else{
           // $scope.autocomplete.showXbutton = false; 
            /////////
            localStorage.globalSearch = "";
            /////////
            services.tools.navigateTo('/home');
        }
             
         
     },

     focusIn:function(){
        $scope.searchArray = JSON.parse(localStorage.searchItems)[searchArrayString];
    },

    clear:function(){
        
        $scope.$broadcast('angucomplete-alt:clearInput');
        $scope.autocomplete.showXbutton = false; 
        
        /////////
        localStorage.globalSearch = "";
        /////////
        services.tools.navigateTo('/home');
        
    },

    showXbutton:false

}
//////////////////////////autocomplete///////////////////////



/////////////////////////
$scope.getModuleLength = function(urlStr,moduleLength){

    services.api({
        method:"GET",
        data:"",
        url:localStorage.origin+localStorage.api_version+urlStr
    }).then(function(result) {

        if (result) {
            $scope[moduleLength] = result.payload_length;
            
        }

    })

}



if (localStorage.globalSearch!="" && $routeParams.filter_text == undefined) {
    $scope.searchFilters.searchText = localStorage.globalSearch;
    $scope.searchNavigate($scope.searchFilters);
}


if ($routeParams.filter_text != undefined){ //search with keyword
        
    //$scope.searchDone = true;
    $scope.autocomplete.showXbutton = true; 
    
    $scope.searchFilters.searchText = $routeParams.filter_text;
    /////////
    localStorage.globalSearch = $routeParams.filter_text;
    
    /////////

    //meetings Length

    

}




//console.log("localStorage");
//console.dir(localStorage);

//////////////////////////////
services.tools.fixHeader();
//////////////////////////////

}]);