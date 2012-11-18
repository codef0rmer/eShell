

// Jasmine Documentation: http://pivotal.github.com/jasmine/
//
// This introduction file is coming from Jasmine reposutory:
//
// - https://raw.github.com/pivotal/jasmine/gh-pages/src/introduction.js
//

// Jasmine
// =======
//
// Jasmine is a behavior-driven development framework for testing
// JavaScript code. It does not depend on any other JavaScript
// frameworks. It does not require a DOM. And it has a clean, obvious
// syntax so that you can easily write tests.

//
// ## Suites: `describe` Your Tests
//
// A test suite begins with a call to the global Jasmine function
// `describe` with two parameters: a string and a function. The string is a
// name or title for a spec suite - usually what is under test. The
// function is a block of code that implements the suite.
//
// ## Specs
//
// Specs are defined by calling the global Jasmine function `it`, which,
// like `describe` takes a string and a function. The string is a title for
// this spec and the function is the spec, or test. A spec contains one
// or more expectations that test the state of the code under test.
//
// An expectation in Jasmine is an assertion that can be either true or
// false. A spec with all true expectations is a passing spec. A spec with
// one or more expectations that evaluate to false is a failing spec.
//

describe('eShell Controllers', function() {

  describe('oneCtrl', function() {
    var scope, rootScope, ctrl, $httpBackend,
        $injector = angular.injector([ 'ePlayerServices' ]),
        Template = $injector.get( 'Template' );
 
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      rootScope = $rootScope;
      ctrl = $controller(oneCtrl, {
        $scope: scope,
        $rootScope: $rootScope,
        Template: Template
      });
    }));

    it('should hide current tiles and show next tiles', function() {
      scope.currentPage = 0;
      scope.optionsPerPage = 4;
      expect(scope.show(1)).toBe(true);
    });

    it('should not hide current tiles', function() {
      scope.currentPage = 0;
      scope.optionsPerPage = 4;
      expect(scope.show(-1)).toBe(false);
    });

    it('should increment currentPage', function() {
      scope.currentPage = 0;
      scope.next();
      expect(scope.currentPage).toBe(1);
      expect(scope.currentPage).not.toBe(2);
    });

    it('should decrement currentPage', function() {
      scope.currentPage = 1;
      scope.prev();
      expect(scope.currentPage).toBe(0);
      expect(scope.currentPage).not.toBe(1);
    });

    it('should return position of the first tile to be shown', function() {
      scope.currentPage = 0;
      scope.optionsPerPage = 4;
      expect(scope.startIndex()).toBe(0);

      scope.currentPage = 1;
      expect(scope.startIndex()).toBe(3);
    });

    it('should return position of the last tile to be shown', function() {
      scope.currentPage = 0;
      scope.optionsPerPage = 4;
      expect(scope.endIndex()).toBe(3);

      scope.currentPage = 1;
      expect(scope.endIndex()).toBe(6);
    });

    it('should validate the tiles on submit', function() {
      // if all tiles are not properly placed/dropped
      scope.list2 = [
        { title: 'Angular.js', valid: null, drag: true },
        { title: 'Backbone.js', valid: null, drag: true }
      ];
      scope.choices = [{ val2: 'Angular.js' }, { val2: 'Ember.js' }];
      rootScope.submit();
      expect(scope.list2[0].valid).toBe(true);
      expect(scope.list2[0].drag).toBe(false);
      expect(scope.list2[1].valid).toBe(false);
      expect(scope.list2[1].drag).toBe(false);
      expect(rootScope.disableSubmit).toBe(true);
      expect(rootScope.showSubmit).toBe(false);

      // if all tiles are properly placed/dropped
      scope.choices = [{ val2: 'Angular.js' }, { val2: 'Backbone.js' }];
      rootScope.submit();
      expect(scope.list2[0].valid).toBe(true);
      expect(scope.list2[0].drag).toBe(false);
      expect(scope.list2[1].valid).toBe(true);
      expect(scope.list2[1].drag).toBe(false);
      expect(rootScope.showSubmit).toBe(true);
    });

    it('should remove valid tiles and show invalid tiles back into tileBar', function() {
      // if all tiles are not properly dropped/placed
      scope.list2 = [
        { title: 'Angular.js', valid: true, drag: true },
        { title: 'Backbone.js', valid: null, drag: true }
      ];
      rootScope.attempt = 1;
      scope.tryAgain();
      expect(scope.list2[0].drag).toBe(true);
      expect(scope.list2[0].title).toBeDefined();
      expect(scope.list2[1].drag).toBe(true);
      expect(scope.list2[1].title).toBeUndefined();
      expect(scope.list1.length).toBe(1);
      expect(rootScope.attempt).toBe(2);

      // if all tiles are properly dropped/placed
      scope.list2 = [
        { title: 'Angular.js', valid: true, drag: true },
        { title: 'Backbone.js', valid: true, drag: true }
      ];
      scope.tryAgain();
      expect(scope.list2[0].drag).toBe(true);
      expect(scope.list2[0].title).toBeDefined();
      expect(scope.list2[1].drag).toBe(true);
      expect(scope.list2[1].title).toBeDefined();
      expect(scope.list1.length).toBe(0);

      expect(rootScope.showSubmit).toBe(true);
      expect(rootScope.attempt).toBe(3);
      expect(scope.currentPage).toBe(0);
    });

    it('should show valid tiles to be placed automagically', function() {
      scope.choices = [{ val2: 'Angular.js' }, { val2: 'Ember.js' }];
      rootScope.showAns();

      expect(scope.list2.length).toBe(2);
      expect(rootScope.showSubmit).toBe(true);
    });
  });

});