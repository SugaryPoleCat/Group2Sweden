var schedule = angular.module('osSchema', []);
schedule.controller('schemaCtrl',function($scope,$http){
    $http.get("schedule2.json").then(function(response){
        $scope.myData=response.data;
    });
});