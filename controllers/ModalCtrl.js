'use strict';

controllers.classy.controller({
  name: 'ModalCtrl',
  inject: ['$scope', '$filter', '$modalInstance', 'CommentService', 'SubscriberService', 'todo', 'users'],

  init: function() {
    var $scope = this.$;
    var todo = this.todo;

    var CommentService = this.CommentService;
    var SubscriberService = this.SubscriberService;

    $scope.todo = todo;
    $scope.users = this.users;
    $scope.comments = [];
    $scope.subscribers = [];

    // Load subscribers.
    SubscriberService.all(todo.id).then(function(subscribers) {
      angular.forEach(subscribers, function(subscriber) {
        $scope.subscribers.push(subscriber);
      });
    });

    // Load comments.
    CommentService.all(todo.id).then(function(comments) {
      angular.forEach(comments, function(comment) {
        $scope.comments.push(comment);
      });
    });
  },

  subscribed: function(user) {
    return (this.$filter('filter')(this.$.subscribers, {id: user.id}, true).length > 0);
  },

  subscribe: function(user, todo) {
    var $scope = this.$;

    this.SubscriberService.subscribe(user, todo).then(function(subscribers) {
      $scope.subscribers.length = 0;
      angular.forEach(subscribers, function(subscriber) {
        $scope.subscribers.push(subscriber);
      });
    });
  },

  unsubscribe: function(user, todo) {
    var $scope = this.$;

    this.SubscriberService.unsubscribe(user, todo).then(function(subscribers) {
      $scope.subscribers.length = 0;
      angular.forEach(subscribers, function(subscriber) {
        $scope.subscribers.push(subscriber);
      });
    });
  },

  create: function(comment) {
    var $scope = this.$;

    this.CommentService.create(comment).then(function(newComment) {
      $scope.comments.push(newComment);
      comment.body = '';
    });
  },

  close: function() {
    this.$modalInstance.close();
  }
});
