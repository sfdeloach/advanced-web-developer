/**
 * OBJECTIVES
 *
 * - Understand what the prototype object is
 * - Describe and diagram the relationship between __proto__, prototype, and constructor
 * - Add methods and properties on the prototype object to write more efficient code
 * - Explain the differences between adding methods and properties to the prototype versus the
 *   constructor function
 * - Implement inheritance in JavaScript through the prototype object
 *
 * Remember that when the keyword 'new' is used during function invocation, four things occur:
 *
 * - Creates an object out of thin air
 * - Assigns the value of 'this' to be that object
 * - Adds 'return this' to the end of the function
 * - Creates a link (which we can access as __proto__) between the object created and the prototype
 *   property of the constructor function
 */

// A constructor function
function Person(firstname, lastname, age) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.age = age;
}

// Every constructor function has a property called "prototype", which is an object
console.dir(Person.prototype); // { constructor: f Person(firstname, lastname, age) }
console.log(typeof Person.prototype); // object

// Each prototype object has a "constructor" property that points back to the constructor function
console.log(Person.prototype.constructor === Person); // true

// Objects created from the constructor function receive a property called "__proto__", which links
// the object and the prototype property of the constructor function
var steven = new Person('steven', 'deloach', 46);
console.log(Person.prototype === steven.__proto__); // true
console.log(steven.__proto__.constructor === Person); // true

/**
 *             .prototype
 * Constructor -----------> Person
 *  Function              .prototype <------------ steven
 *  'Person' <------------- object     .__proto__  object
 *            .constructor
 */

/**
 * When methods and properties are added to the Person.prototype object, all objects created from
 * the constructor function will have access to them
 */
Person.prototype.height = 78;
Person.prototype.getHeight = function () {
  return this.height / 12;
};

console.log(steven.height); // 78 (notice this is a static property)
console.log(steven.getHeight()); // 6.5

// Refactor Challenge from lesson 141 //////////////////////////////////////////////////////////////

// Keep properties within the constructor function definition to prevent static data binding

function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isRunning = false;
}

// Add methods to the prototype to reduce overhead

Vehicle.prototype.turnOn = function () {
  this.isRunning = true;
};

Vehicle.prototype.turnOff = function () {
  this.isRunning = false;
};

Vehicle.prototype.honk = function () {
  if (this.isRunning) return 'beep';
};
