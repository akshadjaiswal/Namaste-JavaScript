# Episode 5: Shortest JS Program, Window & `this` Keyword

> An empty JavaScript file is still a valid program — the engine creates a Global Execution Context, a `window` object, and a `this` binding before running a single line of your code.

## Overview

What does JavaScript do when given a completely empty file? More than you'd expect. The JS engine automatically sets up the Global Execution Context, creates the `window` global object, and establishes the `this` keyword — all before any user code runs.

This episode unpacks what those things are and why they exist.

## Key Concepts

### The Shortest JS Program

An empty `.js` file is the shortest valid JavaScript program. Even with zero lines of user code, the JS engine:
1. Creates the **Global Execution Context (GEC)**
2. Creates the **`window` object** (in browser environments)
3. Sets up the **`this`** keyword at the global level

### The `window` Object

`window` is a **global object** created by the JavaScript engine (specifically, by the browser's JS runtime). It represents the browser window and serves as the global scope container.

- All global variables and functions you declare become properties of `window`
- Built-in browser APIs (`setTimeout`, `console`, `fetch`, `localStorage`) are all properties of `window`
- You can access window properties with or without the `window.` prefix

```javascript
var name = "Namaste";
console.log(window.name); // "Namaste" — var globals attach to window
console.log(name);        // "Namaste" — same thing, window. is implicit
```

**Note**: In Node.js the global object is called `global`, not `window`. In modern environments, `globalThis` works universally.

### The `this` Keyword at the Global Level

At the global level (outside any function), `this` refers to the global object:

```javascript
console.log(this === window); // true (in browsers, at global scope)
```

This is important to understand because `this` changes value depending on *where* and *how* it's used — but at the top level, it always points to the global object.

### Global Variables Attach to `window`

When you declare a variable with `var` at the top level (not inside any function), it becomes a property of the `window` object:

```javascript
var x = 10;
console.log(window.x); // 10
console.log(this.x);   // 10  (this === window at global scope)
```

**However**, variables declared with `let` or `const` at the global level do **not** attach to `window`:

```javascript
let y = 20;
console.log(window.y); // undefined — let doesn't attach to window
```

### What Happens in a Different Runtime?

The behavior of the global object depends on the runtime environment:
- **Browser**: global object is `window`
- **Node.js**: global object is `global`
- **Web Workers**: global object is `self`
- **Universal**: use `globalThis` (standardized in ES2020)

## Code Example

```javascript
// Empty file — JS engine still sets up:
// 1. Global Execution Context
// 2. window object
// 3. this keyword

var course = "Namaste JavaScript";
let instructor = "Akshay Saini";

console.log(window.course);     // "Namaste JavaScript"
console.log(window.instructor); // undefined (let doesn't attach to window)
console.log(this === window);   // true
console.log(this.course);       // "Namaste JavaScript"
```

## Interview Questions

- Q: What is the shortest JavaScript program?
  - A: An empty file. Even with no user code, the engine creates the GEC, `window` object, and `this` binding.

- Q: What is the `window` object?
  - A: The `window` object is the global object in browser environments. It contains all global variables (declared with `var`), built-in browser APIs, and is the value of `this` at the global scope.

- Q: What does `this` equal at the global scope in a browser?
  - A: `this` equals the `window` object. `this === window` is `true` at the global level.

- Q: Do `let` and `const` variables attach to the `window` object?
  - A: No. Only `var` variables declared at the global level become properties of `window`. `let` and `const` create global variables but don't attach to the global object.

- Q: What is `globalThis`?
  - A: `globalThis` is a standardized way (ES2020) to access the global object across all environments — whether browser (`window`), Node.js (`global`), or web workers (`self`).

## Key Takeaways

- JS engine creates GEC, `window`, and `this` even for an empty file
- `window` is the global object in browsers — it holds all browser APIs and global `var` variables
- At the global scope: `this === window` (in browsers)
- `var` globals become properties of `window`; `let`/`const` globals do not
- The global object differs per environment: `window` (browser), `global` (Node.js), `globalThis` (universal)
