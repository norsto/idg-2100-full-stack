/* Basic server */

//create a basic HTTP server

//only handle connections coming to the "/msg" path

//only handle GET

//handle Not Found

//return different responses depending on whether the client asks for text, html or json

//create a script to test your server

//Allows Node.js to tranfer data over the Hyper text transfer protocol
const http = require("http");
//Loads fs/promise module. file system promise(just a regular variable for the fs/promise module). Promise based API
const fsp = require("fs/promises");

//createServer method creates a server on your computer. Turns your computer into an HTTP server
const server = http.createServer(async (req, res)=>{
//request, response
    try {
        //req.method property contains a string corresponding to the HTTP method of the request which can be either GET, POST, PUT, DELETE, etc. based upon the requests sent by the user
        //if the requested url starts with /msg, do the following...
        if(req.method === "GET" && req.url.startsWith("/msg")) {
            //req.headers is an object containing the predefined/custom header given in the current rquest
            //Header common use cases are: authentication(include a token or credentials to verify the user's identity),--
            //--(in this case) content negotioation (indicate the type of content being sent or expected), --
            //--and custom behavior (define API-spesific custom headers if the server requires them). 
            // handing the request
            const acceptHeader = req.headers["accept"];
            //if the header includes "text/plain"...
            if(acceptHeader.includes("text/plain")) {
                //... respond with stting the headers HTTP response. res.setHeader allows you only to set a singular header
                res.setHeader("Content-Type", "text/plain");
                //... Sets the HTTP status for the response
                res.statusCode = 200;
                //res.end() is used to tell the stream that it should no longer consume data and it should continue sending the response to the client
                //"Plain text reponse/message"sets the content type of the response to plain text. If it didn't the client may intrepret the response differently, e.g. as HTML or JSON
                //...end the response and close it
                res.end("Plain text response/message");
            //else/otherwise if the header includes "text/html"...
            } else if(acceptHeader.includes("text/html")) {
                //...the htmlFile is set to index.html
                const htmlF = "index.html";
                //...the htmlContent has to wait on the file system promise module to read the file stored in the variable htmlF
                const htmlContent = await fsp.readFile(htmlF, "utf8");
                //...sets the content type to text/html
                res.setHeader("Content-Type", "text/html");
                //...sets the HTTP status for the response
                res.statusCode = 200;
                //...ends the response and closes it. tells the server the content is ready to be sent to the client
                res.end(htmlContent);
            } else if(acceptHeader.includes("application/json")) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                //the variable respObj is initialized with an object literal {} containing one key value pair: --
                //-- key "msg" (a string)
                //--value "hello there from JSON" (also a string)
                //-- when a client (e.g., a browser or curl) accesses the sever, the response is "msg": "Hello there from JSON"
                const respObj = {msg: "Hello there from JSON"};
                //stringify is a function in JavaSript that converts a JavaScript object into a JSON string
                //it is necessary because HTTP responses are sent as plain text icer the network, not as raw JS objects
                res.end(JSON.stringify(respObj));
            } else {
                res.setHeader("Content-Type", "text/plain");
                res.statusCode = 200;
                res.end(`You wanted ${acceptHeader} content type, but you'll get plain text!`);
            }
        } else {
            // we don't serve other endpoints (essentially sends an error)
            res.statusCode = 404;
            res.end("RESOURCE NOT FOUND");
        }
    //catch if some other error occurs
    } catch (error) {
        // if some exception happens that we couldn't deal with
        res.statusCode = 500;
        console.error(error);
        res.end("SERVER MADE BOOBOO");
    }
});

//module.exports is part of the CommonJS spesification. It defines the object that is created when a file is imported using require()
//exports the promise. it makes the promise available to other files that require this module
module.exports = new Promise(function(resolve, reject) {
    //the promise resolves (and is called) when the server start successfully, aka. it signals that the promise is fulfilled
    //starts the server and listens for connections on port 8081
    server.listen(8081, resolve);
    //attaches an event listener to the server for the "error" event
    //the reject fuction is called if an error occurs while starting the code (e.g., if the port is already in use)
    server.on("error", e=>{
        console.error(e);
        reject(e);
    });
});