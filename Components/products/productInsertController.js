app.controller('productInsertController',['services','$timeout',function(services,$timeout){
    
    $timeout(function(){
        services.tools.navigateTo('/product/460');
    },4000);
    
}]);//themos
        