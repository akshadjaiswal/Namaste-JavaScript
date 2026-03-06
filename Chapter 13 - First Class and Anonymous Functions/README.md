# Episode 13: First Class Functions & Anonymous Functions

> Functions are first-class citizens in JavaScript — they can be assigned to variables, passed as arguments, and returned from other functions. This flexibility is the foundation of functional programming.

## Overview

JavaScript treats functions as first-class values. This means functions behave like any other value in the language — they can be stored, passed around, and returned. This episode covers all the ways to create and name functions, the distinctions that matter for hoisting and debugging, and what "first-class function" really means.

## Key Concepts

### Function Statement (Function Declaration)

A function defined using the `function` keyword as a standalone statement. It is hoisted completely — callable anywhere in its scope, even before the line where it is written.

```javascript
function greet() {
  console.log("Hello!");
}
greet(); // "Hello!"
```

### Function Expression

A function assigned to a variable. The variable is hoisted (to `undefined` for `var`), but the function itself is not. Cannot be called before the assignment.

```javascript
var greet = function() {
  console.log("Hello!");
};

// Calling before assignment:
// greet(); // TypeError: greet is not a function

greet(); // "Hello!" — called after assignment
```

### The Key Difference: Hoisting

| | Function Statement | Function Expression |
|---|---|---|
| Hoisted? | Yes — fully hoisted | Variable hoisted as `undefined`; function not hoisted |
| Callable before declaration? | Yes | No — TypeError |

### Function Declaration

Synonymous with "Function Statement". There is no practical difference — it is simply another name for the same construct.

### Anonymous Function

A function without a name. Anonymous functions have no name identifier after the `function` keyword. They cannot stand alone as a statement (that's a SyntaxError) — they must be used as a value (assigned, passed, or returned).

```javascript
// Valid: assigned to a variable
var fn = function() {
  console.log("anonymous");
};

// Valid: passed as argument
setTimeout(function() {
  console.log("timer fired");
}, 1000);

// Invalid: standalone
// function() { }  // SyntaxError: Function statements must have a name
```

### Named Function Expression

A function expression where the function also has a name. The name is only accessible **inside** the function itself (useful for recursion or self-reference). It is not accessible in the outer scope.

```javascript
var greet = function sayHello() {
  console.log("Hello from sayHello!");
  // sayHello() here would work (recursion)
};

greet();     // "Hello from sayHello!" — outer name works
// sayHello(); // ReferenceError: sayHello is not defined — not accessible outside
```

Named function expressions are preferred over anonymous expressions for debugging — the name appears in stack traces.

### Parameters vs Arguments

- **Parameters**: the variables listed in the function definition (placeholders)
- **Arguments**: the actual values passed when calling the function

```javascript
function add(a, b) { // a, b are PARAMETERS
  return a + b;
}

add(3, 5); // 3 and 5 are ARGUMENTS
```

### First-Class Functions (First-Class Citizens)

Functions in JavaScript are **first-class citizens** — they can be:
1. Assigned to variables
2. Passed as arguments to other functions
3. Returned from other functions
4. Stored in data structures (arrays, objects)

This ability — to use functions as values — is what makes higher-order functions and functional programming possible in JavaScript.

```javascript
// 1. Assigned to variable
const square = function(x) { return x * x; };

// 2. Passed as argument
[1, 2, 3].map(function(x) { return x * 2; }); // [2, 4, 6]

// 3. Returned from function
function multiplier(factor) {
  return function(x) { return x * factor; }; // returns a function
}
const double = multiplier(2);
console.log(double(5)); // 10

// 4. Stored in object
const utils = {
  greet: function() { console.log("Hello"); },
  farewell: function() { console.log("Goodbye"); }
};
```

## Code Example

```javascript
// From Lecture Code 10 - First Class Functions.js

// Function Statement
function a() {
  console.log("Function a — function statement");
}
a();

// Function Expression
var b = function() {
  console.log("Function b — function expression");
};
b();

// Named Function Expression
var c = function named() {
  console.log("Function c — named function expression");
  // named() // can call itself recursively
};
c();
// named(); // ReferenceError

// Anonymous as argument
setTimeout(function() {
  console.log("Timeout — anonymous function as argument");
}, 0);

// First-class: function as return value
function outer() {
  return function inner() {
    console.log("inner — returned from outer");
  };
}
var returned = outer();
returned();
```

## Interview Questions

- Q: What is the difference between a function statement and a function expression?
  - A: The major difference is hoisting. A function statement is fully hoisted — callable anywhere in its scope. A function expression assigns a function to a variable — only the variable is hoisted (as `undefined`), not the function. Calling it before the assignment throws a TypeError.

- Q: What is an anonymous function?
  - A: A function without a name. It must be used as a value — assigned to a variable, passed as an argument, or returned from another function. A standalone anonymous function is a SyntaxError.

- Q: What is a named function expression?
  - A: A function expression where the function also has a name. The name is only accessible inside the function (for recursion). It does not create an outer-scope binding. Named expressions are useful for debugging as the name appears in stack traces.

- Q: What does "first-class function" mean?
  - A: Functions are first-class when they can be used as values — assigned to variables, passed as arguments to other functions, and returned from functions. JavaScript functions are first-class citizens.

## Key Takeaways

- Function statement = fully hoisted; callable before its line in the code
- Function expression = only the variable is hoisted (`undefined`); the function is not
- Anonymous function = no name; must be used as a value, cannot stand alone
- Named function expression = has a name visible only inside itself (not in outer scope)
- Parameters = placeholders in definition; Arguments = actual values at call time
- First-class functions = functions as values: assignable, passable, returnable
- Named functions are better for debugging — they appear in stack traces
