/**
 * Accomodating the logic for the template. Reads JSON data.
 * @param  object $scope     controller's scope
 * @param  object $rootScope app's rootscope injecting
 * @param  object Template   A custom service to run xhr request
 * @return void
 */
function oneCtrl($scope, $rootScope, Template, $timeout) {
  "use strict";

  Template.get({templateId: 1}, function(data) {
    $scope.list1 = [];
    $scope.list2 = [];
    angular.forEach(data.choices, function(value, key){
      $scope.list1.push({title: value.val2, valid: null, drag: true});
      $scope.list2.push({drag: true});
    });

    $scope.list1 = _.shuffle($scope.list1);
    $scope.currentPage = 0;
    $scope.optionsPerPage = 4;
    $scope.numPages = Math.floor(data.choices.length / $scope.optionsPerPage);
    $scope.choices = data.choices;
    $rootScope.attempt = 1;
    $rootScope.disableSubmit = true;
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
    var temp;

    if (dragList === 'list1' && dropList === 'list2') {
      temp = $scope.list2[dropIndex];
      $scope.list2[dropIndex] = $scope.list1[dragIndex];
      $scope.list1[dragIndex] = temp;
    } else if (dragList === 'list2' && dropList === 'list2') {
      temp = $scope.list2[dropIndex];
      $scope.list2[dropIndex] = $scope.list2[dragIndex];
      $scope.list2[dragIndex] = temp;
    } else if (dragList === 'list2' && dropList === 'list1') {
      temp = $scope.list1[dropIndex];
      $scope.list1[dropIndex] = $scope.list2[dragIndex];
      $scope.list2[dragIndex] = temp;
    } else if (dragList === 'list1' && dropList === 'list1') {
      temp = $scope.list1[dropIndex];
      $scope.list1[dropIndex] = $scope.list1[dragIndex];
      $scope.list1[dragIndex] = temp;
    }
    $rootScope.disableSubmit = _.filter($scope.list1, function(item) { return item.title; }).length ? true : false;
  };

  /**
   * Show/Hide tiles when next/prev navigation occurs.
   * @param  number $index  index of the tile
   * @return boolean
   */
  $scope.show = function($index, e) {
    if (($scope.startIndex() === 0 && $index >= $scope.startIndex() && $index <= $scope.endIndex()) ||
        ($index > $scope.startIndex() && $index <= $scope.endIndex())
    ) {
      return true;
    } else {
      return false;
    }
  };

  $scope.next = function() {
    $scope.currentPage++;
  };

  $scope.prev = function() {
    $scope.currentPage--;
  };

  $scope.startIndex = function() {
    return $scope.currentPage * ($scope.optionsPerPage - 1);
  };

  $scope.endIndex = function() {
    return ($scope.currentPage + 1) * ($scope.optionsPerPage - 1);
  };

  /**
   * Overrides the method defined in $rootScope for submit button and
   * validates the droppables and highlight them in Green for Valid and Red for Invalid.
   * @return void
   */
  $rootScope.submit = function() {
    var cntValid = 0;

    _.each($scope.list2, function(item, iteration) {
      if (item.title === $scope.choices[iteration].val2) {
        item.valid = true;
        cntValid++;
      } else {
        item.valid = false;
      }
      item.drag = false;
    });

    $rootScope.disableSubmit = true;
    $rootScope.showSubmit = cntValid === $scope.choices.length;
  };

  /**
   * Overrides the method defined in $rootScope for tryagain button and
   * moves the invalid droppables at bottom.
   * @return void
   */
  $rootScope.tryAgain = function() {
    var list1 = [],
        listItem = {};

    _.each($scope.list2, function(item, iteration) {
      if (!item.valid) {
        listItem = item;
        listItem.drag = true;
        listItem.valid = null;
        list1.push(listItem);
        $scope.list2[iteration] = {drag: true};
      }
    });
    $scope.list1 = _.shuffle(list1);
    $rootScope.showSubmit = true;
    $rootScope.attempt++;
    $scope.currentPage = 0;
  };

  /**
   * Overrides the method defined in $rootScope for showAnswer button and
   * shows the valid answers.
   * @return void
   */
  $rootScope.showAns = function() {
    var arrAns = [];

    _.each($scope.choices, function(choice) {
      arrAns.push({title: choice.val2, valid: true, drag: false});
    });
    $scope.list2 = arrAns;
    $rootScope.showSubmit = true;
  };
}

App.prototype.resizeShell();