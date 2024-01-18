//SetTImeout Easy question
function x() {
    var i = 1;
    setTimeout(function () {
        console.log(i);
    }, 3000);
    console.log("Hello from Akshad");//It will first print this console then wait for 3000ms to print the value of i.//JavaScript waits for no one.
}
x();//This set timeout will print the value of i=1 after 3 sec.

//Print the number 1 to 5 after each seconds using setTimeout
function x() {
    //let has block scope and it creates the new copies i after every loop
    for (let i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}
x();
