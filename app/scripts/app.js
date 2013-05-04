'use strict';

var App = angular.module('eShellApp', []);

App.config(function ($routeProvider) {
  $routeProvider
    .when('/1', {
      templateUrl: 'views/fib.html',
      controller: 'FibCtrl'
    })
    .otherwise({
      redirectTo: '/1'
    });
});
