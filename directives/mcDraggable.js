'use strict';

angular.module('mcApp.directives').directive('mcDraggable', function(TodoService) {
  return function(scope, element, attr) {
    new Sortable(element[0], {
      group: "todos",
      draggable: ".list-group-item",
      ghostClass: 'list-group-item-info',
      onAdd: function (evt) {
        scope.$apply(function() {
          var todoElement = evt.item;
          var targetElement = evt.target.parentElement;

          var userId = targetElement.getAttribute('data-userId');
          var todoId = todoElement.getAttribute('data-todoId');

          TodoService.update(todoId, {assigned_to_id: userId}); // Should update collection via Push.
        });
      },

      onUpdate: function (evt) {
        var changes = [];

        angular.forEach(element[0].getElementsByTagName("li"), function(value, position) {
          changes.push({
            id: value.getAttribute('data-todoId'),
            position: position
          });
        });

        TodoService.updateSortIndexes(changes);
      }
    });
  };
});
