app.controller("StartCtrl", function($rootScope, $scope, $interval, $location, $window) {

  $scope.start = function() {
    $rootScope.started = true;
    $location.path("/countdown");
  };

});

app.controller("CountdownCtrl", function($rootScope, $scope, $location, CountdownService) {
  if (!$rootScope.started) {
    $location.path("/start");
  }

  var totalSeconds = ($rootScope.time.hours * 3600) + ($rootScope.time.minutes * 60) + $rootScope.time.seconds;
  console.log("totalSeconds: " + totalSeconds);
  var secondsForOne = 1000 * totalSeconds / $rootScope.time.howmany;
  console.log("secondsForOne: " + secondsForOne);
  
  CountdownService.start();

  $scope.times = [];
  $scope.elapsed = CountdownService.elapsed; // need to pass object (because primitive types are copied)
  

  for (var i=10; i<=$rootScope.time.howmany; i+=10) {
    $scope.times.push({ "howmany" : i});
  }


  var howmany = 0;
  $scope.ten = function() {

    var _pushInfo = function() {
      $scope.times[index].stage = (index === 0) ? CountdownService.elapsed.time : (CountdownService.elapsed.time - $scope.times[index-1].cumulative);
      $scope.times[index].cumulative = (index === 0) ? 0 : CountdownService.elapsed.time;
    };

    var index = howmany / 10; // convenient shorthand (if we are just starting we will be pushing to the 0 element of the array)
    howmany += 10;
    

    if (howmany >= $rootScope.time.howmany) { // YEAH! Finish! Hurray!
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

  // $scope.$watch(function() {
  //   return times;
  // }, function() {
  //   console.log(times);
  //   $scope.times = []; // RISKY! (we are changing watched value in a watch function)
  //   for (var i=1; i<times.length; i++) { // zaczynamy od pierwszego
  //     var currentTenTime = times[i].time - times[i-1].time;
  //     var plusTooSlow = (currentTenTime - (secondsForOne*10)) > 0;
  //     $scope.times.push({current : currentTenTime, plus : plusTooSlow, difference : currentTenTime - secondsForOne});
  //   }
  // }, true);
});