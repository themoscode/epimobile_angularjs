//app.controller('modalSelectDatesCtrl2', ['$rootScope','$scope','$uibModalInstance','services','obj' ,function ($rootScope, $scope, $uibModalInstance,services,obj) {
  app.controller('modalSelectDateCtrl', ['$scope','$uibModalInstance','services','obj' ,function ($scope, $uibModalInstance,services,obj) {
    
    
  
    /////////////////////
    var date = services.tools.dateFrom4d(obj.date);
    ////////////////////
  
    var time = new Date();
    time.setHours(services.tools.hoursMins(obj.time).hours);
    time.setMinutes(services.tools.hoursMins(obj.time).mins);
  
    
  
    $scope.ok = function() {
      
      if ($scope.dateSelector.date!="Invalid Date" && $scope.dateSelector.date!=undefined && $scope.timeSelector.time!=null) {
  
        obj.date = services.tools.dateYMDorDMY(services.tools.dateStr($scope.dateSelector.date)).replace(/\./g, "-");
        obj.time = services.tools.hoursMinsInMS($scope.timeSelector.time.getHours(),$scope.timeSelector.time.getMinutes());
        
      }
  
      $uibModalInstance.close();
      
    }
    
    $scope.cancel = function() {
      $uibModalInstance.close();	
    };
    
     // Disable weekend selection
     function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
  
    $scope.dateSelector = {
          
          altInputFormats:['d!/M!/yyyy'],
          format:"dd.MM.yyyy",
          date:new Date(services.tools.dateYMDorDMY(date).replace(/\./g, "-")),
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
  
        /*date options end*/
         
        $scope.timeSelector = {
      
          time : time
      
        }
      
       
  
      
  }]);