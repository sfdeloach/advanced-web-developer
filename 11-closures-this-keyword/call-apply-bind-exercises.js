/*
Write a function called arrayFrom which converts an array-like-object into an array.

Examples:
    var divs = document.getElementsByTagName('divs');
    divs.reduce // undefined
    var converted = arrayFrom(divs);
    converted.reduce // function(){}....
*/

function arrayFrom(arrayLikeObject) {
  return [].slice.call(arrayLikeObject);
}

/* 
// Write a function called sumEvenArguments which takes all of the arguments passed to a function
and returns the sum of the even ones.

Examples: sumEvenArguments(1,2,3,4) // 6
          sumEvenArguments(1,2,6) // 8
          sumEvenArguments(1,2) // 2
*/

function sumEvenArguments() {
  var args = arrayFrom(arguments);

  return args.reduce(function (accumulator, current) {
    if (current % 2 == 0) return accumulator + current;
    return accumulator;
  }, 0);
}

/* 
Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should
return a function that when called increments a counter. If the counter is greater than the maximum
amount, the inner function should return "Maxed Out"

Examples:

    function add(a,b){
        return a+b
    }

    var addOnlyThreeTimes = invokeMax(add,3);
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(2,2) // 4
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(1,2) // "Maxed Out!"

*/

/**
 * This solution uses closure on the num parameter to keep track of how many times the function is
 * called. The apply method is then called on the provided fn function and is passed an empty object
 * for its thisArg. It does not matter in this case what the context is since fn is assumed to have
 * no use for an object's properties. The arguments on the returned function are converted into an
 * array and passed as the second argument. The apply method is used since the second parameter is
 * an array.
 */
function invokeMax(fn, num) {
  return function () {
    num--;
    if (num < 0) {
      return "Maxed Out!";
    }
    return fn.apply(this, [].slice.call(arguments)); // 'this' in this context does not matter
  };
}

/* 
Write a function called once which accepts two parameters, a function and a value for the keyword
'this'. Once should return a new function that can only be invoked once, with the value of the
keyword this in the function set to be the second parameter.

Examples:

    function add(a,b){
        return a+b
    }

    var addOnce = once(add, this);
    addOnce(2,2) // 4
    addOnce(2,2) // undefined
    addOnce(2,2) // undefined

    function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }

    var instructor = {firstName: "Elie"}
    var doMathOnce = once(doMath, instructor);
    doMathOnce(1,2,3) // "Elie adds 6"
    doMathOnce(1,2,3) // undefined


*/

function once(fn, thisArg) {
  var invokable = true;
  return function () {
    if (invokable) {
      invokable = false;
      return fn.apply(thisArg, [].slice.call(arguments));
    }
  };
}

// BONUSES!

/* 
Write a function called bind which accepts a function and a value for the keyword this. Bind should
return a new function that when invoked, and will invoke the function passed to bind with the
correct value of the keyword this. HINT - if you pass more than two parameters to bind, those
parameters should be included as parameters to the inner function when it is invoked. You will have
to make use of closure!

Examples:

    function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
    }

    var person = {
        firstName: 'Elie'
    }

    var bindFn = bind(firstNameFavoriteColor, person);
    bindFn('green') // "Elie's favorite color is green"

    var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
    bindFn2('green') // "Elie's favorite color is blue" 

    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

    bind(addFourNumbers,this,1)(2,3,4) // 10
    bind(addFourNumbers,this,1,2)(3,4) // 10
    bind(addFourNumbers,this,1,2,3)(4) // 10
    bind(addFourNumbers,this,1,2,3,4)() // 10
    bind(addFourNumbers,this)(1,2,3,4) // 10
    bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10

*/

/**
 * The key here was to combine the arguments array from the bind function and the function 'fn' that
 * is passed to it. The first two arguments in bind are removed before concatenation occurs.
 */
function bind(fn, thisArg) {
  var args = [].slice.call(arguments).slice(2); // return an array of args from 2 to n
  return function () {
    return fn.apply(thisArg, args.concat([].slice.call(arguments)));
  };
}

/* 
Write a function called flip which accepts a function and a value for the keyword this. Flip should
return a new function that when invoked, will invoke the function passed to flip with the correct
value of the keyword this and all of the arguments passed to the function REVERSED. HINT - if you
pass more than two parameters to flip, those parameters should be included as parameters to the
inner function when it is invoked. You will have to make use of closure! 

Flip should return a new function that when invoked takes the correct number of required arguments
to that function which are then reversed. HINT - you will need to use the .length property on
functions to figure out the correct amount of arguments. For example:

flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) 

Examples:

    function personSubtract(a,b,c){
        return this.firstName + " subtracts " + (a-b-c);
    }

    var person = {
        firstName: 'Elie'
    }

    var flipFn = flip(personSubtract, person);
    flipFn(3,2,1) // "Elie subtracts -4"

    var flipFn2 = flip(personSubtract, person, 5,6);
    flipFn2(7,8). // "Elie subtracts -4"

    function subtractFourNumbers(a,b,c,d){
        return a-b-c-d;
    }

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/

function flip(fn, thisArg) {
  var outerArgs = [].slice.call(arguments).slice(2);
  return function () {
    var innerArgs = [].slice.call(arguments);
    var combinedArgs = outerArgs.concat(innerArgs).slice(length);
    var reversedArgs = [];
    combinedArgs.forEach(function (val) {
      reversedArgs.unshift(val);
    });
    return fn.apply(thisArg, reversedArgs);
  };
}

function subtractFourNumbers(a, b, c, d) {
  return a - b - c - d;
}

console.log(flip(subtractFourNumbers, this, 1)(2, 3, 4)); // -2
console.log(flip(subtractFourNumbers, this, 1, 2)(3, 4)); // -2
console.log(flip(subtractFourNumbers, this, 1, 2, 3)(4)); // -2
console.log(flip(subtractFourNumbers, this, 1, 2, 3, 4)()); // -2
console.log(flip(subtractFourNumbers, this)(1, 2, 3, 4)); // -2
console.log(flip(subtractFourNumbers, this, 1, 2, 3)(4, 5, 6, 7)); // -2
console.log(flip(subtractFourNumbers, this)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // -2
console.log(flip(subtractFourNumbers, this, 11, 12, 13, 14, 15)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // -22
