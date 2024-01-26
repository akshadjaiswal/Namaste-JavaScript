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

const output = arr.map(double);
const output2 = arr.map(triple);
console.log(output);
console.log(output2);