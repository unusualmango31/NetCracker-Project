const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    year: {
        type: Number
    },
    rate: {
        type: Number,
        required: true
    },
    genres: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ""
    },
    tags: [ String ],
    description: String
});

module.exports = mongoose.model("books", booksSchema);
