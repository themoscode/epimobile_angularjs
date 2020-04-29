//app.controller('tasksListController',['$scope','$rootScope','$routeParams','$window','$timeout','$filter','services',function($scope, $rootScope,$routeParams,$window,$timeout,$filter,services){

app.controller('tasksListController',['$scope','$routeParams','services','focus','$confirm',function($scope, $routeParams,services,focus,$confirm){

    
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

    services.searchNavigate.tasks($scope.searchFilters,$scope.daysFilter);
   
}

$scope.navigateDetails = function(searchFilters,id){
        
    var url="";

    if ($scope.daysFilter && searchFilters.searchText == "") {
        url='/task/'+id+'/f/days/'+searchFilters.days;
    }

    else if (!$scope.daysFilter && searchFilters.searchText != ""){
        url='/task/'+id+'/f/text/'+searchFilters.searchText;
    }
  
    else if ($scope.daysFilter && searchFilters.searchText != ""){
        url='/task/'+id+'/f/days/'+searchFilters.days+'/text/'+searchFilters.searchText;
    }

    else {
        url='/task/'+id;
    }

    services.tools.navigateTo(url);
}
    //////////////////////////////////////////////////////////////////////////
    var searchArrayString = 'tasks';
    $scope.autocomplete = {
        
                getSelectedValue : function(selected){ //value from  autocomplete list when selected
                    if (selected) {
                        var searchText = selected.title;
        
                        $scope.searchFilters.searchText = searchText;
                        services.searchNavigate.tasks($scope.searchFilters,$scope.daysFilter);
                    }
                },
        
                getTextValue : function(){ // value from autocomplete text box when submit
                  //  console.log("getTextValue");
                    var searchText = angular.element('#ac_value')[0].value;
                    services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,searchArrayString);
                    
                    $scope.searchFilters.searchText = searchText;
                    services.searchNavigate.tasks($scope.searchFilters,$scope.daysFilter);
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

   
    $scope.getTasksData = function(type,searchFilters){//1 days,2 text, 3 days+text
        
        $scope.getTasks = [
            {
                "primary_key": 5,
                "date_start": "2013-12-22T23:00:00.000Z",
                "date_end": "2013-12-22T23:00:00.000Z",
                "time_start": 34200000,
                "time_end": 61200000,
                "text": "BBM 10kg Konfetti packen #130400-01",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2013-12-22T23:00:00.000Z",
                "completed_time": 57890000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:54"
            },
            {
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
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": [
                    {
                        "primary_key": 4,
                        "user_id": 13,
                        "user_name": ""
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:53"
            },
            {
                "primary_key": 6,
                "date_start": "2013-12-26T23:00:00.000Z",
                "date_end": "2013-12-29T23:00:00.000Z",
                "time_start": 34200000,
                "time_end": 39600000,
                "text": "CO2 Anlieferung f. #130378-01 & # 130265-01",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2013-12-29T23:00:00.000Z",
                "completed_time": 36164000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:56"
            },
            {
                "primary_key": 7,
                "date_start": "2013-12-22T23:00:00.000Z",
                "date_end": "2013-12-22T23:00:00.000Z",
                "time_start": 34200000,
                "time_end": 61200000,
                "text": "BMusik #130395-01 nachhaken",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-02T23:00:00.000Z",
                "completed_time": 56695000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:55"
            },
            {
                "primary_key": 8,
                "date_start": "2013-12-26T23:00:00.000Z",
                "date_end": null,
                "time_start": 37800000,
                "time_end": 0,
                "text": "2x Big Blaster #130402-01 (ACHTUNG!!! Kontocheck KBS)",
                "is_processing": true,
                "processing_user": "Antje Lommatzsch",
                "is_completed": true,
                "completed_date": "2013-12-29T23:00:00.000Z",
                "completed_time": 36167000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false,
                "$$hashKey": "object:57"
            },
            {
                "primary_key": 9,
                "date_start": "2013-12-26T23:00:00.000Z",
                "date_end": "2013-12-29T23:00:00.000Z",
                "time_start": 43200000,
                "time_end": 36000000,
                "text": "# 130378-01 CO2 Jets - Wemme packen",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-02T23:00:00.000Z",
                "completed_time": 56682000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:59"
            },
            {
                "primary_key": 10,
                "date_start": "2013-12-26T23:00:00.000Z",
                "date_end": "2013-12-29T23:00:00.000Z",
                "time_start": 43200000,
                "time_end": 36000000,
                "text": "# 130265-01 Slava's BBM packen",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2013-12-29T23:00:00.000Z",
                "completed_time": 46322000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:58"
            },
            {
                "primary_key": 11,
                "date_start": "2014-01-01T23:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Flamebar testen",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-05T23:00:00.000Z",
                "completed_time": 52086000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false,
                "$$hashKey": "object:60"
            },
            {
                "primary_key": 12,
                "date_start": "2014-01-01T23:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Spanngurte checken, wenn Bubble Monster v. B-Musik zurück kommt!",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-02T23:00:00.000Z",
                "completed_time": 41151000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false,
                "$$hashKey": "object:61"
            },
            {
                "primary_key": 13,
                "date_start": "2014-01-06T23:00:00.000Z",
                "date_end": null,
                "time_start": 46800000,
                "time_end": 0,
                "text": "Packen #140004-01 VK Handheld Konfettishooter",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-14T23:00:00.000Z",
                "completed_time": 40080000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false,
                "$$hashKey": "object:64"
            },
            {
                "primary_key": 14,
                "date_start": "2014-01-05T23:00:00.000Z",
                "date_end": "2014-01-07T23:00:00.000Z",
                "time_start": 0,
                "time_end": 61200000,
                "text": "Auftrag #140007-01, Spraymaster packen und via LRT zu 14:00 Uhr ins Tempodrom",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-06T23:00:00.000Z",
                "completed_time": 50240000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:62"
            },
            {
                "primary_key": 16,
                "date_start": "2014-01-08T23:00:00.000Z",
                "date_end": null,
                "time_start": 0,
                "time_end": 0,
                "text": "Abholung #140007-01 aus Tempodrom via LRT ",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-07T23:00:00.000Z",
                "completed_time": 45594000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false,
                "$$hashKey": "object:65"
            },
            {
                "primary_key": 17,
                "date_start": "2014-01-06T23:00:00.000Z",
                "date_end": "2014-01-20T23:00:00.000Z",
                "time_start": 0,
                "time_end": 0,
                "text": "Art# 15308 Preis & Bestand für Stunt Gel anpassen!",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-07T23:00:00.000Z",
                "completed_time": 64941000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:63"
            },
            {
                "primary_key": 19,
                "date_start": "2014-01-14T23:00:00.000Z",
                "date_end": null,
                "time_start": 0,
                "time_end": 0,
                "text": "packen AN #140017-01 (CB/AH)",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-01-19T23:00:00.000Z",
                "completed_time": 40434000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false,
                "$$hashKey": "object:66"
            },
            {
                "primary_key": 20,
                "date_start": "2014-05-02T22:00:00.000Z",
                "date_end": "2014-05-10T22:00:00.000Z",
                "time_start": 32400000,
                "time_end": 82800000,
                "text": "Nachhaken ESC HH",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-05-04T22:00:00.000Z",
                "completed_time": 37810000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": [
                    {
                        "primary_key": 6,
                        "user_id": 13,
                        "user_name": ""
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:69"
            },
            {
                "primary_key": 21,
                "date_start": "2014-05-02T22:00:00.000Z",
                "date_end": "2014-05-10T22:00:00.000Z",
                "time_start": 32400000,
                "time_end": 82800000,
                "text": "LH-Batterien Galaxis",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-05-19T22:00:00.000Z",
                "completed_time": 64004000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": [
                    {
                        "primary_key": 5,
                        "user_id": 13,
                        "user_name": ""
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:68"
            },
            {
                "primary_key": 22,
                "date_start": "2014-05-02T22:00:00.000Z",
                "date_end": "2014-05-10T22:00:00.000Z",
                "time_start": 32400000,
                "time_end": 82800000,
                "text": "EVO Label",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-05-19T22:00:00.000Z",
                "completed_time": 64001000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": [
                    {
                        "primary_key": 7,
                        "user_id": 13,
                        "user_name": ""
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:67"
            },
            {
                "primary_key": 23,
                "date_start": "2014-05-02T22:00:00.000Z",
                "date_end": "2014-05-10T22:00:00.000Z",
                "time_start": 32400000,
                "time_end": 82800000,
                "text": "packen & vorbereiten/ programmieren ESC",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2014-05-12T22:00:00.000Z",
                "completed_time": 38843000,
                "completed_user": "Antje Lommatzsch",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": [
                    {
                        "primary_key": 8,
                        "user_id": 13,
                        "user_name": ""
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": true,
                "$$hashKey": "object:70"
            },
            {
                "primary_key": 24,
                "date_start": "2015-05-04T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Transport am 8.5. organiesieren",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-05-06T22:00:00.000Z",
                "completed_time": 64244000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1389,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Dreinull agentur für mediatainment GmbH & Co.KG",
                "contact_pk": 178,
                "contact": {
                    "primary_key": 178,
                    "customer_no": 80107,
                    "supplier_no": -178,
                    "name": "Dreinull agentur für mediatainment GmbH & Co.KG",
                    "name1": "Dreinull agentur für mediatainment GmbH & Co.KG",
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
                    "_ref_contact": "contact/178"
                },
                "participant": [
                    {
                        "primary_key": 9,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": false,
                "$$hashKey": "object:71"
            },
            {
                "primary_key": 25,
                "date_start": "2015-06-03T22:00:00.000Z",
                "date_end": null,
                "time_start": 0,
                "time_end": 0,
                "text": "Nachfragen",
                "is_processing": true,
                "processing_user": "Giorgina Sini",
                "is_completed": true,
                "completed_date": "2015-06-07T22:00:00.000Z",
                "completed_time": 40027000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1476,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "satis&fy AG Werne Live Entertainment & Touring Support",
                "contact_pk": 59,
                "contact": {
                    "primary_key": 59,
                    "customer_no": 80037,
                    "supplier_no": -59,
                    "name": "satis&fy AG Werne Live Entertainment & Touring Support",
                    "name1": "satis&fy AG Werne",
                    "name2": "Live Entertainment & Touring Support",
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
                    "_ref_contact": "contact/59"
                },
                "participant": [
                    {
                        "primary_key": 10,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    },
                    {
                        "primary_key": 11,
                        "user_id": 24,
                        "user_name": "Irina Chekerov"
                    }
                ],
                "_participant_length": 2,
                "is_start_date": true,
                "is_end_date": false,
                "$$hashKey": "object:72"
            },
            {
                "primary_key": 26,
                "date_start": "2015-06-03T22:00:00.000Z",
                "date_end": null,
                "time_start": 57600000,
                "time_end": 0,
                "text": "Zusatz ausbuchen ",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-06-03T22:00:00.000Z",
                "completed_time": 58965000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1464,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Landstreicher Booking GmbH",
                "contact_pk": 119,
                "contact": {
                    "primary_key": 119,
                    "customer_no": 80086,
                    "supplier_no": -119,
                    "name": "Landstreicher Booking GmbH",
                    "name1": "Landstreicher Booking GmbH",
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
                    "_ref_contact": "contact/119"
                },
                "participant": [
                    {
                        "primary_key": 12,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 27,
                "date_start": "2015-06-04T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "packen, Lieferschein schon im Lager",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-06-11T22:00:00.000Z",
                "completed_time": 38025000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1501,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "BMusik Veranstaltungstechnik GmbH & Co. KG",
                "contact_pk": 58,
                "contact": {
                    "primary_key": 58,
                    "customer_no": 80036,
                    "supplier_no": -58,
                    "name": "BMusik Veranstaltungstechnik GmbH & Co. KG",
                    "name1": "BMusik Veranstaltungstechnik GmbH & Co. KG",
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
                    "_ref_contact": "contact/58"
                },
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 28,
                "date_start": "2015-06-04T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "packen & lieferschein drucken, Safeties nicht vergessen",
                "is_processing": true,
                "processing_user": "Giorgina Sini",
                "is_completed": true,
                "completed_date": "2015-06-04T22:00:00.000Z",
                "completed_time": 51429000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1503,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Black Box Music Veranstaltungstechnik GmbH",
                "contact_pk": 28,
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
                "participant": [
                    {
                        "primary_key": 13,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    },
                    {
                        "primary_key": 14,
                        "user_id": 24,
                        "user_name": "Irina Chekerov"
                    }
                ],
                "_participant_length": 2,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 29,
                "date_start": "2015-06-08T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Unterlagen an Alex mit Erlaubnis",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-06-09T22:00:00.000Z",
                "completed_time": 65075000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1242,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "SportPlus GmbH",
                "contact_pk": 132,
                "contact": {
                    "primary_key": 132,
                    "customer_no": 80095,
                    "supplier_no": -132,
                    "name": "SportPlus GmbH",
                    "name1": "SportPlus GmbH",
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
                    "_ref_contact": "contact/132"
                },
                "participant": [
                    {
                        "primary_key": 15,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 30,
                "date_start": "2015-06-08T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Unterlagen an Franz mit Erlaubnis",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-06-11T22:00:00.000Z",
                "completed_time": 38017000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1362,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Black Box Music Veranstaltungstechnik GmbH",
                "contact_pk": 28,
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
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 31,
                "date_start": "2015-06-07T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Nachfragen",
                "is_processing": true,
                "processing_user": "Giorgina Sini",
                "is_completed": true,
                "completed_date": "2015-06-09T22:00:00.000Z",
                "completed_time": 65070000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1465,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Deko-Service Lenzen GmbH",
                "contact_pk": 634,
                "contact": {
                    "primary_key": 634,
                    "customer_no": 80300,
                    "supplier_no": -634,
                    "name": "Deko-Service Lenzen GmbH",
                    "name1": "Deko-Service Lenzen GmbH",
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
                    "_ref_contact": "contact/634"
                },
                "participant": [
                    {
                        "primary_key": 16,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    },
                    {
                        "primary_key": 17,
                        "user_id": 24,
                        "user_name": "Irina Chekerov"
                    }
                ],
                "_participant_length": 2,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 32,
                "date_start": "2015-06-07T22:00:00.000Z",
                "date_end": null,
                "time_start": 0,
                "time_end": 0,
                "text": "Nachfragen bzw. Co2 bestellen wenn bestätigt",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-06-07T22:00:00.000Z",
                "completed_time": 40754000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1487,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Ambion GmbH",
                "contact_pk": 654,
                "contact": {
                    "primary_key": 654,
                    "customer_no": 80306,
                    "supplier_no": -654,
                    "name": "Ambion GmbH",
                    "name1": "Ambion GmbH",
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
                    "_ref_contact": "contact/654"
                },
                "participant": [
                    {
                        "primary_key": 18,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    },
                    {
                        "primary_key": 19,
                        "user_id": 24,
                        "user_name": "Irina Chekerov"
                    }
                ],
                "_participant_length": 2,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 33,
                "date_start": "2015-06-21T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Nachfragen",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-06-24T22:00:00.000Z",
                "completed_time": 42634000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1478,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Ostalb PA GmbH",
                "contact_pk": 639,
                "contact": {
                    "primary_key": 639,
                    "customer_no": 80305,
                    "supplier_no": -639,
                    "name": "Ostalb PA GmbH",
                    "name1": "Ostalb PA GmbH",
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
                    "_ref_contact": "contact/639"
                },
                "participant": [
                    {
                        "primary_key": 20,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    },
                    {
                        "primary_key": 21,
                        "user_id": 24,
                        "user_name": "Irina Chekerov"
                    }
                ],
                "_participant_length": 2,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 34,
                "date_start": "2015-06-17T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Unterlagen an Emma übergeben",
                "is_processing": false,
                "processing_user": "",
                "is_completed": false,
                "completed_date": "0000-00-00T00:00:00.000Z",
                "completed_time": 0,
                "completed_user": "",
                "secondary_key": 1467,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Black Box Music Veranstaltungstechnik GmbH",
                "contact_pk": 28,
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
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 35,
                "date_start": "2015-07-22T22:00:00.000Z",
                "date_end": null,
                "time_start": 37800000,
                "time_end": 0,
                "text": "Kaeser Kompressor zu wenig-> mit Peisker geklärt?",
                "is_processing": false,
                "processing_user": "",
                "is_completed": false,
                "completed_date": "0000-00-00T00:00:00.000Z",
                "completed_time": 0,
                "completed_user": "",
                "secondary_key": 1318,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Stereo Propaganda GmbH",
                "contact_pk": 41,
                "contact": {
                    "primary_key": 41,
                    "customer_no": 80020,
                    "supplier_no": -41,
                    "name": "Stereo Propaganda GmbH",
                    "name1": "Stereo Propaganda GmbH",
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
                    "_ref_contact": "contact/41"
                },
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 36,
                "date_start": "2015-08-09T22:00:00.000Z",
                "date_end": "2015-08-09T22:00:00.000Z",
                "time_start": 36000000,
                "time_end": 0,
                "text": "Nachfragen ",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-08-09T22:00:00.000Z",
                "completed_time": 38606000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1571,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Falko Wemme - WEMME Events",
                "contact_pk": 64,
                "contact": {
                    "primary_key": 64,
                    "customer_no": 80040,
                    "supplier_no": -64,
                    "name": "WEMME Events GmbH",
                    "name1": "WEMME Events GmbH",
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
                    "_ref_contact": "contact/64"
                },
                "participant": [
                    {
                        "primary_key": 22,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    },
                    {
                        "primary_key": 23,
                        "user_id": 24,
                        "user_name": "Irina Chekerov"
                    }
                ],
                "_participant_length": 2,
                "is_start_date": true,
                "is_end_date": true
            },
            {
                "primary_key": 37,
                "date_start": "2015-08-11T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Nachfragen",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-08-11T22:00:00.000Z",
                "completed_time": 50710000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1604,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "BEvent Crew GmbH & Co. KG",
                "contact_pk": 225,
                "contact": {
                    "primary_key": 225,
                    "customer_no": 80126,
                    "supplier_no": -225,
                    "name": "BEvent Crew GmbH & Co. KG",
                    "name1": "BEvent Crew GmbH & Co. KG",
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
                    "_ref_contact": "contact/225"
                },
                "participant": [
                    {
                        "primary_key": 24,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    },
                    {
                        "primary_key": 25,
                        "user_id": 24,
                        "user_name": "Irina Chekerov"
                    }
                ],
                "_participant_length": 2,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 38,
                "date_start": "2015-08-17T22:00:00.000Z",
                "date_end": null,
                "time_start": 36000000,
                "time_end": 0,
                "text": "Nachfragen",
                "is_processing": false,
                "processing_user": "",
                "is_completed": true,
                "completed_date": "2015-08-18T22:00:00.000Z",
                "completed_time": 56468000,
                "completed_user": "Giorgina Sini",
                "secondary_key": 1599,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Schiffini GmbH & Co. KG",
                "contact_pk": 725,
                "contact": {
                    "primary_key": 725,
                    "customer_no": 80335,
                    "supplier_no": -725,
                    "name": "Schiffini GmbH & Co. KG",
                    "name1": "Schiffini GmbH & Co. KG",
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
                    "_ref_contact": "contact/725"
                },
                "participant": [
                    {
                        "primary_key": 26,
                        "user_id": 18,
                        "user_name": "Giorgina Sini"
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 40,
                "date_start": "2015-08-12T22:00:00.000Z",
                "date_end": null,
                "time_start": 0,
                "time_end": 0,
                "text": "Nachfragen",
                "is_processing": false,
                "processing_user": "",
                "is_completed": false,
                "completed_date": "0000-00-00T00:00:00.000Z",
                "completed_time": 0,
                "completed_user": "",
                "secondary_key": 1566,
                "secondary_type": 1,
                "is_all_users": false,
                "contact_name": "Frank Kotte PAPYROS - kreative pyrotechnik",
                "contact_pk": 90,
                "contact": {
                    "primary_key": 90,
                    "customer_no": 80062,
                    "supplier_no": 70319,
                    "name": "Frank Kotte PAPYROS - kreative pyrotechnik",
                    "name1": "Frank Kotte",
                    "name2": "PAPYROS - kreative pyrotechnik",
                    "name3": "",
                    "matchcode": "FK I",
                    "salutation": "",
                    "grade": "",
                    "is_interested": false,
                    "is_client": true,
                    "is_supplier": true,
                    "is_location": false,
                    "is_vip": false,
                    "is_colleague": true,
                    "_ref_contact": "contact/90"
                },
                "participant": "",
                "_participant_length": 0,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 42,
                "date_start": "2017-12-31T23:00:00.000Z",
                "date_end": "2000-02-01T23:00:00.000Z",
                "time_start": 43200000,
                "time_end": 50400000,
                "text": "TASK1",
                "is_processing": false,
                "processing_user": "",
                "is_completed": false,
                "completed_date": "0000-00-00T00:00:00.000Z",
                "completed_time": 0,
                "completed_user": "",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "1 & 1 Internet AG",
                "contact_pk": 460,
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
                "participant": [
                    {
                        "primary_key": 34,
                        "user_id": 1,
                        "user_name": "Administrator"
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": true
            },
            {
                "primary_key": 43,
                "date_start": "2017-12-31T23:00:00.000Z",
                "date_end": null,
                "time_start": 0,
                "time_end": 0,
                "text": "task2",
                "is_processing": false,
                "processing_user": "",
                "is_completed": false,
                "completed_date": "0000-00-00T00:00:00.000Z",
                "completed_time": 0,
                "completed_user": "",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": [
                    {
                        "primary_key": 35,
                        "user_id": 1,
                        "user_name": "Administrator"
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 44,
                "date_start": "2017-12-31T23:00:00.000Z",
                "date_end": null,
                "time_start": 0,
                "time_end": 0,
                "text": "task3",
                "is_processing": false,
                "processing_user": "",
                "is_completed": false,
                "completed_date": "0000-00-00T00:00:00.000Z",
                "completed_time": 0,
                "completed_user": "",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "",
                "contact_pk": 0,
                "contact": "",
                "participant": [
                    {
                        "primary_key": 36,
                        "user_id": 1,
                        "user_name": "Administrator"
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": false
            },
            {
                "primary_key": 45,
                "date_start": "2017-12-31T23:00:00.000Z",
                "date_end": "2017-12-31T23:00:00.000Z",
                "time_start": 3600000,
                "time_end": 7200000,
                "text": "my task!",
                "is_processing": false,
                "processing_user": "",
                "is_completed": false,
                "completed_date": "0000-00-00T00:00:00.000Z",
                "completed_time": 0,
                "completed_user": "",
                "secondary_key": 0,
                "secondary_type": 0,
                "is_all_users": false,
                "contact_name": "30 seconds to Mars",
                "contact_pk": 198,
                "contact": {
                    "primary_key": 198,
                    "customer_no": 80114,
                    "supplier_no": -198,
                    "name": "30 seconds to Mars",
                    "name1": "30 seconds to Mars",
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
                    "_ref_contact": "contact/198"
                },
                "participant": [
                    {
                        "primary_key": 37,
                        "user_id": 1,
                        "user_name": "Administrator"
                    }
                ],
                "_participant_length": 1,
                "is_start_date": true,
                "is_end_date": true
            }
        ];
       
    }

    $scope.deleteTask = function(obj){
      
        
        $confirm({text: 'Sind Sie sicher?', title: 'Aufgabe löschen', ok: 'Ja', cancel: 'Nein'})
        .then(function() {
          
        services.tools.removeObjectFromArray($scope.getTasks,obj,'primary_key');  
        
           
        
        });
  
      } 

////////////////////////////////////////////////////////////////////////////////
   if (localStorage.globalSearch!="" && $routeParams.filter_text == undefined) {
        $scope.searchFilters.searchText = localStorage.globalSearch;
        services.searchNavigate.tasks($scope.searchFilters,$scope.daysFilter);
    }
////////////////////////////////////////////////////////////////////////////////

    if ($routeParams.filter_days != undefined && $routeParams.filter_text == undefined){
        
        $scope.daysFilter=true;
        $scope.searchFilters.days = $routeParams.filter_days;
        $scope.getTasksData(1,$scope.searchFilters);
        
    }

    else if ($routeParams.filter_days == undefined && $routeParams.filter_text != undefined){
        
        $scope.searchDone = true;
        $scope.daysFilter=false;
        
        $scope.autocomplete.showXbutton = true; 
        ///////////////////
        localStorage.globalSearch = $routeParams.filter_text;
        //////////////////
        $scope.searchFilters.searchText = $routeParams.filter_text;
        $scope.getTasksData(2,$scope.searchFilters);
        
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
        $scope.getTasksData(3,$scope.searchFilters);
        
    }

    else if ($routeParams.filter_days == undefined && $routeParams.filter_text == undefined){
        
        $scope.daysFilter=false;
        focus("ac_value");
        
    }
    
//////////////////////////////
services.tools.fixHeader();
//////////////////////////////

}]);