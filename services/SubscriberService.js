'use strict';

angular.module('mcApp.services').service('SubscriberService', function($http, $q) {

  this.all = function(todoId) {
    var deferred = $q.defer();

    $http.get('/api/todos/' + todoId + '/subscribers').success(function(subscribers) {
      return deferred.resolve(subscribers);
    });

    return deferred.promise;
  };

  this.subscribe = function(user, todo) {
    var deferred = $q.defer();

    $http.post('/api/todos/' + todo.id + '/subscribers', {id: user.id}).success(function(subscribers) {
      return deferred.resolve(subscribers);
    });

    return deferred.promise;
  };

  this.unsubscribe = function(user, todo) {
    var deferred = $q.defer();

    $http.delete('/api/todos/' + todo.id + '/subscribers/' + user.id).success(function(subscribers) {
      return deferred.resolve(subscribers);
    });

    return deferred.promise;
  };
});
