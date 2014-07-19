'use strict';

controllers.classy.controller({
  name: 'TodoCtrl',
  inject: ['$scope', 'TodoService'],

  getColour: function(createdAt) {
    var today = new Date();
    var created = new Date(createdAt);
    var twoDaysAgo = new Date(today.getTime() - (2 * 24 * 60 * 60 * 1000));
    var fiveDaysAgo = new Date(today.getTime() - (5 * 24 * 60 * 60 * 1000));

    if (created < fiveDaysAgo) return 'list-group-item-danger';
    else if (created > twoDaysAgo) return 'list-group-item-success';
    else return 'list-group-item-warning';
  },

  todoComplete: function(todo) {
    this.TodoService.update(todo.id, {complete: true});
  }

});
