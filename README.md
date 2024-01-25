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

