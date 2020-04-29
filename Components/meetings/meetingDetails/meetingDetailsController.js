
//app.controller('meetingDetailsController',['$scope','$rootScope','$routeParams','$window','$timeout','$filter','$uibModal','$location','$confirm','services',function($scope, $rootScope,$routeParams,$window,$timeout,$filter,$uibModal,$location,$confirm,services){
app.controller('meetingDetailsController',['$scope','$routeParams','$uibModal','$confirm','services','focus',function($scope,$routeParams,$uibModal,$confirm,services,focus){

    
    ////////////////////////////////////////
    var searchArrayString = 'meetings';
    $scope.module = searchArrayString;

    

   // console.log("$scope.searchArray=");
   // console.dir($scope.searchArray);

     $scope.autocomplete = {
 
         getSelectedValue : function(selected){ //value from  autocomplete list when selected
             if (selected) {
                 var searchText = selected.title;
                 $scope.searchFilters.searchText = searchText;
                
                 services.searchNavigate.meetings($scope.searchFilters,$scope.daysFilter);

             }
         },
 
         getTextValue : function(){ // value from autocomplete text box when submit
             var searchText = angular.element('#ac_value')[0].value;
             services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,searchArrayString);
             
             $scope.searchFilters.searchText = searchText;

             services.searchNavigate.meetings($scope.searchFilters,$scope.daysFilter);
			 
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
           // console.log("localStorage.globalSearch=",localStorage.globalSearch);
             
         },
 
         showXbutton:false
 
     }
     
 /////////////////////////////////////////
 


$scope.daysFilter = false;
$scope.searchFilters = {
    
    searchText:"",
    days:0
  }
    
  $scope.openModalParticipant = function (obj) {
      
        var array_temp = [];
        

        console.log("participants")
        console.dir(obj.participant);

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
        "primary_key": 7,
        "date_start": "2016-06-30T22:00:00.000Z",
        "date_end": "2016-06-30T22:00:00.000Z",
        "time_start": 54000000,
        "time_end": 57900000,
        "text": "hello world um 15 uhr",
        "notes": "Notizen",
        "contact_name": "Black Box Music Veranstaltungstechnik GmbH",
        "contact_pk": 28,
        "private_user_pk": 0,
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
            "primary_key": 1,
            "user_id": 1,
            "user_name": "Administrator"
        }],
        "_participant_length": 1,
        "is_start_date": true,
        "is_end_date": true,
        "is_private": false
    };

}



    ////////////////////////////////////////////////////

    if ($routeParams.meetingID != undefined){
        
        $scope.getData($routeParams.meetingID);
        
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




