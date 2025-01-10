/*Prime numbers 
print all the prime numbers between 1 and 100*/

//looping form 1 to 100
for (let i = 1; i <=100; i++) {
    let flag = 0;

    //looping through 2 to user input number
    for (let j = 2; j < i; j++) {
        if (i % j == 0) {
            flag = 1;
            break;
        }
    }

    //if number greater than 1 and not divisible by other numbers
    if (i > 1 && flag == 0) {
        console.log(i);
    }
}

//this one works??

//another way:

const n = 100;
const arr = (new Array(n))
    .fill()
    .map((_, i)=>i);

//console.log(arr); How do I make this show up on the terminal

for(let i = 2; i < n; i++) {
    if(arr[i] !== null){
        const checkUntil = Math.floor(n/i);
        for(let j = i; j <= checkUntil; j++) {
            arr[i*j] = null;
        }
    }
}