//app.controller('modalSelectDatesCtrl2', ['$rootScope','$scope','$uibModalInstance','services','obj' ,function ($rootScope, $scope, $uibModalInstance,services,obj) {
app.controller('modalSelectDatesCtrl2', ['$scope','$uibModalInstance','services','obj' ,function ($scope, $uibModalInstance,services,obj) {
	// converts date and time from/to 4d 
  
  if (obj.showTime) $scope.showTime=true;

  console.log("******************");
  console.dir(obj);

  /////////////////////

  var dateFrom = services.tools.dateFrom4d(obj.date_start);
  var dateTo = "";
  if (obj.is_end_date) dateTo = services.tools.dateFrom4d(obj.date_end);
  
 
  ////////////////////

  var timeFrom = new Date();
  timeFrom.setHours(services.tools.hoursMins(obj.time_start).hours);
  timeFrom.setMinutes(services.tools.hoursMins(obj.time_start).mins);

  var timeTo = null;
 

  if (obj.is_end_date) {

    var timeTo = new Date();
    timeTo.setHours(services.tools.hoursMins(obj.time_end).hours);
    timeTo.setMinutes(services.tools.hoursMins(obj.time_end).mins);

  }

  
  $scope.ok = function() {
    
    if ($scope.dateSelectorFrom.date!="Invalid Date" && $scope.dateSelectorFrom.date!=undefined && $scope.timeSelectorFrom.time!=null) {

      obj.date_start = services.tools.dateYMDorDMY(services.tools.dateStr($scope.dateSelectorFrom.date)).replace(/\./g, "-");
      obj.time_start = services.tools.hoursMinsInMS($scope.timeSelectorFrom.time.getHours(),$scope.timeSelectorFrom.time.getMinutes());
      
    }

    obj.is_end_date = false;

    if ($scope.dateSelectorTo.date!="Invalid Date" && $scope.dateSelectorTo.date!=undefined && $scope.timeSelectorTo.time!=null) {
      obj.date_end = services.tools.dateYMDorDMY(services.tools.dateStr($scope.dateSelectorTo.date)).replace(/\./g, "-");
      obj.time_end = services.tools.hoursMinsInMS($scope.timeSelectorTo.time.getHours(),$scope.timeSelectorTo.time.getMinutes());
      obj.is_end_date = true;
    }

    console.log("date_start2",obj.date_start);
    console.log("date_end2",obj.date_end);

    $uibModalInstance.close();
    
  }
  

  console.log("date_start1",obj.date_start);
  console.log("date_end1",obj.date_end);
    

  $scope.cancel = function() {
   
    $uibModalInstance.close();	
  };
  
   // Disable weekend selection
   function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.dateSelectorFrom = {
        
        altInputFormats:['d!/M!/yyyy'],
        format:"dd.MM.yyyy",
        date:new Date(services.tools.dateYMDorDMY(dateFrom).replace(/\./g, "-")),
        opened:false,
        dateOptions : {
        //  dateDisabled: disabled,
          formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
         // minDate: new Date(),
          startingDay: 1
        },
        open:function(){
          this.opened = true;
        }
      
      }

  $scope.dateSelectorTo = {

        altInputFormats:['d!/M!/yyyy'],
        format:"dd.MM.yyyy",
        date:new Date(services.tools.dateYMDorDMY(dateTo).replace(/\./g, "-")),
        opened:false,
        dateOptions : {
       //   dateDisabled: disabled,
          formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
       //   minDate: new Date(),
          startingDay: 1
        },
        open:function(){
          this.opened = true;
        }
      
      }
    
      /*date options end*/
       
      $scope.timeSelectorFrom = {
    
        time : timeFrom
    
      }
    
      $scope.timeSelectorTo = {
        
        time : timeTo
        
      }

    
}]);