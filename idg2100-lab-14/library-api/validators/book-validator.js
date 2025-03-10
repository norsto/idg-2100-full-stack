import {body, query, params} from "express-validator";

const acceptedGenres = ["comedy", "drama", "thriller", "romance", "sci-fi", "fantasy"];

export const createBookValidatorArr = [
    body("title").notEmpty().withMessage("Book title is required"),
    body("author").notEmpty().withMessage("Has to have author"),
    body("publishedYear")
        .isInt({min: 1000, max: new Date().getFullYear()})
        .withMessage("Invalid year"),
    body("isbn")
        .isISBN()
        .withMessage("Invalid ISBN"),
    body("genre")
        .isString()
        .withMessage("Has to be words")
        .isIn(acceptedGenres)
        .withMessage("has to be approved genre: ", acceptedGenres.joir(", "))
];


const findBookValidatorArr = [
    params("bookid")
        .isString()
        .withMessage("the book you're looking for doesn't exist")
];

const searchByAllowedOptions = ["title", "genre", "author"];

const findBooksValidatorArr = [
    query("searchBy")
        .isString()
        .isIn(searchByAllowedOptions),

    query("value")
        .isString()
        .withMessage("tell us what you're searching for"),
    query("page") 
        .isInt(),
    query("sortBy")
        .isString()
        .isIn(searchByAllowedOptions)
        .withMessage("You can only sort by", searchByAllowedOptions.join(", "))
]   

