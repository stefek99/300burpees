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
  times = [{howmany: 0, time: 0}];

  $scope.elapsed = CountdownService.elapsed; // need to pass object (because primitive types are copied)
  
  $scope.ten = function() {
    howmany += 10;
    times.push({howmany : howmany, time: CountdownService.elapsed.time});

  };

  $scope.$watch(function() {
    return times;
  }, function() {
    console.log(times);
    $scope.times = [];
    for (var i=1; i<times.length; i++) { // zaczynamy od pierwszego
      $scope.times.push(times[i].time - times[i-1].time);
    }
  }, true);
});