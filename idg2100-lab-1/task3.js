/*String Reverse
get lines from https://aliaksem.folk.ntnu.no/strings2reverse.txt
reverse them (print them backwards)*/ 

/*This is a string to reverse
Ã…nother stringâ‡’with Ã±Ã–nâž³ASCII chÅªrðŒ†cters âœŒ ðŸ•  */

let string = "Ã…nother stringâ‡’with Ã±Ã–nâž³ASCII chÅªrðŒ†cters âœŒ ðŸ•";
/*split method is used to split a string into an array of substrings based on
a specified separator. this method doesn't modify the string*/
/*reverse method(?) is used to */
/*join method is used to */
const ans = string.split('').reverse().join('');

console.log(ans);

let ownString = "Hello";
const ansTwo = ownString.split('').reverse().join('');

console.log(ansTwo);



//another way (I fell off.)

fetch("https://aliaksem.folk.ntnu.no/strings2reverse.txt")
    .then(resp=>resp.text())
    .then(text=>{
        text.split("\n").forEach(s=>{
            console.log("ORIGINAL: ", s);
            timeIt("LOOP4", loop4, s);
            timeIt("SPLIT", splitReverse, s);
            //
        })

    });

function loop4(s) {
    let output = "";
    for(let i = s.length - 1; i >= 0; i--) {
        output += s[i];
    }
    return output;
}

function timeIt(label, f, s) {
    let i = 10000000;
    const tStart = performance.now();
    while(i--){
        f(s);
    }
    const tEnd = performance.now();
}