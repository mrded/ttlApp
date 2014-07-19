'use strict';

controllers.classy.controller({
  name: 'TeamCtrl',
  inject: ['$scope', '$filter', '$modal', '$location', 'TeamService', 'UserService'],

  init: function() {
    var $scope = this.$;

    var TeamService = this.TeamService;
    var UserService = this.UserService;

    //@TODO: Find a better way to get teamId from url.
    var teamId = this.$location.absUrl().match(/(http:\/\/[^\/]+\/teams\/)(\d+)/)[2];

    this.users = [];

    TeamService.get(teamId).then(function(team) {
      $scope.team = team;

      // Get all users by team.
      UserService.all(team.id).then(function(users) {
        $scope.users = users;
      });
    });
  },

  todoOpen: function (todo) {
    var $scope = this.$;

    this.$modal.open({
      templateUrl: '/templates/todoModal.html',
      size: 'lg',
      controller: 'ModalCtrl',
      resolve: {
        todo: function() {
          return todo;
        },
        users: function() {
          return $scope.users;
        }
      }
    });
  }
});
