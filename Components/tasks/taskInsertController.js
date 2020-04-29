app.controller('taskInsertController',['services','$timeout',function(services,$timeout){
    
    $timeout(function(){
        services.tools.navigateTo('/task/24');
    },4000);
    
}]);//themos
        