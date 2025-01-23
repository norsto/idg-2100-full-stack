import http from "http";
import {catMiAll, addCatsFromDir} from "../node_modules/catmi"; 
import fsp from "fs/promises";

//he called the html document tmpl
const tmpl = await fsp.readFile("./index.html", "utf8");

addCatsFromDir("./moreCats");

const server = http.createServer(async (req, res)=> {
    if(req.method === "GET" && req.url.startsWith("/picmi")) {
        //rander a page with a cat image
        try {
            const catImgInBase64 = await catMiAll();
            res.end(tmpl.replace("{{base64img}}", catImgInBase64));
        } catch(error) {
            //error
            res.statusCode = 500;
            res.end(tmpl.replace("{{base64img}}", catImgInBase64));
        }
    } else {
        res.statusCode = 404;
        res.end("Failed to get a cat");
    }
});
