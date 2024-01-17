//Block
if(true){
    //compound statement
    var x=100;
    console.log(x);
}

//Block Scope
{
    var a=10;
    let b=20;
    const c=30;
    console.log(a);
    console.log(b);
    console.log(c);
}
console.log(a);
// console.log(b); //Uncaught reference error due to the block scope
// console.log(c);

//Shadowing
var x=100;//This variable is shadowed by the x varioable present in the block
let y=200;
const z=300;
{
    var x=10;//It shadows the variable x outside the block
    let y=20;
    const z=30;
    console.log(x);
    console.log(y);
    console.log(z);
}
console.log(x);
console.log(y);//It will print the y variable present outside the block
console.log(z);//It will print the z variable present outside the block