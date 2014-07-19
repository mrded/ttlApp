'use strict';

angular.module('mcApp.services').service('TeamService', function($http, $q) {

  this.all = function() {
    var deferred = $q.defer();

    $http.get('/api/teams').success(function(teams) {
      return deferred.resolve(teams);
    });

    return deferred.promise;
  };

  this.get = function(teamId) {
    var deferred = $q.defer();

    $http.get('/api/teams/' + teamId).success(function(team) {
      return deferred.resolve(team);
    });

    return deferred.promise;
  };
});
