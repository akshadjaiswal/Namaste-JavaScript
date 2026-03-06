# Episode 8: `let`, `const` and the Temporal Dead Zone

> `let` and `const` are hoisted differently from `var` — they live in a Temporal Dead Zone until their declaration line, making early access a ReferenceError.

## Overview

`let` and `const` were introduced in ES6 to fix several pain points with `var`. They bring stricter scoping rules (block scope instead of function scope) and stricter hoisting behavior (Temporal Dead Zone). Understanding when and why to use each — and what errors they produce — is essential for modern JavaScript.

## Key Concepts

### How `let` and `const` Are Hoisted

All three — `var`, `let`, and `const` — are hoisted. But they differ in *where* they are stored and whether they are accessible:

- `var` → stored in the **global object** (`window`) memory; initialized to `undefined`
- `let`/`const` → stored in a **separate memory space** (not on `window`); placed in the Temporal Dead Zone

You can observe this in browser DevTools: before any code runs, `var` variables appear in the global scope, while `let`/`const` variables appear in a distinct "Script" scope — inaccessible until their declaration line is reached.

### Temporal Dead Zone (TDZ)

The **Temporal Dead Zone** is the period from when a `let`/`const` variable is hoisted to when its declaration line is executed. During this time, the variable exists in memory but cannot be accessed.

```
TDZ starts: (beginning of scope — variable is hoisted)
  ... code before the declaration ...
TDZ ends: (the let/const declaration line is reached)
  ... variable is now accessible ...
```

### The Three Error Types

JavaScript has three error types directly relevant to variable declarations:

**1. ReferenceError — accessing before initialization (TDZ)**
```javascript
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

**2. ReferenceError — variable not declared at all**
```javascript
console.log(b); // ReferenceError: b is not defined
// b was never declared
```

**3. SyntaxError — `const` without initializer**
```javascript
const c; // SyntaxError: Missing initializer in const declaration
```

**4. TypeError — reassigning `const`**
```javascript
const d = 5;
d = 10; // TypeError: Assignment to constant variable
```

**5. SyntaxError — redeclaring `let` in same scope**
```javascript
let x = 5;
let x = 10; // SyntaxError: Identifier 'x' has already been declared
```

### `let` vs `const` vs `var`

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisting | `undefined` | TDZ | TDZ |
| Reassignment | Yes | Yes | No |
| Redeclaration | Yes | No | No |
| Must initialize | No | No | Yes |
| Attaches to `window` | Yes | No | No |

### Block Scope

`let` and `const` are scoped to the nearest `{ }` block — not just function bodies. This includes `if`, `for`, `while`, and any standalone `{ }` block.

```javascript
{
  let x = 10;  // only accessible inside this block
  const y = 20;
}
console.log(x); // ReferenceError: x is not defined
console.log(y); // ReferenceError: y is not defined
```

## Code Example

```javascript
// From Lecture Code 05 - Let and Const.js

// Accessing before declaration
// console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
console.log(a); // 10

// var is accessible before (as undefined)
console.log(b); // undefined
var b = 20;
console.log(b); // 20

// const must be initialized at declaration
// const c;         // SyntaxError: Missing initializer in const declaration
const c = 30;
console.log(c); // 30

// const cannot be reassigned
// c = 40;          // TypeError: Assignment to constant variable

// let can be reassigned but not redeclared
a = 50;
console.log(a); // 50
// let a = 60;   // SyntaxError: Identifier 'a' has already been declared
```

## Minimizing the Temporal Dead Zone

To avoid TDZ-related bugs, always declare variables at the top of their scope:

```javascript
// Good — TDZ window is as small as possible
function example() {
  let a = 10;    // declared at the top
  const b = 20;  // declared at the top
  // ... use a and b below
}
```

## Interview Questions

- Q: Are `let` and `const` hoisted?
  - A: Yes, they are hoisted — but they are placed in the Temporal Dead Zone rather than initialized to `undefined`. They cannot be accessed until their declaration line is reached.

- Q: What is the Temporal Dead Zone?
  - A: The TDZ is the time between when a `let`/`const` variable is hoisted and when it is initialized. Accessing the variable during this period throws a `ReferenceError: Cannot access 'x' before initialization`.

- Q: What error does `const x;` throw?
  - A: `SyntaxError: Missing initializer in const declaration`. `const` must always be initialized at the point of declaration.

- Q: What is the difference between `let` and `const`?
  - A: Both are block-scoped and have TDZ. The difference is that `const` cannot be reassigned after initialization and must be initialized when declared. `let` allows reassignment.

## Key Takeaways

- `let` and `const` are block-scoped (not function-scoped like `var`)
- All three are hoisted, but `let`/`const` go into the Temporal Dead Zone
- TDZ means the variable exists in memory but throws ReferenceError if accessed early
- `const` must be initialized at declaration and cannot be reassigned (TypeError if you try)
- `let` cannot be redeclared in the same scope (SyntaxError)
- `var` attaches to `window`; `let`/`const` do not
- Minimize TDZ window: always declare at the top of the scope
- Prefer `const` by default; use `let` when reassignment is needed; avoid `var`
