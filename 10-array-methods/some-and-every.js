/**
 * some
 *
 * - iterates through an array
 * - runs a callback on each value in the array
 * - if the callback returns true for at least one single value it returns true
 * - otherwise it returns false
 * - just like filter, the callback will always result in a boolean value
 */

var names = ['steven', 'stephanie', 'lillian', 'tim', 'timothy'];

console.log(
  'expecting true:',
  names.some(function (value) {
    return value.length === 3;
  })
); // true

console.log(
  'expecting false:',
  names.some(function (value) {
    return value.length === 1;
  })
); // false

// example implementation of some
function mySome(array, callback) {
  for (var i = 0; i < array.length; ++i) {
    if (callback(array[i], i, array)) return true;
  }
  return false;
}

console.log(
  'expecting true:',
  mySome(names, function (value) {
    return value.length === 3;
  })
); // true

console.log(
  'expecting false:',
  mySome(names, function (value) {
    return value.length === 1;
  })
); // false

/**
 * every
 *
 * - iterates through an array
 * - runs a callback on each value
 * - if the callback returns false for any single value it returns false
 * - otherwise returns true
 * - the result is always returning a callback
 */

console.log(
  'expecting true:',
  names.every(function (value) {
    return value.length > 0;
  })
); // true

console.log(
  'expecting false:',
  names.every(function (value) {
    return value.length > 32;
  })
); // false

// example implementation of every
function myEvery(array, callback) {
  for (var i = 0; i < array.length; ++i) {
    if (!callback(array[i], i, array)) return false;
  }
  return true;
}

console.log(
  'expecting true:',
  myEvery(names, function (value) {
    return value.length > 0;
  })
); // true

console.log(
  'expecting false:',
  myEvery(names, function (value) {
    return value.length > 32;
  })
); // false

// EXERCISES ///////////////////////////////////////////////////////////////////////////////////////

/*
Write a function called hasOddNumber which accepts an array and returns true if the array contains
at least one odd number, otherwise it returns false.

Examples: hasOddNumber([1,2,2,2,2,2,4]) // true
          hasOddNumber([2,2,2,2,2,4]) // false
*/

function hasOddNumber(arr) {
  return arr.some(function (val) {
    return val % 2;
  });
}

console.log(hasOddNumber([1, 2, 2, 2, 2, 2, 4])); // true
console.log(hasOddNumber([2, 2, 2, 2, 2, 4])); // false

/*
Write a function called hasAZero which accepts a number and returns true if that number contains at
least one zero. Otherwise, the function should return false

Examples: hasAZero(3332123213101232321) // true
          hasAZero(1212121) // false
*/

function hasAZero(num) {
  return num
    .toString()
    .split('')
    .some(function (val) {
      return val === '0';
    });
}

console.log('- - -');
console.log(hasAZero(3332123213101232321)); // true
console.log(hasAZero(1212121)); // false
console.log(hasAZero(1)); // false

/*
Write a function called hasOnlyOddNumbers which accepts an array and returns true if every single
number in the array is odd. If any of the values in the array are not odd, the function should
return false. 

Examples: hasOnlyOddNumbers([1,3,5,7]) // true
          hasOnlyOddNumbers([1,2,3,5,7]) // false
*/

function hasOnlyOddNumbers(arr) {
  return arr.every(function (val) {
    return val % 2;
  });
}

console.log('- - -');
console.log(hasOnlyOddNumbers([1, 3, 5, 7])); // true
console.log(hasOnlyOddNumbers([1, 2, 3, 5, 7])); // false

/*
Write a function called hasNoDuplicates which accepts an array and returns true if there are no
duplicate values (more than one element in the array that has the same value as another). If there
are any duplicates, the function should return false.

Examples: hasNoDuplicates([1,2,3,1]) // false
          hasNoDuplicates([1,2,3]) // true
*/

function hasNoDuplicates(arr) {
  return arr.every(function (val, index) {
    return arr.lastIndexOf(val) === index;
  });
}

console.log('- - -');
console.log(hasNoDuplicates([1, 2, 3, 1])); // false
console.log(hasNoDuplicates([1, 2, 3])); // true

/*
Write a function called hasCertainKey which accepts an array of objects and a key, and returns true
if every single object in the array contains that key. Otherwise it should return false.

Examples: var arr = [ {title: "Instructor", first: 'Elie', last:"Schoppik"}, {title: "Instructor",
    first: 'Tim', last:"Garcia", isCatOwner: true}, {title: "Instructor", first: 'Matt',
    last:"Lane"}, {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]

    hasCertainKey(arr,'first') // true
    hasCertainKey(arr,'isCatOwner') // false
*/

function hasCertainKey(arr, key) {
  return arr.every(function (val) {
    return key in val;
  });
}

var arr = [
  { title: 'Instructor', first: 'Elie', last: 'Schoppik' },
  { title: 'Instructor', first: 'Tim', last: 'Garcia', isCatOwner: true },
  { title: 'Instructor', first: 'Matt', last: 'Lane' },
  { title: 'Instructor', first: 'Colt', last: 'Steele', isCatOwner: true }
];

console.log('- - -');
console.log(hasCertainKey(arr, 'first')); // true
console.log(hasCertainKey(arr, 'isCatOwner')); // false

/*
Write a function called hasCertainValue which accepts an array of objects and a key, and a value,
and returns true if every single object in the array contains that value for the specific key.
Otherwise it should return false.

Examples: var arr = [ {title: "Instructor", first: 'Elie', last:"Schoppik"}, {title: "Instructor",
    first: 'Tim', last:"Garcia", isCatOwner: true}, {title: "Instructor", first: 'Matt',
    last:"Lane"}, {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]

    hasCertainValue(arr,'title','Instructor') // true
    hasCertainValue(arr,'first','Elie') // false

*/

function hasCertainValue(arr, key, searchValue) {
  return arr.every(function (val) {
    return val[key] === searchValue;
  });
}

console.log('- - -');
console.log(hasCertainValue(arr, 'title', 'Instructor')); // true
console.log(hasCertainValue(arr, 'first', 'Elie')); // false
console.log(hasCertainValue(arr, 'isCatOwner', true)); // false
