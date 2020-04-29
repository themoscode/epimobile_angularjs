

    app.controller('confirmDelKapitelCtrl', ['$scope','$uibModalInstance','obj','services' ,function ($scope, $uibModalInstance,obj,services) {
		
    
        $scope.move_to_main_list = function() {
            //alert("in Hauptliste übertragen");  

            angular.forEach(obj.__chapter_items, function(item, index) {
                        
                $scope.getOrder.order_items.push(item);
                   
            });

            services.tools.removeObjectFromArray($scope.getOrder.order_items,obj,'primary_key');
            $uibModalInstance.close();	
        };
      
        $scope.delete = function () {
            
            services.tools.removeObjectFromArray($scope.getOrder.order_items,obj,'primary_key');
            $uibModalInstance.close();	
        };
          
          
      }]);