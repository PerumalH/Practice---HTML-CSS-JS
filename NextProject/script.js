"use strict";

/*--

oops
1. Concepts of object
2. use object to model - describe real-world or abstract feature.
3. object may have data and methods.
4. In oops, object are self-contained pieces/blocks of code.
5. objects are building blocks of application, and interact with each other.
6. interact through public API:
7. it's for organize the code.

first - class is a structure, by this structure - we can create more instance with same structure.

4 - fundamental principle

1. Abstraction
    ignoring and hiding details that don't matter.

2. Encapsulation
    keep data and methods private inside the class, 
    so they can't access from outside of the class.
    some methods can be exposed as a public interface.

3. inheritance
    child class inheritance (extends) the parent class.

    child has own methods and properties , also inherit the methods and data of parent class
    it's reuse the common logic and to model real-world relationships.

4. polymorphism
    a child class can overwrite a method it inherited from a parent class.


oops in js - Prototypes

          object ---> prototypes

1. Objects are linked to a prototype object.
2. prototypical inheritance: the prototype contain methods that are accessible
to all objects linked to that prototype.
3. behavior is delegated to the linked prototype object.

3 way of implementing prototypal inheritance in js.

1. constructor functions.
   - technique to create objects from a function
   - this is how built-in objects lk array, maps or sets are actually implemented.
2. ES6 classes
   - modern alternative to constructor function syntax.
   - "Syntactic sugar" : bts - it's works same as cf.
3. object.create()
   - the easiest most straightforward way of linking an object to a prototype object

construction fun - not work on Arrow function. - this patten developed by other developer.

with new keyword - we create a function object.

1 - {} is created..
2 - function is called, this = {}
3 - {} linked to prototype.
4 - function autoMatically return empty {}


person.prototype not of a person,but object created by person

this - set to the new object.
new object - linked to function's prototype property
that object return from constructor function call.



__Proto__ - always point to objects prototype.

object inheritance the calcage from prototype - prototypal inheritance/delegation

prototype chain - when we create function it created own object - that to have prototype. it's has some methods.

static methods - are not available in instance

--*/

// const Person = function (firstname, birthYear) {
//   this.firstname = firstname;
//   this.birthYear = birthYear;
//   // never do this- if we create more number object - we create ex:1000 copy of func
//   //performance issue will occur.
//   //   this.calage = function () {
//   //     console.log(2037 - this.birthYear);
//   //   };
// };

// const hpk = new Person("hpk", 2000);

// console.log(hpk instanceof Person);

// //Prototypes - each function has - also construction
// console.log(Person.prototype);

// Person.prototype.calage = function () {
//   console.log(2037 - this.birthYear);
// };

// hpk.calage();
// Person.prototype.___e = "NIKA";

// console.log(hpk, Person.prototype.prototype);

const Car = function (carData) {
  this.speed = `${Number.parseInt(carData, 10)}`;
  console.log(this.speed, carData);
};

Car.prototype.accelerate = function () {
  const New_speed = Number.parseInt(this.speed, 10) + 10;
  console.log(`New Speed: ${New_speed} km/h`);
};

Car.prototype.brake = function () {
  const Brake = Number.parseInt(this.speed, 10) - 5;
  console.log(`Brake : ${Brake} km/h`);
};

const car1 = new Car(`120 km/h`);
const car2 = new Car(`95 km/h`);

car1.accelerate();
car1.brake();

car2.accelerate();
car2.brake();

/*
E6 Classes

class expression - const PersonCL = class {}
class declaration - class PersonCL{}


we can do add the function in the prototype.

1. classes are not hoisted
2. class are first-class citizens
3. classes are executed in strict mode.
*/

class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //this will add to prototype property
  calc() {
    console.log(2037 - this.birthYear);
  }

  set firstName(name) {
    this._firstName = name;
  }
  get firstName() {
    return this._firstName;
  }
}

const Nika = new PersonCL("Jessica", 199);

/*

setter and getter

g - when we need to read as property.
s - when we need to write as property.

for validation on new object creation
*/

const account = {
  owner: "HPK",
  movements: [2, 1, 3, 5, 21],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

account.latest;
account.latest = 89;

class CarCheck {
  constructor(carData) {
    this.speed = carData;
  }

  accelerate() {
    const New_speed = Number.parseInt(this.speed, 10) + 10;
    console.log(`New Speed: ${New_speed} km/h`);
  }

  break() {
    const Brake = Number.parseInt(this.speed, 10) - 5;
    console.log(`Brake : ${Brake} km/h`);
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(value) {
    this.speed = value * 1.6;
  }
}

const check = new CarCheck(124);
// check.accelerate();
// check.break();
// console.log(check.speedUS);
// check.speedUS = 234;
// console.log(check);
// console.log(check.speedUS);

/*inheritance with constructor function.

create parent func - 1
create child func - 1

to get the property of parent - we have use call function.

to get the method of parent - we have set child prototype with new object by parent prototype.
**this is called linking the prototype

create class by new operator with child function.

we can set the constructor of child like = child's one;
because we link to parent - constructor of child would be parent one.


*/

const EV = function (speed, battery) {
  Car.call(this, speed);
  this.battery = battery;
};

EV.prototype = Object.create(Car.prototype);

const Ecar = new EV(99, 20);

Ecar.accelerate();
