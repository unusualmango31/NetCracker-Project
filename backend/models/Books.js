const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        ref: "authors",
        type: Schema.Types.ObjectId
    },
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
    genres: [
        {
            name: {
                type: String
            },
        }
    ],
    imgSrc: {
        type: String,
        default: ""
    },
    tags: [
        {
            name: {
                type: String,
            },
        }
    ]
});

module.exports = mongoose.model("books", booksSchema);
