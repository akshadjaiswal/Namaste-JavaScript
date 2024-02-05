//Real world example of async await by fetch call  by user URL api of github
//"https://api.github.com/users/akshadjaiswal"
const API_URL = "https://api.github.com/users/akshadjaiswal"

async function promiseHandler() {
    const data = await fetch(API_URL);
    const jsonValue = await data.json();
    console.log(jsonValue)

    //fetch(API_URL)=Response.json()=>jsonvalue
}
promiseHandler();