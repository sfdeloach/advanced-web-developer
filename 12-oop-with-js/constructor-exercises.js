/**
 * the keyword new does 4 things:
 *
 * - it creates an empty object out of thin air
 * - sets the value of 'this' to point to an instance of the object created when the function is
 *   invoked
 * - adds an implicit 'return this' at the end of the function
 * - adds the "dunder proto" __proto__ property to the object just created
 */

function Dog(name, age) {
  this.name = name;
  this.age = age;
  this.bark = function () {
    console.log(this.name, 'just barked!');
  };
  return this; // this is implied and not necessary to include
}

var brisket = new Dog('brisket', 18);
brisket.bark(); // brisket just barked!
