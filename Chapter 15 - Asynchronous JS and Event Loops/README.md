# Episode 15: Asynchronous JavaScript & Event Loops

> The event loop is JavaScript's secret weapon — it coordinates the Call Stack, Web APIs, Callback Queue, and Microtask Queue to enable non-blocking async behavior in a single-threaded language.

## Overview

JavaScript has a single Call Stack — it can only do one thing at a time. Yet browsers handle timers, network requests, and user events seemingly simultaneously. This is possible because JavaScript doesn't work alone: the browser runtime provides Web APIs, and the event loop continuously coordinates between the Call Stack and the various queues to process async work.

This is one of the most important and most-tested topics in JavaScript. Understanding it deeply will help you predict async behavior, debug race conditions, and write performant code.

## Key Concepts

### The Browser Runtime Environment

The JS engine itself only has:
- **Call Stack** — executes code, one frame at a time
- **Memory Heap** — stores objects and variables

But the browser adds extra capabilities:
- **Web APIs** — `setTimeout`, `fetch`, DOM APIs, `localStorage`, `console`, Geolocation, Bluetooth, etc.
- **Callback Queue** (Task Queue) — holds callbacks from Web APIs ready to run
- **Microtask Queue** — holds Promise callbacks and MutationObserver callbacks (higher priority)
- **Event Loop** — the coordinator that moves callbacks from queues to the Call Stack

### Web APIs

None of the following are part of the JavaScript language itself — they are browser superpowers exposed to the JS engine via the `window` global object:

| API | Purpose |
|-----|---------|
| `setTimeout()` / `setInterval()` | Timer functions |
| `fetch()` | HTTP network requests |
| DOM APIs (`document.xxx`) | Manipulate the HTML DOM tree |
| `localStorage` / `sessionStorage` | Client-side storage |
| `console` | Browser console (not JS!) |
| `location` | Browser URL/navigation |
| Geolocation, Bluetooth | Hardware APIs |

Because these are on `window`, writing `setTimeout()` is the same as `window.setTimeout()`.

### How Async Code Actually Works

```javascript
console.log("Start");

setTimeout(function cb() {
  console.log("Timer callback");
}, 5000);

console.log("End");
```

Step by step:
1. GEC pushed to Call Stack
2. `console.log("Start")` → executes → "Start" printed
3. `setTimeout(cb, 5000)` → Call Stack delegates to Web API; timer starts counting
4. `console.log("End")` → executes → "End" printed
5. GEC popped — Call Stack is empty
6. After 5000ms, Web API moves `cb` to Callback Queue
7. Event loop sees: Call Stack empty + Callback Queue has `cb` → pushes `cb` to Call Stack
8. `cb` executes → "Timer callback" printed → `cb` popped

**Output:** Start → End → Timer callback (after 5 seconds)

### The Event Loop

The event loop is a continuously running process that checks two conditions:
1. Is the **Call Stack empty**?
2. Is there something in the **Callback Queue** (or **Microtask Queue**)?

If both are true, it moves the next item from the queue to the Call Stack.

The event loop starts running immediately when the JS engine starts — it runs "forever" (or until the tab is closed).

### Callback Queue vs Microtask Queue

There are two queues, with different priorities:

**Microtask Queue (higher priority):**
- Promise `.then()`, `.catch()`, `.finally()` callbacks
- `queueMicrotask()` callbacks
- `MutationObserver` callbacks

**Callback Queue / Task Queue (lower priority):**
- `setTimeout` / `setInterval` callbacks
- DOM event callbacks (click, scroll, etc.)
- `fetch` response callbacks (actually go to microtask queue for `.then()`)

**The event loop always drains the Microtask Queue completely before processing even one item from the Callback Queue.**

```javascript
console.log("Start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(function() {
  console.log("Promise");
});

console.log("End");

// Output:
// Start
// End
// Promise     ← microtask runs before setTimeout
// setTimeout  ← callback queue runs last
```

### Starvation

If microtasks keep creating more microtasks (e.g., a `.then()` that schedules another `.then()` infinitely), the Callback Queue never gets a turn. This is called **starvation** — the callbacks in the Task Queue starve because microtasks never stop.

### Key Questions

**Q: When does the event loop actually start?**
The event loop runs continuously from the moment the JS engine starts. It is always running and always checking — it's an infinite loop that never stops.

**Q: Are synchronous callbacks (map, filter, reduce) registered in the Web API?**
No. Only asynchronous callbacks are registered with Web APIs. Synchronous callbacks like those passed to `map`, `filter`, and `forEach` execute immediately in the current Call Stack frame.

**Q: Do event listener callbacks get removed from Web API memory after one call?**
No. Event listener callbacks (click, scroll, etc.) stay in the Web API environment indefinitely. This is why it's important to explicitly `removeEventListener` when you're done. Timer callbacks (`setTimeout`) are one-shot — they're removed after firing.

**Q: What if `setTimeout` delay is 0ms?**
The callback still goes to the Callback Queue and must wait for the Call Stack to be empty. Even if the delay is 0ms, synchronous code runs first.

## Code Example

```javascript
// Demonstrating all three: synchronous, setTimeout, Promise

console.log("1 - Script start");

setTimeout(function() {
  console.log("4 - setTimeout (0ms)");
}, 0);

Promise.resolve()
  .then(function() {
    console.log("3 - Promise.then");
  });

console.log("2 - Script end");

// Output:
// 1 - Script start
// 2 - Script end
// 3 - Promise.then    (microtask queue — higher priority)
// 4 - setTimeout (0ms) (callback queue — runs after microtasks)
```

```javascript
// fetch + .then flow
fetch("https://api.example.com/data")
  .then(function(response) {  // this .then() callback goes to Microtask Queue
    return response.json();
  })
  .then(function(data) {      // also Microtask Queue
    console.log(data);
  });
```

## Interview Questions

- Q: What is the event loop?
  - A: The event loop is a continuously running mechanism that checks whether the Call Stack is empty and whether there is work in the Callback Queue or Microtask Queue. If the stack is empty, it moves the next item from a queue to the stack.

- Q: What is the difference between the Callback Queue and the Microtask Queue?
  - A: The Microtask Queue has higher priority and holds Promise callbacks and MutationObserver callbacks. The Callback Queue (Task Queue) holds `setTimeout`/`setInterval` callbacks and event handler callbacks. The event loop always fully drains the Microtask Queue before processing the Callback Queue.

- Q: What is starvation in the context of the event loop?
  - A: Starvation occurs when the Microtask Queue continuously generates new microtasks, preventing the Callback Queue from ever being processed. Callbacks in the Task Queue are "starved" of execution time.

- Q: Can `setTimeout(fn, 0)` guarantee immediate execution after the current code?
  - A: No. The callback goes to the Callback Queue. It will run only after: (a) the current synchronous code finishes, (b) the Call Stack is empty, and (c) the Microtask Queue is drained. Any pending microtasks (Promise callbacks) run first.

## Key Takeaways

- JS is single-threaded but the browser runtime provides Web APIs for async operations
- Web APIs handle async work off the main thread; when done, push callbacks to queues
- **Microtask Queue**: Promise callbacks — higher priority
- **Callback Queue**: setTimeout/event callbacks — lower priority
- Event loop: when Call Stack is empty, drain all microtasks, then take one task from Callback Queue
- Starvation: infinite microtasks prevent callback queue from ever running
- `setTimeout(fn, 0)` still defers to after the current synchronous code + all microtasks
- The event loop runs from program start and never stops (while the page is alive)
