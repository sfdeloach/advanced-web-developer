var db = require('../models');

exports.getTodos = function (req, res) {
  db.Todo.find()
    .then(function (allTodoItems) {
      res.json(allTodoItems);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.createTodo = function (req, res) {
  db.Todo.create(req.body)
    .then(function (createdTodo) {
      res.status(201).json(createdTodo);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.getTodo = function (req, res) {
  db.Todo.findById(req.params.todoID)
    .then(function (foundTodo) {
      res.json(foundTodo);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.updateTodo = function (req, res) {
  db.Todo.findOneAndUpdate({ _id: req.params.todoID }, req.body, { new: true })
    .then(function (updatedTodo) {
      res.json(updatedTodo);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.removeTodo = function (req, res) {
  db.Todo.remove({ _id: req.params.todoID })
    .then(function (message) {
      res.json(message);
    })
    .catch(function (err) {
      res.send(err);
    });
};
