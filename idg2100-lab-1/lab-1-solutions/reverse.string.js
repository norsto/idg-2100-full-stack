fetch("https://aliaksem.folk.ntnu.no/strings2reverse.txt")
	.then(resp=>resp.text())
	.then(text=>{
		text.split("\n").forEach(s=>{
			console.log("ORIGINAL: ", s);
			timeIt("LOOP4", loop4, s);
			timeIt("SPLIT", splitReverse, s);
			timeIt("ARRAY.FROM", arrayBasedReverse, s);
		});
	});

function loop4(s){
	let output = "";
	for(let i = s.length - 1; i >= 0; i--){
		output += s[i];
	}
	return output;
}

function splitReverse(s){
	return s.split("").reverse().join("");
}

function arrayBasedReverse(s){
	return Array.from(s).reverse().join("");
}

function timeIt(label, f, s){
	let i = 1000000;
	const tStart = performance.now();
	while(i--){
		f(s);
	}
	const tEnd = performance.now();
	const res = f(s);
	const t = Math.round( (tEnd - tStart) * 100 ) / 100;
	console.log(`${label}, time: ${t}ms, result: ${res}`);
}

