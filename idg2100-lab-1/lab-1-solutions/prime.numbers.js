
const n = 100;
const arr = (new Array(n))
	.fill()
	.map((_, i)=>i);

// console.log(arr);

for(let i = 2; i < n; i++){
	if(arr[i] !== null){
		const checkUntil = Math.floor(n/i);
		for(let j = i; j <= checkUntil; j++){
			arr[i*j] = null;
		}
	}
}

// console.log(arr);
console.log(arr.filter(x=>x).join(", "));
