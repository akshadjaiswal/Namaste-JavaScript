// Basic Example of closure
function x() {
    var a = 9;
    function y() {
        console.log(a);
    }
    // y();
    return y;//In javascript you can return the functions
}
var z = x();
console.log(z);//It will return what is present in the function y.
z(); //It will still return the value of a.

//Corner Cases
function b() {
    var e = 99;
    function w() {
        var c = 9;
        function d() {
            console.log(c, e);
        }
        d();
    }
    w();
}
b();