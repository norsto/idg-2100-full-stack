/* Sorting
get array from https://aliaksem.folk.ntnu.no/rand100.php
sort it 
    array.sort
    bubble sort
    selection sort */

//bubble sorting array

function bubbleSort(arr) {

    for(var i = 0; i < arr.length; i++) {

        for (var j = 0; j < (arr.length - i -1); j++) {
            if (arr[j] > arr[j + 1]) {

                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    
    console.log(arr);
}

var arr = [344,919,430,988,759,90,215,747,622,326,231,762,450,478,5,761,319,310,847,63,395,376,314,44,229,399,40,758,742,93,160,231,379,944,479,56,311,3,913,429,468,221,551,830,577,403,529,63,486,721,976,839,52,560,234,343,964,978,624,271,892,72,21,499,290,353,416,495,258,674,110,748,538,696,103,884,401,585,405,482,266,931,574,423,838,383,541,377,871,126,363,526,450,422,10,553,932,132,882,602];


//another way

fetch("https://aliaksem.folk.ntnu.no/rand100.php")
    .then(resp=>resp.json())
    .then(arr=>{
        timeIt("NATIVE", nativeSort, arr);
        timeIt("BUBBLE", bubbleSortNew, arr);
    });

function timeIt(label, f, arr) {
    let i = 1000;
    const tStart = performance.now();
    while(i--){
        f(arr);
    }
    const tEnd = performance.now();
    const res = f(arr);
    const t = Math.round((tEnd - tStart) * 1000)/1000;
    console.log
}

function nativeSort(arr){
    return arr.sort((a, b)=>a-b);
}

function bubbleSortNew(arr){
    let sorted = false;
    let till = arr.length;
    while (!sorted) {
        sorted = true;
        for(let i = 0; i < till-1; i++){
            if(arr[i] > arr[1+1]){
                let tmp = arr [i];
                arr[i]
                
            }
        }
    }
}