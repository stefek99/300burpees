app.service("CountdownService", function($interval) {
  var startTimestamp;
  var elapsed = {
    time : 0
  };

  var start = function() {
    startTimestamp = new Date().getTime();
    $interval(function() {
      var now = new Date().getTime();
      elapsed.time = now - startTimestamp;
    }, 51); // some funny number so it looks nice
  };

  return {
    start: start,
    elapsed : elapsed
  };
});