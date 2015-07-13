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

app.run(function($rootScope, $location){

});

app.filter('unsafe', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);

app.filter('pad', [function(){
  return function(text, width) { 
    text = text + ''; // converting to string because if we pass number it will fail
    return text.length >= width ? text : new Array(width - text.length + 1).join('0') + text;
  };
}]);

app.filter('time', [function(){
  return function(text) { // http://jsbin.com/gist/4372563?html,js,output
    var h, m, s, ms; // https://jslinterrors.com/variable-a-was-not-declared-correctly
    h = m = s = ms = 0;

    var time = parseInt(text, 10);
    var newTime = '';

    h = Math.floor( time / (60 * 60 * 1000) );
    time = time % (60 * 60 * 1000);
    m = Math.floor( time / (60 * 1000) );
    time = time % (60 * 1000);
    s = Math.floor( time / 1000 );
    ms = time % 1000;

    var pad = function(num, size) { // TODO: use only one pad function
      var s = "0000" + num;
      return s.substr(s.length - size);
    };

    newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
    return newTime;
  };
}]);