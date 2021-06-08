const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String
    },
    county: {
        type: String
    },
    imgSrc: {
        type: String,
        default: ""
    },
    books: {
        ref: "books",
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("authors", authorsSchema);
