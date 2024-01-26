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
function greaterThanFour(x) {
    return x > 4;
}
const odd = arr.filter(isOdd);
const even = arr.filter(isEven);
const greater = arr.filter(greaterThanFour);
console.log(odd);
console.log(even);
console.log(greater);

//Reduce - As the name reduce it actually does not reduce anything

//Sum or max
// Non reduce method

function sumOfArray(x) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    return sum;
}
console.log(sumOfArray(arr))

//By using reduce
const output4 = arr.reduce(function (acc, curr) { //accumulator and current
    acc = acc + curr;//acc is like sum and curr like arr[i]
    return acc;
}, 0)
console.log(output4);

//Max of array using normal function
function maxOfArray(x) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    return max;
}
console.log(maxOfArray(arr));

//Max of array using reduce
const output5 = arr.reduce(function (acc, curr) {
    if (acc < curr) {
        acc = curr;
    }
    return acc;
}, 0)
console.log(output5)

//Example of Map 
const users = [
    { firstName: "Akshad", lastName: "Jaiswal", age: 21 },
    { firstName: "Jarad", lastName: "Higgins", age: 22 },
    { firstName: "Arijit", lastName: "Singh", age: 33 },
    { firstName: "Tupac", lastName: "Shakur", age: 25 }
]

//List of full names
const fullname = users.map((x) => x.firstName + " "+  x.lastName)
console.log(fullname);
