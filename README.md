
# Namaste JavaScript Notes 🎯
This is my attempt at sharing JS knowledge with everyone, even those who might not have the time to go through all the videos. Also, I will use this repo for quick reference to JS concepts when necessary. 

## 📝 Resource Used 
[Namaste 🙏 JavaScript course](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP) by [Akshay Saini](https://github.com/akshaymarch7)

# Season 01:-
# Episode 1 : Execution Context

#### Everything in JS happens inside the execution context.

Assume the execution context to be a big box where everything takes place. It has 2 components in it:

<li> <strong>Memory : </strong>The place where all the variables and functions are stored as (key: value) pairs. Memory component is also known as the <em>variable environment</em>.
<li> <strong>Code : </strong>The place where code is executed one line at a time. Code component is also known as the<em>Thread of Execution</em>

### JS is a synchronous single-threaded language.

# Episode 2 : Execution & Call Stack

When a JS program is ran, a global execution context is created.
- The execution context is created in two phases.
- Memory creation phase - JS will allocate memory to variables and functions.
- Code execution phase.

# Episode 3 : Hoisting

- <strong>Hoisting </strong> is a concept which enables us to extract values of variables and functions even before initialising/assigning value without getting error and this is happening due to the 1st phase (memory
creation phase) of the Execution Context.

# Episode 4 : Functions and Variable Environments

## Code Flow in terms of Execution Context
- The Global Execution Context (GEC) is created (the big box with Memory and Code subparts). Also GEC
is pushed into Call Stack.

# Episode 5: Shortest js program ,Window and this keyword

- The shortest JS program is empty file. Because even then, JS engine does a lot of things. As always,
even in this case, it creates the GEC which has memory space and the execution context.
- JS engine creates something known as 'window'. It is an object, which is created in the global space. It
contains lots of functions and variables. These functions and variables can be accessed from anywhere.
in the program. JS engine also creates a this keyword, which points to the window object at the global level. So, in summary, along with GEC, a global object (window) and a this variable are created.
- In different engines, the name of global object changes. Window in browsers, but in nodeJS it is called
something else. At global level, this === window.
- If we create any variable in the global scope, then the variables get attached to the global object.

# Episode 6: Undefined vs Not Defined

- In first phase (memory allocation) JS assigns each variable a placeholder called undefined.
undefined is when memory is allocated for the variable, but no value is assigned yet.
- If an object/variable is not even declared/found in memory allocation phase, and tried to access it then
it is Not defined
- Not Defined !== Undefined
### When variable is declared but not assigned value, its current value is undefined. But when the variable itself is not declared but called in code, then it is not defined.

# Episode 7 : Scope and Lexical Environment
- Scope in Javascript is directly related to Lexical Environment.
- So, Lexical Environment = local memory + lexical env of its parent. Hence, Lexical Environement isthe local memory along with the lexical environment of its parent.
- Lexical: In hierarchy, In order
- Whenever an Execution Context is created, a Lexical environment(LE) is also created and is referenced in the local Execution Context(in memory space).
- The process of going one by one to parent and checking for values is called scope chain or Lexcial environment chain.

# Episode 8 : let, const, temporal dead zone, types of errors
- let and const declarations are hoisted. But its different from var.
- Temporal Dead Zone : Time since when the let variable was hoisted until it is initialized some value.
- Reference Error are thrown when variables are in temporal dead zone.
- Syntax Error doesn't even let us run single line of code
- Let is a stricter version of var. Now, const is even more stricter than let.
- Types of Error: Syntax, Reference, and Type.
    - Uncaught ReferenceError: x is not defined at ...
        This Error signifies that x has never been in the scope of the program. This literally means that x was never defined/declared and is being tried to be accesed.
    - Uncaught ReferenceError: cannot access 'a' before initialization
        This Error signifies that 'a' cannot be accessed because it is declared as 'let' and since it is not assigned a value, it is its Temporal Dead Zone. Thus, this error occurs.
    - Uncaught SyntaxError: Identifier 'a' has already been declared
        This Error signifies that we are redeclaring a variable that is 'let' declared. No execution will take place.
    - Uncaught SyntaxError: Missing initializer in const declaration
        This Error signifies that we haven't initialized or assigned value to a const declaration.
    - Uncaught TypeError: Assignment to constant variable
        This Error signifies that we are reassigning to a const variable.
  
# Episode 9 : Block Scope and Shadowing
### What is a Block?
- Block aka compound statement is used to group JS statements together into 1 group. We group them within {...}
### What is Shadowing?
- So, If one has same named variable outside the block, the variable inside the block shadows the outside variable. This happens only for var.
### What is Illegal Shadowing?
- We cannot shadow let with var. But it is valid to shadow a let using a let. However, we can shadow var with let.
- All scope rules that work in function are same in arrow functions too.

# Episode 10 : Closures in JS
- Function bundled along with it's lexical scope is closure.
- JavaScript has a lexcial scope environment. If a function needs to access a variable, it first goes to its local memory. When it does not find it there, it goes to the memory of its lexical parent.
- A closure is a function that has access to its outer function scope even after the function has returned. Meaning, A closure can remember and access variables and arguments reference of its outer function even after the function has returned.
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

# Episode 11 : setTimeout + Closures Interview Question
- Time, tide and Javascript wait for none.

# Episode 12 : JS interview questions
- Q1: What is Closure in Javascript?
    - Ans: A function along with reference to its outer environment together forms a closure. Or in other words, A Closure is a combination of a function and its lexical scope bundled together.
- Q2: Will the below code still forms a closure?
    -  Yes, because inner function forms a closure with its outer environment so sequence doesn't matter.
- Q3: Changing var to let, will it make any difference? 
- Q4: Will inner function have the access to outer function argument?
- Q5: In below code, will inner form closure with outest?
- Q6: Output of below code and explaination?
- Q7: Advantage of Closure?
- Q8: Discuss more on Data hiding and encapsulation?
- Q9: Disadvantage of closure?
    - Overconsumption of memory when using closure as everytime as those closed over variables are not garbage collected till program expires. So when creating many closures, more memory is accumulated and this can create memory leaks if not handled. Garbage collector : Program in JS engine or browser that frees up unused memory. In highlevel languageslike C++ or JAVA, garbage collection is left to the programmer, but in JS engine its done implicitly.
 
# Episode 13 : First class and Anonymous functions
### Functions are heart ♥ of Javascript.
- Q: What is Function statement?
- Q: What is Function Expression?
- Q: Difference between function statement and expression
    - The major difference between these two lies in Hoisting.
- Q: What is Function Declaration?
    - Other name for function statement.
- Q: What is Anonymous Function?
    - A function without a name.
- Q: What is Named Function Expression?
    - Same as Function Expression but function has a name instead of being anonymous
- Q: Parameters vs Arguments?
- Q: What is First Class Function aka First Class Citizens?
    - We can pass functions inside a function as arguments and /or return a function(HOF). These ability are altogether known as First class function. It is programming concept available in some other languages too.
      
# Episode 14 : Callbacks and Event Listeners
- Callback Functions
    - Functions are first class citizens ie. take a function A and pass it to another function B. Here, A is a callback function. So basically I am giving access to function B to call function A. This callback function gives us the access to whole Asynchronous world in Synchronous world.
    - JS is a synchronous and single threaded language. But due to callbacks, we can do async things in JS.
- Event Listener
- Garbage Collection and removeEventListeners
    - Event listeners are heavy as they form closures. So even when call stack is empty, EventListener won't free up memory allocated to count as it doesn't know when it may need count again. So we remove event listeners when we don't need them (garbage collected) onClick, onHover, onScroll all in a page can slow it down heavily.
 


# Episode 15 : Asynchronous JS and Event Loops
### Note: Call stack will execeute any execeution context which enters it. Time, tide and JS waits for none.
TLDR; Call stack has no timer.
- Browser has JS Engine which has Call Stack which has Global execution context, local execution context etc.
- But browser has many other superpowers - Local storage space, Timer, place to enter URL, Bluetooth access, Geolocation access and so on.
- Now JS needs some way to connect the callstack with all these superpowers. This is done using Web APIs
- WebAPIs
    - None of the below are part of Javascript! These are extra superpowers that browser has. Browser gives access to JS callstack to use these powers.
- setTimeout(), DOM APIs, fetch(), localstorage, console (yes, even console.log is not JS!!), location and so many more.
      - setTimeout() : Timer function
      - DOM APIs : eg.Document.xxxx ; Used to access HTML DOM tree. (Document Object Manipulation)
      - fetch() : Used to make connection with external servers eg. Netflix servers etc.
- We get all these inside call stack through global object ie. window
    - Use window keyword like : window.setTimeout(), window.localstorage, window.console.log() to log something inside console.
    - As window is global obj, and all the above functions are present in global object, we don't explicity write window but it is implied.
- Q: Need of callback queue?
    - Ans: Suppose user clciks button x6 times. So 6 cb() are put inside callback queue. Event loop sees if call stack is empty/has space and whether callback queue is not empty(6 elements here). Elements of callback queue popped off, put in callstack, executed and then popped off from call stack.
- What enters the Microtask Queue ?
    - All the callback functions that come through promises go in microtask Queue.
    - Mutation Observer : Keeps on checking whether there is mutation in DOM tree or not, and if there, then it execeutes some callback function.
    - Callback functions that come through promises and mutation observer go inside Microtask Queue.
    - All the rest goes inside Callback Queue aka. Task Queue.
    - If the task in microtask Queue keeps creating new tasks in the queue, element in callback queue never gets chance to be run. This is called starvation.
## Some Important Questions
- 1 When does the event loop actually start ?
     - Event loop, as the name suggests, is a single-thread, loop that is almost infinite. It's always running and doing its job.
- 2 Are only asynchronous web api callbacks are registered in web api environment?
      - YES, the synchronous callback functions like what we pass inside map, filter and reduce aren't registered in the Web API environment. It's just those async callback functions which go through all this.
- 3 Does the web API environment stores only the callback function and pushes the same callback to queue/microtask queue?
    - Yes, the callback functions are stored, and a reference is scheduled in the queues. Moreover, in the case of event listeners(for example click handlers), the original callbacks stay in the web API environment forever, that's why it's adviced to explicitly remove the listeners when not in use so that the garbage collector does its job.
- 4 How does it matter if we delay for setTimeout would be 0ms. Then callback will move to queue without any wait ?
     - No, there are trust issues with setTimeout() 😅. The callback function needs to wait until the Call Stack is empty. So the 0 ms callback might have to wait for 100ms also if the stack is busy.
       
# Episode 16 : JS Engine Exposed Google's V8 architecture

#### JS runs literally everywhere from smart watch to robots to browsers because of Javascript Runtime Environment (JRE)

- JRE consists of a JS Engine (❤️ of JRE), set of APIs to connect with outside environment, event loop, Callback queue, Microtask queue etc.
- JRE is a container that can run JS code.

- ECMAScript is a governing body of JS. It has set of rules followed by all JS engines like Chakra(Edge), Spidermonkey(Firefox), v8(Chrome)
- JS Engine is **not a machine**. Its software written in low level languages (eg. C++) that takes in hi-level code in JS and spits out low level machine
  code

In all languages, code is compiled either with **interpreter** or with **compiler**. JS used to have only interpreter in old times, but now has **both**
to compile JS code.

Interpreter : Takes code and executes line by line. Has no idea what will happen in next line. Very fast.
Compiler : Code is compiled and an optimized version of same code is formed, and then executed. More efficient

- Code inside JSE passes through 3 steps : **Parsing, Compilation and Execution**

1. **Parsing** - Code is broken down into tokens. In "let a = 7" -> let, a, =, 7 are all tokens. Also we have a **syntax parser** that takes code and converts it
   into an **AST (Abstract Syntax Tree)** which is a JSON with all key values like type, start, end, body etc (looks like package.json but for a line of code in JS. Kinda
   unimportant)(Check out astexplorer.net -> converts line of code into AST)

2. **Compilation** - JS has something called **Just-in-time(JIT) Compilation - uses both interpreter & compiler**. Also compilation and execution both go hand in hand.
   The AST from previous step goes to interpreter which converts hi-level code to byte code and moves to execeution. While interpreting, compiler also works hand in hand
   to compile and form optimized code during runtime.

3. **Execution** - Needs 2 components ie. Memory heap(place where all memory is stored) and Call Stack(same call stack from prev episodes). There is also a _garbage collector._
   It uses an algo called **Mark and Sweep**.

Companies use different JS engines and each try to make theirs the best.

- v8 of Google has Interpreter called _Ignition_, a compiler called _Turbo Fan_ and garbage collector called _Orinoco_

# Episode 17 : Trust issues with settimeout()

### The First rule of JavaScript: Do not block the main thread (as JS is a single threaded(only 1 callstack language).
- In code example, we are blocking the main thread. Observe Question and Output.
- setTimeout guarantees that it will take at least the given timer to execute the code.
- JS is a synchronous single threaded language. With just 1 thread it runs all pieces of code. It becomes
kind of an interpreter language, and runs code very fast inside browser (no need to wait for code to be
compiled) (JIT - Just in time compilation). And there are still ways to do async operations as well.

# Episode 18 : High order function ft. Functional Programming
#### Q: What is Higher Order Function?
- Ans: A Higher-order functions are regular functions that take other functions as arguments or return functions as their results.
- More explanations in the code file with examples and demonstration.

# Episode 19 : map, filter and reduce
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
