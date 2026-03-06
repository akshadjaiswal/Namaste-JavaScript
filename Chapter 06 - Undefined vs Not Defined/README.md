# Episode 6: `undefined` vs Not Defined

> `undefined` is a value JavaScript assigns to variables that exist but haven't been given a value yet. "Not defined" means the variable doesn't exist at all.

## Overview

JavaScript has a special value called `undefined` that is distinct from an error. Beginners often confuse `undefined` with "not defined" — but they are fundamentally different things. One is a valid value; the other is a runtime error.

Understanding this distinction also deepens your understanding of the Memory Creation Phase and how JavaScript reserves space for variables before executing code.

## Key Concepts

### `undefined` — A Placeholder Value

During **Phase 1 (Memory Creation)** of the Execution Context, JavaScript allocates memory for every variable it finds in the code and assigns each one the special value `undefined` as a placeholder.

This means `undefined` is an actual value — it is the "not yet assigned" state of a variable.

```javascript
var x;
console.log(x); // undefined  — x exists, but has no assigned value yet
```

### Not Defined — A Reference Error

If you try to access a variable that was **never declared** anywhere in the code, JavaScript cannot find it in any scope. The engine throws a **ReferenceError**: `x is not defined`.

```javascript
console.log(z); // ReferenceError: z is not defined
// z was never declared with var/let/const
```

### The Difference at a Glance

| Scenario | What happens | Result |
|----------|-------------|--------|
| `var x; console.log(x)` | x was declared, memory allocated, no value assigned | `undefined` |
| `console.log(x); var x = 5` | x was hoisted with `undefined` | `undefined` |
| `console.log(z)` (z never declared) | z not found in any scope | `ReferenceError: z is not defined` |

### `undefined` is NOT the same as `null`

Both `undefined` and `null` are "empty-ish" values but with different semantics:
- `undefined` = "not yet assigned" — the engine's default
- `null` = "intentionally empty" — programmer's explicit choice

```javascript
var a;          // undefined (engine assigned it)
var b = null;   // null (programmer assigned it explicitly)

console.log(a); // undefined
console.log(b); // null
```

### Using `undefined` as a Value — Avoid This

Because `undefined` is a legitimate value, you could technically assign it:

```javascript
var x = undefined; // valid, but bad practice
```

This is considered bad practice because it defeats the purpose of `undefined` as a signal that no value has been assigned. Use `null` when you want to explicitly represent "no value".

### Checking for `undefined`

```javascript
var a;
if (a === undefined) {
  console.log("a has not been assigned a value");
}
// OR
if (typeof a === 'undefined') {
  console.log("safer check");
}
```

## Code Example

```javascript
// From Lecture Code 03 - Defined and undefined.js

var x;
console.log(x);         // undefined (declared, not assigned)

console.log(typeof x);  // "undefined"

x = 7;
console.log(x);         // 7 (now assigned)

// Accessing undeclared variable
// console.log(y);      // ReferenceError: y is not defined

// undefined is falsy
if (!x) {
  console.log("x is falsy"); // not printed — x is 7 now
}

var a;
if (!a) {
  console.log("a is falsy"); // printed — undefined is falsy
}
```

## Interview Questions

- Q: What is `undefined` in JavaScript?
  - A: `undefined` is a primitive value that JavaScript automatically assigns to variables during the Memory Creation Phase (Phase 1). It means the variable exists in memory but hasn't been given a value yet.

- Q: What does "not defined" mean?
  - A: "Not defined" is a ReferenceError thrown when you try to access a variable that was never declared. The engine cannot find it in any scope.

- Q: What is the difference between `undefined` and `null`?
  - A: `undefined` is set by the JS engine automatically as a placeholder. `null` is explicitly set by the programmer to represent an intentional absence of value.

- Q: Is `undefined` falsy?
  - A: Yes. `undefined` is one of JavaScript's falsy values, along with `null`, `0`, `''`, `false`, and `NaN`.

## Key Takeaways

- `undefined` is a real value that JS assigns during the Memory Creation Phase
- "Not defined" is a ReferenceError — the variable was never declared
- `undefined !== null` — both represent "empty" but mean different things
- Never deliberately assign `undefined` to a variable — use `null` instead
- `undefined` is falsy — it evaluates to `false` in boolean contexts
- Use `typeof x === 'undefined'` for the safest undefined-check (works even on undeclared variables)
