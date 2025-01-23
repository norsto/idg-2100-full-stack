/* Globals */

//Log executed script full name

//Method 1:
console.log("Current script full path: ", __filename);

//Method 2:
console.timeLog("Current script full path: ", import.meta.filename);


//Count environment variables

//Method 1: new way of doing it
const envCount = Object.keys(process.env).length;
console.log("Number of environment variables: ", envCount);

//Method 2: oldschool
var envCount2 = 0;

for (let key in process.env) {
    if(process.env.hasOwnProperty(key)) {
        envCount2++
    } else {
        //this property was inherited, and we don't want to count it
    }
}
console.log("Number of environment variables: ", envCount2);


//Log used memory in MB

const memoryUseInMB = (process.memoryUsage().rss / (1024 * 1024) * 100) / 100;
console.log(`Total mem used by the nodejs process: ${memoryUseInMB}MB`);