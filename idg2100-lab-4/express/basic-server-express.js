import express from "express";

const app = express();

app.use(express.static());
const staticResourcePath = path.resolve(import.meta.dirname, "express");
app.use("/public", express.static(staticResourcePath));

app.get("/", (req, res)=>{
    res.send("Hello world!");
});

// launcing a server
app.listen(8083, ()=>console.log("Express server is listening"));

//make a directory as containing static files and return an html page from it
express.static(root, [options]);

app.use(express.static("public", options));