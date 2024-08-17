//Consuming Promise
const cart = ["Shoes", "Watches", "Flags"]

createOrder(cart)//return orderId
    .then(function (orderId) {
        console.log(orderId)
        return orderId;
    })
    .then(function (orderId) {
        return procedToPayment(orderId);
    })
    .then(function (paymentInfo) {
        console.log(paymentInfo);
    })
    .catch(function (err) {
        console.log(err.message);
    })//Handling error and displaying normally in console 

//Creating a promise
//Producer side code
function createOrder(cart) {
    const pr = new Promise(function (resolve, reject) {
        //validateCart
        if (!validateCart(cart)) {
            const err = new Error("Cart is not valid")
            reject(err);
        }
        //CreateOrder
        const orderId = "12345";
        if (orderId) {
            setTimeout(function () {
                resolve(orderId);
            }, 2000)
        }
    });
    return pr;
}
function procedToPayment() {
    return new Promise(function (resolve, reject) {
        resolve("Payment Successful")
    })
}
function validateCart(cart) {
    // return true;
     return false;
// It will throw an error.//Card is not valid
}
