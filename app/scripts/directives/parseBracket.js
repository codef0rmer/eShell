'use strict';

App.directive('parseBracket', function ($compile) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      attrs.$observe('parseBracket', function(val) {
        if (val === '') return false;

        var params = angular.fromJson(val),
            text = '<div>' + params.text + '</div>';

        if (angular.isDefined(params.choices)) {
          params.choices.forEach(function(choice, index) {
            text = text.replace(
              new RegExp(choice.val1.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g'),
              '<span class="control-group" ng-class="setClass(input_' + index + '_valid)">' +
                '<input type="text" ' +
                  'class="input-medium" ' +
                  'autocorrect="off" ' +
                  'autocapitalize="off" ' +
                  'autocomplete="off" ' +
                  'ng-change="validate(frmFIB.$valid)" ' +
                  'ng-readonly="input_' + index + '_readonly" ' +
                  'ng-model="input_' + index + '"' +
                  'required />' +
              '</span>'
            );
          });
        }

        element.html(text);
        $compile(element.contents())(scope);
      });
    }
  };
});
