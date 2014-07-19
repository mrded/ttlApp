'use strict';

angular.module('mcApp.services').service('CommentService', function($http, $q) {

  this.all = function(todoId) {
    var deferred = $q.defer();

    $http.get('/api/todos/' + todoId + '/comments').success(function(comments) {
      return deferred.resolve(comments);
    });

    return deferred.promise;
  };

  this.create = function(comment) {
    var deferred = $q.defer();

    $http.post('/api/comments/', {comment: comment}).success(function(comment) {
      return deferred.resolve(comment);
    });

    return deferred.promise;
  };
});
