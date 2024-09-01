//Using promise example
// fetching GitHub profile data 
const GITHUB_API = "https://api.github.com/users/akshadjaiswal"

const user = fetch(GITHUB_API);
console.log(user)

user.then(function (data) {
    console.log(data)
})

// And this is how Promise is used.
// It guarantees that it could be resolved only once, either it could be `success` or `failure`
/**
 A Promise is in one of these states:
 pending: initial state, neither fulfilled nor rejected.
 fulfilled: meaning that the operation was completed successfully.
 rejected: meaning that the operation failed.
 */