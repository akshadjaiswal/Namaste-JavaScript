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

//Pass an paramerter in outer function
function outer(b) {
    function inner() {
        console.log(a, b);
    }
    let a = 10;
    return inner;
}
var close = outer("Hello from Akshad");
close();

//Relation of scope chain and closure
function outest() {
    function outer(b) {
        var c = 20;
        function inner() {
            console.log(a, b, c);
        }
        let a = 10;
        return inner;
    }
    return outer;
}
var close = outest()("Hello from Akshad");
close();

//Conflicting name of global variable let in js
function outest() {
    function outer(b) {
        var c = 20;
        function inner() {
            console.log(a, b, c);
        }
        let a = 10;
        return inner;
    }
    return outer;
}
let a = 100;//but it will still print the value of a present in the function scope.
var close = outest()("Hello from Akshad");
close();