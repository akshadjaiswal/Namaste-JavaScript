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

