'use strict';

controllers.classy.controller({
  name: 'UserCtrl',
  inject: ['$scope', '$filter', 'Pusher', 'TodoService'],

  init: function() {
    var _reloadTodos = this._reloadTodos;
    var _updateTodos = this._updateTodos;

    var user = this.$scope.user;
    var team = this.$scope.team;
    var $scope = this.$;

    // Get all todos by team & user.
    this.TodoService.all(team.id, user.id).then(function(todos) {
      $scope.todos = todos;
    });

    // Pusher events team-#-user-#
    var channel = pusher.subscribe(['team', team.id, 'user', user.id].join('-'));
    
    channel.bind("reload", function(todos) { 
      // console.log('reload', user.full_name, todos);
      $scope.todos = todos;
      $scope.$apply();
    });
    
    // Set 
    $scope.sortableOptions = {
      placeholder: "list-group-item",
      connectWith: ".list-todos",
      opacity: 0.8,
      remove: function(event, ui) {
        // console.log('remove', event, ui, $scope.user.full_name, $scope.todos);
        // _updateTodos(user.id, $scope.todos);
      },
      receive: function(event, ui) {}, // Use watch:{object}todos instead, because ui.item.scope() is empty.
      update: function(event, ui) {
        console.log('update', $scope.user.full_name, $scope.todos);
      },
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
      var $scope = this.$;
      var _updateTodos = this._updateTodos;
      
      // @HACK: Because sortableOptions:receive doesn't provide ui.item.scope() object.
      // Find the changed todo.
      angular.forEach(newTodos, function(todo, key) {
        if (todo.assigned_to_id !== $scope.user.id) { _updateTodos($scope.user.id, newTodos); }
      });
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
  }
});
