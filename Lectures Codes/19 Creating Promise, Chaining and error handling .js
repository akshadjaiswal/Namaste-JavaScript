//Consuming Promise
const cart2 = ["Shoes", "Watches", "Flags"]

const promise = createOrder(cart);//return orderId

promise.then(function () {
    procedToPayment(orderId);
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
            resolve(orderId);
        }
    });
    return pr;
}
