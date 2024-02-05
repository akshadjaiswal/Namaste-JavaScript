//Real world example of async await by fetch call  by user URL api of github
//"https://api.github.com/users/akshadjaiswal"
const API_URL = "https://api.github.com/users/akshadjaiswal"
// const API_URL = "https://ivalid url"

async function promiseHandler() {
    try { //Error Handling
        const data = await fetch(API_URL);
        const jsonValue = await data.json();
        console.log(jsonValue)
    }
    catch (err) {
        console.log(err);
    }
    //fetch(API_URL)=Response.json()=>jsonvalue
}
promiseHandler();

//Other way to handle the error
async function promiseHandler2() {

    const data = await fetch(API_URL);
    const jsonValue = await data.json();
    console.log(jsonValue)

    //fetch(API_URL)=Response.json()=>jsonvalue
}
promiseHandler2().catch((err) => console.log(err));