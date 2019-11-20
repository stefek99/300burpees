app.filter('unsafe', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);

app.filter('mydate', function(){
  return function(text, extra) {
    // https://stackoverflow.com/a/39209842/775359
    var date = new Date(text)
    var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    var newdate = new Date(date.getTime() + userTimezoneOffset);

    return /* pad(newdate.getHours(),2) + ":" + */ pad(newdate.getMinutes(),2) + ":" + pad(newdate.getSeconds(),2) 
           + (extra ? ":" + pad(newdate.getMilliseconds(), 3) : "");
  };
});

app.filter('pad', [function(){
  return function(text, width) { 
    return pad(text, width)
  };
}]);

function pad(text, width) { 
  text = text + ''; // converting to string because if we pass number it will fail
  return text.length >= width ? text : new Array(width - text.length + 1).join('0') + text;
};