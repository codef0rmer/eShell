'use strict';

App.factory('checker', function ($location) {
  return {
    isSubmit: false,

    isTryagain: false,

    isShowans: false,

    attempt: 1,

    totalAttempts: 3,

    currentTemplate: 1,

    totalTemplates: 1,

    submit: function () { },

    tryagain: function () { },

    showAns: function () { },

    getProperty: function(property) {
      return this[property];
    },

    setProperty: function(property, value) {
      this[property] = value;
    },

    invoke: function(property) {
      this[property]();
    },

    reset: function($scope) {
      this.setProperty('isSubmit', false);
      this.setProperty('isTryagain', false);
      this.setProperty('isShowans', false);
      this.setProperty('submit', $scope['submit']);
      this.setProperty('tryagain', $scope['tryagain']);
      this.setProperty('showans', $scope['showans']);
      this.setProperty('attempt', 1);
      this.setProperty('currentTemplate', parseInt($location.path().substring(1), false));
    }
  };
});
