'use strict';

angular.module('mcApp.services').service('UserService', function($http, $q) {

  this.all = function(teamId) {
    var deferred = $q.defer();

    $http.get('/api/teams/' + teamId + '/users').success(function(users) {
      return deferred.resolve(users);
    });

    return deferred.promise;
  };

  this.get = function(userId) {
    var deferred = $q.defer();

    $http.get('/api/users/' + userId).success(function(user) {
      return deferred.resolve(user);
    });

    return deferred.promise;
  };
});
