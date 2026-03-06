# Episode 7: Scope and Lexical Environment

> Scope determines where a variable can be accessed. Lexical Environment is the mechanism that makes scope work — each Execution Context carries a reference to its parent's memory.

## Overview

Scope is directly related to the Lexical Environment. Every time an Execution Context is created, a Lexical Environment is also created alongside it. This Lexical Environment consists of the local memory of the current EC plus a reference to the Lexical Environment of its parent.

This chaining of environments — from child to parent to grandparent, all the way up to the GEC — is called the **Scope Chain**. It is how JavaScript resolves variable names.

## Key Concepts

### Lexical Environment

A **Lexical Environment** is composed of:
1. **Local memory** — all variables/functions declared in the current scope
2. **Reference to parent's Lexical Environment**

"Lexical" means "in order of the source code" — where something is written determines its parent's environment.

```
Lexical Environment = Local Memory + Ref to Parent's Lexical Env
```

Every Execution Context has a Lexical Environment. The GEC's Lexical Environment has a parent reference of `null` (it has no parent).

### Scope Chain

When JavaScript encounters a variable name, it looks for it:
1. First in the **local memory** of the current EC
2. If not found, follows the **parent reference** to the parent's Lexical Environment
3. Keeps going up the chain until it finds the variable or reaches the GEC
4. If not found in GEC either → `ReferenceError`

This traversal is the **Scope Chain** (also called the Lexical Environment Chain).

### Lexical Scope (Static Scope)

JavaScript uses **lexical scope** — a function's scope is determined by *where it is written in the source code*, not by where it is called from.

```javascript
function outer() {
  var x = 10;
  function inner() {
    console.log(x); // inner is lexically inside outer → can access x
  }
  inner();
}
outer(); // 10
```

`inner` can access `x` not because it was called from inside `outer`, but because it was *written* (defined) inside `outer`. The lexical nesting is what matters.

### Global Scope

Variables declared at the top level (in the GEC) have global scope. They are accessible from anywhere in the program — from any function, any nested function, through the scope chain.

### Function Scope vs Block Scope

- `var` is **function-scoped** — a `var` inside a function is not accessible outside it, but is accessible anywhere within the function
- `let` and `const` are **block-scoped** — they are scoped to the nearest `{ }` block

## Code Example

```javascript
// From Lecture Code 04 - Scope and Lexical Environment.js

function a() {
  var x = 10;  // x is in a()'s local memory

  c(); // call c from inside a — but scope is determined by WHERE c is defined!
}

function c() {
  // c is defined at the global level (lexically)
  // so it can only access global variables
  console.log(x); // ReferenceError: x is not defined
                  // x is local to a(), not accessible to c() even though c() was called from a()
}

a();
```

**Contrast — lexical nesting:**

```javascript
function outer() {
  var x = 10;

  function inner() {
    // inner is defined INSIDE outer — so it has access to outer's scope
    console.log(x); // 10 — works! x is in the parent lexical environment
  }

  inner();
}

outer();
```

**Scope chain lookup:**
```
Looking up 'x' inside inner():
  1. inner()'s local memory → not found
  2. outer()'s lexical environment → found! x = 10
  Result: 10
```

## Interview Questions

- Q: What is scope in JavaScript?
  - A: Scope defines the region of code where a variable is accessible. Variables declared in a function are scoped to that function; variables in the GEC are globally scoped.

- Q: What is a Lexical Environment?
  - A: A Lexical Environment is the combination of local memory (variables/functions in the current scope) plus a reference to the parent's Lexical Environment. It is created whenever an Execution Context is created.

- Q: What is the Scope Chain?
  - A: The Scope Chain is the series of Lexical Environments linked together from child to parent. When a variable is not found locally, JS traverses the scope chain upward until it finds the variable or exhausts all environments.

- Q: What determines a function's scope in JavaScript?
  - A: Where the function is *written* (defined) in the source code — not where it is called from. This is called lexical scope (or static scope).

## Key Takeaways

- Every Execution Context creates a Lexical Environment = local memory + parent reference
- The Scope Chain is the chain of Lexical Environments from inner to outer
- JavaScript uses lexical (static) scope — scope is determined at write-time, not call-time
- Variable lookup walks up the scope chain; failure to find results in `ReferenceError`
- `var` is function-scoped; `let`/`const` are block-scoped
- The GEC's Lexical Environment parent reference is `null` — it's the top of the chain
