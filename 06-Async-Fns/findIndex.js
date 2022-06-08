/**
 * Implement the findIndex function as described in the findIndex exercise intro. There is a built
 * in findIndex method in JavaScript that can be invoked directly on arrays ([].findIndex). In this
 * exercise, we will be implementing a standalone findIndex function so that you can understand how
 * callbacks are used and how findIndex works.
 *
 * findIndex returns the index of the first element in the array for which the callback returns a
 * truthy value. If no truthy values are returned, findIndex returns -1. You can start working on
 * this problem, there are hints in the code if you're stuck.
 */

function findIndex(arr, callback) {
  for (var i = 0; i < arr.length; ++i) {
    if (callback(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

// HINTS
// the function should iterate through the array passed to it and invoke the callback function at
// each iteration
//
// the callback function should accept three parameters: the value you are iterating
// over, the index you are currently at, and the entire array
//
// if the callback returns true at any point, return the index at which you are iterating over
// otherwise return -1

var states = ["Florida", "Georgia", "Kentucky"];

console.log(
  findIndex(states, function (state, index, states) {
    return state === "Georgia";
  })
);
