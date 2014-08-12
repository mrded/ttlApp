'use strict';

controllers.classy.controller({
  name: 'UserCtrl',
  inject: ['$scope', '$filter', 'Pusher', 'TodoService'],

  init: function() {
    var _reloadTodos = this._reloadTodos;

    var user = this.$scope.user;
    var team = this.$scope.team;

    // Get all todos by team & user.
    _reloadTodos();

    // Pusher events team-#-user-#
    var channel = pusher.subscribe(['team', team.id, 'user', user.id].join('-'));
    channel.bind("reload", function() { _reloadTodos(); });
    
    // Set 
    this.$scope.sortableOptions = {
      placeholder: "list-group-item",
      connectWith: ".list-todos",
      opacity: 0.8,
    };
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
  watch: {
    '{object}todos': function(newTodos, oldTodos) {
      var _updateTodos = this._updateTodos;
      var $scope = this.$;
      var user = $scope.user;
      var team = $scope.team;
      
      if (oldTodos !== undefined) { // Skip initialisation.
        _updateTodos(user.id, newTodos);
      }
    },
  },
  
  _updateTodos: function(userId, todos) {
    var $scope = this.$;
    var team = $scope.team;
    
    this.TodoService.updateMultiple(team.id, userId, todos.map(function(todo, key) {
      return {
        id: todo.id, 
        position: key,
        assigned_to_id: userId
      };
    }));
  },

  _reloadTodos: function() {
    var $scope = this.$;
    var team = $scope.team;
    var user = $scope.user;
    
    var TodoService = this.TodoService;
    
    TodoService.all(team.id, user.id).then(function(todos) {
      $scope.todos = todos;
    });
  }
});
