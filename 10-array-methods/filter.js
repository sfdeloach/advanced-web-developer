/**
 * filter
 *
 * - creates a new array
 * - iterates through an array
 * - runs a callback function on each value in the array
 * - if the callback function returns true, that value is placed into the new array
 * - if the callback function returns false, that value will not be placed into the new array
 * - REMEMBER: the result of the callback will always be a boolean
 */

var numbers = [4, 1, 9, 4, 0, -3, 2, -12, 7, -2];
var family = [
  { name: "Steven", sex: "M" },
  { name: "Stephanie", sex: "F" },
  { name: "Lillian", sex: "F" },
  { name: "Cookie", sex: "F" },
  { name: "Mayor", sex: "M" },
];

var negativeNumbers = numbers.filter(function (value) {
  return value < 0;
});

var girlsOnly = family.filter(function (value) {
  return value.sex === "F";
});

console.log(negativeNumbers); // [-3, -12, -2]
console.log(girlsOnly); // [{name:'Stephanie',sex:'F'},{name:'Lillian',sex:'F'},{ name:'Cookie',sex:'F'}]

function myFilter(array, callback) {
  var filteredArray = [];
  for (var i = 0; i < array.length; ++i) {
    if (callback(array[i], i, array)) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
}

console.log(
  myFilter(numbers, function (value) {
    return value < 0;
  })
);

console.log(
  myFilter(family, function (value) {
    return value.sex === "F";
  })
);

// EXERCISES ///////////////////////////////////////////////////////////////////////////////////////

/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new
array with all the objects that contain that key.

Examples: filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner:
    true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}],
    'isCatOwner')
    // [{first:'Tim',last:"Garcia",isCatOwner:true},{first:'Colt',last:"Steele",isCatOwner:true}]
*/

function filterByValue(arr, key) {
  return arr.filter(function (value) {
    return value[key];
  });
}

console.log(
  filterByValue(
    [
      { first: "Elie", last: "Schoppik" },
      { first: "Tim", last: "Garcia", isCatOwner: true },
      { first: "Matt", last: "Lane" },
      { first: "Colt", last: "Steele", isCatOwner: true },
    ],
    "isCatOwner"
  )
);

/*
Write a function called find which accepts an array and a value and returns the first element in the
array that has the same value as the second parameter or undefined if the value is not found in the
array.

Examples: find([1,2,3,4,5], 3) // 3
          find([1,2,3,4,5], 10) // undefined
*/

function find(arr, searchValue) {
  return arr.filter(function (value) {
    return value === searchValue;
  })[0];
}

console.log(find([1, 2, 3, 3, 3, 4, 5], 3)); // 3
console.log(find([1, 2, 3, 4, 5], 10)); // undefined

/*
Write a function called findInObj which accepts an array of objects, a key, and some value to search
for and returns the first found value in the array.

Examples: findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner:
    true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}],
    'isCatOwner',true) // {first: 'Tim', last:"Garcia", isCatOwner: true}
*/

function findInObj(arr, key, searchValue) {
  return arr.filter(function (value) {
    return value[key] === searchValue;
  })[0];
}

console.log(
  findInObj(
    [
      { first: "Elie", last: "Schoppik" },
      { first: "Tim", last: "Garcia", isCatOwner: true },
      { first: "Matt", last: "Lane" },
      { first: "Colt", last: "Steele", isCatOwner: true },
    ],
    "isCatOwner",
    true
  )
);

/*
Write a function called removeVowels which accepts a string and returns a new string with all of the
vowels (both uppercased and lowercased) removed. Every character in the new string should be
lowercased.

Examples: removeVowels('Elie')   // ('l')
          removeVowels('TIM')    // ('tm')
          removeVowels('ZZZZZZ') // ('zzzzzz')
*/

function removeVowels(str) {}

/*
Write a function called doubleOddNumbers which accepts an array and returns a new array with all of
the odd numbers doubled (HINT - you can use map and fitler to double and then filter the odd
numbers).

Examples: doubleOddNumbers([1,2,3,4,5]) // [2,6,10] doubleOddNumbers([4,4,4,4,4]) // []
*/

function doubleOddNumbers(arr) {}
