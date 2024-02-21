const test = {
  prop: 42,
  func: function () {
    return this.prop;
  },
};

console.log(test.func());
// Expected output: 42

const person = {
 name: "Akshad",
 age: 22,
greet: function(){

        return `Hello ${this.name}, you are ${this.age} years old`

    }
}
console.log(person.greet());

