app.controller('invoiceInsertController',['services','$timeout',function(services,$timeout){
    
    $timeout(function(){
        services.tools.navigateTo('/invoice/817');
    },4000);
    
}]);//themos
        