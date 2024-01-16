//let in js
console.log(b);//undefined
// console.log(a);//It will throw an error
let a = 10;
// let a=100; Syntax error i.e duplicates are not allowed
console.log(a);
var b = 20;
var b = 200;//But in case of var duplicates are allowed
console.log(b);

//const in js
let c;//Can initialize later in let
const d = 100;
d = 1000; // Error that you can't change the value of const variable
// const d; 
// d=100; initializing later will directly throw an error
c = 10;
console.log(c);