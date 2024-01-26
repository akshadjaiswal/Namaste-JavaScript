//Map function //basically use to transform an array
const arr = [5, 1, 8, 7, 4];
//Double- [10,2,16,14,8]
function double(x) {
    return x * 2;
}

//Triple  the array
function triple(x) {
    return x * 3
}

//Binary values of  the array
function binary(x) {
    return x.toString(2);
}

const output = arr.map(double);
const output2 = arr.map(triple);
const output3 = arr.map(binary);
console.log(output);
console.log(output2);
console.log(output3);

//Filter is use to filter the value in arrays according to some specific logic

//Filter odd values from array
function isOdd(x) {
    return x % 2;
}
function isEven(x) {
    return x % 2 === 0;
}
function greaterThanFour(x){
    return x > 4;
}
const odd = arr.filter(isOdd);
const even = arr.filter(isEven);
const greater = arr.filter(greaterThanFour);
console.log(odd);
console.log(even);
console.log(greater);