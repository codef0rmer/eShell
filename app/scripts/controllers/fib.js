'use strict';

App.controller('FibCtrl', function ($scope, eywa, checker) {
  eywa.worship('data/fib.json').then(function(data) {
    $scope.data = data.data;
  });

  $scope.validate = function(isValid) {
    checker.setProperty('isSubmit', isValid);
  };

  $scope.setClass = function(param) {
    if (!angular.isDefined(param)) { return ''; }
    return param === true ? 'success' : 'error';
  };

  $scope.submit = function() {
    var isValid,
        totalValid = 0,
        attemptsLapse = checker.getProperty('attempt') >= checker.getProperty('totalAttempts');

    $scope.data.choices.forEach(function(choice, index) {
      isValid = choice.val2.split(',').indexOf($scope['input_' + index]) !== -1;

      if (isValid) { totalValid++; }

      $scope['input_' + index + '_valid'] = isValid;
      $scope['input_' + index + '_readonly'] = true;
    });

    checker.setProperty('isTryagain', totalValid !== $scope.data.choices.length && !attemptsLapse);
    checker.setProperty('isShowans', totalValid !== $scope.data.choices.length && attemptsLapse);
    checker.setProperty('isSubmit', false);
  };

  $scope.tryagain = function() {
    $scope.data.choices.forEach(function(choice, index) {
      if (!$scope['input_' + index + '_valid']) {
        $scope['input_' + index + '_valid'] = undefined;
        $scope['input_' + index + '_readonly'] = false;
        $scope['input_' + index] = '';
      }
    });
    checker.setProperty('isTryagain', false);
    checker.setProperty('attempt', checker.getProperty('attempt') + 1);
  };

  $scope.showans = function() {
    $scope.data.choices.forEach(function(choice, index) {
      if (!$scope['input_' + index + '_valid']) {
        $scope['input_' + index + '_valid'] = true;
        $scope['input_' + index + '_readonly'] = true;
        $scope['input_' + index] = choice.val2.split(',')[0];
      }
    });
    checker.setProperty('isShowans', false);
  };

  // Reset footer bar on Template load
  checker.reset($scope);
});
