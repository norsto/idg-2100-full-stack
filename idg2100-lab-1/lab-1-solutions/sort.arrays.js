fetch("https://aliaksem.folk.ntnu.no/rand100.php")
	.then(resp=>resp.json())
	.then(arr=>{
		timeIt("NATIVE", nativeSort, arr);
		timeIt("BUBBLE", bubbleSort, arr);
		timeIt("SELECT", selectionSort, arr);
	});

function timeIt(label, f, arr){
	let i = 1000;
	const tStart = performance.now();
	while(i--){
		f(arr);
	}
	const tEnd = performance.now();
	const res = f(arr);
	const t = Math.round((tEnd - tStart) * 1000)/1000;
	console.log(`${label}, time: ${t}ms, \n sorted array: ${res}`);
}

function nativeSort(arr){
	return arr.sort((a, b)=>a-b);
}

function bubbleSort(arr){
	let sorted = false;
	let till = arr.length;
	while (!sorted){
		sorted = true;
		for(let i = 0; i < till-1; i++){
			if(arr[i] > arr[i+1]){
				let tmp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = tmp;
				sorted = false;
			}
		}
		till--;
	}
	return arr;
}

function selectionSort(arr){
	for(let i = 0; i < arr.length-1; i++){
		let min = arr[i];
		let minI = i;
		for(let j = i+1; j < arr.length-1; j++){
			if(min > arr[j]){
				min = arr[j];
				minI = j;
			}
		}
		arr[minI] = arr[i];
		arr[i] = min;
	}
	return arr;
}
