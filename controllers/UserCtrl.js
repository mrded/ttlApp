'use strict';

controllers.classy.controller({
  name: 'UserCtrl',
  inject: ['$scope', '$filter', 'Pusher', 'TodoService'],

  init: function() {
    var _reloadTodos = this._reloadTodos;

    var todos = this.$.todos = [];

    var user = this.$scope.user;
    var team = this.$scope.team;

    // Get all todos by team & user.
    _reloadTodos();

    // Pusher events team-#-user-#-todo
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
    '{object}todos': function(newValue, oldValue) {
      var TodoService = this.TodoService;
      var $scope = this.$;
      var user = $scope.user;
      var team = $scope.team;
      
      // Ordering.
      if (oldValue.length == newValue.length) {
        console.log('Update indexes', user.full_name);
        var changes = [];
        
        angular.forEach(newValue, function(todo, key) {
          changes.push({
            id: todo.id,
            position: key
          });
        });
        
        TodoService.updateSortIndexes(team.id, user.id, changes);
      }
      
      // Find the changed todo.
      angular.forEach(newValue, function(todo) {
        if (todo.assigned_to_id !== user.id) {
          console.log('Update todo', user.full_name, todo);
          TodoService.update(todo.id, {assigned_to_id: user.id}); // Should update collection via Push.
        }
      });
    },
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
