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
z();//It will still return the value of a.