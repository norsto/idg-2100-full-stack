import express from "express";
import bookController from "../controllers/book-controller";
import {createBookValidatorArr, findBookValidatorArr, findBooksValidatorArr} from "../validators/book-validator";

const bookRouter = express.Router();

/* [GET, POST] /books 
[GET, PUT, DELETE] /books/:bookid  */

bookRouter.get("/", findBooksValidatorArr, bookController.getAllBooks);
bookRouter.post("/", createBookValidatorArr, bookController.createABook);

bookRouter.get("/:bookid", findBookValidatorArr, bookController.getBook);
bookRouter.get("/:bookid", findBookValidatorArr, bookController.putBook);
bookRouter.get("/:bookid", findBookValidatorArr, bookController.deleteBook);