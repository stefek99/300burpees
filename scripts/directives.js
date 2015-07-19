app.directive("coloured", function() {
  return {
    scope: {
      value:"="
    },

    template : "{{ value }}" // TODO: now I should be able to apply some styles
  };
});