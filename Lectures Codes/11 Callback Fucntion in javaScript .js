//What is callback function in the javascript
setTimeout(function () {
    console.log("timer")
}, 5000);
function x(y) {
    console.log("x")
    y()
}
x(function y() {
    console.log("y")
});

//Event handler and listeners in javascript
document.getElementById("clickMe")
    .addEventListener("click", function xyz() {
        console.log("button clicked");
    })

//Event handler and listeners in javascript using closures finding the count of click.
function attachEventListener() {
    let count = 0;
    document.getElementById("clickMe")
        .addEventListener("click", function xyz() {
            console.log("Button clicked", ++count);
        })
}
attachEventListener();
