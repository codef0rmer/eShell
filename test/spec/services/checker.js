'use strict';

describe('Service: checker', function () {

  // load the service's module
  beforeEach(module('eShellApp'));

  // instantiate service
  var checker;
  beforeEach(inject(function (_checker_) {
    checker = _checker_;
  }));

  it('should get and set properties', function () {
    expect(checker.getProperty('isSubmit')).toBeFalsy();
    checker.setProperty('isSubmit', true);
    expect(checker.getProperty('isSubmit')).toBeTruthy();
  });

  it('should call methods', function() {
    spyOn(checker, 'submit').andCallFake(function() { });
    checker.invoke('submit');
    expect(checker.submit).toHaveBeenCalled();
  });
});
