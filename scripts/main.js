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
      redirectTo: '/start'
    });
});

app.run(function($rootScope) {
  $rootScope.time = {
    hours: 0,
    minutes: 10,
    seconds: 0,
    howmany: 100
  };
});