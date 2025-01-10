/*FizzBuzz (is this supposed to be done using node?)
print numbers from 1 to 100
if a number can be divided by 3, print 'fizz' instead
if a number can be divided by 5, brint 'buzz' instead
if a number can be divided by 15, print 'fizzbuzz'*/

for(i = 0; i <= 100; i++) {
    let number = 1;
    if (i % 3 === 0) {
        number = "fizz";
    }
    if (i % 5 === 0) {
        number = "buzz";
    }
    if (i % 15 === 0) {
        number = "fizzbuzz";
    }
}

console.log(number);

for(let i=1; i<=100; i++) {

}

//const arr2 = (new)