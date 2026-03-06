# Episode 2: Execution & Call Stack

> The Call Stack is JavaScript's mechanism for managing multiple Execution Contexts.

## Overview

When a JS program runs, a Global Execution Context (GEC) is created. But what happens when a function is called inside that program? A new Execution Context is created for it. And if that function calls another function? Yet another one.

JavaScript needs a way to keep track of all these contexts — to know which one is currently running, and which ones are waiting. That mechanism is the **Call Stack**.

## Key Concepts

### The Call Stack

The Call Stack is a stack data structure that tracks Execution Contexts. It follows **LIFO** — Last In, First Out. The most recently created context is at the top, and it must finish before the one below it resumes.

Other names you may hear for the Call Stack:
- Execution Context Stack
- Program Stack
- Control Stack
- Runtime Stack
- Machine Stack

### How It Works

1. When the program starts → GEC is created and **pushed** onto the Call Stack
2. When a function is called → a new Execution Context is created and **pushed** on top
3. When a function returns → its Execution Context is **popped** off the stack
4. When the program finishes → GEC is **popped** off and the stack is empty

### The Two Phases (Recap)

Each Execution Context goes through two phases:

- **Memory Creation Phase**: JS scans the code, allocates memory for variables (`undefined`) and stores full function bodies
- **Code Execution Phase**: Code runs line by line; variable values are assigned; function calls push new contexts

### Stack Overflow

If functions call each other infinitely (e.g. unbounded recursion), the Call Stack fills up completely. This results in a **Stack Overflow** error — the engine throws a `Maximum call stack size exceeded` error.

```javascript
// This causes stack overflow
function infinite() {
  return infinite(); // pushes forever, never pops
}
infinite(); // RangeError: Maximum call stack size exceeded
```

## Code Example

```javascript
var n = 2;

function square(num) {
  var ans = num * num;
  return ans;
}

var square2 = square(n);
var square4 = square(4);
```

**Call Stack trace:**

```
Step 1: GEC created → pushed to stack
  Stack: [GEC]

Step 2: square(2) called → new EC created, pushed
  Stack: [GEC, EC(square(2))]
  Inside EC: ans = 2 * 2 = 4, return 4

Step 3: square(2) returns → EC popped
  Stack: [GEC]
  square2 = 4

Step 4: square(4) called → new EC created, pushed
  Stack: [GEC, EC(square(4))]
  Inside EC: ans = 4 * 4 = 16, return 16

Step 5: square(4) returns → EC popped
  Stack: [GEC]
  square4 = 16

Step 6: Program ends → GEC popped
  Stack: []
```

## Interview Questions

- Q: What is the Call Stack?
  - A: The Call Stack is a stack data structure used by the JS engine to manage Execution Contexts. It follows LIFO — the last context pushed is the first to be popped.

- Q: What happens to the Call Stack when a function is called?
  - A: A new Execution Context is created for that function and pushed onto the top of the Call Stack. When the function returns, its context is popped off.

- Q: What is a Stack Overflow?
  - A: When recursion (or repeated function calls) fills the Call Stack beyond its limit, the engine throws a `RangeError: Maximum call stack size exceeded`. This is called a Stack Overflow.

- Q: What other names does the Call Stack go by?
  - A: Execution Context Stack, Program Stack, Control Stack, Runtime Stack, Machine Stack.

## Key Takeaways

- The Call Stack manages all Execution Contexts using LIFO order
- GEC is the first context pushed; it's the last to be popped (when the program ends)
- Every function call pushes a new EC; every return pops it
- The Call Stack is always visible in browser DevTools — use it for debugging
- Unbounded recursion causes Stack Overflow (`Maximum call stack size exceeded`)
- JS has only ONE call stack — it can only do one thing at a time
