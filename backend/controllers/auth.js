const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");

const keys = require("../config/keys");
const Users = require("../models/Users");
const errorHandler = require("../utils/errorHandler");

// Авторизация пользователя в системе
module.exports.login = async (req, res) => {
    const loginWithEmail = await Users.findOne({
        email: req.body.email
    });

    if (loginWithEmail) {
        const passwordCompare = bcrypt.compareSync(cryptoJS.AES.decrypt(req.body.password, "recommendation".trim()).toString(cryptoJS.enc.Utf8), loginWithEmail.password);

        if (passwordCompare) {
            //Генерация токена
            const token = jwt.sign({
                email: loginWithEmail.email,
                userId: loginWithEmail._id,
            }, keys.jwt, {
                expiresIn: 86400
            });

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: "Пароли не совпадают."
            });
        }
    } else {
        res.status(404).json({
            message: "Пользователь с таким email не найден"
        });
    }
};

// Регистрация пользователя в системе
module.exports.register = async (req, res) => {
    const existEmail = await Users.findOne({
        email: req.body.email
    });
    const existUsername = await Users.findOne({
        username: req.body.username
    });

    if (existEmail) {
        res.status(409).json({
            message: "Пользователь с таким email уже существует."
        });
    } else if (existUsername) {
        res.status(409).json({
            message: "Пользователь с таким именем уже существует."
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = cryptoJS.AES.decrypt(req.body.password, "recommendation".trim()).toString(cryptoJS.enc.Utf8);
        const user = new Users({
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
}
