'use strict';

angular.module('mcApp.directives').directive('mcUser', function() {
  return {
    restrict: 'E',
    templateUrl: "/templates/user.html",
    controller: 'UserCtrl'
  };
});
