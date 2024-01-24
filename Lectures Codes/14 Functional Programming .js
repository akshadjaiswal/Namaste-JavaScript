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
console.log(calculate(radius, area));
console.log(calculate(radius, circumeference));
console.log(calculate(radius, diameter));


