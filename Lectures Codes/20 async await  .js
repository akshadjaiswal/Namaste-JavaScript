// 💡 async function always returns a promise, even if I return a simple string from below function, async keyword will wrap it under Promise and then return.
async function getData() {
    return "Namaste JavaScript";
  }
  const dataPromise = getData();
  console.log(dataPromise); // Promise {<fulfilled>: 'Namaste JavaScript'}
  
  //❓How to extract data from above promise? One way is using promise .then
  dataPromise.then(res => console.log(res)); // Namaste JavaScript