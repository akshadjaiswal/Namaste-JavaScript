a();//It will call the function a
// b();//It will throw an error undefined

//Function Expression
//also called as function declaration
function a() {
    console.log("a called");
}
//a()//you can call it from here 

//Function Declaration
var b = function () {
    console.log("b called");
}
b()//you can only call it after the function