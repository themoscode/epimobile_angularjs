
//app.controller('contactDetailsController',['$scope','$rootScope','$routeParams','$window','$timeout','$filter','$uibModal','$location','$confirm','services',function($scope, $rootScope,$routeParams,$window,$timeout,$filter,$uibModal,$location,$confirm,services){

app.controller('contactDetailsController',['$scope','$routeParams','$uibModal','services','focus','$window','$confirm',function($scope,$routeParams,$uibModal,services,focus,$window,$confirm){


    $scope.read_only = services.common.clientRights.contacts.read_only;

    $scope.communicationTypes = services.common.types.communication;
    ////////////////////////////////////////
    var searchArrayString = 'contacts';
	$scope.module = searchArrayString;   

      // console.log("$scope.searchArray=");
      //  console.dir($scope.searchArray);

        $scope.autocomplete = {
    
            getSelectedValue : function(selected){ //value from  autocomplete list when selected
                if (selected) {
                    var searchText = selected.title;

                    $scope.searchFilters.searchText = searchText;
                    $scope.searchNavigate($scope.searchFilters);
                    //services.tools.navigateTo('/contacts/'+searchText);
                }
            },
    
            getTextValue : function(){ // value from autocomplete text box when submit
                var searchText = angular.element('#ac_value')[0].value;
                services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,searchArrayString);
                
                $scope.searchFilters.searchText = searchText;
			    $scope.searchNavigate($scope.searchFilters);
                //services.tools.navigateTo('/contacts/'+searchText);
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
    $scope.searchNavigate = function(searchFilters){
		
		var url='/contacts/'+searchFilters.searchText;

		//console.log(url);

		services.tools.navigateTo(url);

	}    

    $scope.searchFilters = {
        
        searchText:""
        
      }

    $scope.setSinglePersonStatus = function(status){//true = single_person , false = company
        $scope.getContact.is_single_person = status;
    }

    $scope.setClientStatus = function(){
        $scope.getContact.is_client = !$scope.getContact.is_client;

        if ($scope.getContact.is_client == true){
            $scope.getContact.is_interested = false;
        }
  
    }

    $scope.setInterestedStatus = function(){
        $scope.getContact.is_interested = !$scope.getContact.is_interested;

        if ($scope.getContact.is_interested == true){
            $scope.getContact.is_client = false;
        }
    }

    $scope.setSupplierStatus = function(){
        $scope.getContact.is_supplier = !$scope.getContact.is_supplier;
    }

    $scope.setLocationStatus = function(){
        $scope.getContact.is_location = !$scope.getContact.is_location;
    }

    $scope.setVIPStatus = function(){
        $scope.getContact.is_vip = !$scope.getContact.is_vip;
    }

    $scope.setColleagueStatus = function(){
        $scope.getContact.is_colleague = !$scope.getContact.is_colleague;
    }

    

    $scope.getContactImage = function(id){
        
        services.api({
            method:"GET",
            data:"",
			url:localStorage.origin+localStorage.api_version+'/contact/image/'+id
        }).then(function(result) {

            if (result.payload_length > 0) {
                
                var codec = result.payload[0].codec;
                var image_data =  result.payload[0].image_data;
                $scope.getContact.__image = "data:image/"+codec+";base64,"+image_data;
            
            }else {
                
                $scope.getContact.__image = "./Assets/img/image_128x128.png";

            }

        })

    }

    

    $scope.getContactData = function(contactID){

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
                "keyword": "installation",
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
            "order": [

                {
                    "primary_key":1,
                    "order_no_fmt":"A23F001",
                    "event":"Event 1", 
                    "is_sale":true  
                }
            ],
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
    
    $scope.openContactDetailsModal = function () {
        
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Components/contacts/contactDetails/Widgets/modalContactDetails/index.html',
                controller: 'modalContactDetailsCtrl',
                scope:$scope
            });       
        
                
            
    };


	$scope.openSalutationModal = function () {

        if (!$scope.readOnly) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Components/contacts/contactDetails/Widgets/modalSalutation/index.html',
                controller: 'modalSalutationCtrl',
                scope:$scope
            });       

        }
    
    };

    $scope.openModalSelectDate = function (obj) {
      
        obj.showTime = true;
  
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Components/Shared/modalSelectDate/index.html',
            controller: 'modalSelectDateCtrl',
            scope:$scope,
            resolve: {
              obj: function () {
                return obj;
                
              }
            }
            
        });
         
    };

    $scope.openContactPersonModal = function (index) {
            
            var cp_obj = {};

            angular.copy($scope.getContact.contact_person[index], cp_obj);

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Components/contacts/contactDetails/Widgets/modalContactPerson/index.html',
                controller: 'modalContactPersonCtrl',
                scope:$scope,
                resolve:{
                    cp_obj:function(){
                        return cp_obj;
                    },
                    cp_index:function(){
                        return index;
                    }

                }

            });       

        }
    
        
        $scope.addContactPerson = function (e) {
            
            if (e){ //prevent from opening accordion
                e.preventDefault();
                e.stopPropagation();
              }

              if (typeof($scope.getContact.contact_person) == "string") $scope.getContact.contact_person = [];

              $scope.acc_group1 = {
                  open:true
              };

            var cp_obj = {
                "primary_key": 536,
                "contact_pk": 460,
                "name": "",
                "first_name": "[NAME]",
                "last_name": "[NACHNAME]",
                "nickname": "",
                "position": "[POSITION]",
                "date_of_birth": "0000-00-00T00:00:00",
                "department": "[ABTEILUNG]",
                "salutation": "",
                "grade": ""
               
                
            };

            $scope.getContact.contact_person.push(cp_obj);      

        }    
        

        $scope.addOrder = function (e) {
            
            if (e){ //prevent from opening accordion
                e.preventDefault();
                e.stopPropagation();
              }

              if (typeof($scope.getContact.order) == "string") $scope.getContact.order = [];

              $scope.acc_group3 = {
                  open:true
              };

            var cp_obj = {
                "primary_key":9142,
                "order_no_fmt": 536,
                "event": "dummy2",
                "is_sale": true
                
            };

            $scope.getContact.order.push(cp_obj);      

        } 

        $scope.deleteOrder = function(obj){
            
            console.log("obj:");
            console.dir(obj);
            //communicationTypes[row.type].title
            $confirm({text: 'Sind Sie sicher?', title: 'Vorgang löschen', ok: 'Ja', cancel: 'Nein'})
            .then(function() {
              
            services.tools.removeObjectFromArray($scope.getContact.order,obj,'primary_key');  
             
            });
      
          }

        $scope.deleteContactPersonData = function(obj){
            
            console.log("obj:");
            console.dir(obj);
            //communicationTypes[row.type].title
            $confirm({text: 'Sind Sie sicher?', title: 'Ansprechpartner löschen', ok: 'Ja', cancel: 'Nein'})
            .then(function() {
              
            services.tools.removeObjectFromArray($scope.getContact.contact_person,obj,'primary_key');  
             
            });
      
          }
        
          $scope.deleteHistory = function(obj){
      
            console.dir(obj);
            //communicationTypes[row.type].title
            $confirm({text: 'Sind Sie sicher?', title: 'Historie löschen', ok: 'Ja', cancel: 'Nein'})
            .then(function() {
              
            services.tools.removeObjectFromArray($scope.getContact.contact_chrono,obj,'primary_key');  
             
            });
      
          }  
          
          $scope.addHistory = function (e) {
            
           

            if (e){ //prevent from opening accordion
                e.preventDefault();
                e.stopPropagation();
              }

              if (typeof($scope.getContact.contact_chrono) == "string") $scope.getContact.contact_chrono = [];
              

              $scope.acc_group2 = {
                  open:true
              };

            var cp_obj = {
                "primary_key": 10,
                "contact_pk": 460,
                "contact_person_pk": 535,
                "keyword": "installation todesstern2",
                "contact_partner": "george Lucas2",
                "date": "2017-12-10T23:00:00.000Z",
                "time": 64437005,
                "duration": 29,
                "com_type": 1,
                "com_type_str": "Telefon",
                "uplink": "12345"
                
            }

            $scope.getContact.contact_chrono.push(cp_obj);      

        }  

        


        $scope.openHistoryModal = function (primary_key) {
            
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Components/contacts/contactDetails/Widgets/modalHistory/index.html',
                controller: 'modalContactHistoryCtrl',
                scope:$scope,
                resolve:{
                    data:function(){
                        return {primary_key:primary_key};
                    }

                }
                
            });       
    
        };   
        
        $scope.openNewHistoryModal = function(e){

            if (e){ //prevent from opening accordion
                e.preventDefault();
                e.stopPropagation();
              }

              var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Components/contacts/contactDetails/Widgets/modalNewHistory/index.html',
                controller: 'modalNewContactHistoryCtrl'
                
                
            });   

        }


        ////////////////////////////////////////////////////////////
       
        if ($routeParams.contactID != undefined){
            
            $scope.getContactData($routeParams.contactID);
            
        }

        ////////////////////////////////////////////////////////////////////////////////
        if (localStorage.globalSearch!="" ) {
            $scope.searchFilters.searchText = localStorage.globalSearch;
            $scope.autocomplete.showXbutton = true;
        }
        ////////////////////////////////////////////////////////////////////////////////


/////focus searchbox//////
focus("ac_value");
/////focus searchbox//////

//////////////////////////////
services.tools.fixHeader();
//////////////////////////////

}]);//themos