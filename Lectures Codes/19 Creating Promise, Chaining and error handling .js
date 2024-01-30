//Consuming Promise
const cart2 = ["Shoes", "Watches", "Flags"]

const promise = createOrder(cart);//return orderId

promise.then(function () {
    procedToPayment(orderId);
})