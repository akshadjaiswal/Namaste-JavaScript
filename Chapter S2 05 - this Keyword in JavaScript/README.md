# Episode 5: `this` Keyword in JavaScript

> The value of `this` is not fixed — it depends on *how* a function is called. Understanding the rules for each context is essential for avoiding one of JavaScript's most common sources of confusion.

## Overview

`this` is a special keyword in JavaScript that refers to the context in which code is currently executing. Unlike in most other object-oriented languages where `this` always refers to the current instance, JavaScript's `this` is dynamic — its value is determined at call time, not at definition time (except for arrow functions, which capture `this` from their enclosing lexical context).

## Key Concepts

### Rule 1: Global Context

In the global scope (outside any function), `this` refers to the **global object**:
- Browser: `window`
- Node.js: `global` (or `{}` in modules)

```javascript
console.log(this); // window (in browser)
console.log(this === window); // true
```

### Rule 2: Inside a Regular Function

In **non-strict mode**, `this` inside a function refers to the global object (`window`).

In **strict mode** (`'use strict'`), `this` inside a regular function is `undefined`.

```javascript
function show() {
  console.log(this);
}
show(); // window (non-strict) or undefined (strict)

'use strict';
function showStrict() {
  console.log(this); // undefined
}
showStrict();
```

### `this` Substitution

In non-strict mode, if `this` would be `undefined` or `null` (e.g., a regular function call), JavaScript **substitutes** the global object in its place. This is called **`this` substitution**. Strict mode disables this behavior.

### Rule 3: Method Context (Object Methods)

When a function is called as a **method** of an object (`obj.method()`), `this` refers to that object:

```javascript
const person = {
  name: "Akshay",
  greet: function() {
    console.log("Hello, " + this.name); // this → person
  }
};

person.greet(); // "Hello, Akshay"
```

**Caveat**: The binding depends on how the method is called, not where it is defined:
```javascript
const greetFn = person.greet;
greetFn(); // "Hello, undefined" — this is window/undefined (no longer called as a method)
```

### Rule 4: `call`, `apply`, `bind`

These methods let you **explicitly set** the value of `this`:

**`call(thisArg, arg1, arg2, ...)`** — calls the function with given `this` and arguments:
```javascript
function greet(greeting) {
  console.log(greeting + ", " + this.name);
}

const user = { name: "Akshad" };
greet.call(user, "Hello"); // "Hello, Akshad"
```

**`apply(thisArg, [arg1, arg2, ...])`** — same as `call` but arguments passed as an array:
```javascript
greet.apply(user, ["Namaste"]); // "Namaste, Akshad"
```

**`bind(thisArg, arg1, ...)`** — returns a **new function** with `this` permanently bound:
```javascript
const boundGreet = greet.bind(user, "Hi");
boundGreet(); // "Hi, Akshad"
// this is permanently set to user — cannot be overridden
```

### Rule 5: Arrow Functions

Arrow functions do **not have their own `this`**. They inherit `this` from their **enclosing lexical context** (the scope where the arrow function is defined). This is called **lexical `this`**.

```javascript
const obj = {
  name: "Akshay",
  greetArrow: () => {
    console.log(this.name); // this is NOT obj — it's the enclosing context (window/undefined)
  },
  greetRegular: function() {
    const inner = () => {
      console.log(this.name); // this IS obj — inherited from greetRegular's context
    };
    inner();
  }
};

obj.greetArrow();  // undefined (or window.name)
obj.greetRegular(); // "Akshay"
```

Arrow functions are ideal for callbacks inside methods — they preserve the outer `this`:

```javascript
const timer = {
  count: 0,
  start: function() {
    setInterval(() => {
      this.count++; // 'this' correctly refers to timer (lexical this from start())
      console.log(this.count);
    }, 1000);
  }
};
timer.start();
```

### Rule 6: `this` in Classes and Constructors

Inside a class method, `this` refers to the instance:

