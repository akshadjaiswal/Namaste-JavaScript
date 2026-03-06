# Episode 12: Closures Interview Questions

> Nine closure interview questions that test progressively deeper understanding — from the basic definition to data hiding, currying, and memory implications.

## Overview

This episode is a comprehensive closure interview drill. Each question builds on the previous, probing edge cases and practical applications. Mastering these questions covers the full spectrum of what interviewers ask about closures.

## Interview Questions

### Q1: What is a Closure in JavaScript?

**Answer:** A closure is a function along with a reference to its outer (lexical) environment — i.e., the scope in which it was defined. A closure gives the function access to variables from its enclosing scope even after that scope has returned.

```javascript
function outer() {
  var x = 10;
  function inner() {
    console.log(x); // x is accessible through closure
  }
  return inner;
}
const fn = outer();
fn(); // 10 — even after outer() has returned
```

---

### Q2: Will the following code still form a closure?

```javascript
function outer() {
  var x = 10;
  function inner() {
    console.log(x);
  }
  inner(); // called INSIDE outer, not returned
}
outer();
```

**Answer:** Yes. The closure is formed at the moment `inner` is defined inside `outer`. It doesn't matter whether `inner` is returned or called internally — it still has access to `x` through its lexical environment. Sequence and call location don't affect closure formation.

---

### Q3: Does changing `var` to `let` affect the closure?

```javascript
function outer() {
  let x = 10; // changed from var to let
  function inner() {
    console.log(x);
  }
  return inner;
}
const fn = outer();
fn(); // still 10
```

**Answer:** No. The closure still works. Both `var` and `let` variables are captured in the closure. The only difference is that `let` is block-scoped (instead of function-scoped), but within this function, the behavior is identical.

---

### Q4: Will `inner` have access to the outer function's parameters?

```javascript
function outer(str) {
  function inner() {
    console.log(str); // str is the parameter of outer
  }
  return inner;
}
const fn = outer("Hello!");
fn(); // "Hello!"
```

**Answer:** Yes. Parameters are part of the function's local scope. `inner` forms a closure over `outer`'s entire scope, including its parameters. `str` is accessible to `inner` just like any other variable.

---

### Q5: Does an inner function form a closure with the outermost function?

```javascript
function outermost() {
  var a = 1;
  function middle() {
    var b = 2;
    function inner() {
      console.log(a, b); // accesses both a and b
    }
    return inner;
  }
  return middle;
}
const fn = outermost()();
fn(); // 1 2
```

**Answer:** Yes. A function forms closures with **all** enclosing scopes in the scope chain — not just the immediately enclosing one. `inner` has access to `middle`'s scope and `outermost`'s scope through the lexical environment chain.

---

### Q6: Output of this code and explanation?

```javascript
function counter() {
  var count = 0;
  return function() {
    var count = 0; // new local variable — shadowing the outer count
    count++;
    console.log(count);
  };
}
const increment = counter();
increment(); // 1
increment(); // 1 — not 2!
increment(); // 1 — still 1!
```

**Answer:** Prints `1` every time. The inner function declares its own `var count = 0`, which **shadows** the outer `count`. Each call resets the inner `count` to 0. The closed-over `count` from `counter()` is never actually used. To get an incrementing counter, remove `var count = 0` from inside the returned function.

---

### Q7: What are the advantages of closures?

**Answer:**
- **Module Design Pattern** — create private state; expose only what's needed
- **Currying** — partial application of functions
- **Memoization** — cache expensive computation results
- **Data hiding and encapsulation** — prevent direct access to variables
- **`setTimeout` with correct values** — preserve values in async callbacks
- **Maintaining state** across multiple function calls without global variables

---

### Q8: Data Hiding and Encapsulation with Closures

```javascript
function createCounter() {
  var count = 0; // private — not directly accessible

  return {
    increment: function() {
      count++;
      console.log(count);
    },
    decrement: function() {
      count--;
      console.log(count);
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
console.log(counter.count);    // undefined — count is private
console.log(counter.getCount()); // 1
```

**Why this matters:** The `count` variable cannot be directly modified from outside `createCounter`. External code must use the exposed methods. This is the module pattern — closure-based encapsulation.

---

### Q9: What are the disadvantages of closures?

**Answer:**
- **Over-consumption of memory**: Closed-over variables are kept in memory as long as the closure exists. If many closures are created over large objects, memory usage grows.
- **Memory leaks**: If closures are attached to event listeners or stored in long-lived collections without ever being removed, the referenced variables can never be garbage collected.
- **Browser freezing**: In extreme cases, accumulated memory from many closures can degrade or freeze the browser.

**Best practice:** Remove event listeners when no longer needed. Set large closed-over variables to `null` when the closure is done using them to help garbage collection.

---

## Key Takeaways

- A closure is formed when a function is defined inside another — regardless of whether it's returned or called internally
- Closures capture all enclosing scopes — not just the immediate parent
- Parameters of outer functions are accessible in closures
- `var` and `let` both work in closures; `let` adds block-scope behavior
- Variable shadowing inside the returned function can prevent the closure from working as expected
- Closures enable the module pattern — powerful encapsulation without classes
- Memory implications: closed-over variables persist as long as the closure is reachable
