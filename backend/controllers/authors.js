const Authors = require("../models/Authors");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
    try {
        const authors = await Authors.find({});
        res.status(200).json(authors);
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.getById = async (req, res) => {
    try {
        const authors = await Authors.findById(req.params.id);
        res.status(200).json(authors);
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.delete = async (req, res) => {
    try {
        await Authors.remove({_id: req.params.id});
        res.status(200).json({
            message: "Автор удалён из базы данных."
        })
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.create = async (req, res) => {
    try {
        const author = await new Authors ({
            name: req.body.name,
            biography: req.body.biography,
            county: req.body.county,
            imgSrc: req.body.imgSrc,
            books: req.body.books,
        }).save();
        res.status(201).json(author);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async (req, res) => {
    try {
        const author = await Authors.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(author);
    } catch (e) {
        errorHandler(res, e);
    }
}
