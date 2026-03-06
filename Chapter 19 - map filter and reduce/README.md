# Episode 19: `map`, `filter`, and `reduce`

> Three essential higher-order functions for array transformation — `map` transforms each element, `filter` selects elements, and `reduce` accumulates them all into a single value.

## Overview

`map`, `filter`, and `reduce` are the three pillars of functional array processing in JavaScript. Together they replace most imperative `for` loops with cleaner, more expressive code. Each is a higher-order function built into `Array.prototype`.

## Key Concepts

### `map` — Transform Each Element

`map` creates a **new array** by applying a function to every element of the original array. The original array is not modified.

```
Input: [a, b, c]  →  map(fn)  →  [fn(a), fn(b), fn(c)]
```

- Returns a new array of the same length
- Each element is the result of calling `fn` on the corresponding original element

```javascript
const arr = [1, 2, 3, 4, 5];

const doubled = arr.map(function(x) {
  return x * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(arr);     // [1, 2, 3, 4, 5] — unchanged
```

### `filter` — Select Elements by Condition

`filter` creates a **new array** containing only elements for which the callback returns a truthy value.

```
Input: [a, b, c]  →  filter(fn)  →  [elements where fn(x) is truthy]
```

- Returns a new array (possibly shorter than the original)
- Elements that pass the test are included; others are excluded

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8];

const evens = arr.filter(function(x) {
  return x % 2 === 0;
});
console.log(evens); // [2, 4, 6, 8]
```

### `reduce` — Accumulate to a Single Value

`reduce` applies a reducer function to each element, accumulating a single output value. It takes:
1. A **reducer function** with signature `(accumulator, currentValue) => newAccumulator`
2. An optional **initial value** for the accumulator

```
Input: [a, b, c]  →  reduce(fn, initial)  →  single value
```

- Returns one value (number, string, object, array — anything)
- The accumulator carries the "running total" across iterations
- If initial value is omitted, the first element is used as the initial accumulator

```javascript
const arr = [1, 2, 3, 4, 5];

const sum = arr.reduce(function(acc, curr) {
  return acc + curr;
}, 0);
console.log(sum); // 15
```

### Comparing the Three

| Method | Returns | Purpose |
|--------|---------|---------|
| `map` | New array (same length) | Transform each element |
| `filter` | New array (≤ original length) | Select elements matching a condition |
| `reduce` | Single value (any type) | Accumulate elements into one result |

### Chaining `map`, `filter`, and `reduce`

These methods can be chained together, each operating on the result of the previous:

```javascript
const users = [
  { firstName: "Akshad", lastName: "Jaiswal", age: 21 },
  { firstName: "Jarad", lastName: "Higgins", age: 22 },
  { firstName: "Arijit", lastName: "Singh", age: 33 },
  { firstName: "Tupac", lastName: "Shakur", age: 25 }
];

// Get first names of users under 30 — filter then map
const under30Names = users
  .filter(user => user.age < 30)
  .map(user => user.firstName);

console.log(under30Names); // ["Akshad", "Jarad", "Tupac"]
```

### `reduce` Can Replace Both `map` and `filter`

`reduce` is the most powerful of the three — it can implement both `map` and `filter`:

```javascript
// filter using reduce
const evens = [1,2,3,4,5,6].reduce(function(acc, curr) {
  if (curr % 2 === 0) acc.push(curr);
  return acc;
}, []);

// Get first names of users under 30 using ONLY reduce
const names = users.reduce(function(acc, curr) {
  if (curr.age < 30) acc.push(curr.firstName);
  return acc;
}, []);
```

## Code Example

```javascript
// From Lecture Code 15 - map, filter and reduce.js

const arr = [5, 1, 8, 7, 4];

// map — transform each value
function double(x) { return x * 2; }
function triple(x) { return x * 3; }
function binary(x) { return x.toString(2); }

console.log(arr.map(double));  // [10, 2, 16, 14, 8]
console.log(arr.map(triple));  // [15, 3, 24, 21, 12]
console.log(arr.map(binary));  // ['101', '1', '1000', '111', '100']

// filter — select by condition
function isOdd(x) { return x % 2 !== 0; }
function isEven(x) { return x % 2 === 0; }
function greaterThanFour(x) { return x > 4; }

console.log(arr.filter(isOdd));           // [5, 1, 7]
console.log(arr.filter(isEven));          // [8, 4]
console.log(arr.filter(greaterThanFour)); // [5, 8, 7]

// reduce — accumulate to single value
const sum = arr.reduce(function(acc, curr) {
  return acc + curr;
}, 0);
console.log(sum); // 25

const max = arr.reduce(function(acc, curr) {
  return acc < curr ? curr : acc;
}, 0);
console.log(max); // 8

// reduce with objects
const users = [
  { firstName: "Akshad", lastName: "Jaiswal", age: 21 },
  { firstName: "Jarad", lastName: "Higgins", age: 22 },
  { firstName: "Arijit", lastName: "Singh", age: 33 },
  { firstName: "Tupac", lastName: "Shakur", age: 25 }
];

// Get full names with map
const fullNames = users.map(x => x.firstName + " " + x.lastName);
console.log(fullNames);

// Count users by age with reduce
const ageCount = users.reduce(function(acc, curr) {
  acc[curr.age] = (acc[curr.age] || 0) + 1;
  return acc;
}, {});
console.log(ageCount); // { 21: 1, 22: 1, 33: 1, 25: 1 }

// Chain: filter under 30, then map to first name
const youngNames = users
  .filter(x => x.age < 30)
  .map(x => x.firstName);
console.log(youngNames); // ['Akshad', 'Jarad', 'Tupac']
```

## Interview Questions

- Q: What does `map` return?
  - A: A new array of the same length, where each element is the result of calling the provided function on the corresponding element of the original array. The original array is not modified.

- Q: What is the difference between `map` and `filter`?
  - A: `map` transforms every element and returns a same-length array. `filter` selects elements based on a condition and returns an array with only those elements (possibly shorter). `map` always returns the same number of elements; `filter` can return fewer.

- Q: What does the `reduce` accumulator do?
  - A: The accumulator carries the "running total" across iterations. Each call to the reducer receives the current accumulator value and the current element, and returns the new accumulator value. At the end, the final accumulator value is returned.

- Q: When should you use `reduce` over `map` + `filter`?
  - A: Use `reduce` when you need to produce a non-array result (sum, max, count, object grouping), or when chaining `filter` + `map` would iterate the array twice and you want a single pass for performance.

## Key Takeaways

- `map`: transform each element → new array of same length
- `filter`: keep elements matching a predicate → new array (shorter or equal)
- `reduce`: accumulate all elements → single value of any type
- All three return new values — original array is never mutated
- Chain them: `array.filter(...).map(...)` for readable multi-step transformations
- `reduce` is the most flexible — can implement `map` and `filter`, and produce objects, numbers, or arrays
- Use `map`/`filter`/`reduce` over `for` loops for cleaner, more declarative array processing
