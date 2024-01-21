//Event loops
//Browser functionality 
//DOM APIs
//settimeout
//console
//fetch()

console.log("Start")
setTimeout(function cb() {
    console.log("Callback")
}, 5000);
console.log("End")

//Example
console.log("Start")
document.getElementById("button")
    .addEventListener("click", function cb() {//addeventlistener is the another power given by rhe browser to the engine
        console.log("CallBack");
    });
console.log("End");
