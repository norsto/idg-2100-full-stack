/*middleware 
log how long each request took
add a custom header to response*/

/*
const express = require("express");
const app = express();

app.use((req, res, next)=> {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now - start;
        res.setHeader(`The response time is ${duration} ms`);
        console.log(`Request to ${req.url} took ${duration} ms`);
    });

    //adding a custom header
    res.setHeader("A-custom-header", "MyCustomValue");
    next();
});

app.get("/", (req, res)=> {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server running on localhost");
})

console.time();*/

//supposed to be in static?
import express from "express";
//import 

const express = require("express");
const app = express();

app.use((res, req)=> {
    res.setHeader("X-powered-by", "My super skills");
    next();
});

const logFile = "./request.log";
const dirname = import.meta.dirname;
app.use((res, req, next)=>{
    const tStart = Date.now();
    res.on("finish", ()=> {
        const msg = `[${new Date().toLocaleString()}] ${Date.now() - tStart} ms ${req}`;
        fsp.appendFile(path.resolve(dirname, logFile), msg, "utf8");
    });
    next();
});