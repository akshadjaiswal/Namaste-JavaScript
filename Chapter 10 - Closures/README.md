# Episode 10: Closures in JavaScript

> A closure is a function bundled together with its lexical environment — it remembers the variables from its outer scope even after that outer function has returned.

## Overview

Closures are one of the most powerful and most misunderstood features of JavaScript. They arise naturally from lexical scoping: when a function is defined inside another function, it carries a reference to the outer function's variables. Even after the outer function finishes executing, those variables remain alive in memory — kept there by the closure.

Closures enable powerful patterns: data encapsulation, factory functions, memoization, currying, and the module pattern. They also have costs: overuse can cause memory leaks.

## Key Concepts

### Definition

A **closure** is a function that has access to its outer function's scope even after the outer function has returned.

More precisely: when a function is created, it captures a reference (not a copy) to its enclosing Lexical Environment. That environment persists as long as the function (closure) exists.

```javascript
function x() {
  var a = 9;
  function y() {
    console.log(a); // y has access to a — a closure is formed
  }
  return y;
}

var z = x();  // x() returns y — x's execution context is destroyed
z();          // but y() still accesses a = 9! The closure kept a alive.
// Output: 9
```

### Closures Capture References, Not Values

Closures hold a **reference** to the outer variable — not a snapshot of its value at creation time. If the outer variable changes later, the closure sees the updated value.

```javascript
function counter() {
  var count = 0;
  return function() {
    count++;
    return count;
  };
}

const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
// count persists across calls because increment holds a reference to it
```

### Nested Closures

Closures work across multiple levels of nesting. An innermost function can access variables from all enclosing scopes.

```javascript
function b() {
  var e = 99;
  function w() {
    var c = 9;
    function d() {
      console.log(c, e); // d closes over both c (w's scope) and e (b's scope)
    }
    d();
  }
  w();
}
b(); // 9 99
```

### Advantages of Closures

**1. Data Hiding and Encapsulation — Module Design Pattern**
```javascript
function createCounter() {
  var count = 0; // private — not accessible from outside
  return {
    increment: function() { count++; },
    decrement: function() { count--; },
    getCount: function() { return count; }
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
console.log(counter.count);      // undefined — count is private
```

**2. Currying**
```javascript
function multiply(x) {
  return function(y) {
    return x * y; // closes over x
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**3. Memoization**
```javascript
function memoize(fn) {
  var cache = {};
  return function(n) {
    if (cache[n] !== undefined) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}
```

**4. `setTimeout` with Correct Values**
```javascript
function printAfterDelay(x) {
  setTimeout(function() {
    console.log(x); // closes over x — correct value at call time
  }, 1000);
}
printAfterDelay(42); // prints 42 after 1 second
```

### Disadvantages of Closures

- **Over-consumption of memory**: Closed-over variables cannot be garbage collected as long as the closure exists. Creating many closures around large objects can bloat memory.
- **Memory leaks**: If a closure is accidentally kept alive (e.g., as an event listener that's never removed), the variables it closes over are never freed.
- **Can freeze the browser**: Extreme cases of memory accumulation from closures can degrade browser performance.

## Code Example

```javascript
// From Lecture Code 07 - Closures in Javascript.js

// Basic closure
function x() {
  var a = 9;
  function y() {
    console.log(a);
  }
  return y;
}
var z = x();
console.log(z); // prints the function y
z();            // 9 — still accesses a from x's scope

// Nested closure
function b() {
  var e = 99;
  function w() {
    var c = 9;
    function d() {
      console.log(c, e); // access both c and e through closure chain
    }
    d();
  }
  w();
}
b(); // 9 99
```

## Interview Questions

- Q: What is a closure in JavaScript?
  - A: A closure is a function bundled together with a reference to its outer (lexical) environment. It allows the function to access variables from its enclosing scope even after that scope has returned.

- Q: What does a closure capture — a reference or a value?
  - A: A reference. The closure points to the actual variable in the outer scope. If the variable changes, the closure sees the new value.

- Q: What are the advantages of closures?
  - A: Data hiding/encapsulation (module pattern), currying, memoization, maintaining state between function calls (counters), and working correctly with async operations like `setTimeout`.

- Q: What are the disadvantages of closures?
  - A: Overconsumption of memory (closed-over variables are not garbage collected while the closure lives), potential memory leaks if closures are not cleaned up, and potential performance issues in extreme cases.

## Key Takeaways

- A closure = function + its lexical environment (reference to outer scope's variables)
- Closures allow a function to "remember" its outer variables even after the outer function returns
- Closures capture references, not snapshots — the values seen are live
- Key use cases: data privacy (module pattern), currying, memoization, counters, setTimeout
- Downside: closed-over variables persist in memory — can cause leaks if mismanaged
- Closures are not a special syntax — they arise naturally from lexical scoping
