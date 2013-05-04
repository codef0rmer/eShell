'use strict';

describe('Service: eywa', function () {

  // load the service's module
  beforeEach(module('eShellApp'));

  // instantiate service
  var eywa, $httpBackend;
  beforeEach(inject(function (_eywa_, _$httpBackend_) {
    eywa = _eywa_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should read JSON data', function () {
    $httpBackend.whenGET('data/fib.json').respond('{"text":"AngularJS is [[1]].", "choices":[{"val1":"[[1]]", "val2":"awesome,powerful"}]}');

    eywa.worship('data/fib.json').success(function(data) {
      expect(data.text).toBe('AngularJS is [[1]].');
    });
    $httpBackend.flush();
  });
});
