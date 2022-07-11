var express = require('express'),
  app = express(),
  todoRoutes = require('./routes/todos'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.use('/api/todo', todoRoutes);

app.listen(3000, function () {
  console.log('Application is running on port', port);
});
