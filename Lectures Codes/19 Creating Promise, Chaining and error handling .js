//Consuming Promise
const cart = ["Shoes", "Watches", "Flags"]

const promise = createOrder(cart);//return orderId

promise.then(function (orderId) {
    console.log(orderId)
    // procedToPayment(orderId);
})

//Creating a promise
//Producer side code
function createOrder(cart) {
    const pr = new Promise(function (resolve, reject) {
        //createOrder
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
            }, 5000)
        }
    });
    return pr;
}
function validateCart(cart) {
    return true;
}
