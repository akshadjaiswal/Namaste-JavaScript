//Promises
const cart = ["Shoes", "Watches", "Flags"]

// Below two functions are asynchronous and dependent on each other
const orderId = createOrder(cart);
procedToPayment(orderId);

// with Callback (Before Promise)
// Below here, it is the responsibility of createOrder function to first create the order then call the callback function
createOrder(cart, function () {
    procedToPayment(orderId)
});
// Above there is the issue of `Inversion of Control

const promise = createOrder(cart);//// this promiseR has access to `then`
// {data: undefined}
// Initially it will be undefined so below code won't trigger
// After some time, when execution has finished and promiseRef has the data then automatically the below line will get triggered.

promise.then(function () {
    procedToPayment(orderId)
}); //Here we attaching a function to promise object