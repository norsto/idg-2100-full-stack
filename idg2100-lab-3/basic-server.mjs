/* Basic server
You need to look at this later
 */

//create a basic HTTP server
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello world');
    res.end();
}).listen(8000);

const http = require("http");
const fsp = require("fs/promises");

const server = http.createServer(async  (req, res) => {
//    const server = http.
    try {
        if(req.method === "GET" && req.url.startsWith("(msg")){
            const something = other;
        } else {
            res.statusCode = 404;
            res.end("RESOURCE NOT FOUNT");
        } //else if()
    } catch (error) {
        res.statusCode = 500;
        console.error(error);
        res.end("SERVER BYE");
    }
});

module.exports = new Promise(function(resolve, reject) {
    server.listen(8081);
    server.on("error", e => {
        console.error(e);
        rejects(e);
    })
    
})

function queryAUrl() {
    
}
//only handle connections coming to the "/msg" path


//only handle GET

//handle Not Found

//return different responses depending on whether the client asks for text, html or json

//create a script to test your server