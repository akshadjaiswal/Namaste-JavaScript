# Episode 17: Trust Issues with `setTimeout()`

> `setTimeout` guarantees a *minimum* delay — not an exact one. The callback cannot run until the Call Stack is empty, so a busy main thread makes timers lie.

## Overview

Developers often assume that `setTimeout(fn, 1000)` will call `fn` in exactly 1000 milliseconds. This is not true. The delay is a *minimum* — the actual execution time depends on when the Call Stack becomes free. If the main thread is blocked with heavy synchronous work, the timer fires late — sometimes very late.

This episode demonstrates the problem concretely and reinforces JavaScript's most important rule: **do not block the main thread**.

## Key Concepts

### The First Rule of JavaScript

> **Do not block the main thread.**

JavaScript is single-threaded — there is only one Call Stack. If it is busy running synchronous code, nothing else can happen: no timer callbacks, no event handlers, no rendering updates. The page appears frozen.

### What `setTimeout` Actually Guarantees

`setTimeout(fn, delay)` guarantees that `fn` will **not** be called before `delay` milliseconds. It does **not** guarantee that `fn` will be called *at* `delay` milliseconds.

The actual execution time = `delay` + time spent waiting for Call Stack to empty.

```
Actual delay ≥ Specified delay
```

### The Blocking Main Thread Problem

```javascript
console.log("Start");

setTimeout(function() {
  console.log("Callback"); // This should fire after 2000ms
}, 2000);

// Blocking synchronous operation — 10 seconds of busy work
let start = Date.now();
while (Date.now() - start < 10000) {
  // busy wait — blocks the Call Stack for 10 seconds
}

console.log("End");
```

**Output:**
```
Start
End          ← (appears after 10 seconds — blocked!)
Callback     ← (fires immediately after "End" — total delay ~10s, not 2s!)
```

The timer completed after 2 seconds (the Web API counted down correctly), but the callback was placed in the Callback Queue. The event loop couldn't move it to the Call Stack because the busy-wait loop was occupying it. By the time the loop finished and "End" printed, the callback finally got to run — ~10 seconds after being registered.

### `setTimeout(fn, 0)` — Zero Delay

Even a delay of `0` doesn't mean "immediate". The callback still goes through the Web API → Callback Queue → Event Loop pathway. It will only execute after:
1. The current synchronous code finishes
2. The Call Stack is empty
3. All microtasks (Promise callbacks) are drained

```javascript
console.log("A");
setTimeout(function() { console.log("B"); }, 0); // 0ms delay
console.log("C");
// Output: A → C → B
```

### JavaScript + JIT — Still Fast

Despite the single-threaded model, JavaScript is extremely fast for most use cases:
- JIT compilation (Ignition + TurboFan) makes it near-native speed
- The async model (Web APIs + event loop) handles I/O without blocking
- The rule is: keep *compute-heavy* synchronous work off the main thread

For truly CPU-intensive work in the browser, use **Web Workers** — they run on a separate thread.

### Real-World Implications

| Scenario | What to do |
|----------|-----------|
| Heavy computation in browser | Use Web Workers |
| Large loops processing data | Break into chunks with `setTimeout(fn, 0)` |
| Synchronous image/file processing | Move to a worker or use async APIs |
| Many DOM updates in a loop | Batch them or use `requestAnimationFrame` |

## Code Example

```javascript
// From Lecture Code 13 - Trust issues with settimeout().js

// Setup
console.log("Start");

setTimeout(function cb() {
  console.log("Callback — fired after setTimeout");
}, 5000);

// Simulating a blocking operation
console.log("Blocking starts");
let endTime = Date.now() + 10000; // 10 seconds from now
while (Date.now() < endTime) {
  // intentionally blocking the main thread
}
console.log("Blocking ends");

// Output:
// Start
// Blocking starts
// Blocking ends       (after ~10 seconds)
// Callback — fired after setTimeout   (immediately after, despite 5s timer)
```

The callback registered for 5 seconds fires immediately after the 10-second block ends — not 5 seconds, but ~10 seconds. The timer expired during the block, but the callback had to wait for the stack to clear.

## Interview Questions

- Q: Does `setTimeout(fn, 1000)` guarantee execution after exactly 1000ms?
  - A: No. It guarantees the callback will not fire **before** 1000ms. The actual execution time is `delay + time waiting for Call Stack to clear`. If the main thread is busy, the callback fires late.

- Q: What happens to a `setTimeout` callback when the main thread is blocked?
  - A: The timer counts down correctly in the Web API environment. When the delay expires, the callback moves to the Callback Queue. But it can only run after the Call Stack becomes empty. If the main thread is blocked, the callback waits in the queue.

- Q: What does `setTimeout(fn, 0)` do?
  - A: It defers `fn` to the Callback Queue with a minimum delay of 0ms. It will execute only after all current synchronous code and all microtasks (Promises) have finished.

- Q: How can you handle CPU-intensive work in the browser without blocking the main thread?
  - A: Use **Web Workers** — they run on a separate thread and can perform heavy computation without freezing the UI. Results are communicated back to the main thread via message passing.

## Key Takeaways

- `setTimeout` provides a minimum delay guarantee — not a precise one
- The callback waits in the Callback Queue until the Call Stack is empty
- Blocking the main thread (long synchronous loops) delays all pending timers and event callbacks
- `setTimeout(fn, 0)` still defers execution — synchronous code and microtasks run first
- The golden rule: **never block the main thread** — keep synchronous operations fast
- For heavy computation: use Web Workers; for batching DOM updates: use `requestAnimationFrame`
