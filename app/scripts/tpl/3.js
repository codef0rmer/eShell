/**
 * Accomodating the logic for the template. Reads JSON data.
 * @param  object $scope     controller's scope
 * @param  object $rootScope app's rootscope injecting
 * @param  object Template   A custom service to run xhr request
 * @return void
 */
function threeCtrl($scope, $rootScope, $timeout, Template) {
  "use strict";

  Template.get({templateId: 3}, function(data) {
    $scope.options = [];

    angular.forEach(data.choices, function(value, key){
      $scope.options.push({src: value.val2, drag: true, valid: null});
    });
    
    $scope.choices = data.choices;
    $scope.options = _.shuffle($scope.options);
    $rootScope.attempt = 1;
    $rootScope.disableSubmit = false;
  });

  /**
   * An event fires when a tile is dropped into a container.
   * @param  string dragList  draggable container's unique identifier/id
   * @param  number dragIndex tile's unique identifier or index mostly
   * @param  string dropList  droppable container's unqiue identifier/id
   * @param  number dropIndex tile's unique identifier or index mostly
   * @return void
   */
  $scope.onDrop = function(dragList, dragIndex, dropList, dropIndex) {
    var temp = $scope.options[dropIndex];
    $scope.options[dropIndex] = $scope.options[dragIndex];
    $scope.options[dragIndex] = temp;
  };

  /**
   * Overrides the method defined in $rootScope for submit button and
   * validates the droppables and highlight them in Green for Valid and Red for Invalid.
   * @return void
   */
  $rootScope.submit = function() {
    var cntValid = 0;

    _.each($scope.options, function(item, iteration) {
      if (item.src === $scope.choices[iteration].val2) {
        item.valid = true;
        cntValid++;
      } else {
        item.valid = false;
      }
      item.drag = false;
    });

    $rootScope.disableSubmit = false;
    $rootScope.showSubmit = cntValid === $scope.choices.length;
  };

  /**
   * Overrides the method defined in $rootScope for tryagain button and
   * moves the invalid droppables at bottom.
   * @return void
   */
  $rootScope.tryAgain = function() {
    $timeout(function() {
      _.each($scope.options, function(item, iteration) {
        if (!item.valid) {
          item.drag = true;
          item.valid = null;
        }
      });
    });
    $rootScope.attempt++;
    $rootScope.showSubmit = true;
    $rootScope.disableSubmit = false;
  };

  /**
   * Overrides the method defined in $rootScope for showAnswer button and
   * shows the valid answers.
   * @return void
   */
  $rootScope.showAns = function() {
    var arrAns = [];

    angular.forEach($scope.choices, function(value, key){
      arrAns.push({src: value.val2, drag: false, valid: true});
    });

    $scope.options = arrAns;
    $rootScope.showSubmit = true;
    $rootScope.disableSubmit = true;
  };
}

App.prototype.resizeShell();