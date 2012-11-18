"use strict";

angular.module('ePlayerServices', ['ngResource'])
  .factory('Template', function ($resource) {
    return $resource('/data/:templateId.json', {}, {
      query: {method: 'GET', params: {templateId: '1'}, isArray: true}
    });
  });