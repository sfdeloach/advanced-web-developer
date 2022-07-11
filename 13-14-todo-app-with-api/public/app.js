$(document).ready(function () {
  $.getJSON('/api/todo')
    .then(addTodos)
    .catch(function (err) {
      console.error(err);
    });

  $('#todoInput').keypress(function (event) {
    if (event.which == 13) {
      createTodo();
    }
  });

  // There are no spans on the page until the AJAX call returns, therefore, we need to attach this
  // listener to .list and specify in our second parameter that it only applies to span within the
  // .list element
  $('.list').on('click', 'span', function (event) {
    event.stopPropagation(); // prevents the click on li from firing
    removeTodo($(this).parent());
  });

  $('.list').on('click', 'li', function () {
    updateTodo($(this));
  });
});

function addTodos(todos) {
  todos.forEach(function (todo) {
    addTodo(todo);
  });
}

function addTodo(todo) {
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
  newTodo.data('id', todo._id); // associate the id with the todo so it can be identified when deleted
  newTodo.data('completed', todo.completed);
  $('.list').append(newTodo);
  if (todo.completed) {
    newTodo.addClass('done');
  }
}

function createTodo() {
  var userInput = $('#todoInput').val();
  $.post('/api/todo', { name: userInput })
    .then(function (newTodo) {
      $('#todoInput').val('');
      addTodo(newTodo);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function removeTodo(todo) {
  var clickedID = todo.data('id');
  $.ajax({ method: 'DELETE', url: '/api/todo/' + clickedID })
    .then(function (data) {
      todo.remove();
    })
    .catch(function (err) {
      console.error(err);
    });
}

function updateTodo(todo) {
  var clickedID = todo.data('id');
  var toggle = !todo.data('completed');
  $.ajax({ method: 'PUT', url: '/api/todo/' + clickedID, data: { completed: toggle } }).then(
    function (data) {
      todo.toggleClass('done');
      todo.data('completed', toggle);
    }
  );
}
