# Episode 3: Hoisting in JavaScript

> Hoisting lets you access variables and call functions before they appear in the source code — because of how the Memory Creation Phase works.

## Overview

Hoisting is one of JavaScript's most misunderstood behaviors. Newcomers expect code to run strictly top-to-bottom, so accessing a variable before its declaration looks like it should throw an error. Instead, JS often returns `undefined` or even the full function — which seems like magic.

The explanation is the Execution Context's two-phase model: **memory is allocated before any code runs**. By the time line 1 executes, all variables and functions are already in memory. That's hoisting.

## Key Concepts

### Variable Hoisting (`var`)

When the JS engine encounters `var x = 5;`, during Phase 1 (memory allocation) it stores `x → undefined`. The actual assignment (`x = 5`) only happens in Phase 2 when that line is reached.

This means accessing `x` before the assignment gives `undefined`, not an error.

```javascript
console.log(x); // undefined  (not an error!)
var x = 5;
console.log(x); // 5
```

### Function Hoisting

Function declarations are stored **completely** in memory during Phase 1 — the entire function body is available. This means you can call a function before its definition in the code.

```javascript
greet(); // "Hello!" — works perfectly

function greet() {
  console.log("Hello!");
}
```

### `var` vs Function Hoisting — The Key Difference

| | `var` | Function Declaration |
|---|---|---|
| Phase 1 value | `undefined` | Full function body |
| Callable before declaration | No (returns `undefined`) | Yes |

### Function Expressions Are NOT Hoisted Like Declarations

When a function is assigned to a variable (`var fn = function() {}`), it follows **variable hoisting** rules — the variable gets `undefined` in Phase 1, not the function body.

```javascript
console.log(getName); // undefined
getName();             // TypeError: getName is not a function

var getName = function() {
  console.log("Namaste");
};
```

### `let` and `const` — Temporal Dead Zone

`let` and `const` are also hoisted, but they are placed in a **Temporal Dead Zone** (TDZ) — a special state where the variable exists in memory but cannot be accessed until its declaration line is reached. Accessing them before their declaration throws a `ReferenceError`.

```javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

## Code Example

```javascript
// From Lecture Code 01 - Hoisting in Javascript.js
getName();           // Works! Prints "Namaste JavaScript"
console.log(x);     // undefined  (var is hoisted with undefined)
// console.log(y);  // ReferenceError (let is in TDZ)

var x = 7;
let y = 5;

function getName() {
  console.log("Namaste JavaScript");
}
```

## Interview Questions

- Q: What is hoisting?
  - A: Hoisting is a behavior where variable declarations and function declarations are conceptually "moved" to the top of their scope before code executes. In reality, memory is allocated for them in Phase 1 of Execution Context creation.

- Q: What is the value of a `var` variable before its assignment line?
  - A: `undefined`. The variable exists in memory (from Phase 1) but its assigned value hasn't been set yet.

- Q: Can you call a function before its declaration?
  - A: Yes — for **function declarations**. Their entire body is stored in Phase 1. But function expressions assigned to `var` variables cannot be called before the assignment line.

- Q: What happens if you access a `let` or `const` variable before its declaration?
  - A: A `ReferenceError` is thrown because `let`/`const` are in the Temporal Dead Zone until their declaration line is reached.

## Key Takeaways

- Hoisting is a result of the Memory Creation Phase (Phase 1) of Execution Context
- `var` variables are hoisted with value `undefined`
- Function declarations are hoisted with their full body — callable anywhere in scope
- Function expressions (`var fn = function() {}`) follow `var` hoisting — the variable is `undefined` until assigned
- `let` and `const` are hoisted but sit in the Temporal Dead Zone — accessing them early throws `ReferenceError`
- Always declare variables at the top of their scope to avoid hoisting surprises
