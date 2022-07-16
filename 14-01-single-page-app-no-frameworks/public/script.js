var state = Object.create(null);
var assignments = document.querySelector('.assignments');
var addBtn = document.querySelector('.btn');
var nameFld = document.querySelector('#name');
var assignmentFld = document.querySelector('#assignment');

function displayHobbies() {
  fetch('/api')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // update state
      state.assignments = data;

      // update view
      state.assignments.forEach(function (assignment) {
        addTableRow(assignment);
      });
    });
}

// creates a new table row and inserts into the DOM
function addTableRow(assignment) {
  var tr = document.createElement('tr');
  var tdName = document.createElement('td');
  var tdAssignment = document.createElement('td');

  tr.id = assignment.id;
  tdName.innerHTML = assignment.name;
  tdAssignment.innerHTML = assignment.assignment;

  tr.appendChild(tdName);
  tr.appendChild(tdAssignment);
  tr.addEventListener('click', addListener(assignment.id));

  assignments.appendChild(tr);
}

// used for delete functionality on assignment items
function addListener(id) {
  return function () {
    fetch('/api/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: id
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // update view
        document.getElementById(id).remove();

        // update state
        var index = state.assignments
          .map(function (assignment) {
            return assignment.id;
          })
          .indexOf(id);
        state.assignments.splice(index, 1);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  };
}

// creates new assignment, updates view, frontend state, and the backend store
addBtn.addEventListener('click', function () {
  var data = JSON.stringify({ name: nameFld.value, assignment: assignmentFld.value });

  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (assignment) {
      // update view
      addTableRow(assignment);
      nameFld.value = '';
      assignmentFld.value = '';
      nameFld.focus();

      // update state
      state.assignments.push(assignment);
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
});

displayHobbies();
nameFld.focus();
