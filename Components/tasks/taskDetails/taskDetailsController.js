
//app.controller('taskDetailsController',['$scope','$rootScope','$routeParams','$window','$timeout','$filter','$uibModal','$location','$confirm','services',function($scope, $rootScope,$routeParams,$window,$timeout,$filter,$uibModal,$location,$confirm,services){
    app.controller('taskDetailsController',['$scope','$routeParams','$filter','$uibModal','services','focus',function($scope, $routeParams,$filter,$uibModal,services,focus){
      
    ////////////////////////////////////////
    var searchArrayString = 'tasks';
    $scope.module = searchArrayString;
    
    
    //console.log("$scope.searchArray=");
    //console.dir($scope.searchArray);

     $scope.autocomplete = {
 
         getSelectedValue : function(selected){ //value from  autocomplete list when selected
             if (selected) {
                 var searchText = selected.title;
                 $scope.searchFilters.searchText = searchText;
                 services.searchNavigate.tasks($scope.searchFilters,$scope.daysFilter);
                
             }
         },
 
         getTextValue : function(){ // value from autocomplete text box when submit
             var searchText = angular.element('#ac_value')[0].value;
             
             services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,searchArrayString);
             
             $scope.searchFilters.searchText = searchText;
             services.searchNavigate.tasks($scope.searchFilters,$scope.daysFilter);
             
         },

         inputChanged:function(searchText){
             
             if ($scope.searchFilters) $scope.searchFilters.searchText = searchText;
             
             if (searchText!="") 
				    $scope.autocomplete.showXbutton = true;
                else{
                    $scope.autocomplete.showXbutton = false;
                    localStorage.globalSearch = "";
                }
             
          },
 
          focusIn:function(){
             $scope.searchArray = JSON.parse(localStorage.searchItems)[searchArrayString];
         },
         
         clear:function(){
            $scope.$broadcast('angucomplete-alt:clearInput');
            $scope.autocomplete.showXbutton = false; 
            $scope.searchFilters.searchText = "";
            localStorage.globalSearch = "";
          //  console.log("localStorage.globalSearch=",localStorage.globalSearch);
             
         },
 
         showXbutton:false
 
     }
     
 /////////////////////////////////////////
 $scope.searchNavigate = function(searchFilters){
		
    var url='/tasks/text/'+searchFilters.searchText;
    if (searchFilters.searchText == "") url='/tasks';

   // console.log(url);

    services.tools.navigateTo(url);

}    

$scope.daysFilter = false;
$scope.searchFilters = {
    
    searchText:""
    
  }

  $scope.openModalParticipant = function (obj) {
        
      var array_temp = [];
      
      angular.copy(obj.participant, array_temp); 
  
  
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Components/Shared/modalParticipant/index.html',
            controller: 'modalParticipantCtrl',
            scope:$scope,
            resolve: {
              obj: function () {
                return obj;
                
              },
              array_temp: function () {
                  return array_temp;
                  
                }
  
            }
            
        });       
  
    };   
  
    $scope.openModalSelectDates = function (obj) {
        
        obj.showTime = true;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Components/Shared/modalSelectDates/index.html',
            controller: 'modalSelectDatesCtrl2',
            scope:$scope,
            resolve: {
              obj: function () {
                return obj;
                
              }
            }
            
        });
        
        
    };
    
    $scope.openModalSearchContact = function (obj) {
      
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Components/Shared/modalSearchContact/index.html',
            controller: 'modalSearchContactCtrl',
            scope:$scope,
            resolve: {
              obj: function () {
                return obj;
                
              }
            }
            
        });
        
        
    };
    
    

  $scope.getData = function(primary_key){
    
   
    $scope.data = {
        "primary_key": 4,
        "date_start": "2013-12-15T23:00:00.000Z",
        "date_end": "2013-12-19T23:00:00.000Z",
        "time_start": 32400000,
        "time_end": 59400000,
        "text": "Shipment Flash Barandov #130358-01 einchecken",
        "is_processing": false,
        "processing_user": "",
        "is_completed": true,
        "completed_date": "2014-01-14T23:00:00.000Z",
        "completed_time": 40076000,
        "completed_user": "Antje Lommatzsch",
        "secondary_key": 0,
        "secondary_type": 0,
        "is_all_users": false,
        "contact_name": "Black Box Music Veranstaltungstechnik GmbH",
        "contact_pk": 0,
        "contact": {
            "primary_key": 28,
            "customer_no": 80016,
            "supplier_no": 70015,
            "name": "Black Box Music Veranstaltungstechnik GmbH",
            "name1": "Black Box Music Veranstaltungstechnik GmbH",
            "name2": "",
            "name3": "",
            "matchcode": "BBM",
            "salutation": "",
            "grade": "",
            "is_interested": false,
            "is_client": true,
            "is_supplier": true,
            "is_location": true,
            "is_vip": false,
            "is_colleague": false,
            "_ref_contact": "contact/28"
        },
        "participant": [{
            "primary_key": 4,
            "user_id": 13,
            "user_name": "Admin"
        }],
        "_participant_length": 1,
        "is_start_date": true,
        "is_end_date": true
    };

}





  ////////////////////////////////////////////////////
  
  if ($routeParams.taskID != undefined ){
      
      $scope.getData($routeParams.taskID);
      
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (localStorage.globalSearch!="" ) {
    $scope.searchFilters.searchText = localStorage.globalSearch;
    $scope.autocomplete.showXbutton = true;
    }

    if ($routeParams.filter_days != undefined ) {
        $scope.daysFilter=true;
        $scope.searchFilters.days = $routeParams.filter_days;
    }

  ////////////////////////////////////////////////////////////////////////////////


/////focus searchbox//////
focus("ac_value");
/////focus searchbox//////

//////////////////////////////
services.tools.fixHeader();
//////////////////////////////
    
}]);//themos
    