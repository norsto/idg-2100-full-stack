// there were something else installed but I'll see what that was later 

/* import globals from "globals";
import pluginJs from "@eslint/js";

/* @type {import} 
export default [
    {languageOptions:}
] */

import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/api-v1-router";

const app = express();

// connect from mongoDB
const {MONGO_PROTOCOL, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB_NAME} = process.env;
const MONGO_URL = `${MONGO_PROTOCOL}://${MONGO_HOSTNAME}:${MONGO_PORT}:${MONGO_DB_NAME}`;

mongoose
    .connect("mongodb://localhost:27017/librarydb")
    .then(() => console.log("Is connected"))
    .catch(console.error);

//middleware
app.use(express.json());

// routers
app.use("/api/v1", apiV1Router);

// test purposes
app.get("/", (req, res) => {
    res.send("Hello");
});

// handling 404 globally <-- has to come last
app.use((req, res, next) => {
    res.status(404).send("Not found babes");
});

// handling 500 globally
app.use((req, res, next, err) => {
    if(process.env.NODE_ENV === "production") {
        console.error(err);
        return res.status(500).send("Server fell");
    }
    next(err);
});

// launching the app
app.listen(process.env.APP_PORT, () => {
    console.log("Is listening", process.env.APP_PORT);
});

