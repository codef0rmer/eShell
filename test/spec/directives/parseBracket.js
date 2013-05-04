'use strict';

describe('Directive: parseBracket', function () {
  beforeEach(module('eShellApp'));

  var element, $scope;

  it('should replace [] with input boxes', inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.data = {
      text    : 'AngularJS is [[1]]',
      choices : [{
        "val1": "[[1]]",
        "val2": "awesome,powerful"
      }]
    };
    element = angular.element('<div parse-bracket="{{data}}"></div>');
    element = $compile(element)($scope);
    $rootScope.$digest();

    expect(element.html()).toBe('<div class="ng-scope">AngularJS is <span class="control-group" ng-class="setClass(input_0_valid)"><input type="text" class="input-medium ng-pristine ng-invalid ng-invalid-required" autocorrect="off" autocapitalize="off" autocomplete="off" ng-change="validate(frmFIB.$valid)" ng-readonly="input_0_readonly" ng-model="input_0" required=""></span></div>');
  }));
});