```javascript
class Person {
  constructor(name) {
    this.name = name; // this → new instance
  }
  greet() {
    console.log("Hi, " + this.name); // this → instance
  }
}

const p = new Person("Akshad");
p.greet(); // "Hi, Akshad"
```

### Rule 7: `this` in DOM Event Handlers

When a function is used as a DOM event handler, `this` refers to the **HTML element** that fired the event:

```javascript
document.getElementById("btn").addEventListener("click", function() {
  console.log(this); // the button element
});

// Arrow function — this would be the enclosing scope (not the element)
document.getElementById("btn").addEventListener("click", () => {
  console.log(this); // window (or undefined in strict mode)
});
```

### Summary of `this` Rules

| Context | `this` value |
|---------|-------------|
| Global scope (browser) | `window` |
| Regular function (non-strict) | `window` (this substitution) |
| Regular function (strict mode) | `undefined` |
| Object method (`obj.fn()`) | `obj` |
| `call(thisArg, ...)` | `thisArg` |
| `apply(thisArg, [...])` | `thisArg` |
| `bind(thisArg)()` | `thisArg` (permanent) |
| Arrow function | Lexical (enclosing scope's `this`) |
| Class constructor/method | The class instance |
| DOM event handler (regular function) | The DOM element |

## Code Example

```javascript
// From Lecture Code 23 - this keyword in javascript.js

// Global
console.log(this === window); // true (browser)

// Regular function (non-strict)
function showThis() {
  console.log(this); // window
}
showThis();

// Strict mode
function showThisStrict() {
  'use strict';
  console.log(this); // undefined
}
showThisStrict();

// Object method
const student = {
  name: "Akshad",
  printName: function() {
    console.log(this.name); // "Akshad"
  }
};
student.printName();

// call/apply/bind
const teacher = { name: "Akshay" };
student.printName.call(teacher);  // "Akshay"
student.printName.apply(teacher); // "Akshay"
const boundFn = student.printName.bind(teacher);
boundFn(); // "Akshay"

// Arrow function — lexical this
const obj = {
  name: "LexicalTest",
  getArrow: function() {
    const arrow = () => {
      console.log(this.name); // inherits this from getArrow
    };
    arrow();
  }
};
obj.getArrow(); // "LexicalTest"
```

## Interview Questions

- Q: What is `this` in JavaScript?
  - A: `this` is a keyword that refers to the object that is currently executing the code. Its value is determined by how the function is called — it is dynamic (except in arrow functions, where it is lexically bound).

- Q: What is `this` substitution?
  - A: In non-strict mode, if a function is called where `this` would be `undefined` or `null`, JavaScript substitutes the global object (`window`) instead. Strict mode disables this substitution.

- Q: What is the difference between `call`, `apply`, and `bind`?
  - A: All three let you set `this` explicitly. `call` invokes the function immediately with individual arguments. `apply` invokes immediately with arguments as an array. `bind` returns a new function with `this` permanently set — it doesn't call the function.

- Q: Why don't arrow functions have their own `this`?
  - A: Arrow functions capture `this` from their surrounding lexical context at definition time. This makes them ideal for callbacks that need to access the outer `this` (e.g., inside class methods or object methods).

- Q: What is `this` inside a DOM event handler?
  - A: For a regular function handler, `this` is the DOM element that triggered the event. For an arrow function handler, `this` is the enclosing lexical context (usually `window`).

## Key Takeaways

- `this` is dynamic — determined by how the function is called, not where it's defined
- Global context: `this === window` (browser) or `global` (Node.js)
- Regular function (non-strict): `this` → global object; (strict): `this` → `undefined`
- `this` substitution: in non-strict mode, `undefined`/`null` `this` becomes the global object
- Object method: `this` → the object before the dot
- `call`/`apply`: set `this` temporarily and invoke immediately
- `bind`: returns a new function with `this` permanently bound
- Arrow functions: no own `this` — lexically inherit from enclosing scope
- DOM handlers (regular function): `this` → the DOM element
