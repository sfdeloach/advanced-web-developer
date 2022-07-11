var mongoose = require('mongoose');
var connectionString = require('../keys');

mongoose.set('debug', true);
mongoose.connect(connectionString);
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
