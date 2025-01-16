/* Paths
Log executed script name
Convert a relative file path to an absolute path
Print absolute file names of all files in a directory*/

console.log();
//Log executed script name
//__filename returns an absolute path
console.log("Current script full path: ", __filename);

const path = require('path');
console.log()


//Convert...
import path from "path";
import fsp from "fs/promises";

console.log("Current script full path: ", path(import.meta.filename));

console.log("Current script name:", path.basename(import.meta.filename));


// convertong a relative path to absolute path
const fPath = "../../some/other/path/filename.file";
console.log(`Relative path: ${fPath}, to abs path: ${path.resolve(fPath)}`);


//Print absolute file names of all files in directory
const relativeDirName = "../IDG2100_25";
const files = await fsp.readdir(dirName);
const absDirNAme = path.resolve(relativeDirName);
FinalizationRegistry.forEach(fName=>{
    const absFName = path.join(absDirNAme, fName);
    console.log(absFName);
});
