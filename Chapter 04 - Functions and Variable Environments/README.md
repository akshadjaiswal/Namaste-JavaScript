# Episode 4: Functions and Variable Environments

> Each function call creates its own Execution Context with its own Variable Environment — variables don't leak between calls.

## Overview

This episode connects the dots between what we know about Execution Contexts and how functions actually behave at runtime. When a function is invoked, a fresh Execution Context is created for it — complete with its own memory space. Multiple calls to the same function each get their own isolated Variable Environment.

This is what makes local variables truly local, and it's the foundation of closures, scope chains, and the call stack behavior we've seen.

## Key Concepts

### Each Function Call Gets Its Own Execution Context

When JavaScript invokes a function, the engine:
1. Creates a new Execution Context (EC) for that function
2. Pushes it onto the Call Stack
3. Runs Phase 1 (memory allocation) for that EC — local variables start as `undefined`
4. Runs Phase 2 (code execution) — assignment and logic runs
5. Returns the result; the EC is popped from the Call Stack and **destroyed**

### Variable Environments Are Isolated

Each EC has its own Variable Environment. A variable named `x` in one function call has no connection to a variable named `x` in another call — even if they're calls to the same function. They live in separate memory spaces.

### The Global Execution Context (GEC)

The GEC is always the bottommost context on the Call Stack. Code at the top level of a file executes inside the GEC. Function calls create ECs on top of the GEC — those ECs can reference the GEC's variables (via scope chain), but the GEC cannot reach into a function's local EC.

### Return Value Lifecycle

When a function executes `return ans`, the value is passed back to the calling context (the EC below on the stack). The function's EC is then immediately deleted. The variable in the calling context receives the returned value.

## Code Example

```javascript
// From Lecture Code 02 - Function in Javascript.js
var x = 1;

a(); // call before declaration — works due to hoisting
b();
console.log(x); // 1

function a() {
  var x = 10; // local to a()'s EC
  console.log(x); // 10
}

function b() {
  var x = 100; // local to b()'s EC
  console.log(x); // 100
}
```

**What happens step by step:**

```
GEC created:
  Memory: { x: undefined, a: fn a, b: fn b }

Code execution:
  x = 1
  a() called → EC_a created → pushed onto stack
    EC_a Memory: { x: undefined }
    EC_a Code: x = 10; console.log(x) → prints 10
    EC_a returned → popped off stack, deleted
  b() called → EC_b created → pushed onto stack
    EC_b Memory: { x: undefined }
    EC_b Code: x = 100; console.log(x) → prints 100
    EC_b returned → popped off stack, deleted
  console.log(x) → uses GEC's x = 1 → prints 1
```

## Interview Questions

- Q: What happens inside the JS engine when a function is called?
  - A: A new Execution Context is created for that function call. It goes through Phase 1 (memory allocation for local variables) and Phase 2 (code execution). The EC is pushed onto the Call Stack when the function starts, and popped when it returns.

- Q: Does a function's local variable affect variables outside it?
  - A: No. Each function has its own Variable Environment (memory space). A `var x` inside a function is completely separate from a `var x` outside it.

- Q: What happens to a function's EC after it returns?
  - A: The EC is popped off the Call Stack and destroyed. All local variables in it are gone (unless captured in a closure).

- Q: Can GEC variables be accessed inside a function?
  - A: Yes — functions can access variables from outer scopes via the scope chain. But the GEC cannot access variables that are local to a function.

## Key Takeaways

- Every function call creates a fresh, independent Execution Context
- Local variables live in the function's Variable Environment and are isolated from other ECs
- The same function called twice creates two separate ECs — they don't share memory
- When a function returns, its EC is destroyed — local variables are cleaned up
- The Call Stack manages the order of ECs: GEC at the bottom, active function EC at the top
- This isolation is fundamental to how scope and closures work in JavaScript
