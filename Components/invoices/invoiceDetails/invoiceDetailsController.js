//app.controller('invoiceDetailsController',['$scope','$rootScope','$routeParams','$window','$timeout','$filter','$uibModal','services','$confirm',function($scope, $rootScope,$routeParams,$window,$timeout,$filter,$uibModal,services,$confirm){

    app.controller('invoiceDetailsController',['$scope','$routeParams','$filter','$uibModal','services','$confirm','focus',function($scope,$routeParams,$filter,$uibModal,services,$confirm,focus){

    
    $scope.communicationTypes = services.common.types.communication;

    

    ////////////////////////////////////////
    searchArrayString="invoices";
    $scope.module = searchArrayString; 
    
    $scope.searchArray = JSON.parse(localStorage.searchItems)['invoices'];
    
        $scope.autocomplete = {
    
            getSelectedValue : function(selected){ //value from  autocomplete list when selected
                if (selected) {
                    var searchText = selected.title;
                    $scope.searchFilters.searchText = searchText;
                    services.searchNavigate.invoices($scope.searchFilters);
                }
            },
    
            getTextValue : function(){ // value from autocomplete text box when submit
                var searchText = angular.element('#ac_value')[0].value;
                services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,'invoices');
                $scope.searchFilters.searchText = searchText;
			    services.searchNavigate.invoices($scope.searchFilters);
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
                //console.log("localStorage.globalSearch=",localStorage.globalSearch);
                
              },
          
              showXbutton:false
    
    
        }
        
    /////////////////////////////////////////
   

    $scope.searchFilters = {
        
        searchText:""
        
      }
        
    $scope.isRentProduct = true;

    //accordions state
    $scope.acc_group1= {open:true};
    $scope.acc_group2 = {open:false};
    
    $scope.acc_kap_group=[]; //kapitel

    $scope.setProductMode = function(val){
		  $scope.isRentProduct = val; 
    }
    
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

    $scope.openModalSearchProduct = function (e) {
        
        var obj={
          "type":"product_main_list"
        }
    
        if (e){ //prevent from opening accordion
          e.preventDefault();
          e.stopPropagation();
        }
    
        if (arguments.length>1) { //product in Kapitel
    
          obj={
            "type":"product_kapitel",
            "products_array":arguments[1]
          }
        }
    
        console.log("obj",obj);
    
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Components/orders/orderDetails/Widgets/modalSearchProduct/index.html',
            controller: 'modalSearchProductCtrl',
            scope:$scope,
            resolve: {
              obj: function () {
                return obj;
                
              }
            }
            
        });
        
        
    };
    
    $scope.getChapterItems = function(getInvoice){// items in Kapitel in Gesamtliste

        angular.forEach(getInvoice.order_items, function(item, index) {
          
          if (item._type == 5) {

                services.api({
                  method:"GET",
                  data:"",
                  url:localStorage.origin+localStorage.api_version+'/'+item._ref_chapter_items
                  
              }).then(function(result) {
      
                 item.__chapter_items = result.payload;
      
              })


          }
             
      });

      }   





    $scope.getInvoiceData = function(invoiceID){
        
        /*
        services.api({
        method:"GET",
        data:"",
        url:localStorage.origin+localStorage.api_version+'/invoice/'+invoiceID
        }).then(function(result) {

            $scope.getInvoice = result.payload[0];
            $scope.getChapterItems($scope.getInvoice);

            console.log("getInvoice",$scope.getInvoice);
          

            ///
            services.api({
                method:"GET",
                data:"",
                url:localStorage.origin+localStorage.api_version+'/contact/'+$scope.getInvoice.contact.primary_key
                  }).then(function(result) {
          
                  //  console.log("get customer info=");
                  //  console.dir(result);
    
                    $scope.getContact = result.payload[0];

                     //Communication data , delete array elements with uplink=""
                        var index_del = []; //hold indexes to be deleted
            
                        angular.forEach($scope.getContact.communication, function(item, index) {
                            
                            if (item.uplink == "") index_del.push(index);
                               
                        });
            
                          // delete elements that do not have data
                          angular.forEach(index_del.reverse(), function(index) {
                            
                            $scope.getContact.communication.splice(index,1);
                            
                          });
            
                          index_del = [];
                        //  console.log("communication=");
                        // console.dir($scope.getContact.communication);
                        console.log("getContact", $scope.getContact);
          
                  })

              ///

            })

            */

            $scope.getInvoice = {
                "primary_key": 995,
                "client_id": 2,
                "invoice_no": 180001,
                "invoice_date": "2018-04-04T22:00:00.000Z",
                "customer_no": 80264,
                "order_pk": 0,
                "customer_cp_pk": 0,
                "event": "",
                "notes": "",
                "editor": "Administrator",
                "editor_short": "adm",
                "editor_id": 1,
                "sum_net": 10000,
                "sum_gro": 11000,
                "sum_salestax1": 1000,
                "sum_salestax2": 0,
                "sum_discount": 0,
                "sum_rent": 10000,
                "sum_sales": 0,
                "sum_transport": 0,
                "sum_service": 0,
                "sum_insurance": 0,
                "sum_special": 0,
                "sum_bail": 0,
                "status": "",
                "is_booked": false,
                "date_booked": "0000-00-00T00:00:00.000Z",
                "is_cleared": false,
                "is_sale": false,
                "is_rent": true,
                "order_items": [{
                    "primary_key": 51617,
                    "journal_id": 51617,
                    "order_pk": 0,
                    "invoice_pk": 0,
                    "brid": 51617,
                    "bpid": 0,
                    "bid": 51617,
                    "chapter_id": 0,
                    "is_chapter_allincl": false,
                    "chapter_pos_no": 0,
                    "title": "°LFM Nozzle 544.480",
                    "product_no": 15876,
                    "product_pk": 2007,
                    "inventory_no": "",
                    "position_no_str": "1",
                    "_pos_no_intern": 1000,
                    "amount_total": 1,
                    "amount_spare": 0,
                    "amount_external": 0,
                    "warehouse_config": "6(1)",
                    "warehouse_str": "ffp inc(1)",
                    "_type": 0,
                    "unit_product": "pcs",
                    "unit_time": "",
                    "factor": 1,
                    "rental_price": 10000,
                    "discount_percent": 0,
                    "sum_total_net": 10000,
                    "sum_total_gro": 10000,
                    "_ref_materialc_items": "journal/filter/?brid=51617",
                    "_material_length": 1,
                    "_ref_chapter_items": "",
                    "_ref_order": 0,
                    "_ref_invoice": 0,
                    "$$hashKey": "object:408"
                }],
                "order_schedule": [{
                    "primary_key": 11589,
                    "type": 1,
                    "name": "Dispo",
                    "date_start": "2018-04-03T22:00:00.000Z",
                    "date_end": "2018-04-03T22:00:00.000Z",
                    "time_start": 32400000,
                    "time_end": 64800000,
                    "days": 1,
                    "responsible_person": "",
                    "description": "",
                    "position": 1,
                    "is_start_date": true,
                    "is_end_date": true,
                    "$$hashKey": "object:395"
                }, {
                    "primary_key": 11590,
                    "type": 7,
                    "name": "Event",
                    "date_start": "2018-04-03T22:00:00.000Z",
                    "date_end": "2018-04-03T22:00:00.000Z",
                    "time_start": 32400000,
                    "time_end": 64800000,
                    "days": 1,
                    "responsible_person": "",
                    "description": "",
                    "position": 2,
                    "is_start_date": true,
                    "is_end_date": true,
                    "$$hashKey": "object:396"
                }, {
                    "primary_key": 11591,
                    "type": 5,
                    "name": "Aufbau",
                    "date_start": null,
                    "date_end": null,
                    "time_start": 32400000,
                    "time_end": 0,
                    "days": 0,
                    "responsible_person": "",
                    "description": "",
                    "position": 3,
                    "is_start_date": false,
                    "is_end_date": false,
                    "$$hashKey": "object:397"
                }, {
                    "primary_key": 11592,
                    "type": 8,
                    "name": "Abbau",
                    "date_start": null,
                    "date_end": null,
                    "time_start": 0,
                    "time_end": 64800000,
                    "days": 0,
                    "responsible_person": "",
                    "description": "",
                    "position": 4,
                    "is_start_date": false,
                    "is_end_date": false,
                    "$$hashKey": "object:398"
                }],
                "contact": {
                    "primary_key": 525,
                    "customer_no": 80264,
                    "supplier_no": -525,
                    "name": "Bjork Tours Inc. c/o PS Business Management LLC1",
                    "name1": "Bjork Tours Inc.",
                    "name2": "c/o PS Business Management LLC1",
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
                    "_ref_contact": "contact/525"
                },
                "contact_person": "",
                "_ref_order": "order/0",
                "sum_outstanding": 11000,
                "_order_items_length": 1,
                "_order_schedule_length": 4
            };

            $scope.getContact = {
                "primary_key": 460,
                "customer_no": 80415,
                "supplier_no": 70191,
                "is_single_person": true,
                "name": "1 & 1 Internet AG",
                "name1": "1 & 1 Internet AG",
                "name2": "",
                "name3": "",
                "matchcode": "",
                "is_interested": false,
                "is_client": true,
                "is_supplier": true,
                "is_location": false,
                "is_vip": true,
                "is_colleague": false,
                "salutation": "Ms.",
                "grade": "Dr.",
                "notes_positive": "positiv",
                "notes_negative": "negativ",
                "date_of_birth": "0000-00-00T00:00:00",
                "address": {
                    "primary_key": 1064,
                    "postal_code": "56410",
                    "street": "Eigendorfer Str. 57",
                    "city": "Montabaur",
                    "country": "GERMANY",
                    "country_iso3": "DEU",
                    "federal_state": ""
                },
                "communication": [{
                    "primary_key": 6191,
                    "contact_pk": 460,
                    "contact_person_pk": 0,
                    "uplink": "aa@dd.gr",
                    "type": 3,
                    "description": "",
                    "phone_match_number": "",
                    "position": 0,
                    "is_newsletter": false,
                    "is_invoice": false,
                    "$$hashKey": "object:198"
                }, {
                    "primary_key": 6192,
                    "contact_pk": 460,
                    "contact_person_pk": 0,
                    "uplink": "www.ff.gr",
                    "type": 4,
                    "description": "",
                    "phone_match_number": "",
                    "position": 0,
                    "is_newsletter": false,
                    "is_invoice": false,
                    "$$hashKey": "object:201"
                }, {
                    "primary_key": 6193,
                    "contact_pk": 460,
                    "contact_person_pk": 0,
                    "uplink": "12345",
                    "type": 0,
                    "description": "",
                    "phone_match_number": "12345",
                    "position": 0,
                    "is_newsletter": false,
                    "is_invoice": false,
                    "$$hashKey": "object:191"
                }, {
                    "primary_key": 2933,
                    "contact_pk": 460,
                    "contact_person_pk": 0,
                    "uplink": "0721 96 00",
                    "type": 0,
                    "description": "",
                    "phone_match_number": "07219600",
                    "position": 0,
                    "is_newsletter": false,
                    "is_invoice": false,
                    "$$hashKey": "object:192"
                }],
                "_communication_length": 4,
                "contact_person": [{
                    "primary_key": 535,
                    "contact_pk": 460,
                    "name": "george Lucas",
                    "first_name": "george",
                    "last_name": "Lucas",
                    "nickname": "",
                    "position": "Verkäufer",
                    "_ref_contact_person": "cperson/535",
                    "$$hashKey": "object:146"
                }],
                "_contact_person_length": 1,
                "contact_chrono": [{
                    "primary_key": 9,
                    "contact_pk": 460,
                    "contact_person_pk": 535,
                    "keyword": "installation todesstern",
                    "contact_partner": "george Lucas",
                    "date": "2017-12-10T23:00:00.000Z",
                    "time": 64437000,
                    "duration": 26,
                    "com_type": 1,
                    "com_type_str": "Telefon",
                    "uplink": "12345",
                    "_ref_contact_chrono": "cchrono/9",
                    "$$hashKey": "object:152"
                }],
                "_contact_chrono_length": 1,
                "order": "",
                "_order_length": 0,
                "banking_client": {
                    "account_holder": "",
                    "iban": "",
                    "bic": "",
                    "bank_name": "",
                    "account_no": "",
                    "creditworthiness": false,
                    "executed_on": "0000-00-00T00:00:00.000Z",
                    "credit_rating": 0,
                    "employees_count": 0,
                    "company_foundation": "0000-00-00T00:00:00.000Z",
                    "sepa": {
                        "is_active": false,
                        "mandate": "",
                        "date_signature": "0000-00-00T00:00:00.000Z"
                    }
                },
                "banking_supplier": {
                    "account_holder": "1 & 1 Internet AG",
                    "iban": "DE832004000006301485",
                    "bic": "COBADEFFXXX",
                    "bank_name": "Commerzbank",
                    "account_no": ""
                },
                "price_range": {},
                "__image": "./Assets/img/image_128x128.png"
            };

        }

        
        
        $scope.addCommunicationData = function(obj){
            
            $scope.getContact.communication = services.addEntity.communication($scope.getContact.communication,obj);
    
        }  

        $scope.deleteCommunicationData = function(obj){
            
              console.dir(obj);
              //communicationTypes[row.type].title
              $confirm({text: 'Sind Sie sicher?', title: $scope.communicationTypes[obj.type].title+' löschen', ok: 'Ja', cancel: 'Nein'})
              .then(function() {
                
              services.tools.removeObjectFromArray($scope.getContact.communication,obj,'primary_key');  
               
              });
        
        } 
        $scope.addOrderItem = function (obj) {
            
            if (typeof($scope.getInvoice.oder_items) == "string") $scope.getInvoice.oder_items = [];
            
            var array = $scope.getInvoice.order_items;
            if (arguments.length>1) array = arguments[1];



            $scope.acc_group2 = {
                open:true
            };

          var obj_add = {
            "primary_key": obj.primary_key,
            "journal_id": 51616,
            "order_pk": $scope.getInvoice.primary_key,
            "invoice_pk": $scope.getInvoice.primary_key,
            "brid": 51616,
            "bpid": 0,
            "bid": 51616,
            "chapter_id": 0,
            "is_chapter_allincl": false,
            "chapter_pos_no": 0,
            "title": obj.title,
            "product_no": 14458,
            "product_pk": 472,
            "inventory_no": "",
            "position_no_str": "1",
            "_pos_no_intern": 1000,
            "amount_total": obj.amount_total,
            "amount_spare": 0,
            "amount_external": 0,
            "warehouse_config": "6(6)",
            "warehouse_str": "ffp inc(6)",
            "_type": 0,
            "unit_product": "pcs",
            "unit_time": "",
            "factor": 3,
            "rental_price": 0,
            "discount_percent": 0,
            "sum_total_net": obj.sum_total_net,
            "sum_total_gro": 0
                }
                array.push(obj_add);
           }
      ///////////////////////////////////////////////////////////////

      if ($routeParams.invoiceID != undefined){
        
        $scope.getInvoiceData($routeParams.invoiceID);
        
    }
     ////////////////////////////////////////////////////////////////////////////////
     if (localStorage.globalSearch!="" ) {
        $scope.searchFilters.searchText = localStorage.globalSearch;
        $scope.autocomplete.showXbutton = true;
    }


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
    
      if ($routeParams.invoiceType1 != undefined){
          if ($routeParams.invoiceType1 == "rent") $scope.searchFilters.isRent = true; 
          if ($routeParams.invoiceType1 == "sell") $scope.searchFilters.isSell = true;  
      }
    
      if ($routeParams.invoiceType2 != undefined){
          if ($routeParams.invoiceType2 == "dispo") $scope.searchFilters.isDispo = true; 
          if ($routeParams.invoiceType2 == "event") $scope.searchFilters.isEvent = true; 
      }







    ////////////////////////////////////////////////////////////////////////////////

        
/////focus searchbox//////
focus("ac_value");
/////focus searchbox//////        

//////////////////////////////
services.tools.fixHeader();
//////////////////////////////


}]);