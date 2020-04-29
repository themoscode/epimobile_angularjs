
//app.controller('productDetailsController',['$scope','$rootScope','$routeParams','$window','$timeout','$filter','services','$uibModal',function($scope, $rootScope,$routeParams,$window,$timeout,$filter,services,$uibModal){
app.controller('productDetailsController',['$scope','$routeParams','$timeout','services','$uibModal','focus',function($scope,$routeParams,$timeout,services,$uibModal,focus){


    ////////////////////////////////////////
    var searchArrayString = 'products';
    $scope.searchArray = JSON.parse(localStorage.searchItems)[searchArrayString];

    $scope.autocomplete = {

        getSelectedValue : function(selected){ //value from  autocomplete list when selected
            if (selected) {
                var searchText = selected.title;
                
                $scope.searchFilters.searchText = searchText;
                services.searchNavigate.products($scope.searchFilters);
            }
        },

        getTextValue : function(){ // value from autocomplete text box when submit
            var searchText = angular.element('#ac_value')[0].value;
            services.common.searchAutocomplete.addItem(services.common.app_settings.searchMemory,searchText,searchArrayString);
            
            $scope.searchFilters.searchText = searchText;
			services.searchNavigate.products($scope.searchFilters);
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
    ////////////////////////////////////////////////////////////////
     

    $scope.searchFilters = {
        
        searchText:""
        
      }
   


   $scope.getProductImage = function(productID){
    
        services.api({
            method:"GET",
            data:"",
            url:localStorage.origin+localStorage.api_version+'/product/image/'+productID
        }).then(function(result) {

          //  console.log("IMAGE:");
          //  console.dir(result);

            if (result.payload_length > 0) {
                
                var codec = result.payload[0].codec;
                var image_data =  result.payload[0].image_data;
                $scope.getProduct.__image = "data:image/"+codec+";base64,"+image_data;
              //  console.log("image="+$scope.getProduct.__image);
               // alert("image="+$scope.getProduct.__image);
            
            }else {
                
                $scope.getProduct.__image = "./Assets/img/image_128x128.png";

            }

        })
    
    }

    var getFreeMaterialName = function(id,index){

        services.api({
            method:"GET",
            data:"",
            url:localStorage.origin+localStorage.api_version+'/product/'+id
        }).then(function(result) {

            $scope.getProduct.materials[index].name = result.payload[0].name;

        })


    }
    
    $scope.getProductOrders = function(productID){//Vorgänge

        services.api({
            method:"GET",
            data:"",
            url:localStorage.origin+localStorage.api_version+'/order/filter/?ppk='+productID+'&ia=f'
        }).then(function(result) {

           // console.log("Vorgänge");
           // console.dir(result);
            $scope.getProduct.__orders = result.payload;

        })

    }


    $scope.ooogetProductData = function(productID){
        
        services.api({
            method:"GET",
            data:"",
            url:localStorage.origin+localStorage.api_version+'/product/'+productID
        }).then(function(result) {

            $scope.getProduct = result.payload[0];
            
            //get description
            var index_descr = services.tools.arrayObjectIndexOf($scope.getProduct.mlang_description, "Deutsch", "lang_str");

            $scope.getProduct.__description = $scope.getProduct.mlang_description[index_descr].description_short;

            $scope.getProductImage(productID);

            $scope.getProductOrders(productID);

            console.log("getProduct=");
            console.log($scope.getProduct);

            ////get free material names

            angular.forEach($scope.getProduct.materials, function(item, index) {
                
                if (item.mat_product_pk !=0) {
                    getFreeMaterialName(item.mat_product_pk,index);
                    
                }
                   
            });

        })
    
    }

    $scope.getProductData = function(productID){
        
       
        $scope.getProduct = {
            "primary_key": 10,
            "product_no": 14002,
            "inventory_no": "CE 0589-T1-0114 (IN)",
            "name": "NextFX Gerb2 1s12 silver",
            "is_active": true,
            "is_rent": false,
            "is_sale": true,
            "is_inventory": false,
            "is_virtual": false,
            "matchcode": "NFX G2",
            "manufacturer": "NextFX",
            "manufacturer_product_no": "",
            "manufacturer_country": "",
            "ean_code": "",
            "notes": "NEQ 2,3gr, GW 20,4gr",
            "is_webshop_export": false,
            "customs_tariff_number_export": "",
            "customs_tariff_number_import": "",
            "materials": [
                {
                    "amount":5,
                    "name":"material 1"
                },
                {
                    "amount":12,
                    "name":"material 2"
                },
            ],
            "_materials_length": 0,
            "mlang_description": [{
                "primary_key": 16,
                "product_pk": 10,
                "transport_pk": 0,
                "service_func_pk": 0,
                "lang_pk": 1,
                "lang_str": "Deutsch",
                "name": "NextFX Fontäne2 1s12 silber",
                "name_short": "",
                "unit": "Stk",
                "description_short": "Sicherheitsabstand seitlich 1m\rSicherheitsabstand in Ausstoßrichtung 7m",
                "description_long": "",
                "description_delivery": "",
                "description_tech": "",
                "description_package": "",
                "description_webshop": "",
                "is_native_lang": false,
                "is_sales": false,
                "iso-639-1": "",
                "iso-639-2": ""
            }, {
                "primary_key": 17,
                "product_pk": 10,
                "transport_pk": 0,
                "service_func_pk": 0,
                "lang_pk": 2,
                "lang_str": "Englisch",
                "name": "NextFX Gerb2 1s12 silver",
                "name_short": "",
                "unit": "pcs",
                "description_short": "safety distance sideways 1m\rsafety distance directional 7m",
                "description_long": "",
                "description_delivery": "",
                "description_tech": "",
                "description_package": "",
                "description_webshop": "",
                "is_native_lang": false,
                "is_sales": false,
                "iso-639-1": "",
                "iso-639-2": ""
            }],
            "_mlang_description_length": 2,
            "supplier": [{
                "primary_key": 156,
                "product_pk": 10,
                "contact_pk": 5,
                "price_purchase": 5.7,
                "is_favourite": false,
                "position": 1,
                "amount_max": 0,
                "is_purchase": true,
                "product_no_supplier": "Gerb2-1S12",
                "contact": {
                    "primary_key": 5,
                    "customer_no": 80005,
                    "supplier_no": 70003,
                    "name": "Precision Theatrical Effects Inc. NextFX",
                    "name1": "Precision Theatrical Effects Inc.",
                    "name2": "NextFX",
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
                    "_ref_contact": "contact/5"
                },
                "$$hashKey": "object:162"
            }],
            "_supplier_length": 1,
            "pricing": {
                "primary_key": 2396,
                "price_rent": 0,
                "price_base": 0,
                "price_base_offdays": 0,
                "price_base_ontour": 0,
                "price_rent_offdays": 0,
                "price_rent_ontour": 0,
                "price_rent_weekend": 0,
                "price_sale_gro": 6.78,
                "price_sale_net": 5.7,
                "deposit": 0,
                "insurance_gro": 0,
                "insurance_net": 0,
                "tax_rent": 0,
                "tax_sales": 0
            },
            "tech_data": {
                "weight_gro": 0,
                "weight_net": 0,
                "height_gro": 0,
                "height_net": 6.36,
                "width_gro": 0,
                "width_net": 1.86,
                "depth_gro": 0,
                "depth_net": 1.86,
                "capacity_gro": 0,
                "capacity_net": 0,
                "op_voltage_from": 0,
                "op_voltage_to": 0,
                "current_consumption": 0,
                "electrical_power": 0,
                "setup_time": 0,
                "breakdown_time": 0
            },
            "stock_data": [{
                "primary_key": 12239,
                "stock_total": 0,
                "stock_rent": 0,
                "stock_sale": 0,
                "stock_inventory": 0,
                "stock_access_total": 0,
                "stock_access_rent": 0,
                "stock_access_sale": 0,
                "warehouse_id": -1,
                "client_id": 2
            }],
            "group_of_goods": [{
                "primary_key": 4,
                "product_pk": 10,
                "product_group_pk": 13,
                "is_sales": true,
                "sequence_name": ";",
                "sequence_pk": "16;13"
            }, {
                "primary_key": 440,
                "product_pk": 10,
                "product_group_pk": 16,
                "is_sales": false,
                "sequence_name": "",
                "sequence_pk": "16"
            }],
            "_pricing_length": 1,
            "_tech_data_length": 1,
            "_stock_data_length": 1,
            "_group_of_goods_length": 2,
            "__description": "Sicherheitsabstand seitlich 1m\rSicherheitsabstand in Ausstoßrichtung 7m",
            "__image": "./Assets/img/image_128x128.png",
            "__orders": [
                {
                    "order_no_fmt":"E23433",
                    "event":"Event 1"
                },
                {
                    "order_no_fmt":"E23434",
                    "event":"Event 2"
                }
            ]
        };
    
    }
/////////////////////////////////////////

$scope.popupMaterialDetails = function(id){
    if (id == 0) 
        $scope.services.common.openMsgAutoclose('Details nicht verfügbar');
    else
        $scope.openMaterialModal(id);
}




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

    $scope.setProductMode = function(val){
		
		$scope.getProduct.is_rent = false; 
        $scope.getProduct.is_sale = false;	
        $scope.getProduct.is_inventory = false;	

        if (val == "rent") {$scope.getProduct.is_rent = true; }
        if (val == "sale") {$scope.getProduct.is_sale = true; }
        if (val == "inventory") {$scope.getProduct.is_inventory = true; }
    }
    

////////////////////////////////////////////////////

    if ($routeParams.productID != undefined){
        
        $scope.getProductData($routeParams.productID);
        
    }    
    ////////////////////////////////////////////////////////////////////////////////
    if (localStorage.globalSearch!="" ) {
        $scope.searchFilters.searchText = localStorage.globalSearch;
        $scope.autocomplete.showXbutton = true;
    }

    if (Object.keys($routeParams).length >0 ){
        
        if ($routeParams.datesSelected != undefined)  $scope.searchFilters.datesSelected = true;
        
        $scope.searchFilters.dateFrom = "";
        if ($routeParams.dateFrom != undefined)  $scope.searchFilters.dateFrom = $routeParams.dateFrom;
        
        $scope.searchFilters.dateTo="";
        if ($routeParams.dateTo != undefined) $scope.searchFilters.dateTo = $routeParams.dateTo;
        
        $scope.searchFilters.timeFrom="";
        if ($routeParams.timeFrom != undefined) $scope.searchFilters.timeFrom = $routeParams.timeFrom;
        
        $scope.searchFilters.timeTo="";
        if ($routeParams.timeTo != undefined) $scope.searchFilters.timeTo = $routeParams.timeTo;
    

        if ($routeParams.productType != undefined) {

            if ($routeParams.productType == "sell") $scope.searchFilters.isSell = true;
            if ($routeParams.productType == "rent") $scope.searchFilters.isRent = true;
            

        }
 
		
    }

    ////////////////////////////////////////////////////////////////////////////////

    
/////focus searchbox//////
focus("ac_value");
/////focus searchbox//////

//////////////////////////////
services.tools.fixHeader();
//////////////////////////////


}]);//themos