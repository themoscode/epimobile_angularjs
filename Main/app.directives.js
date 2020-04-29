
app.directive("backButton", ["$window", function ($window) {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.bind("click", function () {
                $window.history.back();
            });
        }
    };
}]);

app.directive('windowWidth', ['$window', function ($window) {
    return {
       link: link,
       restrict: 'A'           
    };
    function link(scope, element, attrs){
       scope.width = $window.innerWidth;
       
           function onResize(){
              // console.log("width="+$window.innerWidth);
               // uncomment for only fire when $window.innerWidth change   
               if (scope.width !== $window.innerWidth)
               {
                   scope.width = $window.innerWidth;
                   scope.$digest();
               }
           };

           function cleanUp() {
               angular.element($window).off('resize', onResize);
           }

           angular.element($window).on('resize', onResize);
           scope.$on('$destroy', cleanUp);
    }    
}]);


app.directive('emitChange', function() {
    return function(scope, elem, attr) {
      elem.on('switchChange.bootstrapSwitch', function (e) {
        scope.$emit('switchChanged', e.target.checked, attr.emitChange);
      })
    }
  })