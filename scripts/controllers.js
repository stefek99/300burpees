app.controller("StartCtrl", function($rootScope, $scope, $location) {

  $scope.start = function() {
    $rootScope.settings.time = new Date(0,0,0,$rootScope.settings.hours,$rootScope.settings.minutes,$rootScope.settings.seconds) - new Date(0,0,0,0,0,0)
    $rootScope.started = true;
    $location.path("/countdown");
  };

});

app.controller("CountdownCtrl", function($rootScope, $scope, $location, CountdownService) {
  if (!$rootScope.started) {
    $location.path("/start");
  }

  CountdownService.start($rootScope.settings.minutes, $rootScope.settings.seconds);

  var totalSeconds = ($rootScope.settings.hours * 3600) + ($rootScope.settings.minutes * 60) + $rootScope.settings.seconds;
  var secondsForOne = 1000 * totalSeconds / $rootScope.settings.howmany;

  $scope.howmany = 0; // how many we did so far
  $scope.times = [];
  $scope.elapsed = CountdownService.elapsed; // need to pass object (because primitive types are copied)
 
  // if we press "one" many times it will call "ten" internally
  $scope.one = function() {
    $scope.howmany++;
    if ($scope.howmany % 10 === 0) { // HACK HACK HACK - once we do 10 this way, we resolve to known and tested function
      $scope.howmany -= 10;
      $scope.ten();
    }
  }

  $scope.ten = function() {
    $scope.howmany += 10;
    
    if ($scope.howmany >= $rootScope.settings.howmany && !$scope.finalTime) { // YEAH! We've just finished
      $scope.finalTime = CountdownService.elapsed.time; // In this place we want primitive object to avoid copying
      _pushInfo();
    } else { // Not finish yet, more to go...
      _pushInfo();
    }
  };

  var _pushInfo = function() {
    var data = {
      howmany: $scope.howmany,
      cumulative: CountdownService.elapsed.time
    }

    data.stage = $scope.times.length === 0 ? CountdownService.elapsed.time : CountdownService.elapsed.time - $scope.times[0].cumulative
    data.par   = $scope.howmany * secondsForOne;
    data.ahead = CountdownService.elapsed.time < data.par;
    data.diff  = Math.abs(CountdownService.elapsed.time - data.par);

    $scope.times.unshift(data);
  };

  $scope.restart = function() {
    if (confirm("Restart sir?")) {
      $location.path("/start");
    }
  }

});