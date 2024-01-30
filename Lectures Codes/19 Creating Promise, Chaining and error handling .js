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

    });
    return pr;
}
