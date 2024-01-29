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

//Promises chaining in javascript
const cart2 = ["Shoes", "Watches", "Flags"]

const orderId2 = createOrder(cart2);
procedToPayment(orderId2);

createOrder(cart2, function (orderId2) {
    procedToPayment(orderId2, function (paymentInf) {
        showOrderSummary(paymentInf, function () {
            updateWalletBalance()
        })
    })
});

// const promise = createOrder(cart2);
// promise.then(function () {
//     procedToPayment(orderId2)
// }); 

createOrder(cart2).then(function (orderId2) {
    return procedToPayment(orderId2);
})
    .then(function (paymentInf) {
        return showOrderSummary(paymentInf)
    })
    .then(function () {
        return updateWalletBalance();
    })