app.controller("StartCtrl", function($rootScope, $scope, $location, $window) {

  $rootScope.howmany = 20;
  $rootScope.time = {
    hours: 0,
    minutes: 3,
    seconds: 0
  };

  $scope.start = function() {
    $location.path("/countdown");
  };
});

app.controller("CountdownCtrl", function($scope, CountdownService) {
  CountdownService.start();
  var howmany = 0;
  $scope.times = [];

  $scope.elapsed = CountdownService.elapsed; // need to pass object (because primitive types are copied)
  
  $scope.ten = function() {
    howmany += 10;
    $scope.times.push({howmany : howmany, time: CountdownService.elapsed.time});

  };
});