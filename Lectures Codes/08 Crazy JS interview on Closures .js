//Example on closure
function outer(){
    var a=10;
    function inner(){
        console.log(a);
    }
    return inner;
}
outer()();//It still remembers the value of a variable.