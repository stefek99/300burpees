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


app.controller("StartCtrl", function($scope) {
  $scope.message = "start";
});

app.controller("CountdownCtrl", function($scope) {
  $scope.message = "countdown";
});