const User = require("../models/user.model");
const sql = require("../models/db.js");
const { check, validationResult } = require("express-validator");

exports.validate = [
    check('login').isLength({ min: 5 }).withMessage('Login must be at least 5 characters'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match!');
        }
        return true;
    }),
    check('email').isEmail().custom(email => {
        return User.findUserByEmail(email).then(user => {
            if (user) {
                return Promise.reject('E-mail is already in use. Forgot your login? Click the link to restore password');
            }
        });
    }),
];

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = new User({
        login: req.body.login,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
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