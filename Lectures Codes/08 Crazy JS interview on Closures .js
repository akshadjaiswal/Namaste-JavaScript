//Example on closure
function outer() {
    var a = 10;
    function inner() {
        console.log(a);
    }
    return inner;
}
outer()();//It still remembers the value of a variable.

//Changing postion of variable
function outer() {
    // var a=10;
    function inner() {
        console.log(a);
    }
    var a = 10;//Even if we morve the position of variable declartion it is still closure
    return inner;
}
outer()();

//Changing var to let
function outer() {
    // var a=10;
    function inner() {
        console.log(a);
    }
    let a = 10;//Even if we change the var to let it is still closure
    return inner;
}
outer()();