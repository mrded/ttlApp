'use strict';

angular.module('mcApp', [
  'ui.sortable',
  'ui.bootstrap',
  'doowb.angular-pusher',
  'mcApp.services',
  'mcApp.controllers',
  'mcApp.directives'
])

.config(function($httpProvider, PusherServiceProvider) {
  // Add csrf token to angular http requests.
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = $('meta[name="csrf-token"]').attr('content');

  PusherServiceProvider.setToken('1234567890').setOptions({});
});

angular.module('mcApp.services', []);
angular.module('mcApp.directives', []);
var controllers = angular.module('mcApp.controllers', ['classy']);
