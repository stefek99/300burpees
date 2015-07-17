app.service("CountdownService", function($interval) {
  var startTimestamp;
  var elapsed = { // we are using object to avoid primitive types that are copied
    time : 0
  };
  var interval;

  var start = function() {
    startTimestamp = new Date().getTime();
    interval = $interval(function() {
      var now = new Date().getTime();
      elapsed.time = now - startTimestamp;
    }, 51); // some funny number so it looks nice
  };

  var stop = function() {
    $interval.cancel(interval); // TODO: for some reason it doesn't work
  };

  return {
    start: start,
    stop: stop,
    elapsed : elapsed
  };
});