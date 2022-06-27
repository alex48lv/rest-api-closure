const User = require("../models/user.model");
const Message = require("../models/message.model");
const sql = require("../models/db.js");
const { check, validationResult } = require("express-validator");

exports.validate = [
    check('login').isLength({ min: 5 }).withMessage('Login must be at least 5 characters'),
];

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    /*
    User.validate = (req) => {
        sql.query('SELECT id FROM users WHERE login = ?', [req.body.login], function (results) {
            if (results.length > 0) {
                console.log("User login already exists");
            }
        })
    }
    */

    const user = new User({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        enabled: req.body.enabled || true
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Internal server error"
            });
        } else {
            res.send(data);
        }
    })
};

// get all users
exports.getAll = (req, res) => {
    // find users
    User.findAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occured at get all users" });
        } else {
            res.send(data);
        }
    });

};

exports.send = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Bad request"
        })
    }

    const message = new Message({
        login: req.body.login,
        text: req.body.text
    });

    Message.send(message, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Internal server error"
            })
        } else {
            res.send(data);
        }
    })
};
/*
exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Internal server error"
            })
        } else {
            res.send(data);
        }
    })
};

/*exports.create = ([
    check('login').notEmpty().withMessage('Login cannot be empty')
        .isLength({ min: 5 }).withMessage('Login must be at least 5 characters'),
    check('password').notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
    check('email').isEmail().withMessage('Please enter your e-mail'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }*/