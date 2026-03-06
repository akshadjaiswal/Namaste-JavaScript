# Episode 1: Execution Context

> Everything in JavaScript happens inside an Execution Context.

## Overview

The Execution Context is the foundational concept of JavaScript. Before a single line of your code runs, the JS engine creates an environment — the Execution Context — that manages all variable storage and code execution.

Think of it as a big container (box) with two compartments inside it. Every time JavaScript runs code, it does so within one of these containers.

Understanding Execution Context is the key to understanding hoisting, closures, scope, and the call stack — almost every advanced JS concept builds on this foundation.

## Key Concepts

### The Two Components

An Execution Context has exactly two parts:

**1. Memory Component (Variable Environment)**
- Stores all variables and functions as key-value pairs
- Variables are stored with the value `undefined` initially
- Functions are stored with their entire function body
- Also called the **Variable Environment**

**2. Code Component (Thread of Execution)**
- Executes code one line at a time, in order
- Only one line runs at a time — this is what makes JS single-threaded
- Also called the **Thread of Execution**

### The Two Phases of Execution

When the JS engine runs a program, it goes through two distinct phases:

**Phase 1 — Memory Creation Phase:**
- JS scans the entire code before executing anything
- Allocates memory for every variable (assigned `undefined`) and function (stored fully)
- This is why hoisting works — memory is allocated before code runs

**Phase 2 — Code Execution Phase:**
- JS executes the code line by line
- Variables get their actual values assigned
- Function calls create new Execution Contexts

### Global Execution Context (GEC)

When a JS program starts, a **Global Execution Context** is created automatically. It is the outermost context. Everything at the top level of your script runs inside the GEC.

### JavaScript is Synchronous and Single-Threaded

- **Single-threaded**: Only one command executes at a time
- **Synchronous**: Commands execute in a specific, sequential order — one after another

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

**Phase 1 — Memory Allocation:**
```
n       → undefined
square  → function square(num) { var ans = num * num; return ans; }
square2 → undefined
square4 → undefined
```

**Phase 2 — Code Execution:**
```
n = 2                        (line 1 executed)
square2 = square(2) called   (new Execution Context created)
  ans = 2 * 2 = 4
  returns 4 → square2 = 4
square4 = square(4) called   (another new Execution Context created)
  ans = 4 * 4 = 16
  returns 16 → square4 = 16
```

## Interview Questions

- Q: What is an Execution Context?
  - A: An Execution Context is an environment where JavaScript code is evaluated and executed. It has two components: Memory (Variable Environment) and Code (Thread of Execution).

- Q: What are the two phases of an Execution Context?
  - A: Phase 1 is the Memory Creation Phase where variables get `undefined` and functions get stored fully. Phase 2 is the Code Execution Phase where code runs line by line.

- Q: What is the Global Execution Context?
  - A: The GEC is the default context created when a JS program starts. All top-level code runs in the GEC. There is only one GEC per program.

- Q: Why is JS called single-threaded?
  - A: Because it has only one Call Stack — it can do only one thing at a time.

## Key Takeaways

- Every JS program starts by creating a Global Execution Context
- An Execution Context = Memory Component + Code Component
- Phase 1 allocates memory (variables → `undefined`, functions → full body)
- Phase 2 executes code line by line
- Each function call creates a brand new Execution Context
- JS is synchronous and single-threaded — one thing at a time
