'use strict';

angular.module('mcApp.services').service('TodoService', function($http, $q) {

  this.all = function(teamId, userId) {
    var deferred = $q.defer();

    $http.get('/api/teams/' + teamId + '/users/' + userId + '/todos').success(function(todos) {
      return deferred.resolve(todos);
    });

    return deferred.promise;
  };

  this.get = function(todoId) {
    var deferred = $q.defer();

    $http.get('/api/todos/' + todoId).success(function(todo) {
      return deferred.resolve(todo);
    });

    return deferred.promise;
  };

  this.create = function(todo) {
    var deferred = $q.defer();

    $http.post('/api/todos', {todo: todo}).success(function(todo) {
      return deferred.resolve(todo);
    });

    return deferred.promise;
  };

  this.update = function(todoId, changes, reload) {
    var deferred = $q.defer();

    $http.put('/api/todos/' + todoId, {todo: changes, reload: reload}).success(function(todo) {
      return deferred.resolve(todo);
    });

    return deferred.promise;
  };

  this.updateMultiple = function(teamId, userId, changes) {
    var deferred = $q.defer();
    
    if (changes.length > 0) {
      $http.post('/api/teams/' + teamId + '/users/' + userId + '/updates/', {todos: changes}).success(function(todos) {
        return deferred.resolve(todos);
      });
    }

    return deferred.promise;
  };

});
