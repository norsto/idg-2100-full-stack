/* Task 1: Globals
log executed script full name
count environment variables
log used memory in MB*/

//Log executed script full name

//Method 1:
//__filename is a built-in global variable in NodeJS that provides the absolute path of the file that is currently being executed
console.log("Current script full path: ", __filename);

//Method 2:
// Also nodeJS. Gives the full absolute path and filename of thw current module, with symlinks resolved
console.timeLog("Current script full path: ", import.meta.filename);


//Count environment variables

//Method 1: new way of doing it
//Object.keys() static method returns an array of a given object's own enumerable string-keyed property names
//process.env is a global object in NodeJS that stores environment variables. Can be accessed by any application running in that environment
//.length returns the number of elements in an array
const envCount = Object.keys(process.env).length;
console.log("Number of environment variables: ", envCount);

//Method 2: oldschool
//Starting point of environment variables is 0. Stores the count of environment variables
var envCount2 = 0;
//the for...in loop iterates over all enumerable properties (both own and inherited) of the process.env object
//the variable key represents each property name (key) in the process.env object as the loop iterates through it. Key will hold the name of each environment variable
for (let key in process.env) {
    // Checks if the current property key is an own property (i.e., directly defined on process.env) rather that being inherited from Object.prototype
    // The function hasOwnProperty() ensures that only properties directly defined in process.env are counted, excluding any properties inherited from its prototype chain
    if(process.env.hasOwnProperty(key)) {
        //if true, it increments envCount2, counting only the direct properties
        envCount2++
    } else {
        //this property was inherited, and we don't want to count it
        //If the property isn't an own property, it is skipped
    }
}
console.log("Number of environment variables: ", envCount2);


//Log used memory in MB

// this process' memory consumption
// process.memoryUsage() is a NodeJS method that returns an object with memory usage detaild of the current process
//rss represents the total memory allocated to the process
//process.memoryUsage()rss / (1024 *1024) converts memory from bytes to megabytes by dividing by 1024 * 1024 
// * 100 / 100 is a way to round the memory usage to 2 decimal places
const memoryUseInMB = (process.memoryUsage().rss / (1024 * 1024) * 100) / 100;
console.log(`Total mem used by the nodejs process: ${memoryUseInMB}MB`);