'use strict';

App.controller('FooterCtrl', function ($scope, checker, $location) {
  $scope.isEnable = function(button) {
    return checker.getProperty(button);
  };

  $scope.invoke = function(button) {
    checker.invoke(button);
  };

  $scope.attempt = function() {
    return checker.getProperty('attempt');
  };

  $scope.totalAttempts = function() {
    return checker.getProperty('totalAttempts');
  };

  $scope.currentTemplate = function() {
    return checker.getProperty('currentTemplate');
  };

  $scope.totalTemplates = function() {
    return checker.getProperty('totalTemplates');
  };

  $scope.prevTemplate = function() {
    $location.path('/' + (checker.getProperty('currentTemplate') - 1));
  };

  $scope.nextTemplate = function() {
    $location.path('/' + (checker.getProperty('currentTemplate') + 1));
  };
});
