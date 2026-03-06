# Episode 3: Promise Chaining & Error Handling

> Promise chaining converts nested callback code into a flat, readable sequence. Proper `.catch()` placement determines which errors you handle and which you let propagate.

## Overview

Promise chaining is the mechanism that replaces callback nesting. Each `.then()` handler can return a value (or another Promise), and the next `.then()` in the chain receives that result. This creates a clean, sequential async flow.

Error handling with `.catch()` is flexible — its placement in the chain determines what errors it catches and whether subsequent `.then()` handlers still execute.

## Key Concepts

### How Promise Chaining Works

When you return a value from a `.then()` handler, that value is automatically wrapped in a resolved Promise and passed to the next `.then()`. When you return a Promise from `.then()`, the next `.then()` waits for that Promise to settle.

```
createOrder(cart)
  .then(orderId => ...)        // step 1
  .then(paymentInfo => ...)    // step 2 — receives result of step 1's return
  .then(() => ...)             // step 3 — receives result of step 2's return
  .catch(err => ...)           // catches any rejection from steps 1-3
```

**The golden rule**: always `return` from `.then()` handlers, or the next step gets `undefined`.

```javascript
// WRONG — no return; next .then() gets undefined
createOrder(cart)
  .then(function(orderId) {
    proceedToPayment(orderId); // not returned!
  })
  .then(function(paymentInfo) {
    console.log(paymentInfo); // undefined!
  });

// CORRECT — return the next promise
createOrder(cart)
  .then(function(orderId) {
    return proceedToPayment(orderId); // returned!
  })
  .then(function(paymentInfo) {
    console.log(paymentInfo); // correct value
  });
```

### `.catch()` Placement Matters

Where you place `.catch()` determines which errors it handles:

**`.catch()` at the end — catches all rejections:**
```javascript
step1()
  .then(() => step2())
  .then(() => step3())
  .catch(function(err) {
    // Catches rejection from step1, step2, OR step3
    console.error("Something failed:", err);
  });
```

**`.catch()` in the middle — partial recovery:**
```javascript
step1()
  .then(() => step2())
  .catch(function(err) {
    // Only catches rejection from step1 or step2
    console.error("Handled:", err);
    // Returns undefined (or a value) — execution CONTINUES to next .then()
  })
  .then(() => step3()); // runs even if step2 rejected (if .catch recovered)
```

If `.catch()` doesn't rethrow or return a rejected Promise, the chain **continues** with the next `.then()`.

### Propagation Through the Chain

When a Promise rejects, rejection **skips all `.then()` handlers** and falls through to the nearest `.catch()`:

```javascript
Promise.reject(new Error("Step 1 failed"))
  .then(() => {
    console.log("Step 2"); // SKIPPED
    return "step 2 result";
  })
  .then(() => {
    console.log("Step 3"); // SKIPPED
  })
  .catch(function(err) {
    console.error(err.message); // "Step 1 failed" — caught here
  });
```

### Multiple `.catch()` Handlers

You can have multiple `.catch()` blocks for different recovery strategies:

```javascript
createOrder(cart)
  .then(orderId => proceedToPayment(orderId))
  .catch(function(paymentErr) {
    // Retry payment logic here
    console.log("Payment failed, retrying...");
    return retryPayment(); // returns a new promise — chain continues
  })
  .then(paymentInfo => showSummary(paymentInfo))
  .catch(function(summaryErr) {
    // Error in showSummary or unrecovered payment error
    console.error("Fatal error:", summaryErr);
  });
```

### Rethrowing Errors

In a `.catch()`, you can rethrow to prevent recovery and let the error continue propagating:

```javascript
.catch(function(err) {
  if (err.type === 'network') {
    // Recoverable — return a fallback
    return fallbackData;
  }
  // Not recoverable — rethrow
  throw err; // or: return Promise.reject(err);
})
```

### `.finally()` — Always Runs

`.finally()` runs regardless of whether the Promise was fulfilled or rejected. Useful for cleanup (hiding a spinner, closing a connection):

```javascript
showLoadingSpinner();
fetchData()
  .then(data => displayData(data))
  .catch(err => showError(err))
  .finally(() => hideLoadingSpinner()); // always runs
```

## Code Example

```javascript
// From Lecture Code 19 - Creating Promise, Chaining and error handling.js

function createOrder(cart) {
  return new Promise(function(resolve, reject) {
    if (!cart || cart.length === 0) {
      reject(new Error("Cart is empty"));
    }
    setTimeout(() => resolve("ORDER_" + Date.now()), 500);
  });
}

function proceedToPayment(orderId) {
  return new Promise(function(resolve, reject) {
    console.log("Processing payment for:", orderId);
    setTimeout(() => resolve({ orderId, amount: 99.99, paid: true }), 500);
  });
}

function showOrderSummary(paymentInfo) {
  return new Promise(function(resolve) {
    console.log("Order Summary:", paymentInfo);
    resolve("Summary shown");
  });
}

// Full chain
createOrder(["shoes", "shirt"])
  .then(function(orderId) {
    console.log("Order created:", orderId);
    return proceedToPayment(orderId); // must return!
  })
  .then(function(paymentInfo) {
    console.log("Payment complete:", paymentInfo);
    return showOrderSummary(paymentInfo); // must return!
  })
  .then(function(msg) {
    console.log(msg);
  })
  .catch(function(err) {
    console.error("Order flow failed:", err.message);
  })
  .finally(function() {
    console.log("Order flow complete (success or failure)");
  });
```

## Interview Questions

- Q: What happens if you don't `return` from a `.then()` handler?
  - A: The next `.then()` in the chain receives `undefined`. The chain doesn't wait for any async operation you started — it just immediately moves to the next step with `undefined`.

- Q: How does rejection propagate through a Promise chain?
  - A: Rejection skips all `.then()` handlers until it reaches the nearest `.catch()`. If there is no `.catch()`, it becomes an unhandled rejection.

- Q: Can you continue a Promise chain after a `.catch()`?
  - A: Yes. If `.catch()` returns a value (or a resolved Promise), the chain continues with the next `.then()`. If `.catch()` throws or returns a rejected Promise, the rejection propagates further.

- Q: What is `.finally()` used for?
  - A: `.finally()` runs its callback regardless of whether the Promise chain succeeded or failed. It's ideal for cleanup tasks (hiding spinners, releasing resources) that should always happen.

## Key Takeaways

- Always `return` from `.then()` handlers to pass values down the chain
- `.catch()` at the end catches any rejection from any step above it
- `.catch()` in the middle can recover from partial failures — chain continues if `.catch()` doesn't rethrow
- Rejection skips all `.then()` handlers until a `.catch()` is found
- Multiple `.catch()` handlers allow granular error recovery at different stages
- `.finally()` always runs — use it for cleanup
- Flat promise chains are far more readable than nested callbacks
