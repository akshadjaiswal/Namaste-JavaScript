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