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
    var a = 10;//Even if we more the position of variable declartion it is still closure
    return inner;
}
outer()();