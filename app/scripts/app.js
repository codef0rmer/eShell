"use strict";
  
var App = angular.module('ePlayer', ['ePlayerServices']),
    excludeHeader = 0,
    excludeFooter = 0;

App.config(['$routeProvider', function($routeProvider) {
  // Exclude the size of Header and Footer while resizing the template body
  excludeHeader = $('div.navbar-fixed-top').height();
  excludeFooter = $('div.navbar-fixed-bottom').height();

  // Initialize Router
  $routeProvider.when('/1', {templateUrl: 'templates/1.html', controller: App.oneCtrl});
  $routeProvider.when('/2', {templateUrl: 'templates/2.html', controller: App.twoCtrl});
  $routeProvider.when('/3', {templateUrl: 'templates/3.html', controller: App.threeCtrl});
  $routeProvider.when('/4', {templateUrl: 'templates/4.html', controller: App.fourCtrl});
  $routeProvider.otherwise({redirectTo: '/1'});
}]);

/**
 * Bound common properties shared across controllers.
 * @param  object $rootScope The rootScope of the application
 * @return void
 */
App.run(['$rootScope', function($rootScope) {
  $rootScope.attempt = 1;
  $rootScope.totalAttempts = 3;
  $rootScope.totalTemplates = 4;
  $rootScope.showSubmit = true;
  $rootScope.disableSubmit = true;
  $rootScope.currentTemplate = window.location.hash.substring(2) || 1;

  $rootScope.isFirst = function(currentTemplate) {
    return parseInt(currentTemplate, false) === 1 ? true : false;
  };

  $rootScope.prevTemplate = function(currentTemplate) {
    $rootScope.currentTemplate = parseInt(currentTemplate, false) - 1;
    window.location.hash = $rootScope.currentTemplate;
  };

  $rootScope.nextTemplate = function(currentTemplate) {
    $rootScope.currentTemplate = parseInt(currentTemplate, false) + 1;
    window.location.hash = $rootScope.currentTemplate;
  };

  $rootScope.isLast = function(currentTemplate) {
    return parseInt(currentTemplate, false) === $rootScope.totalTemplates ? true : false;
  };
}]);

/**
 * USEFUL GENERIC FUNCTION
 */
App.prototype = {
  resizeShell: function() {
  $('div.contentWrapper').height($(window).height() - excludeHeader - excludeFooter - ($('#optionsWrapper').height() || 0));
  $('div.optionsWrapper').css('margin-bottom', excludeFooter);
  }
};