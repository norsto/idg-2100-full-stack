/* Basic server */

//only handle connections coming to the "/msg" path

//only handle GET

//handle Not Found

//return different responses depending on whether the client asks for text, html or json

//create a script to test your server

//Allows Node.js to tranfer data over the Hyper text transfer protocol

const http = require("http");
const fsp = require("fs/promises");

const server = http.createServer(async (req, res)=>{
    try {
        if(req.method === "GET" && req.url.startsWith("/msg")) {
            const acceptHeader = req.headers["accept"];
            if(acceptHeader.includes("text/plain")) {
                res.setHeader("Content-Type", "text/plain");
                res.statusCode = 200;
                res.end("Plain text response/message");
            } else if(acceptHeader.includes("text/html")) {
                const htmlF = "index.html";
                const htmlContent = await fsp.readFile(htmlF, "utf8");
                res.setHeader("Content-Type", "text/html");
                res.statusCode = 200;
                res.end(htmlContent);
            } else if(acceptHeader.includes("application/json")) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                const respObj = {msg: "Hello there from JSON"};
                res.end(JSON.stringify(respObj));
            } else {
                res.setHeader("Content-Type", "text/plain");
                res.statusCode = 200;
                res.end(`You wanted ${acceptHeader} content type, but you'll get plain text!`);
            }
        } else {
            res.statusCode = 404;
            res.end("RESOURCE NOT FOUND");
        }
    } catch (error) {
        res.statusCode = 500;
        console.error(error);
        res.end("SERVER MADE BOOBOO");
    }
});

module.exports = new Promise(function(resolve, reject) {
    server.listen(8081, resolve);
    server.on("error", e=>{
        console.error(e);
        reject(e);
    });
});