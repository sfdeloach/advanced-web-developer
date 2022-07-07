/**
 * Notes on 'this'
 *
 * - is a reserved keyword in JavaScript
 * - is usually determined by how a function is called, commonly referred to as the "function's
 *   execution context"
 * - 'this' is defined when a function is invoked and it will refer to the closest parent object
 * - prior to ES6 (2015), JavaScript only had global and function scope--remembering this will help
 *   when the reference of 'this' is defined within the context of a function's scope
 * - can be determined using four rules:
 *   - global - when 'this' is not inside of a declared object
 *   - object/implicit - when 'this' is defined (created by the definition of a function) inside of
 *     a declared object
 *   - explicit - using call, bind, and apply to define the context of 'this'
 *   - new - used when invoking functions, changes 'this' from the global object to an instance
 *     object
 */

// Global object (window in a browser, global in node) /////////////////////////////////////////////
// All declared objects are attached to the global object
var person = 'steven';
console.log(window.person === person); // true
console.log(this === window); // true

function whatIsThis() {
  return this; // this is still the global object
}

console.log(whatIsThis() === window); // true

// 'this' inside of a function still refers to the global object
function variablesInThis() {
  // bad practice, only for demo purposes
  this.person = 'stephanie'; // global person is not updated yet
}

console.log(window.person === 'steven'); // true

variablesInThis(); // now it has been changed

console.log(window.person === 'stephanie'); // true

// Strict mode, prevents 'this' from referring to the global object inside a function
function strictThis() {
  'use strict';
  return this;
}

console.log(typeof strictThis() === 'undefined'); // true

// Implicit/Object - when inside an object, 'this' inside of a method refers to the closest parent
// object, however, 'this' inside of a property refers because it is not contained within an object
var person = {
  firstName: 'steven',
  lastName: 'deloach',
  getGreeting: function () {
    return 'hello ' + this.firstName + ' ' + this.lastName;
  },
  getThis: this, // this is the global object
  getThisFn: function () {
    return this; // this is the person object
  }
};

console.log(person.getGreeting());
console.log(person.getThis === window); // true
console.log(person.getThisFn() === person); // true

// What happens when we have a nested object?
var person = {
  firstName: 'Colt',
  sayHi: function () {
    return 'Hi ' + this.firstName; // Hi Colt
  },
  determineContext: function () {
    return this === person; // true
  },
  dog: {
    sayHello: function () {
      // the dog object does not have a 'firstName' key
      return 'Hello ' + this.firstName; // Hello undefined
    },
    determineContext: function () {
      // 'this' in this context refers to the dog object
      return this === person; // false
    },
    getThis: function () {
      return this; // person.dog.getThis() === person.dog;
    },
    whatIsThis: this // this is still the global object
  }
};

// Explicit ////////////////////////////////////////////////////////////////////////////////////////

// These are methods that can only be applied to functions

/**
 * | NAME  | PARAMETERS              | INVOKES IMMEDIATELY? |
 * |-------|-------------------------|----------------------|
 * | call  | thisArg, a, b, c, ...   | Yes                  |
 * | apply | thisArg, [a, b, c, ...] | Yes                  |
 * | bind  | thisArg, a, b, c, ...   | No                   | <-- helpful for async code
 */

// using the same object above, but using the call function to call the dog.sayHello() method
// returns a different result

console.log(person.dog.sayHello.call(person)); // Hello Colt
console.log(person.dog.determineContext.call(person)); // true

function addNumbers(a, b, c, d) {
  return this.firstName + ' just calculated ' + (a + b + c + d);
}

var colt = { firstName: 'Colt' };
var elie = { firstName: 'Elie' };

console.log(addNumbers.call(colt, 1, 2, 3, 4)); // Colt just calculated 10
console.log(addNumbers.apply(elie, [2, 3, 4, 5])); // Elie just calculated 14

// Real world example, Math.max does not accept an array as an argument, using apply here will help
var nums = [3, 5, 7, 9];
console.log(Math.max.apply(this, nums)); // 9

var elieCalc = addNumbers.bind(elie);
var coltCalc = addNumbers.bind(colt, 1, 2);

// partial application of parameters - notice we can provide zero to all parameters when using bind
console.log(elieCalc(2, 3, 4, 5)); // Elie just calculated 14
console.log(coltCalc(1, 2)); // Colt just calculated 6

// using bind with async code
var steven = {
  firstName: 'steven',
  sayHello: function () {
    return 'hello ' + this.firstName;
  },
  waitThenHello: function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('hi ' + this.firstName); // this is bound to the global object
      }, 2000); // firstName is not defined in the global object
    });
  }
};

console.log(steven.sayHello()); // hello steven
steven.waitThenHello().then(function (message) {
  console.log(message); // (waits 2 seconds) hi undefined
});

// how to fix the above code with bind()
var steph = {
  firstName: 'steph',
  sayHello: function () {
    return 'hello ' + this.firstName;
  },
  waitThenHello: function () {
    return new Promise(function (resolve, reject) {
      setTimeout(
        function () {
          resolve('hi ' + this.firstName);
        }.bind(steph), // 'this' here refers to the 'steph' object
        2000
      );
    });
  }
};

console.log(steph.sayHello()); // hello steph
steph.waitThenHello().then(function (message) {
  console.log(message); // (waits 2 seconds) hi steph
});

/// new ////////////////////////////////////////////////////////////////////////////////////////////

function Car(year, make, model) {
  this.year = year;
  this.make = make;
  this.model = model;
}

var myFirstCar = new Car(1985, 'Honda', 'Prelude');

console.log(myFirstCar.year, myFirstCar.make, myFirstCar.model);
