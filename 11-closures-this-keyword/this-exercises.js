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
 *   - new
 */

// Global object (window in a browser, global in node)
// All declared objects are attached to the global object
var person = "steven";
console.log(window.person === person); // true
console.log(this === window); // true

function whatIsThis() {
  return this; // this is still the global object
}

console.log(whatIsThis() === window); // true

// 'this' inside of a function still refers to the global object
function variablesInThis() {
  // bad practice, only for demo purposes
  this.person = "stephanie"; // global person is not updated yet
}

console.log(window.person === "steven"); // true

variablesInThis(); // now it has been changed

console.log(window.person === "stephanie"); // true

// Strict mode, prevents 'this' from referring to the global object inside a function
function strictThis() {
  "use strict";
  return this;
}

console.log(typeof strictThis() === "undefined"); // true

// Implicit/Object - when inside an object, 'this' inside of a method refers to the closest parent
// object, however, 'this' inside of a property refers because it is not contained within an object
var person = {
  firstName: "steven",
  lastName: "deloach",
  getGreeting: function () {
    return "hello " + this.firstName + " " + this.lastName;
  },
  getThis: this, // this is the global object
  getThisFn: function () {
    return this; // this is the person object
  },
};

console.log(person.getGreeting());
console.log(person.getThis === window); // true
console.log(person.getThisFn() === person); // true

// What happens when we have a nested object?
var person = {
  firstName: "Colt",
  sayHi: function () {
    return "Hi " + this.firstName; // Hi Colt
  },
  determineContext: function () {
    return this === person; // true
  },
  dog: {
    sayHello: function () {
      // the dog object does not have a 'firstName' key
      return "Hello " + this.firstName; // Hello undefined
    },
    determineContext: function () {
      // 'this' in this context refers to the dog object
      return this === person; // false
    },
    getThis: function () {
      return this; // person.dog.getThis() === person.dog;
    },
  },
};
