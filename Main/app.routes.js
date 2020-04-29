
app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    
    $routeProvider.when('/home', {
            templateUrl: 'Components/home/index.html',
            controller: 'homeController'
      }).

      when('/home/text/:filter_text', {
            templateUrl: 'Components/home/index.html',
            controller: 'homeController'
      }).

      when('/login', {
            templateUrl: 'Components/login/index.html',
            controller: 'loginController'
      }).
      
      when('/meetings', {
            templateUrl: 'Components/meetings/meetingsList/index.html',
            controller: 'meetingsListController'
      }).
      
      when('/meetings/text/:filter_text', {
            templateUrl: 'Components/meetings/meetingsList/index.html',
            controller: 'meetingsListController'
      }).
      
      when('/meetings/days/:filter_days', {
            templateUrl: 'Components/meetings/meetingsList/index.html',
            controller: 'meetingsListController'
      }).

      when('/meetings/days/:filter_days/text/:filter_text', {
            templateUrl: 'Components/meetings/meetingsList/index.html',
            controller: 'meetingsListController'
      }).

      when('/meeting/:meetingID', {
            templateUrl: 'Components/meetings/meetingDetails/index.html',
            controller:'meetingDetailsController'
      }).
      when('/meeting/:meetingID/f/days/:filter_days', {
            templateUrl: 'Components/meetings/meetingDetails/index.html',
            controller:'meetingDetailsController'
      }).
      when('/meeting/:meetingID/f/text/:filter_text', {
            templateUrl: 'Components/meetings/meetingDetails/index.html',
            controller:'meetingDetailsController'
      }).
      when('/meeting/:meetingID/f/days/:filter_days/text/:filter_text', {
            templateUrl: 'Components/meetings/meetingDetails/index.html',
            controller:'meetingDetailsController'
      }).
      when('/meetingInsert', {
            templateUrl: 'Components/Shared/addEntity/index.html',
            controller: 'meetingInsertController'
      }).
      when('/contacts/:filter_text?', {
            templateUrl: 'Components/contacts/contactsList/index.html',
            controller: 'contactsListController'
      }).
      when('/contact/:contactID', {
            templateUrl: 'Components/contacts/contactDetails/index.html',
            controller: 'contactDetailsController'
      }).
      when('/contactInsert', {
            templateUrl: 'Components/Shared/addEntity/index.html',
            controller: 'contactInsertController'
      }).
      when('/products/:filter_text?/:datesSelected?/:dateFrom?/:timeFrom?/:dateTo?/:timeTo?/:productType?', {
            templateUrl: 'Components/products/productsList/index.html',
            controller: 'productsListController'
      }).
      when('/product/:productID', {
            templateUrl: 'Components/products/productDetails/index.html',
            controller: 'productDetailsController'
      }).
      when('/product/:productID/f/:filter_text?/:datesSelected?/:dateFrom?/:timeFrom?/:dateTo?/:timeTo?/:productType?', {
            templateUrl: 'Components/products/productDetails/index.html',
            controller: 'productDetailsController'
            }).
      when('/productInsert', {
            templateUrl: 'Components/Shared/addEntity/index.html',
            controller: 'productInsertController'
      }).      
       when('/orders/:filter_text?/:datesSelected?/:dateFrom?/:timeFrom?/:dateTo?/:timeTo?/:orderType1?/:orderType2?', {
            templateUrl: 'Components/orders/ordersList/index.html',
            controller: 'ordersListController'
      }).
      when('/order/:orderID', {
            templateUrl: 'Components/orders/orderDetails/index.html',
            controller: 'orderDetailsController'
      }).
      when('/order/:orderID/f/:filter_text?/:datesSelected?/:dateFrom?/:timeFrom?/:dateTo?/:timeTo?/:orderType1?/:orderType2?', {
            templateUrl: 'Components/orders/orderDetails/index.html',
            controller: 'orderDetailsController'
            }).
      when('/orderInsert', {
            templateUrl: 'Components/Shared/addEntity/index.html',
            controller: 'orderInsertController'
      }).

      when('/tasks', {
            templateUrl: 'Components/tasks/tasksList/index.html',
            controller: 'tasksListController'
      }).

      when('/tasks/text/:filter_text', {
            templateUrl: 'Components/tasks/tasksList/index.html',
            controller: 'tasksListController'
      }).

      when('/tasks/days/:filter_days', {
            templateUrl: 'Components/tasks/tasksList/index.html',
            controller: 'tasksListController'
      }).

      when('/tasks/days/:filter_days/text/:filter_text', {
            templateUrl: 'Components/tasks/tasksList/index.html',
            controller: 'tasksListController'
      }).

      when('/task/:taskID', {
            templateUrl: 'Components/tasks/taskDetails/index.html',
            controller: 'taskDetailsController'
      }).
      when('/task/:taskID/f/days/:filter_days', {
            templateUrl: 'Components/tasks/taskDetails/index.html',
            controller:'taskDetailsController'
      }).
      when('/task/:taskID/f/text/:filter_text', {
            templateUrl: 'Components/tasks/taskDetails/index.html',
            controller:'taskDetailsController'
      }).
      when('/task/:taskID/f/days/:filter_days/text/:filter_text', {
            templateUrl: 'Components/tasks/taskDetails/index.html',
            controller:'taskDetailsController'
      }).
     
      when('/taskInsert', {
            templateUrl: 'Components/Shared/addEntity/index.html',
            controller: 'taskInsertController'
      }).
      when('/teamAgenda', {
            templateUrl: 'Components/teamAgenda/index.html',
            controller: 'teamAgendaController as vm'
      })
      .
      when('/timeTracking', {
            templateUrl: 'Components/timeTracking/index.html',
            controller: 'timeTrackingController'
      }).
      
      when('/invoices/:filter_text?/:datesSelected?/:dateFrom?/:timeFrom?/:dateTo?/:timeTo?/:invoiceType1?/:invoiceType2?', {
            templateUrl: 'Components/invoices/invoicesList/index.html',
            controller: 'invoicesListController'
	
      }).
      when('/invoice/:invoiceID', {
            templateUrl: 'Components/invoices/invoiceDetails/index.html',
            controller: 'invoiceDetailsController'
      }).
      when('/invoice/:invoiceID/f/:filter_text?/:datesSelected?/:dateFrom?/:timeFrom?/:dateTo?/:timeTo?/:invoiceType1?/:invoiceType2?', {
            templateUrl: 'Components/invoices/invoiceDetails/index.html',
            controller: 'invoiceDetailsController'
      }).
      when('/invoiceInsert', {
            templateUrl: 'Components/Shared/addEntity/index.html',
            controller: 'invoiceInsertController'
      }).

      when('/chat', {
            templateUrl: 'Components/chat/index.html',
            controller: 'chatController'
	
      }).
      otherwise({
       redirectTo: '/home'
    });
    
    //$locationProvider.html5Mode(true);

}]);
