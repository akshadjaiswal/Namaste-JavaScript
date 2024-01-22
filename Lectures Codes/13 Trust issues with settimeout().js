//Past example of setimeout
console.log("Start")

setTimeout(function a() {
    console.log("Callback")
}, 5000);
console.log("End")

//Code demonstration for settimeout delay
//It will bloc your main thread for the ten seconds so even settimeout setted for 5 second but it will be printed after the 10sec
let startDate = new Date().getTime();
let endDate = startDate;
while (endDate < startDate + 10000) {
    endDate = new Date().getTime();
    // console.log(endDate)
}

console.log("while Expires")