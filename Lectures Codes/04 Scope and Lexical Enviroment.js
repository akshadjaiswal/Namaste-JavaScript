//Scope
function a() {
    var b = 10;
    console.log(b);
    c();
    function c() {
        // console.log(b);
    }
}
// console.log(b);//Uncaught reference undefined error b 
a();