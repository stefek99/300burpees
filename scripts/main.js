var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/start', {
      templateUrl: 'templates/start.html',
      controller: 'StartCtrl',
    })  
    .when('/countdown', {
      templateUrl: 'templates/countdown.html',
      controller: 'CountdownCtrl',
    })           
    .otherwise({
      redirectTo: '/'
    });
});

app.run(function($rootScope, $location){

});

app.filter('unsafe', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);



app.filter('pad', [function(){
  return function(text, width) { 
    text = text + '';
    return text.length >= width ? text : new Array(width - text.length + 1).join('0') + text;
  };
}]);


app.controller("StartCtrl", function($rootScope, $scope, $window) {

  $rootScope.howmany = 20;
  $rootScope.time = {
    hours: 0,
    minutes: 3,
    seconds: 0
  };

  $scope.message = "start";
});

app.controller("CountdownCtrl", function($scope) {
  $scope.message = "countdown";
});