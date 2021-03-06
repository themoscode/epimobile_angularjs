//app.controller('meetingsListController', [ '$scope','$rootScope','$http','$location','services','$routeParams',function ($scope, $rootScope, $http, $location, services,$routeParams) {
app.controller('meetingsListController', [ '$scope','services','$routeParams','focus','$confirm',function ($scope, services,$routeParams,focus,$confirm) {
  
    

    $scope.currentPage = 1;
    $scope.pageSize = 20;
    //$scope.dailyDropMode = false;
    $scope.daysFilter = true;
    $scope.days = 0;
    
   
    $scope.searchFilters = {
        
        searchText:"",
        days:0
        
    }    

    $scope.setDays = function(x){
        if (x == "inc") {
            $scope.searchFilters.days++;
            $scope.daysFilter=true;
        }
        if (x == "dec") {
            $scope.searchFilters.days--; 
            $scope.daysFilter=true;
        }
        if (x == "reset" ) {
            if ($scope.searchFilters.days == 0) {
                $scope.daysFilter = !$scope.daysFilter; 
            }
            else {
                $scope.daysFilter=true;
            }
            $scope.searchFilters.days = 0;
        }

        services.searchNavigate.meetings($scope.searchFilters,$scope.daysFilter);
       
    }

    $scope.navigateDetails = function(searchFilters,id){
        
        var url="";

        if ($scope.daysFilter && searchFilters.searchText == "") {
            url='/meeting/'+id+'/f/days/'+searchFilters.days;
        }

        else if (!$scope.daysFilter && searchFilters.searchText != ""){
            url='/meeting/'+id+'/f/text/'+searchFilters.searchText;
        }
      //  /meetings/days/:filter_days/text/:filter_text
        else if ($scope.daysFilter && searchFilters.searchText != ""){
            url='/meeting/'+id+'/f/days/'+searchFilters.days+'/text/'+searchFilters.searchText;
        }

        else {
            url='/meeting/'+id;
        }

        services.tools.navigateTo(url);
    }

    

    //////////////////////////////////////////////////////////////////////////
    var searchArrayString = 'meetings';
    $scope.autocomplete = {
        
                getSelectedValue : function(selected){ //value from  autocomplete list when selected
                    if (selected) {
                        var searchText = selected.title;
        
                        $scope.searchFilters.searchText = searchText;
                        services.searchNavigate.meetings($scope.searchFilters,$scope.daysFilter);
                    }
                },
        
                getTextValue : function(){ // value from autocomplete text box when submit
                  //  console.log("getTextValue");
                    var searchText = angular.element('#ac_value')[0].value;
                    services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,searchArrayString);
                    
                    $scope.searchFilters.searchText = searchText;
                    services.searchNavigate.meetings($scope.searchFilters,$scope.daysFilter);
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
    /////////////////////////////////////////////////////////////////////////

   
    $scope.getMeetingsData = function(type,searchFilters){//1 days,2 text, 3 days+text
        
        $scope.getMeetings = [{
            "primary_key": 8,
            "date_start": "2016-06-30T22:00:00.000Z",
            "date_end": "2016-06-30T22:00:00.000Z",
            "time_start": 61200000,
            "time_end": 63900000,
            "text": "hello world privat",
            "notes": "",
            "contact_name": "",
            "contact_pk": 0,
            "private_user_pk": 1,
            "contact": "",
            "participant": [{
                "primary_key": 14,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": true,
            "$$hashKey": "object:54"
        }, {
            "primary_key": 7,
            "date_start": "2016-06-30T22:00:00.000Z",
            "date_end": "2016-06-30T22:00:00.000Z",
            "time_start": 54000000,
            "time_end": 57900000,
            "text": "hello world um 15 uhr",
            "notes": "",
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
                "primary_key": 13,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:53"
        }, {
            "primary_key": 26,
            "date_start": "2017-11-30T23:00:00.000Z",
            "date_end": "2017-11-30T23:00:00.000Z",
            "time_start": 55800000,
            "time_end": 59700000,
            "text": "test2.2",
            "notes": "test2.2 notes",
            "contact_name": "1 & 1 Internet AG",
            "contact_pk": 460,
            "private_user_pk": 0,
            "contact": {
                "primary_key": 460,
                "customer_no": 80415,
                "supplier_no": 70191,
                "name": "1 & 1 Internet AG",
                "name1": "1 & 1 Internet AG",
                "name2": "",
                "name3": "",
                "matchcode": "",
                "salutation": "Ms.",
                "grade": "Dr.",
                "is_interested": false,
                "is_client": true,
                "is_supplier": true,
                "is_location": false,
                "is_vip": true,
                "is_colleague": false,
                "_ref_contact": "contact/460"
            },
            "participant": [{
                "primary_key": 46,
                "user_id": 1,
                "user_name": "Administrator"
            }, {
                "primary_key": 49,
                "user_id": 14,
                "user_name": "Alexander Hammel"
            }, {
                "primary_key": 50,
                "user_id": 9,
                "user_name": "Christoph Buschor"
            }, {
                "primary_key": 51,
                "user_id": 4,
                "user_name": "Designer"
            }, {
                "primary_key": 52,
                "user_id": 22,
                "user_name": "Franz Kotte"
            }, {
                "primary_key": 53,
                "user_id": 18,
                "user_name": "Giorgina Sini"
            }, {
                "primary_key": 54,
                "user_id": 24,
                "user_name": "Irina Chekerov"
            }, {
                "primary_key": 55,
                "user_id": 29,
                "user_name": "Javier Krawietz Rodriguez"
            }],
            "_participant_length": 8,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:56"
        }, {
            "primary_key": 20,
            "date_start": "2017-01-03T23:00:00.000Z",
            "date_end": "2017-01-03T23:00:00.000Z",
            "time_start": 43200000,
            "time_end": 47400000,
            "text": "as",
            "notes": "",
            "contact_name": "",
            "contact_pk": 0,
            "private_user_pk": 0,
            "contact": "",
            "participant": [{
                "primary_key": 34,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:55"
        }, {
            "primary_key": 32,
            "date_start": "2017-12-21T23:00:00.000Z",
            "date_end": "2017-12-21T23:00:00.000Z",
            "time_start": 51600000,
            "time_end": 56100000,
            "text": "termin1",
            "notes": "notizen bla",
            "contact_name": "17 Hippies Vert. Prod. GmbH",
            "contact_pk": 865,
            "private_user_pk": 0,
            "contact": {
                "primary_key": 865,
                "customer_no": 80384,
                "supplier_no": -865,
                "name": "17 Hippies Vert. Prod. GmbH",
                "name1": "17 Hippies Vert. Prod. GmbH",
                "name2": "",
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
                "_ref_contact": "contact/865"
            },
            "participant": [{
                "primary_key": 65,
                "user_id": 1,
                "user_name": "Administrator"
            }, {
                "primary_key": 66,
                "user_id": 22,
                "user_name": "Franz Kotte"
            }, {
                "primary_key": 67,
                "user_id": 24,
                "user_name": "Irina Chekerov"
            }, {
                "primary_key": 68,
                "user_id": 3,
                "user_name": "Katja Born-Sabottka"
            }, {
                "primary_key": 69,
                "user_id": 30,
                "user_name": "maggie"
            }],
            "_participant_length": 5,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:57"
        }, {
            "primary_key": 42,
            "date_start": "2018-04-04T22:00:00.000Z",
            "date_end": "2018-04-04T22:00:00.000Z",
            "time_start": 25800000,
            "time_end": 32400000,
            "text": "bane",
            "notes": "hello\rmorgen",
            "contact_name": "",
            "contact_pk": 0,
            "private_user_pk": 0,
            "contact": "",
            "participant": [{
                "primary_key": 84,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:58"
        }, {
            "primary_key": 44,
            "date_start": "2018-05-02T22:00:00.000Z",
            "date_end": "2018-05-02T22:00:00.000Z",
            "time_start": 36000000,
            "time_end": 43200000,
            "text": "Nach Hause gehen, aber vorher arbeiten",
            "notes": "",
            "contact_name": "",
            "contact_pk": 0,
            "private_user_pk": 0,
            "contact": "",
            "participant": [{
                "primary_key": 95,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:62"
        }, {
            "primary_key": 45,
            "date_start": "2018-05-03T22:00:00.000Z",
            "date_end": "2018-05-03T22:00:00.000Z",
            "time_start": 54000000,
            "time_end": 61200000,
            "text": "laber laber suelz",
            "notes": "",
            "contact_name": "",
            "contact_pk": 0,
            "private_user_pk": 0,
            "contact": "",
            "participant": [{
                "primary_key": 96,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:64"
        }, {
            "primary_key": 46,
            "date_start": "2018-05-02T22:00:00.000Z",
            "date_end": "2018-05-02T22:00:00.000Z",
            "time_start": 72000000,
            "time_end": 75600000,
            "text": "Ich muss weg",
            "notes": "",
            "contact_name": "Disturbed Touring Inc. c/o Boulevard Management",
            "contact_pk": 828,
            "private_user_pk": 0,
            "contact": {
                "primary_key": 828,
                "customer_no": 80370,
                "supplier_no": -828,
                "name": "Disturbed Touring Inc. c/o Boulevard Management",
                "name1": "Disturbed Touring Inc.",
                "name2": "c/o Boulevard Management",
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
                "_ref_contact": "contact/828"
            },
            "participant": [{
                "primary_key": 97,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:63"
        }, {
            "primary_key": 49,
            "date_start": "2018-05-01T22:00:00.000Z",
            "date_end": "2018-05-01T22:00:00.000Z",
            "time_start": 46800000,
            "time_end": 50400000,
            "text": "13 Uhr - ich brauch ein Bier",
            "notes": "",
            "contact_name": "",
            "contact_pk": 0,
            "private_user_pk": 0,
            "contact": "",
            "participant": [{
                "primary_key": 100,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:60"
        }, {
            "primary_key": 50,
            "date_start": "2018-05-01T22:00:00.000Z",
            "date_end": "2018-05-01T22:00:00.000Z",
            "time_start": 54000000,
            "time_end": 57600000,
            "text": "Noch ein Bier, ähh 15 Uhr",
            "notes": "",
            "contact_name": "",
            "contact_pk": 0,
            "private_user_pk": 0,
            "contact": "",
            "participant": [{
                "primary_key": 101,
                "user_id": 1,
                "user_name": "Administrator"
            }],
            "_participant_length": 1,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:61"
        }, {
            "primary_key": 53,
            "date_start": "2018-04-30T22:00:00.000Z",
            "date_end": "2018-04-30T22:00:00.000Z",
            "time_start": 26400000,
            "time_end": 38400000,
            "text": "another",
            "notes": "",
            "contact_name": "17 Hippies Vert. Prod. GmbH",
            "contact_pk": 865,
            "private_user_pk": 0,
            "contact": {
                "primary_key": 865,
                "customer_no": 80384,
                "supplier_no": -865,
                "name": "17 Hippies Vert. Prod. GmbH",
                "name1": "17 Hippies Vert. Prod. GmbH",
                "name2": "",
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
                "_ref_contact": "contact/865"
            },
            "participant": [{
                "primary_key": 104,
                "user_id": 1,
                "user_name": "Administrator"
            }, {
                "primary_key": 105,
                "user_id": 14,
                "user_name": "Alexander Hammel"
            }],
            "_participant_length": 2,
            "is_start_date": true,
            "is_end_date": true,
            "is_private": false,
            "$$hashKey": "object:59"
        }];
        
    }

    $scope.deleteMeeting = function(obj){
      
        
        $confirm({text: 'Sind Sie sicher?', title: 'Termin löschen', ok: 'Ja', cancel: 'Nein'})
        .then(function() {
          
        services.tools.removeObjectFromArray($scope.getMeetings,obj,'primary_key');  
         
        });
  
      }


  //  $scope.services.tools.dateFrom4d = services.tools.dateFrom4d;
  //  $scope.getHoursMins = services.tools.hoursMins;

////////////////////////////////////////////////////////////////////////////////
   if (localStorage.globalSearch!="" && $routeParams.filter_text == undefined) {
        $scope.searchFilters.searchText = localStorage.globalSearch;
        services.searchNavigate.meetings($scope.searchFilters,$scope.daysFilter);
    }
////////////////////////////////////////////////////////////////////////////////

    if ($routeParams.filter_days != undefined && $routeParams.filter_text == undefined){
        
        $scope.daysFilter=true;
        $scope.searchFilters.days = $routeParams.filter_days;
        $scope.getMeetingsData(1,$scope.searchFilters);
        
    }

    else if ($routeParams.filter_days == undefined && $routeParams.filter_text != undefined){
        
        $scope.searchDone = true;
        $scope.daysFilter=false;
        
        $scope.autocomplete.showXbutton = true; 
        ///////////////////
        localStorage.globalSearch = $routeParams.filter_text;
        //////////////////
        $scope.searchFilters.searchText = $routeParams.filter_text;
        $scope.getMeetingsData(2,$scope.searchFilters);
        
    }

    else if ($routeParams.filter_days != undefined && $routeParams.filter_text != undefined){
        
        $scope.daysFilter=true;
        $scope.searchDone = true;
        $scope.autocomplete.showXbutton = true; 
        
        $scope.searchFilters.days = $routeParams.filter_days;
        ///////////////////
        localStorage.globalSearch = $routeParams.filter_text;
        //////////////////
        $scope.searchFilters.searchText = $routeParams.filter_text;
        $scope.getMeetingsData(3,$scope.searchFilters);
        
    }

    else if ($routeParams.filter_days == undefined && $routeParams.filter_text == undefined){
        
        $scope.daysFilter=false;
        focus("ac_value");
        
    }
    
//////////////////////////////
services.tools.fixHeader();
//////////////////////////////

}]);