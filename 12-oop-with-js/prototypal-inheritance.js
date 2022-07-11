/**
 * Inheritance in classical OOP languages can be mimicked in JavaScript
 */

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.sayHi = function () {
  console.log('Hi, my name is', this.firstName, this.lastName);
};

// Let's create a subclass called Student
function Student(firstName, lastName) {
  return Person.apply(this, arguments);
}

// Student should inherit the sayHi function, but it didn't!
var me = new Student('Steven', 'DeLoach');
// me.sayHi() // Error: me.sayHi is not a function

// Linking the prototype objects is a quick fix, but has unintended consequences
Student.prototype = Person.prototype;
var me = new Student('Steven', 'DeLoach');
me.sayHi(); // Hi, my name is Steven DeLoach

// But now the prototypes for both Person and Student are referencing the same object, that means
// any new methods added to Student will also be seen in Person objects, this is not inheritance!
// We want to create a deep copy of the Person prototype:
Student.prototype = Object.create(Person.prototype);

// One more fix needed because
Student.prototype.constructor === Person; // true, but we want it to point to Student not person
Student.prototype.constructor = Student;
