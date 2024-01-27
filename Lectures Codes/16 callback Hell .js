//CallBack in javascript
console.log("Akshad");

setTimeout(function () {
    console.log("999");
}, 5000);

console.log("Jaiswal")

//Here one call back in to another call back and another callback in another callback and soo on will create the large callback hell
const cart = ["pants", "shoes", "watch"]

api.createOrder(cart, function () {

    api.makePayment(function () {

        api.showSummary(
            function () {
                api.updateWallet()
            }

        )
    })
})




