// Create an express backend server for a shopping-list app
// GET to retrieve all items stored in a file
// PUT to re-create the list of items

/* const express = require('express')
const app = express()
const port = 3040

/* app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/items', (req, res) => {
    res.send(items);
});

app.put('/items', (req, res) => {
    req(req.body.items);
    res(updatedItems);
}) */
/* -------------------------------------------- */

// Something Vite + React (not something you npm install i think)
//npm init 
//install express 
//install body-parser 

import express from "express";
import bodyParser from "body-parser";
import {readFile, writeFile} from "fs/promises";
import cors from "cors";

const app = express();

app.use(cors);

app.use(bodyParser.json());

app.get("/", (req, res) => {
//    throw new Error("Some error happened");
    res.send("app is running alright");
});

app.get("/items", async (req, res) => {
    console.log("returning all shopping items");

    if(Math.random() < 1) {
        throw new Error("something wnt wrong");
    }

    const allItemsAsText = await readFile("./data.txt", "utf8");
    const allItems = allItemsAsText
        .split("\n")
        .map(item=>item.trim())
        .filter(item=>item.length > 0)

    const randomDelay = Math.round(Math.random() * 30);
    setTimeout(() => res.json(allItems), randomDelay)
    res.json(allItems);
});

app.put("/items", async (req, res) => {
    console.log("recreating shoppinglist");
    const itemsAsText = req.body.items.join("\n");
    await writeFile("./data.txt", itemsAsText, {encoding: "utf8"});

    const randomDelay = Math.round(Math.random() * 30);
    setTimeout(() => {
        res.send("We saved the items")
    }, randomDelay)
});

app.use((error, req, res, next) => {
    console.log(error);
    res.send("Error happened");
});

app.list(8089, () => {
    console.log("Something shoppinlist listening port 8089");
});