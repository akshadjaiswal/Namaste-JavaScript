# Episode 2: Promises

> A Promise is a placeholder for a future value — an object representing the eventual completion or failure of an async operation, giving you back control over how you handle the result.

## Overview

Promises were introduced in ES6 to solve the two fundamental problems of callbacks: Callback Hell and Inversion of Control. A Promise is an object that represents the result of an async operation — it may not have a value yet, but it will either have one (fulfilled) or fail (rejected). Importantly, you handle the result yourself through `.then()` and `.catch()`, not by handing your callback to a third party.

## Key Concepts

### What is a Promise?

A **Promise** is an object that:
- Is a **placeholder** for the result of an async operation
- Represents the **eventual completion or failure** of that operation
- Can be in one of three states

```
Promise states:
  ┌──────────────────────────────────────────────────┐
  │  pending   →   fulfilled (resolved with value)   │
  │            →   rejected (with reason/error)       │
  └──────────────────────────────────────────────────┘
```

Once a Promise transitions from `pending` to either `fulfilled` or `rejected`, **it never changes state again** (immutable result).

### The Three States

| State | Description | Transition |
|-------|-------------|------------|
| `pending` | Initial state — async operation in progress | → fulfilled or rejected |
| `fulfilled` | Operation completed successfully — has a value | Terminal state |
| `rejected` | Operation failed — has a reason/error | Terminal state |

### How Promises Solve Inversion of Control

With callbacks, you hand your function to a third party. With Promises, the third-party function **returns a Promise object**. You attach your handler to the Promise yourself — with `.then()`. The Promise API (not the third party) calls your handler when the Promise settles. Control returns to you.

```javascript
// Old callback approach — third party controls the callback
createOrder(cart, function(orderId) { // you hand over control here
  // createOrder decides when/if this runs
});

// Promise approach — you control what happens with the result
const orderPromise = createOrder(cart); // returns a promise
orderPromise.then(function(orderId) {  // YOU attach the handler
  // Promise API guarantees this runs exactly once, on fulfillment
  proceedToPayment(orderId);
});
```

### How Promises Solve Callback Hell

Instead of nesting, Promises chain. Each `.then()` receives the result of the previous step and can return a new Promise, which the next `.then()` handles:

```javascript
// Promise chaining — flat, readable, left-to-right
createOrder(cart)
  .then(function(orderId) {
    return proceedToPayment(orderId);  // returns a promise
  })
  .then(function(paymentInfo) {
    return showOrderSummary(paymentInfo);
  })
  .then(function() {
    return updateWalletBalance();
  })
  .catch(function(err) {
    console.error("Something went wrong:", err);
  });
```

### Promise Guarantees

The Promise API provides these guarantees (which callbacks cannot):
1. Callbacks attached via `.then()` are **never called before** the current synchronous code finishes (always async — Microtask Queue)
2. Callbacks are called **exactly once** — either on fulfillment or rejection
3. Callbacks added via `.then()` even after the Promise has already settled **will still be called**
4. Multiple `.then()` callbacks on the same Promise can be chained

### Creating Promises

```javascript
const promise = new Promise(function(resolve, reject) {
  // Async operation here
  const success = true;

  if (success) {
    resolve("Data loaded!"); // fulfills the promise
  } else {
    reject(new Error("Failed to load")); // rejects the promise
  }
});
```

The function passed to `new Promise()` is called the **executor**. It receives two functions:
- `resolve(value)` — fulfills the Promise with `value`
- `reject(reason)` — rejects the Promise with `reason`

### Consuming Promises

```javascript
promise
  .then(function(value) {
    // Called when promise fulfills
    console.log(value); // "Data loaded!"
  })
  .catch(function(error) {
    // Called when promise rejects
    console.error(error.message); // "Failed to load"
  })
  .finally(function() {
    // Called regardless of outcome
    console.log("Promise settled");
  });
```

## Code Example

```javascript
// From Lecture Code 17 - Promises.js

// Before Promises — callback approach (IoC problem)
function getOrderId_callback(cart, callback) {
  // Trust issue: will callback be called? When? How many times?
  setTimeout(() => callback("ORDER_123"), 1000);
}

// With Promises — you control the outcome handling
function getOrderId_promise(cart) {
  return new Promise(function(resolve, reject) {
    // Simulate async DB call
    setTimeout(() => {
      if (cart.length > 0) {
        resolve("ORDER_456");
      } else {
        reject(new Error("Cart is empty"));
      }
    }, 1000);
  });
}

// Using the promise
getOrderId_promise(["shoes", "shirt"])
  .then(function(orderId) {
    console.log("Order created:", orderId);
    // Return next promise for chaining
    return new Promise((resolve) => {
      setTimeout(() => resolve({ orderId, paid: true }), 500);
    });
  })
  .then(function(paymentInfo) {
    console.log("Payment done:", paymentInfo);
  })
  .catch(function(error) {
    console.error("Error:", error.message);
  });
```

## Interview Questions

- Q: What is a Promise in JavaScript?
  - A: A Promise is an object representing the eventual completion or failure of an async operation. It serves as a placeholder for a future value. It can be in one of three states: pending, fulfilled, or rejected.

- Q: How does a Promise solve Inversion of Control?
  - A: With callbacks, you hand your function to a third party. With Promises, the third party returns a Promise and you attach your handler via `.then()`. The Promise API (not the third party) invokes your handler — exactly once, at the right time. You stay in control.

- Q: What are the three states of a Promise?
  - A: `pending` (initial), `fulfilled` (resolved with a value), `rejected` (failed with a reason). Once settled (fulfilled or rejected), the state never changes.

- Q: What is the difference between `resolve` and `reject`?
  - A: `resolve(value)` fulfills the Promise — the `.then()` handler receives `value`. `reject(reason)` rejects the Promise — the `.catch()` handler receives `reason`. Both transition the Promise from `pending` to a settled state.

## Key Takeaways

- A Promise is a placeholder for a future async value — the result will come eventually
- Three states: `pending` → `fulfilled` or `rejected` (immutable once settled)
- Solves Inversion of Control: `.then()` callbacks are called by the Promise API, not third-party code
- Solves Callback Hell: `.then()` chaining is flat and readable (vs deeply nested callbacks)
- Promise guarantees: handler called exactly once, always asynchronously (Microtask Queue)
- Create with `new Promise((resolve, reject) => {...})`
- Consume with `.then(onFulfilled)`, `.catch(onRejected)`, `.finally(onSettled)`
