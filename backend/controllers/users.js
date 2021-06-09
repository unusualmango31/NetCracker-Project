const Users = require("../models/Users");
const errorHandler = require("../utils/errorHandler");

module.exports.getById = async (req, res) => {
    try {
        console.log(req.params);
        const users = await Users.findById(req.params.id);
        res.status(200).json(users);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async (req, res) => {
    try {
        const users = await Users.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(users);
    } catch (e) {
        errorHandler(res, e);
    }
}
