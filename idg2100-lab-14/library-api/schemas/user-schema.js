import {Schema, model} from "mongoose";

const userModel = new Schema({
    "firstname": {type: String, required: true},
    "surname": {type: String, required: true},
    "birthdate": {type: Date, required: true},
    "borrowedBooks": {type: Array, "default": []},
    "username": {type: String, required: true},
    "password": {type: String, required: true},
    "email": {type: String, required: true}
});

export default model("User", userModel);