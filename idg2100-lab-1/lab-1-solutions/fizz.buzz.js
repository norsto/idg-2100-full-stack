//makes an epmty(?) array
const arr = [];

//for i is 1, and as long i is = or less than 100, add one per iteration of the for loop
for(let i=1; i<=100; i++) {
	//if i can be divided by 15 --
	if(!(i % 15)) {
		//-- push Fizzbuzz into the array
		arr.push("FizzBuzz");
	//else if i can be divided by 5 --
	} else if(!(i % 5)) {
		// -- push buzz into the array
		arr.push("Buzz");
	//else if i can be divided by 3 --
	} else if(!(i % 3)) {
		//-- push fizz into the array
		arr.push("Fizz");
	//else non of the above --
	} else {
		//-- push the number into the array
		arr.push(i);
	}
}
// puts a , in between each array element
console.log(arr.join(", "));

// does the same, but doesn't take up as many lines
const arr2 = (new Array(100))
	.fill()
	.map((_, i)=> {
		const res = (!(++i%3)?"Fizz":"") + (!(i%5)?"Buzz":"");
		return res || i;
	}).join(", ");

console.log(arr2);