import express from "express";
import userRouter from "./user-router";
import bookRouter from "./books-router";

const apiV1Router = express.Router();

apiV1Router.use("/users", userRouter);
apiV1Router.use("/books", bookRouter);

export default apiV1Router;