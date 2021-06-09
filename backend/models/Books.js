const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    author: [ String ],

    description: {
        type: String,
    },
    year: {
        type: Date
    },
    rate: {
        type: Number,
        required: true
    },

    genres: [ String ],

    imgSrc: {
        type: String,
        default: ""
    },

    tags: [ String ]

});

module.exports = mongoose.model("books", booksSchema);
