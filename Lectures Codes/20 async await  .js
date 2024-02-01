// 💡 async function always returns a promise, even if I return a simple string from below function, async keyword will wrap it under Promise and then return.
async function getData() {
  return "Namaste JavaScript";
}
const dataPromise = getData();
console.log(dataPromise); // Promise {<fulfilled>: 'Namaste JavaScript'}

//❓How to extract data from above promise? One way is using promise .then
dataPromise.then(res => console.log(res)); // Namaste JavaScript

//async function
async function getData2() {
  return promise;//if we return the promise so it will never wrap in another promise
}
const data2 = getData2()

data2.then(res => console.log(res))
promise.then(res => console.log(res))//Both are same

//Async and await is use to handle promises
const p = new Promise((resolve, reject) => {
  resolve("Second promise reolved")
})
//handling through async await
//await is a keyword than can only be used in async function
async function promisehandler() {
  const val = await p;
  console.log(val);
}
promisehandler();

//Handling nthrough normal function
// function getData3() {
//     p.then(res => (console.log(res)))
// }
// getData3();