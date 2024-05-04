// "use strict"
// const test = {
//   prop: Akshad,
//   func: function () {
//     return this.prop;
//   },
// };

// console.log(test.func());
// // Expected output: 42

// const person = {
//   name: "Akshad",
//   age: 22,
//   greet: function () {
//     return `Hello ${this.name}, you are ${this.age} years old`;
//   },
// };
// console.log(person.greet());

//this in global space
console.log(this); //globalObject (window)

//this in inside a function
function x() {
  //value depends on strict and non strrict mode
  console.log(this);
}
//this in strict mode(this sbstitution)

//this value depends on how this is called(window)
x();
window.x();

//this inside a object method
const student = {
  name: "Akshad",
  printName: function () {
    console.log / this;
    console.log(this.name);
  },
};
student.printName();

const student2 = {
  name: "Aaradhana",
};

//call apply bind method (sharing method)
student.printName.call(student2);
//apply
//bind

//this insdie arrow function
const obj = {
  a: "akshad",
  x: () => {
    console.log(this);
  },
};
obj.x();
//this inside nested arrow function
const obj2 = {
  a: "akshad",
  x: function () {
    const y = () => {
      console.log(this);
    };
    y();
  },
};
obj2.x();
//this inside DOM =====> reference to HTML elements
