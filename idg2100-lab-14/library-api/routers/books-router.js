import express from "express";
import bookController from "../controllers/book-controller";
import bookValidators from "../validators/book-validator";

const bookRouter = express.Router();

/* [GET, POST] /books 
[GET, PUT, DELETE] /books/:bookid  */

bookRouter.get("/", (req, res) => {
    throw error
});

bookRouter.get("/", bookValidators.findBooksValidationArr, bookController.getAllBooks);
bookRouter.post("/", bookValidators.createBookValidationArr, bookController.createABook);

bookRouter.get("/:bookid", bookValidators.findBooksValidationArr, bookController);

bookRouter.post("/", (req, res) => {
    throw error
});

bookRouter.get("/:bookid", (req, res) => {
    throw error
});

bookRouter.put("/:bookid", (req, res) => {
    throw error
});

bookRouter.delete("/:bookid", (req, res) => {
    throw error
});