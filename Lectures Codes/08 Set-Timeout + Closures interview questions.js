//SetTImeout Easy question
function x() {
    var i = 1;
    setTimeout(function () {
        console.log(i);
    }, 3000);
    console.log("Hello from Akshad");//It will first print this console then wait for 3000ms to print the value of i.//JavaScript waits for no one.
}
x();//This set timeout will print the value of i=1 after 3 sec.