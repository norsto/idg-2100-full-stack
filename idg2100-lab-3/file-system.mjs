/* File System 
Check if "tmp.txt", "Downloads", ".bash_profile" exist in your home folder
https://aliaksem.folk.ntnu.no/IDG2100/test.files.zip 
    sort files based on whether it is text of JSON*/

/* Own attempt
const fs = require('fs');
const path = require('path');


const directoryPath = './' 

fs.readdir(directoryPath, (err, files) => {
    if(err) {
        return console.error(err);
    }
    console.log(files);
});

const files = fs.readdirSync(directoryPath);
console.log('Files and directories (sync):', files);
*/

const fs = require('fs');
const path = require('path');

const homeDir = require('os').homedir();

//NOT DONE  
import fsp from "fs/promises";
import path from "path";

const hDir = process.env.HOME;
const f2check = ["tmp.txt", "Downloads", "bash_profile"];
const pArr = f2check.map(async fName => {
    const absFPath = path.join(hDir, fName);
    try {
        const stats = await fsp.stat(absFPath);
        console.log = (``);
    } catch(e) {
        if(e.code === "ENOENT") {
            console.log(`file`)
        }
    }
});

await Priomise.all(pArr);


//categorizing files based on content 
const inDir = path.resolve("./test.files");
const filesToCategorize = await fsp.readdir(inDir);
for(let aFile of filesToCategorize){
    const fDat = await fsp.readFile(path.join(inDir, aFile, "utf8"));
    try {
        const json = JSON.parse(fDat);
        console.log(`${aFile} is a valid JSON file`);
    } catch(error) {
        console.log(`${aFile} is likely not an JSON file`);
    }
}