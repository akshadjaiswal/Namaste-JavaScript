# Namaste JavaScript Notes (Theory + Code)🎯

This repository is my attempt at sharing JavaScript knowledge with everyone, even those who might not have the time to go through all the videos. I also use this repo for quick reference to JavaScript concepts when necessary. 

## ❓ What it is

> This repo maintains my version of JavaScript notes which I learned from the famous [Namaste JavaScript YouTube Series](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP) by Akshay Saini.

## 📝 Resource Used 

- [Namaste 🙏 JavaScript course](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP) by [Akshay Saini](https://github.com/akshaymarch7)

### [More Learning Resources](#more-learning-resources)

- [React](https://github.com/akshadjaiswal/React)
- [NodeJs](https://github.com/akshadjaiswal/Namaste-Nodejs)

---

# Season 01

## Episode 1: Execution Context

#### Everything in JS happens inside the execution context.

Assume the execution context to be a big box where everything takes place. It has 2 components in it:
- **Memory:** The place where all the variables and functions are stored as (key: value) pairs. Memory component is also known as the _variable environment_.
- **Code:** The place where code is executed one line at a time. Code component is also known as the _Thread of Execution_.

### JS is a synchronous single-threaded language.

## Episode 2: Execution & Call Stack

When a JS program runs, a global execution context is created.
- The execution context is created in two phases.
  - Memory creation phase - JS will allocate memory to variables and functions.
  - Code execution phase.

## Episode 3: [Hoisting](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/01.%20Hoisting%20in%20Javascript.js)

- **Hoisting** is a concept which enables us to extract values of variables and functions even before initializing/assigning value without getting an error. This happens due to the 1st phase (memory creation phase) of the Execution Context.

## Episode 4: [Functions and Variable Environments](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/02.%20Function%20in%20Javascript.js)

### Code Flow in terms of Execution Context

- The Global Execution Context (GEC) is created (the big box with Memory and Code subparts). Also, GEC is pushed into the Call Stack.

## Episode 5: Shortest JS Program, Window, and `this` keyword

- The shortest JS program is an empty file because even then, the JS engine does a lot of things. As always, even in this case, it creates the GEC (Global Execution Context) which has memory space and the execution context.
- The JS engine creates something known as 'window'. It is an object created in the global space.
- The JS engine also creates a `this` keyword, which points to the window object at the global level. At the global level, this === window.
- If we create any variable in the global scope, then the variables get attached to the global object.

## Episode 6: [Undefined vs Not Defined](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/03.%20Defined%20and%20undefined.js)

- In the first phase (memory allocation), JS assigns each variable a placeholder called `undefined`.
- `undefined` is when memory is allocated for the variable, but no value is assigned yet.
- If an object/variable is not even declared/found in the memory allocation phase, and tried to access it then it is `Not defined`.
- `Not Defined` !== `Undefined`

### When a variable is declared but not assigned value, its current value is `undefined`. But when the variable itself is not declared but called in code, then it is `not defined`.

## Episode 7: [Scope and Lexical Environment](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/04%20Scope%20and%20Lexical%20Enviroment.js)

- Scope in JavaScript is directly related to Lexical Environment.
- Lexical Environment = local memory + lexical env of its parent.
- Whenever an Execution Context is created, a Lexical environment (LE) is also created and is referenced in the local Execution Context (in memory space).
- The process of going one by one to the parent and checking for values is called scope chain or Lexical environment chain.

## Episode 8: [let, const, temporal dead zone, types of errors](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/05%20Let%20and%20Const.js)

- `let` and `const` declarations are hoisted but differently from `var`.
- Temporal Dead Zone: Time since when the `let` variable was hoisted until it is initialized with some value.
- Reference Error is thrown when variables are in the temporal dead zone.
- Syntax Error doesn't even let us run a single line of code.
- `let` is a stricter version of `var`. `const` is even stricter than `let`.
- Types of Error: Syntax, Reference, and Type.
  - Uncaught ReferenceError: x is not defined at ...
  - Uncaught ReferenceError: cannot access 'a' before initialization
  - Uncaught SyntaxError: Identifier 'a' has already been declared
  - Uncaught SyntaxError: Missing initializer in const declaration
  - Uncaught TypeError: Assignment to constant variable

## Episode 9: [Block Scope and Shadowing](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/06%20Block%20Scope%20and%20Shadowing%20in%20Javascript.js)

### What is a Block?

- Block aka compound statement is used to group JS statements together into one group. We group them within `{...}`

### What is Shadowing?

- If one has the same named variable outside the block, the variable inside the block shadows the outside variable. This happens only for `var`.

### What is Illegal Shadowing?

- We cannot shadow `let` with `var`. But it is valid to shadow a `let` using a `let`. However, we can shadow `var` with `let`.
- All scope rules that work in function are the same in arrow functions too.

## Episode 10: [Closures in JS](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/07%20Closures%20in%20Javascript.js)

- Function bundled along with its lexical scope is a closure.
- JavaScript has a lexical scope environment. If a function needs to access a variable, it first goes to its local memory. When it does not find it there, it goes to the memory of its lexical parent.
- A closure is a function that has access to its outer function scope even after the function has returned.
- Advantages of Closure:
  - Module Design Pattern
  - Currying
  - Memoize
  - Data hiding and encapsulation
  - setTimeouts etc.
- Disadvantages of Closure:
  - Over consumption of memory
  - Memory Leak
  - Freeze browser

## Episode 11: [setTimeout + Closures Interview Question](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/08%20Set-Timeout%20%2B%20Closures%20interview%20questions.js)

- Time, tide, and JavaScript wait for none.

## Episode 12: [JS interview questions](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/09%20Crazy%20JS%20interview%20on%20Closures%20.js)

- Q1: What is Closure in Javascript?
  - Ans: A function along with a reference to its outer environment together forms a closure.
- Q2: Will the below code still form a closure?
  - Yes, because the inner function forms a closure with its outer environment so sequence doesn't matter.
- Q3: Changing `var` to `let`, will it make any difference?
- Q4: Will the inner function have access to the outer function argument?
- Q5: In the below code, will the inner form closure with the outest?
- Q6: Output of the below code and explanation?
- Q7: Advantage of Closure?
- Q8: Discuss more on Data hiding and encapsulation?
- Q9: Disadvantage of closure?
  - Overconsumption of memory when using closure as those closed-over variables are not garbage collected till the program expires. So when creating many closures, more memory is accumulated and this can create memory leaks if not handled.

## Episode 13: [First class and Anonymous functions](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/10%20First%20Class%20Functions%20.js)

### Functions are the heart ♥ of JavaScript.

- Q: What is Function statement?
- Q: What is Function Expression?
- Q: Difference between function statement and expression
  - The major difference between these two lies in Hoisting.
- Q: What is Function Declaration?
  - Another name for a function statement.
- Q: What is Anonymous Function?
  - A function without a name.
- Q: What is Named Function Expression?
  - Same as Function Expression but the function has a name instead of being anonymous
- Q: Parameters vs Arguments?
- Q: What is First Class Function aka First Class Citizens?
  - We can pass functions inside a function as arguments and/or return a function (HOF). These abilities are altogether known as First class function.

## Episode 14: [Callbacks and Event Listeners](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/11%20Callback%20Fucntion%20in%20javaScript%20.js)

### Callback Functions

- Functions are first-class citizens i.e., take a function A and pass it to another function B. Here, A is a callback function. This callback function gives us access to the whole Asynchronous world in the Synchronous world.
- JS is a synchronous and single-threaded language. But due to callbacks, we can do async things in JS.

### Event Listener

### Garbage Collection and removeEventListeners

- Event listeners are heavy as they form closures. So even when the call stack is empty, EventListener won't free up memory allocated to count as it doesn't know when it may need count again. So we remove event listeners when we don't need them (garbage collected) onClick, onHover, onScroll all in a page can slow it down heavily.

## Episode 15: [Asynchronous JS and Event Loops](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/12%20Asynchronous%20Javascript%20and%20Event%20loops%20.js)

### Note: Call stack will execute any execution context which enters it. Time, tide, and JS wait for none.

- Browser has a JS Engine which has Call Stack which has Global execution context, local execution context etc.
- But the browser has many other superpowers - Local storage space, Timer, place to enter URL, Bluetooth access, Geolocation access, and so on.
- Now JS needs some way to connect the call stack with all these superpowers. This is done using Web APIs

### WebAPIs

- None of the below are part of Javascript! These are extra superpowers that the browser has. Browser gives access to JS callstack to use these powers.
  - setTimeout(), DOM APIs, fetch(), localstorage, console (yes, even console.log is not JS!!), location and so many more.
  - setTimeout(): Timer function
  - DOM APIs: eg. `Document.xxx` ; Used to access HTML DOM tree. (Document Object Manipulation)
  - fetch(): Used to make connection with external servers eg. Netflix servers etc.
- We get all these inside call stack through the global object ie. `window`
  - Use the window keyword like: `window.setTimeout()`, `window.localstorage`, `window.console.log()` to log something inside the console.
  - As `window` is a global obj, and all the above functions are present in the global object, we don't explicitly write `window` but it is implied.

### Need of callback queue?

- Suppose a user clicks the button 6 times. So 6 cb() are put inside the callback queue. The event loop sees if the call stack is empty/has space and whether the callback queue is not empty(6 elements here). Elements of the callback queue popped off, put in call stack, executed, and then popped off from the call stack.

### What enters the Microtask Queue?

- All the callback functions that come through promises go in the microtask Queue.
- Mutation Observer: Keeps on checking whether there is a mutation in the DOM tree or not, and if there, then it executes some callback function.
- Callback functions that come through promises and mutation observer go inside Microtask Queue.
- All the rest goes inside Callback Queue aka. Task Queue.
- If the task in the microtask Queue keeps creating new tasks in the queue, the element in the callback queue never gets a chance to run. This is called starvation.

### Some Important Questions

- **When does the event loop actually start?**
  - Event loop, as the name suggests, is a single-thread, loop that is almost infinite. It's always running and doing its job.
- **Are only asynchronous web API callbacks are registered in the web API environment?**
  - YES, the synchronous callback functions like what we pass inside map, filter, and reduce aren't registered in the Web API environment. It's just those async callback functions which go through all this.
- **Does the web API environment store only the callback function and push the same callback to the queue/microtask queue?**
  - Yes, the callback functions are stored, and a reference is scheduled in the queues. Moreover, in the case of event listeners(for example click handlers), the original callbacks stay in the web API environment forever, that's why it's advised to explicitly remove the listeners when not in use so that the garbage collector does its job.
- **How does it matter if we delay for setTimeout would be 0ms. Then the callback will move to queue without any wait?**
  - No, there are trust issues with setTimeout(). The callback function needs to wait until the Call Stack is empty. So the 0 ms callback might have to wait for 100ms also if the stack is busy.

## Episode 16: JS Engine Exposed Google's V8 architecture

### JS runs literally everywhere from smartwatches to robots to browsers because of the JavaScript Runtime Environment (JRE)

- JRE consists of a JS Engine (heart of JRE), a set of APIs to connect with the outside environment, event loop, Callback queue, Microtask queue etc.
- JRE is a container that can run JS code.
- ECMAScript is a governing body of JS. It has a set of rules followed by all JS engines like Chakra(Edge), Spidermonkey(Firefox), v8(Chrome)
- JS Engine is **not a machine**. It's software written in low-level languages (eg. C++) that takes in high-level code in JS and spits out low-level machine code.

### In all languages, code is compiled either with an **interpreter** or with a **compiler**. JS used to have only an interpreter in old times, but now has **both** to compile JS code.

- Interpreter: Takes code and executes line by line. Has no idea what will happen in the next line. Very fast.
- Compiler: Code is compiled and an optimized version of the same code is formed, and then executed. More efficient.

### Code inside JSE passes through 3 steps: **Parsing, Compilation, and Execution**

1. **Parsing**: Code is broken down into tokens. In `let a = 7` -> `let`, `a`, `=`, `7` are all tokens. Also, we have a **syntax parser** that takes code and converts it into an **AST (Abstract Syntax Tree)** which is a JSON with all key values like type, start, end, body etc.
2. **Compilation**: JS has something called **Just-in-time(JIT) Compilation - uses both interpreter & compiler**. Also, compilation and execution both go hand in hand. The AST from the previous step goes to the interpreter which converts high-level code to byte code and moves to execution. While interpreting, the compiler also works hand in hand to compile and form optimized code during runtime.
3. **Execution**: Needs 2 components ie. Memory heap(place where all memory is stored) and Call Stack(same call stack from previous episodes). There is also a _garbage collector._ It uses an algorithm called **Mark and Sweep**.

Companies use different JS engines and each tries to make theirs the best.

- v8 of Google has an Interpreter called _Ignition_, a compiler called _Turbo Fan_, and a garbage collector called _Orinoco_.

## Episode 17: [Trust issues with setTimeout()](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/13%20Trust%20issues%20with%20settimeout().js)

### The First rule of JavaScript: Do not block the main thread (as JS is a single-threaded (only 1 call stack language)).

- In the code example, we are blocking the main thread. Observe the Question and Output.
- setTimeout guarantees that it will take at least the given timer to execute the code.
- JS is a synchronous single-threaded language. With just 1 thread it runs all pieces of code. It becomes kind of an interpreter language and runs code very fast inside the browser (no need to wait for code to be compiled) (JIT - Just in time compilation). And there are still ways to do async operations as well.

## Episode 18: [Higher Order Functions ft. Functional Programming](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/14%20Functional%20Programming%20.js)

### Q: What is a Higher Order Function?

- Ans: Higher-order functions are regular functions that take other functions as arguments or return functions as their results.

### More explanations in the code file with examples and demonstration.

## Episode 19: [map, filter, and reduce](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main
### map, filter & reducer are Higher Order Functions.
- Map function
    - It is basically used to transform a array. The map() method creates a new array with the results of calling afunction for every array element.
    - So basically map function maps each and every value and transforming it based on given condition.
- Filter function
    - Filter function is basically used to filter the value inside an array. The arr.filter() method is used to create a new array from a given array consisting of only those elements from the given array which satisfy a condition set by the argument method.
    - Filter function creates an array and store only those values which evaluates to true.
- Reduce function
    - It is a function which take all the values of array and gives a single output of it. It reduces the array to give a single output.
      
# Season 02:-
# Episode 01 : [Callback Hell.](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/16%20callback%20Hell%20.js)
## There are 2 Parts of Callback:
### 1. Good Part of callback
- Callback are super important while writing asynchronous code in JS.
### 2. Bad Part of Callback
- Using callback we can face issue:
- 1 Callback hell
    - When a function is passed as an argument to another function, it becomes a callback function. This process continues and there are many callbacks inside another's Callback function.
    - This grows the code horizontally instead of vertically. That mechanism is known as callback hell. 

- 2 Inversion of control
    - The callback function is passed to another callback, this way we lose the control of our code. We don't know what is happening behind the scene and the program becomes very difficult to maintain. That process is called inversion of control.

# Episode 02 : [Promises.](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/17%20Promises%20.js)
### Promises are used to handle async operations in JavaScript.
### We will discuss with code example that how things used to work before Promises and then how it works after Promises
Interview Guide
- What is Promise?
    - Promise object is a placeholder for certain period of time until we receive value from asynchronous operation.
    - A container for a future value.
    - A Promise is an object representing the eventual completion or failure of an asynchronous operation.
- We are now done solving one issue of callback i.e. Inversion of Control

# Episode 03 : [Creating promise, Chainning and Error Handling](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/17%20Promises%20.js)

> Promises are used to handle async operations in JavaScript.
- Now, Let's understand the concept of Promise Chaining
    - for this we will assume after createOrder we have to invoke proceedToPayment
    - In promise chaining, whatever is returned from first .then become data for next .then and so on...
    - At any point of promise chaining, if promise is rejected, the execution will fallback to .catch and others promise won't run.
- Q: What if we want to continue execution even if any of my promise is failing, how to achieve this?
    - By placing the .catch block at some level after which we are not concerned with failure.
    - There could be multiple .catch too.

# Episode 04 - [async await](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/20%20async%20await%20%20.js)
- Topics Covered
    - What is async?
    - What is await?
    - How async await works behind the scenes?
    - Example of using async/await
    - Error Handling
    - Interviews
    - Async await vs Promise.then/.catch
- Q: What is async?
  - A: Async is a keyword that is used before a function to create a async function.
- Q: Question is Is program actually waiting or what is happening behind the scene?
  - A: As we know, Time, Tide and JS wait for none. And it's true. Over here it appears that JS engine is waiting but JS engine is not waiting over here. It has not occupied the call stack if that would have been the case our page may have got frozen. So JS engine is not waiting. So if it is not waiting then what it is doing behind the scene? Let's understand with attached [code](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/20%20async%20await%20%20.js)
- Error Handling
  - While we were using normal Promise we were using .catch to handle error, now in async-await we would be using try-catch block to handle error.
- Async await vs Promise.then/.catch
  - What one should use? async-await is just a syntactic sugar around promise. Behind the scene async-await is just promise. So both are same, it's just async-await is new way of writing code. async-await solves few of the short-coming of Promise like Promise Chaining. async-await also increases the readability. So sort of it is always advisable to use async-await.
- Fetch Call and Error handling
  - [Example of using of fetch api call using async await and error handling](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/21%20async%20await%20example%20using%20fetch.js).

# Episode 04 : [Promise APIs + Interview Questions]()
- Questions here soon 🔜

# Episdoe 05 - [this keyword in Javascript](https://github.com/akshadjaiswal/Namaste-JavaScript/blob/main/Lectures%20Codes/23%20this%20keyword%20in%20javascript.js)

- JavaScript's "this" keyword can be confusing for many and behaves differently in various scenarios.

- In JavaScript, this keyword refers to the current context or scope within which code is executing. Its value is determined by how a function is called, and it can dynamically change depending on the invocation context.

-  In the global space, the value of "this" is the global object, which can vary depending on the JavaScript runtime environment (e.g., window in browsers, Global in Node.js).

- Inside a function, the value of "this" can be undefined in strict mode or the global object in non-strict mode.

-  JavaScript uses a mechanism called "this substitution," where "this" is replaced with the global object when it's undefined or null in non-strict mode.

- Inside an object's method, "this" refers to the object itself where the method is called.

- "call," "apply," and "bind" are important functions used to manipulate the value of "this" when calling methods and sharing them between objects.

- It's essential to understand "call," "apply," and "bind" to effectively control the value of "this" in JavaScript methods.

- In global space, the 'this' keyword refers to the global object (e.g., 'window' in the browser).

- In strict mode, 'this' inside a function is undefined; in non-strict mode, it refers to the global object.

- Understanding "this" substitution: When 'this' is undefined or null inside a function, it becomes the global object.

- Inside an object's method, 'this' refers to the object itself.

- The 'call' method can be used to invoke a function with a specific 'this' context.

- Arrow functions do not have their own 'this' binding and take the value of the enclosing lexical context.

- In the context of DOM elements, 'this' refers to the specific HTML element being

## More Learning Resources

Explore my additional repositories to deepen your understanding of related topics in the JavaScript ecosystem:

- [Namaste NodeJS](https://github.com/akshadjaiswal/Namaste-Nodejs): A repository focused on learning Node.js concepts, from basics to advanced server-side programming.
- [Namaste React](https://github.com/akshadjaiswal/Namaste-React): A repository dedicated to mastering React.js, covering foundational and advanced aspects of building interactive UIs.
---
## 🤝 Contribution Guidelines

- Please create an issue with your suggestion. 
- If you have notes of your own, and are interested in contributing to this repo, hit a PR ! I'll review it and add it immediately 🤓.

## ✨ Show your support

Give a ⭐️ if this project helped you and try to contribute and share with people's
Happy learning and coding!

## 🔗 Let's Connect:-

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akshadsantoshjaiswal)
[![twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/akshad_999)
