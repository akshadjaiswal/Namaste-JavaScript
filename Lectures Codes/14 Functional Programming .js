//Basic example of higher order function
function x() {
    console.log("Akshad");
}
function y(x) {

}

//Normally used method to calculate area and circumferenece
const radius = [1, 2, 3, 4, 5];

const calculateArea = function (radius) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(Math.PI * radius[i] * radius[i]);
    }
    return output;
}

console.log(calculateArea(radius));

//circumference normal
const circumfereneceOfCircle = function (radius) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(2 * Math.PI * radius[i])
    }
    return output;
}
console.log(circumfereneceOfCircle(radius));

//for diameter
const diameterOfCircle = function (radius) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(2 * radius[i])
    }
    return output;
}
console.log(diameterOfCircle(radius));

///By functional programming using generic function
const area = function (radius) {
    return Math.PI * radius * radius;
}
const circumeference = function (radius) {
    return 2 * Math.PI * radius;
}
const diameter = function (radius) {
    return 2 * radius;
}

const calculate = function (radius, logic) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]))
    }
    return output;
}
// console.log(calculate(radius, area));
// console.log(calculate(radius, circumeference));
// console.log(calculate(radius, diameter));

// Map function // although it is same as above function 
console.log(radius.map(area));
console.log(radius.map(circumeference));
console.log(radius.map(diameter));

//Polyfill for map function
Array.prototype.calculate = function (logic) {
    const output = [];
    for (let i = 0; i < this.length; i++) {
        output.push(logic(this[i]))
    }
    return output;
}

// Map function
console.log(radius.calculate(area));


console.log(radius.calculate(circumeference));

