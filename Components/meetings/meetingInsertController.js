app.controller('meetingInsertController',['services','$timeout',function(services,$timeout){
    
    $timeout(function(){
        services.tools.navigateTo('/meeting/7');
    },4000);
    
}]);//themos
        