# Episode 9: Block Scope and Shadowing

> A block groups statements together; block scope means variables declared inside don't leak out. Shadowing lets an inner variable temporarily override an outer one — but only within legal limits.

## Overview

JavaScript's `{ }` braces serve double duty: they group statements (forming a "compound statement") and they create a new block scope for `let` and `const` variables. Understanding how variables shadow each other across scopes — and where that shadowing becomes illegal — is crucial for writing predictable code.

## Key Concepts

### What is a Block?

A **block** (also called a compound statement) is a pair of curly braces `{ }` used to group multiple JavaScript statements together. Blocks are used in `if`, `for`, `while`, function bodies — and can also be written standalone.

```javascript
// Standalone block — valid JavaScript
{
  var x = 1;
  let y = 2;
  const z = 3;
  console.log(x, y, z); // 1 2 3
}
```

Blocks are needed wherever JavaScript syntax expects a single statement but you want to write multiple statements (e.g., the body of an `if` statement).

### Block Scope

**Block scope** means that variables declared with `let` or `const` inside a block `{ }` are only accessible within that block. They are not visible outside it.

```javascript
{
  let a = 10;
  const b = 20;
  var c = 30;
}

console.log(c); // 30  — var is NOT block-scoped (function/global scoped)
console.log(a); // ReferenceError: a is not defined
console.log(b); // ReferenceError: b is not defined
```

In browser DevTools, `let`/`const` in a block appear in a separate "Block" scope, while `var` appears in the enclosing function/global scope.

### Shadowing

**Shadowing** occurs when a variable declared in an inner scope has the same name as a variable in an outer scope. The inner variable "shadows" (temporarily hides) the outer one within that inner scope.

```javascript
var x = 1; // outer

{
  var x = 2; // shadows outer x — but both are the SAME variable (var is not block-scoped)
  console.log(x); // 2
}
console.log(x); // 2  — outer x was modified!
```

```javascript
let y = 1; // outer

{
  let y = 2; // creates a NEW variable in the block scope, shadows outer y
  console.log(y); // 2  — inner y
}
console.log(y); // 1  — outer y is unchanged
```

### Illegal Shadowing

**Illegal shadowing** occurs when you try to shadow a `let` variable with a `var` in the same scope or a nested block. This is a SyntaxError.

```javascript
let x = 5;
{
  var x = 10; // SyntaxError: Identifier 'x' has already been declared
}
```

Why illegal? Because `var` is function-scoped — this `var x` would "escape" the block and try to occupy the same scope as the outer `let x`, which is not allowed.

**Valid shadowing combinations:**

| Outer | Inner | Valid? |
|-------|-------|--------|
| `var` | `var` | Yes (modifies the same variable) |
| `var` | `let` | Yes (new block-scoped variable) |
| `let` | `let` | Yes (new block-scoped variable) |
| `let` | `var` | **No — SyntaxError (illegal shadowing)** |
| `const` | `var` | **No — SyntaxError (illegal shadowing)** |
| `const` | `let`/`const` | Yes |

### Shadowing in Functions

The same shadowing rules apply inside functions. A variable inside a function that has the same name as one in the outer scope creates a new, independent variable (for `let`/`const`).

```javascript
let a = 100;

function test() {
  let a = 200; // valid — function creates its own scope
  console.log(a); // 200
}

test();
console.log(a); // 100 — outer unchanged
```

### Arrow Functions Follow the Same Rules

Arrow functions behave identically to regular functions with respect to block scope and shadowing.

## Code Example

```javascript
// From Lecture Code 06 - Block Scope and Shadowing in Javascript.js

var x = 1;
let y = 2;
const z = 3;

{
  var x = 11;  // same var x — overwrites global x
  let y = 22;  // new block-scoped y — shadows outer y
  const z = 33; // new block-scoped z — shadows outer z

  console.log(x); // 11
  console.log(y); // 22
  console.log(z); // 33
}

console.log(x); // 11  — var was modified (no block scope)
console.log(y); // 2   — let was shadowed, outer unchanged
console.log(z); // 3   — const was shadowed, outer unchanged
```

## Interview Questions

- Q: What is a block in JavaScript?
  - A: A block is a pair of curly braces `{ }` that groups multiple statements together. It is also called a compound statement. Blocks create a new scope for `let` and `const` variables.

- Q: What is shadowing in JavaScript?
  - A: Shadowing occurs when a variable in an inner scope has the same name as one in an outer scope. The inner variable "shadows" (hides) the outer one within its scope. The outer variable is not modified.

- Q: What is illegal shadowing?
  - A: Illegal shadowing is when you try to shadow a `let` or `const` variable with a `var` in a nested block. It throws a SyntaxError because `var` would escape the block and conflict with the `let`/`const` in the outer scope.

- Q: Can you shadow a `var` with a `let`?
  - A: Yes. Shadowing `var` with `let` is valid. The `let` creates a new block-scoped variable that shadows the `var` within the block.

## Key Takeaways

- A block `{ }` groups statements and creates block scope for `let`/`const`
- `var` ignores block scope — it's scoped to the enclosing function or global
- Shadowing: inner variable with the same name as outer — valid for `let` and `const`
- Shadowing `let`/`const` with `var` is **illegal** — SyntaxError
- Arrow functions follow the same scope rules as regular functions
- In DevTools, `let`/`const` in blocks show in a "Block" scope; `var` shows in function/global scope
