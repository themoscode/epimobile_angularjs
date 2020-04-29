app.controller('contactInsertController',['services','$timeout',function(services,$timeout){
    
    $timeout(function(){
        services.tools.navigateTo('/contact/460');
    },4000);
    
}]);//themos
        