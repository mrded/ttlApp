'use strict';

angular.module('mcApp.directives').directive('mcTodo', function() {
  return {
    restrict: 'A',
    controller: 'TodoCtrl'
  };
});
