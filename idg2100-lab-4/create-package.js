//create script for the json package you made (?)

import {reddir, readFile} from "fs/promises";
import path from path;

const allCatKeyword = "__all";

const listCats = (()=> {
    const defaultCatDir = path.resolve(import.meta.dirname, "./cat-images");
    const catCashe = {};
    catCashe[allCatKeyword] = [];
    // start loading default directory images right away
    _listCats(defaultCatDir);
    async function _listCats(catDir) {
        catDir ?? defaultCatDir;
        if(catDir === allCatKeyword) {
            return catCashe[allCatKeyword];
        }
        if(catCashe[catDir]) {
            return catCashe[catDir]
        }
        const fPics = (await reddir(catDir)).filter(x=>x.endsWith(".jpg"));
        if(!fPics.length) {
            throw new Error (`No cat oics (jpg only) were found in ${path.resolve()}`)//("not catpic") 
        }
        catCashe[catDir] = fPics.map(f=>path);
    }
    return _listCats;
})();

function listCats(catDir) {

}

//cashes cat images from a directory
export async function addCatsFromDir(catDir) {
    return listCat[catDir];
}

//returns a random cat img from among all images we have access to
export async function catMiAll() {
    return await catMi(allCatKeyword)
}

//returns a random cat img from a directoty containing cat images
export async function catMi(catDir) {
    const PicArr = await listCats(catDir);
    const randomF = picArr[Math.floor(Math.random() * picArr.length)];
    const inmBuffer = await readFile(randomF);
    return imgBuffer.toString("base64");
}