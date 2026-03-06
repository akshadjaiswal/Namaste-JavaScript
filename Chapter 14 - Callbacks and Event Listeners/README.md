# Episode 14: Callbacks and Event Listeners

> Callbacks are the gateway to asynchronous JavaScript — they allow synchronous JS to hook into async operations. But they carry responsibilities: unused event listeners hold memory and can slow your page.

## Overview

JavaScript is synchronous and single-threaded, yet it can handle timers, fetch API calls, and user interactions seemingly "at the same time." The mechanism that makes this possible is **callbacks**. A callback is simply a function passed to another function to be called later — often when an async operation completes.

Event listeners extend this pattern to DOM events and are a foundational browser API — but they come with a critical memory management concern.

## Key Concepts

### Callback Functions

A **callback function** is a function passed as an argument to another function, to be invoked ("called back") at a later time.

```javascript
function greet(name, callback) {
  console.log("Hello, " + name);
  callback(); // invoke the passed function
}

function sayBye() {
  console.log("Goodbye!");
}

greet("Akshay", sayBye);
// Output:
// Hello, Akshay
// Goodbye!
```

Because functions are first-class citizens in JavaScript, they can be passed as arguments — this is all callbacks are.

### Callbacks Enable Asynchronous Code

JS is synchronous, but the browser environment provides async capabilities (timers, fetch, events). Callbacks are how JS code "registers interest" in these async outcomes:

```javascript
// setTimeout is async — the callback fires later
console.log("Before");
setTimeout(function() {
  console.log("Inside timeout"); // runs asynchronously
}, 2000);
console.log("After");

// Output:
// Before
// After
// Inside timeout  (after 2 seconds)
```

The callback is stored by the Web API environment and pushed into the Callback Queue after the timer expires. The event loop then moves it to the Call Stack when the stack is empty.

### Event Listeners

Event listeners attach callbacks to DOM elements. When the specified event occurs (click, hover, keypress, etc.), the registered callback is invoked.

```javascript
const button = document.getElementById("myButton");

button.addEventListener("click", function() {
  console.log("Button clicked!");
});
```

### Closures with Event Listeners

Event listeners commonly use closures to maintain state. A counter is a classic example:

```javascript
function attachCounter() {
  var count = 0; // state maintained via closure

  document.getElementById("btn").addEventListener("click", function() {
    count++;
    console.log("Clicked " + count + " times");
  });
}
attachCounter();
```

Each click increments `count`. The event listener callback closes over `count` and keeps it alive in memory.

### Memory: Why You Must Remove Event Listeners

Event listeners form closures — which means they keep referenced variables alive in memory. When an event listener is attached:
- The callback function is stored in the Web API environment
- If the callback closes over variables, those variables cannot be garbage collected
- Even if the Call Stack is idle, the listener persists

This is especially problematic for `scroll`, `click`, `mousemove` listeners on pages with many elements — each active listener holds memory.

```javascript
const handler = function() {
  console.log("clicked");
};

element.addEventListener("click", handler);

// Later, when no longer needed:
element.removeEventListener("click", handler); // frees the memory
```

**Note**: You must pass the **same function reference** to `removeEventListener` that you passed to `addEventListener`. Anonymous functions passed inline cannot be removed this way — another reason to prefer named functions for long-lived listeners.

### The Good Part: Callbacks Are Powerful

Callbacks make possible:
- `setTimeout` and `setInterval` (timer APIs)
- DOM event handling
- `Array.prototype.map`, `filter`, `reduce` (synchronous callbacks)
- Node.js-style async APIs (file system, network)
- Foundation for Promises and async/await

## Code Example

```javascript
// From Lecture Code 11 - Callback Function in JavaScript.js

// 1. Basic callback
function doFirst(callback) {
  console.log("First");
  callback();
}
doFirst(function() {
  console.log("Second (via callback)");
});

// 2. setTimeout — async callback
setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);

// 3. Event listener with closure (counter)
(function() {
  var count = 0;
  document.getElementById("btn").addEventListener("click", function() {
    count++;
    console.log("Click count:", count);
  });
})();
```

## Interview Questions

- Q: What is a callback function?
  - A: A callback is a function passed as an argument to another function, to be invoked at a later time — either immediately (synchronous callback) or after an async operation completes (async callback).

- Q: How do callbacks enable asynchronous behavior in JavaScript?
  - A: When an async operation (timer, network request, event) completes, the browser places the registered callback into the Callback Queue. The event loop moves it to the Call Stack when the stack is empty. This allows the main thread to remain free while waiting.

- Q: Why should you remove event listeners when they are no longer needed?
  - A: Event listeners form closures — they keep referenced variables in memory. Even when the Call Stack is idle, active event listeners persist in the Web API environment. Removing them with `removeEventListener` allows the garbage collector to free the associated memory.

- Q: Why are anonymous functions a problem for `removeEventListener`?
  - A: `removeEventListener` requires the same function reference used in `addEventListener`. An anonymous function defined inline cannot be referenced again, so it cannot be removed — the listener is permanently stuck.

## Key Takeaways

- A callback is a function passed as an argument — to be called later
- Callbacks give JS access to the async world (timers, events, fetch)
- Event listeners use callbacks and often form closures to maintain state
- Closures in event listeners keep variables alive — cannot be garbage collected while the listener is active
- Always `removeEventListener` when a listener is no longer needed (use named function references)
- Heavy use of unremoved listeners (scroll, click, mousemove) on many elements can significantly slow a page
