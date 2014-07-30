'use strict';

controllers.classy.controller({
  name: 'UserCtrl',
  inject: ['$scope', '$filter', 'Pusher', 'TodoService'],

  init: function() {
    var _reloadTodos = this._reloadTodos;

    this.$.todos = [];

    var user = this.$scope.user;
    var team = this.$scope.team;

    // Get all todos by team & user.
    _reloadTodos();

    // Pusher events team-#-user-#-todo
    var channel = pusher.subscribe(['team', team.id, 'user', user.id].join('-'));
    channel.bind("reload", function() { _reloadTodos(); });
  },

  addTodo: function(teamId, userId, todoTitle) {
    var $scope = this.$;

    if (todoTitle && teamId && userId) {
      var todo = {
        team_id: teamId,
        assigned_to_id: userId,
        title: todoTitle
      };

      //@TODO: Roll it back if fail.
      this.TodoService.create(todo).then(function() {
        $scope.todoTitle = '';
      });
    }
  },

  _reloadTodos: function() {
    var $scope = this.$;
    var team = $scope.team;
    var user = $scope.user;

    var TodoService = this.TodoService;

    TodoService.all(team.id, user.id).then(function(todos) {
      $scope.todos.length = 0;

      angular.forEach(todos, function(todo) {
        $scope.todos.push(todo);
      });
    });
  }
});
