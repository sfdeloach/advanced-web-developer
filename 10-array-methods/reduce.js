/**
 * reduce
 *
 * - accepts a callback function and a second optional parameter
 * - iterates through the array
 * - runs the callback on each value in the array
 * - the first parameter to the callback is either the first value in the array or the optional
 *   second parameter
 * - the first parameter to the callback is often called the "accumulator"
 * - the returned value from the callback becomes the new value of the accumulator
 * - whatever is returned from the callback function becomes the new value of the accumulator
 */

var a = [{ val: 1 }, { val: 2 }, { val: 3 }, { val: 4 }];

console.log(
  a.reduce(function (prev, curr, index) {
    console.log('index', index);
    return { val: prev.val + curr.val };
  })
); // { val: 10 }

console.log(a);

console.log(
  a.reduce(
    function (prev, curr, index) {
      console.log('index', index);
      return { val: prev.val + curr.val };
    },
    { val: -10 }
  )
); // { val: 0 }

console.log(a);

function myReduce(arr, callback, initial) {
  var copy = JSON.parse(JSON.stringify(arr)); // deep copy
  if (initial) copy.unshift(initial);
  for (var i = 1; i < copy.length; ++i) {
    copy[i] = callback(copy[i - 1], copy[i], i, arr);
  }
  return copy[i - 1];
}

console.log(
  'myReduce',
  myReduce(
    a,
    function (prev, curr, index) {
      console.log(prev, curr, index);
      return { val: prev.val + curr.val };
    },
    { val: -10 }
  )
); // myReduce { val: 0 }

console.log(a); // array was not affected by 'myReduce'

// EXERCISES ///////////////////////////////////////////////////////////////////////////////////////

/*
Write a function called extractValue which accepts an array of objects and a key and returns a new
array with the value of each object at the key.

Examples: var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    extractValue(arr,'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractValue(arr, key) {
  return arr.reduce(function (accumulator, current) {
    accumulator.push(current[key]);
    return accumulator;
  }, []);
}

var arr = [
  { name: 'Elie' },
  { name: 'Tim' },
  { name: 'Matt' },
  { name: 'Colt' }
];

console.log('- - -');
console.log(extractValue(arr, 'name')); // ['Elie', 'Tim', 'Matt', 'Colt']

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the
vowel and the values as the number of times the vowel appears in the string. This function should be
case insensitive so a lowercase letter and uppercase letter should count

Examples: vowelCount('Elie') // {e:2,i:1};
          vowelCount('Tim') // {i:1};
          vowelCount('Matt') // {a:1})
          vowelCount('hmmm') // {};
          vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

function vowelCount(str) {
  return str
    .toLowerCase()
    .split('')
    .reduce(function (accumulator, current) {
      var vowels = 'aeiou';
      if (vowels.indexOf(current) !== -1) {
        accumulator[current] = ++accumulator[current] || 1;
      }
      return accumulator;
    }, {});
}

console.log(vowelCount('Elie')); // {e:2,i:1};
console.log(vowelCount('Tim')); // {i:1};
console.log(vowelCount('Matt')); // {a:1})
console.log(vowelCount('hmmm')); // {};
console.log(vowelCount('I Am awesome and so are you')); // {i: 1, a: 4, e: 3, o: 3, u: 1};

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of
objects passed to it with each object now including the key and value passed to the function.

Examples: var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];

    addKeyAndValue(arr, 'title', 'Instructor') // 
      [
        {title: 'Instructor', name: 'Elie'}, 
        {title: 'Instructor', name: 'Tim'}, 
        {title: 'Instructor', name: 'Matt'}, 
        {title: 'Instructor', name: 'Colt'}
      ]
*/

function addKeyAndValue(arr, key, value) {
  return arr.reduce(function (accumulator, current) {
    current[key] = value;
    accumulator.push(current);
    return accumulator;
  }, []);
}

arr = [{ name: 'Elie' }, { name: 'Tim' }, { name: 'Matt' }, { name: 'Colt' }];

console.log(addKeyAndValue(arr, 'title', 'Instructor'));

/*
Write a function called partition which accepts an array and a callback and returns an array with
two arrays inside of it. The partition function should run the callback function on each value in
the array and if the result of the callback function at that specific value is true, the value
should be placed in the first subarray. If the result of the callback function at that specific
value is false, the value should be placed in the second subarray. 

Examples:

    function isEven(val){
        return val % 2 === 0;
    }

    var arr = [1,2,3,4,5,6,7,8];

    partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];

    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }

    var names = ['Elie', 'Colt', 'Tim', 'Matt'];

    partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]
*/

function partition(arr, callback) {
  return arr.reduce(
    function (accumulator, current) {
      if (callback(current)) {
        accumulator[0].push(current);
      } else {
        accumulator[1].push(current);
      }
      return accumulator;
    },
    [[], []]
  );
}

function isEven(val) {
  return val % 2 === 0;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(partition(arr, isEven)); // [[2,4,6,8], [1,3,5,7]];

function isLongerThanThreeCharacters(val) {
  return val.length > 3;
}

var names = ['Elie', 'Colt', 'Tim', 'Matt'];

console.log(partition(names, isLongerThanThreeCharacters)); // [['Elie', 'Colt', 'Matt'], ['Tim']]
