# Episode 11: `setTimeout` + Closures Interview Question

> Time, tide, and JavaScript wait for none — `setTimeout` does not pause execution, but closures can preserve the right values across asynchronous delays.

## Overview

This episode is a classic interview question that catches many developers off guard. The combination of `setTimeout` and loops exposes a critical behavior: `var` in a loop shares a single binding across all iterations, while the `setTimeout` callbacks fire long after the loop is done. Closures with `let` — or an IIFE with `var` — are the solutions.

## Key Concepts

### `setTimeout` Does Not Pause JavaScript

`setTimeout` registers a callback to be called after a minimum delay. JavaScript does not wait for the timer — it continues executing the rest of the code immediately. The callback is placed in the Callback Queue and only runs when the Call Stack is empty.

```javascript
console.log("start");
setTimeout(function() {
  console.log("inside timeout"); // runs AFTER "end"
}, 0);
console.log("end");

// Output:
// start
// end
// inside timeout
```

Even with a delay of `0ms`, the callback runs after the current synchronous code finishes.

### The Classic Loop Problem

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
// Prints: 6 6 6 6 6 (one per second)
// NOT 1 2 3 4 5
```

**Why?** Because `var i` is function/globally scoped — all 5 `setTimeout` callbacks share the **same** `i` variable. By the time any callback fires (after 1s+), the loop has already finished and `i` is `6`.

### Solution 1: Use `let` (Block Scope)

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
// Prints: 1 2 3 4 5 (one per second)
```

`let` is block-scoped — each iteration of the loop creates a **new binding** for `i`. Each `setTimeout` callback closes over its own unique copy of `i`.

### Solution 2: IIFE with `var`

If you must use `var`, wrap the body in an IIFE (Immediately Invoked Function Expression) to create a new scope per iteration:

```javascript
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // closes over j — unique per iteration
    }, j * 1000);
  })(i);
}
// Prints: 1 2 3 4 5 (one per second)
```

The IIFE immediately calls itself with the current value of `i`, capturing it as `j` in a new scope.

### Why Closures Are Involved

In the `let` solution, each iteration's callback forms a **closure** over its own block-scoped `i`. In the IIFE solution, the inner callback forms a closure over `j` (the IIFE's parameter). Closures are what allow each callback to remember its own value even though they all run after the loop completes.

## Code Example

```javascript
// Problem: var shares one binding across all iterations
function printNumbers_WRONG() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(function() {
      console.log(i); // all reference the same i
    }, i * 1000);
  }
}
// Output: 6 6 6 6 6

// Fix 1: let creates a new i per iteration
function printNumbers_LET() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(function() {
      console.log(i); // each callback has its own i
    }, i * 1000);
  }
}
// Output: 1 2 3 4 5

// Fix 2: IIFE creates a new scope per iteration
function printNumbers_IIFE() {
  for (var i = 1; i <= 5; i++) {
    (function(j) {
      setTimeout(function() {
        console.log(j);
      }, j * 1000);
    })(i);
  }
}
// Output: 1 2 3 4 5
```

## Interview Questions

- Q: What does this code print, and why?
  ```javascript
  for (var i = 1; i <= 5; i++) {
    setTimeout(() => console.log(i), i * 1000);
  }
  ```
  - A: It prints `6 6 6 6 6`. All callbacks close over the same `var i`. By the time any callback executes, the loop is done and `i` is `6`.

- Q: How do you fix the above code?
  - A: Use `let` instead of `var`. `let` creates a new block-scoped binding for each iteration, so each callback closes over its own `i`. Alternatively, use an IIFE to create a new scope per iteration.

- Q: Why does `let` fix the problem?
  - A: `let` is block-scoped. In a `for` loop, each iteration gets its own new binding of `i`. The `setTimeout` callback forms a closure over that unique binding.

- Q: Does `setTimeout(fn, 0)` execute immediately?
  - A: No. Even with a 0ms delay, `setTimeout` defers execution to after the current call stack is empty (via the event loop). Synchronous code always runs before any timer callbacks.

## Key Takeaways

- `setTimeout` defers execution — it never blocks the current synchronous code
- Loop + `setTimeout` + `var` is a classic pitfall: all callbacks share one variable
- `let` in a `for` loop creates a new binding per iteration — the closures capture distinct values
- IIFE solves the same problem when `var` must be used — creates a new scope per iteration
- "Time, tide, and JavaScript wait for none" — JS keeps running regardless of pending timers
