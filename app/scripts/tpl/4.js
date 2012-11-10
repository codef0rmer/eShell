/**
 * Accomodating the logic for the template. Reads JSON data.
 * @param  object $scope     controller's scope
 * @param  object $rootScope app's rootscope injecting
 * @param  object Template   A custom service to run xhr request
 * @return void
 */
function fourCtrl($scope, $rootScope, $timeout, Template) {
  "use strict";

  Template.get({templateId: 4}, function(data) {
    $scope.image = data.image;
    $scope.options = [];

    angular.forEach(data.choices, function(value, key){
      $scope.options.push({
        correct: value.val1,
        title: value.val2,
        audio: value.val3,
        selected: false,
        valid: null
      });
    });
    
    $scope.cntValidOptions = _.where($scope.options, {correct: true}).length;
    $scope.choices = data.choices;
    $scope.options = _.shuffle($scope.options);
    $rootScope.attempt = 1;
    $rootScope.disableSubmit = true;
  });

  /**
   * Toggle tile
   * @param  object   item  tile's object
   * @param  number   index tile's index
   * @return void
   */
  $scope.clickTile = function(item, index) {
    var cntSelectedOptions = _.where($scope.options, {selected: true}).length,
        cntValidOptions = _.where($scope.options, {selected: true, valid: true});

    if (item.valid || cntValidOptions === $scope.cntValidOptions || !$rootScope.showSubmit) return false;

    if (cntSelectedOptions === $scope.cntValidOptions && $scope.prevSelected !== index && item.selected !== true) {
      $scope.options[$scope.prevSelected].selected = false;
      $scope.options[$scope.prevSelected].valid = null;
    }

    item.selected = !item.selected;
    item.valid = null;
    $scope.prevSelected = index;

    $rootScope.disableSubmit = _.where($scope.options, {selected: true}).length !== $scope.cntValidOptions;
  };

  $scope.selectTile = function(item) {
    var klass = '';

    if (item.selected && item.valid === null) {
      klass = 'btn-warning';
    } else if (!item.selected && item.valid === null) {
      klass = 'btn-primary';
    } else if (item.valid) {
      klass = 'btn-success';
    } else if (!item.valid) {
      klass = 'btn-danger';
    }

    return klass;
  };

  /**
   * Overrides the method defined in $rootScope for submit button and
   * validates the droppables and highlight them in Green for Valid and Red for Invalid.
   * @return void
   */
  $rootScope.submit = function() {
    var selectedOptions = _.where($scope.options, {selected: true}),
        cntValid = 0;

    _.each(selectedOptions, function(option) {
      if (option.correct === true) {
        option.valid = true;
        cntValid++;
      } else {
        option.valid = false;
      }
    });

    $rootScope.disableSubmit = false;
    $rootScope.showSubmit = cntValid === $scope.cntValidOptions;
  };

  /**
   * Overrides the method defined in $rootScope for tryagain button and
   * moves the invalid droppables at bottom.
   * @return void
   */
  $rootScope.tryAgain = function() {
    $rootScope.attempt++;
    $rootScope.showSubmit = true;
    $rootScope.disableSubmit = true;
  };

  /**
   * Overrides the method defined in $rootScope for showAnswer button and
   * shows the valid answers.
   * @return void
   */
  $rootScope.showAns = function() {
    _.each($scope.options, function(option) {
      if (option.correct) {
        option.valid = true;
      } else {
        option.valid = null;
        option.selected = false;
      }
    });

    $rootScope.showSubmit = true;
    $rootScope.disableSubmit = true;
  };
}

App.prototype.resizeShell();