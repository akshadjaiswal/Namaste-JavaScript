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
console.log(this) //globalObject (window)

//this in insdie function
function x(){
  //value depends on strict and non strrict mode
  console.log(this)
}
//this in stric t mode(this sbstitution)

//this value depends on how this is called(window)
x();
window.x();

//this inside a object method
 const obj={
  a: "Akshad",
  x: function (){
    console.log(this);
    console.log(this.a);
  }
 }
 obj.x();

//call apply bind method (sharing method)

//this insdie arrow function

//this inside nested arrow function

//this inside DOM
