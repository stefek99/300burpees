app.directive("coloured", function() {
  return {
    scope: {
      value:"="
    },

    template : "{{ value | date:'mm:ss'}}" // TODO: now I should be able to apply some styles
  };
});