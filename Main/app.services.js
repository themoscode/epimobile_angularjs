//app.service('services',['$q','$uibModal','$http','$location','deviceDetector','$rootScope','$base64',function($q,$uibModal,$http,$location,deviceDetector,$rootScope,$base64){

	app.service('services', ['$q', '$uibModal', '$http', '$location', 'deviceDetector', '$base64','$window','$timeout','$confirm', function ($q, $uibModal, $http, $location, deviceDetector, $base64,$window,$timeout,$confirm) {

	
		var services = this;
	
		/////////////////////TOOLS////////////////////////////////////
		services.tools = {
	
			fixHeader:function(){
				$timeout(function(){
					$(".my-panel-header").css("position", "fixed");
					$(".bodyRow").css("margin-top", "110px");
				},500);
			},
			deviceDetector: deviceDetector,
			navigateTo: function (url) {
				$location.path(url);
			},
			goLogin: function () { //TOOLS
	
	
				sessionStorage.removeItem("userData");
				$location.path('/login');
	
			},
			arrayObjectIndexOf: function (myArray, searchTerm, property) { //find obj in array of obj //TOOLS
				
				if (myArray != undefined) {
					for (var i = 0, len = myArray.length; i < len; i++) {
						if (myArray[i][property] === searchTerm) return i;
					}
				}
				
				return -1;
			},
			removeObjectFromArray: function (array, obj, propertyName) { //TOOLS
	
				//find index
				console.log(propertyName,obj[propertyName]);
				var index = services.tools.arrayObjectIndexOf(array, obj[propertyName], propertyName);
				array.splice(index, 1);
			},
	
			dateStr: function () {
	
				var date = new Date();
	
				if (arguments.length > 0) {
					date = arguments[0];
				}
	
				//	console.log("date="+date);
	
				var result = "";
	
				if (date != undefined && date != "Invalid Date") result = ('0' + date.getDate()).slice(-2) + "." + ('0' + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();
	
				return result;
	
			},
	
	
			twoDigits: function (str) { //TOOLS
	
				str = "" + str;
				var result = str;
				if (str.length == 1) {
					result = "0" + str;
				}
				return result;
			},
	
			timeStr: function () { //TOOLS
	
				var date = new Date();
	
				if (arguments.length > 0) {
					date = arguments[0];
				}
	
				var result = "";
	
				if (date) result = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
	
	
				return result;
	
			},
	
			dateYMDorDMY: function (str) { //TOOLS
	
				//if str(format) = d-m-y ---> y-m-d
				//if str(format) = y-m-d ---> d-m-y
	
				var s = ".";
				if (arguments.length > 1) {
					s = arguments[1];
				}
	
				var res = str.split(s);
				str = res[2] + s + res[1] + s + res[0];
				return str;
			},
	
			dayNameFrom4d:function(str){
				if (str == undefined) return;
				str = moment(str).tz('Europe/Berlin').format();
				
				//return  moment(str).lang("de").format('dddd');
				return  moment(str).locale("de").format('dddd');
			},
	
	
			dateFrom4d: function (str) { //TOOLS
	
				if (str == undefined) return;
	
				str = moment(str).tz('Europe/Berlin').format();
				//str='2014-03-13T23:00:00.000Z'
	
				str = str.slice(0, 10); //str='2014-03-13' 
				str = str.replace(/-/g, "."); //str='2014/03/13' 
	
				str = services.tools.dateYMDorDMY(str) //str='13/03/2014' 
	
				return str;
	
			},


			timeFrom4d:function(ms){

				var obj = services.tools.hoursMins(ms);
				return services.tools.twoDigits(obj.hours)+":"+services.tools.twoDigits(obj.mins);

			},
	
			hoursMinsInMS: function (hours, mins) { //TOOLS
	
				var ms = (hours * 60 * 60 * 1000) + (mins * 60 * 1000);
				return ms;
			},
	
			hoursMins: function (ms) { //TOOLS
	
	
				var hours = Math.trunc(ms / 60 / 60 / 1000);
				var rest = ms % (60 * 60 * 1000);
				var mins = Math.trunc(rest / 60 / 1000);
	
				return {
					hours: services.tools.twoDigits(hours),
					mins: services.tools.twoDigits(mins)
				};
				//return services.tools.twoDigits(hours)+":"+services.tools.twoDigits(mins);
	
			}
	
		};
	
		services.tools.today = services.tools.dateStr();
	
		//////////////////TOOLS END////////////////////////////////////////////////////////
	
		//////////////////COMMON START////////////////////////////////////////////////////////
	
		services.common = {
	
			loading: {},
	
			getGoogleMap : function(street,postCode, place){
				
				
				var address = "?f=q&hl=de&q="+street+" "+postCode+" "+place;
				$window.open("https://www.google.de/maps"+address);
				
			},
	
			setInfo: function (userData) { //send to server user_id, selected_mandant_id,selected_warehouse_id
	
				var deferred = $q.defer();
	
				services.common.http_request.method = 'POST';
				services.common.http_request.url = localStorage.origin + 'setinfo';
				services.common.http_request.headers['X-EPI-DEBUG-INFO'] = 'True';
				services.common.http_request.data = {
	
					user_id: userData.user_id,
					selected_mandant_id: userData.selectedMandantID,
					selected_warehouse_id: userData.selectedLagerID
	
				}
	
	
				$http(services.common.http_request).then(function (response) {
	
				//	console.log("setInfo response:")
				//	console.dir(response);
	
					var result = response.data.success;
	
					if (!result) {
						services.common.detectError(response.data);
					}
	
	
					deferred.resolve(result);
					//console.dir(result);
	
				}, services.common.http_failed);
	
	
				return deferred.promise;
	
			},
	
			logout: function () { //ENABLE IT LATER WHEN LOGOUT API FUNCTION IS READY
	
				var deferred = $q.defer();
	
				services.common.http_request.method = 'GET';
				services.common.http_request.data = "";
	
				services.common.http_request.url = localStorage.origin + 'logout';
	
				$http(services.common.http_request).then(function (response) {
	
					//console.dir(response);
	
					if (!response.data.success) {
	
						services.common.detectError(response.data);
						result = false;
	
					} else {
	
						result = response.data;
	
					}
	
					deferred.resolve(result);
					//console.dir(result);
	
				}, services.common.http_failed);
	
	
				return deferred.promise;
	
			},
	
			login: function (username, password) {
	
				var deferred = $q.defer();
	
				//var credentials = $base64.encode (username+':'+password);
				var credentials = btoa(unescape(encodeURIComponent(username)) + ":" + unescape(encodeURIComponent(password)));
				services.common.http_request.headers.Authorization = 'Basic' + credentials;
	
				//console.log(credentials);
				//console.log(services.common.http_request.headers.Authorization);
				//console.log(services.common.http_request);
	
				services.common.http_request.method = 'GET';
				services.common.http_request.data = "";
				services.common.http_request.url = localStorage.origin + 'login';
				
				//console.log('url:',localStorage.origin + 'login');

				$http(services.common.http_request).then(function (response) {
	
					//console.dir(response);
	
					if (!response.data.success) {
	
						services.common.detectError(response.data);
						result = false;
	
					} else {
	
						/*
						
						result = {
						"success": true,
						"loginname": "Administrator",
						"fullname": "Administrator",
						"name_short": "adm",
						"user_id": 1,
						"mandanten_length": 2,
						"last_mandantID": 2,
						"last_warehouseID": 6,
						"man_separatePaymentCondition": false,
						"man_separateTextBlocks": false,
						"man_separateMasterData": true,
						"mandanten": [{
							"mandant_id": 0,
							"mandant_name": "ffp Spezialeffekte & Veranstaltungslogistik GmbH",
							"mandant_short": "ffp",
							"primary_key": 1,
							"warehouse_length": 1,
							"warehouse": [{
								"Primary_Key": 1,
								"Name": "Lager",
								"__DefaultLager": true,
								"Mandanten_ID": 0,
								"Lagerortung": false,
								"LiefAdress_Primkey": 0
							}],
							"$$hashKey": "object:26"
						}, {
							"mandant_id": 2,
							"mandant_name": "ffp effects, Inc",
							"mandant_short": "ffp Inc",
							"primary_key": 2,
							"warehouse_length": 1,
							"warehouse": [{
								"Primary_Key": 6,
								"Name": "ffp inc",
								"__DefaultLager": false,
								"Mandanten_ID": 0,
								"Lagerortung": false,
								"LiefAdress_Primkey": 0
							}],
							"$$hashKey": "object:27"
						}],
						"request_duration": 2
					}
						
						
						result = {
							"success": true,
							"loginname": "Administrator",
							"fullname": "Administrator",
							"name_short": "adm",
							"user_id": 1,
							"mandanten_length": 1,
							"last_mandantID": 0,
							"last_warehouseID": 2,
							"man_separatePaymentCondition": false,
							"man_separateTextBlocks": false,
							"man_separateMasterData": true,
							"mandanten": [{
								"mandant_id": 0,
								"mandant_name": "ffp Spezialeffekte & Veranstaltungslogistik GmbH",
								"mandant_short": "ffp",
								"primary_key": 1,
								"warehouse_length": 2,
								"warehouse": [
									{
									"Primary_Key": 1,
									"Name": "Lager",
									"__DefaultLager": true,
									"Mandanten_ID": 0,
									"Lagerortung": false,
									"LiefAdress_Primkey": 0
									},
									{
									"Primary_Key": 2,
									"Name": "Lager2",
									"__DefaultLager": false,
									"Mandanten_ID": 0,
									"Lagerortung": false,
									"LiefAdress_Primkey": 0
									}
							
								]
							}]
							
						};
	
						*/ 
						result = response.data;
	
					}
	
					deferred.resolve(result);
	
					//console.log("USERDATA:");
					//console.log(result);
	
	
				}, services.common.http_failed);
	
	
				return deferred.promise;
	
			},
			
			clientRights:{
				"meetings":{
				
					"can_insert":true,
					"can_update":true,
					"can_delete":true,
					"read_only":true
				 },
				 "tasks":{
					
					"can_insert":true,
					"can_update":true,
					"can_delete":true,
					"read_only":true
				},
				"contacts":{
					
					"can_insert":true,
					"can_update":true,
					"can_delete":true,
					"read_only":true
				},
				"products":{
					
					"can_insert":true,
					"can_update":true,
					"can_delete":true,
					"read_only":true
				},
				"orders":{
					
					"can_insert":true,
					"can_update":true,
					"can_delete":true,
					"read_only":true
				},
				"invoices":{
					
					"can_insert":true,
					"can_update":true,
					"can_delete":true,
					"read_only":true
				}
			},
	
			app_settings: {
	
				api_version: "v1",
				showSearch: true,
				showTermin: true,
				showAufgabe: true,
				showAdress: true,
				showZeiterfassung: false,
				showArtikel: true,
				showAuftrag: true,
				showRechnung: true,
				showChat: false,
				showZeitraum: false,
				searchMemory: 20, // how many keywords can be saved in memory for autocomplete  
				searchMemory_min: 0,
				searchMemory_max: 20,
				searchMemory_set: function (x) {
					if (x == "+") {
						this.searchMemory++;
						if (this.searchMemory > this.searchMemory_max) {
							this.searchMemory = this.searchMemory_max;
						}
					}
					if (x == "-") {
						this.searchMemory--;
						if (this.searchMemory < this.searchMemory_min) {
							this.searchMemory = this.searchMemory_min;
	
						}
	
						var searchItems = JSON.parse(localStorage.searchItems);
	
						var _this = this;
	
						angular.forEach(searchItems, function (value, key) {
							//console.log("value=" + value + ",key= " + key + ",length=" + searchItems[key].length + ",searchMemory=" + _this.searchMemory);
							if (searchItems[key].length > _this.searchMemory)
								searchItems[key].length = _this.searchMemory;
						});
	
						//console.dir(searchItems);
	
						localStorage.searchItems = JSON.stringify(searchItems);
	
						//console.log(localStorage.searchItems);
					}
	
	
	
	
				}
	
	
			},
	
			sessionStorage: {
	
				set: function (userData) {
	
					sessionStorage.userData = JSON.stringify(userData);
	
				},
	
				get: function (item) {
	
					////console.log(JSON.parse(sessionStorage.userData).selectedMandantID);
					return JSON.parse(sessionStorage.userData)[item];
	
				},
	
				reset: function () {
	
					sessionStorage.removeItem("userData");
					//console.log("sessionStorage.userData=");
					//console.log(sessionStorage.userData);
	
				}
	
			},
	
	
	
			localStorage: {
	
				set: function () {
	
					localStorage.origin = location.origin + "/";
					localStorage.api_version = services.common.app_settings.api_version;
	
					//console.log("localStorage.searchItems=");
					//console.dir(localStorage);
	
					if (localStorage.globalSearch === undefined)  {
						localStorage.globalSearch = "";
					}
	
					if (localStorage.searchItems === undefined) {
						
						localStorage.searchItems = JSON.stringify({
							global:[],
							meetings: [],
							tasks: [],
							contacts: [],
							products: [],
							orders: [],
							invoices: []
						});
					}
	
	
					//console.log("localStorage_set=");
					//console.dir(localStorage);
				}
	
			},
	
	
	
			epiUsers: {
	
				entities: function () {
	
					var deferred = $q.defer();
	
					services.common.http_request.method = 'GET';
					services.common.http_request.data = "";
	
					services.common.http_request.url = localStorage.origin + 'epiusers';
	
					$http(services.common.http_request).then(function (response) {
	
						//console.dir(response);
	
						if (!response.data.success) {
	
							services.common.detectError(response.data);
							result = false;
	
	
						} else {
	
							result = response.data;
	
						}
	
						deferred.resolve(result);
						//console.dir(result);
	
					}, services.common.http_failed);
	
	
					return deferred.promise;
	
				}
	
			},
	
			types: {
				//communication: ["Tel.", "Fax", "Mobil", "eMail", "Web", "Chat", "Sonstiges"],
				communication: [
					{
						"title":"Tel.",
						"type":0
					},
					{
						"title":"Fax",
						"type":1
					},
					{
						"title":"Mobil",
						"type":2
					},
					{
						"title":"eMail",
						"type":3
					},
					{
						"title":"Web",
						"type":4
					},
					{
						"title":"Chat",
						"type":5
					},
					{
						"title":"Sonstiges",
						"type":6
					}		
						
				
				],
				error: [
					// 0 == Username and/or Password is false
					// 1 == invalid url-request
					// 2 == invalid namespace
					// 3 == invalid action
					// 4 == not logged in
					// 5 == no valid data
					// 6 == invalid number of options
					// 7 == modul 'webshopAPI' is not active
					// 8 == invalid access token
					  // 9 == json template not defined
					// 10 == invalid option
					// 11 == number of connections reached
					{
						en: "Username and/or Password is false",
						de: "Benutzername und/oder Kennwort ist falsch"
					},
					{
						en: "invalid url-request",
						de: "ungültige URL-Anfrage"
					},
					{
						en: "invalid namespace",
						de: "ungültiger Namespace"
					},
					{
						en: "invalid action",
						de: "ungültige Aktion"
					},
					{
						en: "not logged in",
						de: "nicht eingeloggt"
					},
					{
						en: "no valid data",
						de: "keine gültigen Daten"
					},
					{
						en: "invalid number of options",
						de: "ungültige Anzahl von Optionen"
					},
					{
						en: "modul 'webshopAPI' is not active",
						de: "Modul 'WebshopAPI' ist nicht aktiv"
					},
					{
						en: "invalid access token",
						de: "kein valider Token"
					},
					{
						en: "json template not defined",
						de: "json template not defined"
					},
					{
						en: "invalid option",
						de: "invalid option"
					},
					{
						en: "Number of maxiumum connections reached",
						de: "Die max. Anzahl der verfügbaren Arbeitsplatzlizenzen von epiMobile ist erreicht."
					}
	
				]
			},
	
			openMsgAutoclose: function (text) { //COMMON
	
				var autoClose = true;
				var errorMsg = false;

				if (arguments.length == 2) {
					autoClose = arguments[1];
				}
				else if (arguments.length == 3){
					autoClose = arguments[1];
					errorMsg = arguments[2];
				}
	
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: "Components/Shared/modalMsgAutoClose/index.html",
					controller: "modalMsgAutoCloseCtrl",
					resolve: {
						dataToModal: {
	
							text: text,
							autoClose: autoClose,
							errorMsg:errorMsg
	
	
						}
					}
				});
			},
	
			searchAutocomplete: { //COMMON
	
				addItem: function (searchMemory, item, searchArray) {
					//console.log("item=" + item);
	
					var obj = JSON.parse(localStorage.searchItems);
	
					var foundItem = services.tools.arrayObjectIndexOf(obj[searchArray], item, "key");
	
					if (foundItem == -1) { //not found
	
						obj[searchArray].unshift({
							key: item
						}); // add new item on on the top of array
	
	
						if (obj[searchArray].length > searchMemory) {
							obj[searchArray].pop(); //remove last array element
						}
	
					}
	
					localStorage.searchItems = JSON.stringify(obj);
	
					//console.log("localStorage.searchItems=");
					//console.log(localStorage.searchItems);
	
				}
	
			},
	
			

			detectError: function (result) {
				
					if (result.errnum){
						if (result.errnum < 0) services.common.openMsgAutoclose(services.common.types.error[0].de,true,true);
						else if (result.errnum > 0) services.common.openMsgAutoclose(services.common.types.error[result.errnum].de,true,true); 
						
					}
					
					services.tools.goLogin();
				
			},
	
			http_failed: function (response) { //COMMON
	
				//console.log('http failed');
				services.common.openMsgAutoclose(response.data.replace("h2", "p").replace("h2", "p"), true,true);
				//console.dir(response);
			},
	
			http_request: { //COMMON
				method: 'GET',
				url: '',
				headers: {
					'X-Agent': 'epimobile'
				},
				data: ""
			}
	
	
	
		}
	
		//////////////////COMMON END////////////////////////////////////////////////////////
	
		/////////API CALLS//////////////////////////////////////////////////////////////////
	
		services.api = function (obj) {
	
			var deferred = $q.defer();
	
			services.common.http_request.method = obj.method;
			services.common.http_request.data = obj.data;
			services.common.http_request.url = obj.url;
	
			//console.log("services.common.http_request.data=" + services.common.http_request.data);
			//console.dir(services.common.http_request.data);
	
	
			$http(services.common.http_request).then(function (response) {
				
				if (!response.data.success) {
	
					services.common.detectError(response.data);
					result = false;
	
				} else {
	
					result = response.data;
	
				}
	
				deferred.resolve(result);
				//console.dir(result);
	
			}, services.common.http_failed);
	
	
			return deferred.promise;
	
	
		};
		
		services.states = {
			order:{
				is_confirmed:{
					"true":"Ist bestätigt",
					"false":"Ist nicht bestätigt"
				},
				state_booked:{//F
					"dot_greyoutline":"Keine Fremdanmietung",
					"dot_transparent":"Keine Fremdanmietung",
					"dot_red":"Keine Fremdanmietung",
					"dot_yellow":"Ware teilweise angemietet",
					"dot_green":"Ware bestellt",
					"dot_orange":"Teil bestellt"
		  
				  },
				  state_packagingnote:{//PS
					"dot_greyoutline":"Kein Packschein erstellt",
					"dot_transparent":"Kein Packschein erstellt",
					"dot_red":"Kein Packschein erstellt",
					"dot_yellow":"Packschein teilweise erstellt",
					"dot_green":"Packschein erstellt",
					"dot_orange":"Packschein teil erstellt"
				  },
				  state_packaging:{//P
					"dot_greyoutline":"Nicht vorgepackt",
					"dot_transparent":"Nicht vorgepackt",
					"dot_red":"Nicht vorgepackt",
					"dot_yellow":"Teilweise vorgepackt",
					"dot_green":"Komplett vorgepackt",
					"dot_orange":"Teil vorgepackt"
				  },
				  state_checkout:{//O
					"dot_greyoutline":"Kein CheckOut",
					"dot_transparent":"Kein CheckOut",
					"dot_red":"Kein CheckOut",
					"dot_yellow":"Teilweise ausgecheckt",
					"dot_green":"Komplett ausgecheckt",
					"dot_orange":"Teil ausgecheckt"
				  },
				  state_checkin:{//I
					"dot_greyoutline":"Kein CheckIn",
					"dot_transparent":"Kein CheckIn",
					"dot_red":"Kein CheckIn",
					"dot_yellow":"Teilweise eingecheckt",
					"dot_green":"Komplett eingecheckt",
					"dot_orange":"Teil eingecheckt"
				  },
				  state_billing:{//A
					"dot_greyoutline":"Nicht abgerechnet",
					"dot_transparent":"Nicht abgerechnet",
					"dot_red":"Nicht abgerechnet",
					"dot_yellow":"Teilweise abgerechnet",
					"dot_green":"Komplett abgerechnet",
					"dot_orange":"Teil abgerechnet"
				  }
			},
			invoice:{
	
				is_booked : {
					"true":"Gebucht",
					"false":"Nicht gebucht"
				  },
				  is_cleared : {
					"true":"Voll bezahlt",
					"false":"Nicht voll bezahlt"
				  }
	
			}
	
		}
		
		services.addEntity = {

			communication:function(array,obj){
				
				if (typeof(array) == "string") array = [];
    
				var obj_to_add = {
					
					$$hashKey: "", 
					contact_person_pk:0,
					contact_pk:76,
					description:"",
					is_invoice:false,
					is_newsletter:false,
					phone_match_number:"",
					position:0,
					primary_key:382,
					type:obj.type,
					uplink:""
				};

				array.push(obj_to_add);

				return array;

			}

		} 

		


		services.searchNavigate = {
			meetings:function(searchFilters,daysFilter){
				
				var url="";

				if (daysFilter && searchFilters.searchText == "") {
					url='/meetings/days/'+searchFilters.days;
				}

				else if (!daysFilter && searchFilters.searchText != ""){
					url='/meetings/text/'+searchFilters.searchText;
				}
			
				else if (daysFilter && searchFilters.searchText != ""){
					url='/meetings/days/'+searchFilters.days+'/text/'+searchFilters.searchText;
				}

				else {
					url='/meetings';
				}
    
			//console.dir(searchFilters);
			//console.log(url);

			services.tools.navigateTo(url);
			},

			tasks:function(searchFilters,daysFilter){
				var url="";

				if (daysFilter && searchFilters.searchText == "") {
					url='/tasks/days/'+searchFilters.days;
				}

				else if (!daysFilter && searchFilters.searchText != ""){
					url='/tasks/text/'+searchFilters.searchText;
				}
			//  /meetings/days/:filter_days/text/:filter_text
				else if (daysFilter && searchFilters.searchText != ""){
					url='/tasks/days/'+searchFilters.days+'/text/'+searchFilters.searchText;
				}

				else {
					url='/tasks';
				}
    
			//console.dir(searchFilters);
			//console.log(url);

			services.tools.navigateTo(url);
			},

			products:function(searchFilters){
				
				var str="products";
				var id=null;

				if (arguments.length>1) {//go to details
					id = arguments[1];
					str='product/'+id+'/f';
					
				}

				

				//alert(id);
				//console.dir(arguments);

				var searchText="/";
				if (searchFilters.searchText.length > 0) searchText = "/"+searchFilters.searchText;

				var productType = "/";
				if (searchFilters.isRent) productType="/rent";
				if (searchFilters.isSell) productType="/sell";

				var dateFrom = "/";
				var dateTo = "/";
				var timeFrom = "/";
				var timeTo = "/";

				var datesSelected = "/";

				if (searchFilters.datesSelected == true) {
				
					//console.log("2.searchFilters");
					//console.dir(searchFilters);

					datesSelected = "/1";
				if (searchFilters.dateFrom !="") dateFrom = "/"+searchFilters.dateFrom;
				if (searchFilters.dateTo !="") dateTo = "/"+searchFilters.dateTo;
				

				} 

				var url='/'+str+searchText+datesSelected+dateFrom+timeFrom+dateTo+timeTo+productType;
			

				////console.log(url);

			
				services.tools.navigateTo(url);
			},

			orders:function(searchFilters){
				
				var str="orders";
				var id = null;
				
				if (arguments.length>1) {//go to details
					id = arguments[1];
					str='order/'+id+'/f';
					
				}


				var searchText="/";
				if (searchFilters.searchText.length > 0) searchText = "/"+searchFilters.searchText;
				
				var orderType1 = "/";
				if (searchFilters.isRent) orderType1="/rent";
				if (searchFilters.isSell) orderType1="/sell";

				var orderType2 = "/";
				if (searchFilters.isDispo) orderType2="/dispo";
				if (searchFilters.isEvent) orderType2="/event";

				var dateFrom = "/";
				var dateTo = "/";
				var timeFrom = "/";
				var timeTo = "/";

				var datesSelected = "/";

				if (searchFilters.datesSelected == true) {
				
					//console.log("2.searchFilters");
					//console.dir(searchFilters);

					datesSelected = "/1";
				if (searchFilters.dateFrom !="") dateFrom = "/"+searchFilters.dateFrom;
				if (searchFilters.dateTo !="") dateTo = "/"+searchFilters.dateTo;
				

				} 
				
				var url='/'+str+searchText+datesSelected+dateFrom+timeFrom+dateTo+timeTo+orderType1+orderType2;

				//console.log(url);
				

				services.tools.navigateTo(url);
			},

			invoices:function(searchFilters){
				
				var str="invoices";
				var id = null;
				
				if (arguments.length>1) {//go to details
					id = arguments[1];
					str='invoice/'+id+'/f';
					
				}


				var searchText="/";
				if (searchFilters.searchText.length > 0) searchText = "/"+searchFilters.searchText;
				
				var invoiceType1 = "/";
				if (searchFilters.isRent) invoiceType1="/rent";
				if (searchFilters.isSell) invoiceType1="/sell";

				var invoiceType2 = "/";
				if (searchFilters.isDispo) invoiceType2="/dispo";
				if (searchFilters.isEvent) invoiceType2="/event";

				var dateFrom = "/";
				var dateTo = "/";
				var timeFrom = "/";
				var timeTo = "/";

				var datesSelected = "/";

				if (searchFilters.datesSelected == true) {
				
					//console.log("2.searchFilters");
					//console.dir(searchFilters);

					datesSelected = "/1";
				if (searchFilters.dateFrom !="") dateFrom = "/"+searchFilters.dateFrom;
				if (searchFilters.dateTo !="") dateTo = "/"+searchFilters.dateTo;
				//  timeFrom = "/"+searchFilters.timeFrom;
				//  timeTo = "/"+searchFilters.timeTo;

				} 
				
				var url='/'+str+searchText+datesSelected+dateFrom+timeFrom+dateTo+timeTo+invoiceType1+invoiceType2;

				//console.log(url);
				

				services.tools.navigateTo(url);
			}

		}
	
	
	}]);