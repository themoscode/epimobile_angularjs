//app.controller('chatController', [ '$scope','$rootScope','$http','$location',function ($scope, $rootScope, $http,$location) {
	app.controller('chatController', ['$scope',function ($scope) {

	 $scope.$parent.siteTitle = "Chat";
	
	//alert($scope.siteTitle);
	
}]);