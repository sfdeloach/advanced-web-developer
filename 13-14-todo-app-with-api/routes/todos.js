var express = require('express'),
  router = express.Router(),
  helpers = require('../helpers/todos');

router.route('/').get(helpers.getTodos).post(helpers.createTodo);

router.route('/:todoID').get(helpers.getTodo).put(helpers.updateTodo).delete(helpers.removeTodo);

module.exports = router;
