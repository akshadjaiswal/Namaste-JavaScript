const test = {
  prop: Akshad,
  func: function () {
    return this.prop;
  },
};

console.log(test.func());
// Expected output: 42

const person = {
  name: "Akshad",
  age: 22,
  greet: function () {
    return `Hello ${this.name}, you are ${this.age} years old`;
  },
};
console.log(person.greet());

//this in global space

//this in insdie function

//this in stric t mode(this sbstitution)

//this value depends on how this is called(window)

//this inside a object method

//call apply bind method (sharing method)

//this insdie arrow function

//this inside nested arrow function

//this inside DOM
