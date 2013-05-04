'use strict';

App.factory('eywa', function ($http) {
  return {
    worship: function (request) {
      return $http.get(request);
    }
  };
});
