console.log(x); // undefined
var x = 25;
console.log(x); // 25
console.log(a); // Uncaught ReferenceError: a is not defined

//checking defined and undefined cases
console.log(a);
var a;
console.log(a);
a = 5;
if (a === undefined) {
    console.log("a is undefined")
}
else {
    console.log("a is not undefined")
}

//Holding in javascript
var b;
console.log(b);
b = 10;
console.log(b);
b = "Hello Akshad"
console.log(b);