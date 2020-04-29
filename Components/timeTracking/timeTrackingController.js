//app.controller('timeTrackingController', [ '$scope','$http','$location','$uibModal',function ($scope, $http,$location,$uibModal) {
  app.controller('timeTrackingController', [ '$scope','$uibModal',function ($scope, $uibModal) {

	$scope.openMaterialModal = function () {
        
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'Components/orders/orderDetails/Widgets/modalMaterial/index.html',
          controller: 'modalMaterialCtrl'
          
        });
      
      
      };  

      // timer start
      function get_elapsed_time_string(total_seconds) {
        function pretty_time_string(num) {
          return (num < 10 ? "0" : "") + num;
        }
      
        var hours = Math.floor(total_seconds / 3600);
        total_seconds = total_seconds % 3600;
      
        var minutes = Math.floor(total_seconds / 60);
        total_seconds = total_seconds % 60;
      
        var seconds = Math.floor(total_seconds);
      
        // Pad the minutes and seconds with leading zeros, if required
        hours = pretty_time_string(hours);
        minutes = pretty_time_string(minutes);
        seconds = pretty_time_string(seconds);
        
        // Compose the string for display
        var currentTimeString = hours + " Stunden " + minutes + " Min " + seconds + " Sec ";
      
        return currentTimeString;
      }
      
      var elapsed_seconds = 0;
      
      $scope.timerRuns = false;
      
      var showTimer = function(){
        document.getElementById('timer').value = get_elapsed_time_string(elapsed_seconds);
      
      }


      $scope.toggleTimer = function(){

        $scope.timerRuns =!$scope.timerRuns;

        if ($scope.timerRuns) {
          $scope.startTimer();
        }
        else {
          $scope.stopTimer(); 
        }

      }

      
      $scope.startTimer = function(){
          
          //$scope.timerRuns = true;
          myVar = setInterval(function () {
          elapsed_seconds = elapsed_seconds + 1;
          showTimer();  
        }, 1000);
      }
      
      $scope.stopTimer = function() {
        
          //$scope.timerRuns = false;
          clearInterval(myVar);
      }

      $scope.resetTimer = function() {
        
          
          elapsed_seconds = 0;
          $scope.timerRuns = false;
          $scope.stopTimer();
          showTimer(); 

      }
        
      showTimer();  

      
      // timer end	
}]);

