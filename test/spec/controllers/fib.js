'use strict';

describe('Controller: FibCtrl', function () {

  // load the controller's module
  beforeEach(module('eShellApp'));

  var FibCtrl, scope, checker, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _checker_) {
    scope = $rootScope.$new();
    checker = _checker_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('data/fib.json').respond('{"text":"AngularJS is [[1]].", "choices":[{"val1":"[[1]]", "val2":"awesome,powerful"}]}');

    FibCtrl = $controller('FibCtrl', {
      $scope: scope
    });

    scope.data = {
      text    : 'AngularJS is originally created in [[1]] by [[2]]',
      choices : [{
        "val1": "[[1]]",
        "val2": "2009,09"
      }, {
        "val1": "[[2]]",
        "val2": "misko,Misko Hevery"
      }]
    };
  }));

  it('should set class', function() {
    expect(scope.setClass(true)).toBe('success');
    expect(scope.setClass(false)).toBe('error');
    expect(scope.setClass(undefined)).toBe('');
  });

  it('should validate the entries', function() {
    scope.input_0 = '2009';
    scope.input_1 = 'amit';
    scope.submit();
    expect(scope.input_0_valid).toBeTruthy();
    expect(scope.input_1_valid).toBeFalsy();
    expect(scope.input_0_readonly).toBeTruthy();
    expect(scope.input_1_readonly).toBeTruthy();
    expect(checker.getProperty('isTryagain')).toBeTruthy();
    expect(checker.getProperty('isShowans')).toBeFalsy();
    expect(checker.getProperty('isSubmit')).toBeFalsy();
    expect(checker.getProperty('attempt')).toBe(1);
  });

  it('should clear invalid entries', function() {
    // Second attempt
    scope.input_0 = '2009';
    scope.input_1 = 'amit';
    scope.tryagain();
    expect(scope.input_0_valid).toBeUndefined();
    expect(scope.input_1_valid).toBeUndefined();
    expect(scope.input_0_readonly).toBeFalsy();
    expect(scope.input_1_readonly).toBeFalsy();
    expect(checker.getProperty('isTryagain')).toBeFalsy();
    expect(checker.getProperty('attempt')).toBe(2);

    // Third attempt
    scope.tryagain();
    expect(checker.getProperty('attempt')).toBe(3);
  });

  it('should show valid answers', function() {
    scope.showans();
    expect(scope.input_0_valid).toBeTruthy();
    expect(scope.input_1_valid).toBeTruthy();
    expect(scope.input_0_readonly).toBeTruthy();
    expect(scope.input_1_readonly).toBeTruthy();
    expect(scope.input_0).toBe('2009');
    expect(scope.input_1).toBe('misko');
  });
});
