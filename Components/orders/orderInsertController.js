app.controller('orderInsertController',['services','$timeout',function(services,$timeout){
    
    $timeout(function(){
        services.tools.navigateTo('/order/9142');
    },4000);
    
}]);//themos
        