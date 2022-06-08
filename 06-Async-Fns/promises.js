// Nested callbacks

// var counter = 0;

// setTimeout(function () {
//   counter++;
//   console.log("Counter:", counter);
//   setTimeout(function () {
//     counter++;
//     console.log("Counter:", counter);
//     setTimeout(function () {
//       counter++;
//       console.log("Counter:", counter);
//     }, 3000);
//   }, 2000);
// }, 1000);

// Refactor the above using promises

function incCounter(num) {
  console.log("Counter:", num || 1);
  return ++num || 2;
}

function runLater(callback, seconds, data) {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      var res = callback(data);
      resolve(res);
    }, seconds * 1000);
  });
  return p;
}

runLater(incCounter, 1)
  .then(function (data) {
    return runLater(incCounter, 2, data);
  })
  .then(function (data) {
    return runLater(incCounter, 3, data);
  });
