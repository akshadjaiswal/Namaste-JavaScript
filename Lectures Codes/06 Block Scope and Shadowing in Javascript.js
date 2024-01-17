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

//Shadowing for function
var o=10;
function q(){
    var o=25;
    console.log(window.o);//Inside block scope o variable 
    window.o=20;
}
q();
console.log(o);//Outside block scope o variable 

//Illegal shadowing
// let w=200;
var w = 12;  // but we can shadow var using let
{
    // var w=20;//you cannot shadow let using var 
    let w = 20;// But you can shadow let using let
    console.log(w);
}
console.log(w);