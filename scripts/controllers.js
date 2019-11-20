app.controller("StartCtrl", function($rootScope, $scope, $location) {

  $scope.start = function() {
    $rootScope.started = true;
    $location.path("/countdown");
  };

});

app.controller("CountdownCtrl", function($rootScope, $scope, $location, CountdownService) {
  if (!$rootScope.started) {
    $location.path("/start");
  }

  var totalSeconds = ($rootScope.settings.hours * 3600) + ($rootScope.settings.minutes * 60) + $rootScope.settings.seconds;
  var secondsForOne = 1000 * totalSeconds / $rootScope.settings.howmany;
  // console.log("totalSeconds: " + totalSeconds);
  // console.log("secondsForOne: " + secondsForOne);
  
  CountdownService.start();

  $scope.times = [];
  $scope.elapsed = CountdownService.elapsed; // need to pass object (because primitive types are copied)


  for (var i=10; i<=$rootScope.settings.howmany; i+=10) {
    $scope.times.push({ "howmany" : i});
  }

  $scope.howmany = 0; // how many we did so far

  $scope.one = function() {
    $scope.howmany++;
    if ($scope.howmany % 10 === 0) { // HACK HACK HACK - once we do 10 this way, we resolve to known and tested function
      $scope.howmany -= 10;
      $scope.ten();
    }
  }

  $scope.ten = function() {

    var _pushInfo = function() {
      $scope.times[index].stage = (index === 0) ? CountdownService.elapsed.time : (CountdownService.elapsed.time - $scope.times[index-1].cumulative);
      $scope.times[index].cumulative = (index === 0) ? 0 : CountdownService.elapsed.time;

      var optimalTimeNow  = $scope.howmany * secondsForOne;
      var aheadSign = CountdownService.elapsed.time - optimalTimeNow < 0;
      var aheadDifference = Math.abs(CountdownService.elapsed.time - optimalTimeNow);

      $scope.times[index].ahead = { sign : aheadSign, difference : aheadDifference };
    };

    var index = Math.floor($scope.howmany / 10); // convenient shorthand (if we are just starting we will be pushing to the 0 element of the array)
    $scope.howmany += 10;
    
    if ($scope.howmany >= $rootScope.settings.howmany) { // YEAH! Finish! Hurray!
      if ($scope.finalTime) {
        return;
      }
      CountdownService.stop(); // We also need to display some helpful messages and offer new options etc...
      $scope.finalTime = CountdownService.elapsed.time; // In this place we want primitive object to avoid copying
      _pushInfo();
    } else { // Not finish yet, more to go...
      _pushInfo();
    }
  };

});