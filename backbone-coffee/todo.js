(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Todo, TodoList, TodoView, todo_view;
    Todo = (function(_super) {

      __extends(Todo, _super);

      function Todo() {
        Todo.__super__.constructor.apply(this, arguments);
      }

      Todo.prototype.initialize = function() {
        return console.dir("Todo#initialize");
      };

      return Todo;

    })(Backbone.Model);
    TodoList = (function(_super) {

      __extends(TodoList, _super);

      function TodoList() {
        TodoList.__super__.constructor.apply(this, arguments);
      }

      TodoList.prototype.model = Todo;

      return TodoList;

    })(Backbone.Collection);
    TodoView = (function(_super) {

      __extends(TodoView, _super);

      function TodoView() {
        TodoView.__super__.constructor.apply(this, arguments);
      }

      TodoView.prototype.el = "#todoDiv";

      TodoView.prototype.events = {
        'click button': 'addTodo'
      };

      TodoView.prototype.initialize = function() {
        console.dir("TodoView#initialize");
        this.collection = new TodoList;
        return this.collection.bind("add", this.render, this);
      };

      TodoView.prototype.render = function(todo) {
        return $(this.el).children("ul").append(this.template(todo));
      };

      TodoView.prototype.addTodo = function() {
        var todo;
        todo = new Todo({
          content: $("#new-todo").val()
        });
        return this.collection.add(todo);
      };

      TodoView.prototype.template = function(todo) {
        return "<li>" + todo.get("content") + "</li>";
      };

      return TodoView;

    })(Backbone.View);
    return todo_view = new TodoView;
  });

}).call(this);
