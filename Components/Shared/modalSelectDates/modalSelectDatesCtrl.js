//app.controller('modalSelectDatesCtrl', ['$rootScope','$scope','$uibModalInstance','services' ,function ($rootScope, $scope, $uibModalInstance,services) {
  app.controller('modalSelectDatesCtrl', ['$scope','$uibModalInstance','services' ,function ($scope, $uibModalInstance,services) {
		
    
  $scope.ok = function() {
      
    $uibModalInstance.close();	
      
      $scope.searchFilters.dateFrom = services.tools.dateStr($scope.dateSelectorFrom.date);
      $scope.searchFilters.dateTo = services.tools.dateStr($scope.dateSelectorTo.date);
      
      $scope.searchFilters.timeFrom = services.tools.timeStr($scope.timeSelectorFrom.time);
      $scope.searchFilters.timeTo = services.tools.timeStr($scope.timeSelectorTo.time);

      $scope.searchFilters.datesSelected = true;
      $scope.datesSelector.setLabel($scope.searchFilters);

     // console.log("1.searchFilters");
     // console.dir($scope.searchFilters);
      $scope.searchNavigate($scope.searchFilters);

  };

  $scope.cancel = function() {

     $scope.searchFilters.datesSelected = false;
     $scope.datesSelector.setLabel($scope.searchFilters);
     console.dir($scope.searchFilters);
     $scope.searchNavigate($scope.searchFilters);

     $uibModalInstance.close();	
  
  };
  
  /*date options*/
  
   // Disable weekend selection
   function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  //var dateFrom = moment().toDate();
  //var dateTo = moment().toDate();

  var dateFrom = new Date();
  var dateTo = new Date();

  if ($scope.searchFilters.datesSelected) {
    dateFrom = new Date(services.tools.dateYMDorDMY($scope.searchFilters.dateFrom).replace(/\./g, "-"));
    dateTo = new Date(services.tools.dateYMDorDMY($scope.searchFilters.dateTo).replace(/\./g, "-"));
  }
  
  $scope.dateSelectorFrom = {
    
    altInputFormats:['d!/M!/yyyy'],
    format:"dd.MM.yyyy",
    date:dateFrom,
    opened:false,
    dateOptions : {
     // dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      //minDate: new Date(),
      startingDay: 1
    },
    open:function(){
      this.opened = true;
    }
  
  }

  $scope.dateSelectorTo = {
        
    altInputFormats:['d!/M!/yyyy'],
    format:"dd.MM.yyyy",
    date:dateTo,
    opened:false,
    dateOptions : {
     // dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      //minDate: new Date(),
      startingDay: 1
    },
    open:function(){
      this.opened = true;
    }
  
  }

  /*date options end*/
   
  $scope.timeSelectorFrom = {

    time : new Date()
  
  }

  $scope.timeSelectorTo = {
    
    time : new Date()

  }

  $scope.setTime = function(timeSelector,timeStr){

    if (timeStr == "") return;
    var d = new Date();
    d.setHours( timeStr.split(":")[0] );
    d.setMinutes( timeStr.split(":")[1] );
    timeSelector.time = d;

  }


  $scope.setTime($scope.timeSelectorFrom,$scope.searchFilters.timeFrom);
  $scope.setTime($scope.timeSelectorTo,$scope.searchFilters.timeTo);
    
}]);