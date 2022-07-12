var state = {};
var assignmentList = document.querySelector(".assignment-list");
var addBtn = document.querySelector(".btn");
var nameFld = document.querySelector("#name");
var assignmentFld = document.querySelector("#assignment");

function xhrReq(method, url, onReadyFn) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onreadystatechange = onReadyFn(xhr);
  xhr.open(method, url);
  xhr.send();
}

function displayHobbies() {
  xhrReq("GET", "/api", function (xhr) {
    return function () {
      if (xhr.readyState == 4) {
        state.assignmentList = xhr.response; // update state
        state.assignmentList.forEach(function (val) {
          var item = document.createElement("li");
          item.innerHTML = val.name + " - " + val.assignment;
          assignmentList.appendChild(item);
        });
      }
    };
  });
}

displayHobbies();

addBtn.addEventListener("click", function () {
  var newAssignment = { name: nameFld.value, assignment: assignmentFld.value };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(newAssignment);
  xhr.onload = function () {
    console.log(xhr.responseText);
  };
});
