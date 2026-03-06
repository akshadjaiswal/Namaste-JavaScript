# Episode 4: `async` / `await`

> `async`/`await` is syntactic sugar over Promises — it lets you write async code that looks and reads like synchronous code, while still being fully non-blocking under the hood.

## Overview

`async` and `await` are ES2017 keywords that make Promise-based code dramatically more readable. An `async` function always returns a Promise. The `await` keyword pauses execution *within* the async function until a Promise settles — but crucially, it does not block the JavaScript engine. Other code continues running while the async function is suspended.

This episode covers how `async`/`await` works internally, its relationship to Promises, error handling with `try`/`catch`, and when to choose it over `.then()` chaining.

## Key Concepts

### The `async` Keyword

Placing `async` before a function declaration makes it an **async function**:

- Async functions **always return a Promise**
- If the function returns a non-Promise value, it's automatically wrapped in `Promise.resolve(value)`
- If the function throws, the returned Promise is rejected

```javascript
async function greet() {
  return "Hello!";
}

// Equivalent to:
function greet() {
  return Promise.resolve("Hello!");
}

greet().then(msg => console.log(msg)); // "Hello!"
```

### The `await` Keyword

`await` can only be used **inside an `async` function**. It pauses the execution of the async function until the awaited Promise settles, then returns the resolved value.

```javascript
async function fetchUser() {
  const response = await fetch("https://api.example.com/user"); // pauses here
  const user = await response.json(); // pauses again
  return user; // returns when both are done
}
```

### What Actually Happens Behind the Scenes?

"JS engine is not waiting" — this is the key insight.

When `await` is encountered:
1. The async function **suspends** — its Execution Context is removed from the Call Stack
2. The JS engine **continues** running other code (event loop keeps going)
3. When the awaited Promise settles, the async function's callback is placed in the **Microtask Queue**
4. The event loop picks it up and **resumes** the function from where it left off

```javascript
console.log("Before");

async function example() {
  console.log("Inside async — before await");
  await Promise.resolve(); // suspend — goes to microtask queue
  console.log("Inside async — after await"); // resumes from microtask queue
}

example();
console.log("After");

// Output:
// Before
// Inside async — before await
// After
// Inside async — after await  ← resumed from microtask queue
```

The function's code after `await` runs **asynchronously** — it's scheduled via the Microtask Queue, not blocking the main thread.

### Error Handling with `try`/`catch`

With Promises, you use `.catch()`. With `async`/`await`, use a standard `try`/`catch` block:

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error.message);
    // Handle error, return fallback, or rethrow
    throw error;
  }
}
```

### `async`/`await` vs `.then()` Chaining

Both approaches are equivalent — `async`/`await` is purely syntactic sugar. Under the hood, it compiles to Promise chains.

**Promise chain:**
```javascript
function processOrder(cart) {
  return createOrder(cart)
    .then(orderId => proceedToPayment(orderId))
    .then(paymentInfo => showOrderSummary(paymentInfo))
    .catch(err => console.error(err));
}
```

**Equivalent `async`/`await`:**
```javascript
async function processOrder(cart) {
  try {
    const orderId = await createOrder(cart);
    const paymentInfo = await proceedToPayment(orderId);
    await showOrderSummary(paymentInfo);
  } catch (err) {
    console.error(err);
  }
}
```

`async`/`await` is generally preferred because:
- Code reads top-to-bottom like synchronous code
- Variables at the same indentation level (no nested `.then()`)
- Standard `try`/`catch`/`finally` for error handling
- Easier to add conditional logic, loops, and other control flow

### Parallel vs Sequential Awaits

Awaiting one by one is sequential — each waits for the previous:
```javascript
const a = await fetchA(); // waits ~1s
const b = await fetchB(); // then waits ~1s — total ~2s
```

Run independently in parallel using `Promise.all`:
```javascript
const [a, b] = await Promise.all([fetchA(), fetchB()]); // total ~1s (concurrent)
```

### Real-World Fetch Example

```javascript
async function getWeather(city) {
  try {
    const response = await fetch(`https://api.weather.com/v1/${city}`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    return data.temperature;
  } catch (err) {
    console.error("Weather fetch failed:", err.message);
    return null;
  }
}

(async () => {
  const temp = await getWeather("Mumbai");
  console.log(`Temperature: ${temp}°C`);
})();
```

## Code Example

```javascript
// From Lecture Code 20 - async await.js and 21 - async await example using fetch.js

// Basic async/await
async function greetAsync() {
  return "Namaste!";
}
greetAsync().then(msg => console.log(msg)); // "Namaste!"

// await with promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function timedGreet() {
  console.log("Starting...");
  await delay(2000);           // suspend for 2 seconds — non-blocking
  console.log("After 2 seconds");
}

timedGreet();
console.log("This runs while timedGreet is suspended"); // runs immediately

// Fetch example with error handling
async function fetchPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) throw new Error(`Failed: ${res.status}`);
    const post = await res.json();
    console.log("Title:", post.title);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    console.log("Fetch attempt complete");
  }
}

fetchPost(1);
```

## Interview Questions

- Q: What does `async` do to a function?
  - A: It makes the function return a Promise automatically. Non-Promise return values are wrapped in `Promise.resolve()`. The function can use `await` inside it.

- Q: Is the JS engine actually waiting when `await` is encountered?
  - A: No. When `await` is hit, the async function is suspended and its Execution Context leaves the Call Stack. The JS engine continues running other code. When the awaited Promise settles, the function is resumed via the Microtask Queue.

- Q: How do you handle errors in `async`/`await`?
  - A: Use `try`/`catch`/`finally` blocks. The `catch` block receives the rejection reason (like `.catch()` in Promise chains).

- Q: What is the difference between `async`/`await` and `.then()` chaining?
  - A: They are functionally equivalent — `async`/`await` is syntactic sugar over Promises. `async`/`await` is generally preferred for readability: it looks like synchronous code, uses standard control flow (`if`, `for`, `try/catch`), and avoids indentation creep.

- Q: How do you run multiple async operations in parallel with `async`/`await`?
  - A: Use `Promise.all([...])` with `await`. Sequential `await` statements run one at a time; `await Promise.all([p1, p2, p3])` runs them concurrently and waits for all to settle.

## Key Takeaways

- `async` function always returns a Promise; non-Promise returns are auto-wrapped
- `await` suspends the async function, not the JS engine — other code keeps running
- Suspended async functions are resumed via the Microtask Queue when their Promise settles
- `async`/`await` is syntactic sugar over Promises — equivalent behavior, cleaner syntax
- Error handling: use `try`/`catch`/`finally` (same as synchronous error handling)
- Sequential `await` = serial execution; `await Promise.all([...])` = parallel execution
- Always prefer `async`/`await` for complex async flows with multiple steps and error handling
