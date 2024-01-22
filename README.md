# Namaste JavaScript Notes 🎯
This is my attempt at sharing JS knowledge with everyone, even those who might not have the time to go through all the videos. Also, I will use this repo for quick reference to JS concepts when necessary. 

## 📝 Resource Used 
[Namaste 🙏 JavaScript course](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP) by [Akshay Saini](https://github.com/akshaymarch7)

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

# Episode 4 : Functions and Variable Environments

# Episode 5: Window and this keyword

# Episode 6: Undefined vs Not Defined

# Episode 7 : Scope and Lexical Environment

# Episode 8 : let, const, temporal dead zone, types of errors

# Episode 9 : Block Scope and Shadowing

# Episode 10 : Closures in JS

# Episode 11 : setTimeout + Closures Interview Question

# Episode 12 : JS interview questions

# Episode 13 : First class and Anonymous functions

# Episode 14 : Callbacks and Event Listeners

# Episode 15 : Asynchronous JS and Event Loops

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

# Episode 18 : Trust issues with settimeout() 


