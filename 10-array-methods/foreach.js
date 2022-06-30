// if an array is not provided in the second argument, the function assumes the array
// to be iterated is the 'this' object
function myForEach(callback, array) {
  var arr = array ? array : this;
  for (var i = 0; i < arr.length; ++i) {
    callback(arr[i], i, arr);
  }
}

// attach new method to the array prototype object
Array.prototype.myForEach = myForEach;

// calling the new custom function as a method
var a = [3, 23, 5].myForEach(function (value, index, array) {
  console.log("value: " + value, "index: " + index, "array: " + JSON.stringify(array));
});

// calling the new custom function as a function
var b = myForEach(
  function (value, index, array) {
    console.log("value: " + value, "index: " + index, "array: " + JSON.stringify(array));
  },
  [3, 24, 6]
);

// method returns undefined
console.log(a);

// function returns undefined
console.log(b);

// produce a new array of half values using myForEach
function halfArray(array) {
  var halfArr = [];
  array.myForEach(function (val) {
    halfArr.push(val / 2);
  });
  return halfArr;
}

console.log(halfArray([8, 4, 2]));

// EXERCISES ///////////////////////////////////////////////////////////////////////////////////////
/*
Write a function called doubleValues which accepts an array and returns a new array with all the
values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([5,1,2,3,10]) // [10,2,4,6,20]

*/
function doubleValues(arr) {
  var result = [];
  myForEach(function (value) {
    result.push(value * 2);
  }, arr);
  return result;
}

console.log(doubleValues([1, 2, 3])); // [2,4,6]
console.log(doubleValues([5, 1, 2, 3, 10])); // [10,2,4,6,20]

/*
Write a function called onlyEvenValues which accepts an array and returns a new array with only the
even values in the array passed to the function

Examples:
    onlyEvenValues([1,2,3]) // [2]
    onlyEvenValues([5,1,2,3,10]) // [2,10]

*/
function onlyEvenValues(arr) {
  var result = [];
  myForEach(function (value) {
    if (value % 2 == 0) result.push(value);
  }, arr);
  return result;
}

console.log(onlyEvenValues([1, 2, 3])); // [2]
console.log(onlyEvenValues([5, 1, 2, 3, 10])); // [2,10]

/*
Write a function called showFirstAndLast which accepts an array of strings and returns a new array
with only the first and last character of each string.

Examples:
    showFirstAndLast(['colt','matt', 'tim', 'udemy']) // ["ct", "mt", "tm", "uy"]
    showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']

*/
function showFirstAndLast(arr) {
  var result = [];
  myForEach(function (value) {
    result.push(value[0] + value[value.length - 1]);
  }, arr);
  return result;
}

console.log(showFirstAndLast(["colt", "matt", "tim", "udemy"])); // ["ct", "mt", "tm", "uy"]
console.log(showFirstAndLast(["hi", "goodbye", "smile"])); // ['hi', 'ge', 'se']

/*
Write a function called addKeyAndValue which accepts an array of objects, a key, and a value and
returns the array passed to the function with the new key and value added for each object 

Examples:
    addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title',
      'instructor') 
    
    // [{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, {name: 'Matt',
      title:'instructor'}, {name: 'Colt', title:'instructor'}]

*/
function addKeyAndValue(arr, key, value) {
  var result = [];
  myForEach(function (val) {
    var newObj = { name: val.name };
    newObj[key] = value;
    result.push(newObj);
  }, arr);
  return result;
}

console.log(
  addKeyAndValue(
    [{ name: "Elie" }, { name: "Tim" }, { name: "Matt" }, { name: "Colt" }],
    "title",
    "instructor"
  )
);

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the
vowel and the values as the number of times the vowel appears in the string. This function should be
case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/
function vowelCount(str) {}
