// 💡 async function always returns a promise, even if I return a simple string from below function, async keyword will wrap it under Promise and then return.
async function getData() {
  return "Namaste JavaScript";
}
const dataPromise = getData();
console.log(dataPromise); // Promise {<fulfilled>: 'Namaste JavaScript'}

//❓How to extract data from above promise? One way is using promise .then
dataPromise.then(res => console.log(res)); // Namaste JavaScript

//Creating a promise
const promise = new Promise((res, rej) => {
  res("Promise Resolved")
})
//async function
async function getData2() {
  return promise;//if we return the promise so it will never wrap in another promise
}
const data2 = getData2()

data2.then(res => console.log(res))
promise.then(res => console.log(res))//Both are same

//Async and await is use to handle promises
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Second promise reolved")
  }, 10000)
})
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Second promise reolved")
  }, 5000)
})
//handling through async await
//await is a keyword than can only be used in async function
async function promisehandler() {

  console.log("Hello Akshad")
  //JS engine is waiting for promisento get resolve
  const val = await p;
  console.log("Namaste Akshad")
  console.log(val);

  const val1 = await p1;
  console.log("Namaste Akshad 2")
  console.log(val1);
}
promisehandler();

//Handling nthrough normal function
// function getData3() {
//     p.then(res => (console.log(res)))
// }
// getData3();