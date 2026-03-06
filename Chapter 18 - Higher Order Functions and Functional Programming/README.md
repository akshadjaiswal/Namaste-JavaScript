# Episode 18: Higher Order Functions & Functional Programming

> Higher-order functions take other functions as arguments or return functions as their result. They are the cornerstone of functional programming — enabling reusable, composable, declarative code.

## Overview

Functional programming is a paradigm that treats computation as the evaluation of mathematical functions. JavaScript's first-class functions make it naturally suited for this style. Higher-order functions (HOFs) are the key primitive: they allow you to abstract over behavior, not just data.

Instead of writing specialized loops for every operation, HOFs let you write general-purpose functions that accept behavior (another function) as a parameter. This leads to more readable, testable, and composable code.

## Key Concepts

### What is a Higher-Order Function?

A **Higher-Order Function** is a function that:
- Takes one or more functions as **arguments**, OR
- Returns a **function** as its result (or both)

Functions like `map`, `filter`, `reduce`, `forEach`, `setTimeout`, and `addEventListener` are all higher-order functions.

```javascript
// HOF that takes a function as argument
function doTwice(fn) {
  fn();
  fn();
}

doTwice(function() {
  console.log("Hello!");
});
// Hello!
// Hello!
```

```javascript
// HOF that returns a function
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Why Higher-Order Functions?

The traditional approach to programming is imperative — you write *how* to do something step by step:

```javascript
// Imperative: manually compute radius, area, diameter
const radius = [3, 1, 2, 4];
const areas = [];
for (let i = 0; i < radius.length; i++) {
  areas.push(Math.PI * radius[i] * radius[i]);
}
```

The functional approach separates the *what* (the math) from the *how* (the iteration):

```javascript
// Functional: the math is a separate reusable function
const area = (r) => Math.PI * r * r;
const areas = radius.map(area); // pass behavior to the HOF
```

Now `area` is reusable, testable in isolation, and the intent is clear.

### Principles of Functional Programming

- **Pure functions**: Given the same input, always return the same output; no side effects
- **Immutability**: Don't modify existing data — create new values
- **Declarative style**: Express *what* you want, not *how* to compute it
- **Function composition**: Combine small functions to build complex behavior

```javascript
// Pure function — no side effects, deterministic
function add(a, b) {
  return a + b; // always same output for same inputs
}

// Impure — depends on external state (side effect)
let count = 0;
function increment() {
  count++; // modifies external state
}
```

### Building Your Own `map`-Like HOF

Understanding built-in HOFs is easier when you build your own:

```javascript
// Custom calculate HOF (like map, but for named operations)
Array.prototype.calculate = function(logic) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(logic(this[i]));
  }
  return output;
};

const radius = [3, 1, 2, 4];

const area = (r) => Math.PI * r * r;
const circumference = (r) => 2 * Math.PI * r;
const diameter = (r) => 2 * r;

console.log(radius.calculate(area));
console.log(radius.calculate(circumference));
console.log(radius.calculate(diameter));
```

This is exactly how `Array.prototype.map` works internally.

## Code Example

```javascript
// From Lecture Code 14 - Functional Programming.js

const radius = [3, 1, 2, 4];

// Traditional imperative approach
function getArea(arr) {
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    output.push(Math.PI * arr[i] * arr[i]);
  }
  return output;
}

function getCircumference(arr) {
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    output.push(2 * Math.PI * arr[i]);
  }
  return output;
}
// Problem: repeated logic — only the formula changes!

// Functional approach: extract the varying behavior
const area = (r) => Math.PI * r * r;
const circumference = (r) => 2 * Math.PI * r;
const diameter = (r) => 2 * r;

// One generic HOF handles all cases
function calculate(arr, logic) {
  return arr.map(logic); // or manually iterate
}

console.log(calculate(radius, area));
console.log(calculate(radius, circumference));
console.log(calculate(radius, diameter));
```

## Interview Questions

- Q: What is a Higher-Order Function?
  - A: A function that either accepts other functions as arguments or returns a function as its result. Examples: `map`, `filter`, `reduce`, `setTimeout`, `addEventListener`.

- Q: What is the benefit of higher-order functions?
  - A: They allow you to abstract over behavior, not just data. Instead of writing specialized loops for every operation, you write one general HOF that accepts behavior as a parameter. This reduces code repetition, improves readability, and enables functional composition.

- Q: What is a pure function?
  - A: A pure function always returns the same output for the same input and has no side effects (doesn't modify external state, doesn't do I/O). Pure functions are easier to test, debug, and reason about.

- Q: How does functional programming differ from imperative programming?
  - A: Imperative programming describes *how* to do something (explicit loops and state mutations). Functional programming describes *what* you want (using functions like `map`/`filter`/`reduce`), delegating the how to the HOF. Functional code tends to be more declarative and composable.

## Key Takeaways

- A HOF either takes a function as argument, returns a function, or both
- HOFs abstract over behavior — the "how" is the HOF, the "what" is the passed function
- Functional programming: pure functions, immutability, declarative style, composition
- Built-in HOFs: `map`, `filter`, `reduce`, `forEach`, `find`, `some`, `every`
- Separating logic from iteration enables highly reusable, composable code
- Writing your own HOF is the best way to understand how `map`, `filter`, `reduce` work internally
