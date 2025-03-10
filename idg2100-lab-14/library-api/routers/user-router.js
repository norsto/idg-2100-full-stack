import express from "express";

const userRouter = express.Router();

new Error("Not implemented")

/* [GET, POST] /users 
[GET, PUT, DELETE] /users/:userid

[GET, POST] /users/:userid/borrowed-books
[GET, DELETE] /users/:userid/borrowed-books/:bookid */

userRouter.get("/", (req, res) => {
    new Error()
});

userRouter.post("/", (req, res) => {
    new Error()
});

userRouter.get("/:userid", (req, res) => {
    new Error()
});

userRouter.put("/:userid", (req, res) => {
    new Error()
});

userRouter.delete("/:userid", (req, res) => {
    new Error()
});

userRouter.get("/:userid/borrowed-books", (req, res) => {
    new Error()
});

userRouter.post("/:userid/borrowed-books", (req, res) => {
    new Error()
});

userRouter.get("/:userid/borrowed-books/:bookid", (req, res) => {
    new Error()
});

userRouter.delete("/:userid/borrowed-books/:bookid", (req, res) => {
    new Error()
});

export default userRouter;