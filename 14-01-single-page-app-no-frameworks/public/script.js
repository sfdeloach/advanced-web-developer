var state = {};
var assignmentList = document.querySelector(".assignment-list");
var addBtn = document.querySelector(".btn");
var nameFld = document.querySelector("#name");
var assignmentFld = document.querySelector("#assignment");

function displayHobbies() {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("GET", "/api");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      state.assignmentList = xhr.response; // update state
      state.assignmentList.forEach(function (val) {
        var item = document.createElement("li");
        item.innerHTML = val.name + " - " + val.assignment;
        assignmentList.appendChild(item);
      });
    }
  };
  xhr.send();
}

addBtn.addEventListener("click", function () {
  var newAssignment = JSON.stringify({ name: nameFld.value, assignment: assignmentFld.value });
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api");
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(newAssignment);
  xhr.onload = function () {
    console.log(xhr.responseText);
  };
});

displayHobbies();
