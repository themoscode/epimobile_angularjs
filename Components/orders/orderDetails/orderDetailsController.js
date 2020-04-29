//app.controller('orderDetailsController',['$scope','$rootScope','$routeParams','$window','$timeout','$filter','$uibModal','services','$confirm',function($scope, $rootScope,$routeParams,$window,$timeout,$filter,$uibModal,services,$confirm){
  app.controller('orderDetailsController',['$scope','$routeParams','$uibModal','services','$confirm','focus',function($scope,$routeParams,$uibModal,services,$confirm,focus){

  $scope.communicationTypes = services.common.types.communication;

  
    ////////////////////////////////////////
    searchArrayString="orders";
    $scope.module = searchArrayString; 

    $scope.searchArray = JSON.parse(localStorage.searchItems)['orders'];
    
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
                services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,'orders');
                $scope.searchFilters.searchText = searchText;
                services.searchNavigate.orders($scope.searchFilters);
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
  
      $scope.searchFilters = {
          
          searchText:""
          
        }

   

    //accordions state
    $scope.acc_group1= {open:true};
    $scope.acc_group2 = {open:false};
    
    $scope.acc_kap_group=[]; //kapitel

  
    
   $scope.setRentStatus = function(){ //Miete 
      
      $scope.getOrder.is_rent = true;
      $scope.getOrder.is_sale = false;
      
   }

   $scope.setSaleStatus = function(){ //Verkauf
    
      $scope.getOrder.is_sale = true;
      $scope.getOrder.is_rent = false;
      
   }

   $scope.setMrpStatus = function(){

      $scope.getOrder.is_mrp = !$scope.getOrder.is_mrp;

   }

   $scope.setConfirmStatus = function(){

    $scope.getOrder.is_confirmed = !$scope.getOrder.is_confirmed;

 }

   
    $scope.deleteMaterial = function(e){
      
      if (e){ 
        e.preventDefault();
        e.stopPropagation();
      }
      
      $confirm({text: 'Sind Sie sicher?', title: 'Material löschen', ok: 'Ja', cancel: 'Nein'})
      .then(function() {
       
        services.common.openMsgAutoclose("Material wurde gelöscht");
         
      
      });

    }

    $scope.deletePersonnel = function(e){
      
      if (e){ 
        e.preventDefault();
        e.stopPropagation();
      }
      
      $confirm({text: 'Sind Sie sicher?', title: 'Personal löschen', ok: 'Ja', cancel: 'Nein'})
      .then(function() {
       
        services.common.openMsgAutoclose("Personal wurde gelöscht");
         
      
      });

    }

    $scope.openModalSearchContact = function (obj) {
    
      var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'Components/Shared/modalSearchContact/index2.html',
          controller: 'modalSearchContactCtrl2',
          scope:$scope,
          resolve: {
            obj: function () {
              return obj;
              
            }

          }
          
      });
       
  };


  $scope.openModalDeliverPickupAdr = function(obj){
    
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'Components/Shared/modalSearchContact/index2.html',
        controller: 'modalSearchContactCtrl3',
        scope:$scope,
        resolve: {
          obj: function () {
            return obj;
            
          }

        }
        
    });
  }


  $scope.getContactDeliverPickup = function(obj){
    
    /// obj.primary_key = contact primary_kex
    /// obj.type='address_delivery'
    /// or
    /// obj.type='address_pickup'
    /*
    services.api({
      method:"GET",
      data:"",
      url:localStorage.origin+localStorage.api_version+'/contact/'+obj.primary_key
        }).then(function(result) {

          var res = result.payload[0];

          console.log("get contact");
          console.dir(res);

          $scope.getOrder[obj.type].city = res.address.city;
          $scope.getOrder[obj.type].country = res.address.country;
          $scope.getOrder[obj.type].postal_code = res.address.postal_code;
          $scope.getOrder[obj.type].street = res.address.street;
          $scope.getOrder[obj.type].name = res.name;
        })
        */
        

    ///
  }


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

    
    
    $scope.openNewMaterialModal = function (e) {

        if (e){ //prevent from opening accordion
          e.preventDefault();
          e.stopPropagation();
        }

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'Components/orders/orderDetails/Widgets/modalNewMaterial/index.html',
          controller: 'modalNewMaterialCtrl'
          
        });
      
      
      };

      $scope.openMaterialModal = function (id) {
        
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'Components/Shared/modalMaterial/index.html',
          controller: 'modalMaterialCtrl',
          resolve: {
            id: function () {
              return id;
              
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
              backdrop: 'static',
              keyboard: false,
              resolve: {
                obj: function () {
                  return obj;
                  
                }
              }
              
          });
          
          
      };


      



      $scope.openModalPersonnel = function (e) {
          
        if (e){ //prevent from opening accordion
          e.preventDefault();
          e.stopPropagation();
        }

          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'Components/orders/orderDetails/Widgets/modalPersonnel/index.html',
              controller: 'modalPersonnelCtrl'
              
          });
          
          
      };

      $scope.openContactDetailsModal = function () {
        
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Components/contacts/contactDetails/Widgets/modalContactDetails/index.html',
                controller: 'modalContactDetailsCtrl',
                scope:$scope
            });       
        
                
            
    };

        $scope.getOrderPersonal = function(orderID){
          
                  services.api({
                      method:"GET",
                      data:"",
                      url:localStorage.origin+localStorage.api_version+'/techjournal/filter/?opk='+orderID
                  }).then(function(result) {
          
                      $scope.getOrder.__personal = result.payload;
          
                  })
          
        }

        $scope.getOrderRenting = function(orderID){ //Anmietungen
          
                  services.api({
                      method:"GET",
                      data:"",
                      url:localStorage.origin+localStorage.api_version+'/purjournal/filter/?opk='+orderID
                  }).then(function(result) {
          
                      $scope.getOrder.__renting = result.payload;
          
                  })
          
        }


        $scope.getChapterItems = function(getOrder){// items in Kapitel in Gesamtliste

          angular.forEach(getOrder.order_items, function(item, index) {
            
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
        
        $scope.showAddressPanel=true;


        $scope.getContactData = function(contactID){
          ///
          /*
          services.api({
            method:"GET",
            data:"",
            url:localStorage.origin+localStorage.api_version+'/contact/'+contactID
              }).then(function(result) {
      
             //   console.log("get customer info=");
             //   console.dir(result);

                $scope.getContact = result.payload[0];

                console.log("getContact");
                console.dir($scope.getContact);

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
                     console.log("communication=");
                     console.dir($scope.getContact.communication);
      
              })

          ///
              */
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

        $scope.editOrderItemModal = function (index) {
          
          var temp_obj = {};

          angular.copy($scope.getOrder.order_items[index], temp_obj);
          console.log("obj",$scope.getOrder.order_items[index]);
          console.log("temp_obj",temp_obj);
          console.log("index",index);
          
          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'Components/orders/orderDetails/Widgets/modalEditOrderItem/index.html',
              controller: 'modalEditOrderItemCtrl',
              scope:$scope,
              resolve: {
                temp_obj: function () {
                  return temp_obj;
                  
                },
                index: function () {
                  return index;
                  
                }
              }
          });       
              
          
        };

        $scope.editKapitelOrderItemModal = function (index,parent_index) {
          
          var temp_obj = {};

          angular.copy($scope.getOrder.order_items[parent_index].__chapter_items[index], temp_obj);
          
          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'Components/orders/orderDetails/Widgets/modalEditOrderItem/index.html',
              controller: 'modalEditKapitelOrderItemCtrl',
              scope:$scope,
              resolve: {
                temp_obj: function () {
                  return temp_obj;
                  
                },
                parent_index: function () {
                  return parent_index;
                  
                },
                index: function () {
                  return index;
                  
                }

              }
          });       
              
          
        };


        $scope.addOrderItem = function (obj) {
            
            if (typeof($scope.getOrder.oder_items) == "string") $scope.getOrder.oder_items = [];
            
            var array = $scope.getOrder.order_items;
            if (arguments.length>1) array = arguments[1];



            $scope.acc_group2 = {
                open:true
            };

          var obj_add = {
            "primary_key": obj.primary_key,
            "journal_id": 51616,
            "order_pk": $scope.getOrder.primary_key,
            "invoice_pk": $scope.getOrder.primary_key,
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


      $scope.openConfirmDelKapitel = function (obj) {

        obj.showTime = true;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Components/orders/orderDetails/Widgets/confirmDelKapitel/index.html',
            controller: 'confirmDelKapitelCtrl',
            scope:$scope,
            backdrop: 'static',
            keyboard: false,
            resolve: {
              obj: function () {
                return obj;
                
              }
            }
            
        });
        
        
    };

    $scope.deleteKapitel = function(obj,e){
          
      if (e){ //prevent from opening accordion
        e.preventDefault();
        e.stopPropagation();
      }
      console.log("Kapitel object");
      console.dir(obj);
      //communicationTypes[row.type].title
      $confirm({text: 'Sind Sie sicher?', title: 'Kapitel löschen', ok: 'Ja', cancel: 'Nein'})
      .then(function() {
          

        $scope.openConfirmDelKapitel(obj);

          
      });

  } 

 

      $scope.deleteOrderItem = function(obj){
          
          console.dir(obj);

          //communicationTypes[row.type].title
          $confirm({text: 'Sind Sie sicher?', title: 'Artikel löschen', ok: 'Ja', cancel: 'Nein'})
          .then(function() {
            
          services.tools.removeObjectFromArray($scope.getOrder.order_items,obj,'primary_key');  
          
          });
  
      }  


      $scope.deleteOrderItemFromKapitel = function(obj,array){
        
        console.log("array");
        console.dir(array);
        console.log("obj");
        console.dir(obj);

        
        //communicationTypes[row.type].title
        $confirm({text: 'Sind Sie sicher?', title: 'Artikel von diesem Kapitel löschen', ok: 'Ja', cancel: 'Nein'})
        .then(function() {
          
        services.tools.removeObjectFromArray(array,obj,'primary_key');  
        
        });

    }


        $scope.getOrderData = function(orderID){
          
          /*
          services.api({
            method:"GET",
            data:"",
            url:localStorage.origin+localStorage.api_version+'/order/'+orderID
            }).then(function(result) {

              $scope.getOrder = result.payload[0];
              $scope.getChapterItems($scope.getOrder);


              $scope.getOrderPersonal(orderID); 
              $scope.getOrderRenting(orderID); //Anmietungen
              

              console.log("getOrder=");
              console.log($scope.getOrder);


              $scope.accordionColor = "rgb(244,164,96)";
              if ($scope.getOrder.is_confirmed) $scope.accordionColor = "rgb(143,188,143)";

              if ($scope.getOrder.address_delivery.postal_code!="" || $scope.getOrder.address_pickup.postal_code!="")  $scope.showAddressPanel=true;
              
              $scope.getContactData($scope.getOrder.contact.primary_key);

              })
              */
              $scope.accordionColor = "rgb(244,164,96)";

              $scope.getOrder = {
                "primary_key": 1213,
                "client_id": 2,
                "order_no": 100201,
                "order_no_fmt": "1002-01",
                "order_date": "2015-04-09T22:00:00.000Z",
                "event": "Galaxis Sales",
                "customer_no": 80265,
                "customer_cp_pk": 392,
                "status": "Storno",
                "is_confirmed": false,
                "all_inclusive": false,
                "is_mrp": false,
                "is_sale": false,
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
                "sum_net": 10000,
                "sum_gro": 11900,
                "sum_salestax1": 1000,
                "sum_salestax2": 15,
                "sum_discount": 0,
                "sum_rent": 10000,
                "sum_sales": 0,
                "sum_transport": 0,
                "sum_service": 0,
                "sum_insurance": 0,
                "sum_special": 0,
                "sum_bail": 0,
                "sum_salestax1": 0,
                "sum_salestax2": 0,
                "amount_uncleared": 29,
                "amount_cleared": 0,
                "amount_open_checkin": 0,
                "amount_checkin": 0,
                "amount_open_checkout": 0,
                "amount_checkout": 0,
                "amount_open_packaging": 0,
                "amount_packaging": 0,
                "amount_open_booked": 0,
                "amount_booked": 0,
                "amount_open_packagingnote": 29,
                "amount_packagingnote": 0,
                "is_rent": false,
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
              }],
                "address_delivery":{
                  "name":"1 & 1 Internet AG",
                  "address_addition":"",
                  "street":"Eigendorfer Str. 57",
                  "postal_code":"56410",
                  "city":"Montabaur",
                  "country":"Deutschland"
                },
                "address_pickup":{
                  "name":"Praxair Deutschland GmbH",
                  "address_addition":"",
                  "street":"Schnellerstraße 6",
                  "postal_code":"12439",
                  "city":"Berlin",
                  "country":"Deutschland"
                },
                "_ref_order": "order/1213",
                "contact": {
                    "primary_key": 526,
                    "customer_no": 80265,
                    "supplier_no": -526,
                    "name": "iShow",
                    "name1": "iShow",
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
                    "_ref_contact": "contact/526"
                },
                "contact_person": {
                    "primary_key": 392,
                    "contact_pk": 526,
                    "name": "Luis Perez Yturbe",
                    "first_name": "Luis",
                    "last_name": "Perez Yturbe",
                    "nickname": "",
                    "position": "",
                    "_ref_contact_person": "cperson/392"
                },
                "state_billing": "dot_red",
                "state_checkin": "dot_green",
                "state_checkout": "dot_greyoutline",
                "state_booked": "dot_yellow",
                "state_packagingnote": "dot_red",
                "state_packaging": "dot_transparent"
                };

                $scope.getContactData($scope.getOrder.contact.primary_key);

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

            

      ///////////////////////////////////////////////////////////////

      if ($routeParams.orderID != undefined){
        
        $scope.getOrderData($routeParams.orderID);
        
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

  if ($routeParams.orderType1 != undefined){
      if ($routeParams.orderType1 == "rent") $scope.searchFilters.isRent = true; 
      if ($routeParams.orderType1 == "sell") $scope.searchFilters.isSell = true;  
  }

  if ($routeParams.orderType2 != undefined){
      if ($routeParams.orderType2 == "dispo") $scope.searchFilters.isDispo = true; 
      if ($routeParams.orderType2 == "event") $scope.searchFilters.isEvent = true; 
  }


  ////////////////////////////////////////////////////////////////////////////////

/////focus searchbox//////
focus("ac_value");
/////focus searchbox//////   

//////////////////////////////
services.tools.fixHeader();
//////////////////////////////

}]);