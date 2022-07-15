var state = Object.create(null);
var assignmentList = document.querySelector(".assignment-list");
var addBtn = document.querySelector(".btn");
var nameFld = document.querySelector("#name");
var assignmentFld = document.querySelector("#assignment");

function displayHobbies() {
  fetch("/api")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.assignmentList = data; // update state
      state.assignmentList.forEach(function (val) {
        var item = document.createElement("li");
        item.innerHTML = val.name + " - " + val.assignment;
        item.addEventListener("click", addListener(item));
        assignmentList.appendChild(item);
      });
    });
}

function addListener(item) {
  return function () {
    console.log(item.id);
  };
}

addBtn.addEventListener("click", function () {
  const data = JSON.stringify({ name: nameFld.value, assignment: assignmentFld.value });

  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var item = document.createElement("li");
      item.innerHTML = data.name + " - " + data.assignment;
      item.id = data.id;
      item.addEventListener("click", addListener(item)); // add listener
      assignmentList.appendChild(item); // display new assignment
      state.assignmentList.push(data); // update state
      nameFld.value = ""; // clear input fields
      assignmentFld.value = "";
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});

displayHobbies();
