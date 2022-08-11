const User = require("../models/user.model");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

exports.validate = [
    check('login').isLength({ min: 5 }).withMessage('Login must be at least 5 characters'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match!');
        }
        return true;
    }),
    check('email').isEmail().normalizeEmail().withMessage('Please enter your e-mail'),
];

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    
    const user = new User({
        login: req.body.login,
        password: hashedPassword,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        enabled: req.body.enabled || true
    });

    User.checkAndSave(req.body.login, req.body.email, user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Internal server error"
            });
        } else {
            res.send(data);
        }
    })
};

exports.getAll = (req, res) => {
    User.findAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occured at get all users" });
        } else {
            res.send(data);
        }
    });

};