//app.controller('ordersListController',['$scope','$rootScope','$routeParams','$location','$confirm','$uibModal','services','$filter',function($scope, $rootScope,$routeParams,$location,$confirm,$uibModal,services,$filter){
app.controller('ordersListController',['$scope','$routeParams','$uibModal','services','$filter','focus','$confirm',function($scope,$routeParams,$uibModal,services,$filter,focus,$confirm){

    $scope.currentPage = 1;
	$scope.pageSize = 20;
	$scope.sortName = '';

    /*************SORTING*****************************/
    
    
    $scope.sortBy = function(sortName){
		
		$scope.sortName = sortName;
		$scope.sortAsc[sortName] =!$scope.sortAsc[sortName];

        

		var sortString = sortName;

		if (!$scope.sortAsc[sortName]) {
			sortString = "-"+sortName;
		}
		
		$scope.getOrders  = $filter('orderBy')($scope.getOrders, sortString)// z.b name asc, -name desc
   
    }

    $scope.sortAsc = {
		'order_no' :true, //desc, true:asc
        'event':true, //desc,true:asc
        'contact.name':true, //desc,true:asc
        'sum_net':true, //desc,true:asc
    }
    
    /*************SORTING*****************************/

    $scope.openModalSelectDates = function () {
        
          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'Components/Shared/modalSelectDates/index.html',
              controller: 'modalSelectDatesCtrl',
              scope:$scope
          });
          
          
      };
    
     

    ////////////////////////////////////////
    var searchArrayString = 'orders';
	$scope.searchArray = JSON.parse(localStorage.searchItems)[searchArrayString];
    
        $scope.autocomplete = {
    
            getSelectedValue : function(selected){ //value from  autocomplete list when selected
                if (selected) {
                    var searchText = selected.title;

                    $scope.searchFilters.searchText = searchText;
                    services.searchNavigate.orders($scope.searchFilters);
                }
            },
    
            getTextValue : function(){ // value from autocomplete text box when submit
                var searchText = angular.element('#ac_value')[0].value;

             //   console.log("text="+searchText+"--");

                services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,searchArrayString);
                
                $scope.searchFilters.searchText = searchText;
                services.searchNavigate.orders($scope.searchFilters);
            },
            
            inputChanged:function(searchText){
                
                if ($scope.searchFilters) $scope.searchFilters.searchText = searchText;
                
                    if (searchText!="") 
                        $scope.autocomplete.showXbutton = true;
                    
                    else {
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
                
            },
    
            showXbutton:false
    
        }
        
    /////////////////////////////////////////
      
    $scope.searchNavigate = function(searchFilters){
        
        services.searchNavigate.orders(searchFilters);

    }
        
    $scope.getOrdersData = function(searchFilters){
        
        services.common.loading.orders = false;

        var filterStr="";
        
       // console.log("services searchFilters:");
       // console.dir(searchFilters);

        //alert(searchFilters.searchText.length);

        if (searchFilters.searchText.length > 0) filterStr = filterStr + "?ia=f&q="+searchFilters.searchText;

        if (searchFilters.datesSelected) {


            if (searchFilters.dateFrom!="") {
                filterStr = filterStr + "&ds="+services.tools.dateYMDorDMY(searchFilters.dateFrom).replace(/\./g, "-");
               // filterStr = filterStr + "&ts="+services.tools.hoursMinsInMS(searchFilters.timeFrom.split(":")[0],searchFilters.timeFrom.split(":")[1]);
            }

            if (searchFilters.dateTo!="") {
                filterStr = filterStr + "&de="+services.tools.dateYMDorDMY(searchFilters.dateTo).replace(/\./g, "-");
              //  filterStr = filterStr + "&te="+services.tools.hoursMinsInMS(searchFilters.timeTo.split(":")[0],searchFilters.timeFrom.split(":")[1]);
            }

        }
            

        if (searchFilters.isRent) filterStr = filterStr + "&ir=t";
        if (searchFilters.isSell) filterStr = filterStr + "&is=t";

        if (searchFilters.isDispo) filterStr = filterStr + "&dtt=0";
        if (searchFilters.isEvent) filterStr = filterStr + "&dtt=1";

        filterStr = "?"+filterStr.slice(1);


        //filterStr="?q=a&ds=2017-10-30&de=2017-11-03&ts=49740000&te=49740000&ir=t&dtt=null";

       // console.log("query="+filterStr);

        

        $scope.searchArray = JSON.parse(localStorage.searchItems)[searchArrayString];

        $scope.getOrders = [
            {
            "primary_key": 9143,
            "client_id": 2,
            "order_no": 105501,
            "order_no_fmt": "1055-01",
            "order_date": "2018-04-04T22:00:00.000Z",
            "event": "",
            "customer_no": 80115,
            "customer_cp_pk": 0,
            "status": "",
            "is_confirmed": false,
            "all_inclusive": false,
            "is_mrp": true,
            "is_sale": false,
            "sum_net": 0,
            "sum_gro": 0,
            "sum_salestax1": 0,
            "sum_salestax2": 0,
            "amount_uncleared": 6,
            "amount_cleared": 0,
            "amount_open_checkin": 0,
            "amount_checkin": 0,
            "amount_open_checkout": 0,
            "amount_checkout": 0,
            "amount_open_packaging": 0,
            "amount_packaging": 0,
            "amount_open_booked": 0,
            "amount_booked": 0,
            "amount_open_packagingnote": 6,
            "amount_packagingnote": 0,
            "is_rent": true,
            "order_schedule": [{
                "primary_key": 11585,
                "type": 1,
                "name": "Dispo",
                "date_start": "2018-04-08T22:00:00.000Z",
                "date_end": "2018-04-10T22:00:00.000Z",
                "time_start": 32400000,
                "time_end": 64800000,
                "is_start_date": true,
                "is_end_date": true
            }, {
                "primary_key": 11586,
                "type": 7,
                "name": "Event",
                "date_start": "2018-04-08T22:00:00.000Z",
                "date_end": "2018-04-10T22:00:00.000Z",
                "time_start": 32400000,
                "time_end": 64800000,
                "is_start_date": true,
                "is_end_date": true
            }],
            "_ref_order": "order/9143",
            "contact": {
                "primary_key": 200,
                "customer_no": 80115,
                "supplier_no": -200,
                "name": "Sisyphus Touring, Inc FSO Thirty Seconds to Mars Tour",
                "name1": "Sisyphus Touring, Inc",
                "name2": "FSO Thirty Seconds to Mars Tour",
                "name3": "",
                "matchcode": "",
                "salutation": "",
                "grade": "",
                "is_interested": false,
                "is_client": true,
                "is_supplier": false,
                "is_location": false,
                "is_vip": false,
                "is_colleague": false,
                "_ref_contact": "contact/200"
            },
            "contact_person": "",
            "_order_schedule_length": 2,
            "state_billing": "dot_red",
            "state_checkin": "dot_greyoutline",
            "state_checkout": "dot_greyoutline",
            "state_booked": "dot_transparent",
            "state_packagingnote": "dot_red",
            "state_packaging": "dot_transparent",
            "$$hashKey": "object:62"
        }, 
        {
            "primary_key": 9142,
            "client_id": 2,
            "order_no": 105401,
            "order_no_fmt": "1054-01",
            "order_date": "2018-09-03T22:00:00.000Z",
            "event": "dummy",
            "customer_no": 80260,
            "customer_cp_pk": 0,
            "status": "",
            "is_confirmed": true,
            "all_inclusive": false,
            "is_mrp": true,
            "is_sale": false,
            "sum_net": 1440.62,
            "sum_gro": 1584.68,
            "sum_salestax1": 144.06,
            "sum_salestax2": 0,
            "amount_uncleared": 32,
            "amount_cleared": 0,
            "amount_open_checkin": 0,
            "amount_checkin": 0,
            "amount_open_checkout": 0,
            "amount_checkout": 0,
            "amount_open_packaging": 0,
            "amount_packaging": 0,
            "amount_open_booked": 12,
            "amount_booked": 0,
            "amount_open_packagingnote": 24,
            "amount_packagingnote": 0,
            "is_rent": true,
            "order_schedule": [{
                "primary_key": 11581,
                "type": 1,
                "name": "Dispo",
                "date_start": "2017-12-26T23:00:00.000Z",
                "date_end": "2017-12-26T23:00:00.000Z",
                "time_start": 32400000,
                "time_end": 64800000,
                "is_start_date": true,
                "is_end_date": true
            }, {
                "primary_key": 11582,
                "type": 7,
                "name": "Event",
                "date_start": "2017-12-26T23:00:00.000Z",
                "date_end": "2017-12-26T23:00:00.000Z",
                "time_start": 32400000,
                "time_end": 64800000,
                "is_start_date": true,
                "is_end_date": true
            }],
            "_ref_order": "order/9142",
            "contact": {
                "primary_key": 69,
                "customer_no": 80260,
                "supplier_no": 70024,
                "name": "MAGIC FX B.V.",
                "name1": "MAGIC FX B.V.",
                "name2": "",
                "name3": "",
                "matchcode": "",
                "salutation": "",
                "grade": "",
                "is_interested": false,
                "is_client": true,
                "is_supplier": true,
                "is_location": false,
                "is_vip": false,
                "is_colleague": false,
                "_ref_contact": "contact/69"
            },
            "contact_person": "",
            "_order_schedule_length": 2,
            "state_billing": "dot_red",
            "state_checkin": "dot_greyoutline",
            "state_checkout": "dot_greyoutline",
            "state_booked": "dot_red",
            "state_packagingnote": "dot_red",
            "state_packaging": "dot_transparent",
            "$$hashKey": "object:63"
        }];
      

    } 

    $scope.deleteOrder = function(obj){
      
        
        $confirm({text: 'Sind Sie sicher?', title: 'Auftrag löschen', ok: 'Ja', cancel: 'Nein'})
        .then(function() {
          
        services.tools.removeObjectFromArray($scope.getOrders,obj,'primary_key');  
         
        });
  
      }
    
    
    $scope.datesSelector = {
        
        label:"",
        setLabel:function(searchFilters){
            if (searchFilters.datesSelected) {
                if (services.tools.today == searchFilters.dateFrom && services.tools.today == searchFilters.dateTo) this.label="Heute";
                else {

                    this.label = searchFilters.dateFrom + " - " + searchFilters.dateTo;
                    if (searchFilters.dateFrom == "" && searchFilters.dateTo == "") {
                        searchFilters.datesSelected = false;
                        this.label = "Zeitraum wählen";
                        
                    }
                }
            }
            else this.label="Zeitraum wählen";
        }

    } 

    

    $scope.searchFilters = {
        
                searchText:"",
                datesSelected:false,
                dateFrom:services.tools.dateStr(),
                dateTo:services.tools.dateStr(),
                timeFrom:services.tools.timeStr(),
                timeTo:services.tools.timeStr(),
                isRent:false,
                isSell:false,
                isDispo:false,
                isEvent:false,
        
                toggleSellStatus:function(){
                    this.isSell =!this.isSell
                    if (arguments.length == 1) this.isSell = arguments[0];

                        if (this.isSell) {
                            this.isRent = false;
                        }
                    services.searchNavigate.orders($scope.searchFilters);
                },
                toggleRentStatus:function(){
                    this.isRent =!this.isRent
                    if (arguments.length == 1) this.isRent = arguments[0];

                        if (this.isRent) {
                            this.isSell = false;
                        }
                    services.searchNavigate.orders($scope.searchFilters);
                },
                toggleDispoStatus:function(){
                    this.isDispo =!this.isDispo
                    if (arguments.length == 1) this.isDispo = arguments[0];

                        if (this.isDispo) {
                            this.isEvent = false;
                        }
                    services.searchNavigate.orders($scope.searchFilters);
                },
                toggleEventStatus:function(){
                    this.isEvent =!this.isEvent
                    if (arguments.length == 1) this.isEvent = arguments[0];

                        if (this.isEvent) {
                            this.isDispo = false;
                        }
                    services.searchNavigate.orders($scope.searchFilters);
                }
        
            }

 ////////////////////////////////////////////////////////////////////////////////
 if (localStorage.globalSearch!="" && $routeParams.filter_text == undefined) {
    $scope.searchFilters.searchText = localStorage.globalSearch;
    services.searchNavigate.orders($scope.searchFilters);
}
////////////////////////////////////////////////////////////////////////////////
    
        if (Object.keys($routeParams).length >0 ){

                 $scope.searchDone = true;
                // console.dir($routeParams);
        
                if ($routeParams.filter_text != undefined) {
                    ///////////////////
                    localStorage.globalSearch = $routeParams.filter_text;
                    //////////////////
                    $scope.searchFilters.searchText = $routeParams.filter_text;
                    $scope.autocomplete.showXbutton = true; 
                }
                else{
                    $scope.autocomplete.showXbutton = false; 
                }
                
                if ($routeParams.datesSelected != undefined)  $scope.searchFilters.datesSelected = true;
                
                $scope.searchFilters.dateFrom = "";
                if ($routeParams.dateFrom != undefined)  $scope.searchFilters.dateFrom = $routeParams.dateFrom;
                
                $scope.searchFilters.dateTo="";
                if ($routeParams.dateTo != undefined) $scope.searchFilters.dateTo = $routeParams.dateTo;
                
                $scope.searchFilters.timeFrom="";
                if ($routeParams.timeFrom != undefined) $scope.searchFilters.timeFrom = $routeParams.timeFrom;
                
                $scope.searchFilters.timeTo="";
                if ($routeParams.timeTo != undefined) $scope.searchFilters.timeTo = $routeParams.timeTo;
            
                if ($routeParams.orderType1 != undefined){
                    if ($routeParams.orderType1 == "rent") $scope.searchFilters.toggleRentStatus(true); 
                    if ($routeParams.orderType1 == "sell") $scope.searchFilters.toggleSellStatus(true); 
                }
        
                if ($routeParams.orderType2 != undefined){
                    if ($routeParams.orderType2 == "dispo") $scope.searchFilters.toggleDispoStatus(true); 
                    if ($routeParams.orderType2 == "event") $scope.searchFilters.toggleEventStatus(true); 
                }
        
                //console.log("3.searchFilters");
                //console.dir($scope.searchFilters);
                $scope.getOrdersData($scope.searchFilters);

        }  
        else{
            focus("ac_value");
        }  

        $scope.datesSelector.setLabel($scope.searchFilters);


//////////////////////////////
services.tools.fixHeader();
//////////////////////////////

		
	
}]);


