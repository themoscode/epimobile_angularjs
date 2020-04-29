app.controller('treeViewController', function ($scope) {
 
 //TREEVIEW 
	  
	  
	  $scope.check_options = {checkboxes: true};
	  
	  
      $scope.click = function(dataItem) {
        alert(dataItem.text);
      };

      function makeItem() {
        var txt = kendo.toString(new Date(), "HH:mm:ss");
        return { text: "new" };
      };

      $scope.addAfter = function(item) {
        var array = item.parent();
        var index = array.indexOf(item);
        var newItem = makeItem();
        array.splice(index + 1, 0, newItem);
      };

      $scope.addBelow = function() {
        // can't get this to work by just modifying the data source
        // therefore we're using tree.append instead.
        var newItem = makeItem();
        $scope.tree.append(newItem, $scope.tree.select());
      };

      $scope.remove = function(item) {
        var array = item.parent();
        var index = array.indexOf(item);
        array.splice(index, 1);

        $scope.selectedItem = undefined;
      };

//TREEVIEW 
 
 
});