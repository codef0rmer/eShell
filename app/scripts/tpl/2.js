/**
 * Accomodating the logic for the template. Reads JSON data.
 * @param  object $scope     controller's scope
 * @param  object $rootScope app's rootscope injecting
 * @param  object Template   A custom service to run xhr request
 * @return void
 */
function twoCtrl($scope, $rootScope, Template) {
  "use strict";

  Template.get({templateId: 2}, function(data) {
    var text = data.textwith_blanks;

    _.each(data.choices, function(choice, index) {
      text = (text.replace(
        new RegExp(choice.val1.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g'),
        '<span class="control-group">' +
          '<input type="text" class="input-medium" autocorrect="off" autocapitalize="off" autocomplete="off"' +
          'ng-change="validate(frmFIB.$invalid)" required ' +
          'data-index="' + index + '" ng-model="input_' + index + '" />' +
        '</span>'
      ));
    });
    $scope.textwith_blanks = text;
    $scope.arrAns = _.map(data.choices, function (choice) {
      return _.map(choice.val2.split(','), function (item) {
        return item.toLowerCase();
      });
    });
    $rootScope.attempt = 1;
    $rootScope.disableSubmit = true;
  });

  /**
   * Calls on every keystroke in a textbox (see above) and
   * binds the response true/false to a model defined in $rootScope
   * @param  bool bln enable/disable the submit button
   * @return void
   */
  $scope.validate = function(bln) {
    $rootScope.disableSubmit = bln;
  };

  /**
   * Overrides the method defined in $rootScope for submit button and
   * validates the input values and marked them green/red.
   * @return void
   */
  $rootScope.submit = function() {
    var cntValid = 0,
        $input = angular.element('div.FIBInput input');

    angular.forEach($input, function(element, i) {
      if (_.indexOf($scope.arrAns[i], ($scope[angular.element(element).attr('ng-model')]).toLowerCase()) !== -1) {
        angular.element(element).prop('readonly', true).parent().addClass('success');
        cntValid++;
      } else {
        angular.element(element).prop('readonly', true).parent().addClass('error');
      }
    });

    $rootScope.disableSubmit = true;
    $rootScope.showSubmit = cntValid === $input.length;
  };

  /**
   * Overrides the method defined in $rootScope for tryagain button and
   * clears up invalid inputs.
   * @return void
   */
  $rootScope.tryAgain = function() {
    angular.forEach(angular.element('div.FIBInput span.error'), function(element, i) {
      angular.element(element).removeClass('error');
      $scope[angular.element(element).children('input').prop('readonly', false).attr('ng-model')] = '';
    });

    $rootScope.showSubmit = true;
    $rootScope.attempt++;
  };

  /**
   * Overrides the method defined in $rootScope for showAnswer button and
   * shows the valid answers.
   * @return void
   */
  $rootScope.showAns = function() {
    angular.forEach(angular.element('div.FIBInput input'), function(element, i) {
      $scope[angular.element(element).attr('ng-model')] = $scope.arrAns[i][0];
      angular.element(element).prop('readonly', true).parent().addClass('success');
    });

    $rootScope.showSubmit = true;
  };
}

App.prototype.resizeShell();