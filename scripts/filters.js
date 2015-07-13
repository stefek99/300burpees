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