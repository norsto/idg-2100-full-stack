import {Schema, model} from "mongoose";

const BookSchema = new Schema({
    "title": {type: String, required: true},
    "author": {type: String, required: true},
    "genre": {type: String,},
    "publishedYear": {type: Number, required: true},
    "description": {type: String, maxLength: 1024},
    "isbn": {type: Number}
});

export default model("Book", BookSchema);